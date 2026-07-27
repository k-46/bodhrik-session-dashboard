type DashboardHeaderProps = {
  sessionCount: number;
  onLogout: () => void;
};

export function DashboardHeader({ sessionCount, onLogout }: DashboardHeaderProps) {
  return (
    <header className="mb-6 flex shrink-0 flex-col gap-4 border-b border-neutral-200 pb-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-xl font-medium">Sessions</h1>
        <p className="muted mt-1">{sessionCount} total</p>
      </div>

      <button type="button" onClick={onLogout} className="btn-ghost">
        Log out
      </button>
    </header>
  );
}
