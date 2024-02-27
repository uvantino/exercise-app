import React from 'react';
import { Button } from '@mui/material';

const ReusableButton = ({ onClick, children, additionalStyles, disabled }) => (
  <Button
    className="reusable-btn"
    sx={{
      //   bgcolor: '#FF2625',
      //   color: '#fff',
      //   textTransform: 'none',
      //   width: '120px',
      //   height: '40px',
      //   fontSize: '16px',
      '&:hover': {
        backgroundColor: '#FF2625', // Override the hover background color
      },
      ...additionalStyles,
    }}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </Button>
);

export default ReusableButton;
