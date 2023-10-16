/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */

import React from 'react';
import { useReducer } from 'react';
import { createContext, useContext, useEffect } from 'react';



const contextGlobal = createContext();

const initialProductState = {
  shipmentCost: '',
  // productLike: JSON.parse(localStorage.getItem('productLikeStorage')) || [],
  categoriasSeleccionadas:JSON.parse(localStorage.getItem('categoriasSeleccionadas')) || [],

};

const productReducer = (state, action) => {
  switch (action.type) {
  


    case 'SHIPMENT_COST':
      return { ...state,shipmentCost: action.payload };

      case 'CATEGORIAS_SELECCIONADAS':
      return { ...state,categoriasSeleccionadas: action.payload };
 


    default:
      throw new Error();
  }
};

const Context = ({ children }) => {
  const [productState, productDispatch] = useReducer(productReducer, initialProductState);


  return (
    <contextGlobal.Provider value={{ productState, productDispatch }}>
      {children}
    </contextGlobal.Provider>
  );

};

export default Context;

// eslint-disable-next-line react-refresh/only-export-components
export const usecontextGlobal = () => useContext(contextGlobal);