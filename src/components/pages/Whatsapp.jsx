/* eslint-disable no-unused-vars */
// Whatsapp.jsx
import React, { useEffect, useContext } from 'react';
import { storage } from '../../firebaseConfig';
import { CartContext } from "../../../context/CartContext";

const Whatsapp = () => {
  const { capturedScreenshots } = useContext(CartContext);

  let storedOrderId = localStorage.getItem("order");
  let orderData = {};

  try {
    orderData = JSON.parse(storedOrderId);
  } catch (error) {
    console.error('Error al parsear el objeto de la orden:', error);
  }

  const sendMessageToWhatsApp = async () => {
    const bucketName = storage.app.options.storageBucket;

    const formattedMessage = await Promise.all(orderData.items.map(async (item, index) => {
      // Construir la URL directa de la imagen en Firebase Storage
      const imageUrl = `https://storage.googleapis.com/${bucketName}/o/${encodeURIComponent(item.image)}?alt=media`;

      // Agregar la captura de pantalla correspondiente al mensaje
      const screenshotUrl = capturedScreenshots[index];
      const screenshotMessage = screenshotUrl ? `*[Captura de pantalla]*\n${screenshotUrl}\n\n` : '';

      // Formatear el mensaje con la imagen y la captura de pantalla
      return `*[Imagen: ${item.image}]*\n💰 *Precio:* ${item.unit_price}\n🔢 *Cantidad:* ${item.quantity}\n${imageUrl}\n\n${screenshotMessage}`;
    }));

    // Crear el enlace de WhatsApp con el mensaje formateado
    const encodedMessage = encodeURIComponent(`*Detalles del Pedido:*\n\n${formattedMessage.join('')}`);
    const whatsappLink = `https://api.whatsapp.com/send?phone=5492213602683&text=${encodedMessage}`;

    // Abrir el enlace de WhatsApp en una nueva ventana o pestaña
    window.open(whatsappLink, '_blank');
  };

  useEffect(() => {
    // Llamar a la función al cargar el componente
    sendMessageToWhatsApp();
  }, []); // Agrega dependencias si es necesario

  return (
    <div>
      {/* Puedes agregar contenido adicional al componente si es necesario */}
      {/* Esto podría incluir un mensaje indicando que el enlace de WhatsApp se ha abierto */}
    </div>
  );
};

export default Whatsapp;
