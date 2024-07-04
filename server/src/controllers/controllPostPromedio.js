const { CorteCarne } = require('../db.js');

const controllPostPromedio = async (req) => {
  const data = req.body; // Asumiendo que req.body contiene un array de objetos

  try {
    if (Array.isArray(data)) {
      // Si es un array, usa bulkCreate para insertar todos los elementos
      await CorteCarne.bulkCreate(data);
    } else {
      // Si no es un array, inserta un solo objeto
      const { corte, kilos, precio_venta, categoriaId } = data;
      await CorteCarne.create({ corte, kilos, precio_venta, categoriaId });
    }

    return "Producto(s) agregado(s) exitosamente.";
  } catch (error) {
    throw new Error(`Error al agregar el producto: ${error.message}`);
  }
};

module.exports = controllPostPromedio;

