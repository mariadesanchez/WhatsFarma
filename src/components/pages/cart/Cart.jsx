/* eslint-disable no-unused-vars */
import React, { useContext, useState, useRef } from "react";
import { CartContext } from "../../../context/CartContext";
import { useNavigate, Link } from "react-router-dom";
import { IconButton, Dialog } from "@mui/material";
import Button from '@mui/material/Button';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { Grid } from '@mui/material';
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import html2canvas from 'html2canvas';

const Cart = () => {
  const { cart, clearCart, deleteById, getTotalPrice } = useContext(CartContext);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [capturedScreenshots, setCapturedScreenshots] = useState([]);
  const screenshotContainerRef = useRef(null);
  const navigate = useNavigate();

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const captureScreenshot = async (element, product) => {
    try {
      const canvas = await html2canvas(element);
      const screenshotUrl = canvas.toDataURL('image/png');
      return { screenshotUrl, title: product.title, quantity: product.quantity, unit_price: product.unit_price };
    } catch (error) {
      console.error("Error capturing screenshot:", error);
      return null;
    }
  };

  const captureScreenshots = async () => {
    const screenshots = await Promise.all(cart.map(async (product) => {
      const element = screenshotContainerRef.current.querySelector(`#imagen-${product.id}`);
      return captureScreenshot(element, product);
    }));

    return screenshots.filter(Boolean); // Filtra resultados nulos
  };

  const buildWhatsAppMessage = (capturedScreenshots) => {
    let message = '¡Hola! Quiero realizar una compra:\n';

    capturedScreenshots.forEach((product) => {
      message += `\n${product.title} - ${product.quantity} unidad - $${product.unit_price * product.quantity}`;
    });

    message += `\n\nTotal: $${getTotalPrice()}`;

    return message;
  };

  const handleFinalizarCompra = async () => {
    const screenshots = await captureScreenshots();
    setCapturedScreenshots(screenshots);

    const message = buildWhatsAppMessage(screenshots);
    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://api.whatsapp.com/send?phone=5492213602683&text=${encodedMessage}`;

    window.open(whatsappLink, '_blank');

    navigate('/checkout');
  };

  return (
    <>
      <div id='card' className="block rounded-lg w-100 md:w-1/2 lg:w-1/3 mx-auto mx-4 bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
        {cart.map((product) => (
          <div key={product.id} className="flex md:flex-row">
            <div id={`imagen-${product.id}`} className="w-1/3 md:w-full text-center flex justify-center items-center">
              <img
                width="30%"
                height="auto"
                style={{ maxWidth: '100%', maxHeight: '100%' }}
                className="rounded-lg object-cover"
                src={product.image}
                alt=""
              />
            </div>
            {/* Resto del contenido del producto */}
          </div>
        ))}
        {/* Resto del contenido del carrito */}
      </div>
      {/* Botones y cuadro de diálogo */}
      <div style={{
        marginTop: '5px',
        padding: '10px',
        backgroundColor: 'white',
        width: '100%',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={6} lg={4}>
            {cart.length > 0 ?
              <>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleFinalizarCompra}
                  style={{ height: '40px', width: '180px', marginTop: '10px', marginBottom: '10px', marginRight: '20px' }}
                >
                  Finalizar compra
                </Button>
                <Button
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
              </> :
              <p style={{ color: 'black', fontWeight: 'bold', fontSize: '18px' }}>
                No Tienes Productos En El Carrito
                <Link to={`/shop`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <ControlPointIcon style={{ color: 'green', fontSize: '1.5rem', fontWeight: 'bold', marginLeft: '20px' }} />
                </Link>
              </p>
            }
            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
              {/* Contenido del cuadro de diálogo */}
            </Dialog>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Cart;
