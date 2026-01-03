
import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Code, Database, GitBranch, Figma, Server, Palette, Users,
  LayoutGrid, Command, FileCode, BrainCircuit, Globe, Cloud,
  Brush, Zap, Shield, Cpu, Smartphone, Monitor, Layers, Sparkles
} from "lucide-react";

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const skillCategories = [
    {
      id: 0,
      title: "Frontend Development",
      icon: <Code size={24} />,
      description: "Modern web technologies and frameworks",
      skills: [
        { name: "React", level: 90, icon: <Command size={20} />, color: "from-blue-500 to-cyan-500" },
        { name: "TypeScript", level: 85, icon: <FileCode size={20} />, color: "from-blue-600 to-blue-700" },
        { name: "Vue.js", level: 75, icon: <LayoutGrid size={20} />, color: "from-green-500 to-emerald-500" },
        { name: "TailwindCSS", level: 95, icon: <Palette size={20} />, color: "from-cyan-500 to-blue-500" },
        { name: "HTML/CSS", level: 95, icon: <Layers size={20} />, color: "from-orange-500 to-red-500" },
        { name: "JavaScript", level: 90, icon: <Zap size={20} />, color: "from-yellow-500 to-orange-500" }
      ],
    },
    {
      id: 1,
      title: "Backend Development",
      icon: <Server size={24} />,
      description: "Server-side technologies and databases",
      skills: [
        { name: "PHP/Laravel", level: 88, icon: <FileCode size={20} />, color: "from-red-500 to-pink-500" },
        { name: "Node.js", level: 75, icon: <Server size={20} />, color: "from-green-600 to-green-700" },
        { name: "MySQL", level: 85, icon: <Database size={20} />, color: "from-blue-500 to-blue-600" },
        { name: "PostgreSQL", level: 70, icon: <Database size={20} />, color: "from-blue-600 to-blue-800" },
        { name: "REST APIs", level: 90, icon: <Globe size={20} />, color: "from-purple-500 to-pink-500" },
        { name: "GraphQL", level: 65, icon: <BrainCircuit size={20} />, color: "from-pink-500 to-purple-500" }
      ],
    },
    {
      id: 2,
      title: "DevOps & Tools",
      icon: <Cloud size={24} />,
      description: "Development tools and deployment",
      skills: [
        { name: "Git", level: 90, icon: <GitBranch size={20} />, color: "from-orange-500 to-red-500" },
        { name: "Docker", level: 70, icon: <Cloud size={20} />, color: "from-blue-500 to-blue-600" },
        { name: "CI/CD", level: 75, icon: <Zap size={20} />, color: "from-green-500 to-emerald-500" },
        { name: "AWS", level: 60, icon: <Cloud size={20} />, color: "from-orange-500 to-yellow-500" },
        { name: "Linux", level: 80, icon: <Cpu size={20} />, color: "from-gray-600 to-gray-800" },
        { name: "Nginx", level: 70, icon: <Server size={20} />, color: "from-green-600 to-green-700" }
      ],
    },
    {
      id: 3,
      title: "Design & UX",
      icon: <Brush size={24} />,
      description: "User experience and design tools",
      skills: [
        { name: "Figma", level: 80, icon: <Figma size={20} />, color: "from-purple-500 to-pink-500" },
        { name: "Adobe XD", level: 70, icon: <Brush size={20} />, color: "from-pink-500 to-purple-500" },
        { name: "Responsive Design", level: 95, icon: <Smartphone size={20} />, color: "from-green-500 to-emerald-500" },
        { name: "UI/UX Principles", level: 85, icon: <Users size={20} />, color: "from-blue-500 to-cyan-500" },
        { name: "Prototyping", level: 75, icon: <Monitor size={20} />, color: "from-indigo-500 to-purple-500" },
        { name: "Design Systems", level: 70, icon: <Layers size={20} />, color: "from-gray-500 to-gray-700" }
      ],
    }
  ];

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
        type: "spring" as const,
        stiffness: 100
      }
    },
  };

  return (
    <section
      ref={containerRef}
      id="skills"
      className="section-padding bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden"
    >
      {/* Background patterns */}
      <motion.div
        className="absolute inset-0 tech-pattern opacity-10"
        style={{ y }}
      />
      <motion.div
        className="absolute inset-0 tech-grid opacity-5"
        style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
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
            Technical Skills
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            My
            <span className="gradient-text"> Expertise</span>
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto mb-8"></div>

          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A comprehensive skill set built through continuous learning and hands-on experience
            with modern web technologies and development practices.
          </p>
        </motion.div>

        {/* Category Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {skillCategories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(index)}
              className={`px-6 py-3 rounded-lg font-medium transition-all-300 flex items-center gap-2 ${activeCategory === index
                  ? 'bg-green-500 text-white shadow-lg scale-105'
                  : 'bg-gray-100/80 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-200/80 dark:hover:bg-white/20 border border-gray-200/50 dark:border-white/20'
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {category.icon}
              {category.title}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Display */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Category Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {skillCategories[activeCategory].title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              {skillCategories[activeCategory].description}
            </p>
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {skillCategories[activeCategory].skills.map((skill, index) => (
              <motion.div
                key={index}
                variants={item}
                className="card-modern p-6 group hover:scale-105 transition-transform duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <motion.div
                      className={`w-10 h-10 rounded-lg bg-gradient-to-r ${skill.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: 5 }}
                    >
                      {skill.icon}
                    </motion.div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{skill.name}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{skill.level}%</p>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2 overflow-hidden">
                  <motion.div
                    className={`h-2 rounded-full bg-gradient-to-r ${skill.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
                  />
                </div>

                {/* Skill Level Indicator */}
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>Beginner</span>
                  <span>Intermediate</span>
                  <span>Advanced</span>
                  <span>Expert</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="card-modern p-8 max-w-2xl mx-auto group hover:scale-105 transition-transform duration-300">
            <motion.div
              className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center mx-auto mb-6"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Zap size={24} className="text-white" />
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Always Learning & Growing
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              I'm constantly expanding my skill set and staying updated with the latest technologies.
              My passion for learning drives me to explore new frameworks, tools, and methodologies
              to deliver the best possible solutions.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Skills;
