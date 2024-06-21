import { drizzle } from "drizzle-orm/vercel-postgres";
//import postgres from "postgres";

import { sql } from "@vercel/postgres";
import { env } from "@/env";
import * as schema from "./schema";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 * i think it has solved when we have used vercel-postgres
 */
// const globalForDb = globalThis as unknown as {
//   conn: ReturnType<typeof sql> | undefined;
// };

// const conn = globalForDb.conn ?? sql(env.POSTGRES_URL);
// if (env.NODE_ENV !== "production") globalForDb.conn = conn;

export const db = drizzle(sql, { schema });
