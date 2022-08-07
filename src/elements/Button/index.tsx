import { CircularProgress } from "@mui/material";
import React from "react";
import styles from "./Button.module.scss";

interface button {
  onClick?: () => void;
  title: string;
  cate: "out-line-disable" | "out-line" | "standard";
  custom?: any;
  isLoading?: boolean;
  disabled?: boolean;
}

const Button = ({
  onClick,
  title,
  cate,
  custom,
  isLoading,
  disabled,
}: button) => {
  let style = "";
  if (cate === "out-line") {
    style = styles.button_outline;
  }
  if (cate === "standard") {
    style = styles.button_standard;
  }

  return (
    <>
      <button
        onClick={onClick}
        className={style}
        style={{ ...custom }}
        disabled={disabled}
      >
        {isLoading ? <CircularProgress color="inherit" /> : title}
      </button>
    </>
  );
};

export default Button;
