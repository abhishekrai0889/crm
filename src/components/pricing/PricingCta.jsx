import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const PricingCta = () => {
  return (
    <section className="pt-0 pb-20">
      <div className="mx-auto max-w-[1180px] px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="
            rounded-[20px]
            px-8
            py-14
            text-center
            text-white
            md:px-16
            md:py-20
            bg-[linear-gradient(120deg,var(--blue-900),var(--blue-700))]
            relative
            overflow-hidden
          "
        >
          {/* Radial Glow */}

          <div
            className="
              absolute
              left-0
              top-0
              h-[320px]
              w-[600px]
              rounded-full
              bg-white/10
              blur-3xl
              -translate-x-1/3
              -translate-y-1/2
              pointer-events-none
            "
          />

          <div className="relative z-10">

            <h2 className="text-[32px] font-bold tracking-[-0.02em] md:text-[44px]">
              Not sure which plan fits?
            </h2>

            <p className="mx-auto mt-5 max-w-[560px] text-[17px] leading-8 text-[var(--blue-100)]">
              Tell us about your team and we'll recommend the right
              starting point — no pressure, no lock-in.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">

              <Link
                to="/contact"
                className="
                  rounded-[8px]
                  bg-white
                  px-8
                  py-4
                  text-[15px]
                  font-semibold
                  text-[var(--blue-700)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-[var(--blue-50)]
                "
              >
                Talk to Sales
              </Link>

              <Link
                to="/signup"
                className="
                  rounded-[8px]
                  border
                  border-white/40
                  px-8
                  py-4
                  text-[15px]
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-white/10
                "
              >
                Start Free Trial
              </Link>

            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default PricingCta;