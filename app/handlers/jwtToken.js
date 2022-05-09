const jwToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    {
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            jwt.verify(token, secretKey, (err))
        }
    }


}

module.exports = jwToken;