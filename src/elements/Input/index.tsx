import { TextField } from "@mui/material";
import React from "react";

interface input {
  onChange?: (e: any) => void;
  type: string;
  placeholder: string;
  className?: string;
}

const Input = ({ onChange, type, placeholder, className }: input) => {
  return (
    <>
      <TextField
        type={type}
        label={placeholder}
        onChange={onChange}
        className={className}
        fullWidth
        margin="dense"
      />
    </>
  );
};

export default Input;
