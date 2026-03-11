import Navbar from "../components/navbar";

export default function Login() {
  async function handleSubmit(formData: FormData) {
    "use server";

    const username = formData.get("username");
    const password = formData.get("password");

    console.log(username);
    console.log(password);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 via-sky-200 to-blue-400 font-sans selection:bg-cyan-300">
      <Navbar />
      <main className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg dark:bg-zinc-900">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
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
