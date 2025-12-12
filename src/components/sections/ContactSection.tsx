import { motion, useInView, Variants } from 'framer-motion';
import { useRef, useState } from 'react';
import { GlassCard } from '@/components/ui/glass-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Github, Linkedin, Mail, Send, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    url: "https://github.com/aryanbhanot05",
    color: "hover:text-foreground",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/aryan-bhanot-609650245/",
    color: "hover:text-secondary",
  },
  {
    name: "Email",
    icon: Mail,
    url: "mailto:aryanbhanot2005@gmail.com",
    color: "hover:text-primary",
  },
];

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 1. Define the URL to your PHP script
    // NOTE: Replace '/send_email.php' with the actual path on your server!
    const endpointUrl = '/send_email.php'; 

    try {
        const response = await fetch(endpointUrl, { 
            method: 'POST', 
            // 2. Send the formData state as a JSON string
            body: JSON.stringify(formData),
            headers: { 
                'Content-Type': 'application/json' 
            }
        });

        const result = await response.json();

        if (response.ok && result.success) {
            toast({
                title: "Success!",
                description: "Your message has been sent successfully. Thank you!",
                variant: "default"
            });
            // 3. Clear the form on success
            setFormData({ name: '', email: '', message: '' });
        } else {
            // Handle error response from PHP script
            throw new Error(result.message || "An unknown error occurred.");
        }
    } catch (error) {
        console.error('Submission Error:', error);
        toast({
            title: "Submission Failed",
            description: (error instanceof Error) ? error.message : "We could not send your message. Please try again later or email me directly.",
            variant: "destructive"
        });
    } finally {
        setIsSubmitting(false);
    }
};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="relative py-32 px-4 sm:px-6 lg:px-8">
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
            Get In Touch
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold font-heading mt-4 shimmer-text">
            Contact Me
          </h2>
          <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <motion.div variants={itemVariants} className="space-y-8">
            <GlassCard className="p-6">
              <h3 className="text-xl font-bold font-heading mb-6 text-foreground">
                Let's Connect
              </h3>
              
              <div className="space-y-4">
                <a
                  href="mailto:aryanbhanot2005@gmail.com"
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group"
                >
                  <div className="p-3 rounded-lg bg-primary/20">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                      aryanbhanot2005@gmail.com
                    </p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5">
                  <div className="p-3 rounded-lg bg-secondary/20">
                    <MapPin className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium text-foreground">Calgary, Alberta, Canada</p>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Social links */}
            <div className="flex justify-center gap-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-4 rounded-xl glass-card text-muted-foreground ${link.color} transition-all duration-300`}
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <link.icon className="w-6 h-6" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div variants={itemVariants}>
            <GlassCard className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="bg-white/5 border-white/10 focus:border-primary/50"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className="bg-white/5 border-white/10 focus:border-primary/50"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    required
                    rows={5}
                    className="bg-white/5 border-white/10 focus:border-primary/50 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <motion.span
                        className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      Send Message
                    </span>
                  )}
                </Button>
              </form>
            </GlassCard>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection;
