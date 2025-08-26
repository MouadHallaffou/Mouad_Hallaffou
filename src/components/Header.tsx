import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Moon, Sun, Menu, X, Terminal } from "lucide-react";
import NavigationButtons from "./NavigationButtons";
import { useTheme } from "../contexts/ThemeContext";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Resume", href: "#resume" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all-300 ${isScrolled
        ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-lg border-b border-gray-200/50 dark:border-white/10"
        : "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md"
        }`}
    >
      <div className="container mx-auto py-4 px-4 flex-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center"
            >
              <Terminal className="text-green-600 dark:text-green-500 mr-2" size={24} />
              <span className="font-bold text-xl text-gray-900 dark:text-white">M</span>
              <span className="font-semibold text-sm text-gray-600 dark:text-gray-300">Hallaffou</span>
            </motion.div>
          </Link>
          {/* NavigationButtons visible uniquement sur desktop ou si le menu mobile est fermé */}
          <div className={`hidden md:block ${isMobileMenuOpen ? "hidden" : ""}`}>
            <NavigationButtons />
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <motion.button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 dark:text-gray-200 p-2 rounded-lg bg-gray-100/50 dark:bg-white/10 backdrop-blur-sm border border-gray-300/50 dark:border-white/20 hover:bg-gray-200/70 dark:hover:bg-white/20 transition-all-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-200/50 dark:border-white/10"
          >
            <div className="container mx-auto py-4 px-4 flex flex-col gap-2">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500 py-3 px-4 font-medium flex items-center rounded-lg hover:bg-gray-100/70 dark:hover:bg-white/10 transition-all-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                  whileHover={{ x: 10 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
