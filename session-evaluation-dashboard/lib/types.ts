export type MetricPoint = {
  timestamp: string;
  engagementScore: number;
  clarityScore: number;
  pacingScore: number;
};

export type Session = {
  id: string;
  studentName: string;
  date: string;
  metrics: MetricPoint[];
};

export type SessionFile = {
  sessions: Session[];
};

export type DataStatus =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "ready"; sessions: Session[] }
  | { status: "error"; message: string };

export type MetricKey = keyof Pick<
  MetricPoint,
  "engagementScore" | "clarityScore" | "pacingScore"
>;
