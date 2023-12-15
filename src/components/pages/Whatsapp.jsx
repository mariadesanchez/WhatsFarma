import React, { useEffect, useContext } from 'react';
import { CartContext } from "../../context/CartContext";

const Whatsapp = () => {
  const { cartScreenshot } = useContext(CartContext);

  const sendMessageToWhatsApp = async () => {
    // Crear el enlace de WhatsApp con la imagen adjunta
    const whatsappLink = `https://api.whatsapp.com/send?phone=5492213602683`;

    // Abrir el enlace de WhatsApp en una nueva ventana o pestaña
    const win = window.open(whatsappLink, '_blank');

    // Esperar un momento para que se abra la ventana antes de ejecutar el código siguiente
    setTimeout(() => {
      // Si la ventana se abrió correctamente, enviar la captura de pantalla
      if (win) {
        // Convertir la captura de pantalla a formato base64
        const base64Image = cartScreenshot.toDataURL('image/png');

        // Crear un nuevo objeto FormData para enviar la imagen
        const formData = new FormData();
        formData.append('file', base64Image);

        // Crear una solicitud XMLHttpRequest para enviar la imagen a WhatsApp
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://whatsapp-server-url/upload', true);

        // Establecer el encabezado adecuado para indicar que es una imagen
        xhr.setRequestHeader('Content-Type', 'multipart/form-data');

        // Enviar la solicitud con la imagen
        xhr.send(formData);
      }
    }, 500); // Ajusta el tiempo según sea necesario
  };

  useEffect(() => {
    // Llamar a la función al cargar el componente
    sendMessageToWhatsApp();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartScreenshot]); // Asegúrate de incluir cartScreenshot en las dependencias si es necesario

  return (
    <div>
      {/* Puedes agregar contenido adicional al componente si es necesario */}
      {/* Esto podría incluir un mensaje indicando que el enlace de WhatsApp se ha abierto */}
    </div>
  );
};

export default Whatsapp;

