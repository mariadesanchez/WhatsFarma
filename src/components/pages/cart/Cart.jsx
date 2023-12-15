/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-undef */
import React, { useContext, useState, useRef } from "react";
import html2canvas from "html2canvas";
import { CartContext } from "../../../context/CartContext";
import { useNavigate, Link } from "react-router-dom";
import { IconButton, Dialog } from "@mui/material";
import Button from '@mui/material/Button';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { Grid } from '@mui/material';
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const Cart = () => {
  const { cart, clearCart, deleteById, getTotalPrice, setCartScreenshot } = useContext(CartContext);
  const [dialogOpen, setDialogOpen] = useState(false);
  const containerRef = useRef(null);

  const navigate = useNavigate();
  let total = getTotalPrice()

  const handleFinalizarCompra = async () => {
    const container = containerRef.current;

    // Usar html2canvas para capturar el contenido del carrito en una imagen
    const screenshot = await html2canvas(container);

    // Convertir la captura a una URL de datos (data URL)
    const screenshotURL = screenshot.toDataURL();

    // Guardar la URL de la captura en el CartContext
    setCartScreenshot(screenshotURL);

    // Agrega aquí la lógica necesaria antes de redirigir
    navigate('/checkout'); // Redirigir a la ruta '/checkout'
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
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
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '10px',
  };

  const customButtonStyle = {
    width: '100px',
    margin: '0 10px',
  };

  return (
    <>
      <div id='card' style={{ marginTop: '20px', paddingTop: '20px' }} className="block rounded-lg w-100 md:w-1/2 lg:w-1/3 mx-auto mx-4 bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
        {cart.map((product) => (
          <div key={product.id} ref={containerRef} className="flex md:flex-row">
            <div id='imagen' className="w-1/3 md:w-full text-center flex justify-center items-center">
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
        ))}
        <div style={{ width: '100%', height: '1.2px', background: 'gray' }} />
      </div>

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
                      handleCloseDialog();
                      clearCart();
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
