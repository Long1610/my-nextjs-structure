import Footer from "components/Footer";
import Header from "components/Header";
import React from "react";

const Layout = ({ children }: any) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
