// middlewares/validateAuth.js

const validateSignup = (req, res, next) => {
    const { username, email, password, cPassword, role } = req.body;
  
    // Check required fields
    if (!username || !email || !password || !cPassword) {
      return res.status(400).json({
        message: "Please fill in all required fields: username, email, password, and confirm password.",
      });
    }
  
    // Validate username
    if (username.length < 5) {
      return res.status(400).json({
        message: "Username must be at least 5 characters long.",
      });
    }
  
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(username)) {
      return res.status(400).json({
        message: "Username can only contain letters, numbers, and underscores.",
      });
    }
  
    // Validate email format (simple regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Please enter a valid email address.",
      });
    }
  
    // Validate password strength
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
  
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.",
      });
    }
  
    // Check if passwords match
    if (password !== cPassword) {
      return res.status(400).json({
        message: "Passwords do not match.",
      });
    }
  
    // Optional role validation
    const validRoles = ["student", "instructor", "admin"];
    if (role && !validRoles.includes(role)) {
      return res.status(400).json({
        message: `Invalid role. Allowed roles are: ${validRoles.join(", ")}.`,
      });
    }
  
    next();
  };
  
  const validateSignin = (req, res, next) => {
    const { email, password } = req.body;
  
    // Check required fields
    if (!email || !password) {
      return res.status(400).json({
        message: "Please enter both email and password.",
      });
    }
  
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Please enter a valid email address.",
      });
    }
  
    next();
  };
  
  module.exports = { validateSignup, validateSignin };
  