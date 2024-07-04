const { Router } = require('express');
const getPromedio = require('../handlers/getPromedio');
const putPromedio = require('../handlers/putPromedio');
const postPromedio = require('../handlers/postPromedio');

const promedioRouter = Router();

promedioRouter.get('/', getPromedio);

promedioRouter.post('/', postPromedio);

promedioRouter.put('/:id', putPromedio);

// promedioRouter.get('/:id', getPromedioById);

// promedioRouter.delete('/:id', deletePromedio);

module.exports = promedioRouter;

