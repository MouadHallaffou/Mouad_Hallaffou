
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ExternalLink, Github, Star, Calendar, Eye, Code,
  Database, Palette, Globe, Smartphone, Sparkles, Mail,
  Briefcase, Book, Users, FileText, Calculator, MessageSquare,
  KanbanSquare, Award, CloudSun, ChevronLeft, ChevronRight
} from "lucide-react";
import { useState, useRef } from "react";
import { useProjects } from "../hooks/useApi";

const Projects = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Fetch projects from API
  const { data: allProjects, loading: projectsLoading } = useProjects();
  const { data: featuredProjects, loading: featuredLoading } = useProjects(true);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Use API data or fallback to empty arrays
  const projects = allProjects || [];
  const featuredProjectsData = featuredProjects || [];
  const otherProjects = projects.filter(project => !project.featured);

  // Carousel logic
  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(otherProjects.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getCurrentProjects = () => {
    const start = currentSlide * itemsPerSlide;
    const end = start + itemsPerSlide;
    return otherProjects.slice(start, end);
  };

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
        return <MessageSquare size={16} />;
      case "Productivity":
        return <Code size={16} />;
      case "Gaming":
        return <Award size={16} />;
      case "B2B Platform":
        return <Briefcase size={16} />;
      case "E-commerce":
        return <Globe size={16} />;
      case "Enterprise":
        return <Briefcase size={16} />;
      case "Communication":
        return <FileText size={16} />;
      case "Utility":
        return <Calculator size={16} />;
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

          {featuredLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
              <p className="text-gray-600 dark:text-gray-300 mt-4">Loading featured projects...</p>
            </div>
          ) : featuredProjectsData.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-300">No featured projects available at the moment.</p>
            </div>
          ) : (

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {featuredProjectsData.map((project, index) => (
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
                          className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-gray-800/80 dark:hover:bg-gray-700/80 transition-all duration-300"
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
                          className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-green-500/90 transition-all duration-300"
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
          )}
        </motion.div>

        {/* Other Projects - Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <Eye className="text-blue-500" size={24} />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">More Projects</h3>
            </div>

            {/* Carousel Navigation */}
            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                className={`p-2 rounded-full transition-colors ${totalSlides <= 1
                    ? 'bg-gray-100 dark:bg-gray-800 cursor-not-allowed opacity-50'
                    : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                disabled={totalSlides <= 1}
              >
                <ChevronLeft
                  size={20}
                  className={`${totalSlides <= 1
                      ? 'text-gray-400 dark:text-gray-600'
                      : 'text-gray-600 dark:text-gray-300'
                    }`}
                />
              </button>
              <button
                onClick={nextSlide}
                className={`p-2 rounded-full transition-colors ${totalSlides <= 1
                    ? 'bg-gray-100 dark:bg-gray-800 cursor-not-allowed opacity-50'
                    : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                disabled={totalSlides <= 1}
              >
                <ChevronRight
                  size={20}
                  className={`${totalSlides <= 1
                      ? 'text-gray-400 dark:text-gray-600'
                      : 'text-gray-600 dark:text-gray-300'
                    }`}
                />
              </button>
            </div>
          </div>

          {/* Carousel Container */}
          <div className="relative overflow-hidden">
            <motion.div
              className="flex transition-transform duration-500 ease-in-out"
              animate={{ x: `-${currentSlide * 100}%` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {otherProjects
                      .slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)
                      .map((project, index) => (
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
                                    className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-gray-800/80 dark:hover:bg-gray-700/80 transition-all duration-300"
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
                                    className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-green-500/90 transition-all duration-300"
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
                </div>
              ))}
            </motion.div>
          </div>

          {/* Carousel Indicators */}
          {totalSlides > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                    ? "bg-green-500 scale-110 shadow-lg shadow-green-500/30"
                    : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 hover:scale-105"
                    }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
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
