
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Moon, Sun, Menu, X, Terminal, Monitor } from "lucide-react";
import NavigationButtons from "./NavigationButtons";
import { useTheme } from "../contexts/ThemeContext";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const { isDark, toggleTheme, theme } = useTheme();

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

  const themeOptions = [
    { icon: <Sun size={16} />, label: "Light", value: "light" },
    { icon: <Moon size={16} />, label: "Dark", value: "dark" },
    { icon: <Monitor size={16} />, label: "System", value: "system" },
  ];

  const getThemeIcon = () => {
    if (theme === 'system') {
      return isDark ? <Moon size={20} /> : <Sun size={20} />;
    }
    return theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />;
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all-300 ${
        isScrolled
          ? "bg-gray-900/95 backdrop-blur-xl shadow-lg border-b border-white/10"
          : "bg-gray-900/80 backdrop-blur-md"
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
              <Terminal className="text-green-500 mr-2" size={24} />
              <span className="font-bold text-xl text-white">M</span>
              <span className="font-semibold text-lg text-gray-300">Hallaffou</span>
            </motion.div>
          </Link>
          <NavigationButtons />
        </div>

        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <div className="relative">
            <motion.button
              onClick={() => setShowThemeMenu(!showThemeMenu)}
              className="p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-gray-200 hover:bg-white/20 transition-all-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {getThemeIcon()}
            </motion.button>
            
            <AnimatePresence>
              {showThemeMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 top-full mt-2 bg-gray-800/95 backdrop-blur-xl border border-white/20 rounded-lg shadow-xl overflow-hidden"
                >
                  {themeOptions.map((option, index) => (
                    <motion.button
                      key={option.value}
                      onClick={() => {
                        toggleTheme();
                        setShowThemeMenu(false);
                      }}
                      className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 transition-all-300 w-full text-left"
                      whileHover={{ x: 5 }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {option.icon}
                      <span className="text-sm">{option.label}</span>
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-200 p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all-300"
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
            className="md:hidden bg-gray-900/95 backdrop-blur-xl border-t border-white/10"
          >
            <div className="container mx-auto py-4 px-4 flex flex-col gap-2">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="text-gray-300 hover:text-green-500 py-3 px-4 font-medium flex items-center rounded-lg hover:bg-white/10 transition-all-300"
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
