import db from "../config/db.js";
import bcrypt from "bcrypt";

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    } else if (username.length > 25) {
      return res
        .status(400)
        .json({ error: "Username must be less than 25 characters" });
    } else if (password.length > 255) {
      return res
        .status(400)
        .json({ error: " Password must be less than 255 characters" });
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email)) {
      return res.status(400).json({ error: "Invalid email format" });
    } else if (password.length < 8) {
      return res
        .status(400)
        .json({ error: " Password must be more than 8 characters" });
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        password
      )
    ) {
      return res
        .status(400)
        .json({
          error:
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        });
    }

    if (!/^[a-zA-Z0-9]+$/.test(username)) {
      return res.status(400).json({ error: "Username must be alphanumeric" });
    }

    const existingUserSql = "SELECT * FROM users WHERE username = ?";

    db.query(existingUserSql, [username], async (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to check existing user" });
      }

      if (result.length > 0) {
        return res
          .status(400)
          .json({ error: "Username already exists, try another username" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const sql =
        "INSERT INTO users (username, password, email) VALUES (?, ?, ?)";

      db.query(sql, [username, hashedPassword, email], (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Failed to create user" });
        }
        res.json({ message: "User created successfully" });
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export default signup;
