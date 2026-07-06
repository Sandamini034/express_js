import express from "express";
import cors from "cors";
import fs from "fs";

const Data = JSON.parse(
  fs.readFileSync(new URL("../authentication.json", import.meta.url))
);
const users = Data.users;

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
  })
);

app.get("/login", (req, res) => {
  res.json({ message: "Hello, World!" });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  const user = users.find((u) => u.username === username);

  if (!user || user.password !== password) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  console.log(`Username: ${username}, Password: ${password}`);
  res.json({ message: "Login successful" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
