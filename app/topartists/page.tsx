"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ArtistCard from "../components/artistcard";
import Navbar from "../components/navbar";
import { Artist } from "../types/artist";
import { authClient } from "@/app/lib/auth-client";

const apiValues = {
  tr: "short_term", // long_term (1 year), medium_term (6 months), short_term (4 weeks)
  limit: "21", // number of artist to get
  offset: "0", // index of first item to get (number to skip)
};

export default function ArtistsPage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  // Initialize state for artists and loading
  const [artists, setArtists] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  useEffect(() => {
    async function fetchData() {
      if (isPending || !session) {
        return;
      }

      try {
        setIsLoading(true);

        // Get the Access Token from Better Auth
        const { data: tokenData, error: tokenError } =
          await authClient.getAccessToken({
            providerId: "spotify",
          });

        if (tokenError || !tokenData?.accessToken) {
          throw new Error("Could not retrieve Spotify access token.");
        }

        // Fetch Top Artists from Spotify
        const response = await fetch(
          `https://api.spotify.com/v1/me/top/artists?time_range=${apiValues.tr}&limit=${apiValues.limit}&offset=${apiValues.offset}`,
          {
            headers: {
              Authorization: `Bearer ${tokenData.accessToken}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch top artists from Spotify");
        }

        const data = await response.json();

        const mappedArtists: Artist[] = data.items.map((item: any) => ({
          id: item.id,
          name: item.name,
          image: item.images[0]?.url || "https://placehold.co/200", // Fallback if no image
          url: item.external_urls.spotify,
        }));

        setArtists(mappedArtists);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [session, isPending]);

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


          </div>
          

        {isLoading ? (
          <div className="text-cyan-900 font-bold animate-pulse">
            Loading your vibes...
          </div>
        ) : error ? (
          <div className="text-red-500 font-bold">{error}</div>
        ) : (
          <div className="relative z-10 grid w-full max-w-7xl grid-cols-1 justify-items-center gap-10 pb-20 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-14">
            {artists.map((artist) => (
              <Link
                href={`${artist.url}`}
                key={artist.id}
                className="cursor-pointer transition-transform duration-300 hover:scale-105 hover:-rotate-1"
                target="_blank"
              >
                <ArtistCard artist={artist} />
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
