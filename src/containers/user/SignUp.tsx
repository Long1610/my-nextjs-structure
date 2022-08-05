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
import { Grid, Typography, Alert, IconButton, Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Link from "next/link";
import styles from "./User.module.scss";
import Input from "elements/Input";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import SelectCustom from "elements/Select";

interface SignUp {
  isVendor?: boolean;
}

const SignUp = ({ isVendor }: SignUp) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("email is required"),
    password: Yup.string().required("Password is required"),
  });

  const defaultValues = {
    email: "",
    password: "",
    confirmPassword: "",
    tech: "",
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
    alert(JSON.stringify(data));
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

  const CheckIcon = () => {
    return <CheckCircleOutlineIcon />;
  };

  const ButtonCustom = () => {
    return (
      <button
        style={{
          alignSelf: "stretch",
          width: "150px",
          backgroundColor: "transparent",
          borderRadius: "5px",
        }}
      >
        Click
      </button>
    );
  };

  return (
    <>
      <Box className={styles.sign_in}>
        <Typography variant="h4" mb={3} color="GrayText">
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
                element={ButtonCustom}
                end={CheckIcon}
              />
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
            <Grid item xs={12} sm={12}>
              <Input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                label="Confirm Password"
                control={control}
                end={EndComponent}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.confirmPassword?.message}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              {isVendor && (
                <SelectCustom label="Tech" control={control} name="tech" />
              )}
              <Typography variant="inherit" color="textSecondary">
                {errors.password?.message}
              </Typography>
            </Grid>
          </Grid>
          <Box mt={3}>
            <LoadingButton
              color="inherit"
              size="large"
              type="submit"
              fullWidth
              loading={signInloading}
              variant="contained"
            >
              Sign Up
            </LoadingButton>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default SignUp;
