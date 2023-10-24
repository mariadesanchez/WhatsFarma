/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { db } from '../../../firebaseConfig';
import { getDocs, collection } from 'firebase/firestore';
import ButtonGroup from '@mui/material/ButtonGroup';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { Button } from '@mui/material';
import { usecontextGlobal } from '../../../context/GlobalContext'

const MyCategories = () => {
  const {productState, productDispatch} = usecontextGlobal()
  const [currentPage, setCurrentPage] = useState(0);
  // const [maxCardHeight, setMaxCardHeight] = useState(0);
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [productosPorCategorias,setProductosPorCategorias]=useState([])
  const [categoriasPerPage, setCategoriasPerPage] = useState(6); // Valor por defecto para pantallas grandes

  useEffect(() => {
    const updateCategoriasPerPage = () => {
      // Actualiza categoriasPerPage según el tamaño de la pantalla
      if (window.innerWidth >= 1200) {
        setCategoriasPerPage(6); // Pantallas grandes
      } else if (window.innerWidth >= 768) {
        setCategoriasPerPage(4); // Pantallas medianas
      } else {
        setCategoriasPerPage(2); // Pantallas pequeñas
      }
    };
    window.addEventListener('resize', updateCategoriasPerPage);

    // Llama a la función para establecer el valor inicial
    updateCategoriasPerPage();

    return () => {
      // Limpia el oyente del cambio de tamaño al desmontar el componente
      window.removeEventListener('resize', updateCategoriasPerPage);
    };
  }, []);
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

const handleCheckboxChange = (categoriaId, categoriaTitle) => {
  if(categoriaTitle=='Todas'){
    productDispatch({ type: 'CATEGORIAS_SELECCIONADAS', payload: [] });
  }
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

const handleDeleteAllCategories = () => {
  // Realiza la acción que deseas ejecutar, en este caso, la llamada a productDispatch
  productDispatch({ type: 'CATEGORIAS_SELECCIONADAS', payload: [] });
};


useEffect(() => {
  // Filtra los productos por categorías seleccionadas
  const productosFiltrados = productos.filter(producto => {
    return productState.categoriasSeleccionadas.some(categoria => categoria.title === producto.category);
  });
  setProductosPorCategorias(productosFiltrados);
}, [productState.categoriasSeleccionadas,]);




  const indexOfLastCategoria = (currentPage + 1) * categoriasPerPage;
  const indexOfFirstCategoria = indexOfLastCategoria - categoriasPerPage;
  const currentCategorias = categorias.slice(indexOfFirstCategoria, indexOfLastCategoria);

  return (
    <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-12" style={{marginTop:'100px'}}>
      <ButtonGroup>
        <div className="d-flex justify-content-center mt-4" >
          <Button style={{ width: '30px', height: '40px', marginRight: '30px',borderRadius:'50%' }}
            variant="contained"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={indexOfLastCategoria >= categorias.length}
          >
            <SkipNextIcon />
          </Button>
        </div>
        {/* <div id='todas'  style={{ borderRadius: '100px',width:'150px',height:'100px',backgroundColor:'red' }}></div> */}

        <div  className="container mx-auto px-5 py-2 lg:px-32 lg:pt-12" >
      
       <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"  >

        {currentCategorias.map((categoria) => (
           <div key={categoria.id} className="mb-6 mr-6">
           <div
         
           >
              <div
        style={{
          width: '100%', // Ancho fijo
          height: '100%', // Altura fija
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#f2f2f2', // Fondo de carga
        }}
      >  </div>
       <img 
  className="w-full h-300 rounded-lg object-cover border-2 border-blue-500"
  src={categoria.image}
     
      alt=""
      style={{ borderRadius: '50px',width:'60px',height:'60px' }}
    />

          <input
            style={{
              width: '20px',
              height: '20px',
            }}
            type="checkbox"
            
            value={categoria.id}
            checked={productState.categoriasSeleccionadas.some(c => c.id === categoria.id)}
            onChange={() => handleCheckboxChange(categoria.id, categoria.title)}
          />
        <h5 style={{ fontSize: '14px', lineHeight: '1.3' }}>
          {categoria.title}
        </h5>



        
            </div>
          </div>
          
        ))}
        </div>
        </div>
        <div className="d-flex justify-content-center mt-4" style={{ width: '200px', height: '200px' }}>
        <Button style={{ width: '30px', height: '40px', marginRight: '30px',borderRadius:'50%' }}
            variant="contained"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 0}
          >
            <SkipPreviousIcon />
          </Button>
        </div>
      </ButtonGroup>



    </div>
  );
};

export default MyCategories;
