
import { Github, Linkedin, Mail, Heart, Terminal } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: <Github size={20} />,
      href: "https://github.com/MouadHallaffou",
      label: "GitHub"
    },
    {
      icon: <Linkedin size={20} />,
      href: "https://linkedin.com/in/hallaffou-mouad",
      label: "LinkedIn"
    },
    {
      icon: <Mail size={20} />,
      href: "mailto:mouadhallaffou@gmail.com",
      label: "Email"
    }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-t border-white/10">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col items-center"
        >
          {/* Logo and Brand */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 mb-6"
          >
            <Terminal className="text-green-500" size={24} />
            <span className="font-bold text-xl text-white">M</span>
            <span className="font-semibold text-lg text-gray-300">Hallaffou</span>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex gap-6 mb-8"
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-gray-300 hover:text-green-400 hover:bg-white/20 transition-all-300"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                title={link.label}
              >
                {link.icon}
              </motion.a>
            ))}
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-gray-400 text-center max-w-md mb-8 leading-relaxed"
          >
            Full Stack Developer passionate about creating innovative digital experiences 
            and building scalable web applications.
          </motion.p>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 text-gray-500 text-sm"
          >
            <span>© {currentYear} Mouad Hallaffou. All rights reserved.</span>
            <span className="flex items-center gap-1">
              Made with <Heart size={14} className="text-red-500 animate-pulse" /> in Morocco
            </span>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
