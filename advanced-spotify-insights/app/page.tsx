import Image from "next/image";
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black">
      <main className="flex flex-col items-center text-center gap-10 max-w-2xl px-8 py-16">
        //add image here
        <div className="w-fullflex flex-col items-center gap-6 text-center sm:items-start sm:text-center" >
          <h1 className="w-full max-w-xl text-4xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Aquatic Musical Personality Insights
          </h1>
          <p className="w-full max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            a playful psychological mirror built from your listening habits. Less what you heard and more who you are when you’re alone with your thoughts.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <Link
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="/login" //this anchor leads nowhere
            target="_blank"
            rel="noopener noreferrer"
          >
            Start
          </Link>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="" //this anchor leads nowhere
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn more
          </a>
        </div>
      </main>
    </div>
  );
}
