// pages/Team.jsx
// Team management — members list (reusable Table), Add member modal
// and the Roles & Permissions (RBAC) reference. Mock data, no APIs yet.
import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Security as SecurityIcon,
} from "@mui/icons-material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import BadgeIcon from "@mui/icons-material/Badge";
import GroupsIcon from "@mui/icons-material/Groups";
import CheckIcon from "@mui/icons-material/Check";
import AddIcon from "@mui/icons-material/Add";
import LockIcon from "@mui/icons-material/Lock";
import Table from "../ui/Table";
import Modal from "../ui/Modal";
import TextInput from "../ui/TextInput";
import Selectbox from "../ui/Selectbox";
import {
  initialMembers,
  roles,
  permissionModules,
  permissionCapabilities,
} from "../data/team";

// ---- Permission scope rendering (shared by grid + capabilities) ----
const scopeStyles = {
  full: { label: "Full", classes: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  own: { label: "Own", classes: "bg-amber-50 text-amber-700 border-amber-200" },
  read: { label: "Read", classes: "bg-blue-50 text-blue-700 border-blue-200" },
};

const ScopeCell = ({ value }) => {
  if (!value || value === "none") {
    return <span className="text-slate-300 font-bold">—</span>;
  }
  if (value === "yes") {
    return (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-50 text-emerald-600">
        <CheckIcon sx={{ fontSize: 15 }} />
      </span>
    );
  }
  const style = scopeStyles[value];
  return (
    <span
      className={`inline-block px-2 py-0.5 rounded-md text-[11px] font-bold border ${style.classes}`}
    >
      {style.label}
    </span>
  );
};

const SEAT_LIMIT = 10;

const avatarPalette = [
  "from-blue-500 to-indigo-600",
  "from-emerald-500 to-teal-600",
  "from-violet-500 to-purple-600",
  "from-amber-500 to-orange-600",
  "from-cyan-500 to-sky-600",
  "from-rose-500 to-pink-600",
];

const getInitials = (name) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

const rolePill = (role) => {
  const config = roles.find((r) => r.key === role);
  return (
    <span
      className={`px-3 py-1 rounded-lg text-xs font-bold border ${
        config?.pillClasses || "bg-slate-100 text-slate-700 border-slate-200"
      }`}
    >
      {role}
    </span>
  );
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const emptyForm = { name: "", email: "", role: "", title: "" };

const Team = () => {
  const [activeTab, setActiveTab] = useState("members");
  const [members, setMembers] = useState(initialMembers);
  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [selectedRole, setSelectedRole] = useState(roles[0].key);

  const activeSeats = members.filter((m) => m.status !== "Inactive").length;

  // ---------- Add member ----------
  const openAddModal = () => {
    setForm(emptyForm);
    setErrors({});
    setShowAddModal(true);
  };

  const handleFormChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleAddMember = (e) => {
    e.preventDefault();
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Full name is required";
    if (!form.email.trim()) {
      nextErrors.email = "Work email is required";
    } else if (!emailPattern.test(form.email.trim())) {
      nextErrors.email = "Enter a valid email address";
    } else if (
      members.some(
        (m) => m.email.toLowerCase() === form.email.trim().toLowerCase(),
      )
    ) {
      nextErrors.email = "A member with this email already exists";
    }
    if (!form.role) nextErrors.role = "Role is required";

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setMembers((prev) => [
      ...prev,
      {
        id: Math.max(...prev.map((m) => m.id)) + 1,
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        role: form.role,
        title: form.title.trim(),
        status: "Active",
        twoFA: "Not set up",
        lastActive: "Just now",
      },
    ]);
    setShowAddModal(false);
    toast.success(`${form.name.trim()} added to the team`);
  };

  // ---------- Row actions ----------
  const handleDeactivate = (member) => {
    if (member.isSelf) {
      toast.error("You cannot deactivate your own account");
      return;
    }
    setMembers((prev) =>
      prev.map((m) =>
        m.id === member.id
          ? { ...m, status: m.status === "Inactive" ? "Active" : "Inactive" }
          : m,
      ),
    );
    toast.info(
      `${member.name} ${member.status === "Inactive" ? "reactivated" : "deactivated"}`,
    );
  };

  const handleRoleChange = (member, role) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === member.id ? { ...m, role } : m)),
    );
    toast.success(`${member.name} is now ${role}`);
  };

  // ---------- Table config ----------
  const columns = [
    {
      key: "name",
      header: "Member",
      render: (value, item, index) => (
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-full bg-gradient-to-br ${
              avatarPalette[index % avatarPalette.length]
            } flex items-center justify-center text-white text-xs font-semibold shadow-md flex-shrink-0`}
          >
            {getInitials(value)}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-700">
              {value}
              {item.isSelf && (
                <span className="ml-1.5 text-xs font-normal text-slate-400">
                  (you)
                </span>
              )}
            </p>
            <p className="text-xs text-slate-400">{item.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "role",
      header: "Role",
      render: (value) => rolePill(value),
    },
    {
      key: "status",
      header: "Status",
      render: (value) => {
        const classes = {
          Active: "bg-emerald-100 text-emerald-700 border-emerald-300",
          Pending: "bg-amber-100 text-amber-700 border-amber-300",
          Inactive: "bg-red-100 text-red-700 border-red-300",
        };
        return (
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
              classes[value] || "bg-slate-100 text-slate-700 border-slate-300"
            }`}
          >
            {value}
          </span>
        );
      },
    },
    {
      key: "twoFA",
      header: "2FA",
      render: (value) => (
        <span
          className={`text-xs font-medium ${
            value === "Enabled"
              ? "text-emerald-600"
              : value === "Not set up"
                ? "text-amber-600"
                : "text-slate-400"
          }`}
        >
          {value}
        </span>
      ),
    },
    { key: "lastActive", header: "Last active", sortable: false },
  ];

  const actionMenuItems = [
    {
      label: "Make Admin",
      onClick: (item) => handleRoleChange(item, "Admin"),
    },
    {
      label: "Make Manager",
      onClick: (item) => handleRoleChange(item, "Manager"),
    },
    {
      label: "Make User",
      onClick: (item) => handleRoleChange(item, "User"),
    },
    {
      label: "Deactivate / Reactivate",
      danger: true,
      onClick: handleDeactivate,
    },
  ];

  const roleOptions = roles.map((r) => ({
    value: r.key,
    label: `${r.key} — ${r.key === "Admin" ? "full workspace access" : r.key === "Manager" ? "all records, no settings" : "own records only"}`,
  }));

  const memberCount = (role) => members.filter((m) => m.role === role).length;

  return (
    <div>
      {/* Page header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Team management
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Add teammates, assign roles and review what each role can do.
          </p>
        </div>
        <div className="text-sm text-slate-500">
          <span className="font-semibold text-slate-700">
            {activeSeats} of {SEAT_LIMIT} seats
          </span>{" "}
          used
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-slate-200 mb-6">
        {[
          {
            key: "members",
            label: `Members · ${members.length}`,
            icon: <GroupsIcon sx={{ fontSize: 17 }} />,
          },
          {
            key: "roles",
            label: "Roles & permissions",
            icon: <SecurityIcon sx={{ fontSize: 17 }} />,
          },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border-b-2 -mb-px transition-all duration-200 ${
              activeTab === tab.key
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* ---------- Members tab ---------- */}
      {activeTab === "members" && (
        <Table
          title="Team members"
          subtitle="People with access to this workspace"
          columns={columns}
          data={members}
          searchPlaceholder="Search members..."
          itemsPerPage={10}
          actionMenuItems={actionMenuItems}
          toolbarActions={[
            {
              label: "Add member",
              variant: "primary",
              icon: <PersonAddIcon sx={{ fontSize: 18 }} />,
              onClick: openAddModal,
            },
          ]}
          showColumnVisibility={false}
          showRefresh={false}
          emptyMessage="No team members found"
        />
      )}

      {/* ---------- Roles & permissions tab (role-centric) ---------- */}
      {activeTab === "roles" && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          {/* Roles selector — scales vertically to any number of roles */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-slate-200 rounded-2xl shadow-md overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-200">
                <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wide">
                  Roles
                </h2>
              </div>
              <div className="p-2 flex lg:flex-col gap-1.5 overflow-x-auto">
                {roles.map((role) => {
                  const isActive = selectedRole === role.key;
                  return (
                    <button
                      key={role.key}
                      onClick={() => setSelectedRole(role.key)}
                      className={`flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-left transition-all duration-200 flex-shrink-0 lg:w-full ${
                        isActive
                          ? "bg-blue-50 ring-1 ring-blue-200"
                          : "hover:bg-slate-50"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            isActive ? "bg-blue-600" : "bg-slate-300"
                          }`}
                        />
                        <span
                          className={`text-sm font-semibold ${
                            isActive ? "text-blue-700" : "text-slate-700"
                          }`}
                        >
                          {role.key}
                        </span>
                      </span>
                      <span className="text-xs font-medium text-slate-400">
                        {memberCount(role.key)}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="p-2 border-t border-slate-200">
                <button
                  disabled
                  className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 border border-dashed border-slate-300 cursor-not-allowed"
                  title="Custom roles arrive in Phase 2"
                >
                  <AddIcon sx={{ fontSize: 17 }} />
                  Add role
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">
                    Phase 2
                  </span>
                </button>
              </div>
            </div>

            {/* Scope legend */}
            <div className="mt-4 bg-white border border-slate-200 rounded-2xl shadow-sm p-4 space-y-2">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">
                Scope
              </p>
              {[
                { v: "full", d: "All records" },
                { v: "own", d: "Own / assigned only" },
                { v: "read", d: "Read-only" },
                { v: "yes", d: "Allowed" },
                { v: "none", d: "No access" },
              ].map((s) => (
                <div key={s.v} className="flex items-center gap-2.5">
                  <ScopeCell value={s.v} />
                  <span className="text-xs text-slate-500">{s.d}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Permissions for the selected role */}
          <div className="lg:col-span-3 space-y-4">
            {/* Role header */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-md p-5">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                {rolePill(selectedRole)}
                <span className="text-sm text-slate-400 font-medium">
                  {memberCount(selectedRole)} member
                  {memberCount(selectedRole) !== 1 ? "s" : ""}
                </span>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">
                {roles.find((r) => r.key === selectedRole)?.description}
              </p>
            </div>

            {/* Developer note */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-800 flex items-start gap-2">
              <LockIcon sx={{ fontSize: 17 }} className="mt-0.5 flex-shrink-0" />
              <span>
                Read-only reference of backend-enforced policy. Every API route
                checks role + ownership server-side — the UI only mirrors it.
                Editable custom roles and field-level permissions arrive in
                Phase 2.
              </span>
            </div>

            {/* Record permissions — CRUD verbs separated per resource */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200">
                <h3 className="text-base font-bold text-slate-800">
                  Record permissions
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px]">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/60">
                      <th className="px-6 py-2.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Resource
                      </th>
                      {["View", "Create", "Edit", "Delete"].map((v) => (
                        <th
                          key={v}
                          className="px-3 py-2.5 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider"
                        >
                          {v}
                        </th>
                      ))}
                      <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Special
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {permissionModules.map((group) => (
                      <React.Fragment key={group.module}>
                        <tr className="bg-slate-50/40">
                          <td
                            colSpan={6}
                            className="px-6 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-[0.12em]"
                          >
                            {group.module}
                          </td>
                        </tr>
                        {group.resources.map((res) => (
                          <tr
                            key={res.key}
                            className="border-t border-slate-100 hover:bg-blue-50/30 transition-colors"
                          >
                            <td className="px-6 py-3 text-sm font-medium text-slate-700">
                              {res.label}
                            </td>
                            {["view", "create", "edit", "remove"].map((verb) => (
                              <td key={verb} className="px-3 py-3 text-center">
                                <ScopeCell value={res[verb][selectedRole]} />
                              </td>
                            ))}
                            <td className="px-4 py-3">
                              {res.special.filter(
                                (s) =>
                                  s[selectedRole] && s[selectedRole] !== "none",
                              ).length === 0 ? (
                                <span className="text-slate-300 text-sm">—</span>
                              ) : (
                                <div className="flex flex-wrap gap-1.5">
                                  {res.special
                                    .filter(
                                      (s) =>
                                        s[selectedRole] &&
                                        s[selectedRole] !== "none",
                                    )
                                    .map((s) => (
                                      <span
                                        key={s.label}
                                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold border ${
                                          s[selectedRole] === "own"
                                            ? "bg-amber-50 text-amber-700 border-amber-200"
                                            : "bg-emerald-50 text-emerald-700 border-emerald-200"
                                        }`}
                                      >
                                        {s.label}
                                        {s[selectedRole] === "own" && (
                                          <span className="opacity-70">
                                            · Own
                                          </span>
                                        )}
                                      </span>
                                    ))}
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Capabilities — single-action platform permissions */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200">
                <h3 className="text-base font-bold text-slate-800">
                  Platform capabilities
                </h3>
              </div>
              <div className="divide-y divide-slate-100">
                {permissionCapabilities.map((group) => (
                  <div key={group.module} className="py-2">
                    <p className="px-6 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-[0.12em]">
                      {group.module}
                    </p>
                    {group.items.map((item) => (
                      <div
                        key={item.label}
                        className="px-6 py-2.5 flex items-center justify-between gap-4 hover:bg-blue-50/30 transition-colors"
                      >
                        <span className="text-sm font-medium text-slate-700">
                          {item.label}
                        </span>
                        <ScopeCell value={item[selectedRole]} />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------- Add member modal ---------- */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add team member"
        size="lg"
        showFooter={false}
      >
        <form onSubmit={handleAddMember} className="space-y-4" noValidate>
          <TextInput
            label="Full name"
            required
            placeholder="Jane Cooper"
            value={form.name}
            onChange={handleFormChange("name")}
            error={errors.name}
            icon={PersonIcon}
            validateOnFocus={false}
            scrollToError={false}
          />
          <TextInput
            label="Work email"
            required
            type="email"
            placeholder="jane@acme.com"
            value={form.email}
            onChange={handleFormChange("email")}
            error={errors.email}
            icon={EmailIcon}
            validateOnFocus={false}
            scrollToError={false}
          />
          <Selectbox
            label="Role"
            required
            placeholder="Select a role"
            value={form.role}
            onChange={handleFormChange("role")}
            error={errors.role}
            options={roleOptions}
            scrollToError={false}
          />
          <TextInput
            label="Job title"
            placeholder="e.g. Sales Executive (optional)"
            value={form.title}
            onChange={handleFormChange("title")}
            icon={BadgeIcon}
            validateOnFocus={false}
            scrollToError={false}
          />

          <div className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-xs text-slate-500">
            <strong className="text-slate-700">
              {SEAT_LIMIT - activeSeats} seat
              {SEAT_LIMIT - activeSeats !== 1 ? "s" : ""} remaining
            </strong>{" "}
            on the Growth plan. New members are added as Active with 2FA
            pending setup.
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 rounded-lg font-medium text-slate-700 hover:bg-slate-100 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-200 transition-all duration-200 flex items-center gap-2"
            >
              <PersonAddIcon sx={{ fontSize: 18 }} />
              Add member
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Team;
