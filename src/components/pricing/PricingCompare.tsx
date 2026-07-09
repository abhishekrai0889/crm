import { FC } from "react";
import { motion } from "framer-motion";

const compareData: string[][] = [
  ["Users included", "Per seat", "Per seat", "Per seat", "Custom"],
  ["Contacts", "Unlimited", "Unlimited", "Unlimited", "Unlimited"],
  ["Sales pipelines", "1", "Multiple", "Multiple", "Multiple"],
  ["Two-way email sync (Gmail / Outlook)", "✓", "✓", "✓", "✓"],
  ["Custom reports & dashboards", "✓", "✓", "✓", "✓"],
  ["Workflow automation", "—", "✓", "✓", "✓"],
  ["Email sequences & scheduler", "—", "✓", "✓", "✓"],
  ["Marketing automation", "—", "Light", "Full", "Full"],
  ["Support module (SLA, chat, KB)", "—", "—", "✓", "✓"],
  ["Projects module", "—", "—", "✓", "✓"],
  ["AI Copilot", "500 actions/mo", "Unlimited basic", "Unlimited", "Unlimited"],
  ["AI Agents (Customer, Prospecting)", "—", "—", "✓", "✓"],
  ["Custom objects", "—", "—", "✓", "✓"],
  ["SAML / SCIM", "—", "—", "—", "✓"],
  ["Dedicated database / BYOK", "—", "—", "—", "✓"],
  ["White-label", "—", "—", "—", "✓"],
  ["Support", "Email", "Priority email", "Live chat", "Named CSM"],
];

const yesValues: string[] = [
  "✓",
  "Unlimited",
  "Multiple",
  "Full",
  "Unlimited basic",
];

const headings: string[] = [
  "Feature",
  "Starter",
  "Growth",
  "Pro",
  "Enterprise",
];

const PricingCompare: FC = () => {
  return (
    <section className="bg-[var(--bg)] py-20">
      <div className="mx-auto max-w-[1180px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-[42px] font-bold tracking-[-0.02em] text-[var(--ink-900)]">
            Compare plans in detail
          </h2>
        </motion.div>

        <div className="overflow-x-auto rounded-xl border border-[var(--line)] bg-white">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-[var(--bg)]">
                {headings.map((heading) => (
                  <th
                    key={heading}
                    className={`border-b border-[var(--line)] px-5 py-4 text-sm font-bold ${
                      heading === "Feature"
                        ? "text-left text-[var(--ink-700)]"
                        : "text-center text-[var(--ink-900)]"
                    }`}
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {compareData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="transition-colors hover:bg-slate-50"
                >
                  {row.map((cell, cellIndex) => {
                    const isYes = yesValues.includes(cell);
                    const isNo = cell === "—";

                    return (
                      <td
                        key={cellIndex}
                        className={`border-b border-[var(--line)] px-5 py-4 text-sm
                          ${
                            cellIndex === 0
                              ? "text-left font-medium text-[var(--ink-700)]"
                              : "text-center"
                          }
                          ${
                            isYes
                              ? "font-semibold text-green-600"
                              : isNo
                              ? "text-[var(--ink-300)]"
                              : "text-[var(--ink-700)]"
                          }`}
                      >
                        {cell}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default PricingCompare;