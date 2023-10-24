/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState,useContext } from "react";
import { db } from "../../../firebaseConfig";
// eslint-disable-next-line no-unused-vars
import {where , query,getDocs, collection,addDoc,deleteDoc} from "firebase/firestore";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import corazon from '../../../../src/images/corazon.png';
import corazonRojo from '../../../../src/images/corazon-rojo.png';
// eslint-disable-next-line no-unused-vars
import { AuthContext } from "../../../context/AuthContext"
import { usecontextGlobal } from '../../../context/GlobalContext'
// import {  IconButton } from "@mui/material";
// import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import './ItemListContainer.css'
// import ItemDetail from "../itemDetail/ItemDetail";

import MyCategories from "../MyCategories/MyCategories";


  const ItemListContainer= () => {
  const {productState, productDispatch} = usecontextGlobal()
  const {user} = useContext(AuthContext)
  // localStorage.clear();
  const [favoritos, setFavoritos] = useState([]);
  const [productosFavNoFav, setProductosFavNoFav] = useState([]);
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [productosPorCategorias,setProductosPorCategorias]=useState([])

  // traer todos los favoritos de este usuario por su email

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


// traer todos los productos
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

// traer todas las categorias

   useEffect(() => {
    let refCollection = collection(db, "categorias");
    getDocs(refCollection)
      .then((res) => {
        let newArray = res.docs.map((categoria) => {
          return { ...categoria.data(), id: categoria.id };
        });

        setCategorias(newArray);
      })
      .catch((err) => console.log(err));
  }, [categorias]);

  // eslint-disable-next-line no-unused-vars
  const handleCheckboxChange = (categoriaId, categoriaTitle) => {
    if (productState.categoriasSeleccionadas.some(categoria => categoria.id === categoriaId)) {
      // Si ya existe, elimina el elemento de categoriasSeleccionadas
      const nuevasCategoriasSeleccionadas = productState.categoriasSeleccionadas.filter(categoria => categoria.id !== categoriaId);
      // setCategoriasSeleccionadas(nuevasCategoriasSeleccionadas);
      productDispatch({type: 'CATEGORIAS_SELECCIONADAS', payload:nuevasCategoriasSeleccionadas })
    } else {
      // Agrega un nuevo objeto a categoriasSeleccionadas
      const nuevaCategoriaSeleccionada = { id: categoriaId, title: categoriaTitle };
      const nuevasCategoriasSeleccionadas = [...productState.categoriasSeleccionadas, nuevaCategoriaSeleccionada];
      // setCategoriasSeleccionadas(nuevasCategoriasSeleccionadas);
      productDispatch({type: 'CATEGORIAS_SELECCIONADAS', payload:nuevasCategoriasSeleccionadas })

    }
  }

  

  
  useEffect(() => {
    // Filtra los productos por categorías seleccionadas
    const productosFiltrados = productosFavNoFav.filter(producto => {
      return productState.categoriasSeleccionadas.some(categoria => categoria.title === producto.category);
    });
    setProductosPorCategorias(productosFiltrados);
  }, [productState.categoriasSeleccionadas, productosFavNoFav]);


  
  useEffect(() => {
    // Filtra los productos que son favoritos
    const productosFavoritosTemp = productos.map((producto) => {
      const esFavorito = favoritos.some((favorito) => favorito.favoritoId === producto.id);
      return { ...producto, fav: esFavorito };
    });
  
    // Establece los productos favoritos en el estado
    setProductosFavNoFav(productosFavoritosTemp);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productos, favoritos]);


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
  // eslint-disable-next-line no-unused-vars
  const handleDeleteAllCategories = () => {
    // Realiza la acción que deseas ejecutar, en este caso, la llamada a productDispatch
    productDispatch({ type: 'CATEGORIAS_SELECCIONADAS', payload: [] });
  };
  return (
    <><><div>

<div style={{
  height:'100px',
  zIndex:'100',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '150px',
  position: 'fixed',
  top: '0',
  left: '0',
  right: '0',
  backgroundColor: '#dddddd' 
}}>  <div id="categorias">
    <MyCategories/>
  </div>
</div>


      <div className="column-derecha" style={{marginTop:'250px'}}> 

      <div id='categoriasCards' className="flex justify-center" style={{ marginTop: '100px', position: 'relative' }}>
     
      <div id="cards" className="lg:col-span-1" style={{ display: 'inline-block' }}>
          
          <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
         
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4" style={{ gridAutoRows: "auto" }}>
            
           
              {productosPorCategorias.length == 0 &&
                productosFavNoFav.map((product) => {
                  return (
                      <div id='FavNoFav' key={product.id} className="relative overflow-hidden bg-gray-200 rounded shadow-md hover:shadow-xl transform hover:-translate-y-2 transition duration-300">
                         
                        <img
                          className="w-full h-200 rounded-lg object-cover"

                          src={product.image}
                          alt="" />

                        <div className="flex flex-col justify-center items-center p-6">
                        <Link to={`/itemDetail/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>

                          <h5 style={{ fontSize: '14px', lineHeight: '1.3' }}>
                            {product.title}
                          </h5>
                          <h3 style={{ fontSize: '18px', lineHeight: '1.2', fontWeight: 'bold' }}>
                            $ {product.unit_price}
                          </h3>
                          <h4 style={{ fontSize: '12px', lineHeight: '1.2', fontWeight: 'bold', color: 'green' }}>
                            Stock: {product.stock}
                          </h4>
                          </Link>
                          <button
                            type="button"
                            id="toggleButton"
                            onClick={() => actualizarFavoritos(product.id)}
                            href="#"
                            className="absolute top-2 right-2 rounded bg-primary w-auto h-auto p-1 text-base font-medium uppercase leading-normal text-white shadow-md hover:shadow-2xl transition duration-300 focus:bg-primary-600 focus:shadow-2xl focus:outline-none focus:ring-2 focus:ring-primary dark:shadow-md dark:hover:shadow-2xl dark:focus:shadow-2xl dark:ring-primary"
                            data-te-ripple-init
                            data-te-ripple-color="light"
                          >
                            {product.fav ?
                              (
                                <>
                                  <img src={corazon} id={product.id} style={{ width: '20px', height: '20px', display: 'none' }} />
                                  <img src={corazonRojo} id={product.id + 1} style={{ width: '20px', height: '20px', display: 'block' }} />
                                </>
                              )
                              :
                              (
                                <>
                                  <img src={corazon} id={product.id} style={{ width: '20px', height: '20px', display: 'block' }} />
                                  <img src={corazonRojo} id={product.id + 1} style={{ width: '20px', height: '20px', display: 'none' }} />
                                </>
                              )}
                          </button>
                        </div>
                      </div>
                 

                  );
                })}



              {(productState.categoriasSeleccionadas.length > 0) &&
                productosPorCategorias.map((product) => {
                  return (
                    <div id='FavNoFav' key={product.id} className="relative overflow-hidden bg-gray-200 rounded shadow-md hover:shadow-xl transition duration-300">
                    <img
                      className="w-full h-200 rounded-lg object-cover"
                      src={product.image}
                      alt=""
                    />
                    {/* <itemDetailLink/> */}
                    <div className="flex flex-col justify-center items-center p-6">
                      <Link to={`/itemDetail/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <h5 style={{ fontSize: '14px', lineHeight: '1.3' }}>
                          {product.title}
                        </h5>
                        <h3 style={{ fontSize: '18px', lineHeight: '1.2', fontWeight: 'bold' }}>
                          $ {product.unit_price}
                        </h3>
                        <h4 style={{ fontSize: '12px', lineHeight: '1.2', fontWeight: 'bold', color: 'green' }}>
                          Stock: {product.stock}
                        </h4>
                      </Link>
                      <button
                        type="button"
                        id="toggleButton"
                        onClick={() => actualizarFavoritos(product.id)}
                        href="#"
                        className="absolute top-2 right-2 rounded bg-primary w-auto h-auto p-1 text-base font-medium uppercase leading-normal text-white shadow-md hover:shadow-2xl transition duration-300 focus:bg-primary-600 focus:shadow-2xl focus:outline-none focus:ring-2 focus:ring-primary dark:shadow-md dark:hover:shadow-2xl dark:focus:shadow-2xl dark:ring-primary"
                        data-te-ripple-init
                        data-te-ripple-color="light"
                      >
                        {product.fav ?
                          (
                            <>
                              <img src={corazon} id={product.id} style={{ width: '20px', height: '20px', display: 'none' }} />
                              <img src={corazonRojo} id={product.id + 1} style={{ width: '20px', height: '20px', display: 'block' }} />
                            </>
                          )
                          :
                          (
                            <>
                              <img src={corazon} id={product.id} style={{ width: '20px', height: '20px', display: 'block' }} />
                              <img src={corazonRojo} id={product.id + 1} style={{ width: '20px', height: '20px', display: 'none' }} />
                            </>
                          )}
                      </button>
               
                    </div>
                 
                  </div>
                  
                   

                  );
                })}
            </div>
          </div>
        </div>
      </div>
      </div>
      
    </div>
    </>
   
      </>

    );
  };
export default ItemListContainer;