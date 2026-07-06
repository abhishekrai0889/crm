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

// Backend-enforced policy reference (Phase 0 roles).
// Values: "full" | "own" | "yes" | "none" | custom label strings
export const permissionsMatrix = [
  { area: "Contacts & companies — view / edit", admin: "Full", manager: "Full", user: "Own" },
  { area: "Contacts — delete / restore", admin: "✓", manager: "✓", user: "—" },
  { area: "Deals — view / edit", admin: "Full", manager: "Full", user: "Own" },
  { area: "Deals — delete", admin: "✓", manager: "✓", user: "—" },
  { area: "Deals — mark Won / Lost", admin: "✓", manager: "✓", user: "Own" },
  { area: "Leads — view / edit / qualify", admin: "Full", manager: "Full", user: "Own" },
  { area: "Tickets — view / reply", admin: "Full", manager: "Full", user: "Own" },
  { area: "Tickets — delete / merge", admin: "✓", manager: "✓", user: "—" },
  { area: "Projects & tasks", admin: "Full", manager: "Full", user: "Own" },
  { area: "Campaigns — create / send", admin: "✓", manager: "✓", user: "—" },
  { area: "Reports — view", admin: "All", manager: "All", user: "Own" },
  { area: "Reports & dashboards — create / share", admin: "✓", manager: "✓", user: "—" },
  { area: "Import / export data", admin: "✓", manager: "✓", user: "Export own" },
  { area: "Custom fields — manage", admin: "✓", manager: "—", user: "—" },
  { area: "Workflow automations — manage", admin: "✓", manager: "—", user: "—" },
  { area: "API tokens — personal", admin: "✓", manager: "✓", user: "✓" },
  { area: "Webhooks — manage", admin: "✓", manager: "—", user: "—" },
  { area: "Team — add / deactivate / roles", admin: "✓", manager: "—", user: "—" },
  { area: "Billing & workspace settings", admin: "✓", manager: "—", user: "—" },
  { area: "Audit log — view", admin: "✓", manager: "—", user: "—" },
  { area: "GDPR data deletion", admin: "✓", manager: "—", user: "—" },
];
