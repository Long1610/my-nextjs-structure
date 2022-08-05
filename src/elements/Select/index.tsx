import {
  Box,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import styles from "./Input.module.scss";

interface input {
  label: string;
  control: any;
  name: string;
}

const SelectCustom = ({ label, control, name }: input) => {
  return (
    <Box className={styles.select_wrapper}>
      <InputLabel htmlFor={name} className={styles.label}>
        {label}
      </InputLabel>
      <Box className={styles.container}>
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              value={value}
              onChange={onChange}
              displayEmpty
              input={<OutlinedInput />}
              fullWidth
              className={styles.input}
              IconComponent={() => <KeyboardArrowDownIcon />}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          )}
        />
      </Box>
    </Box>
  );
};

export default SelectCustom;
