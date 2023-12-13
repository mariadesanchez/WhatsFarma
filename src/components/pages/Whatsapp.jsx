/* eslint-disable no-unused-vars */
// WhatsApp.jsx

import React, { useEffect } from 'react';

const Whatsapp = ({ order }) => {
  useEffect(() => {
    if (order) {
      // Crear el mensaje de WhatsApp
      const message = JSON.stringify(order);

      // Crear el enlace de WhatsApp con el mensaje codificado
      const encodedMessage = encodeURIComponent(message);
      const whatsappLink = `https://api.whatsapp.com/send?phone=5492213602683&text=${encodedMessage}`;

      // Abrir el enlace de WhatsApp en una nueva ventana o pestaña
      window.open(whatsappLink, '_blank');
    }
  }, []);

  return (
    <div>
      {/* Puedes agregar contenido adicional al componente si es necesario */}
      {/* Esto podría incluir un mensaje indicando que el enlace de WhatsApp se ha abierto */}
    </div>
  );
};

export default Whatsapp;
