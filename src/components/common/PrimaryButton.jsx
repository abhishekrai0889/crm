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
    "border border-[#1A56DB] bg-[#1A56DB] text-white hover:bg-[#1548C7] hover:border-[#1548C7]",

  secondary:
    "border border-slate-300 bg-white text-slate-900 hover:border-[#1A56DB] hover:text-[#1A56DB]",

  outline:
    "border border-[#1A56DB] bg-transparent text-[#1A56DB] hover:bg-[#1A56DB] hover:text-white",
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
  className={`inline-flex items-center justify-center rounded-xl px-6 py-3 text-[15px] font-semibold transition-all duration-300 ${variants[variant]} ${className}`}
>
  {children}
</Link>
    </motion.div>
  );
};

export default PrimaryButton;