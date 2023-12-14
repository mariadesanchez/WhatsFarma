/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-undef */
import React, { useContext, useState, useEffect, useRef } from "react";
import { CartContext } from "../../../context/CartContext";
import { useNavigate, Link } from "react-router-dom";
import { IconButton, Dialog } from "@mui/material";
import Button from '@mui/material/Button';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { Grid } from '@mui/material';
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import html2canvas from 'html2canvas';

const Cart = () => {
  const { cart, clearCart, deleteById, getTotalPrice, setCapturedScreenshots } = useContext(CartContext);
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();
  const screenshotContainerRef = useRef({});

  useEffect(() => {
    cart.forEach((product) => {
      screenshotContainerRef.current[product.id] = React.createRef();
    });
  }, [cart]);

  const handleFinalizarCompra = async () => {
    await captureScreenshots();
    navigate('/checkout');
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const captureScreenshot = async (ref, product) => {
    const element = ref.current;
    
    try {
      const canvas = await html2canvas(element);
      const screenshotUrl = canvas.toDataURL('image/png');
      return { screenshotUrl, title: product.title, quantity: product.quantity, unit_price: product.unit_price };
    } catch (error) {
      console.error('Error capturing screenshot:', error);
      return null;
    }
  };

  const captureScreenshots = async () => {
    const screenshots = await Promise.all(
      cart.map(async (product) => {
        const ref = screenshotContainerRef.current[product.id];
        return captureScreenshot(ref, product);
      })
    );

    const filteredScreenshots = screenshots.filter(Boolean);
    setCapturedScreenshots(filteredScreenshots);
  };

const customDialogStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: '#fff',
  width: '400px',
  borderRadius: '10px',
  padding: '20px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const customButtonContainerStyle = {
  display: 'flex',
  flexDirection: 'row', // Los botones se colocarán uno al lado del otro
  justifyContent: 'center', // Para centrar los botones horizontalmente
  marginTop: '10px', // Espacio entre el párrafo y los botones
};

const customButtonStyle = {
  width: '100px',
  margin: '0 10px', // Espacio entre los botones
};
  return (
    <><div id='card' style={{ marginTop: '20px',paddingTop:'20px' }} className="block rounded-lg w-100 md:w-1/2 lg:w-1/3 mx-auto mx-4 bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
   
      {cart.map((product) => (
       <>
       <div key={product.id} className="flex md:flex-row">
       <div id={`imagen-${product.id}`} className="w-1/3 md:w-full text-center flex justify-center items-center" ref={screenshotContainerRef.current[product.id]}>
  <img
    width="30%"
    height="auto"
    style={{ maxWidth: '100%', maxHeight: '100%' }}
    className="rounded-lg object-cover"
    src={product.image}
    alt=""
  />
</div>

     
         <div id='descripcion' className="w-1/3 md:w-full mb-2 font-medium leading-tight text-neutral-800 dark:text-neutral-50 text-center flex flex-col justify-center">
           <h7 className="font-medium">{product.title}</h7>
           <h7 className="font-medium">${product.unit_price}</h7>
           <h7 className="font-medium">{product.quantity} unidad</h7>
           <h7 className="font-medium" style={{ color: 'green' }}>${product.unit_price * product.quantity}</h7>
         </div>
     
         <div id='puntuacion' className="w-1/3 md:w-full mb-2 font-medium leading-tight text-neutral-800 dark:text-neutral-50 text-center flex justify-center items-center">
           <IconButton onClick={() => deleteById(product.id)}>
             <DeleteForeverIcon color="primary" />
           </IconButton>
         </div>
       </div>
     
       <div
         style={{
           width: '100%',
           height: '1.2px',
           background: 'gray',
         }}
       />
     </>
     
      ))}


   
    </div>


    <div style={{
  marginTop: '5px',
  padding: '10px',
  backgroundColor: 'white',
  width: '100%',
  height: 'auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center', // Centrar verticalmente los botones
}}>
  <Grid container spacing={2} justifyContent="center">
    <Grid item xs={12} md={6} lg={4}>

      {cart.length >0 ?
      <><Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleFinalizarCompra}
                style={{ height: '40px', width: '180px', marginTop: '10px', marginBottom: '10px', marginRight: '20px' }}
              >
                Finalizar compra
              </Button><Button
                variant="contained"
                style={{ backgroundColor: 'red', color: 'white', height: '40px', width: '180px', marginTop: '10px', marginBottom: '10px' }}
                fullWidth
                onClick={handleOpenDialog}
              >
                  Limpiar carrito
                </Button>
                <Link to={`/shop`} style={{ textDecoration: 'none', color: 'inherit' }}>

                <ControlPointIcon style={{ color: 'green', fontSize: '1.5rem', fontWeight: 'bold', marginLeft: '20px' }} />
                </Link>
                </>:
                <p style={{ color: 'black', fontWeight: 'bold', fontSize: '18px' }}>
                No Tienes Productos En El Carrito
                <Link to={`/shop`} style={{ textDecoration: 'none', color: 'inherit' }}>

              <ControlPointIcon style={{ color: 'green', fontSize: '1.5rem', fontWeight: 'bold', marginLeft: '20px' }} />
                </Link>
              
              </p>
              
                }

      {/* Cuadro de diálogo de confirmación */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
      <div style={customDialogStyle}>
        <p>¿Estás seguro de que deseas limpiar el carrito?</p>
        <div style={customButtonContainerStyle}>
          <Button
            onClick={handleCloseDialog}
            color="primary"
            style={customButtonStyle}
          >
            Cancelar
          </Button>
          <Button
            onClick={() => {
              handleCloseDialog(); // Cierra el cuadro de diálogo
              clearCart(); // Ejecuta la lógica para limpiar el carrito
            }}
            color="primary"
            style={customButtonStyle}
          >
            Aceptar
          </Button>
        </div>

      </div>

      </Dialog>
    </Grid>
  </Grid>
</div>



      
      </>



    );

    
   



};

export default Cart;