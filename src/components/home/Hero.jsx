import { Link } from "react-router-dom";
import SectionBadge from "../common/SectionBadge";
import SectionHeading from "../common/SectionHeading";
import PrimaryButton from "../common/PrimaryButton";
const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-white py-24">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-blue-100 blur-3xl opacity-60" />
        <div className="absolute right-0 top-0 h-[520px] w-[520px] rounded-full bg-blue-100 blur-3xl opacity-70" />
      </div>

      <div className="mx-auto max-w-[1180px] px-6">
        {/* Heading */}
        <div className="text-center">
          <SectionBadge>Multi-tenant CRM for growing teams</SectionBadge>

          <SectionHeading as="h1" className="mt-6">
            <>
              One CRM for sales,
              <br />
              marketing, support and projects
            </>
          </SectionHeading>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-500">
            ENTHIS gives your whole company a single customer record, a single
            timeline and AI in every plan — without the pricing surprises of the
            big-name suites.
          </p>

          {/* Buttons */}
       <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
  <PrimaryButton to="/signup">
    Start your free trial
  </PrimaryButton>

  <PrimaryButton
    to="/about"
    variant="secondary"
  >
    See how it works
  </PrimaryButton>
</div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
