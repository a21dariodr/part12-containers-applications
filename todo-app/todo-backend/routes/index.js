const express = require('express');
const router = express.Router();

const redis = require('../redis')

const configs = require('../util/config')

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

/* GET redis statistics. */
router.get('/statistics', async (_, res) => {
  const todosCount = await redis.getAsync('todos');
  res.json({ added_todos: Number(todosCount) })
});

module.exports = router;
