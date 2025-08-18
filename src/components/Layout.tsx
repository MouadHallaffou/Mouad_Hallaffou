
import { ReactNode, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";
import CustomCursor from "./CustomCursor";
import LoadingScreen from "./LoadingScreen";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <CustomCursor />
      
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen isLoading={isLoading} />}
      </AnimatePresence>
      
      <Header />
      
      <AnimatePresence mode="wait">
        {!isLoading && (
          <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex-1 pt-16"
          >
            {children}
          </motion.main>
        )}
      </AnimatePresence>
      
      <Footer />
    </div>
  );
};

export default Layout;
