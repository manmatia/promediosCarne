const { Categoria, CorteCarne } = require("../db");

const productById = async (id) => {
  try {
    let categoria = await Categoria.findByPk(id, {
      include: [
        {
          model: CorteCarne,
          attributes: ["id", "corte", "kilos", "precio_venta"],
        }
      ],
    });

    if (!categoria) {
      throw new Error(`Categoria with id ${id} not found`);
    }

    let result = {
      id: categoria.id,
      nombre: categoria.nombre,
      precio: categoria.precio,
      kgMedia: categoria.kgMedia,
      cortes: categoria.CorteCarnes?.map(corte => ({
        id: corte.id,
        corte: corte.corte,
        kilos: corte.kilos,
        precio_venta: corte.precio_venta
      }))
    };

    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Error retrieving category by ID");
  }
};

module.exports = productById;

