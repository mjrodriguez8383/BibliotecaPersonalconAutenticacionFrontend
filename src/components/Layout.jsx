// src/components/Layout.jsx
import React from 'react';
import { Navbar } from "./Navbar";
import { Footer } from "./Footer"; 

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <header className="app-header">
        <Navbar />
      </header>
      <main className="app-main-content">
        {children}
      </main>
      <footer className="app-footer">
        <Footer />
      </footer>
    </div>
  );
};

export { Layout };