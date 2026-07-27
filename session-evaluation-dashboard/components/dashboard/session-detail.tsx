import { MetricChart } from "@/components/dashboard/metric-chart";
import { metricConfig } from "@/lib/constants";
import type { Session } from "@/lib/types";
import { formatDate, sessionAverages } from "@/lib/utils";

type SessionDetailProps = {
  session: Session | null;
};

export function SessionDetail({ session }: SessionDetailProps) {
  const scoreSummary = session ? sessionAverages(session) : null;

  return (
    <div className="panel flex h-full min-h-0 flex-col overflow-hidden p-4">
      <div className="shrink-0">
        <h2 className="text-base font-medium">
          {session ? session.studentName : "Select a session"}
        </h2>
        <p className="muted mt-1">
          {session ? formatDate(session.date) : "Choose a row from the table."}
        </p>
      </div>

      {session && scoreSummary ? (
        <div className="mt-6 min-h-0 flex-1 overflow-y-auto">
          <dl className="grid grid-cols-3 gap-4 border-b border-neutral-200 pb-6 text-sm">
            {metricConfig.map((metric) => (
              <div key={metric.key}>
                <dt className="text-neutral-500">{metric.label}</dt>
                <dd className="mt-1 text-lg font-medium">{scoreSummary[metric.key]}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6">
            <h3 className="text-sm font-medium">Metrics over time</h3>
            <MetricChart session={session} />
          </div>

          <dl className="mt-6 grid grid-cols-3 gap-4 text-sm">
            {metricConfig.map((metric) => {
              const values = session.metrics.map((point) => point[metric.key]);
              const firstValue = values[0] ?? 0;
              const lastValue = values[values.length - 1] ?? 0;
              const delta = lastValue - firstValue;

              return (
                <div key={metric.key}>
                  <dt className="text-neutral-500">{metric.label}</dt>
                  <dd className="mt-1">
                    {firstValue} → {lastValue}
                    <span className="ml-1 text-neutral-400">
                      ({delta >= 0 ? "+" : ""}
                      {delta})
                    </span>
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      ) : (
        <p className="muted mt-6 flex flex-1 items-center justify-center border border-dashed border-neutral-200 p-6 text-center">
          No session selected.
        </p>
      )}
    </div>
  );
}
