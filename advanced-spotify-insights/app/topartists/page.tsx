"use client";

import ArtistCard from "../components/artistcard";
import Navbar from "../components/navbar";
import { Artist } from "../types/artist";
import CardDecorator from "../components/carddecorator";

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

      <main className="flex flex-col items-center justify-start px-6 py-12 min-h-[calc(100vh-80px)] relative overflow-hidden">
        {/* Decorative Sea Bubbles/Blurs */}
        <div className="absolute top-10 right-10 w-48 h-48 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-60 pointer-events-none"></div>
        <div className="absolute top-80 left-10 w-40 h-40 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none"></div>

        <div className="text-center relative z-10 mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-cyan-950 tracking-tight drop-shadow-sm mb-4">
            Your Top Artists
          </h1>
          <p className="text-lg text-cyan-800 font-medium px-4">
            The captains of your listening journey.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 md:gap-14 justify-items-center w-full max-w-7xl relative z-10 pb-20">
          {artists.map((artist) => (
            <CardDecorator key={artist.id}>
              <ArtistCard artist={artist} />
            </CardDecorator>
          ))}
        </div>
      </main>
    </div>
  );
}
