
const { CorteCarne } = require("../db");
const { Op } = require("sequelize");

const controllPutPromedio = async (categoriaId, data) => {
  try {
    if (Array.isArray(data)) {
      // Si es un array, se asume que contiene objetos con corte y sus correspondientes updates
      const updatePromises = data.map(async (update) => {
        const { corte, kilos, precio_venta } = update;

        const promedio = await CorteCarne.findOne({
          where: {
            corte,
            categoriaId
          },
        });

        if (!promedio) {
          throw new Error(`CorteCarne with corte ${corte} in categoriaId ${categoriaId} not found`);
        }

        const filteredUpdates = {};
        if (kilos !== undefined) filteredUpdates.kilos = kilos;
        if (precio_venta !== undefined) filteredUpdates.precio_venta = precio_venta;

        await promedio.update(filteredUpdates);
      });

      await Promise.all(updatePromises);
      return "Productos actualizados exitosamente.";
    } else {
      // Si no es un array, se asume que data es un objeto con corte y sus correspondientes updates
      const { corte, kilos, precio_venta } = data;

      const promedio = await CorteCarne.findOne({
        where: {
          corte,
          categoriaId
        },
      });

      if (!promedio) {
        throw new Error(`CorteCarne with corte ${corte} in categoriaId ${categoriaId} not found`);
      }

      const filteredUpdates = {};
      if (kilos !== undefined) filteredUpdates.kilos = kilos;
      if (precio_venta !== undefined) filteredUpdates.precio_venta = precio_venta;

      await promedio.update(filteredUpdates);
      return "Producto actualizado exitosamente.";
    }
  } catch (error) {
    throw new Error(`Error al actualizar el producto: ${error.message}`);
  }
};

module.exports = controllPutPromedio;

