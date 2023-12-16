/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../firebaseConfig';

const Whatsapp = () => {
  let storedOrderId = localStorage.getItem("order");
  let orderData = {};

  try {
    orderData = JSON.parse(storedOrderId);
  } catch (error) {
    console.error('Error al parsear el objeto de la orden:', error);
  }

  const sendMessageToWhatsApp = async () => {
    const formattedMessage = (await Promise.all(orderData.items.map(async (item) => {
      // Obtener la URL de descarga de Firebase Storage
      const imageRef = ref(storage, item.image);
      const imageUrl = await getDownloadURL(imageRef);

      // Emoji de cámara para el enlace de la imagen
      const cameraEmoji = '📷';

      // Texto del enlace amigable
      const linkText = 'Link de Enlace';

      // Formatear el mensaje con el enlace a la imagen y el título del producto
      return `*${item.title}*\n*${cameraEmoji} ${linkText}\n💰 *Precio:* ${item.unit_price}\n🔢 *Cantidad:* ${item.quantity}\n\n`;
    }))).join('');

    const urlInstructions = "Para ver las imágenes, por favor, visita los siguientes enlaces:";

    // Crear el enlace de WhatsApp con el mensaje formateado
    const encodedMessage = encodeURIComponent(`*Detalles del Pedido:*\n\n${formattedMessage}\n${urlInstructions}`);
    const whatsappLink = `https://api.whatsapp.com/send?phone=5492213602683&text=${encodedMessage}`;

    // Abrir el enlace de WhatsApp en una nueva ventana o pestaña con dimensiones específicas
    window.open(whatsappLink, '_blank', 'width=500,height=600');
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

