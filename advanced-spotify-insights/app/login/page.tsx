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

      <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
        <main className="flex flex-col items-center gap-10 max-w-2xl px-6 py-12 w-full">
          <div className="bg-white/90 backdrop-blur-md p-8 rounded-[40px] border-4 border-white shadow-2xl w-full sm:w-[420px] flex flex-col justify-center relative overflow-hidden">
            <div className="w-full flex flex-col items-center gap-6 text-center z-10">
              <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-cyan-950 drop-shadow-sm">
                Login with Spotify
              </h1>
            </div>

            <form
              action={handleSubmit}
              className="flex flex-col gap-5 relative z-10 w-full"
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
                  className="w-full rounded-2xl border-2 border-cyan-300 bg-cyan-50/60 px-4 py-3 text-cyan-950 placeholder-cyan-400/80 focus:bg-white focus:border-cyan-400 focus:outline-none transition-all shadow-sm"
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
                  className="w-full rounded-2xl border-2 border-cyan-300 bg-cyan-50/60 px-4 py-3 text-cyan-950 placeholder-cyan-400/80 focus:bg-white focus:border-cyan-400 focus:outline-none transition-all shadow-sm"
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
    </div>
  );
}
