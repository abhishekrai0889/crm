import React from "react";

export default function Terms() {
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
              Terms of Service
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
                Welcome to Enthis . By accessing our website at{" "}
                <a
                  href="https://www.engeniatech.com"
                  className="text-[#1a4fff] hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.engeniatech.com
                </a>{" "}
                and using our services, you agree to comply with and be bound by these Terms and Conditions. If you do not agree with any part of these terms, please refrain from using our services.
              </Intro>

              <Section number="1" title="Definitions">
                <ul className="list-disc pl-5 space-y-3 text-gray-600 text-[15px] leading-[27px]">
                  <li>
                    <span className="text-[#0d1a2e] font-medium">"Company", "we", "our" or "us"</span> refers to Enthis .
                  </li>
                  <li>
                    <span className="text-[#0d1a2e] font-medium">"User", "you" or "your"</span> refers to any individual or entity accessing or using our website or services.
                  </li>
                  <li>
                    <span className="text-[#0d1a2e] font-medium">"Services"</span> refers to web development, custom software, AI integration, cloud infrastructure, cybersecurity, enterprise solutions and all other offerings provided by Enthis .
                  </li>
                  <li>
                    <span className="text-[#0d1a2e] font-medium">"Website"</span> refers to the Enthis  website accessible at www.engeniatech.com.
                  </li>
                </ul>
              </Section>

              <Section number="2" title="Use of Our Services">
                <Paragraph>
                  Our services are provided solely for lawful business and informational purposes. By using our website and engaging our services, you agree to:
                </Paragraph>
                <ul className="mt-4 list-disc pl-5 space-y-3 text-gray-600 text-[15px] leading-[27px]">
                  <li>Use the website and services only for legitimate and lawful purposes.</li>
                  <li>Not engage in any activity that interferes with or disrupts our services or infrastructure.</li>
                  <li>Not attempt to gain unauthorized access to any part of the website or its related systems.</li>
                  <li>Not use our services for any unlawful, harmful or fraudulent activity.</li>
                </ul>
                <Paragraph>
                  Enthis  reserves the right to refuse service, terminate access or take any other appropriate action at its sole discretion if these terms are violated.
                </Paragraph>
              </Section>

              <Section number="3" title="Intellectual Property">
                <Paragraph>
                  All content on this website, including but not limited to text, graphics, logos, icons, images, audio clips, software and the overall design, is the property of Enthis  or its content suppliers and is protected by applicable intellectual property laws.
                </Paragraph>
                <Paragraph>
                  You may not copy, reproduce, modify, distribute, transmit, display, perform, publish, license, create derivative works from or sell any content or intellectual property obtained from this website without our prior written consent.
                </Paragraph>
              </Section>

              <Section number="4" title="User Responsibilities">
                <Paragraph>
                  When engaging with our services or submitting information through this website, you agree to:
                </Paragraph>
                <ul className="mt-4 list-disc pl-5 space-y-3 text-gray-600 text-[15px] leading-[27px]">
                  <li>Provide accurate, current and complete information.</li>
                  <li>Not impersonate any person or entity or misrepresent your affiliation with any person or entity.</li>
                  <li>Not transmit any harmful, offensive or disruptive content.</li>
                  <li>Comply with all applicable local, national and international laws and regulations.</li>
                </ul>
              </Section>

              <Section number="5" title="Payment and Refunds">
                <Paragraph>
                  Payments for services are governed by the terms set out in individual contracts, proposals or invoices issued by Enthis . By accepting a proposal or invoice, you agree to the payment schedule and amounts specified therein.
                </Paragraph>
                <Paragraph>
                  Refund eligibility is determined on a case-by-case basis in accordance with the terms of your specific service agreement. Enthis  reserves the right to issue or decline refunds at its discretion.
                </Paragraph>
              </Section>

              <Section number="6" title="Limitation of Liability">
                <Paragraph>
                  To the fullest extent permitted by applicable law, Enthis  shall not be liable for any direct, indirect, incidental, special, consequential or punitive damages arising from your use of, or inability to use, our website or services.
                </Paragraph>
                <Paragraph>
                  We do not warrant that the website will be available at all times, error-free or free from viruses or other harmful components. Access to the website is provided on an "as is" and "as available" basis.
                </Paragraph>
              </Section>

              <Section number="7" title="Third-Party Links">
                <Paragraph>
                  Our website may contain links to third-party websites for your convenience and reference. These links do not constitute an endorsement of those websites or their content. Enthis  is not responsible for the content, privacy practices or security of any third-party websites. We recommend reviewing the terms and privacy policies of any third-party site you visit.
                </Paragraph>
              </Section>

              <Section number="8" title="Privacy Policy">
                <Paragraph>
                  Your use of this website is also governed by our{" "}
                  <a href="/privacy-policy" className="text-[#1a4fff] hover:underline">
                    Privacy Policy
                  </a>
                  , which is incorporated into these Terms and Conditions by reference. Our Privacy Policy outlines how we collect, use and protect your personal information. Please review it carefully.
                </Paragraph>
              </Section>

              <Section number="9" title="Termination">
                <Paragraph>
                  We reserve the right to terminate or suspend your access to our website and services, without prior notice and at our sole discretion, if you breach these Terms and Conditions or engage in any conduct we consider harmful to our business, users or third parties.
                </Paragraph>
              </Section>

              <Section number="10" title="Governing Law">
                <Paragraph>
                  These Terms and Conditions are governed by and construed in accordance with the laws of the State of California, United States. Any disputes arising in connection with these terms shall be subject to the exclusive jurisdiction of the courts located in California.
                </Paragraph>
              </Section>

              <Section number="11" title="Changes to These Terms">
                <Paragraph>
                  Enthis  reserves the right to update or modify these Terms and Conditions at any time without prior notice. Changes will be effective immediately upon posting to the website. Your continued use of the website and services following any changes constitutes your acceptance of the revised terms. We encourage you to review these terms periodically.
                </Paragraph>
              </Section>

              {/* Closing */}
              <div className="mt-10 rounded-[14px] border border-gray-200 bg-gray-50 p-5 sm:p-6 md:p-8">
                <p className="text-gray-600 text-[15px] leading-[27px]">
                  By continuing to use our website and services, you acknowledge that you have read, understood and agree to be bound by these Terms and Conditions. If you have any questions, please contact us at{" "}
                  <a
                    href="mailto:info@engeniatech.com"
                    className="text-[#1a4fff] hover:underline"
                  >
                    info@engeniatech.com
                  </a>
                  .
                </p>
              </div>

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
