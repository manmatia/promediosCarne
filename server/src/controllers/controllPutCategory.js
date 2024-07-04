const { Categoria } = require("../db");
const { Op } = require("sequelize");

const controllPutCategory = async (id, updates) => {

  const category = await Categoria.findByPk(id);
  if (!category) {
    throw new Error("Category not found :)");
  }

  const { nombre, kgMedia, precio } = updates;

  const existingCategoryWithSameAttributes = await Categoria.findOne({
    where: {
      id: { [Op.not]: id },
      [Op.or]: [
        { nombre: nombre !== undefined ? nombre : category.nombre },
        { kgMedia: kgMedia !== undefined ? kgMedia : category.kgMedia },
        { precio: precio !== undefined ? precio : category.precio }
      ],
    },
  });

  const filteredUpdates = {};
  if (nombre !== undefined) filteredUpdates.nombre = nombre;
  if (kgMedia !== undefined) filteredUpdates.kgMedia = kgMedia;
  if (precio !== undefined) filteredUpdates.precio = precio;

  await category.update(filteredUpdates);
  return "Category updated successfully";
};

module.exports = controllPutCategory;
