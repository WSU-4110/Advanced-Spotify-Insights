// app/login/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { authClient } from "@/app/lib/auth-client";
import Navbar from "../components/navbar";
import SpotifySignInButton from "../components/SpotifySignInButton";

export default function Login() {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.replace("/topartists");
    }
  }, [session, router]);

  return (
    <div className="min-h-screen bg-custom font-sans selection:bg-cyan-300">
      <Navbar />

      <main className="flex min-h-[calc(100vh-80px)] items-center justify-center px-6">
        <div className="w-full max-w-md rounded-[40px] bg-white/90 backdrop-blur-md p-10 shadow-2xl border-4 border-white relative overflow-hidden">
          <div className="relative z-10 flex flex-col items-center gap-8 text-center">
            <div>
              <h1 className="text-3xl font-extrabold text-cyan-950 tracking-tight mb-3">
                Connect with Spotify
              </h1>
              <p className="text-cyan-700 font-medium leading-relaxed">
                Sign in with your Spotify account to explore your listening
                habits and get personalized insights.
              </p>
            </div>

            <SpotifySignInButton />
          </div>
        </div>
      </main>
    </div>
  );
}
