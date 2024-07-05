import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, putCategories } from '../../redux/Actions'; // Asegúrate de importar tus acciones correctamente
import './Category.css';

function Category() {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories); // Asegúrate de mapear correctamente el estado de Redux
  const [editingCategory, setEditingCategory] = useState(null); // Estado para controlar la categoría en edición
  const [editedData, setEditedData] = useState({}); // Estado para almacenar los datos editados

  useEffect(() => {
    dispatch(getCategories()); // Obtener categorías al montar el componente
  }, [dispatch]);

  const handleEdit = (category) => {
    setEditingCategory(category); // Establecer la categoría en edición
    setEditedData({ // Inicializar el estado de los datos editados
      nombre: category.nombre,
      kgMedia: category.kgMedia,
      precio: category.precio,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    const { id } = editingCategory;
    const { nombre, kgMedia, precio } = editedData;
    dispatch(putCategories(id, nombre, kgMedia, precio)); // Llamar a la acción de Redux para actualizar la categoría
    setEditingCategory(null); // Limpiar la categoría en edición
    dispatch(getCategories());
  };

 return (
  <div className="category-container">
    <h2>Categorías</h2>
    {Array.isArray(categories) && categories.map(category => (
      <div key={category.id} className="category-table">
        <h3>{category.nombre}</h3>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>KG Media</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{category.id}</td>
              <td>{editingCategory === category ? (
                <input type="text" name="nombre" value={editedData.nombre} onChange={handleInputChange} />
              ) : category.nombre}</td>
              <td>{editingCategory === category ? (
                <input type="text" name="kgMedia" value={editedData.kgMedia} onChange={handleInputChange} />
              ) : category.kgMedia}</td>
              <td>{editingCategory === category ? (
                <input type="text" name="precio" value={editedData.precio} onChange={handleInputChange} />
              ) : category.precio}</td>
              <td>
                {editingCategory === category ? (
                  <button className="btn btn-success" onClick={handleUpdate}>Guardar</button>
                ) : (
                  <button className="btn btn-primary" onClick={() => handleEdit(category)}>Editar</button>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    ))}
  </div>
);
}

export default Category;