import axios from "axios";
import {
  GET_PRODUCTS,
  POST_PRODUCTS,
  GET_ALL_CATEGORIES,
  GET_PRODUCTS_BY_ID,
  PUT_CATEGORIES,
  GET_CATEGORIES_BY_NAME,
  GET_USER_BY_ID,
  GET_USER_BY_NAME,
  GET_USERS,
  POST_USERS,
  PUT_USERS,
  DELETE_USERS,
  PUT_PROMEDIO_SUCCESS
} from "./ActionsTypes";


// export const putPromedio = (categoriaId, data) => {
//   return async (dispatch) => {
//     try {
//       console.log('Datos recibidos:', data); // Verifica qué datos estás recibiendo aquí

//       const response = await axios.put(`/${categoriaId}`, data, {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });
//       console.log('Respuesta del servidor:', response.data); // Verifica la respuesta del servidor

//       dispatch({
//         type: PUT_PROMEDIO_SUCCESS,
//         payload: response.data,
//       });
//     } catch (error) {
//       console.error('Error al actualizar:', error.response ? error.response.data : error.message);
//     }
//   };
// };

export const putPromedio = (categoriaId, data, setError) => {
  return async (dispatch) => {
    try {
      console.log('Datos recibidos:', data);

      const response = await axios.put(`/${categoriaId}`, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Respuesta del servidor:', response.data);

      dispatch({
        type: PUT_PROMEDIO_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      let errorMessage = error.response ? error.response.data : error.message;
      if (typeof errorMessage === 'object') {
        errorMessage = JSON.stringify(errorMessage);
      }
      console.error('Error al actualizar:', errorMessage);
      setError(errorMessage);
    }
  };
};


export function getProducts() {
  return async function (dispatch) {
    try {
      const response = await axios("/");
      dispatch({
        type: GET_PRODUCTS,
        payload: response.data,
      });
    } catch (error) {
      // alert("Error al obtener los productos");
    }
  };
}

export function getCategories() {
  return async function (dispatch) {
    try {
      const response = await axios("/category");
      dispatch({
        type: GET_ALL_CATEGORIES,
        payload: response.data,
      });
    } catch (error) {
      // alert("Error al obtener los categorias");
    }
  };
}

export function getCategoriesId(id) {
  return async function (dispatch) {
    try {
      const response = await axios(`/category/${id}`);
      dispatch({
        type: GET_PRODUCTS_BY_ID,
        payload: response.data,
      });
    } catch (error) {
      // alert("Error al obtener los categorias");
    }
  };
}

export function postProducts(createProduct) {
  return async function (dispatch) {
    try {
      await axios.post(`/`, createProduct);
      alert('Su producto se creo correctamente');
      // Swal.fire({
      //   position: "center",
      //   icon: "success",
      //   title: "Su producto se ha creado correctamente",
      //   showConfirmButton: false,
      // });
      return dispatch({
        type: POST_PRODUCTS,
      });
    } catch (error) {
      // Swal.fire({
      //   position: "center",
      //   icon: "error",
      //   title: "Ya existe un producto con ese nombre",
      //   showConfirmButton: true,
      // });
    }
  };
}

// export function getProductsByName(name) {
//   return async function (dispatch) {
//     try {
//       const response = await axios(`/?name=${name}`);
//       dispatch({
//         type: GET_PRODUCTS_BY_NAME,
//         payload: response.data,
//       });
//     } catch (error) {
//       console.error("Error al obtener las coincidencias:", error);
//     }
//   };
// }



export function putCategories(id, nombre, kgMedia, precio) {
  return async function (dispatch) {
    try {
      const response = await axios.put(`/category/${id}`, {
        nombre,
        kgMedia,
        precio
      });
      dispatch({
        type: PUT_CATEGORIES,
        payload: response.data,
      });
    } catch (error) {
      // alert(error.message);
    }
  };
}


export function getCategoriesByName(name) {
  return async function (dispatch) {
    try {
      const response = await axios(`/category?name=${name}`);
      dispatch({
        type: GET_CATEGORIES_BY_NAME,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error al obtener las coincidencias:", error);
    }
  };
}


export function getUsers() {
  return async function (dispatch) {
    try {
      const response = await axios.get("/users");
      dispatch({
        type: GET_USERS,
        payload: response.data,
      });
    } catch (error) {
      // alert("Error al obtener usuarios");
    }
  };
}

export function postUsers(userClerkId, user, fullName) {
  return async function (dispatch) {
    try {
      const response = await axios.post(`/users/`, {
        clerkId: userClerkId,
        user: user,
        fullName: fullName,
      });
      return dispatch({
        type: POST_USERS,
        payload: response.data,
      });
    } catch (error) {
      // alert(error.message);
    }
  };
}


export function deleteUser(id) {
  return async function (dispatch) {
    try {
      const response = await axios.delete(`/users/user${id}`);
      dispatch({
        type: DELETE_USERS,
        payload: response.data,
      });
    } catch (error) {
      // alert(error.message);
    }
  };
}

export function getUserById(id) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/users/user/${id}`);
      dispatch({
        type: GET_USER_BY_ID,
        payload: response.data,
      });
    } catch (error) {
      // alert(error.message);
    }
  };
}

export function editUser(id, userRole, banUser) {
  return async function (dispatch) {
    try {
      const response = await axios.put(`/users/user/${id}`, {
        userRole: userRole,
        banUser: banUser,
      });
      dispatch({
        type: PUT_USERS,
        payload: response.data,
      });
    } catch (error) {
      // alert(error.message);
    }
  };
}

export function getUserByName(name) {
  return async function (dispatch) {
    try {
      const response = await axios(`/users?name=${name}`);
      dispatch({
        type: GET_USER_BY_NAME,
        payload: response.data,
      });
    } catch (error) {
      // alert(error);
    }
  };
}






