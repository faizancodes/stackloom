interface ReleaseVelocityChartProps {
  data: number[];
}

export function ReleaseVelocityChart({ data }: ReleaseVelocityChartProps) {
  const max = Math.max(...data, 1);

  if (data.length === 0) {
    return <div className="flex h-32 items-center justify-center text-sm text-[#666666]">No release data available.</div>;
  }

  return (
    <div className="flex h-32 items-end gap-2">
      {data.map((value, index) => (
        <div key={index} className="flex-1 self-stretch rounded-none bg-[#1a1a1a]">
          <div className="mt-auto rounded-none bg-[#3D56F0]" style={{ height: `${Math.max((value / max) * 100, 4)}%` }} />
        </div>
      ))}
    </div>
  );
}
