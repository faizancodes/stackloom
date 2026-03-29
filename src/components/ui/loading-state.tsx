import { Skeleton } from "@/components/ui/skeleton";

interface LoadingStateProps {
  title?: string;
  description?: string;
}

export function LoadingState({ title = "Loading", description = "Fetching data..." }: LoadingStateProps) {
  return (
    <div className="space-y-3 rounded-none border border-[#222222] bg-[#111111] p-6">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-3 w-48" />
      <div className="space-y-2 pt-2">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-5/6" />
      </div>
      <div className="text-sm text-[#666666]">
        <div>{title}</div>
        <div>{description}</div>
      </div>
    </div>
  );
}
