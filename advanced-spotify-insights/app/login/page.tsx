export default function Login() {


    async function handleSubmit(formData: FormData) {
        "use server";

        const username = formData.get("username");
        const password = formData.get("password");

        // TODO: Pass username and password to backend
        console.log(username)
        console.log(password)
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg dark:bg-zinc-900">
                <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
                    Login with Last.fm
                </h1>
                
                <form action={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col">
                        <label className="mb-1 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                            Username
                        </label>
                        <input
                            type="text"
                            required
                            name="username"
                            className="rounded-lg border border-zinc-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                            Password
                        </label>
                        <input
                            type="text"
                            required
                            name="password"
                            className="rounded-lg border border-zinc-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                        />
                    </div>
                    <button
                        type="submit"
                        className="mt-4 rounded-full bg-black px-5 py-2 text-white dark:bg-white dark:text-black"
                    >
                        Log In
                    </button>
                </form>
            </div>
        </div>
    );
}