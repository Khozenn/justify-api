import mongoose from "mongoose"

// Model User afin de stocker de manière permanente avec seulement un mail et un nombre de mots fixé
const userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
    },
    wordsLeft: {
      type: Number,
      default: 80000,
    },
  });
  
module.exports = mongoose.model('User', userSchema)