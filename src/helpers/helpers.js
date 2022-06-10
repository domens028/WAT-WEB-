const helpers = {};

helpers.isAuthenticated = (req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    req.session.message = { 
        message: 'The email is already in use.'
    }
    res.redirect('/login')

};

module.exports = helpers;