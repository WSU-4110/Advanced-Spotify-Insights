"use client";

import { Song } from "../types/song";

type SongCardProps = {
  song: Song;
  isSaved?: boolean;
  onToggleSave?: () => void;
};

export default function SongCard({
  song,
  isSaved = false,
  onToggleSave,
}: SongCardProps) {
  return (
    <div className="relative flex w-[220px] flex-col items-center rounded-[32px] border-4 border-white bg-white/90 p-5 text-center shadow-2xl backdrop-blur-md">
      {/* SAVE / FAVORITE BUTTON */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onToggleSave?.();
        }}
        className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/85 shadow-md transition-all hover:scale-105 hover:bg-white"
        aria-label={isSaved ? "Unsave song" : "Save song"}
        title={isSaved ? "Unsave song" : "Save song"}
      >
        {isSaved ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-red-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-cyan-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        )}
      </button>

      <img
        src={song.image}
        alt={song.name}
        className="h-[200px] w-[200px] rounded-[20px] object-cover"
      />

      <p className="mt-4 text-lg font-bold text-cyan-950">{song.name}</p>
      <p className="mt-2 text-sm font-medium text-cyan-800">{song.artist}</p>
      <p className="mt-1 text-sm text-cyan-600">{song.album}</p>
    </div>
  );
}