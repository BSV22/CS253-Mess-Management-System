// middleware/roleMiddleware.js

exports.allowRoles = (...roles) => {
  return (req, res, next) => {
    try {
      if (!req.user || !req.user.role) {
        return res.status(401).json({
          error: "User not authenticated"
        });
      }

      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          error: "Access denied: insufficient permissions"
        });
      }

      next();

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
};