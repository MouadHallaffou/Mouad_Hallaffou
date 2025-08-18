
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  ExternalLink, Github, Star, Calendar, Eye, Code, 
  Database, Palette, Globe, Smartphone, Sparkles, Mail
} from "lucide-react";
import { useState, useRef } from "react";

const Projects = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const projects = [
    {
      id: 1,
      title: "Youdemy Platform",
      description: "Plateforme d'apprentissage en ligne interactive, garantissant une expérience utilisateur fluide pour étudiants et enseignants.",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=500&h=300&fit=crop",
      github: "https://github.com/MouadHallaffou/Youdemy_plateform",
      demo: "https://github.com/MouadHallaffou/Youdemy_plateform",
      category: "Education",
      featured: true,
      technologies: ["HTML", "PHP", "MySQL", "Tailwind CSS", "SASS", "JavaScript"]
    },
    {
      id: 2,
      title: "Dev.to Blogging Platform",
      description: "Système de gestion de contenu et interface utilisateur pour la création et la découverte d'articles techniques.",
      image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500&h=300&fit=crop",
      github: "https://github.com/MouadHallaffou/Dev.to_Blogging_Plateform",
      demo: "https://github.com/MouadHallaffou/Dev.to_Blogging_Plateform",
      category: "Blog",
      featured: true,
      technologies: ["HTML", "PHP", "Tailwind CSS", "SASS", "MySQL", "JavaScript"]
    },
    {
      id: 3,
      title: "Resume Builder - StrucoCV",
      description: "Générateur de CV interactif permettant la personnalisation et le téléchargement via une interface intuitive.",
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=500&h=300&fit=crop",
      github: "https://mouadhallaffou.github.io/Resume_Builder_StruoCV/",
      demo: "https://mouadhallaffou.github.io/Resume_Builder_StruoCV/",
      category: "Productivity",
      featured: false,
      technologies: ["HTML", "Tailwind CSS", "JavaScript"]
    },
    {
      id: 4,
      title: "FUT Champions Web App - Ultimate Team",
      description: "Application permettant de créer et gérer des équipes FUT respectant les formations tactiques.",
      image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=500&h=300&fit=crop",
      github: "https://github.com/MouadHallaffou/FUT-Champions-Web-App-Ultimate-Team",
      demo: "https://github.com/MouadHallaffou/FUT-Champions-Web-App-Ultimate-Team",
      category: "Gaming",
      featured: false,
      technologies: ["HTML", "CSS", "JavaScript"]
    },
    {
      id: 5,
      title: "Scrumboard",
      description: "Développement d'un gestionnaire de tâches basé sur Scrum, facilitant la collaboration au sein des équipes de projet.",
      image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=500&h=300&fit=crop",
      github: "https://mouadhallaffou.github.io/YoucodeScrum-Board/",
      demo: "https://mouadhallaffou.github.io/YoucodeScrum-Board/",
      category: "Productivity",
      featured: false,
      technologies: ["HTML", "JavaScript", "CSS", "Bootstrap"]
    }
  ];

  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Full Stack":
        return <Code size={16} />;
      case "Frontend":
        return <Palette size={16} />;
      case "Backend":
        return <Database size={16} />;
      case "Mobile":
        return <Smartphone size={16} />;
      case "Education":
        return <Sparkles size={16} />;
      case "Blog":
        return <Mail size={16} />;
      case "Productivity":
        return <Code size={16} />;
      case "Gaming":
        return <Globe size={16} />;
      default:
        return <Globe size={16} />;
    }
  };

  return (
    <section 
      ref={containerRef}
      id="projects" 
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
            My Work
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Featured
            <span className="gradient-text"> Projects</span>
          </h2>
          
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto mb-8"></div>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A collection of my best work showcasing my skills in full-stack development,
            modern web technologies, and user experience design.
          </p>
        </motion.div>

        {/* Featured Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-2 mb-8">
            <Star className="text-yellow-500" size={24} />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Featured Projects</h3>
          </div>
          
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={item}
                className="group"
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <motion.div
                  className="relative h-64 overflow-hidden rounded-xl bg-gray-200 dark:bg-gray-700"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: hoveredId === project.id ? 1 : 0,
                    }}
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end"
                  >
                    <div className="p-6 w-full">
                      <div className="flex gap-3 justify-center">
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-gray-800 transition-all-300"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                          title="View Code"
                        >
                          <Github size={20} />
                        </motion.a>
                        <motion.a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-green-500 transition-all-300"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                          title="Live Demo"
                        >
                          <ExternalLink size={20} />
                        </motion.a>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <div className="flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                      {getCategoryIcon(project.category)}
                      {project.category}
                    </div>
                  </div>
                </motion.div>
                
                <div className="mt-4 space-y-3">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-green-500 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 rounded text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-gray-500/10 border border-gray-500/20 text-gray-600 dark:text-gray-400 rounded text-xs font-medium">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Other Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2 mb-8">
            <Eye className="text-blue-500" size={24} />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">More Projects</h3>
          </div>
          
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {otherProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={item}
                className="group"
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <motion.div
                  className="relative h-48 overflow-hidden rounded-xl bg-gray-200 dark:bg-gray-700"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: hoveredId === project.id ? 1 : 0,
                    }}
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end"
                  >
                    <div className="p-4 w-full">
                      <div className="flex gap-2 justify-center">
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-gray-800 transition-all-300"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                          title="View Code"
                        >
                          <Github size={16} />
                        </motion.a>
                        <motion.a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-green-500 transition-all-300"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                          title="Live Demo"
                        >
                          <ExternalLink size={16} />
                        </motion.a>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <div className="flex items-center gap-1 px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                      {getCategoryIcon(project.category)}
                      {project.category}
                    </div>
                  </div>
                </motion.div>
                
                <div className="mt-3 space-y-2">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-green-500 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 2).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 rounded text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 2 && (
                      <span className="px-2 py-1 bg-gray-500/10 border border-gray-500/20 text-gray-600 dark:text-gray-400 rounded text-xs font-medium">
                        +{project.technologies.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="card-modern p-8 max-w-2xl mx-auto group hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Interested in working together?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              I'm always open to discussing new opportunities and exciting projects.
              Let's create something amazing together!
            </p>
            <motion.a
              href="#contact"
              className="btn-primary inline-flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail size={18} />
              Get In Touch
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Projects;
