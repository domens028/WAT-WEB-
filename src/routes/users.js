const expresss = require('express');
const router = expresss.Router();
const User = require('../models/User');
const passport = require('passport')
const {isAuthenticated} = require('../helpers/helpers');

 router.get('/login', (req, res) => {
   req.session.error = { 
    message: 'You are logged in.'
  }
   res.render('login.html');
});

router.get("/logout", (req, res) => {
   req.session.loggedin = false; 
   
   req.logout(req.user, err => {
     if(err) return next(err);
     req.session.message = { 
      message: 'You are logged out.'
    }
     res.redirect("/");
   });
 });



router.post('/login', passport.authenticate('local',{ 
  failureRedirect: '/login'

}),
function(req, res) {
  req.session.loggedin = true;
  req.session.user  = req.user;
  req.session.message = { 
    message: 'You are logged in.'
  }
  res.redirect('/');
});

router.post('/auth/facebook',
passport.authenticate('facebook', { scope: 'email'}));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    req.session.loggedin = true; 
    res.redirect('/');
});

 router.get('/register', (req, res) => {
   res.render('register.html');

});



router.post('/signup',async (req,res)=>{
  const {name,mail,password,password2} = req.body;
  
  if(password == password2){
   const mailUser =  await User.findOne({mail: mail});
   console.log(mailUser)
   if (mailUser) {
    req.session.message = { 
      message: 'The email is already in use.'
    }
      res.redirect("/register");
   } else {
      // Saving a New User
      const newUser = new User({ name, mail, password });
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.session.message = { 
        message: 'You are registered'
      }
      res.redirect("/");
   }
}

   
});

 module.exports = router;