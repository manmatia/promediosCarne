const { Categoria } = require("../db");
const { Op } = require("sequelize");

const controllGetCategory = async (req) => {
  const { nombre } = req.query;
  if (nombre) {
    const capitalizeString = (str) => {
      let string = str.toString();
      return str
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
    };
    const categoriaWanted = capitalizeString(nombre).trim();

    const categoriaByName = await Categoria.findAll({
      where: {
        nombre: {
          [Op.iLike]: `%${categoriaWanted}%`,
        },
      },
    });
    return categoriaByName;
  }
  const allCategory = await Categoria.findAll();

  return allCategory;
};

module.exports = controllGetCategory;
