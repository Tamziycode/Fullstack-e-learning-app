//controls all the logic for users ie roles creation update and all of users
// Example: User Controller
const pool = require ("../db.js");

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // assuming user is from JWT middleware
    const [user] = await pool.query(
      "SELECT * FROM users WHERE id = ? ",
      [userId]
    );
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update user profile
const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { username, gender, email, password } = req.body;

    // Build the dynamic update query
    let fields = [];
    let values = [];

    if (username) {
      fields.push("username = ?");
      values.push(username);
    }
    if (gender) {
      fields.push("gender = ?");
      values.push(gender);
    }
    if (email) {
      fields.push("email = ?");
      values.push(email);
    }

    // Handle password separately for security
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      fields.push("password = ?");
      values.push(hashedPassword);
    }

    if (fields.length === 0) {
      return res.status(400).json({ message: "No fields to update" });
    }

    values.push(userId); // Add userId for WHERE clause

    const query = `UPDATE users SET ${fields.join(", ")} WHERE id = ?`;

    await pool.query(query, values);

    res.json({ message: "Profile updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = { updateUserProfile, getUserProfile }