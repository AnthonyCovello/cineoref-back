const jwt = require('jsonwebtoken');
const secretKey = "mange tes morts";

// const jwToken = (req, res, next) => {
//     console.log(req.body.token);
//     console.log(req.query.token);
//     console.log(req.headers);
//     const decoded = req.body.token || req.query.token || req.headers["x-access-token"];

//     if(!decoded) {
//         return res.status(403).send("Un token d'indentification est requis")
//     }
//     try {
//         const token = jwt.verify(decoded, secretKey)
//         req.user = token
//     } catch (err) {
//         return res.status(401).json("Token invalide")
//     }
//     return next();
// };

const jwToken = (req, res, next) => {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
  
    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }
    try {
      const decoded = jwt.verify(token, secretKey);
      req.user = decoded;
    } catch (err) {
      return res.status(401).send("Invalid Token");
    }
    return next();
  };


module.exports = jwToken;