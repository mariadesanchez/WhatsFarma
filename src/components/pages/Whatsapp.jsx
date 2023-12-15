/* eslint-disable no-unused-vars */
// Whatsapp.jsx
import React, { useEffect } from 'react';
import { getDownloadURL, ref } from 'firebase/storage';
import { db, storage } from '../../firebaseConfig';  // Ensure correct relative path

const Whatsapp = () => {
  let storedOrderId = localStorage.getItem("order");
  let orderData = {};

  try {
    orderData = JSON.parse(storedOrderId);
  } catch (error) {
    console.error('Error al parsear el objeto de la orden:', error);
  }

  // ...

// ...

const sendMessageToWhatsApp = async () => {
    const formattedMessage = await Promise.all(orderData.items.map(async (item) => {
      // Obtener la URL de descarga de Firebase Storage
      const imageRef = ref(storage, item.image);
      const imageUrl = await getDownloadURL(imageRef);
  
      // Enviar la imagen al servidor para hacerla pública
      const publicImageUrl = await sendImageToServer(imageUrl);
  
      // Formatear el mensaje con la imagen pública
      return `*[Imagen: ${item.image}]*\n💰 *Precio:* ${item.unit_price}\n🔢 *Cantidad:* ${item.quantity}\n![Imagen](${publicImageUrl})\n\n`;
    }));
  
    // Crear el enlace de WhatsApp con el mensaje formateado
    const encodedMessage = encodeURIComponent(`*Detalles del Pedido:*\n\n${formattedMessage.join('')}`);
    const whatsappLink = `https://api.whatsapp.com/send?phone=5492213602683&text=${encodedMessage}`;
  
    // Abrir el enlace de WhatsApp en una nueva ventana o pestaña
    window.open(whatsappLink, '_blank');
  };
  
  // ...
  
  
  // Función para enviar la imagen al servidor para hacerla pública
  const sendImageToServer = async (imageUrl) => {
    try {
      const response = await fetch('https://vercel.com/mariadesanchez/backend-l/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imageUrl }),
      });
  
      const { imageUrl: publicImageUrl } = await response.json();
      return publicImageUrl;
    } catch (error) {
      console.error('Error al enviar la imagen al servidor:', error);
      // Manejar el error según tus necesidades
      return imageUrl; // Devuelve la URL original en caso de error
    }
  };
  
  // ...
  
  

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

