import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const PrimaryButton = ({
  to = "/",
  children,
  variant = "primary",
  className = "",
  onClick,
}) => {
  const variants = {
    primary:
      "bg-blue-600 text-white border border-blue-600 hover:bg-blue-700",

    secondary:
      "bg-white text-slate-900 border border-slate-300 hover:border-blue-600 hover:text-blue-600",

    outline:
      "bg-transparent text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white",
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2 }}
    >
      <Link
        to={to}
        onClick={onClick}
        className={`inline-flex items-center justify-center rounded-lg px-8 py-3 font-semibold transition-all duration-300 ${variants[variant]} ${className}`}
      >
        {children}
      </Link>
    </motion.div>
  );
};

export default PrimaryButton;