

export default function Feedback() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 via-sky-200 to-blue-400 font-sans selection:bg-cyan-300">
      

      <main className="flex items-center justify-center px-6 py-12 min-h-[calc(100vh-80px)]">
        {/* Feedback Card Container */}
        <div className="bg-white/90 backdrop-blur-md p-8 sm:p-12 rounded-[40px] border-4 border-white shadow-2xl w-full max-w-xl relative overflow-hidden">
          {/* Subtle decorative background blur */}
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-60 pointer-events-none"></div>

          <div className="mb-10 text-center relative z-10">
            <h1 className="text-4xl font-extrabold text-cyan-950 tracking-tight drop-shadow-sm mb-3">
              Feedback
            </h1>
            <p className="text-lg text-cyan-800 font-medium px-4">
              Help us improve your Sea Spot experience. Throw a message in a
              bottle!
            </p>
          </div>

          <form className="space-y-6 relative z-10">
            {/* Chunky Name Input */}
            <div className="space-y-2 flex flex-col">
              <label
                htmlFor="name"
                className="text-base font-bold text-cyan-900 ml-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                className="w-full rounded-2xl border-2 border-cyan-200 bg-white/60 px-4 py-3 text-cyan-950 placeholder-cyan-400/80 focus:bg-white focus:border-cyan-400 focus:outline-none transition-all shadow-sm"
              />
            </div>

            {/* Chunky Message Input */}
            <div className="space-y-2 flex flex-col">
              <label
                htmlFor="message"
                className="text-base font-bold text-cyan-900 ml-2"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder="Tell us your thoughts..."
                className="w-full rounded-2xl border-2 border-cyan-200 bg-white/60 px-4 py-3 text-cyan-950 placeholder-cyan-400/80 focus:bg-white focus:border-cyan-400 focus:outline-none transition-all shadow-sm resize-none"
              />
            </div>

            {/* Tactile Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full flex h-14 items-center justify-center rounded-full bg-cyan-500 px-6 text-white text-lg font-bold transition-all hover:bg-cyan-400 shadow-[0_6px_0_rgb(8,145,178)] hover:shadow-[0_2px_0_rgb(8,145,178)] hover:translate-y-[4px] active:shadow-none active:translate-y-[6px]"
              >
                Submit Feedback
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
