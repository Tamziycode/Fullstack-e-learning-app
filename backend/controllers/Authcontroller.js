//signup,signin,logout, 
const bcrypt = require ("bcrypt");
const jwt = require ("jsonwebtoken");
const pool = require ("../db.js");



const signup = async (req,res) => {
    try {
        const { username, email, password, cpassword, gender } = req.body;

        const [existing] = await pool.query(
            "SELECT * FROM users WHERE email = ?",
            [email]
          );
      
          if (existing.length > 0) {
            return res.status(400).json({ message: "Email already registered" });
          }

          if (password !== cpassword) {
            return res.status(400).json({ message: "Passwords do not match" });
          }
          

          const hashedPassword = await bcrypt.hash(password, 10);

          // 3. Insert new user
          const [result] = await pool.query(
            "INSERT INTO users (email, username, password, gender) VALUES (?, ?, ?, ?)",
            [email, username, hashedPassword, gender]
          );
      
          // 4. Generate token
          const token = jwt.sign(
            { id: result.insertId, email },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
          );
      
          // 5. Respond
          res.status(201).json({
            message: "Signup successful",
            user: { id: result.insertId, email, username, gender },
            token,
          });
        } catch (error) {
          console.error("Error in signup controller:", error);
          res.status(500).json({ message: "Internal server error" });
        }
}

module.exports = { signup };