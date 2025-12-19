import { motion, useInView, Variants } from 'framer-motion';
import { useRef } from 'react';
import { GlassCard } from '@/components/ui/glass-card';
import { GraduationCap, Code, Printer } from 'lucide-react';
import ppf from '@/assets/ppf_sq.jpeg';


const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const highlights = [
    {
      icon: GraduationCap,
      title: "SAIT Graduate",
      description: "GPA 3.9/4.0",
      color: "text-secondary",
    },
    {
      icon: Code,
      title: "Full-Stack Developer",
      description: "React, Node, Cloud",
      color: "text-primary",
    },
    {
      icon: Printer,
      title: "3D Printing",
      description: "SOND 3D Operations",
      color: "text-accent-purple",
    },
  ];

  return (
    <section id="about" className="relative py-32 px-4 sm:px-6 lg:px-8">
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
            Get to know me
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold font-heading mt-4 shimmer-text">
            About Me
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Photo placeholder / Avatar area */}
          <motion.div variants={itemVariants} className="relative">
            <GlassCard className="aspect-square max-w-md mx-auto overflow-hidden">
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 via-secondary/10 to-accent-purple/20">
                <div className="text-center">
                  <div className="w-full h-full mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 mt-2">
                    <span className="text-5xl font-bold font-heading text-primary-foreground">
                      <img src={ppf} alt="Aryan Bhanot" className="w-80 h-80 rounded-sm object-cover" />
                    </span>
                  </div>
                  <p className="text-muted-foreground text-xl">The Face Behind the Work</p>
                </div>
              </div>
            </GlassCard>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary/20 rounded-full blur-2xl" />
          </motion.div>

          {/* Bio content */}
          <motion.div variants={itemVariants} className="space-y-6">
            <GlassCard className="p-8">
              <h3 className="text-2xl font-bold font-heading mb-4 text-foreground">
                Hello! I'm <span className="gradient-text">Aryan</span>
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                I'm a passionate Web Developer and Full-Stack Creator with a strong foundation in modern web technologies. Currently pursuing my studies at SAIT with an impressive GPA of 3.9/4.0, I combine academic excellence with hands-on industry experience.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Beyond web development, I'm an entrepreneur at heart. As the Manager of Operations at SOND 3D, I've ventured into the exciting world of 3D printing, bringing innovative manufacturing solutions to life.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I believe in creating digital experiences that are not just functional, but memorable. Whether it's building responsive web applications or managing 3D printing operations, I bring creativity and technical expertise to everything I do.
              </p>
            </GlassCard>

            {/* Highlight cards */}
            <div className="grid grid-cols-3 gap-4">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  variants={itemVariants}
                >
                  <GlassCard className="p-4 text-center h-full" tiltEffect={false}>
                    <item.icon className={`w-8 h-8 mx-auto mb-2 ${item.color}`} />
                    <h4 className="font-semibold text-sm text-foreground">{item.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
