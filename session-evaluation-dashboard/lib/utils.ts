import type { MetricKey, MetricPoint, Session } from "./types";

export function averageScore(points: MetricPoint[], key: MetricKey) {
  if (points.length === 0) {
    return 0;
  }

  const total = points.reduce((sum, point) => sum + point[key], 0);
  return Math.round(total / points.length);
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}

export function formatTimeSpan(points: MetricPoint[]) {
  if (points.length === 0) {
    return "No timestamps";
  }

  return `${points[0].timestamp} to ${points[points.length - 1].timestamp}`;
}

export function sessionAverages(session: Session) {
  return {
    engagementScore: averageScore(session.metrics, "engagementScore"),
    clarityScore: averageScore(session.metrics, "clarityScore"),
    pacingScore: averageScore(session.metrics, "pacingScore"),
  };
}

export function filterSessions(
  sessions: Session[],
  studentFilter: string,
  startDate: string,
  endDate: string,
) {
  const normalizedStudent = studentFilter.trim().toLowerCase();

  return sessions
    .filter((session) => {
      const studentMatch =
        !normalizedStudent ||
        session.studentName.toLowerCase().includes(normalizedStudent);
      const afterStart = !startDate || session.date >= startDate;
      const beforeEnd = !endDate || session.date <= endDate;
      return studentMatch && afterStart && beforeEnd;
    })
    .sort((left, right) => right.date.localeCompare(left.date));
}
