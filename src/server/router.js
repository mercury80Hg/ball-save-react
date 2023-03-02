
const Router = require('koa-router');
const router = new Router();

const controller = require('./controller');

// fill in path and controller handler for each -  i.e. router.get('/list', controller.getList)
router.get('/', controller.getUsers);
router.get('/', controller.getUsers);
// router.get('/history',controller.getHistoryList )
router.post('/', controller.addMachine);
router.put('/', controller.addScore);
router.delete('/', controller.removeMachine);

module.exports = router;