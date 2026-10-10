import { Client } from "pg";

const SQL = `
    CREATE TABLE IF NOT EXISTS messages(
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        username VARCHAR(255) NOT NULL,
        message VARCHAR(500) NOT NULL,
        added TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    INSERT INTO messages(username, message)
    VALUES ('Kamran','Hello everyone'), ('Lamran','Goodbye guys'), ('obivan','hi there');
`;

async function main() {
  console.log("Seeding");
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  await client.connect();
  try {
    await client.query(SQL);
    console.log("Seeding is done.");
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error("Seeding failed:", err.message);
  process.exit(1);
});
