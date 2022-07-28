import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Header.module.scss";
import TokenService from "services/token.service";
import { useRouter } from "next/router";

const Header = () => {
  const isLogin = !!TokenService.getUser();
  const router = useRouter();

  const logOut = () => {
    TokenService.removeUser();
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

          {!isLogin && (
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
          {isLogin && (
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
