import { motion } from "framer-motion";
import { Calendar, GraduationCap, Award, Download, Briefcase } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

const Resume = () => {
  const [education, setEducation] = useState<any[]>([]);
  const [certifications, setCertifications] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    api.get("/education").then(res => setEducation(res.data)).catch(console.error);
    api.get("/certifications").then(res => setCertifications(res.data)).catch(console.error);
    api.get("/profile").then(res => setProfile(res.data)).catch(console.error);
  }, []);

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
          {education.length > 0 && (
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
                        {item.title}
                      </h4>
                      <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                        <Calendar size={14} />
                        {item.date}
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
          )}

          {certifications.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-green-100 text-green-600 rounded-lg dark:bg-green-900 dark:text-green-400">
                  <Award size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Certifications
                </h3>
              </div>

              <div className="space-y-8">
                {certifications.map((item) => (
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
                        {item.title}
                      </h4>
                      <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                        <Calendar size={14} />
                        {item.year}
                      </span>
                    </div>
                    <p className="text-green-600 dark:text-green-400 font-medium mb-2">
                      {item.issuer}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          {profile?.resumeUrl && (
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-all duration-300"
            >
              <Download size={20} />
              Download Resume
            </a>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Resume;
