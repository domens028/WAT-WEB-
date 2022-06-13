const expresss = require('express')
const router = expresss.Router();
const {isAuthenticated} = require('../helpers/helpers');
const Bill = require('../models/Expenditure');
const User = require('../models/User');
const helpers = require('../helpers/helpers');


//routes

router.get('/expenses',isAuthenticated ,async  (req, res) => {
    const expenses = await Bill.find({user:req.session.user})
    .sort({ date: "desc" })
    .lean();
    res.render('expenses.html',{expenses});
  
});

router.post('/expenses_order',isAuthenticated ,async  (req, res) => {
    const {order} = req.body;
    var expenses = null;
    if(order == 'all'){
         expenses = await Bill.find({user:req.session.user})
        .sort({ date: "desc" })
        .lean();
    }else if(order=='zl' || order=='euro'){
         expenses = await Bill.find({$and:[{user:req.session.user},{currency:order}]})
        .sort({ date: "desc" })
        .lean();
        
    }else{
         expenses = await Bill.find({$and:[{user:req.session.user},{category:order}]})
        .sort({ date: "desc" })
        .lean();
      
    }
    res.render('expenses.html',{expenses});
  
});



router.get('/add_bill',isAuthenticated,(req, res) => {
    res.render('add_bill.html');
  
});

router.post('/delete_bill',isAuthenticated,async (req,res)=>{
    const {id} = req.body;
        // Deleting the bill
        await Bill.deleteOne({_id: id})
        req.session.message = { 
          message: 'The bill has been correctly deleted'
        }
        res.redirect("/expenses");
     });

router.post('/add_bill',isAuthenticated,async (req,res)=>{
    const {description,price,currency,category} = req.body;
        // Saving a New Bill
        var userSession = req.session.user;
        const user = await User.findOne({mail:userSession.mail});
        const newBill = new Bill({ description, price, currency,category,user });
        await newBill.save();
        req.session.message = { 
          message: 'The bill has been correctly registered'
        }
        res.redirect("/expenses");
     });


 module.exports = router;