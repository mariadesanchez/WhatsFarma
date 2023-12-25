import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../../context/CartContext";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";
import { Button, TextField, Box } from "@mui/material";
import { AuthContext } from "../../../context/AuthContext";
import { Link, useLocation } from "react-router-dom";
import { db } from "../../../firebaseConfig";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import Swal from 'sweetalert2';

const Checkout = () => {
  const { cart, getTotalPrice, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  initMercadoPago(import.meta.env.VITE_PUBLICKEY, {
    locale: "es-AR",
  });
  const [preferenceId, setPreferenceId] = useState(null);
  const [userData, setUserData] = useState({
    cp: "",
    phone: "",
  });
  const [orderId, setOrderId] = useState(null);
  const [shipmentCost, setShipmentCost] = useState(0);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paramValue = queryParams.get("status"); // approved --- reject

  useEffect(() => {
    let order = JSON.parse(localStorage.getItem("order"));
    if (paramValue === "approved") {
      let ordersCollection = collection(db, "orders");
      addDoc(ordersCollection, { ...order, date: serverTimestamp() }).then(
        (res) => {
          setOrderId(res.id);
        }
      );

      order.items.forEach((elemento) => {
        updateDoc(doc(db, "products", elemento.id), {
          stock: elemento.stock - elemento.quantity,
        });
      });

      localStorage.removeItem("order");
      clearCart();
    }
  }, [paramValue]);

  useEffect(() => {
    let shipmentCollection = collection(db, "shipment");
    let shipmentDoc = doc(shipmentCollection, "8jLICZNG3Y8O9Y3YpOmp");
    getDoc(shipmentDoc).then((res) => {
      setShipmentCost(res.data().cost);
    });
  }, []);

  let total = getTotalPrice();

  const createPreference = async () => {
    const newArray = cart.map((product) => {
      return {
        title: product.title,
        unit_price: product.unit_price,
        quantity: product.quantity,
      };
    });
    try {
      let response = await axios.post(
        "https://backend-l.vercel.app/create_preference",
        {
          items: newArray,
          shipment_cost: shipmentCost,
        }
      );

      const { id } = response.data;
      return id;
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuy = async () => {
    let order = {
      cp: userData.cp,
      phone: userData.phone,
      items: cart,
      subTotal: total,
      total: total + shipmentCost,
      email: user.email,
    };
    localStorage.setItem("order", JSON.stringify(order));
    const id = await createPreference();
    if (id) {
      setPreferenceId(id);

      // Mostrar SweetAlert con mensaje de éxito
      Swal.fire({
        icon: 'success',
        title: 'El pago se realizó con éxito 😊',
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      {!orderId ? (
        <>
          <TextField
            name="cp"
            variant="outlined"
            label="Código Postal"
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            name="phone"
            variant="outlined"
            label="Teléfono"
            onChange={handleChange}
            margin="normal"
          />
          <Button onClick={handleBuy} variant="contained" color="primary" style={{ marginTop: '16px' }}>
            Seleccione método de pago
          </Button>
        </>
      ) : (
        <>
          <h4>El pago se realizó con éxito 😊</h4>
          <h4>Número de Pedido: {orderId}</h4>
          <Link to="/shop">
            <Button variant="contained" color="primary" style={{ marginTop: '16px' }}>
              Seguir comprando
            </Button>
          </Link>
        </>
      )}

      {preferenceId && (
        <Wallet initialization={{ preferenceId, redirectMode: 'self' }} />
      )}
    </Box>
  );
};

export default Checkout;
