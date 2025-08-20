
import React from "react";
import { motion } from "framer-motion";
import { Code, Database, GitBranch, Figma, Server, Palette, Users, LayoutGrid, Command, FileCode, BrainCircuit, Globe, Cloud, Brush } from "lucide-react";

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend Development",
      icon: <Code size={40} />,
      bgColor: "from-green-400/20 to-green-500/20",
      skills: [
        { name: "React", icon: <Command size={24} /> },
        { name: "TypeScript", icon: <FileCode size={24} /> },
        { name: "Vue.js", icon: <LayoutGrid size={24} /> },
        { name: "TailwindCSS", icon: <Palette size={24} /> }
      ],
    },
    {
      title: "Backend Development",
      icon: <Server size={40} />,
      bgColor: "from-green-500/20 to-green-600/20",
      skills: [
        { name: "PHP/Laravel", icon: <FileCode size={24} /> },
        { name: "Node.js", icon: <Server size={24} /> },
        { name: "MySQL", icon: <Database size={24} /> },
        { name: "PostgreSQL", icon: <Database size={24} /> }
      ],
    },
    {
      title: "DevOps & Tools",
      icon: <Cloud size={40} />,
      bgColor: "from-green-700/20 to-green-800/20",
      skills: [
        { name: "Git", icon: <GitBranch size={24} /> },
        { name: "Docker", icon: <Cloud size={24} /> },
        { name: "CI/CD", icon: <Globe size={24} /> },
      ],
    },
    {
      title: "UI/UX Design",
      icon: <Brush size={40} />,
      bgColor: "from-green-400/20 to-green-500/20",
      skills: [
        { name: "Figma", icon: <Figma size={24} /> },
        { name: "Adobe XD", icon: <Brush size={24} /> },
      ],
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <section id="skills" className="py-20 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            My Skills
          </h2>
          <div className="w-20 h-1 bg-green-500 mx-auto mb-6"></div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              variants={item}
              whileHover={{ 
                scale: 1.05,
                transition: { type: "spring", stiffness: 400 }
              }}
              className={`bg-gradient-to-br ${category.bgColor} backdrop-blur-xl p-6 rounded-xl shadow-xl border border-green-100 dark:border-green-800`}
            >
              <div className="flex flex-col items-center">
                <motion.div 
                  className="text-green-600 dark:text-green-400 mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {category.icon}
                </motion.div>
                <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
                  {category.title}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {category.skills.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      whileHover={{ 
                        scale: 1.1,
                        transition: { type: "spring", stiffness: 400 }
                      }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-2 px-3 py-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm text-gray-700 dark:text-gray-300 rounded-lg hover:bg-green-500 hover:text-white transition-all duration-300"
                    >
                      <span className="text-green-500 group-hover:text-white transition-colors">
                        {skill.icon}
                      </span>
                      <span className="text-sm font-medium">{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
