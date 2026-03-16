import NextAuth from "next-auth";
import { authOptions } from "./options";

const handler = NextAuth(authOptions);

// The App Router requires you to export the handler as GET and POST
export { handler as GET, handler as POST };
