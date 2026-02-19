import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        //add image here
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Advanced Spotify Insights
          </h1>{" "}
          //I should probably come up with a better title
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            a playful psychological mirror built from your listening habits.
            Less what you heard and more who you are when you’re alone with your
            thoughts.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <Link
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="/login" //this anchor leads nowhere
            target=""
            rel="noopener noreferrer"
          >
            Login
          </Link>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="/feedback" //this anchor leads nowhere
            target=""
            rel="noopener noreferrer"
          >
            Feedback
          </a>
        </div>
      </main>
    </div>
  );
}
