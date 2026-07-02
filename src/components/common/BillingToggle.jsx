import { useState } from "react";
import { motion } from "framer-motion";

const BillingToggle = ({
  defaultAnnual = true,
  onChange,
}) => {
  const [annual, setAnnual] = useState(defaultAnnual);

  const handleToggle = () => {
    const value = !annual;
    setAnnual(value);

    if (onChange) {
      onChange(value);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mt-8 inline-flex items-center gap-4 rounded-full border border-slate-200 bg-white px-5 py-3 shadow-sm"
    >
      <span
        className={`text-sm font-medium ${
          !annual ? "text-slate-900" : "text-slate-500"
        }`}
      >
        Monthly
      </span>

      <button
        onClick={handleToggle}
        className={`relative h-7 w-14 rounded-full transition ${
          annual ? "bg-blue-600" : "bg-slate-300"
        }`}
      >
        <motion.div
          layout
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
          className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow ${
            annual ? "left-8" : "left-1"
          }`}
        />
      </button>

      <span
        className={`text-sm font-medium ${
          annual ? "text-slate-900" : "text-slate-500"
        }`}
      >
        Annual
      </span>

      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
        Save 20%
      </span>
    </motion.div>
  );
};

export default BillingToggle;