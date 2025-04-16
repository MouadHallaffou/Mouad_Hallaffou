
import { Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <div className="flex gap-6 mb-6">
            <motion.a
              href="https://github.com/MouadHallaffou"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-green-500 dark:text-gray-400"
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Github size={20} />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/hallaffou-mouad"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-green-500 dark:text-gray-400"
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Linkedin size={20} />
            </motion.a>
            <motion.a
              href="mailto:mouadhallaffou@gmail.com"
              className="text-gray-600 hover:text-green-500 dark:text-gray-400"
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Mail size={20} />
            </motion.a>
          </div>
          <motion.p 
            className="text-gray-600 dark:text-gray-400 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            © {currentYear} Mouad Hallaffou. All rights reserved.
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
