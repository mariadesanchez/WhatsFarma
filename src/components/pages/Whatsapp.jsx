/* eslint-disable no-unused-vars */
// Whatsapp.jsx
import React, { useEffect } from 'react';
import { getDownloadURL, ref } from 'firebase/storage';
import { db, storage } from '../../firebaseConfig';
import ShortUrl from 'short-url';

const Whatsapp = () => {
  let storedOrderId = localStorage.getItem("order");
  let orderData = {};

  try {
    orderData = JSON.parse(storedOrderId);
  } catch (error) {
    console.error('Error al parsear el objeto de la orden:', error);
  }

  const shortenUrl = async (longUrl) => {
    try {
      const shortUrl = await ShortUrl(longUrl);
      return shortUrl;
    } catch (error) {
      console.error('Error al acortar la URL:', error);
      return longUrl; // En caso de error, retorna la URL original
    }
  };

  const sendMessageToWhatsApp = async () => {
    const formattedMessage = await Promise.all(orderData.items.map(async (item) => {
      // Obtener la URL de descarga de Firebase Storage
      const imageRef = ref(storage, item.image);
      const imageUrl = await getDownloadURL(imageRef);

      // Acortar la URL de la imagen con short-url
      const shortImageUrl = await shortenUrl(imageUrl);

      // Formatear el mensaje con la imagen abreviada
      return `*Ver:* ${shortImageUrl}*\n💰 *Precio:* ${item.unit_price}*\n🔢 *Cantidad:* ${item.quantity}\n\n`;
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
  }, []);

  return (
    <div>
      {/* Puedes agregar contenido adicional al componente si es necesario */}
      {/* Esto podría incluir un mensaje indicando que el enlace de WhatsApp se ha abierto */}
    </div>
  );
};

export default Whatsapp;
