import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Terminal, Download, Github, Linkedin, Mail, Sparkles, ExternalLink } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const Hero = () => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const fullText = "Hello, I'm Mouad Hallaffou";
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  useEffect(() => {
    if (isTyping && currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100);
      
      return () => clearTimeout(timeout);
    } else if (currentIndex >= fullText.length) {
      setIsTyping(false);
    }
  }, [currentIndex, isTyping, fullText]);

  const socialLinks = [
    {
      icon: <Github size={20} />,
      href: "https://github.com/MouadHallaffou",
      label: "GitHub",
      color: "hover:bg-gray-800 hover:text-white"
    },
    {
      icon: <Linkedin size={20} />,
      href: "https://linkedin.com/in/hallaffou-mouad",
      label: "LinkedIn",
      color: "hover:bg-blue-600 hover:text-white"
    },
    {
      icon: <Mail size={20} />,
      href: "mailto:mouadhallaffou@gmail.com",
      label: "Email",
      color: "hover:bg-green-600 hover:text-white"
    }
  ];

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
    >
      {/* Animated background */}
      <motion.div 
        className="absolute inset-0 tech-pattern opacity-20"
        animate={{ 
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          repeatType: "reverse" 
        }}
      />
      
      <motion.div 
        className="absolute inset-0 tech-grid opacity-10"
        animate={{ 
          backgroundPosition: ["0% 0%", "50px 50px"],
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity, 
          repeatType: "reverse" 
        }}
      />
      
      {/* Floating code elements */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 15 }).map((_, index) => (
          <motion.div 
              key={index} 
            className="absolute text-xs md:text-sm text-green-400/30 font-mono"
              style={{ 
                top: `${Math.random() * 100}%`, 
                left: `${Math.random() * 100}%`,
                transform: 'rotate(90deg)'
              }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.6, 0.3],
              rotate: [90, 270, 90],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          >
            {index % 4 === 0 ? '{' : index % 4 === 1 ? '}' : index % 4 === 2 ? ';' : '//'}
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <motion.div 
        className="container mx-auto px-4 z-10"
        style={{ y, opacity }}
      >
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="lg:w-1/2 space-y-6"
          >


            {/* Terminal-style greeting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="card-modern p-4 max-w-lg"
            >
              <div className="flex items-center mb-2">
                <div className="flex gap-1.5 mr-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                </div>
                <span className="text-xs text-gray-400 font-mono">terminal</span>
              </div>
              <div className="font-mono text-xs md:text-sm">
                <div className="flex items-center">
                  <span className="text-green-400 mr-2">$</span>
                  <span className="text-white">{text}</span>
                  <motion.span 
                    className={`w-1.5 h-3 bg-green-400 ml-1 ${isTyping ? 'animate-pulse' : ''}`}
                    animate={{ opacity: isTyping ? [1, 0, 1] : 1 }}
                    transition={{ duration: 0.8, repeat: isTyping ? Infinity : 0 }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Main heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="space-y-4"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                <motion.span 
                  className="gradient-text"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  Full Stack
                </motion.span>
                <br />
                <motion.span 
                  className="text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  Developer
                </motion.span>
            </h1>
              <motion.p 
                className="text-lg md:text-xl text-gray-300 max-w-lg leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                Crafting digital experiences with modern technologies and clean code.
                Passionate about building scalable, user-friendly applications.
              </motion.p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="flex flex-wrap gap-4"
            >
              <motion.a
                href="#contact"
                className="btn-primary flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Terminal size={18} />
                Hire Me
              </motion.a>
              <motion.a
                href="#projects"
                className="btn-secondary flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink size={18} />
                View Projects
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.6 }}
              className="flex gap-4"
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white transition-all-300 ${link.color}`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  title={link.label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.8 + index * 0.1 }}
                >
                  {link.icon}
              </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Profile Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="lg:w-1/2 flex justify-center"
          >
            <motion.div
              className="relative"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Glowing background */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-3xl blur-2xl opacity-20"
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.2, 0.3, 0.2]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              
              {/* Main card */}
              <div className="relative card-modern p-8 max-w-md">
                <div className="text-center space-y-6">
                  {/* Profile image */}
                  <motion.div
                    className="relative mx-auto"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-44 h-44 mx-auto relative">
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur-xl opacity-40"
                        animate={{ 
                          scale: [1, 1.2, 1],
                          opacity: [0.4, 0.6, 0.4],
                          rotate: [0, 180, 360]
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      />
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-lg opacity-30"
                        animate={{ 
                          scale: [1.1, 1, 1.1],
                          opacity: [0.3, 0.5, 0.3],
                          rotate: [360, 180, 0]
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                      />
                      <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-green-500/50 shadow-2xl">
                        <motion.img 
                      src="me.png" 
                          alt="Mouad Hallaffou" 
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                    />
                  </div>
                    </div>
                  </motion.div>

                  {/* Profile info */}
                  <motion.div 
                    className="space-y-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                  >
                    <motion.h3 
                      className="text-2xl font-bold text-white"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      Mouad Hallaffou
                    </motion.h3>
                    <motion.p 
                      className="text-green-400 font-semibold text-lg"
                      whileHover={{ color: "#10b981" }}
                      transition={{ duration: 0.3 }}
                    >
                      Full Stack Developer
                    </motion.p>
                    <motion.p 
                      className="text-gray-400 text-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 1.4 }}
                    >
                      MERN Stack | PHP/Laravel | TypeScript
                    </motion.p>
                  </motion.div>

                  {/* Tech stack badges */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.6 }}
                    className="space-y-3"
                  >
                    <motion.p 
                      className="text-xs text-gray-500 uppercase tracking-wider font-medium"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 1.8 }}
                    >
                      Tech Stack
                    </motion.p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {[
                        { name: 'MongoDB', color: 'from-green-500 to-emerald-600' },
                        { name: 'Express.js', color: 'from-gray-500 to-gray-700' },
                        { name: 'React', color: 'from-blue-500 to-cyan-600' },
                        { name: 'Node.js', color: 'from-green-600 to-green-800' },
                        { name: 'PHP', color: 'from-purple-500 to-indigo-600' },
                        { name: 'Laravel', color: 'from-red-500 to-pink-600' }
                      ].map((tech, index) => (
                        <motion.span
                          key={tech.name}
                          initial={{ opacity: 0, scale: 0.8, y: 20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ delay: 2 + index * 0.1, type: "spring", stiffness: 200 }}
                          whileHover={{ 
                            scale: 1.1, 
                            y: -5,
                            boxShadow: "0 10px 25px rgba(0,0,0,0.3)"
                          }}
                          className={`px-3 py-1.5 bg-gradient-to-r ${tech.color} text-white rounded-full text-xs font-semibold shadow-lg border border-white/20 backdrop-blur-sm`}
                        >
                          {tech.name}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Experience indicator */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 2.5 }}
                    className="pt-2"
                  >
                    <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                      <motion.div 
                        className="w-2 h-2 bg-green-400 rounded-full"
                        animate={{ 
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 1, 0.5]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span>Available for new opportunities</span>
                </div>
                  </motion.div>
              </div>
            </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2 }}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer"
          onClick={scrollToNext}
        >
          <p className="text-gray-400 mb-1 text-xs">Scroll Down</p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="text-green-400" size={20} />
          </motion.div>
        </motion.div>
        </motion.div>
    </section>
  );
};

export default Hero;