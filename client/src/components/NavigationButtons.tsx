
import { motion } from "framer-motion";
import { Code, User, Briefcase, FileText, Mail, Home } from "lucide-react";

interface NavButton {
  id: string;
  icon: React.ReactNode;
  label: string;
}

const NavigationButtons = () => {
  const navButtons: NavButton[] = [
    { id: "home", icon: <Home size={16} />, label: "Home" },
    { id: "about", icon: <User size={16} />, label: "About" },
    { id: "skills", icon: <Code size={16} />, label: "Skills" },
    { id: "projects", icon: <Briefcase size={16} />, label: "Projects" },
    { id: "resume", icon: <FileText size={16} />, label: "Resume" },
    { id: "contact", icon: <Mail size={16} />, label: "Contact" },
  ];

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="flex items-center space-x-1 ml-6">
      {navButtons.map((button, index) => (
        <motion.button
          key={button.id}
          onClick={() => handleClick(button.id)}
          className="flex items-center gap-1 px-3 py-1.5 text-xs text-gray-200 hover:bg-gray-700 rounded transition-colors relative group"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={button.label}
        >
          <span className="text-green-500">{button.icon}</span>
          <span className="hidden md:inline">{button.label}</span>
          <motion.span 
            className="absolute bottom-0 left-0 h-0.5 bg-green-500"
            initial={{ width: 0 }}
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 pointer-events-none"
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {button.label}
          </motion.div>
        </motion.button>
      ))}
    </div>
  );
};

export default NavigationButtons;
