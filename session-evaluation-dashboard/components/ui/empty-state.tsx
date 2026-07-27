type EmptyStateProps = {
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
};

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="panel flex h-full flex-col p-8 text-center">
      <h2 className="text-base font-medium">{title}</h2>
      <p className="muted mx-auto mt-2 max-w-md">{description}</p>
      <button type="button" onClick={onAction} className="btn mt-6">
        {actionLabel}
      </button>
    </div>
  );
}
