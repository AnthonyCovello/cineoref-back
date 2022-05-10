const jwt = require('jsonwebtoken');
const secretKey = "mange tes morts";

const jwToken = (req, res, next) => {
    
    const token = req.body.token || req.query.token || req.headers["x-access-token"];

    if(!token) {
        return res.status(403).send("Un token d'indentification est requis")
    }
    try {
        const decoded = jwt.verify(token, secretKey)
        req.user = decoded
    } catch (err) {
        return res.status(401).json("Token invalide")
    }
    return next();
};




module.exports = jwToken;