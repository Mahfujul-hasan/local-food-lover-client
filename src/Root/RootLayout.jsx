import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <div>
      <header className="max-w-7xl mx-auto">
        <Navbar />
      </header>
      <main className="bg-base-200 min-h-screen pb-10">
        <Outlet />
      </main>
      <footer className="bg-primary">
        <Footer />
      </footer>
    </div>
  );
};

export default RootLayout;
