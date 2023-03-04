const Router = require('koa-router');
const router = new Router();

const controller = require('./controller');

router.get('/users', controller.getUsers);
router.get('/scores/:email', controller.getScoresByEmail);

// router.get('/history',controller.getHistoryList )
router.post('/user', controller.addUser);
router.post('/score', controller.addScore);

// router.delete('/', controller.removeMachine);

module.exports = router;
