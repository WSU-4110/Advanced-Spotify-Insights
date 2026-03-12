import Navbar from "../components/navbar";
import ShareButtons from "./ShareButtons";

export default function SharePage() {
  const shareUrl = "http://localhost:3000/share";
  const shareTitle = "My Sea Spot Result";
  const shareText = "Check out my Sea Spot top artists result!";

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 via-sky-200 to-blue-400 font-sans selection:bg-cyan-300">
      <Navbar />

      <main className="flex min-h-[calc(100vh-80px)] items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl rounded-[40px] border-4 border-white bg-white/90 p-8 shadow-2xl backdrop-blur-md">
          <h1 className="text-3xl font-extrabold text-cyan-950">
            Share Your Result
          </h1>

          <p className="mt-3 text-cyan-800">
            Share your Sea Spot music insight with your friends.
          </p>

          <div className="mt-8 overflow-hidden rounded-[30px] border-4 border-cyan-100 bg-cyan-50">
            <img
              src="/share-preview.png"
              alt="Sea Spot share preview"
              className="w-full object-cover"
            />
          </div>

          <div className="mt-8">
            <ShareButtons
              url={shareUrl}
              title={shareTitle}
              text={shareText}
            />
          </div>
        </div>
      </main>
    </div>
  );
}