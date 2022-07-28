import React from "react";
import styles from "./Button.module.scss";

interface button {
  onClick: () => void;
  title: string;
}

const Button = ({ onClick, title }: button) => {
  return (
    <>
      <button onClick={onClick} className={styles.button}>
        {title}
      </button>
    </>
  );
};

export default Button;
