import "dotenv/config";
import express, { urlencoded } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const app = express();
const db = new pg.Client({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.PORT,
});
db.connect();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/test", (req, res) => {
  res.json("test ok");
});

app.post("/register", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  console.log(req.body);

  const hashedPassword = await bcrypt.hash(
    password,
    process.env.SALT_ROUND | 0
  );
  const result = await db.query(
    "SELECT EXISTS (SELECT email FROM users WHERE email = $1 );",
    [email]
  );
  console.log(result.rows[0].exists);
  if (!result.rows[0].exists) {
    await db.query(
      "INSERT INTO users(name, email, password) VALUES ($1, $2, $3)",
      [name, email, hashedPassword]
    );
    res.status(201).json({ message: "User registered successfully" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await db.query("SELECT * FROM users WHERE email = $1", [email]);
  console.log(user.rows);
  if (user.rows.length > 0) {
    const passwordMatch = await bcrypt.compare(password, user.rows[0].password);
    if (passwordMatch) {
      const token = jwt.sign(
        {
          name: user.rows[0].name,
          email: user.rows[0].email,
          id: user.rows[0].id,
        },
        process.env.SECRET_ACCESS_TOKEN
      );
      res
        .cookie("token", token)
        .json({ message: "Login successful", user: user });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, {}, (err, user) => {
      if (err) throw err;
      res.json(user);
    });
  } else {
    res.json(null);
  }
});

app.listen(3000, () => {
  console.log("App is running at the port 3000");
});
