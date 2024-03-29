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
import { Grid, Typography, IconButton } from "@mui/material";
import Link from "next/link";
import styles from "./User.module.scss";
import Input from "elements/Input";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ButtonCustom from "elements/Button";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("email is required"),
    password: Yup.string().required("Password is required"),
  });

  const defaultValues = {
    email: "",
    password: "",
  };

  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues,
  };
  const { handleSubmit, formState, getValues, control } = useForm(formOptions);
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

  const onSubmit = (data: any) => {
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

  const handleClickShowPassword = () => {
    setShowPassword((s) => !s);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const EndComponent = () => {
    return (
      <IconButton
        aria-label="toggle password visibility"
        onClick={handleClickShowPassword}
        onMouseDown={handleMouseDownPassword}
        edge="end"
      >
        {showPassword ? (
          <Visibility className={styles.icon} />
        ) : (
          <VisibilityOff className={styles.icon} />
        )}
      </IconButton>
    );
  };

  return (
    <>
      <Box className={styles.sign_in}>
        <Typography variant="h4" mb={2} color="GrayText">
          Tech cent
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12}>
              <Input
                type="email"
                name="email"
                label="Email"
                control={control}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.email?.message}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                label="Password"
                control={control}
                end={EndComponent}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.password?.message}
              </Typography>
            </Grid>
          </Grid>
          <Box mt={3}>
            <ButtonCustom
              title="Sign in"
              cate="standard"
              isLoading={signInloading}
            />
          </Box>
          <Box mt={2} className={styles.bottom_signup}>
            <Link href="/signup/vendor">
              <a className={styles.a}>Vendor</a>
            </Link>
            <Link href="/signup/customer">
              <a className={styles.a}>Customer</a>
            </Link>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default SignIn;
