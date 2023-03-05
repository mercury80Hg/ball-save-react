const { model } = require('mongoose');
const models = require('./models');

async function getUsers(ctx) {
  try {
    ctx.response.body = await models.User.find({});
  } catch (error) {
    ctx.status = 400;
  }
}

async function getScoresByEmail(ctx) {
  try {
    let user = await models.User.findOne({
      email: ctx.params.email,
    });

    const scores = await models.Score.find({ user }).populate('machine');

    ctx.response.body = scores;
  } catch (error) {
    ctx.status = 400;
  }
}
// find or create user
async function addUser(ctx) {
  try {
    let user = await models.User.findOne({
      email: ctx.request.body.email,
    });
    console.log(user, ctx.request.body);
    if (!user) {
      user = new models.User({
        initials: ctx.request.body.initials,
        email: ctx.request.body.email,
      });
      await user.save();
    }
    ctx.response.body = user;
  } catch (error) {
    ctx.status = 500;
  }
}

// https://dev.to/alexmercedcoder/mongodb-relationships-using-mongoose-in-nodejs-54cc
// body: { externalMachineId, machineImgUrl, machineName, email, score, location }
async function addScore(ctx) {
  try {
    let machine = await models.Machine.findOne({
      externalMachineId: ctx.request.body.externalMachineId,
    });

    if (!machine) {
      machine = new models.Machine({
        name: ctx.request.body.machineName,
        imgUrl: ctx.request.body.machineImgUrl,
        externalMachineId: ctx.request.body.externalMachineId,
      });
      await machine.save();
    }

    let user = await models.User.findOne({
      email: ctx.request.body.email,
    });

    const score = await models.Score({
      value: ctx.request.body.score,
      location: ctx.request.body.location,
      user: user,
      machine: machine,
    });

    ctx.response.body = await score.save();
    // ctx.response.body = 'not broken';
  } catch (error) {
    ctx.response.body = error;
    ctx.status = 500;
  }
}
// async function removeMachine(ctx) {
//   try {
//     ctx.response.body = await models.User.deleteOne({
//       _id: ctx.request.body.id,
//     }); // rename and invoke() this method
//   } catch (error) {
//     ctx.status = 500;
//   }
// }

// make sure exports match function names when you name them
module.exports = { getUsers, getScoresByEmail, addUser, addScore };
