"use client";

import { useState, useEffect } from "react";
import SongCard from "../components/songcard";
import Navbar from "../components/navbar";
import { Song } from "../types/song";
import { authClient } from "@/app/lib/auth-client";
import { getMbtiRecommendations } from "@/app/recommendedsongs/recommend";
import Link from "next/link";

export default function SongsPage() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);

        // Get quiz result from localStorage
        const quizResult = JSON.parse(
          localStorage.getItem("quizResult") || "null",
        );
        if (!quizResult?.type) {
          throw new Error("No quiz result found. Take the quiz first!");
        }

        // Get the Access Token from Better Auth
        const { data: tokenData, error: tokenError } =
          await authClient.getAccessToken({
            providerId: "spotify",
          });

        if (tokenError || !tokenData?.accessToken) {
          throw new Error("Could not retrieve Spotify access token.");
        }

        // Fetch recommendations based on MBTI type
        const tracks = await getMbtiRecommendations(
          quizResult.type,
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
  }, []);

  return (
    <div className="min-h-screen bg-custom font-sans selection:bg-cyan-300">
      <Navbar />

      <main className="flex flex-col items-center justify-start px-6 py-12 min-h-[calc(100vh-80px)] relative overflow-hidden">
        <div className="absolute top-20 left-10 w-40 h-40 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none"></div>
        <div className="absolute top-60 right-20 w-32 h-32 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-60 pointer-events-none"></div>

        <div className="text-center relative z-10 mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-cyan-950 tracking-tight drop-shadow-sm mb-4">
            Your Recommended Songs
          </h1>
          <p className="text-lg text-cyan-800 font-medium px-4">
            A splash of new tunes selected just for you.
          </p>
        </div>

        {isLoading ? (
          <div className="text-cyan-900 font-bold animate-pulse">
            Finding your perfect tracks...
          </div>
        ) : error ? (
          <div className="text-red-500 font-bold">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 md:gap-14 justify-items-center w-full max-w-7xl relative z-10 pb-20">
            {songs.map((song) => (
              <Link
                href={song.url}
                key={song.id}
                className="transition-transform hover:scale-105 duration-300"
                target="_blank"
              >
                <SongCard song={song} />
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
