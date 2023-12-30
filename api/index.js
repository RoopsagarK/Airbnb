import "dotenv/config";
import express, { urlencoded } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import db from "./db.js";

const app = express();

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

  const hashedPassword = await bcrypt.hash(
    password,
    process.env.SALT_ROUND | 0
  );
  const result = await db.query(
    "SELECT EXISTS (SELECT email FROM users WHERE email = $1 );",
    [email]
  );
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

app.get("/profile", authenticateToken, (req, res) => {
  if (req.user) {
    console.log(req.user);
    res.json(req.user);
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

function authenticateToken(req, res, next) {
  const { token } = req.cookies;
  if (token == null) {
    return res.sendStatus(401);
  }
  jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, {}, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
app.listen(3000, () => {
  console.log("App is running at the port 3000");
});
