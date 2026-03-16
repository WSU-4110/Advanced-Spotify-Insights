"use server";
import { signIn } from "@/auth";

export async function spotifySignIn() {
  await signIn("spotify", { redirectTo: "/" });
}