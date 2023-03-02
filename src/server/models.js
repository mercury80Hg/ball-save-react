const mongoose = require('mongoose')
const DB_NAME = 'userList'

// connects to mongoDB
mongoose.connect(`mongodb://localhost:27017/${DB_NAME}`, { useNewUrlParser: true, useUnifiedTopology: true})

// defines the schema for the new collection in the database
const Schema = mongoose.Schema;
const userListSchema = new Schema({
    userId: String,
    initials: String,
    email: String,
    machines: [
      {
        machineId: String,
        locationId: String,
        score: [{
          date: String,
          value: Number
          },
          {
            date: String,
            value: Number
          },
          {
            date: String,
            value: Number
          }, 
        ]
      }
    ]
})

// Creates a collection in the database
const User = mongoose.model('User', userListSchema)

// exports to the collection
module.exports = { User } 

