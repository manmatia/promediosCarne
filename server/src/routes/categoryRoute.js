const { Router } = require('express');
const getCategory = require('../handlers/getCategory');
const getCategoryById = require('../handlers/getCategoryById');
const postCategory = require('../handlers/postCategory');
const putCategory = require('../handlers/putCategory');

const categoryRouter = Router();

categoryRouter.get('/', getCategory);

categoryRouter.post('/', postCategory);

categoryRouter.put('/:id', putCategory);

categoryRouter.get('/:id', getCategoryById);

// CategoryRouter.delete('/:id', deleteCategory);

module.exports = categoryRouter;
