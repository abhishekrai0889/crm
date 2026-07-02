import { motion } from "framer-motion";

const SectionHeading = ({
  children,
  className = "",
  as: Tag = "h2",
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.3,
      }}
      transition={{
        duration: 0.7,
        ease: "easeOut",
      }}
    >
      <Tag
        className={`text-5xl font-bold leading-tight tracking-tight text-slate-900 lg:text-6xl ${className}`}
      >
        {children}
      </Tag>
    </motion.div>
  );
};

export default SectionHeading;