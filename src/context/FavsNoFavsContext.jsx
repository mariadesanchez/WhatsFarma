/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState,useContext, createContext } from "react";
import { db } from "../firebaseConfig";
import {where , query,getDocs, collection,addDoc,deleteDoc} from "firebase/firestore";
import { AuthContext } from "./AuthContext"

export const FavsNoFavsContext = createContext();

const FavsNoFavsContextComponent = ({ children }) => {
  const {user} = useContext(AuthContext)
  localStorage.clear();
  const [favoritos, setFavoritos] = useState([]);
  const [productos, setProductos] = useState([]);
  const [productosFavoritos, setProductosFavoritos] = useState([]);
  const [productosNoFavoritos, setProductosNoFavoritos] = useState([]);


  
  // Obtener los documentos que coinciden con la consulta


  // eslint-disable-next-line no-undef, no-unused-vars
  useEffect(() => {
    let refCollection = collection(db, "favoritos");
    const favoritosQuery = query(refCollection, where("email", "==", user.email));

    getDocs(favoritosQuery)
      .then((res) => {
        let newArray = res.docs.map((fav) => {
          return { ...fav.data(), id: fav.id };
        });

        setFavoritos(newArray);
      })
      .catch((err) => console.log(err));
  }, [favoritos]);

  useEffect(() => {
    let refCollection = collection(db, "products");
    getDocs(refCollection)
      .then((res) => {
        let newArray = res.docs.map((producto) => {
          return { ...producto.data(), id: producto.id };
        });

        setProductos(newArray);
      })
      .catch((err) => console.log(err));
  }, [productos]);

  useEffect(() => {
    // Filtra los productos que son favoritos
    const productosFavoritosTemp = productos.filter((producto) =>
      favoritos.some((favorito) => favorito.favoritoId === producto.id)
    );

    // Establece los productos favoritos en el estado
    setProductosFavoritos(productosFavoritosTemp);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productos,favoritos]);

  useEffect(() => {
    // Filtra los productos que son NO favoritos
    const productosNoFavoritosTemp = productos.filter((producto) =>
    !favoritos.some((favorito) => favorito.favoritoId === producto.id)
    );

    // Establece los productos favoritos en el estado
    setProductosNoFavoritos(productosNoFavoritosTemp);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productos,favoritos]);

  async function actualizarFavoritos(productoId) {

    const favoritosRef = collection(db, 'favoritos');
    const q = query(favoritosRef, where('favoritoId', '==', productoId,'email', '==', user.email));
  
    try {
      const snapshot = await getDocs(q);
  
      if (!snapshot.empty) {
        // Si hay documentos encontrados, elimina el documento existente con el productoId
        snapshot.forEach(async (doc) => {
          await deleteDoc(doc.ref);
    
       
        let divCorazon = document.getElementById(productoId)
        let divCorazonRojo = document.getElementById(productoId +1)
  
        divCorazon.style.display = "block";
        divCorazonRojo.style.display = "none";
     
        });
      } else {
        // Si no hay documentos encontrados, agrega un nuevo documento
        await addDoc(favoritosRef, { email: user.email, favoritoId: productoId });
       
        let divCorazon = document.getElementById(productoId)
        let divCorazonRojo = document.getElementById(productoId +1)
        
        divCorazon.style.display = "none";
        divCorazonRojo.style.display = "block";
  
  
      }
      console.log('Operación completada con éxito');
    } catch (error) {
      console.error('Error al actualizar favoritos:', error);
    }
  }

    let data = {
      productosFavoritos,
      productosNoFavoritos,
      actualizarFavoritos,
    }
  return <FavsNoFavsContext.Provider value={data}>{children}</FavsNoFavsContext.Provider>;
};

export default FavsNoFavsContextComponent;
