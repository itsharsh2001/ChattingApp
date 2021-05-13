const mongoose = require('mongoose');
let peopleSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String  
});

People = mongoose.model('People',peopleSchema, 'people');

module.exports.People = People