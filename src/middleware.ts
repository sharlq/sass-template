import {
  User,
  clerkClient,
  clerkMiddleware,
  createRouteMatcher,
  currentUser,
  getAuth,
} from "@clerk/nextjs/server";
import syncClerkMiddleware from "./middlewares/syncClerkMiddleware";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import createUser from "./server/db/user/createUser";
import { db } from "./server/db";

export default clerkMiddleware(async (auth) => {
  await syncClerkMiddleware(auth);
});

/*
export async function middleware(req: NextRequest, event: NextFetchEvent) {
  const clerkResponse = await clerkMiddleware()(req, event);
  if (clerkResponse) {
    return clerkResponse;
  }
  console.log("hi middleware");
  // Apply custom syncClerkMiddleware
  // if (req.nextUrl.pathname.includes("api")) {
  // }
  const syncResponse = await syncClerkMiddleware();
  if (syncResponse) {
    return syncResponse;
  }

  // Continue to the next middleware or to the request handler
  return NextResponse.next();
}
  */

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
