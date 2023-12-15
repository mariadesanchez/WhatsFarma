/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
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

  const openImageLink = async (imageUrl) => {
    // Abrir el enlace de la imagen en una nueva ventana o pestaña con dimensiones específicas
    window.open(imageUrl, '_blank', 'width=500,height=600');
  };

  const sendMessageToWhatsApp = async () => {
    const formattedMessage = await Promise.all(orderData.items.map(async (item) => {
      // Obtener la URL de descarga de Firebase Storage
      const imageRef = ref(storage, item.image);
      const imageUrl = await getDownloadURL(imageRef);

      // Emoji de cámara para el enlace de la imagen
      const cameraEmoji = '📷';

      // Estilos en línea para el mensaje
      const messageStyle = {
        padding: '10px',
        backgroundColor: '#f0f0f0',
        border: '1px solid #ccc',
        borderRadius: '5px',
        margin: '10px 0',
      };

      const linkStyle = {
        color: '#0073e6',
        textDecoration: 'none',
        fontWeight: 'bold',
      };

      // Formatear el mensaje con el enlace a la imagen y el título del producto
      return (
        <div style={messageStyle}>
          <p>
            <strong>Producto:</strong> {item.title}<br />
            <span role="img" aria-label="camera">
              {cameraEmoji}
            </span> <a href={imageUrl} style={linkStyle} target="_blank" rel="noopener noreferrer">
              Ver imagen
            </a><br />
            <strong>Precio:</strong> {item.unit_price}<br />
            <strong>Cantidad:</strong> {item.quantity}
          </p>
        </div>
      );
    }));

    // Crear el enlace de WhatsApp con el mensaje formateado
    const encodedMessage = encodeURIComponent(`*Detalles del Pedido:*\n\n${formattedMessage.join('')}`);
    const whatsappLink = `https://api.whatsapp.com/send?phone=5492213602683&text=${encodedMessage}`;

    // Abrir el enlace de WhatsApp en una nueva ventana o pestaña con dimensiones específicas
    window.open(whatsappLink, '_blank', 'width=500,height=600');
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
