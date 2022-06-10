const mongoose = require('mongoose');
const findOrCreate = require("mongoose-findorcreate");
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;


const UserSchema = new Schema(
    {
      name: { type: String, required: true },
      mail: { type: String, required: true, unique:true},
      password: { type: String, required: true },
      date: { type: Date, default: Date.now },
    });

    UserSchema.plugin(findOrCreate);
    
    UserSchema.methods.encryptPassword = async (password) => {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
      };
      
      UserSchema.methods.matchPassword = async function (password) {
        return await bcrypt.compare(password, this.password);
      };

module.exports =  mongoose.model('User', UserSchema)