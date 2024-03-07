import jwt from "jsonwebtoken";

export const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    res.json("Missing authorization");
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
    if (err) return res.json("Authentication required");
    next();
  });
};
