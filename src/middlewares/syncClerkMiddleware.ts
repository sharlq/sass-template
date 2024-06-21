import { db } from "@/server/db";
import createUser from "@/server/db/user/createUser";
import {
  ClerkMiddlewareAuth,
  User,
  auth,
  clerkClient,
  currentUser,
  getAuth,
} from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export default async function syncClerkMiddleware(auth: ClerkMiddlewareAuth) {
  try {
    const { userId } = auth();

    if (!userId) return NextResponse.next();

    const syncedUser = await db.query.users.findFirst({
      where: (model, { eq }) => eq(model.clerkId, userId),
    });

    if (syncedUser) return NextResponse.next();

    const user = await clerkClient.users.getUser(userId);

    await createUser({
      clerkId: user.id,
      userName: user.username as string,
      email: user.emailAddresses[0]?.emailAddress as string,
      createdAt: new Date(user.createdAt),
    });

    return NextResponse.next();
  } catch (error) {
    console.error("Error in middleware:", error);
    return NextResponse.error();
  }
}
