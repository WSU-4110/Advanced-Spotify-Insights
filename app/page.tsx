import Link from "next/link";
import Navbar from "./components/navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 via-sky-200 to-blue-400 font-sans selection:bg-cyan-300">
      <Navbar />

      <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
        <main className="flex flex-col items-center text-center gap-10 max-w-2xl px-6 py-12">
          <div className="bg-white/90 backdrop-blur-md p-8 rounded-[40px] border-4 border-white shadow-2xl w-full sm:w-[420px] min-h-[550px] flex flex-col justify-center relative overflow-hidden">
            <div className="w-full flex flex-col items-center gap-6 text-center z-10">
              <h1 className="w-full text-5xl font-extrabold leading-tight tracking-tight text-cyan-950 drop-shadow-sm">
                Sea Spot
              </h1>
              <p className="w-full text-lg leading-relaxed text-cyan-800 font-medium px-2">
                A playful psychological mirror built from your listening habits.
                Less what you heard and more who you are when you’re alone with
                your thoughts.
              </p>
            </div>

            <div className="flex flex-col gap-4 items-center justify-center font-bold sm:flex-row w-full mt-10 z-10">
              <Link
                className="flex h-14 w-full sm:w-40 items-center justify-center rounded-full bg-cyan-500 px-6 text-white text-lg transition-all hover:bg-cyan-400 shadow-[0_6px_0_rgb(8,145,178)] hover:shadow-[0_2px_0_rgb(8,145,178)] hover:translate-y-[4px] active:shadow-none active:translate-y-[6px]"
                href={"/login"}
              >
                Let's Start!
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
