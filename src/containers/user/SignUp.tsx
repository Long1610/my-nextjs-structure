import { useAppDispatch, useAppSelector } from "app/hooks";
import Input from "elements/Input";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "./User.module.scss";
import { signUp } from "./userThunk";
import { status } from "./userSlice";

const SignUp = () => {
  const router = useRouter();
  const stt = useAppSelector(status);
  const dispatch = useAppDispatch();
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  const onChange = (e: any) => {
    setInput((p) => ({
      ...p,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    dispatch(signUp(input));
    stt === "success" && router.push("/signin");
  };

  return (
    <div className={styles.sign_up}>
      <div className={styles.container}>
        <h1 className={styles.h1}>Sign up</h1>
        <form id={styles.signup} onSubmit={onSubmit}>
          <Input
            type="text"
            placeholder="username"
            onChange={onChange}
            name="username"
          />
          <Input
            type="text"
            placeholder="email"
            onChange={onChange}
            name="email"
          />
          <Input
            type="password"
            placeholder="password"
            onChange={onChange}
            name="password"
          />
          <button type="submit" className={styles.button}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
