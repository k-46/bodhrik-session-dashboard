import Link from "next/link";
import { notFound } from "next/navigation";
import { SessionDetail } from "@/components/dashboard/session-detail";
import { getSessionById } from "@/lib/session-service";

export default async function SessionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getSessionById(id);

  if (!session) {
    notFound();
  }

  return (
    <main className="mx-auto flex h-dvh w-full max-w-6xl flex-col overflow-hidden px-4 py-6 sm:px-6">
      <header className="mb-6 flex shrink-0 items-center justify-between border-b border-neutral-200 pb-4">
        <Link href="/dashboard" className="btn-ghost flex items-center gap-2">
          ← Back to Dashboard
        </Link>
        <Link href="/login" className="btn-ghost">
          Log out
        </Link>
      </header>

      <div className="min-h-0 flex-1">
        <SessionDetail session={session} />
      </div>
    </main>
  );
}
