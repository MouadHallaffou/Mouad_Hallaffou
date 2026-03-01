
import { motion } from "framer-motion";
import { Calendar, GraduationCap, Award, Download, Link2 } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Resume = () => {
  const education = [
    {
      id: 1,
      degree: "Full-Stack Web Development",
      institution: "YOUCODE MAROC",
      duration: "2024 – present",
      description:
        "Intensive training in full-stack web development, focusing on modern technologies and industry best practices.",
    },
    {
      id: 2,
      degree: "Bachelor's Degree in Economics and Management",
      institution: "FSJES Meknès",
      duration: "2019 – 2022",
      description:
        "Focus on economic theory, business management, and analytical problem-solving, providing a strong foundation for understanding business logic and requirements.",
    },
  ];

  const certifications = [
    {
      id: 1,
      title: "Docker pour les développeurs",
      issuer: "LinkedIn Learning",
      date: "Mai 2025",
      skills: ["Docker", "Containers", "DevOps"],
      link: "https://www.linkedin.com/learning/certificates/26e15cd99cc6a309fb8475502c59dcecba1cb591c13656df57d84c7dd8712dcd?trk=share_certificate",
      description:
        "Certificate of Completion validating my ability to containerize applications and integrate Docker into modern development workflows.",
    },
    {
      id: 2,
      title: "L'essentiel de PostgreSQL",
      issuer: "LinkedIn Learning",
      date: "Février 2026",
      skills: ["PostgreSQL", "SQL", "Database Design"],
      link: "https://www.linkedin.com/learning/",
      description:
        "Core PostgreSQL concepts including schema design, queries, indexes and performance-oriented best practices.",
    },
    {
      id: 3,
      title: "From Relational Model (SQL) to MongoDB's Document Model",
      issuer: "MongoDB",
      date: "Février 2026",
      skills: ["MongoDB", "NoSQL", "Data Modeling"],
      link: "https://learn.mongodb.com/certificates",
      description:
        "Digital credential validating my knowledge of converting relational models to efficient document-oriented schemas in MongoDB.",
    },
    {
      id: 4,
      title: "L'essentiel de Symfony 7",
      issuer: "LinkedIn Learning",
      date: "Février 2026",
      skills: ["Symfony", "PHP", "Backend"],
      link: "https://www.linkedin.com/learning/certificates/874e7f1f09dde48dd6112d07ea391e9806cb9d57e1d708b7a0ddbaa54535ad9d?trk=share_certificate",
      description:
        "Comprehensive overview of Symfony 7 fundamentals, from routing and controllers to security and best practices.",
    },
    {
      id: 5,
      title: "Oracle Cloud Infrastructure 2025 Certified Foundations Associate",
      issuer: "Oracle",
      date: "Février 2026",
      skills: ["Cloud Computing", "OCI", "Cloud Foundations"],
      link: "https://catalog-education.oracle.com/",
      description:
        "Validates foundational knowledge of Oracle Cloud Infrastructure services, architecture and basic cloud concepts.",
    },
    {
      id: 6,
      title: "Oracle Certified Associate, Java SE 8 Programmer",
      issuer: "Oracle",
      date: "Février 2026",
      skills: ["Java", "OOP", "Core APIs"],
      link: "https://certview.oracle.com/",
      description:
        "Industry-recognized certification proving strong foundations in Java SE 8, object‑oriented programming and core APIs.",
    },
    {
      id: 7,
      title: "AWS Educate Introduction to Cloud 101",
      issuer: "Amazon Web Services",
      date: "Décembre 2025",
      skills: ["AWS Cloud", "Cloud Foundations"],
      link: "https://www.credly.com/",
      description:
        "Introduction to AWS cloud concepts, global infrastructure and core services for building modern applications.",
    },
    {
      id: 8,
      title: "AWS Educate Getting Started with Storage",
      issuer: "Amazon Web Services",
      date: "Janvier 2026",
      skills: ["AWS Storage", "S3", "Cloud Storage"],
      link: "https://www.credly.com/",
      description:
        "Hands-on course covering AWS storage services, with a focus on S3 and cloud-native data management patterns.",
    },
    {
      id: 9,
      title: "End-to-End MySQL: Schema to Subqueries",
      issuer: "Great Learning",
      date: "Janvier 2025",
      skills: ["MySQL", "SQL", "PDO"],
      link: "https://www.mygreatlearning.com/",
      description:
        "End-to-end journey through MySQL from schema design to advanced querying and subqueries in real-world scenarios.",
    },
    {
      id: 10,
      title: "JavaScript Projects",
      issuer: "Great Learning",
      date: "Janvier 2025",
      skills: ["JavaScript", "TypeScript", "ES6"],
      link: "https://www.mygreatlearning.com/",
      description:
        "Project-based certification validating my ability to build real applications with modern JavaScript, TypeScript and ES6 features.",
    },
  ];

  return (
    <section
      id="resume"
      className="py-20 bg-gray-50 dark:bg-gray-900"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Resume
          </h2>
          <div className="w-20 h-1 bg-green-500 mx-auto mb-6"></div>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-lg">
            My educational background and professional certifications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-green-100 text-green-600 rounded-lg dark:bg-green-900 dark:text-green-400">
                <GraduationCap size={24} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Education
              </h3>
            </div>

            <div className="space-y-8">
              {education.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border-l-4 border-green-500"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {item.degree}
                    </h4>
                    <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                      <Calendar size={14} />
                      {item.duration}
                    </span>
                  </div>
                  <p className="text-green-600 dark:text-green-400 font-medium mb-2">
                    {item.institution}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-green-100 text-green-600 rounded-lg dark:bg-green-900 dark:text-green-400">
                <Award size={24} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Certifications
              </h3>
            </div>

            <Carousel
              className="w-full"
              opts={{
                align: "start",
                loop: true,
              }}
            >
              <CarouselContent>
                {certifications.map((item) => (
                  <CarouselItem
                    key={item.id}
                    className="md:basis-1/2 lg:basis-1/2"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                      className="card-modern p-6 h-full flex flex-col justify-between border-l-4 border-green-500/70 hover:border-green-400 hover:-translate-y-1 transition-all-300"
                    >
                      <div>
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                              {item.title}
                            </h4>
                            <p className="text-green-600 dark:text-green-400 font-medium">
                              {item.issuer}
                            </p>
                          </div>
                          <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                            <Calendar size={14} />
                            {item.date}
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                          {item.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {item.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-2 py-1 text-xs rounded-full bg-green-500/10 border border-green-500/30 text-green-600 dark:text-green-400"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      {item.link && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-green-600 dark:text-green-400 hover:text-green-500 dark:hover:text-green-300 mt-2"
                        >
                          <Link2 size={14} />
                          View credential
                        </a>
                      )}
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="bg-white/80 dark:bg-gray-800/80 border-none shadow-md" />
              <CarouselNext className="bg-white/80 dark:bg-gray-800/80 border-none shadow-md" />
            </Carousel>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <a
            href="https://drive.google.com/file/d/1htaaMAXLRIk9Z9PTEDYDgCpW8QMIzIP5/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-all duration-300"
          >
            <Download size={20} />
            View Resume
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Resume;
