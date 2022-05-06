const { Router } = require('express');
const router = Router();

const jwt = require('jsonwebtoken');
const secretKey = "clef pour déchiffrer le message";

router.post('/login', (req,res,next)=>{
    
    const decoded = jwt.verify(req.body.data, secretKey);
    console.log(decoded);
});



module.exports = router;