import { db } from "@/server/db";
import { users } from "@/server/db/schema";

type NewUser = typeof users.$inferInsert;

export default async function createUser(values: NewUser) {
  await db.insert(users).values(values);

  const user = await db.query.users.findFirst({
    where: (model, { eq }) => eq(model.clerkId, values.clerkId as string),
  });

  return user;
}
