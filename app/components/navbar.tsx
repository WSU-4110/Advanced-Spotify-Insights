// app/components/navbar.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { authClient } from "@/app/lib/auth-client";

export default function Navbar() {
  const { data: session } = authClient.useSession();
  const [menuOpen, setMenuOpen] = useState(false);

    const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    const loadSavedSongs = () => {
      const saved = localStorage.getItem("savedRecommendedSongs");

      if (!saved) {
        setSavedCount(0);
        return;
      }

      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setSavedCount(parsed.length);
        } else {
          setSavedCount(0);
        }
      } catch (error) {
        console.error("Failed to read saved songs:", error);
        setSavedCount(0);
      }
    };

    loadSavedSongs();

    window.addEventListener("storage", loadSavedSongs);

    return () => {
      window.removeEventListener("storage", loadSavedSongs);
    };
  }, []);

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

            {session && (
              <Link
                href="/savedsongs"
                className="relative ml-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/80 border border-white shadow-md transition-all hover:scale-105 hover:bg-white"
                aria-label="Saved songs"
                title="Saved Songs"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 ${savedCount > 0 ? "text-red-500" : "text-cyan-700"}`}
                  fill={savedCount > 0 ? "currentColor" : "none"}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>

                {savedCount > 0 && (
                  <span className="absolute -top-1 -right-1 rounded-full bg-red-500 px-1.5 py-[1px] text-[10px] font-bold text-white">
                    {savedCount}
                  </span>
                )}
              </Link>
            )}

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
            aria-expanded={menuOpen ? "true" : "false"}
            aria-controls="mobile-menu"
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
          <div id="mobile-menu" className="md:hidden pb-4">
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

                            {session && (
                <Link
                  href="/savedsongs"
                  className="flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-bold text-cyan-800 hover:bg-cyan-100 hover:text-cyan-950 transition-all"
                  onClick={() => setMenuOpen(false)}
                >
                  <span>Saved Songs</span>

                  <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/80 border border-white shadow-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-4 w-4 ${savedCount > 0 ? "text-red-500" : "text-cyan-700"}`}
                      fill={savedCount > 0 ? "currentColor" : "none"}
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>

                    {savedCount > 0 && (
                      <span className="absolute -top-1 -right-1 rounded-full bg-red-500 px-1.5 py-[1px] text-[10px] font-bold text-white">
                        {savedCount}
                      </span>
                    )}
                  </span>
                </Link>
              )}

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