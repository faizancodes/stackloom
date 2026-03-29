interface MaintenanceLagChartProps {
  data: number[];
}

export function MaintenanceLagChart({ data }: MaintenanceLagChartProps) {
  const max = Math.max(...data, 1);

  if (data.length === 0) {
    return <div className="flex h-32 items-center justify-center text-sm text-[#666666]">No release cadence data available.</div>;
  }

  return (
    <div className="space-y-3">
      <div className="flex h-32 items-end gap-2">
        {data.map((value, index) => (
          <div key={index} className="flex-1 self-stretch rounded-none bg-[#1a1a1a]">
            <div className="mt-auto rounded-none bg-[#f59e0b]" style={{ height: `${Math.max((value / max) * 100, 4)}%` }} />
          </div>
        ))}
      </div>
      <p className="text-xs text-[#666666]">Longer lag suggests releases are trailing issue churn or dependency changes.</p>
    </div>
  );
}
