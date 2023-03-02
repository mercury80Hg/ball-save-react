const models = require('./models');

async function getUsers (ctx) {
  try {
    ctx.response.body = await models.User.find({}); // rename and invoke() this method
  } catch (error) {
    ctx.status = 500;
  }
}

async function addUser (ctx) {
  try {
    const item = new models.User({ machine: ctx.request.body.machine });
    await item.save()

    ctx.response.body = item
  } catch (error) {
    ctx.status = 500;
  }
}

async function addMachine (ctx) {
  try {
    const item = new models.User({ task: ctx.request.body.task });
    await item.save()

    ctx.response.body = item
  } catch (error) {
    ctx.status = 500;
  }
}

async function addScore (ctx) {
  try {
    ctx.response.body = await models.User.updateOne({_id: ctx.request.body.id}, { task: ctx.request.body.task }) 
  } catch (error) {
    ctx.status = 500;
  }
}
async function removeMachine (ctx) { 
  try {
    ctx.response.body = await models.User.deleteOne({_id: ctx.request.body.id}) // rename and invoke() this method
  } catch (error) {
    ctx.status = 500;
  }
}

// make sure exports match function names when you name them
module.exports = { getUsers, addUser, addMachine, addScore, removeMachine };