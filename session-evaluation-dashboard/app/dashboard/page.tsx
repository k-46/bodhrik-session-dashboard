"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { SessionFilters } from "@/components/dashboard/session-filters";
import { SessionTable } from "@/components/dashboard/session-table";
import { Session } from "@/lib/types";

export default function DashboardPage() {
  const router = useRouter();

  const [sessions, setSessions] = useState<Session[]>([]);
  const [studentFilter, setStudentFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const availableStudents = useMemo(() => {
    return [...new Set(sessions.map((session) => session.studentName))].sort();
  }, [sessions]);
  
  useEffect(() => {
    async function loadSessions() {
      const response = await fetch("/api/sessions");
      const data = await response.json();
      setSessions(data.sessions);
      console.log("sessions", sessions)
    }

    loadSessions();
  }, []);


  const filteredSessions = useMemo(() => {
    return sessions.filter((session) => {
      const studentMatch =
        !studentFilter ||
        session.studentName
          .toLowerCase()
          .includes(studentFilter.toLowerCase());

      const afterStart =
        !startDate || session.date >= startDate;

      const beforeEnd =
        !endDate || session.date <= endDate;

      return studentMatch && afterStart && beforeEnd;
    });
  }, [sessions, studentFilter, startDate, endDate]);

  function handleSelectSession(id: string) {
    router.push(`/dashboard/${id}`);
  }

  function clearFilters() {
    setStudentFilter("");
    setStartDate("");
    setEndDate("");
  }

  return (
    <main className="mx-auto flex h-dvh w-full max-w-6xl flex-col overflow-hidden px-4 py-6 sm:px-6">
      <DashboardHeader
        sessionCount={filteredSessions.length}
        onLogout={() => { }}
      />

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

      <SessionTable
        sessions={filteredSessions}
        selectedSessionId=""
        onSelect={handleSelectSession}
      />
    </main>
  );
}