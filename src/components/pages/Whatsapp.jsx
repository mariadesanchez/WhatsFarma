/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react';

const EnlacesWhatsApp = () => {
  const enlaces = [
    'https://firebasestorage.googleapis.com/v0/b/ecommerce-858fc.appspot.com/o/09f1fb16-1efa-4828-9546-aba14818d78a?alt=media&token=38c09278-4052-48a2-aa5f-5f1de3cccc50',
    'https://firebasestorage.googleapis.com/v0/b/ecommerce-858fc.appspot.com/o/ebf32389-9c3b-4049-b467-3cb2595e40eb?alt=media&token=0bd51f12-9e3e-499f-9178-354a96caa654',
  ];

  return (
    <div>
      {enlaces.map((enlace, index) => (
        <p key={index}>
          <a href={enlace} target="_blank" rel="noopener noreferrer">
            Link {index + 1}
          </a>
        </p>
      ))}
    </div>
  );
};

export default EnlacesWhatsApp;
