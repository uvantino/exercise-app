import React from 'react';
import { Button } from '@mui/material';

const ReusableButton = ({ onClick, children, additionalStyles }) => (
  <Button
    className="reusable-btn"
    sx={{
      //   bgcolor: '#FF2625',
      //   color: '#fff',
      //   textTransform: 'none',
      //   width: '120px',
      //   height: '40px',
      //   fontSize: '16px',
      ...additionalStyles,
    }}
    onClick={onClick}
  >
    {children}
  </Button>
);

export default ReusableButton;
