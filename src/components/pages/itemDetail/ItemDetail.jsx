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
import ControlPointIcon from '@mui/icons-material/ControlPoint';


import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


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
    <Card className="rounded-lg shadow-md">
    <CardContent>
      <div className="flex justify-center">
      <div style={{marginTop:'30px',width:'10px',height:'10px',marginRight:'40px'}} className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
     <ShareOnFacebook url={`https://whats-farma.vercel.app/itemDetail/${id}`} />
    </div>
    {/* <div style={{marginTop:'30px',width:'10px',height:'10px',marginRight:'40px'}} className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
     <ShareOnInstagram url={`https://whats-farma.vercel.app/itemDetail/${id}`} />
    </div> */}
    <div style={{marginTop:'30px',width:'10px',height:'10px',marginRight:'40px'}} className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
     <ShareOnWhatsapp url={`https://whats-farma.vercel.app/itemDetail/${id}`} />
    </div>

      </div>

      {product && (
        <img style={{marginTop:'40px'}}
          className="w-1/12 h-1/12 md:h-1/8 md:w-1/8 mx-auto rounded-full object-cover md:!rounded-none md:!rounded-l-lg"
          src={product.image}
          alt=""
        />
      )}

      <div className="mb-2 font-medium leading-tight text-neutral-800 dark:text-neutral-50 text-center">
        {product && (
          <Typography variant="h8" component="div">
            {product.title}
          </Typography>
        )}
        {product && (
          <Typography variant="h7" component="div">
            ${product.unit_price * counter}
          </Typography>
        )}
      </div>

      <Typography variant="body2" color="textSecondary" component="p" align="center">
        {quantity && <h6>Ya tienes {quantity} en el carrito</h6>}
        {product?.stock === quantity && <h6>Ya tienes el máximo en el carrito</h6>}
      </Typography>

      <div className="flex items-center justify-center">
        <div>
          <Button variant="contained" onClick={subOne}>
            -
          </Button>
        </div>
        <Typography variant="h6" component="div">
          {counter}
        </Typography>
        <div>
          <Button variant="contained" onClick={addOne}>
            +
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <div style={{ display: mostrarMasProductos ? 'block' : 'none', marginBottom: '10px', marginTop: '10px' }}>
          <Link to={`/shop`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <ControlPointIcon style={{ color: 'green', fontSize: '1.5rem', fontWeight: 'bold', marginLeft: '20px' }} />
          </Link>
        </div>
        <div>
          <Button
            onClick={onAdd}
            className="rounded bg-primary w-auto p-2 text-base font-medium uppercase text-white shadow-md hover:shadow-2xl transition duration-300 focus:bg-primary-600 focus:shadow-2xl focus:outline-none focus:ring-2 focus:ring-primary dark:shadow-md dark:hover:shadow-2xl dark:focus:shadow-2xl dark:ring-primary"
            color="success"
            style={{ width: "380px",marginTop:'20px' }}
          >
            Agregar al carrito
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>


  );
};

export default ItemDetail;