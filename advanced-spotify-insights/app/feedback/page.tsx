import Navbar from "../components/navbar";

export default function Feedback() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* main wrapper - spans full width since max-w is removed */}
      <main className="px-6 py-20">
        <div className="mb-10">
          <h1 className="text-2xl font-bold">Feedback</h1>
          <p className="text-sm text-gray-500">
            Help us improve Advanced Spotify Insights.
          </p>
        </div>

        <form className="space-y-6">
          {/* name input box */}
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              className="w-full rounded-md border border-gray-800 px-3 py-2 text-sm"
            />
          </div>

          {/* message input box */}
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              className="w-full rounded-md border border-gray-800 px-3 py-2 text-sm"
            />
          </div>

          {/* submit button */}
          <button
            type="submit"
            className="rounded-md bg-white px-4 py-2 text-sm font-medium text-black hover:bg-gray-300"
          >
            Submit Feedback
          </button>
        </form>
      </main>
    </div>
  );
}
