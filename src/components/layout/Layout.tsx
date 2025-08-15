import React from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className = '' }) => {
  return (
    <div className={`min-h-screen bg-white ${className}`}>
      <Navbar />
      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout;
