import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: [
    "/feedback/:path*",
    "/quiz/:path*",
    "/recommendedsongs/:path*",
    "/share/:path*",
    "/topartists/:path*",
  ],
};
