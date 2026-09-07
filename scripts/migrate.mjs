import { readFileSync } from "fs";
import { resolve } from "path";
import pg from "pg";

const { Client } = pg;

// Read .env.local for DATABASE_URL
const envContent = readFileSync(resolve(process.cwd(), ".env.local"), "utf8");
let dbUrl = "";
for (const line of envContent.split("\n")) {
  if (line.startsWith("DATABASE_URL=")) {
    dbUrl = line.substring("DATABASE_URL=".length).trim();
    break;
  }
}

if (!dbUrl) {
  console.error("DATABASE_URL not found in .env.local");
  process.exit(1);
}

console.log("Connecting to PostgreSQL database...");
const client = new Client({
  connectionString: dbUrl,
  ssl: { rejectUnauthorized: false },
});

async function run() {
  try {
    await client.connect();
    console.log("Connected successfully to Supabase Postgres!");

    console.log("Executing 001_initial_schema.sql...");
    const schemaSql = readFileSync(
      resolve(process.cwd(), "supabase/migrations/001_initial_schema.sql"),
      "utf8"
    );
    await client.query(schemaSql);
    console.log("Schema migration completed successfully!");

    console.log("Executing seed.sql...");
    const seedSql = readFileSync(
      resolve(process.cwd(), "supabase/seed.sql"),
      "utf8"
    );
    await client.query(seedSql);
    console.log("Database seeded successfully!");

    await client.end();
    console.log("All migrations executed cleanly!");
  } catch (err) {
    console.error("Migration error:", err);
    await client.end();
    process.exit(1);
  }
}

run();
