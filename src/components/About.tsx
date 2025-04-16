
import { motion } from "framer-motion";
import { BookOpen, Code, Briefcase, Users } from "lucide-react";

const About = () => {
  const cards = [
    {
      icon: <Code size={24} />,
      title: "Web Development",
      description:
        "I build responsive and scalable web applications using modern technologies.",
    },
    {
      icon: <Briefcase size={24} />,
      title: "Professional Experience",
      description:
        "Training at YOUCODE Maroc, gaining hands-on experience with industry-standard tools and practices.",
    },
    {
      icon: <BookOpen size={24} />,
      title: "Continuous Learning",
      description:
        "Always exploring new technologies and best practices to improve my skills.",
    },
    {
      icon: <Users size={24} />,
      title: "Teamwork",
      description:
        "Strong communication and collaboration skills, working effectively in team environments.",
    },
  ];

  return (
    <section id="about" className="py-20 bg-white dark:bg-portfolio-dark">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            About Me
          </h2>
          <div className="w-20 h-1 bg-green-500 mx-auto mb-6"></div>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-lg">
            I'm a passionate Full Stack Web Developer currently training at YOUCODE Maroc.
            With a background in Economics and Management, I bring analytical thinking and
            problem-solving skills to my development work.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all-300"
            >
              <div className="text-green-500 mb-4">{card.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {card.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-md"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                My Journey
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                With a solid foundation in Economics and Management from FSJES Meknès,
                I've transitioned into the world of web development, combining analytical thinking
                with technical skills to create efficient, user-friendly applications.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                I'm dedicated to continuous learning and staying updated with the latest
                technologies and best practices in web development.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Personal Traits
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Problem solver with attention to detail
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Excellent communication and teamwork skills
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Time management and organization
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Adaptability and quick learning
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Passion for clean, maintainable code
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
