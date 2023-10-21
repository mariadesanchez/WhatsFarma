/* eslint-disable no-unused-vars */
import React from 'react';
import { IconButton } from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';

const ShareOnFacebook = (props) => {
  const { url } = props;

  const handleShareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, 'Compartir en Facebook', 'width=600, height=400');
  };

  return (
    <IconButton onClick={handleShareOnFacebook}>
      <FacebookIcon color="primary" style={{ width: '50px', height: '50px' }} />
    </IconButton>
  );
};

export default ShareOnFacebook;


