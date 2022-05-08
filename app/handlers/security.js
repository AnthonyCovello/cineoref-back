const securityModule = {
    check(req,res,next){
        console.log("security :",req.session.user);
        if(req.session.user === 'admin'){
            next();
        }
        else{
            res.redirect("/");
        }
    }
}

module.exports = securityModule;