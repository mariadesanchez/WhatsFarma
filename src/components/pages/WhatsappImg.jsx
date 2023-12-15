/* eslint-disable no-unused-vars */
import React from 'react';
import { WhatsAppWidget } from 'react-whatsapp-widget';
import 'react-whatsapp-widget/dist/index.css';

const WhatsappImg = () => {
  const handleWhatsAppButtonClick = () => {
    // Puedes añadir lógica adicional antes de abrir el widget si es necesario
    // ...

    // Abre el widget de WhatsApp
    document.getElementById('whatsapp-widget-button').click();
  };

  return (
    <div>
      {/* Tu componente para mostrar la imagen */}
      <img
        src="https://firebasestorage.googleapis.com/v0/b/ecommerce-858fc.appspot.com/o/22598402-a4c5-47f6-a194-0cde14b2dfe8?alt=media&token=962be391-7e05-49ef-8d6c-bc8c8126e931"
        alt="Imagen"
        style={{ maxWidth: '100%' }}
      />

      {/* Botón de WhatsApp */}
      <button id="whatsapp-widget-button" onClick={handleWhatsAppButtonClick}>
        Contactar por WhatsApp
      </button>

      {/* Widget de WhatsApp */}
      <WhatsAppWidget
        phoneNumber="123456789" // Reemplaza con tu número de teléfono de WhatsApp
        text="Hola, estoy interesado en este producto"
      />
    </div>
  );
};

export default WhatsappImg;

