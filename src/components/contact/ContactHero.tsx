import SectionBadge from "../common/SectionBadge";
import SectionHeading from "../common/SectionHeading";
import SectionDescription from "../common/SectionDescription";

const ContactHero: React.FC = () => {
  return (
    <section className="border-b border-[var(--line)] bg-[var(--bg)] py-20">
      <div className="mx-auto max-w-[1180px] px-6 text-center">
        <SectionBadge>
          Contact Us
        </SectionBadge>

        <SectionHeading
          as="h1"
          className="mt-5"
        >
          Let's talk about your CRM
        </SectionHeading>

        <SectionDescription>
          Questions about plans, a migration from another tool, or an Enterprise
          conversation — we reply within one business day.
        </SectionDescription>
      </div>
    </section>
  );
};

export default ContactHero;