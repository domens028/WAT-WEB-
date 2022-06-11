const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = require('../models/User');

const Expenditure = new Schema(
    {
      description: { type: String, required: true },
      price: { type: Number, required: true},
      date: { type: Date, default: Date.now },
      currency: {type:String, required:true},
      category: {type:String, required:true},
      user : { type: Schema.Types.ObjectId, ref: 'User' },
    });


module.exports =  mongoose.model('Expenditure', Expenditure)