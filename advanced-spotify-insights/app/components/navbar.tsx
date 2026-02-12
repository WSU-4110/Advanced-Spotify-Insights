import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg dark:bg-zinc-900">
        <Link
          className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
          href="/" //Leads to homepage
          target=""
          rel="noopener noreferrer"
        >
          Home
        </Link>
      </div>
    </div>
  );
}
