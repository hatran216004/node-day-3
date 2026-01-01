const express = require('express');
const { taskController } = require('@/controllers');

const router = express.Router();

router.get('/', taskController.getAll);
router.get('/:id', taskController.getOne);

router.post('/', taskController.create);
router.put('/:id', taskController.update);
router.delete('/:id', taskController.destroy);

module.exports = router;
