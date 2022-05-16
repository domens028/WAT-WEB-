//Requires
const  express = require('express');
const path = require('path')
const app = express();


//settings 
app.set('port',8080);
app.set('view engine','ejs')
app.engine('html',require('ejs').renderFile)
app.set('views',path.join(__dirname,'Views'))

//routes
app.use(require('./routes/routes'))

//static files 
app.use(express.static(path.join(__dirname, "public")));

//listening server
app.listen(app.get('port'), () => {
console.log('Listening on port 8080');
});