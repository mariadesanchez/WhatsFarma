/* eslint-disable no-unused-vars */
// WhatsApp.jsx
import {getDocs, collection, query, where} from "firebase/firestore"
import { useState } from "react"
import { db } from "../../firebaseConfig"
import React, { useEffect } from 'react';
//componente para enviar el carrito de compras al whatsapp del vendedor e interactuar
const Whatsapp = () => {
  
    let storedOrderId = localStorage.getItem("order");
    let orderData = {};
    
    try {
      orderData = JSON.parse(storedOrderId);
    } catch (error) {
      console.error('Error al parsear el objeto de la orden:', error);
    }
    
    // Extraer solo las propiedades necesarias y formatear el mensaje
    const formattedMessage = orderData.items.map(item => (
      `📷 *Imagen:* ${item.image}\n💰 *Precio:* ${item.unit_price}\n🔢 *Cantidad:* ${item.quantity}\n\n`
    ));
    
    // Crear el enlace de WhatsApp con el mensaje formateado
    const encodedMessage = encodeURIComponent(`*Detalles del Pedido:*\n\n${formattedMessage.join('')}`);
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



