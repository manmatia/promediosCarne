// const { CorteCarne } = require("../db");
// const { Op } = require("sequelize");

// const controllPutPromedio = async (id, updates) => {
//   const promedio = await CorteCarne.findByPk(id);
//   if (!promedio) {
//     throw new Error("CorteCarne not found");
//   }

//   const { corte, kilos, precio_venta } = updates;

//   const existingCategoryWithSameAttributes = await CorteCarne.findOne({
//     where: {
//       id: { [Op.not]: id },
//       [Op.or]: [
//         { corte: corte !== undefined ? corte : promedio.corte },
//         { kilos: kilos !== undefined ? kilos : promedio.kilos },
//         { precio_venta: precio_venta !== undefined ? precio_venta : promedio.precio_venta }
//       ],
//     },
//   });

//   const filteredUpdates = {};
//   if (corte !== undefined) filteredUpdates.corte = corte;
//   if (kilos !== undefined) filteredUpdates.kilos = kilos;
//   if (precio_venta !== undefined) filteredUpdates.precio_venta = precio_venta;

//   await promedio.update(filteredUpdates);
//   return "promedio updated successfully";
// };

// module.exports = controllPutPromedio;

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


// este es mi table  import React, { useEffect, useState } from 'react';
// import { getCategories, getCategoriesId } from "../../redux/Actions";
// import { useSelector, useDispatch } from "react-redux";
// import "./Table.css"

// function Table() {
//   const [selectedId, setSelectedId] = useState(null);
//   const [selectedkgMedia, setSelectedKgMedia] = useState(null);
//   const [selectedPrecio, setSelectedPrecio] = useState(null);
//   const [totalPorcentaje, setTotalPorcentaje] = useState(0);
//   const [totalKilos, setTotalKilos] = useState(0);
//   const [totalPrecio, setTotalPrecio] = useState(0);

//   const categorias = useSelector((state) => state.categories);
//   const categoriaSeleccionada = useSelector((state) => state.allProducts) || {};
//   const cortes = categoriaSeleccionada.cortes || [];
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchCategorias = async () => {
//       dispatch(getCategories());
//     };

//     fetchCategorias();
//   }, [dispatch]);

//   useEffect(() => {
//     if (categorias.length > 0 && !selectedId) {
//       setSelectedId(categorias[0].id);
//       setSelectedKgMedia(categorias[0].kgMedia);
//       setSelectedPrecio(categorias[0].precio);
//     }
//   }, [categorias]);

//   useEffect(() => {
//     if (selectedId) {
//       const fetchCortes = async () => {
//         dispatch(getCategoriesId(selectedId));
//       };

//       fetchCortes();
//     }
//   }, [dispatch, selectedId]);

//   const handleRadioChange = (event) => {
//     const selectedCategoria = categorias.find(cat => cat.id === event.target.id);
//     setSelectedId(event.target.id);
//     setSelectedKgMedia(selectedCategoria.kgMedia);
//     setSelectedPrecio(selectedCategoria.precio);
//   };

//   useEffect(() => {
//     if (cortes.length > 0 && selectedkgMedia) {
//       let totalPorcentajeValue = 0;
//       let totalKilosValue = 0;
//       let totalPrecioValue = 0;

//       cortes.forEach(corte => {
//         totalPorcentajeValue += (corte.kilos / selectedkgMedia) * 100;
//         totalKilosValue += parseFloat(corte.kilos);
//         const precioVenta = parseFloat(corte.precio_venta);
//         if (!isNaN(precioVenta)) {
//           totalPrecioValue += parseFloat(corte.kilos) * precioVenta;
//         }
//       });

//       setTotalPorcentaje(totalPorcentajeValue);
//       setTotalKilos(totalKilosValue);
//       setTotalPrecio(totalPrecioValue);
//     } else {
//       setTotalPorcentaje(0);
//       setTotalKilos(0);
//       setTotalPrecio(0);
//     }
//   }, [cortes, selectedkgMedia]);

//   return (
//     <>
//       <br />
//       <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
//         {categorias?.map((categoria, index) => (
//           <React.Fragment key={categoria.id}>
//             <input
//               type="radio"
//               className="btn-check"
//               name="btnradio"
//               id={categoria.id}
//               autoComplete="off"
//               onChange={handleRadioChange}
//               checked={selectedId === categoria.id}
//             />
//             <label className="btn btn-outline-primary" htmlFor={categoria.id}>{categoria.nombre}</label>
//           </React.Fragment>
//         ))}
//       </div>
//       <hr />
//       <hr />

//       <div>
//         <br />
//         <table className="table table-striped table-hover">
//           <thead>
//             <tr>
//               <th scope="col">CORTE</th>
//               <th scope="col">PORCENTAJE</th>
//               <th scope="col">KILOS</th>
//               <th scope="col">PRECIO</th>
//               <th scope="col">TOTAL</th>
//             </tr>
//           </thead>
//           <tbody>
//             {cortes.length > 0 ? (
//               cortes.map((corte) => (
//                 <tr key={corte.id}>
//                   <td>{corte.corte}</td>
//                   <td>{selectedkgMedia ? ((corte.kilos / selectedkgMedia) * 100).toFixed(2) : '-'}%</td>
//                   <td>{corte.kilos}</td>
//                   <td>${parseFloat(corte.precio_venta).toFixed(2)}</td>
//                   <td>${parseFloat(corte.kilos * corte.precio_venta).toFixed(2)}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5">No hay datos disponibles</td>
//               </tr>
//             )}
//             <tr>
//               <td><strong>Total:</strong></td>
//               <td>{totalPorcentaje.toFixed(2)}%</td>
//               <td>{totalKilos.toFixed(2)}</td>
//               <td>---</td>
//               <td>${totalPrecio.toFixed(2)}</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//       <div>
//         <br />
//         <h4>Datos Adicionales</h4>
//         <table className="table table-striped table-hover">
//           <thead>
//             <tr>
//               <th scope="col">kgMedia</th>
//               <th scope="col">Precio</th>
//               <th scope="col">Costo</th>
//               <th scope="col">Venta</th>
//               <th scope="col">Utilidad</th>
//               <th scope="col">Porcentaje</th>
//               <th scope="col">Ganancia/KG</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>{selectedkgMedia}</td>
//               <td>${parseFloat(selectedPrecio).toFixed(2)}</td>
//               <td>${parseFloat(selectedPrecio).toFixed(2)*selectedkgMedia}</td>
//               <td>${totalPrecio.toFixed(2)}</td>
//               <td>${totalPrecio.toFixed(2)-(parseFloat(selectedPrecio).toFixed(2)*selectedkgMedia)}</td>
//               <td>{((((totalPrecio.toFixed(2)-(parseFloat(selectedPrecio).toFixed(2)*selectedkgMedia))/(parseFloat(selectedPrecio).toFixed(2)*selectedkgMedia)))*100).toFixed(2)}%</td>
//               <td>${((totalPrecio.toFixed(2)-(parseFloat(selectedPrecio).toFixed(2)*selectedkgMedia))/selectedkgMedia).toFixed(2)}</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// }

// export default Table;
//  necesito hacer un boton que me permita hacer un update o sea ejecutar esta funcion de redux