const expresss = require('express');
const router = expresss.Router();
const User = require('../models/User');
const passport = require('passport')

//routes
router.get('/', (req, res) => {
    res.render('index.html');
 });

 router.get('/login', (req, res) => {
   res.render('login.html');
});

router.get("/logout", (req, res) => {
   req.session.loggedin = false; 
   req.logout(req.user, err => {
     if(err) return next(err);
     res.redirect("/");
   });
 });



router.post('/login', passport.authenticate('local',{ 
  failureRedirect: '/login' 
}),
function(req, res) {
  req.session.loggedin = true;
  req.session.user  = req.user
  res.redirect('/');
});

router.post('/auth/facebook',
  passport.authenticate('facebook'));

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
      req.flash("error_msg", "The Email is already in use.");
      res.redirect("/register");
   } else {
      // Saving a New User
      const newUser = new User({ name, mail, password });
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash("success_msg", "You are registered.");
      res.redirect("/");
   }
}


  
   
});

 module.exports = router;