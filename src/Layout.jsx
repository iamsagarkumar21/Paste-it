import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar'; // Import your Navbar component
import Footer from './components/Footer'; // Import your Footer component

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
