import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import EditContactModal from "./EditContactModal";
import MergeContactModal from "./MergeContactModal";
import type { Contact, SavedContactData, MergeKeepId } from "./types";

const ContactMain = () => {
  const [showAlert, setShowAlert] = useState<boolean>(true);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const menuRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [openMergeModal, setOpenMergeModal] = useState<boolean>(false);

  const contacts: Contact[] = [
    {
      id: 1,
      name: "Rhea Kapoor",
      designation: "COO",
      company: "Northwind Consulting",
      email: "rhea@northwind.com",
      phone: "+91 98110 40521",
      owner: "Priya K.",
      ownerInitial: "PK",
      ownerColor: "#6D28D9",
      status: "Customer",
      activity: "2 hours ago",
      initials: "RK",
      avatarColor: "#6D28D9",
    },
    {
      id: 2,
      name: "Daniel Mora",
      designation: "Head of Sales",
      company: "Globex",
      email: "daniel@globex.com",
      phone: "+1 415 555 0132",
      owner: "You",
      ownerInitial: "SS",
      ownerColor: "#334155",
      status: "Qualified",
      activity: "Yesterday",
      initials: "DM",
      avatarColor: "#0E7490",
    },
    {
      id: 3,
      name: "Ananya Shah",
      designation: "Founder",
      company: "Umbra Labs",
      email: "ananya@umbralabs.io",
      phone: "+91 99872 11430",
      owner: "Maya R.",
      ownerInitial: "MR",
      ownerColor: "#B45309",
      status: "Nurturing",
      activity: "3 days ago",
      initials: "AS",
      avatarColor: "#B45309",
    },
    {
      id: 4,
      name: "Rahul Gupta",
      designation: "IT Manager",
      company: "Initech",
      email: "rahul@initech.com",
      phone: "+91 98220 87765",
      owner: "Jay D.",
      ownerInitial: "JD",
      ownerColor: "#0E7490",
      status: "Contacted",
      activity: "4 days ago",
      initials: "RG",
      avatarColor: "#059669",
    },
    {
      id: 5,
      name: "Lena Müller",
      designation: "Procurement Lead",
      company: "Vertex Co",
      email: "lena@vertex.co",
      phone: "+49 30 5557 8821",
      owner: "Priya K.",
      ownerInitial: "PK",
      ownerColor: "#6D28D9",
      status: "New",
      activity: "1 week ago",
      initials: "LM",
      avatarColor: "#9D174D",
    },
  ];

  const statusStyles: Record<Contact["status"], string> = {
    Customer: "bg-slate-900 text-white",
    Qualified: "bg-emerald-100 text-emerald-700",
    Nurturing: "bg-orange-100 text-orange-700",
    Contacted: "bg-violet-100 text-violet-700",
    New: "bg-blue-100 text-blue-700",
  };

  interface FilterGroup {
    label: string;
    options: string[];
  }

  const filterOptions: FilterGroup[] = [
    {
      label: "All owners",
      options: ["All owners", "Me", "Priya Khanna", "Jay Dhillon", "Maya Rao"],
    },
    {
      label: "All statuses",
      options: ["All statuses", "New", "Contacted", "Qualified", "Nurturing", "Customer"],
    },
    {
      label: "All companies",
      options: ["All companies", "Northwind", "Globex", "Initech", "Umbra Labs"],
    },
    {
      label: "Last activity: any",
      options: ["Last activity: any", "Last 7 days", "Last 30 days", "Over 30 days ago"],
    },
  ];

  const allChecked = selectedIds.length === contacts.length;

  const toggleAll = () => {
    setSelectedIds(allChecked ? [] : contacts.map((c) => c.id));
  };

  const toggleRow = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleMenu = (id: number) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  };

  // Close row menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (openMenuId === null) return;
      const ref = menuRefs.current[openMenuId];
      if (ref && !ref.contains(e.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openMenuId]);

  const handleEditClick = (contact: Contact) => {
    setSelectedContact(contact);
    setOpenEditModal(true);
    setOpenMenuId(null);
  };

  const handleSaveContact = (formData: SavedContactData) => {
    console.log("Saved contact:", formData);
    // formData.mode is "addAnother" or "view" — handle navigation/reset accordingly
  };

  const handleMergeContacts = (keepId: MergeKeepId) => {
    console.log("Merging contacts, keeping:", keepId);
    setShowAlert(false);
  };

  return (
    <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* ================= Header ================= */}

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Contacts
          </h1>

          <p className="mt-2 text-[15px] text-slate-500">
            <span className="font-semibold text-slate-700">2,418</span>{" "}
            contacts
            <span className="mx-2 text-slate-300">•</span>
            <span className="font-semibold text-blue-600">147</span> added
            this month
          </p>
        </div>
      </div>

      {/* ================= Duplicate Alert ================= */}

      {showAlert && (
        <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-amber-200 bg-amber-50 px-6 py-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#d97706"
              strokeWidth="2"
              className="h-6 w-6 flex-shrink-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01"
              />
            </svg>

            <p className="text-[15px] font-medium text-amber-700">
              A contact with the email{" "}
              <span className="font-semibold">rhea@northwind.com</span>{" "}
              already exists.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpenMergeModal(true)}
              className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Merge with existing
            </button>

            <button
              onClick={() => setShowAlert(false)}
              className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* ================= Filters Bar ================= */}

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="search"
            placeholder="Search name, email, phone…"
            className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-700 shadow-sm outline-none placeholder:text-slate-400 focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        {filterOptions.map((filter) => (
          <select
            key={filter.label}
            className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-600 shadow-sm outline-none hover:bg-slate-50 focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
          >
            {filter.options.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        ))}

        <button className="h-10 rounded-xl bg-slate-100 px-4 text-sm font-semibold text-slate-800 hover:bg-slate-200">
          Save view
        </button>
      </div>

      {/* ================= Bulk Actions Bar ================= */}

      {selectedIds.length > 0 && (
        <div className="mt-4 flex items-center gap-3 rounded-xl border border-blue-200 bg-blue-50 px-5 py-3">
          <span className="text-sm font-semibold text-blue-700">
            {selectedIds.length} selected
          </span>
          <span className="flex-1" />
          <button className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-white">
            Assign owner
          </button>
          <button className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-white">
            Change status
          </button>
          <button className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-white">
            Add to list
          </button>
          <button className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-white">
            Export
          </button>
          <button className="rounded-lg px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-100">
            Delete
          </button>
        </div>
      )}

      {/* ================= Table ================= */}

      <section className="mt-4 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="w-9 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={allChecked}
                    onChange={toggleAll}
                    aria-label="Select all"
                    className="h-4 w-4 rounded border-slate-300 text-blue-600"
                  />
                </th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Name
                </th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Company
                </th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Email
                </th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Phone
                </th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Owner
                </th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Last activity
                </th>
                <th className="w-12 px-4 py-3" />
              </tr>
            </thead>

            <tbody>
              {contacts.map((c) => (
                <tr
                  key={c.id}
                  className="border-b border-slate-100 last:border-0 hover:bg-slate-50/70 transition-colors"
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(c.id)}
                      onChange={() => toggleRow(c.id)}
                      className="h-4 w-4 rounded border-slate-300 text-blue-600"
                    />
                  </td>

                  <td className="px-4 py-3">
                    <Link to={`/contacts/${c.id}`} className="flex items-center gap-3">
                      <div
                        className="h-9 w-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                        style={{ background: c.avatarColor }}
                      >
                        {c.initials}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800">{c.name}</div>
                        <div className="text-xs text-slate-500">{c.designation}</div>
                      </div>
                    </Link>
                  </td>

                  <td className="px-4 py-3 text-sm text-slate-600">{c.company}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{c.email}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{c.phone}</td>

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-7 w-7 rounded-full flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0"
                        style={{ background: c.ownerColor }}
                      >
                        {c.ownerInitial}
                      </div>
                      <span className="text-sm text-slate-700">{c.owner}</span>
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        statusStyles[c.status] || "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-sm text-slate-500">{c.activity}</td>

                  <td className="px-4 py-3 relative">
                    <div ref={(el) => (menuRefs.current[c.id] = el)}>
                      <button
                        onClick={() => toggleMenu(c.id)}
                        aria-label="Actions"
                        className="h-8 w-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                          <circle cx="12" cy="5" r="1.8" />
                          <circle cx="12" cy="12" r="1.8" />
                          <circle cx="12" cy="19" r="1.8" />
                        </svg>
                      </button>

                      {openMenuId === c.id && (
                        <div className="absolute right-4 z-20 mt-1 w-44 rounded-xl border border-slate-200 bg-white py-1 shadow-lg">
                          <Link
                            to={`/contacts/${c.id}`}
                            className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                          >
                            View details
                          </Link>
                          <button
                            className="block w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                            onClick={() => handleEditClick(c)}
                          >
                            Edit
                          </button>
                          <button
                            className="block w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                            onClick={() => console.log("Add to list", c.id)}
                          >
                            Add to list
                          </button>
                          <button
                            className="block w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                            onClick={() => console.log("Log activity", c.id)}
                          >
                            Log activity
                          </button>
                          <hr className="my-1 border-slate-100" />
                          <button
                            className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                            onClick={() => console.log("Delete", c.id)}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ================= Pagination ================= */}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-200 bg-slate-50/50 px-5 py-3">
          <span className="text-sm text-slate-600">Showing 1–25 of 2,418</span>

          <div className="flex items-center gap-1">
            <button className="h-8 w-8 rounded-lg border border-slate-200 text-slate-600 hover:bg-white transition-colors">
              ‹
            </button>
            <button className="h-8 w-8 rounded-lg bg-blue-600 text-white text-sm font-medium shadow-sm">
              1
            </button>
            <button className="h-8 w-8 rounded-lg text-sm font-medium text-slate-600 hover:bg-white transition-colors">
              2
            </button>
            <button className="h-8 w-8 rounded-lg text-sm font-medium text-slate-600 hover:bg-white transition-colors">
              3
            </button>
            <span className="px-1 text-slate-400">…</span>
            <button className="h-8 w-8 rounded-lg text-sm font-medium text-slate-600 hover:bg-white transition-colors">
              97
            </button>
            <button className="h-8 w-8 rounded-lg border border-slate-200 text-slate-600 hover:bg-white transition-colors">
              ›
            </button>
          </div>
        </div>
      </section>

      <EditContactModal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        contact={selectedContact}
        onSave={handleSaveContact}
      />

      <MergeContactModal
        open={openMergeModal}
        onClose={() => setOpenMergeModal(false)}
        onMerge={handleMergeContacts}
      />
    </div>
  );
};

export default ContactMain;