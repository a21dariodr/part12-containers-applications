const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();

/* GET to-dos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST to-do to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE to-do. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET to-do. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo);
});

/* PUT to-do. */
singleRouter.put('/', async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(
    req.todo._id,
    {
      text: req.body.text,
      done: req.body.done,
    },
    {
      new: true,
      omitUndefined: true
    }
  )
  res.send(todo);
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
