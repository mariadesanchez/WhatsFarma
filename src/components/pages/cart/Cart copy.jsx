/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-undef */
import { useContext,useState } from "react";
import { CartContext } from "../../../context/CartContext";
import { useNavigate } from "react-router-dom";
import {  Dialog, DialogTitle, DialogContent, DialogActions,Button,Typography,IconButton} from "@mui/material";

import { Grid } from '@mui/material';
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
const Cart = () => {
  const { cart, clearCart, deleteById, getTotalPrice } = useContext(CartContext);
  
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);

  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  let total = getTotalPrice()
  const handleFinalizarCompra = () => {
    // Agrega aquí la lógica necesaria antes de redirigir
    navigate('/checkout'); // Redirigir a la ruta '/checkout'
};

// eslint-disable-next-line no-unused-vars
const openConfirmation = () => {
  // Abre el cuadro de diálogo de confirmación
  setConfirmationOpen(true);
};

const closeConfirmation = () => {
  // Cierra el cuadro de diálogo de confirmación
  setConfirmationOpen(false);
};
  return (
<div id='card' style={{ marginTop: '20px' }} className="block rounded-lg w-100 md:w-1/2 lg:w-1/3 mx-auto mx-4 bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
  {cart.map((product) => (
    <div key={product.id} className="flex md:flex-row">
      <div id='imagen' className="w-1/3 md:w-full text-center flex justify-center items-center">
        <img
          style={{ width: '20%', height: 'auto' }}
          className="rounded-lg object-cover"
          src={product.image}
          alt=""
        />
      </div>

      <div id='descripcion' className="w-1/3 md:w-full mb-2 font-medium leading-tight text-neutral-800 dark:text-neutral-50 text-center flex flex-col justify-center">
        <h5 className="font-medium">{product.title}</h5>
        <h3 className="font-medium">${product.unit_price}</h3>
        <h5 className="font-medium">{product.quantity} unidad</h5>
        <h3 className="font-medium" style={{color:'green'}}>${product.unit_price*product.quantity}</h3>
      
      </div>

      <div id='puntuacion' className="w-1/3 md:w-full mb-2 font-medium leading-tight text-neutral-800 dark:text-neutral-50 text-center flex justify-center items-center">
      <IconButton onClick={() => deleteById(product.id)}>
        <DeleteForeverIcon color="primary" />
      </IconButton>
      </div>
    </div>
  ))}
  <Grid container spacing={2} justifyContent="center" alignItems="center" style={{marginTop:'20px'}}>
  <Grid item xs={12} md={6} lg={4}>
    <Button
      variant="contained"
      color="primary"
      fullWidth
      onClick={handleFinalizarCompra}
      style={{ marginRight: '8px', height: '60px' }}
    >
      Finalizar compra
    </Button>
  </Grid>
  <Grid item xs={12} md={6} lg={4}>
    <Button
      variant="contained"
      style={{ backgroundColor: 'red', color: 'white', height: '60px' }}
      fullWidth
      onClick={clearCart}
    >
      Limpiar carrito
    </Button>
  </Grid>
</Grid>


    <Dialog open={isConfirmationOpen} onClose={closeConfirmation}>
      <DialogTitle>Confirmación</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          ¿Estás seguro de que deseas limpiar el carrito?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeConfirmation} color="primary">
          Cancelar
        </Button>
        <Button onClick={clearCart} color="primary" variant="contained">
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  </div>






    );

    
   



};

export default Cart;