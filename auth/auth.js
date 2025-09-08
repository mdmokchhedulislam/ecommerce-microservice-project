import jwt from "jsonwebtoken"

 const auth = (req, res, next) => {
   console.log("AUTH work");
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, "mokchhedulislam");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" });
  }
}

export default auth;
