// data/team.js
// Mock data for Team management — replace with API calls later.

export const initialMembers = [
  {
    id: 1,
    name: "Sumeet Sarna",
    email: "sumeet@acme.com",
    role: "Admin",
    status: "Active",
    twoFA: "Enabled",
    lastActive: "Just now",
    isSelf: true,
  },
  {
    id: 2,
    name: "Avneet Singh",
    email: "avneet@acme.com",
    role: "Admin",
    status: "Active",
    twoFA: "Enabled",
    lastActive: "14 minutes ago",
  },
  {
    id: 3,
    name: "Priya Khanna",
    email: "priya@acme.com",
    role: "Manager",
    status: "Active",
    twoFA: "Enabled",
    lastActive: "2 hours ago",
  },
  {
    id: 4,
    name: "Maya Rao",
    email: "maya@acme.com",
    role: "Manager",
    status: "Active",
    twoFA: "Not set up",
    lastActive: "Yesterday",
  },
  {
    id: 5,
    name: "Jay Dhillon",
    email: "jay@acme.com",
    role: "User",
    status: "Active",
    twoFA: "Enabled",
    lastActive: "3 hours ago",
  },
  {
    id: 6,
    name: "Nina Bedi",
    email: "nina@acme.com",
    role: "User",
    status: "Pending",
    twoFA: "—",
    lastActive: "Added 2 days ago",
  },
  {
    id: 7,
    name: "Rohan Talwar",
    email: "rohan@acme.com",
    role: "User",
    status: "Inactive",
    twoFA: "—",
    lastActive: "May 12, 2026",
  },
  {
    id: 8,
    name: "Kabir Mehta",
    email: "kabir@acme.com",
    role: "User",
    status: "Active",
    twoFA: "Not set up",
    lastActive: "Monday",
  },
];

export const roles = [
  {
    key: "Admin",
    description:
      "Full access to all modules, settings, billing, team management and the audit log. At least one Admin must exist at all times.",
    pillClasses: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    key: "Manager",
    description:
      "Full access to records in all modules. Cannot manage users, billing or workspace settings.",
    pillClasses: "bg-violet-50 text-violet-700 border-violet-200",
  },
  {
    key: "User",
    description:
      "Access to records they own or are assigned to. Cannot delete records or access settings and billing.",
    pillClasses: "bg-slate-100 text-slate-700 border-slate-200",
  },
];

/*
 * Backend-enforced policy reference (Phase 0 predefined roles), mirroring
 * PRD D.3.4. Two shapes:
 *
 *  - permissionModules: record-type resources with granular CRUD verbs
 *    (view / create / edit / remove) plus resource-specific "special" actions.
 *  - permissionCapabilities: single-action platform capabilities.
 *
 * Scope tokens per role: "full" | "own" | "read" | "yes" | "none"
 * Values are keyed by role.key so custom roles (Phase 2) just add a key.
 */
