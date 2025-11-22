
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare, Mail, Phone, MapPin, Github, Linkedin,
  CheckCircle, Clock, User, Send, Sparkles
} from "lucide-react";
import { useState } from "react";
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../config/emailjs';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: "Email",
      details: "mouadhallaffou@gmail.com",
      description: "Send me an email anytime"
    },
    {
      icon: <Phone size={24} />,
      title: "Phone",
      details: "+212 6 78 63 42 85",
      description: "Available for calls"
    },
    {
      icon: <MapPin size={24} />,
      title: "Location",
      details: "Morocco",
      description: "Open to remote work worldwide"
    }
  ];

  const socialLinks = [
    {
      icon: <Github size={20} />,
      href: "https://github.com/MouadHallaffou",
      label: "GitHub",
      color: "hover:bg-gray-800 hover:text-white dark:hover:bg-gray-100 dark:hover:text-gray-900"
    },
    {
      icon: <Linkedin size={20} />,
      href: "https://linkedin.com/in/hallaffou-mouad",
      label: "LinkedIn",
      color: "hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white"
    },
    {
      icon: <Mail size={20} />,
      href: "mailto:mouadhallaffou@gmail.com",
      label: "Email",
      color: "hover:bg-green-600 hover:text-white dark:hover:bg-green-600 dark:hover:text-white"
    }
  ];


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Vérifier si les clés EmailJS sont configurées
      // console.log('EmailJS Config:', EMAILJS_CONFIG); // Debug temporaire
      // console.log('Environment check:', {
      //   serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
      //   templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      //   publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      // });

      if (EMAILJS_CONFIG.serviceId.includes('nixspnn') ||
        EMAILJS_CONFIG.serviceId === '' ||
        EMAILJS_CONFIG.templateId === '' ||
        EMAILJS_CONFIG.publicKey === '') {
        // console.log('Configuration manquante:', {
        //   serviceId: EMAILJS_CONFIG.serviceId,
        //   templateId: EMAILJS_CONFIG.templateId,
        //   publicKey: EMAILJS_CONFIG.publicKey
        // });
        throw new Error('EmailJS keys not configured. Please follow the setup guide.');
      } const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_name: 'Mouad Hallaffou',
      };

      const result = await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        templateParams,
        EMAILJS_CONFIG.publicKey
      );

      // console.log('Email sent successfully:', result);

      setStatus({
        type: "success",
        message: "Thank you! Your message has been sent successfully. I'll get back to you soon!"
      });
      setFormData({ name: "", email: "", subject: "", message: "" });

    } catch (error) {
      // console.error('Email sending failed:', error);

      let errorMessage = "Sorry, there was an error sending your message. Please try again or contact me directly.";

      if (error instanceof Error) {
        if (error.message.includes('EmailJS keys not configured')) {
          errorMessage = "Email service not configured yet. Please contact me directly at mouadhallaffou@gmail.com";
        } else if (error.message.includes('Invalid template ID')) {
          errorMessage = "Email template configuration error. Please contact me directly.";
        } else if (error.message.includes('Invalid service ID')) {
          errorMessage = "Email service configuration error. Please contact me directly.";
        }
      }

      setStatus({
        type: "error",
        message: errorMessage
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.1,
        duration: 0.6,
      },
    }),
  };

  return (
    <section
      id="contact"
      className="section-padding bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden"
    >
      {/* Background patterns */}
      <div className="absolute inset-0 tech-pattern opacity-5 dark:opacity-10"></div>
      <div className="absolute inset-0 tech-grid opacity-3 dark:opacity-5"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm font-medium mb-4"
          >
            <Sparkles size={16} />
            Get In Touch
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Let's Work
            <span className="gradient-text"> Together</span>
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto mb-8"></div>

          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            I'm always interested in new opportunities and exciting projects.
            Whether you have a question or just want to say hi, feel free to reach out!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    custom={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={itemVariants}
                    className="card-modern p-6 group hover:scale-105 transition-transform duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg text-white group-hover:scale-110 transition-transform duration-300">
                        {info.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{info.title}</h4>
                        <p className="text-green-600 dark:text-green-400 font-medium mb-1">{info.details}</p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{info.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Connect With Me */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Connect With Me</h3>
              <div className="flex gap-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-4 bg-gray-100/80 dark:bg-white/10 backdrop-blur-sm border border-gray-200/60 dark:border-white/20 rounded-full text-gray-900 dark:text-white transition-all-300 ${link.color}`}
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    whileTap={{ scale: 0.9 }}
                    title={link.label}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="card-modern p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send Me a Message</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-100/80 dark:bg-white/10 backdrop-blur-sm border border-gray-200/60 dark:border-white/20 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all-300"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-100/80 dark:bg-white/10 backdrop-blur-sm border border-gray-200/60 dark:border-white/20 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all-300"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-100/80 dark:bg-white/10 backdrop-blur-sm border border-gray-200/60 dark:border-white/20 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all-300"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-gray-100/80 dark:bg-white/10 backdrop-blur-sm border border-gray-200/60 dark:border-white/20 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all-300 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>

              {/* Status Messages */}
              <AnimatePresence>
                {status.type && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`mt-4 p-4 rounded-lg flex items-center gap-3 ${status.type === "success"
                      ? "bg-green-500/20 border border-green-500/30 text-green-400"
                      : "bg-red-500/20 border border-red-500/30 text-red-400"
                      }`}
                  >
                    {status.type === "success" ? (
                      <CheckCircle size={20} />
                    ) : (
                      <Clock size={20} />
                    )}
                    <span className="text-sm">{status.message}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="card-modern p-8 max-w-2xl mx-auto group hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Let's Build Something Amazing
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              I'm passionate about creating innovative solutions and bringing ideas to life.
              Whether you need a full-stack application, a modern website, or technical consultation,
              I'm here to help you achieve your goals.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
