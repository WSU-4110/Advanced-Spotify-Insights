"use client";

import Navbar from "../components/navbar";
import ShareButtons from "./ShareButtons";
import { authClient } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type QuizResult = {
  type: string;
  image: string;
};

export default function SharePage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  useEffect(() => {
    const savedResult = localStorage.getItem("quizResult");

    if (!savedResult) {
      return;
    }

    try {
      const parsedResult = JSON.parse(savedResult);

      if (parsedResult?.type && parsedResult?.image) {
        setQuizResult(parsedResult);
      }
    } catch (error) {
      console.error("Failed to read quiz result:", error);
    }
  }, []);

  const handleDownloadImage = () => {
    if (!quizResult?.image) return;

    const link = document.createElement("a");
    link.href = quizResult.image;
    link.download = `sea-spot-${quizResult.type}-result.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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

  if (!quizResult) {
    return (
      <div className="min-h-screen bg-custom font-sans selection:bg-cyan-300">
        <Navbar />

        <main className="flex min-h-[calc(100vh-80px)] items-center justify-center px-6 py-12">
          <div className="w-full max-w-2xl rounded-[40px] border-4 border-white bg-white/90 p-8 shadow-2xl backdrop-blur-md text-center">
            <h1 className="text-3xl font-extrabold text-cyan-950 tracking-tight drop-shadow-sm">
              Share Your Result
            </h1>

            <p className="mt-4 text-lg text-cyan-800 font-medium">
              No quiz result found yet. Take the quiz first to generate your Sea Spot insight.
            </p>
          </div>
        </main>
      </div>
    );
  }


  const shareUrl = "http://localhost:3000/share";
  const shareTitle = `My Sea Spot Result: ${quizResult.type}`;
  const shareText = `I got ${quizResult.type} on Sea Spot. Check out my ocean music insight!`;

  return (
    <div className="min-h-screen bg-custom font-sans selection:bg-cyan-300">
      <Navbar />

      <main className="flex min-h-[calc(100vh-80px)] items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl rounded-[40px] border-4 border-white bg-white/90 p-8 shadow-2xl backdrop-blur-md">
          <h1 className="text-3xl font-extrabold text-cyan-950 tracking-tight drop-shadow-sm">
            Share Your Result
          </h1>

          <p className="mt-3 text-lg text-cyan-800 font-medium">
            Share your Sea Spot music insight with your friends.
          </p>

          <div className="mt-8 overflow-hidden rounded-[30px] border-4 border-cyan-100 bg-cyan-50">
            <img
              src={quizResult.image}
              alt={`${quizResult.type} Sea Spot result`}
              className="w-full object-cover"
            />
          </div>

          <div className="mt-6 rounded-[28px] border-2 border-cyan-100 bg-white/80 p-6 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600">
              Your Sea Spot Insight
            </p>

            <h2 className="mt-2 text-4xl font-extrabold text-cyan-950">
              {quizResult.type}
            </h2>

            <p className="mt-3 text-base text-cyan-800 font-medium">
              Your final ocean-inspired music personality result is ready to share.
            </p>
          </div>

          <div className="mt-8">
            <ShareButtons
              url={shareUrl}
              title={shareTitle}
              text={shareText}
              onDownload={handleDownloadImage}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
