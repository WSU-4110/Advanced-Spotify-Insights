"use server";
import { signIn } from "@/auth";

export async function signInSpotify() {
  await signIn("spotify", { redirectTo: "/" });
}