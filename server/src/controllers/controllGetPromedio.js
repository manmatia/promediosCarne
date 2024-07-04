const { CorteCarne } = require('../db');

const controllGetPromedio = async()=>{
    const allPromedio = await CorteCarne.findAll();

    return allPromedio;
};

module.exports = controllGetPromedio;