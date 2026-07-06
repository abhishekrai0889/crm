import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

import PrimaryButton from "../common/PrimaryButton";
import { plans } from "../../data/plans";

const PricingPlans = () => {
  return (
    <section className="pt-16 pb-24">
      <div className="mx-auto max-w-[1180px] px-6">
<div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
  {plans.map((plan, index) => (
    <motion.div
      key={plan.name}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
      }}
     className={`relative flex h-full flex-col rounded-[20px] border bg-white px-[26px] py-[30px]
transition-all duration-300 ease-in-out
hover:-translate-y-2
hover:border-[var(--blue-600)]
hover:shadow-[0_24px_60px_-12px_rgba(16,57,154,.20)]
${
  plan.featured
    ? "border-[var(--blue-600)] shadow-[0_24px_60px_-12px_rgba(16,57,154,.25)]"
    : "border-[var(--line)]"
}`}
    >
      {plan.featured && (
        <span className="absolute -top-[14px] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[var(--blue-600)] px-[14px] py-[5px] text-[12px] font-bold text-white">
          Most Popular
        </span>
      )}

      {/* Tier */}

      <div className="flex items-center gap-2">
        <span
          className={`h-3 w-3 rotate-45 rounded-[2px] ${plan.color}`}
        />

        <h3 className="text-[17px] font-bold text-[var(--ink-900)]">
          {plan.name}
        </h3>
      </div>

      {/* Tagline */}

      <p className="mt-2 min-h-[52px] text-[14px] leading-7 text-[var(--ink-500)]">
        {plan.tagline}
      </p>

      {/* Price */}

      {plan.custom ? (
        <div className="mt-4">
          <h2 className="text-[44px] font-extrabold leading-none">
            Custom
          </h2>

          <p className="mt-3 min-h-[48px] text-[14px] leading-6 text-[var(--ink-500)]">
            tailored to your team & compliance needs
          </p>
        </div>
      ) : (
        <div className="mt-4">
          <div className="flex items-start">
            <span className="mt-2 text-[22px] font-bold">$</span>

            <span className="ml-1 text-[52px] font-extrabold leading-none tracking-[-0.04em]">
              {plan.price}
            </span>
          </div>

          <p className="mt-3 min-h-[48px] text-[14px] leading-6 text-[var(--ink-500)]">
            per user / month, billed annually
          </p>
        </div>
      )}

      {/* Button */}

      <div className="mt-4">
        {plan.custom ? (
          <Link
            to="/contact"
            className="block w-full rounded-[8px] border border-[var(--line)] py-[13px] text-center text-[15px] font-semibold text-[var(--ink-900)] transition-all duration-200 hover:border-[var(--blue-400)] hover:text-[var(--blue-600)]"
          >
            Contact Sales
          </Link>
        ) : plan.button === "primary" ? (
          <PrimaryButton
            to="/signup"
            className="w-full justify-center"
          >
            Start Free Trial
          </PrimaryButton>
        ) : (
          <Link
            to="/signup"
            className="block w-full rounded-[8px] border border-[var(--line)] py-[13px] text-center text-[15px] font-semibold text-[var(--ink-900)] transition-all duration-200 hover:border-[var(--blue-400)] hover:text-[var(--blue-600)]"
          >
            Start Free Trial
          </Link>
        )}
      </div>

      {/* Features */}

      <ul className="mt-7 flex-1 space-y-[14px]">
        {plan.features.map((feature, i) => (
          <li
            key={i}
            className="flex items-start gap-[10px] text-[14px] leading-7 text-[var(--ink-700)]"
          >
            <CheckRoundedIcon
              sx={{
                fontSize: 18,
                color: "var(--blue-600)",
                marginTop: "3px",
                flexShrink: 0,
              }}
            />

            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  ))}
</div>

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
          }}
          transition={{
            duration: .5,
          }}
          className="mx-auto mt-16 max-w-3xl text-center text-[15px] text-[var(--ink-500)]"
        >
          All plans start with a{" "}
          <span className="font-semibold text-[var(--ink-900)]">
            14-day free trial
          </span>{" "}
          — full feature access, no credit card required.
        </motion.p>

      </div>
    </section>
  );
};

export default PricingPlans;