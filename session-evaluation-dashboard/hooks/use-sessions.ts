"use client";

import { useEffect, useState } from "react";
import { SESSIONS_API_URL } from "@/lib/constants";
import type { DataStatus, SessionFile } from "@/lib/types";

export function useSessions(isEnabled: boolean) {
  const [dataState, setDataState] = useState<DataStatus>({ status: "idle" });
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    if (!isEnabled) {
      return;
    }

    let active = true;

    async function loadSessions() {
      setDataState({ status: "loading" });

      try {
        const response = await fetch(SESSIONS_API_URL);

        if (!response.ok) {
          throw new Error(`Failed to load mock JSON (${response.status})`);
        }

        const payload = (await response.json()) as SessionFile;

        if (active) {
          setDataState({ status: "ready", sessions: payload.sessions ?? [] });
        }
      } catch (error) {
        if (active) {
          setDataState({
            status: "error",
            message:
              error instanceof Error
                ? error.message
                : "Unable to load the mock data.",
          });
        }
      }
    }

    void loadSessions();

    return () => {
      active = false;
    };
  }, [isEnabled, reloadToken]);

  const retry = () => setReloadToken((value) => value + 1);
  const reset = () => setDataState({ status: "idle" });

  return { dataState, retry, reset };
}
