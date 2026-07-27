export function LoadingCard() {
  return (
    <div className="grid h-full min-h-0 gap-6 lg:grid-cols-2">
      <div className="panel space-y-4 p-4">
        <div className="h-4 w-32 animate-pulse bg-neutral-100" />
        <div className="grid gap-4 md:grid-cols-3">
          <div className="h-10 animate-pulse bg-neutral-100" />
          <div className="h-10 animate-pulse bg-neutral-100" />
          <div className="h-10 animate-pulse bg-neutral-100" />
        </div>
        <div className="min-h-0 flex-1 animate-pulse bg-neutral-100" />
      </div>
      <div className="panel space-y-4 p-4">
        <div className="h-4 w-24 animate-pulse bg-neutral-100" />
        <div className="min-h-0 flex-1 animate-pulse bg-neutral-100" />
      </div>
    </div>
  );
}
