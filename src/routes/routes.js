const expresss = require('express')
const router = expresss.Router();
//routes
router.get('/', (req, res) => {
    res.render('index.html');
 });

 router.get('/login', (req, res) => {
    res.render('login.html');
 });

 router.get('/register', (req, res) => {
   res.render('register.html');
});

 module.exports = router;