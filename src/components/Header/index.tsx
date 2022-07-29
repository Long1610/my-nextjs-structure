import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Header.module.scss";
import TokenService from "services/token.service";
import { useRouter } from "next/router";
import { useAppDispatch } from "app/hooks";
import { reset } from "containers/user/userSlice";
import { UserContext } from "providers/userContext";

const Header = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [user, setUser] = useContext(UserContext) as any;

  const us = TokenService.getUser();

  const logOut = () => {
    TokenService.removeUser();
    setUser({});
    router.push("/signin");
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/" className="logo">
          <a className={styles.a}>conduit</a>
        </Link>
        <div className={styles.header_right}>
          <Link href="/">
            <a className={styles.a}>Home</a>
          </Link>

          {!us?.token && (
            <>
              <Link href="/signin">
                <a className={styles.a}>Sign in</a>
              </Link>
              <Link href="/signup">
                <a className={styles.a}>Sign up</a>
              </Link>
            </>
          )}

          <Link href="/about">
            <a className={styles.a}>About</a>
          </Link>
          {us?.token && (
            <button onClick={logOut} className={styles.log_out}>
              Log out
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
