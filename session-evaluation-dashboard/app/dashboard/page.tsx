"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { SessionTable } from "@/components/dashboard/session-table";
import { Session } from "@/lib/types";

export default function DashboardPage() {
  const router = useRouter();
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    async function loadSessions() {
      const response = await fetch("/api/sessions");
      const data = await response.json();
      setSessions(data);
    }

    loadSessions();
  }, []);

  function handleSelectSession(id: string) {
    router.push(`/dashboard/${id}`);
  }


  return (
    <main>
      <DashboardHeader
        sessionCount={sessions.length}
        onLogout={() => {}}
      />

      <SessionTable
        sessions={sessions.sessions || []}
        selectedSessionId=""
        onSelect={handleSelectSession}
      />
    </main>
  );
}