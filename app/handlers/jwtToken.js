const jwt = require('jsonwebtoken');
const secretKey = "mange tes morts";

const jwToken = (req, res, next) => {
    
    const decoded = req.body.token || req.query.token || req.headers["x-access-token"];

    if(!decoded) {
        return res.status(403).send("Un token d'indentification est requis")
    }
    try {
        const token = jwt.verify(decoded, secretKey)
        req.user = token
    } catch (err) {
        return res.status(401).json("Token invalide")
    }
    return next();
};




module.exports = jwToken;