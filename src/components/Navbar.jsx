import { NavbarData } from "../data/Navbar";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react"; // Mobile menu icons
import { motion } from "framer-motion";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false); // State for scroll detection

  // Detect scroll to change navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`bg-gray-800 shadow-md sticky top-0 z-50 ${isScrolled ? 'bg-gray-900' : 'bg-gray-800'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <NavLink
              to="/"
              className="text-white text-2xl font-bold hover:text-blue-400 transition duration-200"
              aria-label="Paste-It Logo"
            >
              Paste-It
            </NavLink>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center ml-auto pr-8">
            {NavbarData.map((link, idx) => (
              <NavLink
                key={idx}
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-500 font-semibold text-lg border-b-2 border-blue-500 transition-colors"
                    : "text-white font-medium text-lg hover:text-blue-400 transition-colors"
                }
              >
                {link.title}
              </NavLink>
            ))}

            {/* Contact and Rate It Links */}
            {["Contact Me", "Rate It", "How It Works"].map((title, idx) => (
              <NavLink
                key={title}
                to={`/${title.toLowerCase().replace(/\s/g, "")}`}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-500 font-semibold text-lg border-b-2 border-blue-500 transition-colors"
                    : "text-white font-medium text-lg hover:text-blue-400 transition-colors"
                }
              >
                {title}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-blue-400 focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          className="md:hidden bg-gray-700 p-4 space-y-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {NavbarData.map((link, idx) => (
            <NavLink
              key={idx}
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? "block text-blue-500 font-semibold text-lg py-2 border-b-2 border-blue-500"
                  : "block text-white font-medium text-lg py-2 hover:text-blue-400 transition-colors"
              }
              onClick={() => setIsMobileMenuOpen(false)} // Close menu on link click
            >
              {link.title}
            </NavLink>
          ))}

          {/* Additional Links */}
          {["Contact Me", "Rate It", "How It Works"].map((title, idx) => (
            <NavLink
              key={title}
              to={`/${title.toLowerCase().replace(/\s/g, "")}`}
              className={({ isActive }) =>
                isActive
                  ? "block text-blue-500 font-semibold text-lg py-2 border-b-2 border-blue-500"
                  : "block text-white font-medium text-lg py-2 hover:text-blue-400 transition-colors"
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {title}
            </NavLink>
          ))}
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
