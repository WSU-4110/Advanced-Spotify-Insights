import Link from "next/link";
import {auth, signOut} from "@/auth";

export default async function Navbar() {
  const session = await auth();
  const isLoggedIn = !!session?.user;
  const publicLinks = [
    { name: "Home", href: "/" },
    { name: "Feedback", href: "/feedback" },
  ];

  const protectedLinks = [
    { name: "Top Artists", href: "/topartists" },
    { name: "Recommended", href: "/recommendedsongs" },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-md border-b-4 border-white shadow-sm">
      {/* main wrapper */}
      <div className="mx-auto flex h-20 items-center justify-between px-6 md:px-12 max-w-7xl">
        <div className="flex flex-shrink-0 items-center">
          {/* brand wrapper */}
          <Link
            href="/"
            className="text-2xl font-extrabold text-cyan-950 tracking-tight drop-shadow-sm hover:scale-105 transition-transform"
          >
            Sea Spot
          </Link>
        </div>

      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2 ml-6">
          {publicLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="rounded-full px-3 py-2 text-sm font-bold text-cyan-800 hover:bg-cyan-100 hover:text-cyan-950 transition-all"
            >
              {link.name}
            </Link>
          ))}

          {isLoggedIn && protectedLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="rounded-full px-3 py-2 text-sm font-bold text-cyan-800 hover:bg-cyan-100 hover:text-cyan-950 transition-all"
            >
              {link.name}
            </Link>
          ))}
        </div>
        
        <div className="flex items-center gap-2">
          {session?.user ? (
            <>
              {session.user.image && (
                <img
                  src={session.user.image}
                  alt={session.user.name ?? "User profile"}
                  className="h-9 w-9 rounded-full border-2 border-cyan-200 object-cover align-middle"
                />
              )}

              <span className="m1-1 text-sm font-bold text-cyan-900">
                {session.user.name ?? "User"}
              </span>

              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button
                  type="submit"
                  className="rounded-full px-3 py-2 text-sm font-bold text-cyan-800 transition-all hover:bg-cyan-100 hover:text-cyan-950"
                >
                  Logout
                </button>
              </form>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-full px-3 py-2 text-sm font-bold text-cyan-800 transition-all hover:bg-cyan-100 hover:text-cyan-950"
            >
              Login
            </Link>
          )}
        </div>
        </div>
      </div>
    </nav>
  );
}
