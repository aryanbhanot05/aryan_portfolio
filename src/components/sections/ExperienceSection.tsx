import { motion, useInView, Variants } from 'framer-motion';
import { useRef } from 'react';
import { GlassCard } from '@/components/ui/glass-card';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

interface Experience {
  title: string;
  company: string;
  period: string;
  location: string;
  description: string[];
  color: string;
}

const experiences: Experience[] = [
  {
    "title": "Full Stack Developer",
    "company": "Tartigrade Ltd. (Project for FEC)",
    "period": "May 2025 – Present (3 months)",
    "location": "Calgary, Alberta, Canada",
    "description": [
      "Led front-end development using HTML5, CSS3, JavaScript, and React to deliver responsive and interactive web interfaces.",
      "Conducted usability analysis and implemented UI/UX improvements to streamline navigation and enhance visual consistency.",
      "Collaborated with cross-functional teams to translate technical and business requirements into functional web components.",
      "Ensured SEO optimization, accessibility compliance, and cross-browser compatibility across all major platforms."
    ],
    "color": "from-primary to-secondary"
  },
  {
    "title": "Manager of Operations",
    "company": "Sond Industries",
    "period": "January 2025 – Present (1 year)",
    "location": "Calgary, Alberta, Canada",
    "description": [
      "Managed and fulfilled 3D printing orders for clients in education and prototyping sectors[cit.",
      "Scheduled and led virtual meetings to capture client design requirements.",
      "Maintained operational logs and ensured consistent output quality.",
      "Handled customer communication and feedback to optimize service."
    ],
    "color": "from-secondary to-accent-purple"
  },
  {
    "title": "AI Trainer",
    "company": "Outlier",
    "period": "August 2025 – Present (5 months)",
    "location": "Calgary, Alberta, Canada",
    "description": [
      "Contributed to training and improving large language models by creating high-quality data, evaluating AI responses, and guiding model behavior.",
      "Designed clear, challenging prompts across multiple domains to test model reasoning.",
      "Reviewed and corrected AI-generated answers to ensure accuracy and alignment.",
      "Created grading rubrics and evaluated responses based on quality, depth, and factual correctness.",
      "Identified gaps, inconsistencies, or risks in AI outputs and offered improvements."
    ],
    "color": "from-accent-purple to-pink-500"
  },
  {
    "title": "Logistics Operations Manager",
    "company": "Naveen Enterprises",
    "period": "April 2020 – July 2024 (4 years 4 months)",
    "location": "Ludhiana, Punjab, India",
    "description": [
      "Led and supervised the facility team to ensure smooth, on-time workflow.",
      "Overseeing all incoming market orders and coordinating deliveries within 24 hours.",
      "Managed product inspection and quality checks before dispatch.",
      "Handled bookkeeping, payment records, and inventory accuracy.",
      "Optimized operational processes to reduce delays and improve turnaround times.",
      "Acted as the main link between suppliers, customers, and internal staff to keep communication clean and efficient."
    ],
    "color": "from-yellow-500 to-primary"
  },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section id="experience" className="relative py-32 px-4 sm:px-6 lg:px-8">
      <motion.div
        ref={ref}
        className="max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Section header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <span className="text-sm font-medium text-secondary uppercase tracking-widest">
            My Journey
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold font-heading mt-4 shimmer-text">
            Experience
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-accent-purple" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company}
                variants={itemVariants}
                className="relative pl-20"
              >
                {/* Timeline dot */}
                <div className="absolute left-6 top-8 w-5 h-5 rounded-full bg-gradient-to-br from-primary to-secondary border-4 border-background shadow-neon" />

                <GlassCard className="p-8 relative overflow-hidden">
                  {/* Gradient accent */}
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${exp.color}`} />

                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-2xl font-bold font-heading text-foreground">
                        {exp.title}
                      </h3>
                      <p className="text-lg font-medium bg-gradient-to-r from-neon-purple via-neon-violet to-neon-aqua bg-clip-text text-transparent inline-block">{exp.company}</p>
                    </div>

                    <div className="flex flex-col items-end gap-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ExperienceSection;
