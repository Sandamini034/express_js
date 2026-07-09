import db from "../config/db.js";
import bcrypt from "bcrypt";

const signup = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      if (!username || !password) {
        return res
          .status(400)
          .json({ error: "Username and password are required" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const sql = "INSERT INTO users (username, password) VALUES (?, ?)";
  
      db.query(sql, [username, hashedPassword], (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Failed to create user" });
        }
        res.json({ message: "User created successfully" });
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  }

  export default signup;
