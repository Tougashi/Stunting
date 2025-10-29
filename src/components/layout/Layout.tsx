import React from "react";
import Navbar from "./Navbar";
import { Toaster } from "react-hot-toast";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className = "" }) => {
  return (
    <div className={`min-h-screen bg-white ${className} relative`}>
      <Navbar />
      <main>{children}</main>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toasterId="default"
      />
    </div>
  );
};

export default Layout;
