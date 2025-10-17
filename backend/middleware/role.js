const authorizeRole = (...allowedRoles) => {
  return (req, res, next) => {
    console.log("🧠 authorizeRole check:", {
      user: req.user,
      allowedRoles
    });

    if (!req.user || !req.user.role) {
      return res.status(403).json({ message: "User role not found or unauthorized." });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied. You do not have permission to perform this action.",
      });
    }

    next(); // all good
  };
};

module.exports = { authorizeRole };
