import Link from "next/link";

export default function Navbar() {
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Feedback", href: "/feedback" },
    { name: "Login", href: "/login" },
  ];

  return (
    <nav className="sticky top-0 border-b border-gray-800 z-50 w-full bg-black">
      {/* main wrapper*/}
      <div className="mx-auto flex h-16 items-center justify-between px-4 px-6">
        <div className="flex flex-shrink-0 items-center">
          {" "}
          {/* brand wrapper */}
          <Link href="/" className="text-xl font-bold">
            Advanced Spotify Insights
          </Link>
        </div>

        <div className="flex items-baseline">
          {/* nav links wrapper*/}
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium dark:hover:bg-gray-800"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
