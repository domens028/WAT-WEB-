const expresss = require('express')
const router = expresss.Router();
//routes
router.get('/', (req, res) => {
    res.render('index.html');
 });

 router.get('/about', (req, res) => {
    res.render('about');
 });

 router.get('/contact', (req, res) => {
    res.render('contact');
 });

 router.get('/login', (req, res) => {
    res.render('login');
 });

 module.exports = router;