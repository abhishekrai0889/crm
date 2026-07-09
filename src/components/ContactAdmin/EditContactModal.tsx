import { useState, useEffect } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const EditContactModal = ({ open, onClose, contact, onSave }) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    jobTitle: "",
    company: "",
    leadSource: "Web form",
    leadStatus: "New",
    owner: "Me (Sumeet Sarna)",
    tags: "",
  });

  // Pre-fill form whenever a new contact is passed in
  useEffect(() => {
    if (!contact) return;
    const [firstName = "", ...rest] = contact.name.split(" ");
    setForm((prev) => ({
      ...prev,
      firstName,
      lastName: rest.join(" "),
      email: contact.email || "",
      phone: contact.phone || "",
      jobTitle: contact.designation || "",
      company: contact.company || "",
      leadStatus: contact.status || prev.leadStatus,
      owner: contact.owner || prev.owner,
    }));
  }, [contact]);

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSave = (mode) => {
    onSave?.({ ...form, mode });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <h2 className="text-xl font-bold text-slate-800">Edit Contact</h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100"
          >
            <CloseRoundedIcon />
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[70vh] overflow-y-auto p-6 space-y-5">
          {/* First & Last Name */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                First Name <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                value={form.firstName}
                onChange={handleChange("firstName")}
                placeholder="Rhea"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Last Name <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                value={form.lastName}
                onChange={handleChange("lastName")}
                placeholder="Kapoor"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Email
            </label>

            <input
              type="email"
              value={form.email}
              onChange={handleChange("email")}
              placeholder="rhea@northwind.com"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
            />

            <p className="mt-2 text-xs text-slate-500">
              Checked for duplicates on save — you'll be offered a merge if one
              exists.
            </p>
          </div>

          {/* Phone & Job */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Phone
              </label>

              <input
                type="text"
                value={form.phone}
                onChange={handleChange("phone")}
                placeholder="+91 98XXX XXXXX"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Job Title
              </label>

              <input
                type="text"
                value={form.jobTitle}
                onChange={handleChange("jobTitle")}
                placeholder="COO"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
              />
            </div>
          </div>

          {/* Company */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Company
            </label>

            <input
              list="companies"
              value={form.company}
              onChange={handleChange("company")}
              placeholder="Search or create a company..."
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
            />

            <datalist id="companies">
              <option>Northwind Consulting</option>
              <option>Globex</option>
              <option>Initech</option>
              <option>Umbra Labs</option>
              <option>Vertex Co</option>
            </datalist>
          </div>

          {/* Lead Source & Status */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Lead Source
              </label>

              <select
                value={form.leadSource}
                onChange={handleChange("leadSource")}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              >
                <option>Web form</option>
                <option>Cold outreach</option>
                <option>Referral</option>
                <option>Social</option>
                <option>Event</option>
                <option>Import</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Lead Status
              </label>

              <select
                value={form.leadStatus}
                onChange={handleChange("leadStatus")}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              >
                <option>New</option>
                <option>Contacted</option>
                <option>Qualified</option>
                <option>Nurturing</option>
                <option>Customer</option>
              </select>
            </div>
          </div>

          {/* Owner & Tags */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Owner
              </label>

              <select
                value={form.owner}
                onChange={handleChange("owner")}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              >
                <option>Me (Sumeet Sarna)</option>
                <option>Priya Khanna</option>
                <option>Jay Dhillon</option>
                <option>Maya Rao</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Tags
              </label>

              <input
                type="text"
                value={form.tags}
                onChange={handleChange("tags")}
                placeholder="enterprise, priority..."
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-wrap justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-5">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-medium text-slate-700 hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            onClick={() => handleSave("addAnother")}
            className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-medium text-slate-700 hover:bg-slate-100"
          >
            Save & Add Another
          </button>

          <button
            onClick={() => handleSave("view")}
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Save & View
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditContactModal;