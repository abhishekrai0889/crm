import React, { useState } from "react";
import Table from "../Table";

// Mock data generator
const generateMockData = (count = 50) => {
  const statuses = ["Active", "Inactive", "Pending"];
  const departments = [
    "Engineering",
    "Marketing",
    "Sales",
    "HR",
    "Finance",
    "Design",
  ];
  const roles = [
    "Senior Developer",
    "Team Lead",
    "Manager",
    "Analyst",
    "Designer",
    "Coordinator",
  ];
  const locations = [
    "New York",
    "London",
    "San Francisco",
    "Austin",
    "Toronto",
    "Boston",
    "Seattle",
    "Miami",
  ];
  const names = [
    "John Doe",
    "Jane Smith",
    "Bob Johnson",
    "Alice Brown",
    "Charlie Wilson",
    "Diana Miller",
    "Edward Davis",
    "Fiona Garcia",
    "George Martinez",
    "Helen Rodriguez",
    "Ian Lee",
    "Julia Kim",
    "Kevin Patel",
    "Laura Smith",
    "Michael Johnson",
    "Sarah Williams",
    "David Brown",
    "Emma Jones",
    "James Taylor",
    "Olivia Wilson",
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: names[i % names.length],
    email: `${names[i % names.length].toLowerCase().replace(" ", ".")}@example.com`,
    department: departments[i % departments.length],
    status: statuses[i % statuses.length],
    role: roles[i % roles.length],
    location: locations[i % locations.length],
    joined: new Date(
      2024,
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28) + 1,
    )
      .toISOString()
      .split("T")[0],
    projects: Math.floor(Math.random() * 20) + 1,
    salary: Math.floor(Math.random() * 100000) + 40000,
    performance: ["Excellent", "Good", "Average", "Needs Improvement"][
      Math.floor(Math.random() * 4)
    ],
  }));
};

const mockData = generateMockData(50);

