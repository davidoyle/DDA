import {
  BEHAVIOURAL_EROSION,
  COMPLIANCE_COST_PER_EMPLOYEE,
  COMPLIANCE_COSTS,
  IMPLIED_REVENUE,
  INVESTMENT_ELASTICITY,
  INVESTMENT_PANEL_THRESHOLD,
  MARGIN_MIDPOINTS,
  PASSTHROUGH_RATES,
  PST_RATE,
  TAXABLE_SHARES,
} from './pst-config'
import type { PSTFormValues, PSTResults, RiskFlag, ServiceRow } from './pst-types'

export function calculatePST(form: PSTFormValues): PSTResults {
  const bundlingShare = TAXABLE_SHARES.aeg[form.bundlingScenario]
  const basePassthrough = PASSTHROUGH_RATES[form.sector][form.firmSize]
  const passthroughRate = form.passthroughOverride ?? basePassthrough

  const serviceInputs = [
    { id: 'accounting' as const, label: 'Accounting & Bookkeeping', spend: form.spendAccounting, taxableShare: TAXABLE_SHARES.accounting },
    { id: 'aeg' as const, label: 'Architecture / Engineering / Geoscience', spend: form.spendAEG, taxableShare: bundlingShare },
    { id: 're' as const, label: 'Commercial Real Estate', spend: form.spendRealEstate, taxableShare: TAXABLE_SHARES.re },
    { id: 'security' as const, label: 'Security Services', spend: form.spendSecurity, taxableShare: TAXABLE_SHARES.security },
  ]

  const rows: ServiceRow[] = serviceInputs
    .filter((s) => s.spend > 0)
    .map((s) => {
      const pstCost = s.spend * s.taxableShare * PST_RATE
      const netCost = pstCost * (1 - passthroughRate)
      return {
        ...s,
        pstCost,
        netCost,
        effectiveRate: pstCost / s.spend,
      }
    })

  const totalSpend = rows.reduce((sum, r) => sum + r.spend, 0)
  const totalPST = rows.reduce((sum, r) => sum + r.pstCost, 0)
  const totalNetCost = rows.reduce((sum, r) => sum + r.netCost, 0)
  const complianceCost = COMPLIANCE_COSTS[form.firmSize]
  const year1TotalImpact = totalPST + complianceCost
  const aggregateComplianceCost = form.employeeCount ? form.employeeCount * COMPLIANCE_COST_PER_EMPLOYEE : undefined

  const pctOfSpend = totalSpend > 0 ? totalPST / totalSpend : 0
  const impliedMarginPool = IMPLIED_REVENUE[form.firmSize] * MARGIN_MIDPOINTS[form.firmSize]
  const absorbedShockToMarginRatio = totalNetCost / impliedMarginPool
  const totalPSTToMarginRatio = totalPST / impliedMarginPool

  const showInvestment = totalPST >= INVESTMENT_PANEL_THRESHOLD
  const costIncreasePct = totalSpend > 0 ? totalPST / totalSpend : 0

  const riskFlags = buildRiskFlags(form, pctOfSpend)

  return {
    rows,
    totalSpend,
    totalPST,
    totalNetCost,
    passthroughRate,
    complianceCost,
    year1TotalImpact,
    aggregateComplianceCost,
    pctOfSpend,
    absorbedShockToMarginRatio,
    totalPSTToMarginRatio,
    bcDisadvantageVsAB: totalPST,
    bcDisadvantageVsON: totalPST,
    investmentDragMild: showInvestment ? costIncreasePct * INVESTMENT_ELASTICITY.mild : undefined,
    investmentDragCentral: showInvestment ? costIncreasePct * INVESTMENT_ELASTICITY.central : undefined,
    investmentDragSevere: showInvestment ? costIncreasePct * INVESTMENT_ELASTICITY.severe : undefined,
    erosionLow: totalPST * BEHAVIOURAL_EROSION.low,
    erosionMedium: totalPST * BEHAVIOURAL_EROSION.medium,
    erosionHigh: totalPST * BEHAVIOURAL_EROSION.high,
    adjustedCostLow: totalPST * (1 - BEHAVIOURAL_EROSION.low),
    adjustedCostMedium: totalPST * (1 - BEHAVIOURAL_EROSION.medium),
    adjustedCostHigh: totalPST * (1 - BEHAVIOURAL_EROSION.high),
    riskFlags,
    sector: form.sector,
    firmSize: form.firmSize,
    bundlingScenario: form.bundlingScenario,
    responseScenario: form.responseScenario,
  }
}

