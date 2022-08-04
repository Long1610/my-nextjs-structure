import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import TokenService from "services/token.service";
import { useRouter } from "next/router";
import { UserContext } from "providers/userContext";
import styles from "./Sidebar.module.scss";
import SearchIcon from "@mui/icons-material/Search";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import Divider from "elements/Divider";
import { Box } from "@mui/material";

const Sidebar = () => {
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();
  const [user, setUser] = useContext(UserContext) as any;

  const logOut = () => {
    TokenService.removeUser();
    setUser({});
    router.push("/signin");
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") as any);
    if (user) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [user]);

  return (
    <Box className={styles.sidenav}>
      <Box className={styles.logo}>
        <Link href="/">
          <a>Tech cent</a>
        </Link>
      </Box>
      <Divider />
      <Box className={styles.menu}>
        <Box className={styles.sidebar_item}>
          <SearchIcon />
          <Link href="/">
            <a className={styles.a}>Technology</a>
          </Link>
        </Box>
        <Box className={styles.sidebar_item}>
          <EventAvailableIcon />
          <Link href="/transactions">
            <a className={styles.a}>Transactions</a>
          </Link>
        </Box>
      </Box>
      <Box className={styles.account}>
        <Divider />
        <Box className={styles.bottom}>
          {isLogin ? (
            <Box className={styles.sidebar_item}>
              <LogoutIcon />
              <a onClick={logOut} className={styles.log_out}>
                Log out
              </a>
            </Box>
          ) : (
            <Box className={styles.sidebar_item}>
              <PersonIcon />
              <Link href="/signin">
                <a className={styles.a}>Sign in</a>
              </Link>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
