
import { motion } from "framer-motion";
import { Send, MapPin, Mail, Phone } from "lucide-react";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
      
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus(null), 3000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <MapPin className="text-green-500" />,
      title: "Location",
      details: "Casablanca, Morocco"
    },
    {
      icon: <Mail className="text-green-500" />,
      title: "Email",
      details: "mouadhallaffou@gmail.com"
    },
    {
      icon: <Phone className="text-green-500" />,
      title: "Phone",
      details: "+212 6 78 63 42 85"
    }
  ];

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.5 }
    })
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Get In Touch
          </h2>
          <div className="w-20 h-1 bg-green-500 mx-auto mb-6"></div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Feel free to contact me for any work or suggestions. I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Contact Information</h3>
            
            {contactInfo.map((info, index) => (
              <motion.div 
                key={index}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={itemVariants}
                className="flex items-start gap-4 p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg border border-green-100 dark:border-green-800"
              >
                <div className="p-3 bg-white dark:bg-gray-700 rounded-full shadow-md">
                  {info.icon}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white">{info.title}</h4>
                  <p className="text-gray-600 dark:text-gray-300">{info.details}</p>
                </div>
              </motion.div>
            ))}
            
{/*             <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex gap-4 mt-6 justify-center lg:justify-start"
            >
              <a href="https://github.com/MouadHallaffou" target="_blank" rel="noopener noreferrer" className="p-3 bg-white dark:bg-gray-700 rounded-full shadow-md text-green-500 hover:bg-green-500 hover:text-white transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              </a>
              <a href="https://linkedin.com/in/hallaffou-mouad" target="_blank" rel="noopener noreferrer" className="p-3 bg-white dark:bg-gray-700 rounded-full shadow-md text-green-500 hover:bg-green-500 hover:text-white transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="mailto:mouadhallaffou@gmail.com" className="p-3 bg-white dark:bg-gray-700 rounded-full shadow-md text-green-500 hover:bg-green-500 hover:text-white transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </a>
            </motion.div> */}
          </div>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={formVariants}
            className="space-y-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl p-8 rounded-xl border border-green-100 dark:border-green-800 shadow-xl"
          >
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="console.log('Your Name')"
                className="w-full px-4 py-3 bg-white/80 dark:bg-gray-700/80 border border-green-200 dark:border-green-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 font-mono"
                required
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="const email = 'your@email.com'"
                className="w-full px-4 py-3 bg-white/80 dark:bg-gray-700/80 border border-green-200 dark:border-green-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 font-mono"
                required
              />
            </div>
            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="/** Your Message */"
                rows={4}
                className="w-full px-4 py-3 bg-white/80 dark:bg-gray-700/80 border border-green-200 dark:border-green-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 font-mono"
                required
              ></textarea>
            </div>
            <motion.button
              type="submit"
              className={`w-full flex items-center justify-center gap-2 px-6 py-3 ${isSubmitting ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'} text-white rounded-lg transition-colors font-medium`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : <>
                <Send size={18} />
                Send Message
              </>}
            </motion.button>
            
            {submitStatus === "success" && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-green-600 dark:text-green-400 text-center font-medium"
              >
                Message sent successfully! I'll get back to you soon.
              </motion.div>
            )}
            
            {submitStatus === "error" && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-600 dark:text-red-400 text-center font-medium"
              >
                Something went wrong. Please try again later.
              </motion.div>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
