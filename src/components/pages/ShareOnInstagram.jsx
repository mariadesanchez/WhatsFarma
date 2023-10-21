/* eslint-disable no-unused-vars */
import React from 'react';
import { IconButton } from "@mui/material";
import InstagramIcon from '@mui/icons-material/Instagram';

const ShareOnInstagram = (props) => {
  const { url } = props;

  const handleShareOnInstagram = () => {
    const instagramUrl = `https://www.instagram.com/share?url=${encodeURIComponent(url)}`;
    window.open(instagramUrl, 'Compartir en Instagram', 'width=600, height=400');
  };

  return (
    <IconButton onClick={handleShareOnInstagram}>
      <InstagramIcon color="primary" style={{ width: '50px', height: '50px' }} />
    </IconButton>
  );
};

export default ShareOnInstagram;

