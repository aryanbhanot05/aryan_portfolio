import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  id: number;
  type: 'bot' | 'user';
  content: string;
}

interface FormData {
  lookingFor: string;
  name: string;
  email: string;
  company: string;
  role: string;
  details: string;
}

type ChatStep = 'lookingFor' | 'name' | 'email' | 'company' | 'role' | 'details' | 'complete';

const botQuestions: Record<ChatStep, string> = {
  lookingFor: "👋 Hi there! I'm Aryan's virtual assistant. What are you looking for today?",
  name: "Great! What's your name?",
  email: "Nice to meet you! What's your email address?",
  company: "Which company are you with? (Optional - type 'skip' to continue)",
  role: "What's your role? (Optional - type 'skip' to continue)",
  details: "Any additional details you'd like to share?",
  complete: "",
};

// Placeholder function for email sending
const sendEmailPlaceholder = (data: FormData) => {
  // TODO: Add API endpoint to send collected data
  // fetch('/api/send-email', { 
  //   method: 'POST', 
  //   body: JSON.stringify(data),
  //   headers: { 'Content-Type': 'application/json' }
  // });
  
  console.log('Collected Form Data:', data);
  return data;
};

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [currentStep, setCurrentStep] = useState<ChatStep>('lookingFor');
  const [formData, setFormData] = useState<FormData>({
    lookingFor: '',
    name: '',
    email: '',
    company: '',
    role: '',
    details: '',
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addBotMessage(botQuestions.lookingFor);
    }
  }, [isOpen]);

  const addBotMessage = (content: string) => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      type: 'bot',
      content,
    }]);
  };

  const addUserMessage = (content: string) => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      type: 'user',
      content,
    }]);
  };

  const getNextStep = (current: ChatStep): ChatStep => {
    const steps: ChatStep[] = ['lookingFor', 'name', 'email', 'company', 'role', 'details', 'complete'];
    const currentIndex = steps.indexOf(current);
    return steps[currentIndex + 1] || 'complete';
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userInput = inputValue.trim();
    addUserMessage(userInput);
    setInputValue('');

    // Update form data
    const isSkip = userInput.toLowerCase() === 'skip';
    setFormData(prev => ({
      ...prev,
      [currentStep]: isSkip ? '' : userInput,
    }));

    // Move to next step
    setTimeout(() => {
      const nextStep = getNextStep(currentStep);
      setCurrentStep(nextStep);

      if (nextStep === 'complete') {
        const finalData = {
          ...formData,
          [currentStep]: isSkip ? '' : userInput,
        };
        
        // Call placeholder function
        sendEmailPlaceholder(finalData);
        
        addBotMessage(
          "Perfect! I've collected all the information. 🎉\n\n" +
          "**Summary:**\n" +
          `• Looking for: ${finalData.lookingFor}\n` +
          `• Name: ${finalData.name}\n` +
          `• Email: ${finalData.email}\n` +
          (finalData.company ? `• Company: ${finalData.company}\n` : '') +
          (finalData.role ? `• Role: ${finalData.role}\n` : '') +
          (finalData.details ? `• Details: ${finalData.details}\n` : '') +
          "\n_(Note: This is only a demo — backend/email integration hasn't been added yet.)_"
        );
      } else {
        addBotMessage(botQuestions[nextStep]);
      }
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const resetChat = () => {
    setMessages([]);
    setCurrentStep('lookingFor');
    setFormData({
      lookingFor: '',
      name: '',
      email: '',
      company: '',
      role: '',
      details: '',
    });
    setTimeout(() => {
      addBotMessage(botQuestions.lookingFor);
    }, 300);
  };

  return (
    <>
      {/* Chat bubble button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-neon-strong ${isOpen ? 'hidden' : 'flex'}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute top-0 right-0 w-3 h-3 bg-secondary rounded-full animate-pulse" />
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[500px] max-h-[calc(100vh-100px)] flex flex-col rounded-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{
              background: 'rgba(10, 15, 31, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 0 40px rgba(110, 0, 238, 0.3), 0 0 80px rgba(0, 232, 255, 0.1)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-gradient-to-br from-primary to-secondary">
                  <Bot className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm">Aryan's Assistant</h3>
                  <p className="text-xs text-muted-foreground">Always here to help</p>
                </div>
              </div>
              <div className="flex gap-2">
                <motion.button
                  onClick={resetChat}
                  className="p-2 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors text-xs"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Reset
                </motion.button>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <AnimatePresence initial={false}>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      message.type === 'bot' 
                        ? 'bg-gradient-to-br from-primary to-secondary' 
                        : 'bg-white/10'
                    }`}>
                      {message.type === 'bot' ? (
                        <Bot className="w-4 h-4 text-primary-foreground" />
                      ) : (
                        <User className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>
                    <div className={`max-w-[75%] p-3 rounded-2xl ${
                      message.type === 'bot'
                        ? 'bg-white/5 rounded-tl-sm'
                        : 'bg-gradient-to-br from-primary/30 to-secondary/30 rounded-tr-sm'
                    }`}>
                      <p className="text-sm text-foreground whitespace-pre-line">{message.content}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-white/5">
              {currentStep !== 'complete' ? (
                <div className="flex gap-2">
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 bg-white/5 border-white/10 focus:border-primary/50 text-sm"
                  />
                  <motion.button
                    onClick={handleSend}
                    className="p-3 rounded-xl bg-gradient-to-br from-primary to-secondary text-primary-foreground"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={!inputValue.trim()}
                  >
                    <Send className="w-4 h-4" />
                  </motion.button>
                </div>
              ) : (
                <motion.button
                  onClick={resetChat}
                  className="w-full py-3 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 text-foreground hover:from-primary/30 hover:to-secondary/30 transition-colors text-sm font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Start New Conversation
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotWidget;
