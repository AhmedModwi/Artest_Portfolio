"use client";
import React from 'react';
import { TextField } from '@mui/material';

const AddText = ({ label, value, onChange, numberOfLetters }) => {
  return (
    <TextField
      label={label}
      multiline
      rows={numberOfLetters / 30} // Assuming average number of characters per line is around 30
      variant="outlined"
      value={value}
      onChange={onChange}
      className='w-full py-2 my-3'
    />
  );
};

export default AddText;
