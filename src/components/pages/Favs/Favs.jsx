/* eslint-disable react/no-unknown-property */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-undef */
import { useEffect, useState,useContext } from "react";
import { db } from "../../../firebaseConfig";
// eslint-disable-next-line no-unused-vars
import {where , query,getDocs, collection,addDoc,deleteDoc} from "firebase/firestore";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { usecontextGlobal } from '../../../context/GlobalContext'
import corazon from '../../../../src/images/corazon.png';
import corazonRojo from '../../../../src/images/corazon-rojo.png';
// eslint-disable-next-line no-unused-vars
import { AuthContext } from "../../../context/AuthContext"
// import '..Favs/Favs.scss'



const Favs= () => {
  // eslint-disable-next-line no-unused-vars
  const { productState, productDispatch } = usecontextGlobal();
  const {user} = useContext(AuthContext)
  localStorage.clear();
  const [favoritos, setFavoritos] = useState([]);
  const [productos, setProductos] = useState([]);
  const [productosFavoritos, setProductosFavoritos] = useState([]);

  
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
    
    <div className="column-derecha" style={{marginTop:'250px'}}> 

    <div id='categoriasCards' className="flex justify-center" style={{ marginTop: '100px', position: 'relative' }}>
   
    <div id="cards" className="lg:col-span-1" style={{ display: 'inline-block' }}>
        
        <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
       
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4" style={{ gridAutoRows: "auto" }}>
          
         
            {
              productosFavoritos.map((product) => {
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
                          {
                            (
                              <>
                                <img src={corazon} id={product.id} style={{ width: '20px', height: '20px', display: 'none' }} />
                                <img src={corazonRojo} id={product.id + 1} style={{ width: '20px', height: '20px', display: 'block' }} />
                              </>
                            )
                           
                            }
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
  
  );
  
  
  };
export default Favs;

