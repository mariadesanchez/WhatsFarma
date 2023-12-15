/* eslint-disable no-unused-vars */
import React, { useEffect, useContext } from 'react';
import { CartContext } from "../../context/CartContext";

const Whatsapp = () => {
  const { cartScreenshot } = useContext(CartContext);

  const sendMessageToWhatsApp = async () => {
    // Crear el enlace de WhatsApp con el mensaje formateado
    const encodedMessage = encodeURIComponent(`¡Hola! Adjunto está mi carrito de compras.`);
    const whatsappLink = `https://wa.me/5492213602683?text=${encodedMessage}`;

    // Abrir el enlace de WhatsApp en una nueva ventana o pestaña
    window.open(whatsappLink, '_blank');
  };

  useEffect(() => {
    // Llamar a la función al cargar el componente
    sendMessageToWhatsApp();
  }, [cartScreenshot]); // Asegúrate de incluir cartScreenshot en las dependencias si es necesario

  return (
    <div>
      {/* Puedes agregar contenido adicional al componente si es necesario */}
      {/* Esto podría incluir un mensaje indicando que el enlace de WhatsApp se ha abierto */}
    </div>
  );
};

export default Whatsapp;
