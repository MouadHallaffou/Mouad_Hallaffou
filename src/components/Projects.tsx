
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

import {
  ExternalLink,
  Github,
  Calculator,
  Book,
  MessageSquare,
  KanbanSquare,
  Award,
  CloudSun,
  Users,
  Briefcase,
  FileText,
  Code
} from "lucide-react";


const Projects = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const projects = [
    {
      id: 1,
      title: "EasyPrint",
      description: "Bookstore platform for managing and selling books",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=800&q=80",
      icon: <Book size={40} />,
      technologies: ["Javascript", "Laravel", "MySQL", "Tailwind"],
      github: "https://github.com/MoudHallaffou",
    },
    {
      id: 2,
      title: "eLearning Platform",
      description: "Mentorship & collaborative learning platform",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
      icon: <Users size={40} />,
      technologies: ["React", "Laravel", "REST API"],
      github: "https://github.com/MoudHallaffou",
    },
    {
      id: 3,
      title: "HR Management System",
      description: "System to manage employees and departments",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
      icon: <Briefcase size={40} />,
      technologies: ["Laravel", "Javascript", "PostgreSQL"],
      github: "https://github.com/MoudHallaffou",
    },
    {
      id: 4,
      title: "The Weekly",
      description: "Platform for announcements and comments",
      image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80",
      icon: <FileText size={40} />,
      technologies: ["Laravel", "MySQL", "Tailwind"],
      github: "https://github.com/MoudHallaffou",
    },
    {
      id: 5,
      title: "StruoCV",
      description: "Interactive CV builder with download features",
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80",
      icon: <Code size={40} />,
      technologies: ["Javascript", "Laravel", "Mysql"],
      github: "https://github.com/MoudHallaffou",
    },
    {
      id: 1,
      title: "Calculator App",
      description: "A modern calculator application",
      image: "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?auto=format&fit=crop&w=800&q=80",
      icon: <Calculator size={40} />,
      technologies: ["Javascript" , "Tailwind"],
      github: "https://github.com/MoudHallaffou",
    },
    {
      id: 2,
      title: "Youdemy Platform",
      description: "E-learning platform with courses management",
      image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=800&q=80",
      icon: <Book size={40} />,
      technologies: ["PHP", "Javascript", "MySQL", "Tailwind"],
      github: "https://github.com/MoudHallaffou",
    },
    {
      id: 3,
      title: "Dev.to Blog",
      description: "Technical blogging platform",
      image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80",
      icon: <MessageSquare size={40} />,
      technologies: ["PHP", "Bootstrap", "MySQL"],
      github: "https://github.com/MoudHallaffou",
    },
    {
      id: 4,
      title: "ScrumBoard",
      description: "Agile project management tool",
      image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&w=800&q=80",
      icon: <KanbanSquare size={40} />,
      technologies: ["Javascript", "Bootstrap", "HTML"],
      github: "https://github.com/MoudHallaffou",
    },
    {
      id: 5,
      title: "FUT Champions",
      description: "Football statistics and management",
      image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80",
      icon: <Award size={40} />,
      technologies: ["Javascript", "CSS", "HTML"],
      github: "https://github.com/MoudHallaffou",
    },
    {
      id: 6,
      title: "Weather App",
      description: "Real-time weather information",
      image: "https://images.unsplash.com/photo-1601134467661-3d775b999c8b?auto=format&fit=crop&w=800&q=80",
      icon: <CloudSun size={40} />,
      technologies: ["Javascript", "Tailwind", "Weather API"],
      github: "https://github.com/MoudHallaffou",
    }
  ];

  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-green-500 mx-auto mb-6"></div>
        </motion.div>

        <div className="mx-auto max-w-6xl">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {projects.map((project) => (
                <CarouselItem key={project.id} className="md:basis-1/3">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{
                      scale: 1.05,
                      transition: {
                        type: "spring",
                        stiffness: 300
                      }
                    }}
                    viewport={{ once: true }}
                    className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg group h-full"
                    onMouseEnter={() => setHoveredId(project.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <motion.div
                      className="relative h-48 overflow-hidden"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: hoveredId === project.id ? 1 : 0,
                          backdropFilter: hoveredId === project.id ? "blur(3px)" : "blur(0px)"
                        }}
                        className="absolute inset-0 bg-green-500/90 flex items-center justify-center gap-4"
                      >
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-white text-green-500 rounded-full hover:bg-green-50 transition-colors"
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Github size={20} />
                        </motion.a>
                        <motion.a
                          href="#"
                          className="p-2 bg-white text-green-500 rounded-full hover:bg-green-50 transition-colors"
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <ExternalLink size={20} />
                        </motion.a>
                      </motion.div>
                    </motion.div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                          className="text-green-500"
                        >
                          {project.icon}
                        </motion.div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {project.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {project.description}
                      </p>
                      <motion.div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <motion.span
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="px-3 py-1 bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 rounded-full text-xs hover:bg-green-200 dark:hover:bg-green-700 transition-colors"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </motion.div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Projects;
