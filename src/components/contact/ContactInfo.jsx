import { Link } from "react-router-dom";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import FlashOnOutlinedIcon from "@mui/icons-material/FlashOnOutlined";

const infoCards = [
  {
    icon: EmailOutlinedIcon,
    title: "Sales enquiries",
    link: "mailto:sales@enthis.com",
    linkText: "sales@enthis.com",
    description: "Replies within one business day.",
  },
  {
    icon: ChatBubbleOutlineOutlinedIcon,
    title: "Product support",
    link: "mailto:support@enthis.com",
    linkText: "support@enthis.com",
    description: "Or use in-app chat on Pro+.",
  },
  {
    icon: LocalPhoneOutlinedIcon,
    title: "Talk to sales",
    link: "tel:+911140000000",
    linkText: "+91 11 4000 0000",
    description: "Mon–Fri, 9:00–18:00 IST",
  },
  {
    icon: LocationOnOutlinedIcon,
    title: "Head office",
    company: "Engenia Technologies",
    description: "California, United States",
  },
];

const ContactInfo = () => {
  return (
    <aside className="space-y-4">
      {infoCards.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="rounded-[18px] border border-[var(--line)] bg-white px-7 py-6 transition-all duration-300 hover:border-[var(--blue-100)] hover:shadow-md"
          >
            <div className="flex items-start gap-4">
              {/* Icon */}

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#EEF4FF] text-[var(--blue-600)]">
                <Icon sx={{ fontSize: 22 }} />
              </div>

              {/* Content */}

              <div className="flex-1">
                <h4 className="text-[16px] font-semibold leading-none text-[var(--ink-900)]">
                  {item.title}
                </h4>

                {item.link ? (
                  <>
                    <a
                      href={item.link}
                      className="mt-1 inline-block text-[14px] font-semibold text-[var(--blue-600)] hover:underline"
                    >
                      {item.linkText}
                    </a>

                    <p className=" text-[15px] leading-7 text-[var(--ink-500)]">
                      {item.description}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="mt-1 text-[16px] font-medium text-[var(--ink-700)]">
                      {item.company}
                    </p>

                    <p className=" text-[15px] leading-7 text-[var(--ink-500)]">
                      {item.description}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {/* CTA */}

      <div className="rounded-[18px] border border-[#C9DAFF] bg-[#EDF4FF] px-7 py-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-[var(--blue-600)] shadow-sm">
            <FlashOnOutlinedIcon sx={{ fontSize: 22 }} />
          </div>

          <div>
            <h4 className="text-[18px] font-semibold text-[var(--ink-900)]">
              Prefer to just try it?
            </h4>

            <p className="mt-2 text-[14px] leading-5 text-[var(--ink-500)]">
              No sales call needed —
              <Link
                to="/signup"
                className="font-semibold text-[var(--blue-600)] hover:underline"
              >
                {" "}
                start a free 14-day trial
              </Link>{" "}
              and explore at your own pace.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ContactInfo;