interface ActivityTimelineProps {
  downloads: number[];
  releases: number[];
  contributors: number[];
  questions: number[];
}

const series = [
  { key: "downloads", label: "Downloads", color: "bg-[#7C3AED]" },
  { key: "releases", label: "Releases", color: "bg-[#3D56F0]" },
  { key: "contributors", label: "Contributors", color: "bg-[#22c55e]" },
  { key: "questions", label: "Questions", color: "bg-[#f59e0b]" },
] as const;

export function ActivityTimeline({ downloads, releases, contributors, questions }: ActivityTimelineProps) {
  const data = { downloads, releases, contributors, questions };

  return (
    <div className="space-y-4">
      {series.map((item) => {
        const values = data[item.key];
        const max = Math.max(...values, 1);
        return (
          <div key={item.key} className="space-y-2">
            <div className="flex items-center justify-between text-xs text-[#a1a1a1]">
              <span>{item.label}</span>
              <span>{values[values.length - 1]}</span>
            </div>
            <div className="flex h-16 items-end gap-2">
              {values.map((value, index) => (
                <div key={index} className="flex-1 rounded-none bg-[#1a1a1a]">
                  <div className={`rounded-none ${item.color}`} style={{ height: `${(value / max) * 100}%` }} />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
