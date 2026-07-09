import { useState } from "react";
import EditableField from "./EditableField";

import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const ContactDetailMain = () => {
    const details = [
  { label: "First Name", value: "Rhea" },
  { label: "Last Name", value: "Kapoor" },
  { label: "Email", value: "rhea@northwind.com", blue: true },
  { label: "Phone", value: "+91 98110 40521" },
  { label: "Job Title", value: "COO" },
  { label: "Company", value: "Northwind Consulting", blue: true },
  { label: "Lead Source", value: "Referral" },
  { label: "Owner", value: "Priya Khanna" },
];

  const [activeTab, setActiveTab] = useState("note");

  const tabs = [
    {
      id: "note",
      label: "Note",
      icon: <EditNoteRoundedIcon sx={{ fontSize: 18 }} />,
    },
    {
      id: "task",
      label: "Task",
      icon: <AssignmentTurnedInRoundedIcon sx={{ fontSize: 18 }} />,
    },
    {
      id: "call",
      label: "Call",
      icon: <CallOutlinedIcon sx={{ fontSize: 18 }} />,
    },
    {
      id: "meeting",
      label: "Meeting",
      icon: <CalendarTodayOutlinedIcon sx={{ fontSize: 18 }} />,
    },
    {
      id: "email",
      label: "Email",
      icon: <MailOutlineRoundedIcon sx={{ fontSize: 18 }} />,
    },
  ];

  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">

      {/* LEFT PANEL */}

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

          <h2 className="text-xl font-bold text-slate-900">
            Activity
          </h2>

          <span className="text-sm text-slate-500">
            14 activities
          </span>

        </div>

        {/* Tabs */}

        <div className="border-b border-slate-200 px-6 py-5">

          <div className="flex flex-wrap gap-3">

            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition
                ${
                  activeTab === tab.id
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}

          </div>

          {/* Textarea */}

          <textarea
            rows={4}
            placeholder="Add a note about Rhea..."
            className="mt-5 w-full resize-none rounded-2xl border border-slate-200 p-4 text-[15px] outline-none transition focus:border-blue-500"
          />

          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">

            <p className="text-sm text-slate-500">
              Notes are internal — visible to your team only.
            </p>

            <div className="flex items-center gap-3">

              <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">

                <AutoAwesomeRoundedIcon
                  sx={{ fontSize: 18 }}
                />

                Draft with AI

              </button>

              <button className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700">

                Log Note

              </button>

            </div>

          </div>

        </div>

        {/* Timeline */}

        <div className="p-6">

          <p className="mb-6 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
            Today
          </p>

        {/* Timeline */}

<div className="space-y-8">

  {/* Activity 1 */}

  <div className="relative flex gap-4">

    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
      <MailOutlineRoundedIcon sx={{ fontSize: 20 }} />
    </div>

    <div className="flex-1">

      <div className="flex items-center justify-between">

        <div>

          <h4 className="text-[15px] font-semibold text-slate-900">
            Email received
          </h4>

          <p className="mt-1 text-sm text-slate-500">
            Rhea replied regarding the CRM proposal.
          </p>

        </div>

        <span className="text-xs text-slate-400">
          10:30 AM
        </span>

      </div>

      <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">

        <p className="text-sm leading-7 text-slate-600">
          Thanks for sending the proposal.
          <br />
          Our leadership team has reviewed it and we'd like to schedule a
          short call tomorrow afternoon.
        </p>

      </div>

    </div>

  </div>

  {/* Activity 2 */}

  <div className="relative flex gap-4">

    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
      <CallOutlinedIcon sx={{ fontSize: 20 }} />
    </div>

    <div className="flex-1">

      <div className="flex items-center justify-between">

        <div>

          <h4 className="text-[15px] font-semibold text-slate-900">
            Call Logged
          </h4>

          <p className="mt-1 text-sm text-slate-500">
            18 minute discussion with Priya Khanna.
          </p>

        </div>

        <span className="text-xs text-slate-400">
          9:00 AM
        </span>

      </div>

      <div className="mt-4 rounded-2xl border border-slate-200 p-4">

        <ul className="space-y-2 text-sm text-slate-600">

          <li>• Discussed pricing options.</li>

          <li>• Customer requested Enterprise plan.</li>

          <li>• Follow-up meeting scheduled.</li>

        </ul>

      </div>

    </div>

  </div>

  

  {/* Yesterday */}
<div className="mt-8">
  <p className="mb-5 text-xs font-bold uppercase tracking-widest text-slate-400">
    Yesterday
  </p>

  {/* Deal */}
  <div className="mb-6 flex gap-4 border-b border-slate-200 pb-6">
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
      <TrendingUpRoundedIcon fontSize="small" />
    </div>

    <div className="flex-1">
      <p className="text-[16px] text-slate-800">
        Deal{" "}
        <span className="font-semibold text-blue-600">
          Northwind — CRM migration
        </span>{" "}
        moved from <strong>Demo</strong> to{" "}
        <strong>Proposal</strong> by Priya Khanna
      </p>

      <p className="mt-1 text-sm text-slate-400">
        4:31 PM • System
      </p>
    </div>
  </div>

  {/* Task */}
  <div className="flex gap-4">
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
      <TaskAltRoundedIcon fontSize="small" />
    </div>

    <div className="flex-1">
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-[16px] text-slate-800">
          <strong>Task completed</strong> — Send revised proposal with annual
          pricing
        </p>

        <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-500">
          Done
        </span>
      </div>

      <p className="mt-1 text-sm text-slate-400">
        Assigned to Priya Khanna • completed 2:14 PM
      </p>
    </div>
  </div>
</div>

{/* Jul 4 */}
<div className="mt-10">
  <p className="mb-5 text-xs font-bold uppercase tracking-widest text-slate-400">
    Jul 4
  </p>

  {/* Meeting */}
  <div className="mb-6 flex gap-4 border-b border-slate-200 pb-6">
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-100 text-pink-600">
      <CalendarTodayRoundedIcon fontSize="small" />
    </div>

    <div className="flex-1">
      <p className="text-[16px] text-slate-800">
        <strong>Meeting</strong> — Demo: pipeline & reporting walkthrough •
        45 min
      </p>

      <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-[15px] text-slate-600">
        Attendees: Rhea Kapoor, Arjun Nair (Northwind) • Priya, Sumeet (Acme).
        Positive on reporting; asked for GDPR data-residency detail.
      </div>

      <p className="mt-2 text-sm text-slate-400">
        Google Meet • 3:00 PM
      </p>
    </div>
  </div>

  {/* Note */}
  <div className="flex gap-4">
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
      <EditNoteRoundedIcon fontSize="small" />
    </div>

    <div className="flex-1">
      <p className="text-[16px] font-semibold text-slate-800">
        Note by Priya Khanna
      </p>

      <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-[15px] text-slate-600">
        Rhea is the economic buyer; IT lead Arjun influences heavily. Budget
        approved for FY26-Q2. Prefers email over calls.
      </div>

      <p className="mt-2 text-sm text-slate-400">
        11:20 AM
      </p>
    </div>
  </div>
</div>

</div>
        </div>

      </div>

    {/* RIGHT SIDEBAR */}

<div className="space-y-5">

  {/* Contact Details */}

 <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

  <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
    <h3 className="text-xl font-bold text-slate-900">
      Details
    </h3>

    <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">
      Manage fields
    </button>
  </div>

  <div className="px-6">

    <EditableField
      label="First Name"
      value="Rhea"
    />

    <EditableField
      label="Last Name"
      value="Kapoor"
    />

    <EditableField
      label="Email"
      value="rhea@northwind.com"
      link
    />

    <EditableField
      label="Phone"
      value="+91 98110 40521"
    />

    <EditableField
      label="Job Title"
      value="COO"
    />

    <EditableField
      label="Company"
      value="Northwind Consulting"
      link
    />

    <EditableField
      label="Lead Source"
      value="Referral"
    />

    <EditableField
      label="Owner"
      value="Priya Khanna"
    />

    <EditableField
      label="Tags"
      value="enterprise,priority"
      tags
    />

    <EditableField
      label="Created"
      value="Feb 12, 2026 · via import"
      editable={false}
    />

  </div>

</div>
{/* ================= Deals ================= */}

<div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
  {/* Header */}
  <div className="flex items-center justify-between border-b border-slate-200 px-5 py-5">
    <h3 className="text-lg font-semibold text-slate-900">
      Deals
    </h3>

    <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">
      + New
    </button>
  </div>

  {/* Body */}
  <div className="space-y-3 p-5">
    {[
      {
        title: "Northwind — CRM migration",
        stage: "Proposal · closes Jul 22",
        amount: "$31,200",
      },
      {
        title: "Pilot — Sales module",
        stage: "Won · Mar 2026",
        amount: "$8,400",
      },
    ].map((deal) => (
      <div
        key={deal.title}
        className="cursor-pointer rounded-2xl border border-slate-200 bg-white px-4 py-4 transition-all duration-200 hover:border-blue-500 hover:bg-blue-50/30"
      >
        <div className="flex items-center justify-between gap-4">
          {/* Left */}
          <div className="min-w-0">
            <h4 className="truncate text-[14px] font-normal text-slate-900">
              {deal.title}
            </h4>

            <p className="mt-1 text-[13px] font-normal text-slate-500">
              {deal.stage}
            </p>
          </div>

          {/* Right */}
          <p className="shrink-0 text-[15px] font-semibold text-slate-800">
            {deal.amount}
          </p>
        </div>
      </div>
    ))}
  </div>
</div>
{/* ================= Tickets ================= */}

<div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
  {/* Header */}
  <div className="flex items-center justify-between border-b border-slate-200 px-5 py-5">
    <h3 className="text-lg font-semibold text-slate-900">
      Tickets
    </h3>

    <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">
      + New
    </button>
  </div>

  {/* Body */}
  <div className="p-5">
    <div className="cursor-pointer rounded-2xl border border-slate-200 bg-white px-4 py-4 transition-all duration-200 hover:border-blue-500 hover:bg-blue-50/30">
      <h4 className="text-[15px] font-semibold text-slate-900">
        #4788 — Report export timeout
      </h4>

      <p className="mt-1 text-[13px] font-normal text-slate-500">
        Resolved · Jun 30
      </p>
    </div>
  </div>
</div>
{/* ================= Projects ================= */}

<div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
  {/* Header */}
  <div className="flex items-center justify-between border-b border-slate-200 px-5 py-5">
    <h3 className="text-lg  text-slate-900">
      Projects
    </h3>

    <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">
      + New
    </button>
  </div>

  {/* Body */}
  <div className="p-5">
    <div className="cursor-pointer rounded-2xl border border-slate-200 bg-white px-4 py-4 transition-all duration-200 hover:border-blue-500 hover:bg-blue-50/30">
      <h4 className="text-[15px] text-slate-900">
        Sales module onboarding
      </h4>

      <p className="mt-1 text-[13px] font-normal text-slate-500">
        In progress · 68% complete
      </p>
    </div>
  </div>
</div>
 

</div>

    </div>
  );
};

export default ContactDetailMain;