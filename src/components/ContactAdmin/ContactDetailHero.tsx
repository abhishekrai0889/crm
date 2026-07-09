import { Link } from "react-router-dom";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";

const ContactDetailHero = ({ onEdit }) => {
  const contact = {
    initials: "RK",
    name: "Rhea Kapoor",
    designation: "COO",
    company: "Northwind Consulting",
    owner: "Priya Khanna",
    lastActivity: "2 hours ago",
    status: "Customer",
  };

  const actions = [
    {
      icon: <MailOutlineRoundedIcon sx={{ fontSize: 20 }} />,
      onClick: () => console.log("Email"),
    },
    {
      icon: <CallOutlinedIcon sx={{ fontSize: 20 }} />,
      onClick: () => console.log("Call"),
    },
    {
      icon: <CalendarTodayOutlinedIcon sx={{ fontSize: 20 }} />,
      onClick: () => console.log("Meeting"),
    },
  ];

  return (
    <div>
      {/* Back */}
      <Link
        to="/contacts"
        className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600"
      >
        <ArrowBackRoundedIcon sx={{ fontSize: 18 }} />
        Contacts
      </Link>

      <div className="rounded-3xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          {/* Left */}
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-violet-600 to-purple-500 text-2xl font-bold text-white">
              {contact.initials}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-medium text-slate-900">
                  {contact.name}
                </h1>

                <span className="rounded-full bg-slate-900 px-2.5 py-1 text-[11px] font-semibold text-white">
                  {contact.status}
                </span>
              </div>

              <p className="mt-1 text-[15px] text-slate-600">
                {contact.designation} at{" "}
                <span className="cursor-pointer font-medium text-blue-600 hover:underline">
                  {contact.company}
                </span>

                <span className="mx-2 text-slate-300">•</span>

                Owner: {contact.owner}

                <span className="mx-2 text-slate-300">•</span>

                Last activity {contact.lastActivity}
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-wrap items-center gap-2.5">
            {actions.map((action, index) => (
              <button
                key={index}
                onClick={action.onClick}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
              >
                {action.icon}
              </button>
            ))}

            <button
              onClick={onEdit}
              className="rounded-xl cursor-pointer bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow transition hover:bg-blue-700"
            >
              Edit Contact
            </button>

            <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-blue-200 hover:bg-slate-50">
              <MoreVertRoundedIcon sx={{ fontSize: 20 }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetailHero;