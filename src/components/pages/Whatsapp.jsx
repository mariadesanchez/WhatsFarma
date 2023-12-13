/* eslint-disable no-unused-vars */
// WhatsApp.jsx
import {getDocs, collection, query, where} from "firebase/firestore"
import { useState } from "react"
import { db } from "../../firebaseConfig"
import React, { useEffect } from 'react';
//componente para enviar el carrito de compras al whatsapp del vendedor e interactuar
const Whatsapp = () => {
    const [myOrder, setMyOrder] = useState([])
    let storedOrderId = localStorage.getItem("order");
  
         
         // Crear el enlace de WhatsApp con el mensaje codificado
         const encodedMessage = encodeURIComponent(storedOrderId);
         const whatsappLink = `https://api.whatsapp.com/send?phone=5492213602683&text=${encodedMessage}`;
         // Abrir el enlace de WhatsApp en una nueva ventana o pestaña
         window.open(whatsappLink, '_blank');
      

  return (
    <div>
      {/* Puedes agregar contenido adicional al componente si es necesario */}
      {/* Esto podría incluir un mensaje indicando que el enlace de WhatsApp se ha abierto */}
    </div>
  );
};

export default Whatsapp;



