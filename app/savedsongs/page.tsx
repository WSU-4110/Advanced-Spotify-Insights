"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import SongCard from "../components/songcard";
import { Song } from "../types/song";
import Link from "next/link";

export default function SavedSongsPage() {
  const [savedSongs, setSavedSongs] = useState<Song[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("savedRecommendedSongs");

    if (!saved) return;

    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        setSavedSongs(parsed);
      }
    } catch (error) {
      console.error("Failed to read saved songs:", error);
    }
  }, []);

  const removeSong = (songId: string) => {
    const updated = savedSongs.filter((song) => song.id !== songId);
    setSavedSongs(updated);
    localStorage.setItem("savedRecommendedSongs", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-custom font-sans selection:bg-cyan-300">
      <Navbar />

      <main className="flex flex-col items-center px-6 py-12">
        <h1 className="text-4xl font-extrabold text-cyan-950 mb-8">
          Your Saved Songs
        </h1>

        {savedSongs.length === 0 ? (
          <p className="text-cyan-800 font-medium">
            No saved songs yet. Go favorite some!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {savedSongs.map((song) => (
              <Link href={song.url} key={`${song.id}-${song.name}`} target="_blank">
                <SongCard
                  song={song}
                  isSaved={true}
                  onToggleSave={() => removeSong(song.id)}
                />
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}