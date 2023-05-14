const mongoose = require('mongoose');
const DB_NAME = 'userList';
const LOCAL_DB = `mongodb://127.0.0.1:27017/${DB_NAME}`;
const HOSTED_DB = `mongodb+srv://${process.env.username}:${process.env.password}@albotcluster0.fluv2fx.mongodb.net/?retryWrites=true&w=majority`;

console.log('ENVIRONMENT===PRODUCTION?', process.env.PRODUCTION);
// connects to mongoDB
mongoose.connect(process.env.PRODUCTION ? HOSTED_DB : LOCAL_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// defines the schema for the new collection in the database
const Schema = mongoose.Schema;

const userSchema = new Schema({
  initials: String,
  email: String,
});

const machineSchema = new Schema({
  externalMachineId: String,
  imgUrl: String,
  name: String,
});

const scoreSchema = new Schema({
  value: Number,
  location: String,
  user: { type: mongoose.Types.ObjectId, ref: 'Score' }, // a user has many scores
  machine: { type: mongoose.Types.ObjectId, ref: 'Machine' }, // a machine has many scores
});

scoreSchema.set('timestamps', true);

// Creates a collection in the database
const User = mongoose.model('User', userSchema);
const Machine = mongoose.model('Machine', machineSchema);
const Score = mongoose.model('Score', scoreSchema);

// exports to the collection
module.exports = { User, Machine, Score };
