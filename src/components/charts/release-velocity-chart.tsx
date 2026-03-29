interface ReleaseVelocityChartProps {
  data: number[];
}

export function ReleaseVelocityChart({ data }: ReleaseVelocityChartProps) {
  const max = Math.max(...data, 1);

  return (
    <div className="flex h-32 items-end gap-2">
      {data.map((value, index) => (
        <div key={index} className="flex-1 bg-[#1a1a1a]">
          <div className="bg-[#3D56F0]" style={{ height: `${(value / max) * 100}%` }} />
        </div>
      ))}
    </div>
  );
}
