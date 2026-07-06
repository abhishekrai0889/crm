import React from "react";

export default function PrivacyPolicy() {
  return (
    <>
      <main className="bg-white min-h-screen">
        {/* Header */}
        <section className="relative overflow-hidden bg-[var(--blue-900)] pt-[140px] pb-[90px] lg:pt-[100px] lg:pb-[100px]">
          <div className="absolute inset-0">
            <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-[#315BFF]/20 blur-[140px]" />
            <div className="absolute left-0 bottom-0 h-[300px] w-[300px] rounded-full bg-[#1A4FFF]/10 blur-[120px]" />
          </div>

          <div className="relative z-10 mx-auto max-w-[1180px] px-6">
            <div className="max-w-[720px]">
              <h1 className="text-white font-semibold tracking-[-0.5px] text-[30px] leading-[40px] sm:text-[40px] sm:leading-[52px] lg:text-[48px] lg:leading-[60px]">
                Privacy Policy
              </h1>
              <p className="mt-4 text-white/40 text-[14px]">
                Last updated: June 10, 2026
              </p>
            </div>
          </div>
        </section>
        <div className="h-px w-full bg-gray-200" />

        {/* Content */}
        <section className="pt-[50px] md:pt-[70px] lg:pt-[80px] pb-[80px]  lg:pb-[80px]">
          <div className="container-fluid">
            <div className="mx-auto max-w-[1110px]">
              <Intro>
                Enthis ("we", "our" or "us") is committed to
                protecting your privacy. This Privacy Policy explains how we
                collect, use, store and protect information when you visit our
                website at{" "}
                <a
                  href="https://www.engeniatech.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1a4fff] hover:underline"
                >
                  www.engeniatech.com
                </a>{" "}
                or engage with our services. Please read this policy carefully.
                By using our website, you consent to the practices described
                herein.
              </Intro>
              <Section number="1" title="Information We Collect">
                <Paragraph>
                  We collect information in the following ways:
                </Paragraph>

                <SubHeading>Information you provide directly</SubHeading>

                <ul className="mt-3 list-disc pl-5 space-y-3 text-gray-600 text-[15px] leading-[27px]">
                  <li>
                    <span className="text-[#0d1a2e] font-medium">
                      Contact form submissions
                    </span>{" "}
                    — your name, email address, phone number, company name and
                    the content of your message when you reach out through our
                    website.
                  </li>

                  <li>
                    <span className="text-[#0d1a2e] font-medium">
                      Job applications
                    </span>{" "}
                    — your name, contact details, CV and any other information
                    you submit when applying for a position.
                  </li>

                  <li>
                    <span className="text-[#0d1a2e] font-medium">
                      Service engagements
                    </span>{" "}
                    — information exchanged during onboarding, scoping and
                    delivery of our services.
                  </li>
                </ul>

                <SubHeading>Information collected automatically</SubHeading>

                <ul className="mt-3 list-disc pl-5 space-y-3 text-gray-600 text-[15px] leading-[27px]">
                  <li>
                    <span className="text-[#0d1a2e] font-medium">
                      Usage data
                    </span>{" "}
                    — pages visited, time spent on pages, referring URLs,
                    browser type and device information.
                  </li>

                  <li>
                    <span className="text-[#0d1a2e] font-medium">
                      IP address
                    </span>{" "}
                    — used for security, fraud prevention and approximate
                    geographic analytics.
                  </li>

                  <li>
                    <span className="text-[#0d1a2e] font-medium">
                      Cookies and similar technologies
                    </span>{" "}
                    — as described in Section 4 below.
                  </li>
                </ul>
              </Section>

              <Section number="2" title="How We Use Your Information">
                <Paragraph>
                  We use the information we collect for the following purposes:
                </Paragraph>

                <ul className="mt-4 list-disc pl-5 space-y-3 text-gray-600 text-[15px] leading-[27px]">
                  <li>
                    To respond to your inquiries and provide the services you
                    request.
                  </li>

                  <li>To process and evaluate job applications.</li>

                  <li>
                    To communicate updates, project information or
                    service-related notices.
                  </li>

                  <li>
                    To improve the performance, design and content of our
                    website.
                  </li>

                  <li>
                    To detect and prevent fraudulent or unauthorized activity.
                  </li>

                  <li>
                    To comply with applicable legal and regulatory obligations.
                  </li>
                </ul>

                <Paragraph>
                  We do not sell, rent or trade your personal information to
                  third parties for marketing purposes.
                </Paragraph>
              </Section>
              <Section number="3" title="Legal Basis for Processing">
                <Paragraph>
                  Where applicable under data protection law, we process your
                  personal information on the following grounds:
                </Paragraph>

                <ul className="mt-4 list-disc pl-5 space-y-3 text-gray-600 text-[15px] leading-[27px]">
                  <li>
                    <span className="text-[#0d1a2e] font-medium">Consent</span>{" "}
                    — where you have given us clear consent to process your data
                    for a specific purpose.
                  </li>

                  <li>
                    <span className="text-[#0d1a2e] font-medium">
                      Contractual necessity
                    </span>{" "}
                    — where processing is necessary to perform a contract with
                    you or to take steps at your request before entering into a
                    contract.
                  </li>

                  <li>
                    <span className="text-[#0d1a2e] font-medium">
                      Legitimate interests
                    </span>{" "}
                    — where processing is necessary for our legitimate business
                    interests, such as improving our services or preventing
                    fraud, provided those interests are not overridden by your
                    rights.
                  </li>

                  <li>
                    <span className="text-[#0d1a2e] font-medium">
                      Legal obligation
                    </span>{" "}
                    — where we are required to process your data to comply with
                    a legal requirement.
                  </li>
                </ul>
              </Section>

              <Section number="4" title="Cookies and Tracking">
                <Paragraph>
                  Our website uses cookies and similar tracking technologies to
                  improve your browsing experience and understand how visitors
                  use our site.
                </Paragraph>

                <ul className="mt-4 list-disc pl-5 space-y-3 text-gray-600 text-[15px] leading-[27px]">
                  <li>
                    <span className="text-[#0d1a2e] font-medium">
                      Essential cookies
                    </span>{" "}
                    — required for the website to function correctly. These
                    cannot be disabled.
                  </li>

                  <li>
                    <span className="text-[#0d1a2e] font-medium">
                      Analytics cookies
                    </span>{" "}
                    — help us understand how visitors interact with the site so
                    we can improve the experience. These are set only after you
                    consent.
                  </li>

                  <li>
                    <span className="text-[#0d1a2e] font-medium">
                      Security cookies
                    </span>{" "}
                    — used to protect the site and its users, including CAPTCHA
                    verification via Cloudflare Turnstile.
                  </li>
                </ul>

                <Paragraph>
                  When you first visit, a banner lets you choose &ldquo;Accept
                  Cookies&rdquo; or &ldquo;Decline&rdquo;; analytics cookies
                  load only if you accept. You can also control cookies through
                  your browser settings. Disabling certain cookies may affect
                  the functionality of the website.
                </Paragraph>
              </Section>

              <Section number="5" title="Third-Party Services">
                <Paragraph>
                  We use trusted third-party services to support the operation
                  of our website and business. These include:
                </Paragraph>

                <ul className="mt-4 list-disc pl-5 space-y-3 text-gray-600 text-[15px] leading-[27px]">
                  <li>
                    <span className="text-[#0d1a2e] font-medium">
                      Cloudflare
                    </span>{" "}
                    — security, performance and CAPTCHA verification
                    (Turnstile).
                  </li>

                  <li>
                    <span className="text-[#0d1a2e] font-medium">
                      Google Analytics and Google Tag Manager
                    </span>{" "}
                    — to measure and analyze website traffic. These load only
                    after you accept analytics cookies.
                  </li>

                  <li>
                    <span className="text-[#0d1a2e] font-medium">Brevo</span> —
                    to deliver transactional emails such as inquiry
                    confirmations and notifications.
                  </li>

                  <li>
                    <span className="text-[#0d1a2e] font-medium">
                      DigitalOcean
                    </span>{" "}
                    — cloud hosting and file storage for the website.
                  </li>
                </ul>

                <Paragraph>
                  We only share personal information with third parties to the
                  extent necessary for them to perform services on our behalf or
                  as required by law. We require all third parties to respect
                  the security of your data and treat it in accordance with
                  applicable privacy laws.
                </Paragraph>
              </Section>

              <Section number="6" title="Data Retention">
                <Paragraph>
                  We retain personal information only for as long as necessary
                  to fulfill the purposes for which it was collected, including
                  any legal, accounting or reporting requirements.
                </Paragraph>

                <Paragraph>
                  Contact form submissions are typically retained for up to 12
                  months. Job application data is retained for up to 6 months
                  after the recruitment process concludes, unless you consent to
                  a longer retention period. Data relating to active client
                  engagements is retained for the duration of the engagement and
                  for a reasonable period thereafter in accordance with
                  applicable legal obligations.
                </Paragraph>
              </Section>
              <Section number="7" title="Your Rights">
                <Paragraph>
                  Depending on your location, you may have the following rights
                  in relation to your personal information:
                </Paragraph>

                <ul className="mt-4 list-disc pl-5 space-y-3 text-gray-600 text-[15px] leading-[27px]">
                  <li>
                    <span className="text-[#0d1a2e] font-medium">Access</span> —
                    the right to request a copy of the personal information we
                    hold about you.
                  </li>

                  <li>
                    <span className="text-[#0d1a2e] font-medium">
                      Correction
                    </span>{" "}
                    — the right to request correction of inaccurate or
                    incomplete information.
                  </li>

                  <li>
                    <span className="text-[#0d1a2e] font-medium">Deletion</span>{" "}
                    — the right to request deletion of your personal
                    information, subject to certain exceptions.
                  </li>

                  <li>
                    <span className="text-[#0d1a2e] font-medium">
                      Restriction
                    </span>{" "}
                    — the right to request that we restrict processing of your
                    information in certain circumstances.
                  </li>

                  <li>
                    <span className="text-[#0d1a2e] font-medium">
                      Portability
                    </span>{" "}
                    — the right to receive your data in a structured,
                    machine-readable format.
                  </li>

                  <li>
                    <span className="text-[#0d1a2e] font-medium">
                      Objection
                    </span>{" "}
                    — the right to object to processing based on legitimate
                    interests.
                  </li>

                  <li>
                    <span className="text-[#0d1a2e] font-medium">
                      Withdrawal of consent
                    </span>{" "}
                    — where processing is based on consent, you may withdraw it
                    at any time without affecting the lawfulness of prior
                    processing.
                  </li>
                </ul>

                <Paragraph>
                  To exercise any of these rights, please contact us at{" "}
                  <a
                    href="mailto:info@engeniatech.com"
                    className="text-[#1a4fff] hover:underline"
                  >
                    info@engeniatech.com
                  </a>
                  . We will respond to your request within 30 days.
                </Paragraph>
              </Section>

              <Section number="8" title="Data Security">
                <Paragraph>
                  We implement appropriate technical and organizational measures
                  to protect your personal information against unauthorized
                  access, disclosure, alteration or destruction. These include
                  encrypted connections (HTTPS), access controls and secure
                  infrastructure.
                </Paragraph>

                <Paragraph>
                  While we take data security seriously, no method of
                  transmission over the internet or electronic storage is
                  completely secure. We cannot guarantee absolute security, but
                  we are committed to addressing any breach promptly and in
                  accordance with applicable law.
                </Paragraph>
              </Section>

              <Section number="9" title="International Data Transfers">
                <Paragraph>
                  Enthis operates across the United States, Canada
                  and India. Your information may be transferred to and
                  processed in any of these locations. Where data is transferred
                  internationally, we ensure appropriate safeguards are in place
                  to protect your information in accordance with applicable data
                  protection laws.
                </Paragraph>
              </Section>

              <Section number="10" title="Changes to This Policy">
                <Paragraph>
                  We may update this Privacy Policy from time to time to reflect
                  changes in our practices, technology or legal requirements.
                  The updated version will be posted on this page with a revised
                  "Last updated" date. We encourage you to review this policy
                  periodically. Continued use of the website after changes are
                  posted constitutes your acceptance of the revised policy.
                </Paragraph>
              </Section>

              <Section number="11" title="Contact Us">
                <Paragraph>
                  If you have any questions about this Privacy Policy or how we
                  handle your personal information, please contact us:
                </Paragraph>

                <div className="mt-5 rounded-[14px] border border-gray-200 bg-gray-50 p-5 sm:p-6 divide-y divide-gray-200">
                  <ContactLine label="Company">
                    Engenia Technologies
                  </ContactLine>

                  <ContactLine label="Email">
                    <a
                      href="mailto:info@engeniatech.com"
                      className="text-[#1a4fff] hover:underline"
                    >
                      info@engeniatech.com
                    </a>
                  </ContactLine>

                  <ContactLine label="US Address">
                    11552 Knott St., Unit C-11, Garden Grove, CA 92841, USA
                  </ContactLine>

                  <ContactLine label="Phone">
                    <a
                      href="tel:+15405400444"
                      className="text-[#1a4fff] hover:underline"
                    >
                      +1 (540) 540-0444
                    </a>
                  </ContactLine>
                </div>
              </Section>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
function Intro({ children }) {
  return (
    <p className="text-gray-500 text-[15px] leading-[28px] sm:text-[16px] sm:leading-[30px] mb-10 sm:mb-12">
      {children}
    </p>
  );
}

function Section({ number, title, children }) {
  return (
    <div className="mb-8 pb-8 border-b border-gray-200 last:border-b-0 last:pb-0 last:mb-0">
      <h2 className="mb-4 text-[19px] font-semibold text-[#0d1a2e]">
        {number}. {title}
      </h2>

      {children}
    </div>
  );
}

function SubHeading({ children }) {
  return <p className="text-[#0d1a2e] font-medium mt-5 mb-2">{children}</p>;
}

function Paragraph({ children }) {
  return (
    <p className="text-gray-600 text-[15px] leading-[27px] mt-4">{children}</p>
  );
}

function ContactLine({ label, children }) {
  return (
    <div className="flex py-3">
      <span className="w-[110px] text-gray-400">{label}</span>
      <span className="text-gray-700">{children}</span>
    </div>
  );
}
