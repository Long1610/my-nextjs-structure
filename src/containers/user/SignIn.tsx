import { useAppDispatch, useAppSelector } from "app/hooks";
import Input from "elements/Input";
import React, { useContext, useState } from "react";
import styles from "./User.module.scss";
import { signIn } from "./userThunk";
import { status, userInfo } from "./userSlice";
import { useRouter } from "next/router";

const SignIn = () => {
  const router = useRouter();
  const stt = useAppSelector(status);
  const us = useAppSelector(userInfo);
  const dispatch = useAppDispatch();
  const [input, setInput] = useState({
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
    dispatch(signIn(input));
    const returnUrl = router.query.returnUrl || ("/" as any);
    if (stt === "success") {
      router.push("/");
    }
    console.log("user info", us);
  };

  return (
    <div className={styles.sign_up}>
      <div className={styles.container}>
        <h1 className={styles.h1}>Sign in</h1>
        <form id={styles.signup} onSubmit={onSubmit}>
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
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
