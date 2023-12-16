/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react';

const Whatsapp = () => {
  const enlaces = [
    'https://firebasestorage.googleapis.com/v0/b/ecommerce-858fc.appspot.com/o/09f1fb16-1efa-4828-9546-aba14818d78a?alt=media&token=38c09278-4052-48a2-aa5f-5f1de3cccc50',
    'https://firebasestorage.googleapis.com/v0/b/ecommerce-858fc.appspot.com/o/ebf32389-9c3b-4049-b467-3cb2595e40eb?alt=media&token=0bd51f12-9e3e-499f-9178-354a96caa654',
  ];

  const enviarWhatsApp = () => {
    const numeroWhatsApp = '5492213602683'; // Reemplaza con el número de teléfono al que quieres enviar el mensaje
    const mensajeCodificado = encodeURIComponent(enlaces.join('\n'));
    const url = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${mensajeCodificado}`;
    window.open(url, '_blank');
  };

  return (
    <div>
      <button onClick={enviarWhatsApp}>
        Enviar enlaces por WhatsApp
      </button>
    </div>
  );
};

export default Whatsapp;