import React, { useEffect, useState } from 'react';
import { getCategories, getCategoriesId } from "../../redux/Actions";
import { useSelector, useDispatch } from "react-redux";
import * as XLSX from 'xlsx';
import "./Edicion.css";

function Edicion() {
  const [selectedId, setSelectedId] = useState(null);
  const [selectedkgMedia, setSelectedKgMedia] = useState(null);
  const [selectedPrecio, setSelectedPrecio] = useState(null);
  const [totalPorcentaje, setTotalPorcentaje] = useState(0);
  const [totalKilos, setTotalKilos] = useState(0);
  const [totalPrecio, setTotalPrecio] = useState(0);
  const [nuevoPrecio, setNuevoPrecio] = useState({});
  const [totalNuevoPrecio, setTotalNuevoPrecio] = useState(0);

  const categorias = useSelector((state) => state.categories);
  const categoriaSeleccionada = useSelector((state) => state.allProducts) || {};
  const cortes = categoriaSeleccionada.cortes || [];
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCategorias = async () => {
      dispatch(getCategories());
    };
    fetchCategorias();
  }, [dispatch]);

  useEffect(() => {
    if (categorias.length > 0 && !selectedId) {
      setSelectedId(categorias[0].id);
      setSelectedKgMedia(categorias[0].kgMedia);
      setSelectedPrecio(categorias[0].precio);
    }
  }, [categorias]);

  useEffect(() => {
    if (selectedId) {
      const fetchCortes = async () => {
        dispatch(getCategoriesId(selectedId));
      };
      fetchCortes();
    }
  }, [dispatch, selectedId]);

  const handleRadioChange = (event) => {
    const selectedCategoria = categorias.find(cat => cat.id === event.target.id);
    setSelectedId(event.target.id);
    setSelectedKgMedia(selectedCategoria.kgMedia);
    setSelectedPrecio(selectedCategoria.precio);

    // Inicializar nuevoPrecio con los precios anteriores
    const initialNuevoPrecio = {};
    cortes.forEach(corte => {
      initialNuevoPrecio[corte.id] = parseFloat(corte.precio_venta);
    });
    setNuevoPrecio(initialNuevoPrecio);
  };

  const handleNuevoPrecioChange = (event, corteId) => {
    const precio = parseFloat(event.target.value);
    setNuevoPrecio((prevPrices) => ({
      ...prevPrices,
      [corteId]: precio
    }));
  };

  useEffect(() => {
    if (cortes.length > 0 && selectedkgMedia) {
      let totalPorcentajeValue = 0;
      let totalKilosValue = 0;
      let totalPrecioValue = 0;
      let totalNuevoPrecioValue = 0;

      cortes.forEach(corte => {
        totalPorcentajeValue += (corte.kilos / selectedkgMedia) * 100;
        totalKilosValue += parseFloat(corte.kilos);
        const precioVenta = parseFloat(corte.precio_venta);
        if (!isNaN(precioVenta)) {
          totalPrecioValue += parseFloat(corte.kilos) * precioVenta;
        }
        const nuevoPrecioValue = nuevoPrecio[corte.id] || precioVenta; // Usar el precio anterior si no se ha modificado
        totalNuevoPrecioValue += nuevoPrecioValue * corte.kilos;
      });

      setTotalPorcentaje(totalPorcentajeValue);
      setTotalKilos(totalKilosValue);
      setTotalPrecio(totalPrecioValue);
      setTotalNuevoPrecio(totalNuevoPrecioValue);
    } else {
      setTotalPorcentaje(0);
      setTotalKilos(0);
      setTotalPrecio(0);
      setTotalNuevoPrecio(0);
    }
  }, [cortes, selectedkgMedia, nuevoPrecio]);

  const exportToExcel = () => {
    const worksheet = generateWorksheetData();
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Resultados');

    XLSX.writeFile(workbook, 'resultados.xlsx');
  };

  const generateWorksheetData = () => {
    const categoriaNombre = categorias.find(cat => cat.id === selectedId)?.nombre || '';
    const fecha = new Date().toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    });

    // Datos de la categoría y fecha
    const worksheetData = [
      { 'Fecha': fecha, 'Categoria': categoriaNombre },
      {},
    ];

    // Datos de los cortes, precios anteriores y nuevos
    const dataCortes = cortes.map(corte => ({
      'Corte': corte.corte,
      'Precio Anterior': parseFloat(corte.precio_venta).toFixed(2),
      'Precio Nuevo': (nuevoPrecio[corte.id] || parseFloat(corte.precio_venta)).toFixed(2)
    }));

    // Agregar los encabezados de las columnas
    worksheetData.push(
      { 'Corte': 'Corte', 'Precio Anterior': 'Precio Anterior', 'Precio Nuevo': 'Precio Nuevo' },
      ...dataCortes
    );

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);

    // Ajustar la altura de las filas
    const rowHeights = new Array(worksheetData.length).fill({ hpx: 20 }); // Altura de 20 píxeles para todas las filas
    worksheet['!rows'] = rowHeights;

    return worksheet;
  };

  const shareExcel = async () => {
    const worksheet = generateWorksheetData();
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Resultados');

    const file = new Blob([XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });

    const fileHandle = new File([file], 'resultados.xlsx', { type: file.type });

    if (navigator.canShare && navigator.canShare({ files: [fileHandle] })) {
      try {
        await navigator.share({
          files: [fileHandle],
          title: 'Nuevos precios',
          text: 'Consulta los resultados en Excel.'
        });
        console.log('Archivo compartido exitosamente');
      } catch (error) {
        console.error('Error al compartir el archivo:', error);
      }
    } else {
      console.warn('La API de compartir archivos no es compatible con este navegador');
    }
  };
  return (
    <>
      <br />
      <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
        {categorias.map((categoria) => (
          <React.Fragment key={categoria.id}>
            <input
              type="radio"
              className="btn-check"
              name="btnradio"
              id={categoria.id}
              autoComplete="off"
              onChange={handleRadioChange}
              checked={selectedId === categoria.id}
            />
            <label className="btn btn-outline-primary" htmlFor={categoria.id}>{categoria.nombre}</label>
          </React.Fragment>
        ))}
      </div>
      <hr />
      <div className="col-12 col-md-8">
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <tbody>
              <tr>
                <th scope="col"></th>
                <th scope="col">Utilidad</th>
                <th scope="col">Porcentaje</th>
                <th scope="col">Ganancia/KG</th>
                <th scope="col">Costo</th>
                <th scope="col">Venta</th>
              </tr>
              <tr>
                <td>Anterior</td>
                <td>${(totalPrecio - (parseFloat(selectedPrecio) * selectedkgMedia)).toFixed(2)}</td>
                <td>{((((totalPrecio - (parseFloat(selectedPrecio) * selectedkgMedia)) / (parseFloat(selectedPrecio) * selectedkgMedia)) * 100).toFixed(2))}%</td>
                <td>${(((totalPrecio - (parseFloat(selectedPrecio) * selectedkgMedia)) / selectedkgMedia).toFixed(2))}</td>
                <td>${(parseFloat(selectedPrecio) * selectedkgMedia).toFixed(2)}</td>
                <td>${totalPrecio.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Nuevo</td>
                <td>${(totalNuevoPrecio - (parseFloat(selectedPrecio) * selectedkgMedia)).toFixed(2)}</td>
                <td>{((((totalNuevoPrecio - (parseFloat(selectedPrecio) * selectedkgMedia)) / (parseFloat(selectedPrecio) * selectedkgMedia)) * 100).toFixed(2))}%</td>
                <td>${(((totalNuevoPrecio - (parseFloat(selectedPrecio) * selectedkgMedia)) / selectedkgMedia).toFixed(2))}</td>
                <td>${(parseFloat(selectedPrecio) * selectedkgMedia).toFixed(2)}</td>
                <td>${totalNuevoPrecio.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
          <hr />
        </div>
      </div>
      <div className="col-12 col-md-8">
        <div className="table-responsive">
          <br />
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">CORTE</th>
                <th scope="col">NUEVO TOTAL</th>
                <th scope="col">NUEVO PRECIO</th>
                <th scope="col">PRECIO ANTERIOR</th>
                <th scope="col">TOTAL ANTERIOR</th>
              </tr>
            </thead>
            <tbody>
              {cortes.length > 0 ? (
                cortes.map((corte) => (
                  <tr key={corte.id}>
                    <td>{corte.corte}</td>
                    <td>${((nuevoPrecio[corte.id] || parseFloat(corte.precio_venta)) * corte.kilos).toFixed(2)}</td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        value={nuevoPrecio[corte.id] || parseFloat(corte.precio_venta)} // Mostrar precio anterior si no hay nuevo
                        onChange={(event) => handleNuevoPrecioChange(event, corte.id)}
                      />
                    </td>
                    <td>${parseFloat(corte.precio_venta).toFixed(2)}</td>
                    <td>${parseFloat(corte.kilos * corte.precio_venta).toFixed(2)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No hay datos disponibles</td>
                </tr>
              )}
              <tr>
                <td><strong>Total:</strong></td>
                <td colSpan="2">${totalNuevoPrecio.toFixed(2)}</td>
                <td>---</td>
                <td>${totalPrecio.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-3 ml-2">
        <button className="btn btn-success" onClick={exportToExcel}>Descargar en Excel</button>
        <button className="btn btn-primary ms-2" onClick={shareExcel}>Compartir</button>
      </div>
    </>
  );
}

export default Edicion;
