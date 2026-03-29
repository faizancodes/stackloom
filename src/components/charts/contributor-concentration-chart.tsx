interface ContributorConcentrationChartProps {
  data: number[];
}

export function ContributorConcentrationChart({ data }: ContributorConcentrationChartProps) {
  const max = Math.max(...data, 1);

  if (data.length === 0) {
    return <div className="flex h-32 items-center justify-center text-sm text-[#666666]">No contributor data available.</div>;
  }

  return (
    <div className="space-y-3">
      <div className="flex h-32 items-end gap-2">
        {data.map((value, index) => (
          <div key={index} className="flex-1 self-stretch rounded-none bg-[#1a1a1a]">
            <div className="mt-auto rounded-none bg-[#7C3AED]" style={{ height: `${Math.max((value / max) * 100, 4)}%` }} />
          </div>
        ))}
      </div>
      <p className="text-xs text-[#666666]">Higher bars indicate contributor concentration and bus factor risk.</p>
    </div>
  );
}
