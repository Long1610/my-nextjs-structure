import Input from "elements/Input";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import UserService from "services/user.service";
import TokenService from "services/token.service";
import { UserContext } from "providers/userContext";
import { useAxios } from "hooks/useAxios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

const SignIn = () => {
  // form validation rules
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("email is required"),
    password: Yup.string().required("Password is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState, getValues } = useForm(formOptions);
  const { errors } = formState;
  const [user, setUser] = useContext(UserContext) as any;
  const router = useRouter();

  const data = {
    user: { email: getValues("email"), password: getValues("password") },
  };

  const [signInResponse, signInerror, signInloading, setIsClick] = useAxios(
    UserService.signIn,
    data
  );

  const onSubmit = () => {
    setIsClick(true);
  };

  useEffect(() => {
    if (!!signInResponse?.user?.token) {
      setUser(signInResponse.user);
      TokenService.setUser(signInResponse.user);
      const returnUrl = router.query.returnUrl || ("/" as any);
      router.push(returnUrl);
    }
  }, [signInResponse, router, setUser]);

  return (
    <Box>
      <Typography variant="h6" align="center" margin="dense">
        Sign In
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input placeholder="Email" type="email" {...register("email")} />
        <Input
          placeholder="Password"
          type="password"
          {...register("password")}
        />
      </form>
    </Box>
  );
};

export default SignIn;
