import Navbar from "../components/navbar";

export default function Login() {
  async function handleSubmit(formData: FormData) {
    "use server";

    const username = formData.get("username");
    const password = formData.get("password");

    // TODO: Pass username and password to backend
    console.log(username);
    console.log(password);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 via-sky-200 to-blue-400 font-sans selection:bg-cyan-300">
      <Navbar />

      <main className="flex items-center justify-center px-6 py-12 min-h-[calc(100vh-80px)]">
        <div className="bg-white/90 backdrop-blur-md p-8 sm:p-12 rounded-[40px] border-4 border-white shadow-2xl w-full max-w-md relative overflow-hidden">

          <h1 className="text-3xl sm:text-4xl font-extrabold text-cyan-950 tracking-tight drop-shadow-sm mb-8 text-center relative z-10">
            Login with Spotify
          </h1>

          <form
            action={handleSubmit}
            className="flex flex-col gap-5 relative z-10"
          >
            <div className="flex flex-col gap-2">
              <label className="text-base font-bold text-cyan-900 ml-2">
                Username
              </label>
              <input
                type="text"
                required
                name="username"
                placeholder="Enter your username"
                className="w-full rounded-2xl border-2 border-cyan-200 bg-white/60 px-4 py-3 text-cyan-950 placeholder-cyan-400/80 focus:bg-white focus:border-cyan-400 focus:outline-none transition-all shadow-sm"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-base font-bold text-cyan-900 ml-2">
                Password
              </label>
              <input
                type="password"
                required
                name="password"
                placeholder="Enter your password"
                className="w-full rounded-2xl border-2 border-cyan-200 bg-white/60 px-4 py-3 text-cyan-950 placeholder-cyan-400/80 focus:bg-white focus:border-cyan-400 focus:outline-none transition-all shadow-sm"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full flex h-14 items-center justify-center rounded-full bg-cyan-500 px-6 text-white text-lg font-bold transition-all hover:bg-cyan-400 shadow-[0_6px_0_rgb(8,145,178)] hover:shadow-[0_2px_0_rgb(8,145,178)] hover:translate-y-[4px] active:shadow-none active:translate-y-[6px]"
              >
                Log In
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
