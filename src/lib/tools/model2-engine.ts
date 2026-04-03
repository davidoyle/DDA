export type ZoneCode = 'G1' | 'G2' | 'G3';
export type ScenarioPlanCode = 'A' | 'B' | 'C';
export type ScenarioKey = 'low' | 'med' | 'high';

export type CityZoneConfig = Record<ZoneCode, {
  areaHa: number;
  developableHa: number;
  servicedCapacityHa: number;
  minDensity: number;
  maxDensity: number;
  jobsPerHa: number;
  costIndex: number;
  housingWeight: number;
}>;

export type Model1Snapshot = {
  model1Scenario: ScenarioKey;
  households: number;
  unitsRequired: number;
  jobs: number;
};

export type Model2Result = {
  model1Scenario: ScenarioKey;
  plan: ScenarioPlanCode;
  unitsByZone: Record<ZoneCode, number>;
  jobsByZone: Record<ZoneCode, number>;
  residentialLandByZone: Record<ZoneCode, number>;
  employmentLandByZone: Record<ZoneCode, number>;
  totalLand: number;
  infraCost: number;
  housingPressure: number;
  efficiency: number;
  status: 'PASS' | 'WARN' | 'FAIL';
  flags: {
    residentialCapacity: 'PASS' | 'WARN' | 'FAIL';
    employmentCapacity: 'PASS' | 'WARN' | 'FAIL';
    servicedCapacity: 'PASS' | 'WARN' | 'FAIL';
    jobsHousingBalance: 'PASS' | 'WARN' | 'FAIL';
  };
  utilizations: {
    residential: number;
    employment: number;
    serviced: number;
  };
};

export const ALLOCATION_PLANS: Record<ScenarioPlanCode, { residential: Record<ZoneCode, number>; employment: Record<ZoneCode, number>; label: string }> = {
  A: { label: 'Uptown Concentration', residential: { G1: 0.75, G2: 0.2, G3: 0.05 }, employment: { G1: 0.65, G2: 0.25, G3: 0.1 } },
  B: { label: 'Distributed Growth', residential: { G1: 0.35, G2: 0.35, G3: 0.3 }, employment: { G1: 0.35, G2: 0.35, G3: 0.3 } },
  C: { label: 'Emerging Expansion', residential: { G1: 0.15, G2: 0.25, G3: 0.6 }, employment: { G1: 0.25, G2: 0.25, G3: 0.5 } },
};

function flagFromUtilization(utilization: number): 'PASS' | 'WARN' | 'FAIL' {
  if (utilization > 1) return 'FAIL';
  if (utilization > 0.9) return 'WARN';
  return 'PASS';
}

function overallStatus(flags: Array<'PASS' | 'WARN' | 'FAIL'>): 'PASS' | 'WARN' | 'FAIL' {
  if (flags.includes('FAIL')) return 'FAIL';
  if (flags.includes('WARN')) return 'WARN';
  return 'PASS';
}

export function runModel2Engine(snapshots: Model1Snapshot[], zones: CityZoneConfig): Model2Result[] {
  const plans: ScenarioPlanCode[] = ['A', 'B', 'C'];
  const results: Model2Result[] = [];

  snapshots.forEach((snapshot) => {
    const H_total = snapshot.households;
    const U_total = snapshot.unitsRequired;
    const E_total = snapshot.jobs;
    const workersPerHousehold = H_total > 0 ? E_total / H_total : 1;

    plans.forEach((plan) => {
      const planCfg = ALLOCATION_PLANS[plan];
      const unitsByZone = { G1: 0, G2: 0, G3: 0 } as Record<ZoneCode, number>;
      const jobsByZone = { G1: 0, G2: 0, G3: 0 } as Record<ZoneCode, number>;
      const residentialLandByZone = { G1: 0, G2: 0, G3: 0 } as Record<ZoneCode, number>;
      const employmentLandByZone = { G1: 0, G2: 0, G3: 0 } as Record<ZoneCode, number>;
      const jobsHousingRatioByZone = { G1: 1, G2: 1, G3: 1 } as Record<ZoneCode, number>;

      (['G1', 'G2', 'G3'] as ZoneCode[]).forEach((zone) => {
        const zoneCfg = zones[zone];
        unitsByZone[zone] = U_total * planCfg.residential[zone];
        jobsByZone[zone] = E_total * planCfg.employment[zone];
        residentialLandByZone[zone] = unitsByZone[zone] / zoneCfg.minDensity;
        employmentLandByZone[zone] = jobsByZone[zone] / zoneCfg.jobsPerHa;
        jobsHousingRatioByZone[zone] = jobsByZone[zone] / Math.max(unitsByZone[zone] * workersPerHousehold, 1);
      });

      const totalLand = (['G1', 'G2', 'G3'] as ZoneCode[]).reduce((sum, zone) => sum + residentialLandByZone[zone] + employmentLandByZone[zone], 0);
      const infraCost = (['G1', 'G2', 'G3'] as ZoneCode[]).reduce((sum, zone) => sum + unitsByZone[zone] * (zones[zone].costIndex / zones[zone].minDensity), 0);
      const housingPressure = (['G1', 'G2', 'G3'] as ZoneCode[]).reduce((sum, zone) => sum + unitsByZone[zone] * zones[zone].housingWeight, 0) / Math.max(U_total, 1);
      const efficiency = (U_total + E_total) / Math.max(totalLand, 1);

      const residentialUtilization = Math.max(...(['G1', 'G2', 'G3'] as ZoneCode[]).map((zone) => unitsByZone[zone] / (zones[zone].developableHa * zones[zone].maxDensity)));
      const employmentUtilization = Math.max(...(['G1', 'G2', 'G3'] as ZoneCode[]).map((zone) => jobsByZone[zone] / (zones[zone].developableHa * zones[zone].jobsPerHa)));
      const servicedUtilization = Math.max(...(['G1', 'G2', 'G3'] as ZoneCode[]).map((zone) => (residentialLandByZone[zone] + employmentLandByZone[zone]) / zones[zone].servicedCapacityHa));
      const jobsHousingDeviation = Math.max(...Object.values(jobsHousingRatioByZone).map((ratio) => Math.abs(ratio - 1)));

      const residentialCapacity = flagFromUtilization(residentialUtilization);
      const employmentCapacity = flagFromUtilization(employmentUtilization);
      const servicedCapacity = flagFromUtilization(servicedUtilization);
      const jobsHousingBalance: 'PASS' | 'WARN' | 'FAIL' = jobsHousingDeviation > 0.3 ? 'FAIL' : jobsHousingDeviation > 0.15 ? 'WARN' : 'PASS';
      const status = overallStatus([residentialCapacity, employmentCapacity, servicedCapacity, jobsHousingBalance]);

      results.push({
        model1Scenario: snapshot.model1Scenario,
        plan,
        unitsByZone,
        jobsByZone,
        residentialLandByZone,
        employmentLandByZone,
        totalLand,
        infraCost,
        housingPressure,
        efficiency,
        status,
        flags: { residentialCapacity, employmentCapacity, servicedCapacity, jobsHousingBalance },
        utilizations: { residential: residentialUtilization, employment: employmentUtilization, serviced: servicedUtilization },
      });
    });
  });

  return results;
}
