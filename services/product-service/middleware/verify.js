import jwt from "jsonwebtoken"

 const isVerify = (req, res, next) => {
  const token = req?.cookies?.token ;
  console.log("token is---------------", token);
  

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

export default isVerify