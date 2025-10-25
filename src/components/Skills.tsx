
import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Code, Database, GitBranch, Figma, Server, Palette, Users,
  LayoutGrid, Command, FileCode, BrainCircuit, Globe, Cloud,
  Brush, Zap, Shield, Cpu, Smartphone, Monitor, Layers, Sparkles
} from "lucide-react";
import { useSkills } from "../hooks/useApi";

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Fetch skills from API
  const { data: skills, loading: skillsLoading } = useSkills();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Get unique categories from API data
  const categories = skills ? [...new Set(skills.map(skill => skill.category))] : [];
  
  // Group skills by category
  const skillCategories = categories.map((category, index) => {
    const categorySkills = skills?.filter(skill => skill.category === category) || [];
    
    return {
      id: index,
      title: category,
      icon: getCategoryIcon(category),
      description: getCategoryDescription(category),
      skills: categorySkills.map(skill => ({
        name: skill.name,
        level: skill.level,
        icon: getSkillIcon(skill.icon),
        color: skill.color
      }))
    };
  });

  // Helper functions
  function getCategoryIcon(category: string) {
    switch (category) {
      case "Frontend Development": return <Code size={24} />;
      case "Backend Development": return <Server size={24} />;
      case "DevOps & Tools": return <Cloud size={24} />;
      case "Design & UX": return <Brush size={24} />;
      case "Mobile Development": return <Smartphone size={24} />;
      default: return <Code size={24} />;
    }
  }

  function getCategoryDescription(category: string) {
    switch (category) {
      case "Frontend Development": return "Modern web technologies and frameworks";
      case "Backend Development": return "Server-side technologies and databases";
      case "DevOps & Tools": return "Development tools and deployment";
      case "Design & UX": return "User experience and design tools";
      case "Mobile Development": return "Mobile app development technologies";
      default: return "Technical skills and expertise";
    }
  }

  function getSkillIcon(iconName: string) {
    const iconMap: { [key: string]: React.ReactNode } = {
      'Code': <Code size={20} />,
      'Command': <Command size={20} />,
      'FileCode': <FileCode size={20} />,
      'LayoutGrid': <LayoutGrid size={20} />,
      'Palette': <Palette size={20} />,
      'Layers': <Layers size={20} />,
      'Zap': <Zap size={20} />,
      'Server': <Server size={20} />,
      'Database': <Database size={20} />,
      'Globe': <Globe size={20} />,
      'BrainCircuit': <BrainCircuit size={20} />,
      'GitBranch': <GitBranch size={20} />,
      'Cloud': <Cloud size={20} />,
      'Cpu': <Cpu size={20} />,
      'Figma': <Figma size={20} />,
      'Brush': <Brush size={20} />,
      'Smartphone': <Smartphone size={20} />,
      'Users': <Users size={20} />,
      'Monitor': <Monitor size={20} />
    };
    return iconMap[iconName] || <Code size={20} />;
  }

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
          {skillsLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
              <p className="text-gray-600 dark:text-gray-300 mt-4">Loading skills...</p>
            </div>
          ) : skillCategories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-300">No skills available at the moment.</p>
            </div>
          ) : (
            <>
              {/* Category Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center mb-12"
              >
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {skillCategories[activeCategory]?.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  {skillCategories[activeCategory]?.description}
                </p>
              </motion.div>

              {/* Skills Grid */}
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {skillCategories[activeCategory]?.skills.map((skill, index) => (
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
            </>
          )}
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
