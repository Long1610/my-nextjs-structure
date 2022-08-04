import Sidebar from "components/Sidebar";
import React from "react";

const Layout = ({ children }: any) => {
  return (
    <div className="wrapper">
      <Sidebar />
      <main className="main">{children}</main>
    </div>
  );
};

export default Layout;
