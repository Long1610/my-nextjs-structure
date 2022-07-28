import React from "react";
import styles from "./Input.module.scss";

interface input {
  onChange: (e: any) => void;
  type: string;
  placeholder: string;
  name: string;
}

const Input = ({ onChange, type, placeholder, name }: input) => {
  return (
    <>
      <input
        type={type}
        onChange={onChange}
        className={styles.input}
        placeholder={placeholder}
        name={name}
      />
    </>
  );
};

export default Input;
