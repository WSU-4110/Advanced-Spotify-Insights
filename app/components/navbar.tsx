// app/components/navbar.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/app/lib/auth-client";

export default function Navbar() {
  const { data: session } = authClient.useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    ...(session
      ? [
          { name: "Top Artists", href: "/topartists" },
          { name: "Recommended", href: "/recommendedsongs" },
        ]
      : []),
    { name: "Quiz", href: "/quiz" },
    { name: "Feedback", href: "/feedback" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-md shadow-sm">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Top bar */}
        <div className="flex h-20 items-center justify-between">
          <div className="flex flex-shrink-0 items-center">
            <Link
              href="/"
              className="text-2xl font-extrabold text-cyan-950 tracking-tight drop-shadow-sm hover:scale-105 transition-transform"
              onClick={() => setMenuOpen(false)}
            >
              Sea Spot
            </Link>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center justify-end">
            <div className="flex items-center gap-1 sm:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="rounded-full px-3 py-2 text-sm font-bold text-cyan-800 hover:bg-cyan-100 hover:text-cyan-950 transition-all"
              >
                {link.name}
              </Link>
            ))}
          </div>

            {/*DIVIDER */}
            <div className="mx-6 h-6 w-px bg-gradient-to-b from-transparent via-cyan-600/60 to-transparent"></div>

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

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-full p-2 text-cyan-900 hover:bg-cyan-100 transition-all"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col gap-2 rounded-3xl bg-white/90 p-4 shadow-lg">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="rounded-2xl px-4 py-3 text-sm font-bold text-cyan-800 hover:bg-cyan-100 hover:text-cyan-950 transition-all"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              {session ? (
                <div className="flex items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-2 min-w-0">
                    {session.user.image && (
                      <img
                        src={session.user.image}
                        alt={session.user.name ?? "Profile"}
                        className="h-9 w-9 rounded-full border-2 border-white shadow-sm object-cover"
                      />
                    )}
                    <span className="truncate text-sm font-semibold text-cyan-900">
                      {session.user.name ?? "Signed in"}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      authClient.signOut();
                    }}
                    className="rounded-full px-4 py-2 text-sm font-bold text-white bg-cyan-500 hover:bg-cyan-400 transition-all whitespace-nowrap"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="mt-2 rounded-full px-4 py-3 text-center text-sm font-bold text-white bg-cyan-500 hover:bg-cyan-400 transition-all"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}