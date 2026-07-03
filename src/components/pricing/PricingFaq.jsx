import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

const faqs = [
  {
    question: "Do you charge more as my contact list grows?",
    answer:
      "No. Every paid plan includes unlimited contacts. You pay per seat, and only for the seats you use — never for the size of your database.",
  },
  {
    question: "What happens when my free trial ends?",
    answer:
      "Your workspace switches to read-only until you pick a plan. Nothing is deleted — your data stays safe and you can export it at any time.",
  },
  {
    question: "Can I change plans or seat counts later?",
    answer:
      "Yes — upgrade, downgrade or adjust seats at any time. Changes are prorated automatically, so you only pay for what you use.",
  },
  {
    question: "Is AI really included, or metered separately?",
    answer:
      "The AI copilot is included in every plan. Only high-volume autonomous agent workloads are metered, with transparent per-action pricing.",
  },
  {
    question: "Can you migrate us from HubSpot, Pipedrive or Zoho?",
    answer:
      "Yes. One-click importers for HubSpot, Pipedrive, Zoho and Mailchimp are built in, plus a CSV import wizard.",
  },
  {
    question: "How is my company's data isolated?",
    answer:
      "Every workspace is a separate tenant with row-level isolation, encrypted at rest and in transit. Enterprise plans can opt for a dedicated database.",
  },
];

const PricingFaq = () => {
  const [open, setOpen] = useState(0);

  return (
    <section className="py-20">
      <div className="mx-auto max-w-[1180px] px-6">

        <div className="mb-14 text-center">
          <h2 className="text-[42px] font-bold tracking-[-0.02em] text-[var(--ink-900)]">
            Frequently asked questions
          </h2>
        </div>

        <div className="mx-auto grid max-w-[760px] gap-3">

          {faqs.map((faq, index) => {
            const active = open === index;

            return (
              <motion.div
                key={index}
                whileHover={{ y: -2 }}
                className={`overflow-hidden rounded-xl border transition-all duration-300 ${
                  active
                    ? "border-[var(--blue-600)] shadow-lg"
                    : "border-[var(--line)]"
                }`}
              >
                <button
                  onClick={() =>
                    setOpen(active ? null : index)
                  }
                className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-[16px] font-semibold text-[var(--ink-900)]">
                    {faq.question}
                  </span>

                  <KeyboardArrowDownRoundedIcon
                    className={`transition-transform duration-300 ${
                      active ? "rotate-180" : ""
                    }`}
                    sx={{
                      color: "var(--ink-500)",
                      fontSize: 24,
                    }}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {active && (
                    <motion.div
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.25,
                      }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-[15px] leading-7 text-[var(--ink-500)]">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default PricingFaq;