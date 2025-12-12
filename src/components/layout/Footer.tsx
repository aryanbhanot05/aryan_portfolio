import { motion } from 'framer-motion';
import { Heart, Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 px-4 sm:px-6 lg:px-8 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo and copyright */}
          <div className="text-center md:text-left">
            <motion.span 
              className="text-2xl font-bold font-heading shimmer-text"
              whileHover={{ scale: 1.05 }}
            >
              <img src="public/logo.png" alt="Logo" className="w-14 h-14 inline-block mr-2 rounded-full" />
            </motion.span>
            <p className="text-sm text-muted-foreground mt-2">
              © {currentYear} Aryan Bhanot. All rights reserved.
            </p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            {[
              { icon: Github, url: "https://github.com/aryanbhanot05" },
              { icon: Linkedin, url: "https://www.linkedin.com/in/aryan-bhanot-609650245/" },
              { icon: Mail, url: "mailto:aryanbhanot2005@gmail.com" },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg glass-card text-muted-foreground hover:text-secondary transition-colors"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>

          {/* Made with love */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Made with</span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-accent-pink fill-accent-pink" />
            </motion.span>
            <span>by Aryan</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