// Advanced columns with modern styling
const columns = [
  {
    key: "id",
    header: "#",
    sortable: true,
    width: "60px",
    render: (value) => (
      <span className="font-mono text-xs bg-gradient-to-r from-slate-200 to-slate-100 px-2 py-0.5 rounded">
        #{String(value).padStart(3, "0")}
      </span>
    ),
  },
  {
    key: "name",
    header: "Employee",
    sortable: true,
    searchable: true,
    render: (value, item) => (
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold shadow-md">
            {value
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white"></div>
        </div>
        <div>
          <div className="font-semibold text-slate-700">{value}</div>
          <div className="text-xs text-slate-400 flex items-center gap-1">
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            {item.role}
          </div>
        </div>
      </div>
    ),
  },
  {
    key: "email",
    header: "Email",
    sortable: true,
    searchable: true,
    render: (value) => (
      <a
        href={`mailto:${value}`}
        className="text-blue-600 hover:text-blue-800 hover:underline transition-colors flex items-center gap-1"
      >
        <svg
          className="w-3.5 h-3.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
        {value}
      </a>
    ),
  },
  {
    key: "department",
    header: "Department",
    sortable: true,
    searchable: true,
    render: (value) => {
      const colors = {
        Engineering: "bg-blue-100 text-blue-700 border-blue-200",
        Marketing: "bg-purple-100 text-purple-700 border-purple-200",
        Sales: "bg-emerald-100 text-emerald-700 border-emerald-200",
        HR: "bg-rose-100 text-rose-700 border-rose-200",
        Finance: "bg-amber-100 text-amber-700 border-amber-200",
        Design: "bg-indigo-100 text-indigo-700 border-indigo-200",
      };
      return (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium border ${colors[value] || "bg-slate-100 text-slate-700 border-slate-200"}`}
        >
          {value}
        </span>
      );
    },
  },
  {
    key: "status",
    header: "Status",
    sortable: true,
    render: (value) => {
      const statusConfig = {
        Active: { color: "emerald", icon: "●" },
        Inactive: { color: "red", icon: "○" },
        Pending: { color: "amber", icon: "◐" },
      };
      const config = statusConfig[value] || { color: "slate", icon: "○" };
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-${config.color}-100 text-${config.color}-700 border border-${config.color}-200`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full bg-${config.color}-500 animate-pulse`}
          ></span>
          {value}
        </span>
      );
    },
  },
  {
    key: "location",
    header: "Location",
    sortable: true,
    render: (value) => (
      <div className="flex items-center gap-1.5 text-slate-600">
        <svg
          className="w-3.5 h-3.5 text-slate-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        {value}
      </div>
    ),
  },
  {
    key: "projects",
    header: "Projects",
    sortable: true,
    render: (value) => (
      <div className="flex items-center gap-2 min-w-[100px]">
        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-1000"
            style={{ width: `${Math.min((value / 20) * 100, 100)}%` }}
          />
        </div>
        <span className="text-xs font-mono font-medium text-slate-600 min-w-[24px]">
          {value}
        </span>
      </div>
    ),
  },
  {
    key: "salary",
    header: "Salary",
    sortable: true,
    render: (value) => (
      <span className="font-mono text-sm font-medium text-emerald-600">
        ${value.toLocaleString()}
      </span>
    ),
  },
  {
    key: "performance",
    header: "Performance",
    sortable: true,
    render: (value) => {
      const perfColors = {
        Excellent: "bg-emerald-100 text-emerald-700",
        Good: "bg-blue-100 text-blue-700",
        Average: "bg-amber-100 text-amber-700",
        "Needs Improvement": "bg-red-100 text-red-700",
      };
      return (
        <span
          className={`px-2 py-0.5 rounded text-xs font-medium ${perfColors[value] || "bg-slate-100 text-slate-700"}`}
        >
          {value}
        </span>
      );
    },
  },
];

// Actions
const rowActions = [
  {
    label: "View",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </svg>
    ),
    onClick: (item) => alert(`👁️ Viewing ${item.name}`),
    className: "text-blue-600 hover:bg-blue-50",
  },
  {
    label: "Edit",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
      </svg>
    ),
    onClick: (item) => alert(`✏️ Editing ${item.name}`),
    className: "text-indigo-600 hover:bg-indigo-50",
  },
  {
    label: "Delete",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
    ),
    onClick: (item) => {
      if (window.confirm(`⚠️ Are you sure you want to delete ${item.name}?`)) {
        alert(`🗑️ Deleted ${item.name}`);
      }
    },
    className: "text-red-600 hover:bg-red-50",
  },
];

// Table toolbar actions
const tableActions = [
  {
    label: "Add User",
    variant: "primary",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4v16m8-8H4"
        />
      </svg>
    ),
    onClick: () => alert("➕ Add new user"),
  },
];

function BasicTable() {
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("🔄 Data refreshed!");
    }, 1000);
  };

  const handleExport = (data, format) => {
    alert(`📊 Exporting ${data.length} records as ${format.toUpperCase()}`);
    console.log("Export data:", data, format);
  };

  const renderExpandedRow = (item) => (
    <div className="grid grid-cols-3 gap-4 p-4 bg-gradient-to-r from-slate-50 to-blue-50/50 rounded-lg">
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase">
          Full Name
        </p>
        <p className="text-sm font-medium text-slate-700">{item.name}</p>
      </div>
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase">Email</p>
        <p className="text-sm font-medium text-slate-700">{item.email}</p>
      </div>
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase">
          Department
        </p>
        <p className="text-sm font-medium text-slate-700">{item.department}</p>
      </div>
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase">Role</p>
        <p className="text-sm font-medium text-slate-700">{item.role}</p>
      </div>
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase">Location</p>
        <p className="text-sm font-medium text-slate-700">{item.location}</p>
      </div>
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase">Projects</p>
        <p className="text-sm font-medium text-slate-700">{item.projects}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Employee Directory
            </h1>
            <p className="text-slate-500 mt-1">
              Manage and view all employee records
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-400">
              {selectedRows.length > 0
                ? `${selectedRows.length} selected`
                : "0 selected"}
            </span>
          </div>
        </div>

        <Table
          columns={columns}
          data={mockData}
          title="Team Members"
          subtitle="Active employees and their details"
          showSearch={true}
          showPagination={true}
          showExport={true}
          showPrint={true}
          showFilter={false}
          showRefresh={true}
         
          showColumnVisibility={true}
          selectable={false}
          onSelectionChange={setSelectedRows}
          actions={rowActions}
          onRowClick={(item) => console.log("Row clicked:", item)}
          onRowDoubleClick={(item) => alert(`👆 Double clicked: ${item.name}`)}
          onRefresh={handleRefresh}
          onExport={handleExport}
          searchableFields={["name", "email", "department", "role", "location"]}
          sortableFields={[
            "id",
            "name",
            "email",
            "department",
            "status",
            "location",
            "joined",
            "projects",
            "salary",
          ]}
          initialSortField="name"
          initialSortDirection="asc"
          itemsPerPage={10}
          itemsPerPageOptions={[5, 10, 25, 50]}
          exportFileName="employees-list"
          loading={loading}
          emptyMessage="No employees found"
          gradientHeader={true}
          stripedRows={true}
          hoverEffect="lift"
          borderRadius="xl"
          shadow="2xl"
          density="normal"
          theme="light"
          stickyHeader={true}
          maxHeight="600px"
          showTotalCount={true}
          showQuickFilters={true}
          showExportOptions={true}
          expandableRows={true}
          renderExpandedRow={renderExpandedRow}
          rowSelectionMode="checkbox"
          tableActions={tableActions}
          rowActionsPosition="end"
          className="backdrop-blur-sm bg-white/95"
          headerClassName="text-slate-700"
          rowClassName="hover:bg-slate-50/80"
          cellClassName="text-slate-600"
          searchPlaceholder="Search employees..."
        />

        {/* Selected Rows Info */}
        {selectedRows.length > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-slideUp">
            <div className="flex items-center gap-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-2xl text-white">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="font-medium">
                  {selectedRows.length} selected
                </span>
              </div>
              <div className="w-px h-6 bg-white/20"></div>
              <button
                onClick={() =>
                  alert(`Processing ${selectedRows.length} items...`)
                }
                className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-sm font-medium"
              >
                Process
              </button>
              <button
                onClick={() => setSelectedRows([])}
                className="text-white/70 hover:text-white transition-colors"
              >
                <Close className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BasicTable;
