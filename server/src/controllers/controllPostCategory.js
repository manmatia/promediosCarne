const { Categoria} = require('../db.js');

const controllPostCategory = async (req) => {
  const { nombre, precio, kgMedia} = req.body;

    await Categoria.create({ nombre, precio, kgMedia});

  
  return "product added successfully";
};

module.exports = controllPostCategory;