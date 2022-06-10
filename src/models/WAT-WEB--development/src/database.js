const mongoose = require('mongoose');
//This part of the code is for the functionlaity of the library 
mongoose.connect('mongodb://localhost/users-db',{

}).then(db=>console.log('DB connect'))
  .catch(err=>console.error(err))
    ;
