const mongoose = require('mongoose');
const { Schema } = mongoose;

const Expenditure = new Schema(
    {
      description: { type: String, required: true },
      price: { type: String, required: true},
      date: { type: Date, default: Date.now },
      currency: {type:String, required:true},
      category: {type:String, required:true},
      mail: {type:String}
    });


module.exports =  mongoose.model('Expenditure', Expenditure)