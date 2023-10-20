/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-undef */
import { useContext,useState } from "react";
import { CartContext } from "../../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import {  Dialog, DialogTitle, DialogContent, DialogActions,Button,Typography} from "@mui/material";


import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Grid } from '@mui/material';
const Cart = () => {
  const { cart, clearCart, deleteById, getTotalPrice } = useContext(CartContext);
  
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);

  const navigate = useNavigate();
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
    <div>
    <h1 style={{ textAlign: "center", marginTop: "20px" }}>
      Total: <strong style={{ color: "red" }}>$ {total}</strong>
    </h1>

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Producto</TableCell>
            <TableCell align="left">Precio</TableCell>
            <TableCell align="left">Cantidad</TableCell>
            <TableCell align="left">Total</TableCell>
            <TableCell align="left">Imagen</TableCell>
            <TableCell align="left">Eliminar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart.map((product) => (
            <TableRow key={product.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row" align="left">
                {product.title}
              </TableCell>
              <TableCell component="th" scope="row" align="left">
                {product.unit_price}
              </TableCell>
              <TableCell component="th" scope="row" align="left">
                {product.quantity}
              </TableCell>
              <TableCell component="th" scope="row" align="left">
                {product.quantity * product.unit_price}
              </TableCell>
              <TableCell component="th" scope="row" align="left">
                <img src={product.image} alt="" style={{ width: "80px", height: "80px" }} />
              </TableCell>
              <TableCell component="th" scope="row" align="left">
                <IconButton onClick={() => deleteById(product.id)}>
                  <DeleteForeverIcon color="primary" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
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