import { ClipboardCheck, Edit3, Eye, PlusCircle, Copy, CheckCircle } from "lucide-react"; 
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const HowItWorks = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: PlusCircle,
      title: "Create",
      description: "Start by creating a new paste, note, to-do list, or password entry with ease.",
      animation: { delay: 0.1 },
      action: () => navigate('/')
    },
    {
      icon: Eye,
      title: "View",
      description: "See all your saved content by clicking 'Paste' on the navbar for quick access.",
      animation: { delay: 0.2 },
      action: () => navigate('/pastes')
    },
    {
      icon: Edit3,
      title: "Edit",
      description: "Need to make changes? Edit your content anytime for future updates.",
      animation: { delay: 0.3 },
      action: null
    },
    {
      icon: Copy,
      title: "Copy",
      description: "Copy your notes, passwords, or text with a single click to use it elsewhere.",
      animation: { delay: 0.4 },
      action: null
    },
    {
      icon: CheckCircle,
      title: "Organize",
      description: "Use this tool as a password manager, note-saver, paste-saver, or a to-do app.",
      animation: { delay: 0.5 },
      action: null
    },
  ];

  return (
    <div className="w-full py-16 bg-gray-100 text-gray-800">
      <h2 className="text-center text-4xl font-bold mb-8">How It Works</h2>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            className={`flex flex-col items-center bg-white shadow-lg p-6 rounded-lg transition-all duration-300 transform hover:scale-105 ${
              feature.action ? 'hover:bg-blue-50 cursor-pointer' : 'opacity-50 cursor-not-allowed'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: feature.animation.delay }}
            onClick={feature.action ? feature.action : null}
            role={feature.action ? 'button' : 'presentation'}
            aria-label={feature.title}
          >
            <feature.icon className="text-blue-600 mb-4" size={48} />
            <h3 className={`text-2xl font-semibold mb-2 ${feature.action ? 'text-gray-900' : 'text-gray-500'}`}>
              {feature.title}
            </h3>
            <p className={`text-gray-600 text-center ${feature.action ? 'hover:text-blue-700' : ''}`}>
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
