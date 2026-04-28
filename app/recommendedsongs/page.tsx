"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SongCard from "../components/songcard";
import Navbar from "../components/navbar";
import { Song } from "../types/song";
import { authClient } from "@/app/lib/auth-client";
import { RecommendationContext } from "./strategy/RecommendationContext";
import { MbtiStrategy } from "./strategy/MBTIStrategy";
import Link from "next/link";

export default function SongsPage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  const [songs, setSongs] = useState<Song[]>([]);
  const [savedSongs, setSavedSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Protect page
  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  // Load saved song IDs from browser storage
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

  // Fetch recommendations
  useEffect(() => {
    async function fetchData() {
      if (isPending || !session) {
        return;
      }

      try {
        setIsLoading(true);

        const quizResult = JSON.parse(
          localStorage.getItem("quizResult") || "null",
        );

        if (!quizResult?.type) {
          throw new Error("No quiz result found. Take the quiz first!");
        }

        const { data: tokenData, error: tokenError } =
          await authClient.getAccessToken({
            providerId: "spotify",
          });

        if (tokenError || !tokenData?.accessToken) {
          throw new Error("Could not retrieve Spotify access token.");
        }

        const recommendationContext = new RecommendationContext(
            new MbtiStrategy(quizResult.type),
        );

        const tracks = await recommendationContext.getRecommendations(
          tokenData.accessToken,
        );

        const mappedSongs: Song[] = tracks.map((track: any) => ({
          id: track.id,
          name: track.name,
          artist: track.artists.map((a: any) => a.name).join(", "),
          album: track.album.name,
          image: track.album.images?.[0]?.url || "https://placehold.co/200",
          url: track.external_urls.spotify,
        }));

        setSongs(mappedSongs);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [session, isPending]);

  const toggleSaveSong = (song: Song) => {
    setSavedSongs((prev) => {
      const exists = prev.some((s) => s.id === song.id);

      const updated = exists
        ? prev.filter((s) => s.id !== song.id)
        : [...prev, song];

      localStorage.setItem(
        "savedRecommendedSongs",
        JSON.stringify(updated)
      );

      return updated;
    });
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-custom font-sans selection:bg-cyan-300">
        <Navbar />
        <main className="flex min-h-[calc(100vh-80px)] items-center justify-center px-6 py-12">
          <div className="text-cyan-900 font-bold animate-pulse">
            Checking login...
          </div>
        </main>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-custom font-sans selection:bg-cyan-300">
      <div className="fixed inset-0 -z-10 bg-custom" />
      <Navbar />

      <main className="relative flex min-h-[calc(100vh-80px)] flex-col items-center justify-start overflow-hidden px-6 py-12">
        <div className="pointer-events-none absolute left-10 top-20 h-40 w-40 rounded-full bg-blue-300 opacity-50 mix-blend-multiply blur-3xl filter"></div>
        <div className="pointer-events-none absolute right-20 top-60 h-32 w-32 rounded-full bg-cyan-200 opacity-60 mix-blend-multiply blur-3xl filter"></div>

        <div className="relative z-10 mb-12 text-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-cyan-950 drop-shadow-sm md:text-5xl">
            Your Recommended Songs
          </h1>
          <p className="px-4 text-lg font-medium text-cyan-800">
            A splash of new tunes selected just for you.
          </p>
        </div>

        {isLoading ? (
          <div className="font-bold text-cyan-900 animate-pulse">
            Finding your perfect tracks...
          </div>
        ) : error ? (
          <div className="font-bold text-red-500">{error}</div>
        ) : (
          <div className="relative z-10 grid w-full max-w-7xl grid-cols-1 justify-items-center gap-10 pb-20 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-14">
            {songs.map((song) => (
              <Link
                href={song.url}
                key={song.id}
                className="transition-transform duration-300 hover:scale-105"
                target="_blank"
              >
                <SongCard
                  song={song}
                  isSaved={savedSongs.some((s) => s.id === song.id)}
                  onToggleSave={() => toggleSaveSong(song)}
                />
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}