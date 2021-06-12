const jwt = require("jsonwebtoken");
const auth = async (req, res, next) => {
  // get the token from the header
  const token = req.header("x-auth-token");

  // check if not token
  if (!token) {
    return res.status(401).json({ msg: "no token, authorisation denied" });
  }

  // verify the token 
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    console.log(decoded)
  
      req.contact = decoded.contact;
      next();
    }
  catch (error) {
    res.status(401).json({ msg: "token is not valid" });
  }
};

module.exports = auth;
