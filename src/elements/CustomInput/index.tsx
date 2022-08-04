import { Box, InputAdornment, InputLabel, TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import styles from "./Input.module.scss";

interface input {
  type: string;
  label: string;
  control: any;
  name: string;
  start?: any;
  end?: any;
}

const CustomInput = ({ type, label, control, name, start, end }: input) => {
  return (
    <Box className={styles.input_wrapper}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <Box>
        {start && start()}
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value } }) => (
            <input
              id={name}
              type={type}
              onChange={onChange}
              value={value}
              className={styles.input}
              style={{}}
            />
          )}
        />
        {end && end()}
      </Box>
    </Box>
  );
};

export default CustomInput;
