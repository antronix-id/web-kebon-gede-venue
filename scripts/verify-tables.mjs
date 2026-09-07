import { readFileSync } from "fs";
import { resolve } from "path";
import pg from "pg";

const { Client } = pg;

const envContent = readFileSync(resolve(process.cwd(), ".env.local"), "utf8");
let dbUrl = "";
for (const line of envContent.split("\n")) {
  if (line.startsWith("DATABASE_URL=")) {
    dbUrl = line.substring("DATABASE_URL=".length).trim();
    break;
  }
}

const client = new Client({ connectionString: dbUrl, ssl: { rejectUnauthorized: false } });

async function verify() {
  await client.connect();
  const tablesRes = await client.query(`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
    ORDER BY table_name;
  `);

  console.log("=== DAFTAR TABEL DI SUPABASE ANDA ===");
  for (const row of tablesRes.rows) {
    const countRes = await client.query(`SELECT COUNT(*) FROM public."${row.table_name}"`);
    console.log(`- ${row.table_name.padEnd(20)} : ${countRes.rows[0].count} data`);
  }

  const bucketsRes = await client.query(`
    SELECT id, name, public FROM storage.buckets ORDER BY id;
  `);
  console.log("\n=== DAFTAR STORAGE BUCKETS DI SUPABASE ===");
  for (const b of bucketsRes.rows) {
    console.log(`- ${b.id.padEnd(22)} : Public (${b.public})`);
  }

  await client.end();
}

verify().catch(console.error);
