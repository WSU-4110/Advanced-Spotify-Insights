// app/components/navbar.tsx
"use client";

import Link from "next/link";
import { authClient } from "@/app/lib/auth-client";

export default function Navbar() {
  const { data: session } = authClient.useSession();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Top Artists", href: "/topartists" },
    { name: "Recommended", href: "/recommendedsongs" },
    { name: "Quiz", href: "/quiz" },
    { name: "Feedback", href: "/feedback" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-md border-b-4 border-white shadow-sm">
      <div className="mx-auto flex h-20 items-center justify-between px-6 md:px-12 max-w-7xl">
        <div className="flex flex-shrink-0 items-center">
          <Link
            href="/"
            className="text-2xl font-extrabold text-cyan-950 tracking-tight drop-shadow-sm hover:scale-105 transition-transform"
          >
            Sea Spot
          </Link>
        </div>

        <div className="flex flex-wrap items-center gap-1 sm:gap-2 justify-end">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="rounded-full px-3 py-2 text-sm font-bold text-cyan-800 hover:bg-cyan-100 hover:text-cyan-950 transition-all"
            >
              {link.name}
            </Link>
          ))}

          {session ? (
            <div className="flex items-center gap-2">
              {session.user.image && (
                <img
                  src={session.user.image}
                  alt={session.user.name ?? "Profile"}
                  className="h-9 w-9 rounded-full border-2 border-white shadow-sm object-cover"
                />
              )}
              <button
                onClick={() => authClient.signOut()}
                className="rounded-full px-4 py-2 text-sm font-bold text-white bg-cyan-500 hover:bg-cyan-400 transition-all"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="rounded-full px-4 py-2 text-sm font-bold text-white bg-cyan-500 hover:bg-cyan-400 transition-all"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
