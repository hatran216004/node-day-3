const { taskModel } = require('@/models');

const getAll = async (req, res) => {
  const tasks = await taskModel.findAll();
  res.success(tasks, 200);
};

const getOne = async (req, res) => {
  const task = await taskModel.findOne(+req.params.id);
  if (!task) {
    res.success(null, 200);
  }

  res.success(task, 200);
};

const create = async (req, res) => {
  const task = await taskModel.create(req.body.title);
  res.success(task, 201);
};

const update = async (req, res) => {
  const taskId = +req.params.id;

  const task = await taskModel.findOne(taskId);
  if (!task) {
    return res.error(404, 'Resource not found');
  }

  const result = await taskModel.update(taskId, req.body);
  res.success(result, 200);
};

const destroy = async (req, res) => {
  const taskId = +req.params.id;

  const task = await taskModel.findOne(taskId);
  if (!task) {
    return res.error(404, 'Resource not found');
  }

  await taskModel.destroy(taskId);
  res.success(undefined, 204);
};

const taskController = { getAll, getOne, create, update, destroy };

module.exports = taskController;
