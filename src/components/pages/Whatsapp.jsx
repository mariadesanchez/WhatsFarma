/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../firebaseConfig';

const Whatsapp = () => {
  let storedOrderId = localStorage.getItem('order');
  let orderData = {};

  try {
    orderData = JSON.parse(storedOrderId);
  } catch (error) {
    console.error('Error al parsear el objeto de la orden:', error);
  }

  const sendMessageToWhatsApp = async () => {
    try {
      const formattedMessage = await Promise.all(orderData.items.map(async (item) => {
        // Obtener la URL de descarga de Firebase Storage
        const imageRef = ref(storage, item.image);
        const imageUrl = await getDownloadURL(imageRef);

        // Formatear el mensaje con la URL de la imagen
        return `*[Imagen: ${item.image}]*\n💰 *Precio:* ${item.unit_price}\n🔢 *Cantidad:* ${item.quantity}\n${imageUrl}\n\n`;
      }));

      // Crear el enlace de WhatsApp con el mensaje formateado
      const encodedMessage = encodeURIComponent(`*Detalles del Pedido:*\n\n${formattedMessage.join('')}`);
      const whatsappLink = `https://api.whatsapp.com/send?phone=5492213602683&text=${encodedMessage}`;

      // Abrir el enlace de WhatsApp en una nueva ventana o pestaña
      window.open(whatsappLink, '_blank');
    } catch (error) {
      console.error('Error al enviar el mensaje de WhatsApp:', error);
    }
  };

  useEffect(() => {
    // Llamar a la función al cargar el componente o en respuesta a cambios específicos
    sendMessageToWhatsApp();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderData]);  // Agrega las dependencias necesarias

  return (
    <div>
      {/* Puedes agregar contenido adicional al componente si es necesario */}
      {/* Esto podría incluir un mensaje indicando que el enlace de WhatsApp se ha abierto */}
    </div>
  );
};

export default Whatsapp;



