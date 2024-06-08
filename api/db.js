import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;

const db = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Airbnb",
  password: "roop9854",
  port: 5432,
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to the Database...");
});

export default db;