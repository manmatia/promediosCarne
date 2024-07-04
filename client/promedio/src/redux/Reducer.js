import {
    GET_PRODUCTS,
    POST_PRODUCTS,
    GET_ALL_CATEGORIES,
    GET_PRODUCTS_BY_ID,
    GET_CATEGORIES_BY_NAME,
    PUT_CATEGORIES,
    GET_USERS,
  POST_USERS,
  PUT_USERS,
  DELETE_USERS,
  GET_USER_BY_ID,
  GET_USER_BY_NAME,
  PUT_PROMEDIO_SUCCESS
  } from './ActionsTypes';
  
  let initialState = {
    allProducts: [],
    categories: [],
    allUsers: [],
    userId: [],
    userDeleted: [],
    userById: [],
    userEdited: [],
    userByName: [],
  };
  
  function rootReducer(state = initialState, action) {
    switch (action.type) {
      case GET_PRODUCTS:
        return {
          ...state,
          allProducts: action.payload,
        };
  
      case GET_ALL_CATEGORIES:
        return {
          ...state,
          categories: action.payload,
        };
  
      case POST_PRODUCTS:
        return {
          ...state,
          // allProducts: [...state.allProducts, action.payload],
        };
        case GET_PRODUCTS_BY_ID:
          return {
            ...state,
            allProducts: action.payload,
          };
        case PUT_PROMEDIO_SUCCESS:
      return {
        ...state,
        allProducts: action.payload,
      };
      case PUT_CATEGORIES:
        return {
          ...state,
          categories: action.payload,
        };
        case GET_USERS:
          return {
            ...state,
            allUsers: action.payload,
          };
        case POST_USERS:
          return {
            ...state,
            userById: action.payload,
            userId: action.payload.user.id,
          };
          case DELETE_USERS:
            return {
              ...state,
              userDeleted: action.payload,
            };
          case GET_USER_BY_ID:
            return {
              ...state,
              userById: action.payload,
            };
          case PUT_USERS:
            return {
              ...state,
            };
          case GET_USER_BY_NAME:
            return {
              ...state,
              userByName: action.payload,
            };
      default:
        return state;
    }
  }
  
  export default rootReducer;