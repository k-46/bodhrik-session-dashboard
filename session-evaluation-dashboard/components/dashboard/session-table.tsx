import Link from "next/link";
import { formatDate, formatTimeSpan, sessionAverages } from "@/lib/utils";
import type { Session } from "@/lib/types";

type SessionTableProps = {
  sessions: Session[];
  selectedSessionId: string;
  onSelect: (sessionId: string) => void;
};

export function SessionTable({
  sessions,
  selectedSessionId,
  onSelect,
}: SessionTableProps) {
  return (
    <div className="panel flex h-full min-h-0 flex-col overflow-hidden">
      <div className="min-h-0 flex-1 overflow-y-auto overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="sticky top-0 z-10 border-b border-neutral-200 bg-white text-neutral-500">
            <tr>
              <th className="px-4 py-3 font-normal">Student</th>
              <th className="px-4 py-3 font-normal">Date</th>
              <th className="px-4 py-3 font-normal">Timeline</th>
              <th className="px-4 py-3 font-normal">Avg (Eng/Clr/Pacing)</th>
              <th className="px-4 py-3 font-normal text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session) => {
              const averages = sessionAverages(session);
              const isSelected = session.id === selectedSessionId;

              return (
                <tr
                  key={session.id}
                  className={`cursor-pointer border-b border-neutral-100 ${
                    isSelected ? "bg-neutral-50" : "hover:bg-neutral-50/50"
                  }`}
                  onClick={() => onSelect(session.id)}
                >
                  <td className="px-4 py-3">
                    <div className="font-medium text-neutral-900">{session.studentName}</div>
                    <div className="text-xs text-neutral-400">{session.id}</div>
                  </td>
                  <td className="px-4 py-3 text-neutral-600">{formatDate(session.date)}</td>
                  <td className="px-4 py-3 text-neutral-600">
                    {formatTimeSpan(session.metrics)}
                  </td>
                  <td className="px-4 py-3 text-neutral-600">
                    <span className="inline-flex gap-1.5 font-mono text-xs">
                      <span>{averages.engagementScore}</span> /
                      <span>{averages.clarityScore}</span> /
                      <span>{averages.pacingScore}</span>
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/dashboard/${session.id}`}
                      className="btn-ghost text-xs py-1 px-2 text-indigo-600 hover:text-indigo-800"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View →
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
