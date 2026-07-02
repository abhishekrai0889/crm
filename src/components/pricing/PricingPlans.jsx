import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

import PrimaryButton from "../common/PrimaryButton";

const plans = [
  {
    name: "Starter",
    color: "bg-slate-400",
    price: 12,
    monthly: 15,
    tagline: "For small teams getting off spreadsheets.",
    button: "secondary",
    features: [
      "Contacts, companies, leads & deals",
      "1 visual sales pipeline",
      "Unlimited contacts",
      "Two-way Gmail & Outlook sync",
      "Web forms & lead capture",
      "AI Copilot — 500 actions / month",
      "Custom reports included",
      "Email support",
    ],
  },

  {
    name: "Growth",
    color: "bg-amber-500",
    featured: true,
    price: 28,
    monthly: 35,
    tagline: "For growing sales teams that need automation.",
    button: "primary",
    features: [
      "Everything in Starter",
      "Multiple pipelines",
      "Email sequences & meeting scheduler",
      "Marketing module (light)",
      "Workflow automation builder",
      "Telephony bundle — 250 min",
      "Unlimited AI Copilot",
      "Priority email support",
    ],
  },

  {
    name: "Pro",
    color: "bg-blue-600",
    price: 52,
    monthly: 65,
    tagline: "For companies running the full customer lifecycle.",
    button: "secondary",
    features: [
      "Everything in Growth",
      "Marketing automation (full)",
      "Support module with SLAs",
      "Projects module",
      "Custom objects",
      "Advanced reports",
      "AI Agents",
      "Live chat support",
    ],
  },

  {
    name: "Enterprise",
    color: "bg-slate-900",
    custom: true,
    tagline:
      "Custom plan for security-conscious, larger organizations.",
    button: "secondary",
    features: [
      "Everything in Pro",
      "SAML & SCIM",
      "Dedicated database",
      "Encryption",
      "White-label",
      "Sandbox",
      "99.95% uptime SLA",
      "Customer Success Manager",
    ],
  },
];

const PricingPlans = () => {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-[1180px] px-6">

        <div className="grid gap-8 lg:grid-cols-4 md:grid-cols-2">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
              className={`relative rounded-3xl border bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl ${
                plan.featured
                  ? "border-blue-600 ring-2 ring-blue-600"
                  : "border-slate-200"
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white">
                  Most Popular
                </span>
              )}

              <div className="flex items-center gap-3">
                <span
                  className={`h-4 w-4 rounded-full ${plan.color}`}
                ></span>

                <h3 className="text-xl font-bold text-slate-900">
                  {plan.name}
                </h3>
              </div>

              <p className="mt-4 text-sm leading-7 text-slate-500">
                {plan.tagline}
              </p>

              {plan.custom ? (
                <>
                  <h2 className="mt-8 text-5xl font-bold">
                    Custom
                  </h2>

                  <p className="mt-2 text-sm text-slate-500">
                    Tailored to your business
                  </p>
                </>
              ) : (
                <>
                  <div className="mt-8 flex items-end">
                    <span className="text-2xl font-semibold">$</span>

                    <span className="ml-1 text-6xl font-bold">
                      {plan.price}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-slate-500">
                    per user / month
                  </p>
                </>
              )}

              <div className="mt-8">
                {plan.custom ? (
                  <Link
                    to="/contact"
                    className="block rounded-xl border border-slate-300 py-4 text-center font-semibold transition hover:border-blue-600 hover:text-blue-600"
                  >
                    Contact Sales
                  </Link>
                ) : plan.button === "primary" ? (
                  <PrimaryButton to="/signup">
                    Start Free Trial
                  </PrimaryButton>
                ) : (
                  <Link
                    to="/signup"
                    className="block rounded-xl border border-slate-300 py-4 text-center font-semibold transition hover:border-blue-600 hover:text-blue-600"
                  >
                    Start Free Trial
                  </Link>
                )}

                <ul className="mt-8 space-y-4">                {plan.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-[15px] leading-7 text-slate-700"
                    >
                      <CheckCircleRoundedIcon
                        sx={{
                          fontSize: 20,
                          color: "#2563eb",
                          marginTop: "4px",
                        }}
                      />

                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Text */}

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mx-auto mt-16 max-w-3xl text-center text-sm leading-7 text-slate-500"
        >
          All plans start with a{" "}
          <span className="font-semibold text-slate-900">
            14-day free trial
          </span>{" "}
          — full feature access, no credit card required.
        </motion.p>
      </div>
    </section>
  );
};

export default PricingPlans;                