const expresss = require('express')
const router = expresss.Router();
const {isAuthenticated} = require('../helpers/helpers');

//routes
router.get('/' ,(req, res) => {
    res.render('index.html');
 });

 



 module.exports = router;