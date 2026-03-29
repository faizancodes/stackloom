interface DownloadTrendChartProps {
  data: number[];
}

export function DownloadTrendChart({ data }: DownloadTrendChartProps) {
  const max = Math.max(...data, 1);
  const points = data.map((value, index) => {
    const x = data.length === 1 ? 50 : (index / (data.length - 1)) * 100;
    const y = 100 - (value / max) * 100;
    return `${x},${y}`;
  });

  return (
    <svg viewBox="0 0 100 100" className="h-32 w-full">
      <polyline fill="none" stroke="#7C3AED" strokeWidth="2" points={points.join(" ")} />
    </svg>
  );
}
