"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function UserNav() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center gap-4">
        {session.user?.image && (
          <img
            src={session.user.image}
            alt={session.user.name ?? "User"}
            className="h-8 w-8 rounded-full border border-gray-200"
          />
        )}
        <span className="text-sm font-bold text-cyan-800 hidden sm:block">
          {session.user?.name}
        </span>
        <button
          onClick={() => signOut()}
          className="rounded-full px-3 py-2 text-sm font-bold text-cyan-800 hover:bg-cyan-100 hover:text-cyan-950 transition-all"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <Link
      href="/login"
      className="rounded-full px-3 py-2 text-sm font-bold text-cyan-800 hover:bg-cyan-100 hover:text-cyan-950 transition-all"
    >
      Login
    </Link>
  );
}
