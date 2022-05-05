const securityModule = {
    check(req,res,next){
        console.log("security :",req.session.user);
        if(req.session.user){
            next();
        }
        else{
            res.redirect("/login");
        }
    }
}

module.exports = securityModule;