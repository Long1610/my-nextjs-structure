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
import { Button, CircularProgress, Grid, Typography } from "@mui/material";

const SignIn = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("email is required"),
    password: Yup.string().required("Password is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState, getValues } = useForm(formOptions);
  const { errors } = formState;

  const [user, setUser] = useContext(UserContext) as any;
  const router = useRouter();

  const data = {
    user: { email: getValues("email"), password: getValues("password") },
  };

  console.log(data);

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
    <Box px={3} py={2}>
      <Typography variant="h6" align="center" margin="dense">
        Sign In
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <Input placeholder="Email" {...register("email")} type="email" />
            <Typography variant="inherit" color="textSecondary">
              {errors.email?.message}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Input
              placeholder="Password"
              {...register("password")}
              type="password"
            />
            <Typography variant="inherit" color="textSecondary">
              {errors.password?.message}
            </Typography>
          </Grid>
        </Grid>
        <Box mt={3}>
          <Button variant="contained" color="primary" type="submit">
            {signInloading ? <CircularProgress /> : "Sign in"}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default SignIn;
