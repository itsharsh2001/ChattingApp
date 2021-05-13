const mongoose = require('mongoose');
const {People} = require('../models/people.js')
mongoose.connect('mongodb://localhost:27017/chatter', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
	console.log("Connected to MongoDB")
}).catch((err) => {
	console.log(`Error in connecting to database ${err}`)
})

findPerson = async function(name, _id){
    
    const person = await People.findOne({
        name : name,
        _id : _id
    }).lean()
    // console.log(person)
    return person
}

module.exports = {
    findPerson
}