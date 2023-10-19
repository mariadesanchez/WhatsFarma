// eslint-disable-next-line no-unused-vars
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de importar el CSS de Bootstrap
import {  useState, useEffect } from "react";
import { db } from "../../../firebaseConfig";
import {getDocs, collection} from "firebase/firestore";
import { Link } from "react-router-dom";
import ButtonGroup from '@mui/material/ButtonGroup';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { Dialog, DialogTitle, DialogContent,Button } from "@mui/material";

// import logo from '../../../src/images/logo.png';


const MyCarousel = () => {

 
 

const searchStyle = {
  width: '80%',
  marginTop: '50px',
};

const [productos, setProductos] = useState([]);
const [productosFiltrados, setProductosFiltrados] = useState([]);
const [currentPage, setCurrentPage] = useState(0);
const productsPerPage = 6; // Número de productos por página
const [showModal, setShowModal] = useState(false);
const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    // Actualiza el estado searchTerm con el valor del input
    setSearchTerm(e.target.value);
   

  };
  useEffect(() => {
    // Filtra los productos según el término de búsqueda
    const productosFiltrados = productos.filter((producto) =>
      producto.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setProductosFiltrados(productosFiltrados);

    if (productosFiltrados.length === 0 & searchTerm.length>0) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [searchTerm, productos]);

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
  }, []);
  
  const handleCloseModal = () => {
    setShowModal(false);
    setSearchTerm(''); // Esto establecerá el valor del input en una cadena vacía

 
  };
  
  const indexOfLastProduct = (currentPage + 1) * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productosFiltrados.slice(indexOfFirstProduct, indexOfLastProduct);
  return (
    <>
  
 
    <div className="d-flex justify-content-center align-items-center">
        <div className="mb-3" style={searchStyle}>
          <div className="relative mb-4 flex w-full flex-wrap items-stretch"style={{ height: '60px',backgroundColor:'white'}}>
       
            <input
              style={{ height: '60px',backgroundColor:'red'}}
             
              type="search"
              className="relative m-0 block w-[1px] min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
              placeholder="Búsqueda"
              aria-label="Search"
              aria-describedby="button-addon2"
              value={searchTerm}
              onChange={handleSearchChange} // Agrega el manejador de cambio
            />

            <button
              className="relative z-[2] flex items-center rounded-r bg-primary px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
              type="button"
              id="button-addon1"
              data-te-ripple-init
              data-te-ripple-color="light">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5">
                <path
                  fillRule="evenodd"
                  d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                  clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>



      <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4" style={{ gridAutoRows: "auto" }}>

            {
            currentProducts.map((product) => (
              <div key={product.id} className="mb-6 mr-6">
             <Link to={`/itemDetail/${product.id}`}style={{ textDecoration: 'none', color: 'inherit' }}>
               <div className="relative overflow-hidden bg-gray-200 rounded shadow-xl transform transition-transform hover:scale-105">
                  <img
                          className="w-full h-200 rounded-lg object-cover"
                          src={product.image}
                    alt="" />
                  <div className="flex flex-col justify-center items-center p-6">
                          <h5 style={{ fontSize: '14px', lineHeight: '1.3' }}>
                            {product.title}
                          </h5>
                          <h3 style={{ fontSize: '18px', lineHeight: '1.2', fontWeight: 'bold' }}>
                            $ {product.unit_price}
                          </h3>
                          <h4 style={{ fontSize: '12px', lineHeight: '1.2', fontWeight: 'bold', color: 'green' }}>
                            Stock: {product.stock}
                          </h4>
                  </div>
                </div>
                </Link>

              </div>
            ))}
          </div>
 
          <div className="d-flex justify-content-center">

    <ButtonGroup>
  <Button
    variant="contained"
    onClick={() => setCurrentPage(currentPage - 1)}
    disabled={currentPage === 0}
  >
    <SkipPreviousIcon />
  </Button>
  <Button
    disabled
    style={{ fontSize: '2em', color: 'black' }}
    variant="outlined"
  >
    {currentPage + 1}
  </Button>
  <Button
    variant="contained"
    onClick={() => setCurrentPage(currentPage + 1)}
    disabled={indexOfLastProduct >= productosFiltrados.length}
  >
    <SkipNextIcon />
  </Button>
</ButtonGroup>
          </div>
          {showModal && (
      <Dialog open={showModal} onClose={handleCloseModal} style={{width:'100%'}}>
          <DialogTitle><h1  style={{textAlign:'center'}}>Sin Resultados</h1></DialogTitle>
          <DialogContent><h2 style={{textAlign:'center'}}>  Lo sentimos, no hay productos que coincidan con tu búsqueda.</h2>
        
         </DialogContent>
         <Button onClick={handleCloseModal} variant="contained" color="primary">
         <span  style={{   display: 'flex',alignItems: 'center', justifyContent: 'center'}}
 
    
   
  >Cerrar</span> 
         </Button>
     </Dialog>
          )}
        </div>
      </>


  
  );
};

export default MyCarousel;

