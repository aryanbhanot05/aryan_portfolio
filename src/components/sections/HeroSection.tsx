import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, FileText, Mail, X, Download, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import ResumeModal from '../ResumeModal';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const HeroSection = () => {

  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 rounded-full bg-primary/20 blur-xl"
        animate={{ y: [-10, 10, -10], rotate: [-2, 2, -2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-40 right-20 w-32 h-32 rounded-full bg-secondary/20 blur-xl"
        animate={{ y: [-15, 15, -15], rotate: [2, -2, 2] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-40 left-1/4 w-24 h-24 rounded-full bg-accent-purple/20 blur-xl"
        animate={{ y: [-8, 8, -8], rotate: [-1, 1, -1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="relative z-10 text-center max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-sm font-medium text-muted-foreground">
            <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
            Available for opportunities
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-heading mb-6 leading-tight"
        >
          <span className="shimmer-text">Aryan Bhanot</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-xl sm:text-2xl md:text-3xl text-muted-foreground mb-4 font-light"
        >
          <span className="gradient-text font-medium">Software Developer</span>
          <span className="mx-3 text-border">•</span>
          <span className="text-foreground/80">AI Trainer</span>
          <span className="mx-3 text-border">•</span>
          <span className="gradient-text-accent font-medium">3D Printing Entrepreneur</span>
        </motion.p>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          Crafting digital experiences with cutting-edge technologies and bringing ideas to life through innovative web solutions and 3D printing ventures.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            variant="hero"
            size="lg"
            className="group"
            onClick={() => setIsResumeOpen(true)} // Toggle modal open
          >
            <FileText className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            View Resume
          </Button>

          {/* 5. Add the Modal Component at the bottom */}
          <ResumeModal
            isOpen={isResumeOpen}
            onClose={() => setIsResumeOpen(false)}
          />

          <Button
            variant="heroOutline"
            size="lg"
            className="group"
            onClick={() => scrollToSection('contact')}
          >
            <Mail className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            Contact Me
          </Button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={itemVariants}
          className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-40 -ml-11"
        >
          <motion.button
            onClick={() => scrollToSection('about')}
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-sm">Scroll to explore</span>
            <ArrowDown className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroSection;
