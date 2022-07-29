import { useAppDispatch, useAppSelector } from "app/hooks";
import Input from "elements/Input";
import React, { useContext, useState } from "react";
import styles from "./User.module.scss";
import { signIn } from "./userThunk";
import { status, userInfo } from "./userSlice";
import { useRouter } from "next/router";
import UserService from "services/user.service";
import TokenService from "services/token.service";
import { UserContext } from "providers/userContext";

const SignIn = () => {
  const [user, setUser] = useContext(UserContext) as any;
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

  const onSubmit = async (e: any) => {
    e.preventDefault();
    // dispatch(signIn(input));
    // const returnUrl = router.query.returnUrl || ("/" as any);
    // if (stt === "success") {
    //   router.push(returnUrl);
    // }
    try {
      const d = { user: input };
      const res = await UserService.signIn(d);
      console.log(res);
      setUser(res.data.user);
      TokenService.setUser(res.data.user);
      const returnUrl = router.query.returnUrl || ("/" as any);
      router.push(returnUrl);
    } catch (error) {
      console.log(error);
    }
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
