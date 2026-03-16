"use client";

import SongCard from "../components/songcard";
import Navbar from "../components/navbar";
import { Song } from "../types/song";

// FIXME placeholder, use Spotify API to get these and find their pictures
const songs: Song[] = [
  {
    id: "1",
    name: "Placeholder Song",
    artist: "John Doe",
    album: "Album",
    image: "https://placehold.co/200",
  },
  {
    id: "2",
    name: "Placeholder Song",
    artist: "John Doe",
    album: "Album",
    image: "https://placehold.co/200",
  },
  {
    id: "3",
    name: "Placeholder Song",
    artist: "John Doe",
    album: "Album",
    image: "https://placehold.co/200",
  },
  {
    id: "4",
    name: "Placeholder Song",
    artist: "John Doe",
    album: "Album",
    image: "https://placehold.co/200",
  },
  {
    id: "5",
    name: "Placeholder Song",
    artist: "John Doe",
    album: "Album",
    image: "https://placehold.co/200",
  },
  {
    id: "6",
    name: "Placeholder Song",
    artist: "John Doe",
    album: "Album",
    image: "https://placehold.co/200",
  },
  {
    id: "7",
    name: "Placeholder Song",
    artist: "John Doe",
    album: "Album",
    image: "https://placehold.co/200",
  },
  {
    id: "8",
    name: "Placeholder Song",
    artist: "John Doe",
    album: "Album",
    image: "https://placehold.co/200",
  },
  {
    id: "9",
    name: "Placeholder Song",
    artist: "John Doe",
    album: "Album",
    image: "https://placehold.co/200",
  },
  {
    id: "10",
    name: "Placeholder Song",
    artist: "John Doe",
    album: "Album",
    image: "https://placehold.co/200",
  },
  {
    id: "11",
    name: "Placeholder Song",
    artist: "John Doe",
    album: "Album",
    image: "https://placehold.co/200",
  },
  {
    id: "12",
    name: "Placeholder Song",
    artist: "John Doe",
    album: "Album",
    image: "https://placehold.co/200",
  },
  {
    id: "13",
    name: "Placeholder Song",
    artist: "John Doe",
    album: "Album",
    image: "https://placehold.co/200",
  },
];

export default function SongsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 via-sky-200 to-blue-400 font-sans selection:bg-cyan-300">
      <Navbar />

      <main className="flex flex-col items-center justify-start px-6 py-12 min-h-[calc(100vh-80px)] relative overflow-hidden">
        {/* Decorative Sea Bubbles/Blurs in the background */}
        <div className="absolute top-20 left-10 w-40 h-40 bg-blue-300 rounded-full mix-blend-multiply filter blur-2xl opacity-50 pointer-events-none"></div>
        <div className="absolute top-60 right-20 w-32 h-32 bg-cyan-200 rounded-full mix-blend-multiply filter blur-2xl opacity-60 pointer-events-none"></div>

        <div className="text-center relative z-10 mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-cyan-950 tracking-tight drop-shadow-sm mb-4">
            Your Recommended Songs
          </h1>
          <p className="text-lg text-cyan-800 font-medium px-4">
            A splash of new tunes selected just for you.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 md:gap-14 justify-items-center w-full max-w-7xl relative z-10 pb-20">
          {songs.map((song) => (
            <div
              key={song.id}
              className="transition-transform hover:scale-105 duration-300"
            >
              <SongCard song={song} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
