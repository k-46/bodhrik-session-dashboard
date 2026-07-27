import type { MetricKey } from "./types";

export const metricConfig: Array<{ key: MetricKey; label: string; color: string }> = [
  { key: "engagementScore", label: "Engagement", color: "#e03737" },
  { key: "clarityScore", label: "Clarity", color: "#5f36e8" },
  { key: "pacingScore", label: "Pacing", color: "#34db56" },
];
