const securityModule = {
    check(req,res,next){
        console.log("security :",req.token.user);
        if(req.token.user === 'admin' || 'fondateur'){
            next();
        }
        else{
            res.redirect("/");
        }
    }
}

module.exports = securityModule;