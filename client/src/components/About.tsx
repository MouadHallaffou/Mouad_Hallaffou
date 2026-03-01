
import { motion, useScroll, useTransform } from "framer-motion";
import { BookOpen, Code, Briefcase, Users, Award, Clock, Zap, Heart, Sparkles } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { api } from "@/lib/api";

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    api.get("/profile").then(res => setProfile(res.data)).catch(console.error);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const cards = [
    {
      icon: <Code size={24} />,
      title: "Web Development",
      description: "Building responsive and scalable web applications using modern technologies and best practices.",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: <Briefcase size={24} />,
      title: "Professional Experience",
      description: "Training at YOUCODE Maroc, gaining hands-on experience with industry-standard tools and methodologies.",
      color: "from-blue-500 to-cyan-600"
    },
    {
      icon: <BookOpen size={24} />,
      title: "Continuous Learning",
      description: "Always exploring new technologies and best practices to stay ahead in the rapidly evolving tech landscape.",
      color: "from-purple-500 to-pink-600"
    },
    {
      icon: <Users size={24} />,
      title: "Team Collaboration",
      description: "Strong communication and collaboration skills, working effectively in diverse team environments.",
      color: "from-orange-500 to-red-600"
    },
  ];

  const defaultStats = [
    { icon: <Award size={20} />, label: "Projects Completed", value: "10+", color: "from-yellow-500 to-orange-500" },
    { icon: <Clock size={20} />, label: "Hours of Coding", value: "1000+", color: "from-blue-500 to-cyan-500" },
    { icon: <Zap size={20} />, label: "Technologies", value: "15+", color: "from-purple-500 to-pink-500" },
    { icon: <Heart size={20} />, label: "Passion Level", value: "100%", color: "from-red-500 to-pink-500" },
  ];

  const stats = profile?.stats?.length > 0
    ? profile.stats.map((s: any, i: number) => ({
      ...defaultStats[i % defaultStats.length],
      label: s.label,
      value: s.value
    }))
    : defaultStats;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    },
  };

  return (
    <section
      ref={containerRef}
      id="about"
      className="section-padding bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden"
    >
      {/* Background patterns */}
      <motion.div
        className="absolute inset-0 tech-dots opacity-5"
        style={{ y }}
      />

      <motion.div
        className="container mx-auto px-4 relative z-10"
        style={{ opacity }}
      >
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
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-600 dark:text-green-400 text-sm font-medium mb-4"
          >
            <Sparkles size={16} />
            About Me
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Crafting Digital
            <span className="gradient-text"> Experiences</span>
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto mb-8"></div>

          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed whitespace-pre-line">
            {profile?.shortBio || `I'm a passionate Full Stack Web Developer currently training at YOUCODE Maroc.
            With a background in Economics and Management, I bring analytical thinking and
            problem-solving skills to create efficient, user-friendly applications.`}
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={item}
              className="text-center p-6 card-modern group hover:scale-105 transition-transform duration-300"
            >
              <motion.div
                className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center text-white mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}
                whileHover={{ rotate: 5 }}
              >
                {stat.icon}
              </motion.div>
              <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {cards.map((card, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{
                scale: 1.05,
                transition: { type: "spring", stiffness: 400 }
              }}
              className="card-modern p-6 group"
            >
              <motion.div
                className={`w-12 h-12 rounded-lg bg-gradient-to-r ${card.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
                whileHover={{ rotate: 5 }}
              >
                {card.icon}
              </motion.div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                {card.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Detailed Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {/* Journey Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="card-modern p-8 group hover:scale-105 transition-transform duration-300"
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <BookOpen size={20} className="text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                My Journey
              </h3>
            </div>

            <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              <p>
                {profile?.longBio || `With a solid foundation in Economics and Management from FSJES Meknès,
                I've transitioned into the world of web development, combining analytical thinking
                with technical skills to create efficient, user-friendly applications.\n\nI'm dedicated to continuous learning and staying updated with the latest
                technologies and best practices in web development, always seeking to improve
                my craft and deliver exceptional results.`}
              </p>
            </div>
          </motion.div>

          {/* Personal Traits */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="card-modern p-8 group hover:scale-105 transition-transform duration-300"
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-600 flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Heart size={20} className="text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Personal Traits
              </h3>
            </div>

            <div className="space-y-4">
              {(profile?.personalTraits?.length ? profile.personalTraits : [
                "Problem solver with attention to detail",
                "Excellent communication and teamwork skills",
                "Time management and organization",
                "Adaptability and quick learning",
                "Passion for clean, maintainable code",
                "User-focused development approach"
              ]).map((trait: string, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 group/trait"
                >
                  <motion.div
                    className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                    whileHover={{ scale: 1.5 }}
                  />
                  <span className="text-gray-600 dark:text-gray-300 group-hover/trait:text-gray-900 dark:group-hover/trait:text-white transition-colors">
                    {trait}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
