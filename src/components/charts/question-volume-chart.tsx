interface QuestionVolumeChartProps {
  data: number[];
}

export function QuestionVolumeChart({ data }: QuestionVolumeChartProps) {
  const max = Math.max(...data, 1);

  return (
    <div className="flex h-32 items-end gap-2">
      {data.map((value, index) => (
        <div key={index} className="flex-1 bg-[#1a1a1a]">
          <div className="bg-[#f59e0b]" style={{ height: `${(value / max) * 100}%` }} />
        </div>
      ))}
    </div>
  );
}
