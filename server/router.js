const Router = require('koa-router');
const router = new Router();

const controller = require('./controller');

// fill in path and controller handler for each -  i.e. router.get('/list', controller.getList)
router.get('/users', controller.getUsers);

router.get('/scores/:email', controller.getScoresByEmail);

// router.get('/history',controller.getHistoryList )
router.post('/user', controller.addUser);
router.post('/score', controller.addScore);

// router.delete('/', controller.removeMachine);

module.exports = router;
