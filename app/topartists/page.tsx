"use client";

import Link from "next/link";
import ArtistCard from "../components/artistcard";
import Navbar from "../components/navbar";
import { Artist } from "../types/artist";

// FIXME placeholder, use Spotify API to get these and find their pictures
const artists: Artist[] = [
  { id: "1", name: "Johnny Music", image: "https://placehold.co/200" },
  { id: "2", name: "Test Artist", image: "https://placehold.co/200" },
  { id: "3", name: "Another Test Artist", image: "https://placehold.co/200" },
  { id: "4", name: "Cool Music McGee", image: "https://placehold.co/200" },
  { id: "5", name: "Holder of Place", image: "https://placehold.co/200" },
  {
    id: "6",
    name: "Taylor Swift or Something",
    image: "https://placehold.co/200",
  },
  { id: "7", name: "Placeholder", image: "https://placehold.co/200" },
  { id: "8", name: "Placeholder", image: "https://placehold.co/200" },
  { id: "9", name: "Placeholder", image: "https://placehold.co/200" },
  { id: "10", name: "Placeholder", image: "https://placehold.co/200" },
  { id: "11", name: "Placeholder", image: "https://placehold.co/200" },
];

export default function ArtistsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 via-sky-200 to-blue-400 font-sans selection:bg-cyan-300">
      <Navbar />

      <main className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-start overflow-hidden px-6 py-12 relative">
        <div className="absolute top-10 right-10 h-48 w-48 rounded-full bg-cyan-200 opacity-60 mix-blend-multiply blur-3xl filter pointer-events-none"></div>
        <div className="absolute top-80 left-10 h-40 w-40 rounded-full bg-blue-300 opacity-50 mix-blend-multiply blur-3xl filter pointer-events-none"></div>

        <div className="relative z-10 mb-12 text-center">
          <h1 className="mb-4 text-4xl md:text-5xl font-extrabold tracking-tight text-cyan-950 drop-shadow-sm">
            Your Top Artists
          </h1>
          <p className="px-4 text-lg font-medium text-cyan-800">
            The captains of your listening journey.
          </p>

          <div className="mt-6">
            <Link
              href="/share"
              className="inline-flex h-12 items-center justify-center rounded-full bg-cyan-500 px-6 text-base font-bold text-white transition-all hover:bg-cyan-400 shadow-[0_6px_0_rgb(8,145,178)] hover:shadow-[0_2px_0_rgb(8,145,178)] hover:translate-y-[4px] active:shadow-none active:translate-y-[6px]"
            >
              Share My Result
            </Link>
          </div>
        </div>

        <div className="relative z-10 grid w-full max-w-7xl grid-cols-1 justify-items-center gap-10 pb-20 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-14">
          {artists.map((artist) => (
            <div
              key={artist.id}
              className="cursor-pointer transition-transform duration-300 hover:scale-105 hover:-rotate-1"
            >
              <ArtistCard artist={artist} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
