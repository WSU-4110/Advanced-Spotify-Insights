import {signIn} from "@/auth";

export default function Login() {

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 via-sky-200 to-blue-400 font-sans selection:bg-cyan-300">
      
      <main className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg dark:bg-zinc-900">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Login with Google
          </h1>

          <form
            action={async () => {
              "use server";
              await signIn("google", {redirectTo: "/"});
            }}
            className="pt-6"
          >
            

            

            
              <button
                type="submit"
                className="w-full flex h-14 items-center justify-center rounded-full bg-cyan-500 px-6 text-white text-lg font-bold transition-all hover:bg-cyan-400 shadow-[0_6px_0_rgb(8,145,178)] hover:shadow-[0_2px_0_rgb(8,145,178)] hover:translate-y-[4px] active:shadow-none active:translate-y-[6px]"
              >
                Continue with Google
              </button>

          </form>
        </div>
      </main>
    </div>
  );
}