export const permissionModules = [
  {
    module: "Sales",
    resources: [
      {
        key: "contacts",
        label: "Contacts",
        view: { Admin: "full", Manager: "full", User: "own" },
        create: { Admin: "yes", Manager: "yes", User: "yes" },
        edit: { Admin: "full", Manager: "full", User: "own" },
        remove: { Admin: "yes", Manager: "yes", User: "none" },
        special: [],
      },
      {
        key: "companies",
        label: "Companies",
        view: { Admin: "full", Manager: "full", User: "own" },
        create: { Admin: "yes", Manager: "yes", User: "yes" },
        edit: { Admin: "full", Manager: "full", User: "own" },
        remove: { Admin: "yes", Manager: "yes", User: "none" },
        special: [],
      },
      {
        key: "deals",
        label: "Deals",
        view: { Admin: "full", Manager: "full", User: "own" },
        create: { Admin: "yes", Manager: "yes", User: "yes" },
        edit: { Admin: "full", Manager: "full", User: "own" },
        remove: { Admin: "yes", Manager: "yes", User: "none" },
        special: [
          { label: "Mark Won / Lost", Admin: "yes", Manager: "yes", User: "own" },
        ],
      },
      {
        key: "leads",
        label: "Leads",
        view: { Admin: "full", Manager: "full", User: "own" },
        create: { Admin: "yes", Manager: "yes", User: "yes" },
        edit: { Admin: "full", Manager: "full", User: "own" },
        remove: { Admin: "yes", Manager: "yes", User: "none" },
        special: [
          { label: "Qualify", Admin: "yes", Manager: "yes", User: "own" },
        ],
      },
    ],
  },
  {
    module: "Marketing",
    resources: [
      {
        key: "campaigns",
        label: "Campaigns",
        view: { Admin: "full", Manager: "full", User: "none" },
        create: { Admin: "yes", Manager: "yes", User: "none" },
        edit: { Admin: "full", Manager: "full", User: "none" },
        remove: { Admin: "yes", Manager: "yes", User: "none" },
        special: [
          { label: "Send", Admin: "yes", Manager: "yes", User: "none" },
        ],
      },
      {
        key: "lists",
        label: "Contact lists",
        view: { Admin: "full", Manager: "full", User: "read" },
        create: { Admin: "yes", Manager: "yes", User: "none" },
        edit: { Admin: "full", Manager: "full", User: "none" },
        remove: { Admin: "yes", Manager: "yes", User: "none" },
        special: [],
      },
    ],
  },
  {
    module: "Support",
    resources: [
      {
        key: "tickets",
        label: "Tickets",
        view: { Admin: "full", Manager: "full", User: "own" },
        create: { Admin: "yes", Manager: "yes", User: "own" },
        edit: { Admin: "full", Manager: "full", User: "own" },
        remove: { Admin: "yes", Manager: "yes", User: "none" },
        special: [
          { label: "Merge / Split", Admin: "yes", Manager: "yes", User: "none" },
        ],
      },
    ],
  },
  {
    module: "Projects",
    resources: [
      {
        key: "projects",
        label: "Projects",
        view: { Admin: "full", Manager: "full", User: "own" },
        create: { Admin: "yes", Manager: "yes", User: "own" },
        edit: { Admin: "full", Manager: "full", User: "own" },
        remove: { Admin: "yes", Manager: "yes", User: "none" },
        special: [],
      },
      {
        key: "tasks",
        label: "Tasks",
        view: { Admin: "full", Manager: "full", User: "own" },
        create: { Admin: "yes", Manager: "yes", User: "yes" },
        edit: { Admin: "full", Manager: "full", User: "own" },
        remove: { Admin: "yes", Manager: "yes", User: "none" },
        special: [
          { label: "Complete", Admin: "yes", Manager: "yes", User: "own" },
        ],
      },
    ],
  },
  {
    module: "Insights",
    resources: [
      {
        key: "reports",
        label: "Reports",
        view: { Admin: "full", Manager: "full", User: "own" },
        create: { Admin: "yes", Manager: "yes", User: "none" },
        edit: { Admin: "full", Manager: "full", User: "none" },
        remove: { Admin: "yes", Manager: "yes", User: "none" },
        special: [
          { label: "Share", Admin: "yes", Manager: "yes", User: "none" },
        ],
      },
      {
        key: "dashboards",
        label: "Dashboards",
        view: { Admin: "full", Manager: "full", User: "own" },
        create: { Admin: "yes", Manager: "yes", User: "none" },
        edit: { Admin: "full", Manager: "full", User: "none" },
        remove: { Admin: "yes", Manager: "yes", User: "none" },
        special: [],
      },
    ],
  },
];

export const permissionCapabilities = [
  {
    module: "Data",
    items: [
      { label: "Import records", Admin: "yes", Manager: "yes", User: "none" },
      { label: "Export records", Admin: "yes", Manager: "yes", User: "own" },
      { label: "Custom fields — manage", Admin: "yes", Manager: "none", User: "none" },
      { label: "Data deletion (GDPR erasure)", Admin: "yes", Manager: "none", User: "none" },
    ],
  },
  {
    module: "Automation & API",
    items: [
      { label: "Workflow automations — manage", Admin: "yes", Manager: "none", User: "none" },
      { label: "API tokens — personal", Admin: "yes", Manager: "yes", User: "yes" },
      { label: "API tokens — view / revoke others'", Admin: "yes", Manager: "none", User: "none" },
      { label: "Webhooks — manage", Admin: "yes", Manager: "none", User: "none" },
    ],
  },
  {
    module: "Administration",
    items: [
      { label: "Team — add / deactivate members", Admin: "yes", Manager: "none", User: "none" },
      { label: "Role assignment — change", Admin: "yes", Manager: "none", User: "none" },
      { label: "Billing — view / manage", Admin: "yes", Manager: "none", User: "none" },
      { label: "Workspace settings — edit", Admin: "yes", Manager: "none", User: "none" },
      { label: "Audit log — view", Admin: "yes", Manager: "none", User: "none" },
    ],
  },
];
