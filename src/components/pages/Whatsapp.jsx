/* eslint-disable no-unused-vars */
// Whatsapp.jsx
import React, { useEffect } from 'react';
import { getDownloadURL, ref } from 'firebase/storage';
import { db, storage } from '../../firebaseConfig';  // Asegúrate de tener la ruta correcta

const Whatsapp = () => {
  let storedOrderId = localStorage.getItem("order");
  let orderData = {};

  try {
    orderData = JSON.parse(storedOrderId);
  } catch (error) {
    console.error('Error al parsear el objeto de la orden:', error);
  }

  const sendMessageToWhatsApp = async () => {
    const formattedMessage = await Promise.all(orderData.items.map(async (item, index) => {
      // Obtener la URL de descarga de Firebase Storage
      const imageRef = ref(storage, item.image);  // Asegúrate de tener la ruta correcta en tu almacenamiento
      const imageUrl = await getDownloadURL(imageRef);

      // Formatear el mensaje con el enlace a la imagen
      return (
        <p key={index}>
          <a href={imageUrl} target="_blank" rel="noopener noreferrer">
            Link {index + 1}
          </a>
          <br />
          💰 <strong>Precio:</strong> {item.unit_price}<br />
          🔢 <strong>Cantidad:</strong> {item.quantity}<br />
          <img src={imageUrl} alt={`Imagen ${index + 1}`} style={{ maxWidth: '100%', height: 'auto' }} />
          <br /><br />
        </p>
      );
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
  }, []);  // Agrega dependencias si es necesario

  return (
    <div>
      {/* Puedes agregar contenido adicional al componente si es necesario */}
      {/* Esto podría incluir un mensaje indicando que el enlace de WhatsApp se ha abierto */}
    </div>
  );
};

export default Whatsapp;

