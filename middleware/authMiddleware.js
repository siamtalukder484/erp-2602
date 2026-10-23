const { verifyAccessToken } = require("../helpers/tokenHelper");

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Not authorized. Provide a Bearer access token.",
    });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = verifyAccessToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired access token.",
    });
  }
};

const requiedAdmin = (req, res, next) => {
  console.log("siam",req.user.isEmailVerified)
  if(req.user.role !== "admin"){
    return res.status(403).json({
      success: false,
      message: "Admin access required."
    })
  }
  next()
}

module.exports = { protect, requiedAdmin };
