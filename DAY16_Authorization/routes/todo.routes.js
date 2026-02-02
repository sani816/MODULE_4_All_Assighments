const router = require('express').Router()
const auth = require('../middleware/auth.middleware')
const controller = require('../controllers/todo.controller')

router.use(auth)

router.post('/', controller.createTodo)
router.get('/', controller.getTodos)
router.put('/:id', controller.updateTodo)
router.delete('/:id', controller.deleteTodo)

module.exports = router
