import Navbar from "../components/navbar";
import SpotifySignInButton from "../components/SpotifySignInButton";

export default function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 via-sky-200 to-blue-400 font-sans selection:bg-cyan-300">
      <Navbar />

      <main className="flex min-h-[calc(100vh-80px)] items-center justify-center px-6">
        <div className="w-full max-w-md rounded-[40px] bg-white/90 p-10 shadow-2xl border-4 border-white relative overflow-hidden">
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

             <SpotifySignInButton/>
          </div>
        </div>
      </main>
    </div>
  );
}