function buildRiskFlags(form: PSTFormValues, pctOfSpend: number): RiskFlag[] {
  const flags: RiskFlag[] = []
  const baseProjectPST = 600000 * TAXABLE_SHARES.aeg[form.bundlingScenario] * PST_RATE
  const formattedProjectPST = Math.round(baseProjectPST / 100) * 100

  if (pctOfSpend > 0.05) {
    flags.push({
      id: 'margin-high',
      level: 'high',
      title: 'High margin compression risk',
      body: 'PST exceeds 5% of professional services spend. At typical net margins of 5–15%, this represents 12–40% of current net profit if absorbed rather than passed through.',
      sourceNote: 'StatsCan Financial Performance NAICS 5412/5413 (2025); IBISWorld NAICS benchmarks',
      evidenceTier: 'MODELLED',
    })
  } else if (pctOfSpend > 0.025) {
    flags.push({
      id: 'margin-medium',
      level: 'medium',
      title: 'Moderate margin pressure',
      body: 'PST is 2.5–5% of professional services spend — material but manageable with pass-through and contract restructuring.',
      sourceNote: 'StatsCan Financial Performance NAICS 5412/5413 (2025)',
      evidenceTier: 'MODELLED',
    })
  } else {
    flags.push({
      id: 'margin-low',
      level: 'low',
      title: 'Lower direct exposure',
      body: 'PST is under 2.5% of professional services spend. Monitor for indirect cost pass-through from your supply chain.',
      sourceNote: 'Public policy impact modelling synthesis (March 2026)',
      evidenceTier: 'MODELLED',
    })
  }

  if (form.firmSize === 'small') {
    flags.push({
      id: 'small-firm-multiplier',
      level: 'high',
      title: 'Small firm multiplier: 1.7–2.1×',
      body: 'Small firms achieve materially lower pass-through than large firms, and fixed compliance costs create a higher burden per dollar of revenue.',
      sourceNote: 'StatsCan business surveys; CPA Canada administrative burden survey',
      evidenceTier: 'VERIFIED',
    })
  }

  if (form.spendAEG > 0) {
    flags.push({
      id: 'aeg-bundling',
      level: 'medium',
      title: 'AEG bundling ambiguity — contract review required',
      body: 'The 30% legislated base assumes separately itemised design vs. advisory work. Most integrated project engagements do not achieve this. BC Ministry Notice 2026-001 does not resolve multi-phase contract treatment. Dispute risk is elevated.',
      sourceNote: 'BC MoF Notice 2026-001; ACEC-BC Pre-Budget Submission (2025); Quebec QST post-implementation data',
      evidenceTier: 'MODELLED',
    })
  }

  if (form.sector === 'construction' || form.sector === 'mining') {
    flags.push({
      id: 'capital-project-escalation',
      level: 'high',
      title: 'Capital project cost escalation',
      body: `Your sector relies heavily on AEG services. PST adds non-recoverable cost to project pro formas. A $10M project with $600K in AEG services adds about $${formattedProjectPST.toLocaleString('en-CA')} in new PST costs under your selected bundling scenario.`,
      sourceNote: 'BC Budget 2026/27; sector project-cost modelling assumptions',
      evidenceTier: 'MODELLED',
    })
  }

  if (form.spendAEG > 200000 || form.spendAccounting > 100000) {
    flags.push({
      id: 'mid-contract-repricing',
      level: 'medium',
      title: 'Mid-contract repricing exposure',
      body: 'Engineering contracts average 26 months; ~48–55% of active AEG contract value straddles October 1, 2026. Negotiate PST transition clauses with service providers before the implementation date.',
      sourceNote: 'ACEC-BC procurement survey (2025); CPA Canada billing survey (2025)',
      evidenceTier: 'VERIFIED',
    })
  }

  if (form.sector === 'construction' && form.spendAEG > 0) {
    flags.push({
      id: 'housing-cost-impact',
      level: 'medium',
      title: 'Housing project cost impact',
      body: 'AEG services are a direct input into housing construction. The PST on a $50M project with $3M in AEG services adds $63,000 in non-recoverable costs to the pro forma. No housing cost offset has been published by government alongside this measure.',
      sourceNote: 'BC Budget 2026/27; housing project pro-forma sensitivity analysis',
      evidenceTier: 'MODELLED',
    })
  }

  flags.push({
    id: 'alberta-competitive-pressure',
    level: 'medium',
    title: 'Persistent Alberta competitive disadvantage',
    body: 'Your competitors in Alberta face zero equivalent cost. The Canadian investment elasticity range (IMF: -0.12 to -0.28) implies this differential can suppress BC investment growth — a persistent annual drag rather than a one-time shock.',
    sourceNote: 'IMF WP/20/77 (2020); Bank of Canada provincial tax differential studies (2020–2024)',
    evidenceTier: 'MODELLED',
  })

  return flags
}
