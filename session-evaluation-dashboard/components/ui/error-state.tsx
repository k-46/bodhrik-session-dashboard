type ErrorStateProps = {
  message: string;
  onRetry: () => void;
};

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <section className="panel p-6">
      <h2 className="text-base font-medium">Failed to load data</h2>
      <p className="muted mt-2">{message}</p>
      <button type="button" onClick={onRetry} className="btn mt-4">
        Retry
      </button>
    </section>
  );
}
