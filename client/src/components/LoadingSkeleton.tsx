/**
 * Loading skeleton component for better UX
 */

export default function LoadingSkeleton() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Score Card Skeleton */}
      <div className="border-2 border-border/50 p-8 rounded-sm bg-card/50 animate-pulse">
        <div className="text-center space-y-4">
          <div className="h-4 bg-muted rounded w-24 mx-auto" />
          <div className="h-20 bg-muted rounded w-32 mx-auto" />
          <div className="h-4 bg-muted rounded w-20 mx-auto" />
        </div>
      </div>

      {/* Personality Badge Skeleton */}
      <div className="flex items-center gap-3">
        <div className="h-4 bg-muted rounded w-12" />
        <div className="h-10 bg-muted rounded w-32" />
      </div>

      {/* Signals Skeleton */}
      <div className="space-y-3">
        <div className="h-4 bg-muted rounded w-20" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-12 bg-muted rounded" />
        ))}
      </div>

      {/* Insight Skeleton */}
      <div className="space-y-3">
        <div className="h-4 bg-muted rounded w-20" />
        <div className="h-24 bg-muted rounded" />
      </div>

      {/* Summary Skeleton */}
      <div className="space-y-3">
        <div className="h-4 bg-muted rounded w-20" />
        <div className="h-24 bg-muted rounded" />
      </div>
    </div>
  );
}
