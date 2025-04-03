const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/expenditure')
  .then(() => console.log('Connected!'));


const Schema = new mongoose.Schema({
  price:{
    type:String,
    required:true
  },
  title:{
    type:String,
    required:true,
  },
  date:{
    type:String,
    required:true,
  },
  desc:{
    type:String,
    required:true,
  }
})

let Expenditure = mongoose.model("Expenditure",Schema)

module.exports = Expenditure;