import { motion, useInView, Variants } from 'framer-motion';
import { useRef } from 'react';
import { GlassCard } from '@/components/ui/glass-card';
import { ExternalLink, Github, Folder } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Project {
  title: string;
  description: string;
  techStack: string[];
  link?: string;
  github?: string;
  featured?: boolean;
  repoLink?: string;
}

const projects: Project[] = [
  {
    "title": "SOND 3D Official E-commerce & Operations Website",
    "description": "A comprehensive, full-stack website built to handle all business functions for the Calgary-based 3D printing operation. Features include customer-facing e-commerce for customized orders, a detailed product gallery, and an internal dashboard for managing print fulfillment, inventory, and client communication.",
    "techStack": ["React", "Next.js", "Tailwind CSS", "TypeScript", "Node.js", "Supabase"],
    "repoLink": "https://github.com/aryanbhanot05/sond_3d",
    "link": "https://sond3d.vercel.app/"
  },
  {
    "title": "Tune Space 2.0",
    "description": "An enhanced music streaming platform with improved UI/UX, playlist management, and social features for music enthusiasts.",
    "techStack": ["React", "Node.js", "supabase", "Spotify API", "Amazon API", "GoogleTTS"],
    "featured": true,
    "repoLink": "https://github.com/aryanbhanot05/Tune_Space_2.0"
  },
  {
    "title": "Remote Job Locator",
    "description": "A comprehensive job board specifically designed for remote work opportunities, featuring advanced filters and real-time updates.",
    "techStack": ["React", "Express", "PostgreSQL", "REST API"],
    "featured": true,
    "repoLink": "https://github.com/aryanbhanot05/remote_job_locator",
    "link": "https://remote-job-locator-khaki.vercel.app/",
  }, 
  {
    "title": "Branding Machine Vision",
    "description": "An application of machine vision for quality control and brand logo verification in manufacturing/branding processes.",
    "techStack": ["React", "Next.js", "Tailwind CSS", "TypeScript"],
    "repoLink": "https://github.com/aryanbhanot05/branding_machine_vision",
    "link": "https://branding-machine-vision.vercel.app/",
  },
  {
    "title": "FEC Official Website Demo",
    "description": "A modern, responsive website demo showcasing web development capabilities for the FEC organization.",
    "techStack": ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
    "repoLink": "https://github.com/aryanbhanot05/FEC_Official",
    "link": "https://fec-official.vercel.app/",
  },
  {
    "title": "Tune Space",
    "description": "Original music streaming application with personalized recommendations and playlist creation capabilities.",
    "techStack": ["JavaScript", "Node.js", "supabase"],
    "repoLink": "https://github.com/aryanbhanot05/Tune_Space",
  },
  {
    "title": "Netflix Clone",
    "description": "A pixel-perfect recreation of the Netflix login page with authentication flow implementation.",
    "techStack": ["HTML", "CSS", "JavaScript"],
    "repoLink": "https://github.com/aryanbhanot05/Netflix_Clone",
  },
  {
    "title": "Amazon Homepage Clone",
    "description": "Fully responsive Amazon homepage clone featuring dynamic product displays and cart functionality.",
    "techStack": ["HTML", "CSS", "JavaScript"],
    "repoLink": "https://github.com/aryanbhanot05/Amazon_Clone",
  },
  {
    "title": "Customer Appointment System",
    "description": "A full-stack appointment scheduling system with calendar integration and automated notifications.",
    "techStack": ["C#", ".NET", "SQL Server"],
    "repoLink": "https://github.com/aryanbhanot05/Customer_Appointment_System",
  },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section id="projects" className="relative py-32 px-4 sm:px-6 lg:px-8">
      <motion.div
        ref={ref}
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Section header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <span className="text-sm font-medium text-secondary uppercase tracking-widest">
            My Work
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold font-heading mt-4 shimmer-text">
            Featured Projects
          </h2>
        </motion.div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div key={project.title} variants={itemVariants}>
              <GlassCard
                className={`p-6 h-full flex flex-col ${project.featured ? 'ring-1 ring-primary/30' : ''
                  }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20">
                    <Folder className="w-6 h-6 text-secondary" />
                  </div>

                  {/* 1. VIEW REPOSITORY BUTTON */}
                  {project.repoLink && (
                    <motion.a
                      href={project.repoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-4 right-4 z-10 px-4 py-2 text-sm font-bold rounded-lg 
                         bg-gradient-to-r from-neon-violet via-indigo-500 to-neon-cyan 
                         text-primary-foreground shadow-lg shadow-neon-purple/50 
                         hover:shadow-neon-strong transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      View Repository
                    </motion.a>
                  )}

                  {/* 2. VIEW LIVE SITE BUTTON (NEW) */}
                  {project.link && (
                    <motion.a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className=" absolute top-4 right-72 z-10 px-4 py-2 text-sm font-bold rounded-lg text-white bg-secondary/20 border border-secondary/50 text-secondary-foreground shadow-lg shadow-secondary/30 hover:bg-secondary/40 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Live Demo
                    </motion.a>
                  )}

                  <div className="flex gap-2">
                    {project.github && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Github className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                      </motion.a>
                    )}
                    {project.link && (
                      <motion.a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold font-heading text-foreground">
                      {project.title}
                    </h3>
                    {project.featured && (
                      <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-primary/20 text-primary">
                        Featured
                      </span>
                    )}
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>
                </div>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs font-mono text-secondary/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* View more button */}
        <motion.div variants={itemVariants} className="text-center mt-12">
          <Button
            variant="heroOutline"
            size="lg"
            onClick={() => window.open('https://github.com/aryanbhanot05', '_blank')}
          >
            <Github className="w-5 h-5 mr-2" />
            View All Projects on GitHub
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ProjectsSection;
