interface ContributorConcentrationChartProps {
  data: number[];
}

export function ContributorConcentrationChart({ data }: ContributorConcentrationChartProps) {
  const max = Math.max(...data, 1);

  return (
    <div className="space-y-3">
      <div className="flex h-32 items-end gap-2">
        {data.map((value, index) => (
          <div key={index} className="flex-1 rounded-none bg-[#1a1a1a]">
            <div className="rounded-none bg-[#7C3AED]" style={{ height: `${(value / max) * 100}%` }} />
          </div>
        ))}
      </div>
      <p className="text-xs text-[#666666]">Higher bars indicate contributor concentration and bus factor risk.</p>
    </div>
  );
}
