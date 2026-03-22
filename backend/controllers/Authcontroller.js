//signup,signin
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db.js");

const signup = async (req, res) => {
  try {
    const { username, email, password, cPassword, gender, role } = req.body;

    const [existing] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (existing.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }

    if (password !== cPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Insert new user
    const [results] = await pool.query(
      "INSERT INTO users (email, username, password, gender, role) VALUES (?, ?, ?, ?, ?)",
      [email, username, hashedPassword, gender, role]
    );

    // 4. Generate token (Using req.body variables and insertId)
    const token = jwt.sign(
      { id: results.insertId, email, role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 5. Respond
    res.status(201).json({
      message: "Signup successful",
      user: { id: results.insertId, email, username, gender, role },
      token,
    });
  } catch (error) {
    console.error("Error in signup controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if the user exists
    const [existing] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (existing.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    // 2. Compare password with hashed password
    const isMatch = await bcrypt.compare(password, existing[0].password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 3. Generate JWT token
    const token = jwt.sign(
      {
        id: existing[0].id,
        email: existing[0].email,
        role: existing[0].role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // 4. Respond with success
    res.json({
      message: "Signin successful",
      user: {
        id: existing[0].id,
        email: existing[0].email,
        username: existing[0].username,
        gender: existing[0].gender,
        role: existing[0].role,
      },
      token,
    });
  } catch (error) {
    console.error("Error in signin controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { signin, signup };
