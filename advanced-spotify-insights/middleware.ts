import { auth } from "@/auth";

export default auth((req) => {
  return;
});

export const config = {
  matcher: ["/topartists/:path*", "/recommendedsongs/:path*"],
};