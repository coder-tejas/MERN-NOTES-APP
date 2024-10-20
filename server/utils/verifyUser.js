import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '')|| req.cookies.access_token;
  if (!token) {
    return res.status(401).send('No token provided');
  }
//   dotenv.config()
  try {
    console.log(req.user)
    const decoded = jwt.verify(token, 'secret-123');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).send('Invalid token');
  }
};
