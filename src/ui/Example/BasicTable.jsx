import React, { useState } from "react";
import PageLayout from "../../components/common/PageLayout";
import Table from "../Table";
import { motion } from "framer-motion";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import CancelIcon from "@mui/icons-material/Cancel";

const BasicTable = () => {
  const [partners, setPartners] = useState([
    {
      id: 5,
      name: "Anshuman Singh",
      location: "Meerut Division",
      registrationDate: "25 Dec 2025, 10:42 am",
      createdBy: "User",
      currentPlan: "-",
      assignedReviewer: "Platform Admin",
      reviewStatus: "Approved",
    },
    {
      id: 15,
      name: "Applicant A",
      location: "Marion",
      registrationDate: "02 Jan 2026, 04:05 pm",
      createdBy: "Admin",
      currentPlan: "-",
      assignedReviewer: "Platform Admin",
      reviewStatus: "Approved",
    },
    // ... more data
  ]);

  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(false);

  // Column definitions
  const columns = [
    {
      key: "id",
      header: "Partner ID",
      sortable: true,
      width: "100px",
      render: (value) => (
        <span className="font-mono text-sm font-medium text-slate-600">
          {value}
        </span>
      ),
    },
    {
      key: "name",
      header: "Partner Name",
      sortable: true,
      searchable: true,
      render: (value) => (
        <div className="flex items-center gap-2">
          {/* <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-semibold shadow-md">
            {value.charAt(0)}
          </div> */}
          <span className="text-sm font-medium text-slate-700">{value}</span>
        </div>
      ),
    },
    {
      key: "location",
      header: "Location",
      sortable: true,
      searchable: true,
      render: (value) => (
        <span className="text-sm text-slate-600">{value}</span>
      ),
    },
    {
      key: "registrationDate",
      header: "Registration Date",
      sortable: true,
      render: (value) => (
        <span className="text-sm text-slate-600 whitespace-nowrap">
          {value}
        </span>
      ),
    },
    {
      key: "createdBy",
      header: "Created By",
      sortable: true,
      render: (value) => (
        <span
          className={`px-2 py-0.5 rounded-full text-xs font-medium ${
            value === "Admin"
              ? "bg-purple-100 text-purple-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: "currentPlan",
      header: "Current Plan",
      render: (value) => (
        <span className="text-sm text-slate-400">{value}</span>
      ),
    },
    {
      key: "assignedReviewer",
      header: "Assigned Reviewer",
      render: (value) => (
        <span className="text-sm text-slate-600">
          {value !== "-" ? (
            <span className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xs font-semibold">
                {value.charAt(0)}
              </span>
              {value}
            </span>
          ) : (
            "-"
          )}
        </span>
      ),
    },
    {
      key: "reviewStatus",
      header: "Review Status",
      sortable: true,
      render: (value) => {
        const statusConfig = {
          Approved: {
            color: "bg-emerald-100 text-emerald-700 border-emerald-300",
            icon: <CheckCircleIcon className="w-3.5 h-3.5" />,
          },
          Pending: {
            color: "bg-amber-100 text-amber-700 border-amber-300",
            icon: <PendingIcon className="w-3.5 h-3.5" />,
          },
          Rejected: {
            color: "bg-red-100 text-red-700 border-red-300",
            icon: <CancelIcon className="w-3.5 h-3.5" />,
          },
        };
        const config = statusConfig[value] || {
          color: "bg-slate-100 text-slate-700 border-slate-300",
          icon: null,
        };
        return (
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${config.color}`}
          >
            {config.icon}
            {value}
          </span>
        );
      },
    },
  ];

  // Action menu items
  const actionMenuItems = [
    {
      label: "View Details",
      icon: "👁️",
      onClick: (item) => alert(`Viewing ${item.name}`),
    },
    {
      label: "Edit Partner",
      icon: "✏️",
      onClick: (item) => alert(`Editing ${item.name}`),
    },
    {
      label: "Delete Partner",
      icon: "🗑️",
      danger: true,
      onClick: (item) => {
        if (window.confirm(`Delete ${item.name}?`)) {
          alert(`Deleted ${item.name}`);
        }
      },
    },
  ];

  // Quick actions
  const actions = [
    {
      label: "Connect",
      icon: "🔗",
      onClick: (item) => alert(`Connecting to ${item.name}`),
      className: "text-blue-600 hover:bg-blue-50",
    },
  ];

  // Toolbar actions
  const toolbarActions = [
    {
      label: "Add Partner",
      variant: "primary",
      icon: <AddIcon className="w-4 h-4" />,
      onClick: () => alert("Add new partner"),
    },
  ];

  // Page actions
  const pageActions = [
    {
      label: "Bulk Register",
      variant: "success",
      icon: "📤",
      onClick: () => alert("Bulk register partners"),
    },
    {
      label: "Export All",
      variant: "secondary",
      icon: "📊",
      onClick: () => alert("Export all data"),
    },
  ];

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleExport = (data) => {
    console.log("Exporting data:", data);
    alert(`Exporting ${data.length} records`);
  };

  return (
    <PageLayout
      // title="Individual Partners"
      // subtitle="Manage and review partner applications"
      // actions={pageActions}
    >
      <Table
        columns={columns}
        data={partners}
        selectable={true}
        selectedRows={selectedRows}
        onSelectionChange={setSelectedRows}
        actions={actions}
        actionMenuItems={actionMenuItems}
        toolbarActions={toolbarActions}
        onRefresh={handleRefresh}
        onExport={handleExport}
        searchableFields={["name", "location", "createdBy"]}
        sortableFields={[
          "id",
          "name",
          "location",
          "registrationDate",
          "createdBy",
          "reviewStatus",
        ]}
        itemsPerPage={10}
        loading={loading}
        gradientHeader={true}
        stripedRows={true}
        hoverEffect="default"
        theme="light"
        title="Individual Partners"
        subtitle="Manage and review partner applications"
        searchPlaceholder="Search partners..."
        emptyMessage="No partners found"
        statusKey="reviewStatus"
        statusColors={{
          Approved: "bg-emerald-100 text-emerald-700 border-emerald-300",
          Pending: "bg-amber-100 text-amber-700 border-amber-300",
          Rejected: "bg-red-100 text-red-700 border-red-300",
        }}
        statusIcons={{
          Approved: "✓",
          Pending: "◐",
          Rejected: "✕",
        }}
        expandable={true}
        renderExpandedRow={(item) => (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase">
                Partner ID
              </p>
              <p className="text-sm font-medium text-slate-700">{item.id}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase">
                Name
              </p>
              <p className="text-sm font-medium text-slate-700">{item.name}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase">
                Location
              </p>
              <p className="text-sm font-medium text-slate-700">
                {item.location}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase">
                Created By
              </p>
              <p className="text-sm font-medium text-slate-700">
                {item.createdBy}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase">
                Review Status
              </p>
              <p className="text-sm font-medium text-slate-700">
                {item.reviewStatus}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase">
                Assigned Reviewer
              </p>
              <p className="text-sm font-medium text-slate-700">
                {item.assignedReviewer}
              </p>
            </div>
          </div>
        )}
      />
    </PageLayout>
  );
};

export default BasicTable;
