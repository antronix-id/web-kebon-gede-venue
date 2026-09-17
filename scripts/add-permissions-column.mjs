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

if (!dbUrl) {
  console.error("DATABASE_URL tidak ditemukan");
  process.exit(1);
}

const client = new Client({ connectionString: dbUrl, ssl: { rejectUnauthorized: false } });

async function main() {
  await client.connect();
  
  await client.query(`
    UPDATE public.admin_users
    SET permissions = '{"dashboard","venues","gallery","events","blog","testimonials","messages","hero-slides","faq","users","settings"}'
    WHERE role = 'super_admin';
  `);

  const res = await client.query("SELECT id, email, role, permissions FROM public.admin_users");
  console.log("Updated admin_users:", res.rows);
  await client.end();
}

main().catch(console.error);
