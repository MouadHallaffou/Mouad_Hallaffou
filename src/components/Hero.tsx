import { motion, useAnimation } from "framer-motion";
import { ArrowDown, Terminal } from "lucide-react";
import { useEffect, useState } from "react";

const Hero = () => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const fullText = "Hello, I'm Mouad Hallaffou";
  
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

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center section-padding bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-portfolio-dark relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          {Array.from({ length: 20 }).map((_, index) => (
            <div 
              key={index} 
              className="text-xs md:text-sm text-gray-400 font-mono"
              style={{ 
                position: 'absolute', 
                top: `${Math.random() * 100}%`, 
                left: `${Math.random() * 100}%`,
                transform: 'rotate(90deg)'
              }}
            >
              {'{'}
              {Array.from({ length: Math.floor(Math.random() * 20) + 1 }).map(() => '{')}
              {'}'}
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:w-1/2"
          >
            <div className="mb-6 p-4 bg-gray-900 rounded-lg border border-gray-700 w-full max-w-xl">
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <div className="text-xs text-gray-400 ml-2 font-mono">terminal</div>
              </div>
              <div className="font-mono text-sm md:text-base">
                <div className="flex">
                  <span className="text-green-500 mr-2">$</span>
                  <span className="text-white">{text}</span>
                  <span className={`w-2 h-4 bg-white ${isTyping ? 'animate-pulse' : 'animate-ping'}`}></span>
                </div>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-900 dark:text-white">
              <span className="text-green-600">Full Stack</span> <br />
              Web Developer
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg max-w-xl">
              I build responsive and scalable web applications using modern
              technologies. Passionate about creating efficient and user-friendly
              digital experiences.
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.a
                href="#contact"
                className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-600 transition-all-300 flex items-center group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Terminal size={18} className="mr-2 group-hover:animate-pulse" />
                Get in Touch
              </motion.a>
              <motion.a
                href="#projects"
                className="px-6 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-white rounded-lg font-medium hover:border-green-700 hover:text-green-700 dark:hover:border-green-700 dark:hover:text-green-600 transition-all-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View My Work
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:w-1/2 flex justify-center"
          >
            <div className="w-full max-w-md h-[400px] bg-gradient-to-br from-orange-400 to-green-500 rounded-2xl shadow-xl flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-1 bg-white dark:bg-portfolio-dark rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gray-200 dark:bg-gray-800 rounded-full mx-auto mb-4 flex items-center justify-center relative overflow-hidden group">
                    <motion.div
                      className="absolute inset-0 bg-green-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 3 }}
                    />
                    <img 
                      src="/../public/me.jpg" 
                      alt="Profil" 
                      className="w-full h-full object-cover rounded-full z-10" 
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Full Stack Developer</h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">Laravel | React</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-2">Scroll Down</p>
          <ArrowDown className="text-gray-600 dark:text-gray-400 animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;