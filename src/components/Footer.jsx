import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="max-w-3xl mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Paste-It. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
