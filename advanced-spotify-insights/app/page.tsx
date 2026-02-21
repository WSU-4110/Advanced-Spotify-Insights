import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/navbar";

export default function Home() {
  return (
    <div>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black"
          style={{backgroundImage: "url('/AMPI background 1.png')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <main className="flex flex-col items-center text-center gap-10 max-w-2xl px-8 py-16">

          <div className="bg-[var(--color-card)] p-4 gap-14 rounded-sm px-10 py-16 w-[400px] min-h-[600px] flex flex-col justify-start">

            <div className="w-full flex flex-col items-center gap-30 text-center sm:text-center">
              <h1 className="w-full max-w-xl text-4xl font-semibold leading-10 tracking-tight text-[var(--color-text-primary)] dark:text-[var(--color-text-primary)]">
                Aquatic Musical Personality Insights
              </h1>
              <p className="w-full max-w-xl text-lg leading-8 text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary)]">
                a playful psychological mirror built from your listening habits.
                Less what you heard and more who you are when you’re alone with
                your thoughts.
              </p>
            </div>

            <div className="flex flex-col gap-4 text-base items-center justify-center font-medium sm:flex-row">
              <Link
                className="bg-[var(--color-bg-sky)] flex h-12 w-40 items-center justify-center gap-2 rounded-sm px-5 text-background text-smtransition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
                href="/login"
                target="_blank"
                rel="noopener noreferrer"
              >
                Start
              </Link>
              <a
                className="bg-[var(--color-bg-ocean)] flex h-12 text-sm w-40 items-center justify-center rounded-sm border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
                href="/feedback"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn more
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
