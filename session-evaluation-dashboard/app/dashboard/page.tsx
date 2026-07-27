"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { SessionFilters } from "@/components/dashboard/session-filters";
import { SessionTable } from "@/components/dashboard/session-table";

import { useSessions } from "@/hooks/use-sessions";
import { filterSessions } from "@/lib/utils";
import type { Session } from "@/lib/types";

export default function DashboardPage() {
  const router = useRouter();
  const isEnabled = true
  const { dataState, retry } = useSessions(isEnabled);

  const [studentFilter, setStudentFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const EMPTY_SESSIONS: Session[] = [];

  const sessions =
    dataState.status === "ready"
      ? dataState.sessions
      : EMPTY_SESSIONS;

  const availableStudents = useMemo(() => {
    return Array.from(
      new Set(sessions.map((session) => session.studentName))
    ).sort((left, right) => left.localeCompare(right));
  }, [sessions]);

  const filteredSessions = useMemo(() => {
    return filterSessions(
      sessions,
      studentFilter,
      startDate,
      endDate
    );
  }, [sessions, studentFilter, startDate, endDate]);

  async function handleLogout() {
    const response = await fetch("/api/auth", {
      method: "DELETE",
    });

    if (response.ok) {
      router.push("/login");
      router.refresh();
    }
  }

  function clearFilters() {
    setStudentFilter("");
    setStartDate("");
    setEndDate("");
  }

  function handleSelectSession(id: string) {
    router.push(`/dashboard/${id}`);
  }

  return (
    <main className="mx-auto flex h-dvh w-full max-w-6xl flex-col overflow-hidden px-4 py-6 sm:px-6">
      <DashboardHeader
        sessionCount={sessions.length}
        onLogout={handleLogout}
      />

      <section className="flex min-h-0 flex-1 flex-col gap-4">
        <SessionFilters
          studentFilter={studentFilter}
          startDate={startDate}
          endDate={endDate}
          availableStudents={availableStudents}
          filteredCount={filteredSessions.length}
          onStudentChange={setStudentFilter}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          onClear={clearFilters}
        />

        <div className="min-h-0 flex-1">
          <SessionTable
            sessions={filteredSessions}
            selectedSessionId=""
            onSelect={handleSelectSession}
          />
        </div>
      </section>
    </main>
  );
}