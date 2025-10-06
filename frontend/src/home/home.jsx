import { Link as ScrollLink } from "react-scroll";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Video from "../components/videoComponent";
import {
  ArrowRight,
  Pen,
  Share2,
  Users2,
  Layers,
  Cloud,
  Sparkles,
  Menu,
  X,
} from "lucide-react";
// import { ThemeToggle } from "./components/theme-toggle";
import HeroBackground from "../components/hero-background";
import '../../src/index.css'
import WhiteboardLanding from "./HeroPage";


function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollY, setScrollY] = useState(0);

  // Refs for sections
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  // Handle scroll to determine active section and scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrollY(scrollPosition);

      const viewPosition = scrollPosition + window.innerHeight / 3;

      if (
        heroRef.current &&
        viewPosition < heroRef.current.offsetTop + heroRef.current.offsetHeight
      ) {
        setActiveSection("hero");
      } else if (
        videoRef.current &&
        viewPosition <
          videoRef.current.offsetTop + videoRef.current.offsetHeight
      ) {
        setActiveSection("video");
      } else if (
        featuresRef.current &&
        viewPosition <
          featuresRef.current.offsetTop + featuresRef.current.offsetHeight
      ) {
        setActiveSection("features");
      } else if (ctaRef.current) {
        setActiveSection("cta");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Initial animation
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Check if we're on mobile
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

 const navItems = [
    { name: "Home", href: "home" },
    { name: "Demo", href: "video" },
    { name: "Features", href: "features" },
    { name: "About", href: "about" },
  ];

  return (
    <>
      <div className="min-h-screen bg-background overflow-hidden">
      {/* Enhanced Navbar Section */}
      <motion.header
        className="fixed top-0 w-full z-50 backdrop-blur-md"
        initial={{ y: -100 }}
        animate={{
          y: 0,
          backgroundColor:
            scrollY > 50 ? "rgba(255, 255, 255, 0)" : "rgba(255, 255, 255, 0)",
          boxShadow: scrollY > 50 ? "0 4px 20px rgba(0, 0, 0, 0.1)" : "none",
        }}
        transition={{
          duration: 0.4,
          backgroundColor: { type: "spring", stiffness: 100, damping: 15 },
          boxShadow: { type: "spring", stiffness: 100, damping: 15 },
        }}
      >
        <nav className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              className="flex items-center space-x-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <motion.span
                  className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 opacity-70 blur-lg"
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                    rotate: [0, 5, 0],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                />
                <div className="relative text-xl font-bold text-black dark:text-white bg-white dark:bg-gray-800 px-3 py-1 rounded-lg">
                  CollabBoard
                </div>
              </motion.div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <motion.div
                className="flex space-x-1 mr-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index + 0.3 }}
                    className="relative"
                  >
                    <ScrollLink
                      to={item.href}
                      smooth={true}
                      duration={400}
                      style={{ cursor: "pointer" }}
                    >
                      <motion.div
                        className="px-4 py-2 text-gray-700 dark:text-gray-200 font-medium rounded-md relative overflow-hidden group"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.span
                          className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
                          initial={{ scaleX: 0, opacity: 0 }}
                          whileHover={{ scaleX: 1, opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                        <motion.span
                          className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-500/10 rounded-md opacity-0"
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                        <span className="relative z-10">{item.name}</span>
                      </motion.div>
                    </ScrollLink>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                className="flex items-center space-x-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <a href="/auth/sign-in">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <button
                      className="text-black dark:text-white hover:text-blue-400 relative overflow-hidden group"
                    >
                      <motion.span
                        className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-500/20 rounded-md opacity-0"
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                      <span className="relative z-10">Sign In</span>
                    </button>
                  </motion.div>
                </a>
                <a href="/auth/sign-up">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative"
                  >
                    <motion.span
                      className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-md opacity-75 blur-sm"
                      animate={{
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    />
                    <button className="relative bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0">
                      Sign Up
                    </button>
                  </motion.div>
                </a>
              </motion.div>
            </div>

            {/* Mobile Menu button */}
            <motion.div
              className="md:hidden flex items-center"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
                className="ml-2 p-2 rounded-full bg-gray-100 dark:bg-gray-800"
              >
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-5 w-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden bg-white/95 dark:bg-gray-800/95 backdrop-blur-md"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ScrollLink
                      smooth={true}
                      duration={400}
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <button
                        variant="ghost"
                        className="w-full justify-start text-black dark:text-white hover:text-blue-400"
                      >
                        {item.name}
                      </button>
                    </ScrollLink>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.1 }}
                >
                  <a
                    href="/auth/sign-in"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <button
                      className="w-full justify-start text-black dark:text-white hover:text-blue-400"
                    >
                      Sign In
                    </button>
                  </a>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (navItems.length + 1) * 0.1 }}
                >
                  <a
                    href="/auth/sign-up"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <button className="w-full m-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                      Sign Up
                    </button>
                  </a>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
          <WhiteboardLanding />
      
    </div>
    </>
  )
}

const features = [
  {
    title: "Real-time Collaboration",
    description:
      "Work together with your team in real-time, seeing changes instantly as they happen.",
    icon: <Users2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
  },
  {
    title: "Intuitive Drawing Tools",
    description:
      "Easy-to-use tools for creating professional diagrams and sketches.",
    icon: <Pen className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
  },
  {
    title: "Easy Sharing",
    description:
      "Share your work with a simple link or export in multiple formats.",
    icon: <Share2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
  },
  {
    title: "Multiple Layers",
    description:
      "Organize your drawings with layers for complex diagrams and presentations.",
    icon: <Layers className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
  },
  {
    title: "Cloud Storage",
    description:
      "Your drawings are automatically saved and synced across devices.",
    icon: <Cloud className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
  },
  {
    title: "Smart Features",
    description: "AI-powered tools to help you create better diagrams faster.",
    icon: <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
  },
];

export default Home
