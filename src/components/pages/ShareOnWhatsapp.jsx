/* eslint-disable no-unused-vars */
import React from 'react';
import { IconButton } from "@mui/material";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const ShareOnWhatsApp = (props) => {
  const { text, url } = props;

  const handleShareOnWhatsApp = () => {
    const message = encodeURIComponent(`¡Mira esto! ${text}: ${url}`);
    const whatsappUrl = `https://api.whatsapp.com/send?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <IconButton onClick={handleShareOnWhatsApp}>
      <WhatsAppIcon color="primary" style={{ width: '50px', height: '50px' }} />
    </IconButton>
  );
};

export default ShareOnWhatsApp;
