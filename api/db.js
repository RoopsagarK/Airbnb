import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;

const db = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to the Database...");
});

export default db;