import { motion, useInView, Variants } from 'framer-motion';
import { useRef } from 'react';
import { GlassCard } from '@/components/ui/glass-card';
import { 
  Code2, 
  Database, 
  Cloud, 
  Palette, 
  GitBranch, 
  Globe,
  Layers,
  Terminal
} from 'lucide-react';

interface SkillCategory {
  title: string;
  icon: React.ElementType;
  skills: string[];
  color: string;
}

const skillCategories: SkillCategory[] = [
  {
    title: "Web Development",
    icon: Globe,
    skills: ["HTML5", "CSS3", "JavaScript", "TypeScript", "REST APIs", "Responsive Design"],
    color: "text-secondary",
  },
  {
    title: "Languages",
    icon: Code2,
    skills: ["JavaScript", "TypeScript", "Python", "Java", "C#", "SQL"],
    color: "text-primary",
  },
  {
    title: "Frameworks",
    icon: Layers,
    skills: ["React", "Next.js", "Node.js", "Express", "Tailwind CSS", ".NET"],
    color: "text-accent-purple",
  },
  {
    title: "Databases",
    icon: Database,
    skills: ["PostgreSQL", "MongoDB", "MySQL", "Firebase", "Redis", "Supabase"],
    color: "text-secondary",
  },
  {
    title: "Cloud / DevOps",
    icon: Cloud,
    skills: ["AWS", "Azure", "Docker", "CI/CD", "Vercel", "Netlify"],
    color: "text-accent",
  },
  {
    title: "UI/UX Tools",
    icon: Palette,
    skills: ["Figma", "Adobe XD", "Photoshop", "Illustrator", "Framer", "Canva"],
    color: "text-accent-pink",
  },
  {
    title: "Version Control",
    icon: GitBranch,
    skills: ["Git", "GitHub", "GitLab", "Bitbucket", "Git Flow", "Code Review"],
    color: "text-primary",
  },
  {
    title: "Other Tools",
    icon: Terminal,
    skills: ["VS Code", "Postman", "Jira", "Slack", "NPM", "Webpack"],
    color: "text-secondary",
  },
];

const SkillsSection = () => {
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
    hidden: { opacity: 0, y: 30 },
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
    <section id="skills" className="relative py-32 px-4 sm:px-6 lg:px-8">
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
            What I Work With
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold font-heading mt-4 shimmer-text">
            Skills & Technologies
          </h2>
        </motion.div>

        {/* Skills grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div key={category.title} variants={itemVariants}>
              <GlassCard className="p-6 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg bg-white/5 ${category.color}`}>
                    <category.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold font-heading text-foreground">
                    {category.title}
                  </h3>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <motion.span
                      key={skill}
                      className="px-3 py-1.5 text-xs font-medium rounded-full bg-white/5 border border-white/10 text-muted-foreground hover:bg-white/10 hover:text-foreground hover:border-white/20 transition-all cursor-default"
                      whileHover={{ scale: 1.05 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default SkillsSection;
