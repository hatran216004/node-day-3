const express = require('express');

const tasksRoutes = require('./task.route');
const testRoutes = require('./test.route');

const router = express.Router();

router.use('/tasks', tasksRoutes);
router.use('/', testRoutes);

module.exports = router;
