import { promises as fs } from "fs";
import path from "path";
import type { SessionFile } from "@/lib/types";

async function loadSessionsFile(): Promise<SessionFile> {
  const filePath = path.join(process.cwd(), "data", "sessions.json");
  const fileData = await fs.readFile(filePath, "utf-8");

  return JSON.parse(fileData);
}

export async function getSessions() {
  const data = await loadSessionsFile();
  return data.sessions;
}

export async function getSessionById(id: string) {
  const sessions = await getSessions();
  return sessions.find((session) => session.id === id);
}