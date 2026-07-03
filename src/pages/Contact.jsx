import ContactHero from "../components/contact/ContactHero";
import ContactForm from "../components/contact/ContactForm";
import ContactInfo from "../components/contact/ContactInfo";

const Contact = () => {
  return (
    <>
      <ContactHero />

      <section className="bg-[var(--bg)] py-20">
        <div className="mx-auto grid max-w-[1180px] gap-10 px-6 lg:grid-cols-[60%_40%]">
          <ContactForm />

          <div className="lg:sticky lg:top-28 h-fit">
            <ContactInfo />
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
