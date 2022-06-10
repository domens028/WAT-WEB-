//Requires
const  express = require('express');
const bp = require('body-parser');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const session = require('express-session');
const path = require('path')
const passport = require('passport')

//Initializations 
const app = express();
require('./database');
require('./config/passport')

//settings 
app.set('port',8080);
app.set('view engine','ejs')
app.engine('html',require('ejs').renderFile)
app.set('views',path.join(__dirname,'Views'))

//Middlewares
app.use(methodOverride('_method'))
// parse application/json
app.use(bp.json())
app.use(bp.urlencoded({extended: false}));
app.use(session({
    secret:'mysecret',
    resave:'true',
    saveUninitialized:'true'
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Global variables
app.use((req,res,next) => {

    res.locals.message = req.session.message
    delete req.session.message
    res.locals.loggedin = req.session.loggedin;
    res.locals.user = req.user || null;
    next();

})

//static files 
app.use(express.static(path.join(__dirname, "public")));

//routes
app.use(require('./routes/index'))
app.use(require('./routes/users'))
app.use(require('./routes/expenses'))


//listening server
app.listen(app.get('port'), () => {
console.log('Listening on port 8080');
});