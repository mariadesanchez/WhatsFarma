/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Link} from "react-router-dom";
import { db } from "../../../firebaseConfig";
import { getDoc, collection, doc } from "firebase/firestore";
import { Button, IconButton } from "@mui/material";
import { CartContext } from "../../../context/CartContext";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import ShopIcon from '@mui/icons-material/Shop';
import ShareOnFacebook from "../ShareOnFacebook";
import ShareOnInstagram from "../ShareOnInstagram";
import ShareOnWhatsapp from "../ShareOnWhatsapp";


const ItemDetail = () => {
  const { id } = useParams();
  const { addToCart, getQuantityById } = useContext(CartContext);
  let quantity = getQuantityById(id);
  const [product, setProduct] = useState(null);
  const [counter, setCounter] = useState(quantity || 1);
  const navigate = useNavigate();
  const [mostrarMasProductos, setMostrarMasProductos] = useState(false);


  useEffect(() => {
    let refCollection = collection(db, "products");
    let refDoc = doc(refCollection, id);
    getDoc(refDoc)
      .then((res) => setProduct({ ...res.data(), id: res.id }))
      .catch((error) => console.log(error));
  }, [id]);

  // SUMAR
  const addOne = () => {
    if (counter < product.stock) {
      setCounter(counter + 1);
    } else {
      alert("stock maximo");
    }
  };

  // RESTAR

  const subOne = () => {
    if (counter > 1) {
      setCounter(counter - 1);
    } else {
      alert("no podes agregar menos de 1 elemento al carrito");
    }
  };
  // AGREGAR AL CARRITO

  const onAdd = () => {
    let obj = {
      ...product,
      quantity: counter,
    };
    addToCart(obj);
    setMostrarMasProductos(true)
  };

  return (
  <div id = 'card'className="block rounded-lg h-100 x-20 bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
      <div className="d-flex justify-content-center">
     <div style={{marginTop:'30px',width:'10px',height:'10px',marginRight:'40px'}} className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
     <ShareOnFacebook url={`https://whats-farma.vercel.app/itemDetail/${id}`} />
    </div>
    <div style={{marginTop:'30px',width:'10px',height:'10px',marginRight:'40px'}} className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
     <ShareOnInstagram url={`https://whats-farma.vercel.app/itemDetail/${id}`} />
    </div>
    <div style={{marginTop:'30px',width:'10px',height:'10px',marginRight:'40px'}} className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
     <ShareOnWhatsapp url={`https://whats-farma.vercel.app/itemDetail/${id}`} />
    </div>
    
  </div>
 
  <div>
  {product && (
    <img style={{marginTop:'40px'}}
      className="w-1/12 h-1/12 md:h-1/8 md:w-1/8 mx-auto rounded-full object-cover md:!rounded-none md:!rounded-l-lg"
      src={product.image}
      alt=""
    />
  )}
</div>

  <div id='titulo' className="mb-2  font-medium leading-tight text-neutral-800 dark:text-neutral-50 text-center">
    {product && (
      <h7 className=" font-medium">{product.title}</h7>
    )}
     {product && (
       
       
      <h5 className=" font-medium"> ${product.unit_price * counter}</h5>
    )}
  </div>
  <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200 text-center">
    {quantity && <h6>Ya tienes {quantity} en el carrito</h6>}
    {product?.stock === quantity && <h6>Ya tienes el máximo en el carrito</h6>}
  </p>
  <div id='sumarRestar' className="flex items-center justify-center">
    <div id='restar'>
      <Button variant="contained" onClick={subOne} style={{width:'8px',height:'15px'}}>
        -
      </Button>
    </div>
    <h7>{counter}</h7>
    <div id='sumar'>
      <Button variant="contained" onClick={addOne} style={{width:'8px',height:'15px'}}>
        +
      </Button>
    </div>
</div>
<div id="agregar" className="flex flex-col items-center justify-center">
<div id="mas-productos" style={{ display: mostrarMasProductos ? 'block' : 'none', marginBottom: '10px', marginTop: '10px' }}>


<Link to={`/shop`} style={{ textDecoration: 'none', color: 'inherit' }}>
    <Button
      className="absolute rounded bg-success w-auto h-auto p-1 text-base font-medium uppercase leading-normal text-white shadow-md hover:shadow-2xl transition duration-300 focus:bg-primary-600 focus:shadow-2xl focus:outline-none focus:ring-2 focus:ring-primary dark:shadow-md dark:hover:shadow-2xl dark:focus:shadow-2xl dark:ring-primary"
      color="success"
      style={{ width: "380px" }}
    >
      + Productos
    </Button>
    </Link>
  </div>
  <div>
    <Button id ="agregar"
      onClick={onAdd}
      className="absolute rounded bg-primary w-auto h-auto p-1 text-base font-medium uppercase leading-normal text-white shadow-md hover:shadow-2xl transition duration-300 focus:bg-primary-600 focus:shadow-2xl focus:outline-none focus:ring-2 focus:ring-primary dark:shadow-md dark:hover:shadow-2xl dark:focus:shadow-2xl dark:ring-primary"
      color="success"
      style={{ width: "380px" }}
    >
      Agregar al carrito
    </Button>
  </div>
</div>



  </div>


  );
};

export default ItemDetail;