import { motion } from "framer-motion";

const SectionDescription = ({
  children,
  className = "",
}) => {
  return (
    <motion.p
      initial={{
        opacity: 0,
        y: 25,
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
        duration: 0.6,
        delay: 0.15,
      }}
      className={`mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-500 ${className}`}
    >
      {children}
    </motion.p>
  );
};

export default SectionDescription;