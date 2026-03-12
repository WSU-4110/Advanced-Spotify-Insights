import Link from "next/link";

export default function Navbar() {
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Top Artists", href: "/topartists" },
    { name: "Recent", href: "/recent" },
    { name: "Recommended", href: "/recommendedsongs" },
    { name: "Feedback", href: "/feedback" },
    { name: "Login", href: "/login" }
  ];

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

        {/* nav links wrapper - Added flex-wrap for smaller screens */}
        <div className="flex flex-wrap items-baseline gap-1 sm:gap-2 justify-end">
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
      </div>
    </nav>
  );
}
