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
// import '../itemlist/ItemListContainer.scss'

import { usecontextGlobal } from '../../../context/GlobalContext'



   

const ItemListContainer= () => {

  const {productState, productDispatch} = usecontextGlobal()

  const {user} = useContext(AuthContext)
  // localStorage.clear();
  const [favoritos, setFavoritos] = useState([]);
  const [productos, setProductos] = useState([]);
  const [productosFavNoFav, setProductosFavNoFav] = useState([]);
  const [categorias, setCategorias] = useState([]);
  // const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);
  const [productosPorCategorias,setProductosPorCategorias]=useState([])
  const [seleccionarTodas, setSeleccionarTodas] = useState(true);



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
  };
  
  useEffect(() => {
    // Filtra los productos por categorías seleccionadas
    const productosFiltrados = productosFavNoFav.filter(producto => {
      return productState.categoriasSeleccionadas.some(categoria => categoria.title === producto.category);
    });
    setProductosPorCategorias(productosFiltrados);
  }, [productState.categoriasSeleccionadas, productosFavNoFav]);

  
  
  const handleSeleccionarTodasChange = () => {
    setSeleccionarTodas(!seleccionarTodas);
  
    // Si se marca "Seleccionar todas", establece todas las categorías en el estado categoriasSeleccionadas.
    if (!seleccionarTodas) {
      const todasLasCategorias = categorias.map((categoria) => ({
        id: categoria.id,
        title: categoria.title,
      }));
      // setCategoriasSeleccionadas(todasLasCategorias);
            productDispatch({type: 'SELECCIONAR_TODAS', todasLasCategorias })

    } else {
      // Si se desmarca, borra todas las categorías seleccionadas.
      setCategoriasSeleccionadas([]);
    }
  };
  
  

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

  return (
    
<div id='categoriasCards' className="flex justify-center">
          
          <div id="categorias" className="lg:col-span-1" style={{ marginTop: '1rem',display:'inline-block' }}>

        <h4>Categorias:</h4>
        <label style={{ fontSize: '30px' }}>
          <input
            type="checkbox"
            value="todos"
            checked={seleccionarTodas}
            onChange={handleSeleccionarTodasChange} />
          Todas
        </label>
        <UserAvatar name="JS" /> 
        {categorias.map((categoria) => (
          <div key={categoria.id}>
            <label style={{ fontSize: '30px' }}>
              <input
                type="checkbox"
                value={categoria.id}
                checked={productState.categoriasSeleccionadas.some(c => c.id === categoria.id)}
                onChange={() => handleCheckboxChange(categoria.id, categoria.title)} />
              {categoria.title}
            </label>
          </div>
        ))}
      </div>
    
    
      {seleccionarTodas&& (
    <div id="cards" className="lg:col-span-1" style={{display:'inline-block'}}>

        <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
          <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

            {productState.categoriasSeleccionadas.length > 0 &&
              productosPorCategorias.map((product) => {
                return (
                <div key={product.id} className="relative overflow-hidden bg-gray-200 rounded">
                    <img
                  className="w-full md:w-96 h-80 md:h-96 rounded-lg object-cover md:!rounded-none md:!rounded-l-lg"
                   src={product.image}
                      alt="" />
                    <div className="flex flex-col justify-center items-center p-6">
                      <h5 className="mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-50">
                        {product.title}
                      </h5>
                      <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                        Precio: {product.unit_price}
                      </p>
                      <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                        Stock: {product.stock}
                      </p>
                      <Link to={`/itemDetail/${product.id}`}>Ver detalle</Link>

                      <button
                        type="button"
                        id="toggleButton"
                        onClick={() => actualizarFavoritos(product.id)}
                        href="#"
                        className="inline-block rounded bg-primary px-8 py-3 text-base font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                        data-te-ripple-init
                        data-te-ripple-color="light"
                      >{product.fav ?
                        (<><img src={corazon} id={product.id} style={{ width: '40px', height: '40px', display: 'none' }} /><img src={corazonRojo} id={product.id + 1} style={{ width: '40px', height: '40px', display: 'block' }} /></>)
                        :
                        (<><img src={corazon} id={product.id} style={{ width: '40px', height: '40px', display: 'block' }} /><img src={corazonRojo} id={product.id + 1} style={{ width: '40px', height: '40px', display: 'none' }} /></>)}
                      </button>
                    </div>
                  </div>

                );
              })}
          </div>
        </div>  
      </div>
        )}
      </div>
    );
  };
export default ItemListContainer;