
import { useEffect } from "react";
import Layout from "../components/Layout.tsx";
import Hero from "../components/Hero.tsx";
import About from "../components/About.tsx";
import Skills from "../components/Skills.tsx";
import Projects from "../components/Projects.tsx";
import Resume from "../components/Resume.tsx";
import Contact from "../components/Contact.tsx";

const Index = () => {
  // Scroll to section when hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    // Initial scroll if page loads with hash
    handleHashChange();

    // Add event listener for hash changes
    window.addEventListener("hashchange", handleHashChange);

    // Clean up event listener
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <Layout>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Resume />
      <Contact />
    </Layout>
  );
};

export default Index;
