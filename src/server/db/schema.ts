// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `project-template_${name}`);

export const users = createTable(
  "user",
  {
    id: serial("id").primaryKey(),
    clerkId: varchar("clerk_id").unique(),
    userName: varchar("user_name", { length: 256 }).unique().notNull(),
    email: varchar("email", { length: 256 }).unique().notNull(),
    phone: varchar("phone", { length: 256 }).unique(),
    firstName: varchar("first_name", { length: 256 }),
    lastName: varchar("last_name", { length: 256 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }),
  },
  (example) => ({
    idIndex: index("id_idx").on(example.id),
    idUserName: index("user_name_idx").on(example.userName),
  }),
);
