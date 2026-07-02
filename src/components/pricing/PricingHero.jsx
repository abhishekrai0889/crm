import SectionBadge from "../common/SectionBadge";
import SectionHeading from "../common/SectionHeading";
import BillingToggle from "../common/BillingToggle";
import SectionDescription from "../common/SectionDescription";

import { motion } from "framer-motion";

const PricingHero = () => {
  return (
    <section className="border-b border-slate-200 bg-gradient-to-b from-slate-50 to-white py-20">
      <div className="mx-auto max-w-[1180px] px-6 text-center">
        <SectionBadge>Pricing</SectionBadge>

        <SectionHeading as="h1" className="mt-5">
          <>
            Simple per-seat pricing.
            <br />
            No contact-count traps.
          </>
        </SectionHeading>
        <SectionDescription>
          ENTHIS gives your whole company a single customer record, a single
          timeline and AI in every plan — without the pricing surprises of the
          big-name suites.
        </SectionDescription>

        <BillingToggle />
      </div>
    </section>
  );
};

export default PricingHero;
