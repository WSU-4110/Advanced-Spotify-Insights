"use client";

import { authClient } from "@/app/lib/auth-client";

export default function SpotifySignInButton() {
  const handleSignIn = async () => {
    await authClient.signIn.social({
      provider: "spotify",
      callbackURL: "/topartists",
    });
  };

  return (
    <button
      onClick={handleSignIn}
      className="flex h-14 w-full items-center justify-center rounded-full bg-emerald-500 px-6 text-white text-lg font-bold transition-all hover:bg-emerald-400 shadow-[0_6px_0_rgb(16,185,129)] hover:shadow-[0_2px_0_rgb(16,185,129)] hover:translate-y-[4px] active:shadow-none active:translate-y-[6px]"
    >
      Sign in with Spotify
    </button>
  );
}
