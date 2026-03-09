import { Bar, BarChart, CartesianGrid, Cell, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { IndustryRow } from '@/lib/worksafebc/types';

interface SectorExposureChartsProps {
  industryRows: IndustryRow[];
}

const SectorExposureCharts = ({ industryRows }: SectorExposureChartsProps) => (
  <>
    <article className="card h-[460px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={industryRows} layout="vertical" margin={{ left: 80, right: 16 }}>
          <CartesianGrid stroke="#F3EFE6" strokeOpacity={0.08} />
          <XAxis type="number" stroke="#F3EFE6" opacity={0.7} />
          <YAxis type="category" dataKey="name" width={210} stroke="#F3EFE6" opacity={0.8} />
          <Tooltip formatter={(value: number) => `$${value.toFixed(1)}M`} />
          <Legend />
          <Bar dataKey="currentPremiumM" name="Current premium ($M)" fill="#F3EFE6" fillOpacity={0.35} />
          <Bar dataKey="exposureM" name="Repricing exposure ($M)" fill="#A63A2C" />
        </BarChart>
      </ResponsiveContainer>
    </article>
    <p className="text-xs text-[#F3EFE6]/70 -mt-5">“Other Sectors (aggregate)” covers approximately 1.92M workers across sectors not individually broken out.</p>

    <article className="card h-[360px]">
      <h3 className="font-heading text-2xl mb-4">Per-employee impact by sector</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={industryRows}>
          <CartesianGrid stroke="#F3EFE6" strokeOpacity={0.08} />
          <XAxis dataKey="name" interval={0} angle={-35} textAnchor="end" height={130} stroke="#F3EFE6" opacity={0.8} />
          <YAxis stroke="#F3EFE6" opacity={0.8} />
          <Tooltip formatter={(value: number) => `~$${value}/yr`} />
          <Bar dataKey="perEmployeeImpact" name="Per-employee impact ($/yr)">
            {industryRows.map((row) => {
              const fill = row.perEmployeeImpact > 450 ? '#A63A2C' : row.perEmployeeImpact >= 200 ? '#D4A03A' : '#7CBF9E';
              return <Cell key={row.name} fill={fill} />;
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </article>

    <div className="overflow-x-auto card">
      <table className="w-full min-w-[1400px] text-sm">
        <thead>
          <tr className="border-b border-[#F3EFE6]/25 text-[#D4A03A] font-mono uppercase tracking-[0.08em] text-xs">
            <th className="text-left py-3">Industry</th>
            <th className="text-left py-3">Base Rate</th>
            <th className="text-left py-3">Risk Factor</th>
            <th className="text-left py-3">Cost Rate</th>
            <th className="text-left py-3">BC Payroll</th>
            <th className="text-left py-3">Current Premium</th>
            <th className="text-left py-3">Cost-Reflective Premium</th>
            <th className="text-left py-3">Repricing Exposure</th>
            <th className="text-left py-3">Per-Employee</th>
            <th className="text-left py-3">Employment Est.</th>
          </tr>
        </thead>
        <tbody>
          {industryRows.map((item) => (
            <tr key={item.name} className="border-b border-[#F3EFE6]/10">
              <td className="py-3">{item.name}</td>
              <td>${item.baseRate.toFixed(2)}</td>
              <td>{item.riskFactor.toFixed(4)}</td>
              <td>${item.costRate.toFixed(2)}</td>
              <td>${item.payrollB.toFixed(2)}B</td>
              <td>${item.currentPremiumM.toFixed(1)}M</td>
              <td>${item.costPremiumM.toFixed(1)}M</td>
              <td>${item.exposureM.toFixed(1)}M</td>
              <td>~${item.perEmployeeImpact}/yr</td>
              <td>{Math.round(item.employment / 1000)}K</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-xs text-[#F3EFE6]/65 mt-4">
        Cost rate = industry base rate × 1.1806 (1.83 ÷ 1.55). Repricing exposure = payroll × (cost rate − base rate). Base rates sourced directly from WorkSafeBC 2026 Classification and Rate List. Payroll estimates from Statistics Canada Labour Force Survey (BC, 2024–2025). Uncertainty: ±10–15%.
      </p>
    </div>
  </>
);

export default SectorExposureCharts;
