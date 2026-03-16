"use client";

import { signIn } from "next-auth/react";

export default function SpotifySignInButton() {
  return (
    <button onClick={() => signIn("spotify", { callbackUrl: "/" })}>
      Sign in with Spotify
    </button>
  );
}
