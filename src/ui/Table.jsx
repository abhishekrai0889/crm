import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SearchIcon from "@mui/icons-material/Search";
import DownloadIcon from "@mui/icons-material/Download";
import RefreshIcon from "@mui/icons-material/Refresh";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import CloseIcon from "@mui/icons-material/Close";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SwapVertRoundedIcon from "@mui/icons-material/SwapVertRounded";

const Table = ({
  // Core props
  columns = [],
  data = [],
  title = "",
  subtitle = "",

  // Search & Filter
  showSearch = true,
  searchPlaceholder = "Search...",
  searchableFields = [],
  onSearch,

  // Pagination
  showPagination = true,
  itemsPerPage = 10,
  itemsPerPageOptions = [10, 25, 50, 100],
  onPageChange,
  totalItems,

  // Selection
  selectable = false,
  selectedRows = [],
  onSelectionChange,
  rowKey = "id",

  // Actions
  actions = [],
  actionMenuItems = [],
  onActionClick,

  // Toolbar
  toolbarActions = [],
  showExport = true,
  showRefresh = true,
  showColumnVisibility = true,
  onExport,
  onRefresh,

  // Styling
  className = "",
  headerClassName = "",
  bodyClassName = "",
  rowClassName = "",
  cellClassName = "",
  loading = false,
  emptyMessage = "No data available",
  gradientHeader = true,
  stripedRows = true,
  hoverEffect = "default",
  borderRadius = "xl",
  shadow = "md",
  density = "normal",
  theme = "light",
  stickyHeader = false,
  maxHeight = "auto",

  // Status
  statusKey = "status",
  statusColors = {},
  statusIcons = {},

  // Expandable
  expandable = false,
  renderExpandedRow,

  // Custom
  customFilters = null,
  toolbarLeft = null,
  toolbarRight = null,
}) => {
  // ==================== STATE ====================
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [internalSelectedRows, setInternalSelectedRows] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState(
    columns.filter((col) => col.visible !== false).map((col) => col.key),
  );
  const [showColumnFilter, setShowColumnFilter] = useState(false);
  const [expandedRows, setExpandedRows] = useState([]);
  const [actionMenuOpen, setActionMenuOpen] = useState(null);

  // ==================== REFS ====================
  const tableRef = useRef(null);

  // ==================== HELPERS ====================
  const getNestedValue = (obj, path) => {
    return path.split(".").reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : null;
    }, obj);
  };

  const getRowKey = (item) => {
    return item[rowKey] || item.id || item._id || JSON.stringify(item);
  };

  // ==================== STYLING ====================
  const themeClasses = {
    light: {
      bg: "bg-white",
      border: "border-slate-200",
      text: "text-slate-700",
      header: "bg-gradient-to-r from-slate-50 to-slate-100",
      hover: "hover:bg-slate-50",
      selected: "bg-blue-50 border-l-4 border-l-blue-500",
    },
    dark: {
      bg: "bg-slate-800",
      border: "border-slate-700",
      text: "text-slate-200",
      header: "bg-slate-900",
      hover: "hover:bg-slate-700",
      selected: "bg-blue-900/30 border-l-4 border-l-blue-500",
    },
    glass: {
      bg: "bg-white/80 backdrop-blur-xl",
      border: "border-white/20",
      text: "text-slate-700",
      header: "bg-white/40 backdrop-blur-sm",
      hover: "hover:bg-white/50",
      selected: "bg-blue-500/10 border-l-4 border-l-blue-500",
    },
  };

  const currentTheme = themeClasses[theme] || themeClasses.light;

  const hoverEffectClasses = {
    none: "",
    default: "hover:bg-slate-50 dark:hover:bg-slate-700/50",
    glow: "hover:shadow-md hover:bg-white dark:hover:bg-slate-700 transition-all duration-300",
    lift: "hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300",
  };

  const densityClasses = {
    compact: "text-xs py-2",
    normal: "text-sm py-3",
    relaxed: "text-base py-4",
  };

  const borderRadiusClasses = {
    none: "rounded-none",
    sm: "rounded-lg",
    md: "rounded-xl",
    lg: "rounded-2xl",
    xl: "rounded-3xl",
  };

  const shadowClasses = {
    none: "shadow-none",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl",
    "2xl": "shadow-2xl",
  };

  // ==================== COMPUTED ====================
  const searchableFieldsList =
    searchableFields.length > 0
      ? searchableFields
      : columns.filter((col) => col.searchable !== false).map((col) => col.key);

  const sortableFieldsList = columns
    .filter((col) => col.sortable !== false)
    .map((col) => col.key);

  // Filter data
  const filteredData = useMemo(() => {
    let result = data;

    // Search
    if (searchTerm.trim()) {
      result = result.filter((item) => {
        return searchableFieldsList.some((field) => {
          const value = getNestedValue(item, field);
          if (value === null || value === undefined) return false;
          return String(value).toLowerCase().includes(searchTerm.toLowerCase());
        });
      });
    }

    return result;
  }, [data, searchTerm, searchableFieldsList]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortField) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = getNestedValue(a, sortField);
      const bValue = getNestedValue(b, sortField);

      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }

      const comparison = String(aValue).localeCompare(String(bValue));
      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [filteredData, sortField, sortDirection]);

  // Paginate data
  const paginatedData = useMemo(() => {
    if (!showPagination) return sortedData;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, currentPage, itemsPerPage, showPagination]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const totalItemsCount = totalItems || sortedData.length;

  // ==================== EFFECTS ====================
  useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange(internalSelectedRows);
    }
  }, [internalSelectedRows, onSelectionChange]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // ==================== HANDLERS ====================
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) onSearch(value);
  };

  const handleSort = (field) => {
    if (!sortableFieldsList.includes(field)) return;

    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    if (onPageChange) onPageChange(page);
    if (tableRef.current) {
      tableRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleRowSelect = (rowKey) => {
    setInternalSelectedRows((prev) => {
      if (prev.includes(rowKey)) {
        return prev.filter((key) => key !== rowKey);
      } else {
        return [...prev, rowKey];
      }
    });
  };

  const handleSelectAll = () => {
    const visibleKeys = paginatedData.map((item) => getRowKey(item));
    const allSelected = visibleKeys.every((key) =>
      internalSelectedRows.includes(key),
    );

    if (allSelected) {
      setInternalSelectedRows((prev) =>
        prev.filter((key) => !visibleKeys.includes(key)),
      );
    } else {
      const newSelected = [...internalSelectedRows];
      visibleKeys.forEach((key) => {
        if (!newSelected.includes(key)) {
          newSelected.push(key);
        }
      });
      setInternalSelectedRows(newSelected);
    }
  };

  const toggleColumnVisibility = (key) => {
    if (visibleColumns.includes(key)) {
      if (visibleColumns.length > 1) {
        setVisibleColumns(visibleColumns.filter((k) => k !== key));
      }
    } else {
      setVisibleColumns([...visibleColumns, key]);
    }
  };

  const toggleRowExpansion = (rowKey) => {
    setExpandedRows((prev) =>
      prev.includes(rowKey)
        ? prev.filter((key) => key !== rowKey)
        : [...prev, rowKey],
    );
  };

  const handleActionMenuToggle = (rowKey, event) => {
    event.stopPropagation();
    setActionMenuOpen(actionMenuOpen === rowKey ? null : rowKey);
  };

  const handleActionClick = (action, item, event) => {
    event.stopPropagation();
    setActionMenuOpen(null);
    if (action.onClick) {
      action.onClick(item);
    }
    if (onActionClick) {
      onActionClick(action, item);
    }
  };

  const handleExport = () => {
    if (onExport) {
      onExport(sortedData);
    } else {
      // Default export as CSV
      const headers = columns
        .filter((col) => visibleColumns.includes(col.key))
        .map((col) => col.header || col.key);

      const rows = sortedData.map((item) => {
        return visibleColumns.map((key) => {
          const value = getNestedValue(item, key);
          return value !== null && value !== undefined ? value : "";
        });
      });

      const csvContent = [
        headers.join(","),
        ...rows.map((row) => row.join(",")),
      ].join("\n");

      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${title || "export"}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };

  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh();
    } else {
      setSearchTerm("");
      setCurrentPage(1);
      setInternalSelectedRows([]);
    }
  };

  // ==================== RENDER ====================
  const getVisibleColumns = () => {
    return columns.filter((col) => visibleColumns.includes(col.key));
  };

  const getStatusColor = (status) => {
    if (statusColors[status]) return statusColors[status];
    const defaultColors = {
      Active: "bg-emerald-100 text-emerald-700 border-emerald-300",
      Approved: "bg-emerald-100 text-emerald-700 border-emerald-300",
      Pending: "bg-amber-100 text-amber-700 border-amber-300",
      Inactive: "bg-red-100 text-red-700 border-red-300",
      Rejected: "bg-red-100 text-red-700 border-red-300",
    };
    return (
      defaultColors[status] || "bg-slate-100 text-slate-700 border-slate-300"
    );
  };

  const getStatusIcon = (status) => {
    if (statusIcons[status]) return statusIcons[status];
    const defaultIcons = {
      Active: "●",
      Approved: "✓",
      Pending: "◐",
      Inactive: "○",
      Rejected: "✕",
    };
    return defaultIcons[status] || "•";
  };

  // Loading skeleton
  const renderLoadingSkeleton = () => {
    const rows = Math.min(itemsPerPage, 10);
    return Array.from({ length: rows }).map((_, index) => (
      <tr key={index} className="animate-pulse">
        {selectable && (
          <td className="px-4 py-3">
            <div className="w-4 h-4 bg-slate-200 rounded"></div>
          </td>
        )}
        {getVisibleColumns().map((col, colIndex) => (
          <td key={colIndex} className="px-4 py-3">
            <div className="h-3 bg-slate-200 rounded w-full"></div>
          </td>
        ))}
        {(actions.length > 0 || actionMenuItems.length > 0) && (
          <td className="px-4 py-3">
            <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
          </td>
        )}
      </tr>
    ));
  };

  return (
    <div
      ref={tableRef}
      className={`
        ${currentTheme.bg}
        border ${currentTheme.border}
        ${borderRadiusClasses[borderRadius]}
        ${shadowClasses[shadow]}
        ${className}
        transition-all duration-300
      `}
      style={{ maxHeight }}
    >
      {/* Header Section */}
    {/* ========================= HEADER SECTION ========================= */}

<div
  className="
    border-b
    border-slate-200
    bg-gradient-to-r
    from-white
    via-[#FCFDFF]
    to-[#F5F9FF]
    px-8
    py-7
    rounded-t-[25px]
  "
>

  <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

    {/* Left */}
    <div className="flex-1">

      {(title || subtitle) && (
        <div>

          {title && (
            <h2 className="text-[30px] font-bold tracking-[-0.03em] text-slate-900">
              {title}
            </h2>
          )}

          {subtitle && (
            <p className="mt-2 text-[15px] text-slate-500">
              {subtitle}
            </p>
          )}

        </div>
      )}

    </div>

    {/* Right */}

    <div className="flex flex-wrap items-center justify-end gap-3">

      {toolbarRight}

      {/* Search */}

      {showSearch && (
        <div className="relative w-[330px] max-w-full">

          <SearchIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={handleSearch}
            className="
              h-12
              w-full
              rounded-2xl
              border
              border-slate-200
              bg-white
              pl-12
              pr-4
              text-[15px]
              shadow-sm
              outline-none
              transition-all
              duration-300
              placeholder:text-slate-400
              focus:border-[#2563EB]
              focus:ring-4
              focus:ring-blue-100
            "
          />

        </div>
      )}

      {/* Column Button */}

      {showColumnVisibility && (
        <div className="relative">

          <button
            onClick={() => setShowColumnFilter(!showColumnFilter)}
            className={`
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              border
              border-slate-200
              bg-white
              shadow-sm
              transition-all
              duration-300
              hover:border-blue-300
              hover:bg-blue-50
              hover:text-blue-600
              ${
                showColumnFilter
                  ? "border-blue-300 bg-blue-50 text-blue-600"
                  : "text-slate-600"
              }
            `}
          >
            <ViewColumnIcon className="h-5 w-5" />
          </button>

          {showColumnFilter && (
            <motion.div
              initial={{ opacity: 0, scale: .95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: .95, y: 10 }}
              className="absolute right-0 z-30 mt-3 w-64 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_25px_60px_rgba(15,23,42,.12)]"
            >

              <div className="border-b border-slate-100 px-5 py-4 flex items-center justify-between">

                <span className="font-semibold text-slate-800">
                  Customize Columns
                </span>

                <button
                  onClick={() => setShowColumnFilter(false)}
                  className="rounded-lg p-1 hover:bg-slate-100"
                >
                  <CloseIcon className="h-4 w-4" />
                </button>

              </div>

              <div className="max-h-72 overflow-y-auto p-4 space-y-2">

                {columns.map((col) => (

                  <label
                    key={col.key}
                    className="flex cursor-pointer items-center gap-3 rounded-xl p-3 transition hover:bg-slate-50"
                  >

                    <input
                      type="checkbox"
                      checked={visibleColumns.includes(col.key)}
                      onChange={() => toggleColumnVisibility(col.key)}
                      className="h-4 w-4 rounded border-slate-300 text-blue-600"
                    />

                    <span className="text-sm text-slate-700">
                      {col.header || col.key}
                    </span>

                  </label>

                ))}

              </div>

            </motion.div>
          )}

        </div>
      )}

      {/* Refresh */}

      {showRefresh && (

        <button
          onClick={handleRefresh}
          className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-sm transition-all duration-300 hover:rotate-180 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
        >
          <RefreshIcon className="h-5 w-5" />
        </button>

      )}

      {/* Export */}

      {showExport && (

        <button
          onClick={handleExport}
          className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-sm transition-all duration-300 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
        >
          <DownloadIcon className="h-5 w-5" />
        </button>

      )}

      {/* Action Buttons */}

      {toolbarActions.map((action, index) => (

        <button
          key={index}
          onClick={action.onClick}
          className={`
            flex
            h-12
            items-center
            gap-2
            rounded-2xl
            px-6
            text-[15px]
            font-semibold
            transition-all
            duration-300
            ${
              action.variant === "primary"
                ? "bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white shadow-lg shadow-blue-500/30 hover:-translate-y-0.5 hover:shadow-blue-500/50"
                : action.variant === "success"
                ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white"
                : action.variant === "danger"
                ? "bg-gradient-to-r from-red-500 to-red-600 text-white"
                : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            }
          `}
        >
          {action.icon}
          {action.label}
        </button>

      ))}

    </div>

  </div>

</div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
     <thead
  className={`
    sticky top-0 z-20
    bg-gradient-to-r
    from-[#1D4ED8]
    via-[#2563EB]
    to-[#3B82F6]
    border-b border-blue-700
    shadow-lg
    ${headerClassName}
  `}
>
  <tr className="h-[52px]">

    {/* Select All */}

    {selectable && (
      <th className="w-14 px-4">
        <input
          type="checkbox"
          checked={
            paginatedData.length > 0 &&
            paginatedData.every((item) =>
              internalSelectedRows.includes(getRowKey(item))
            )
          }
          onChange={handleSelectAll}
          className="h-4 w-4 rounded border-white/40 bg-white text-blue-600 focus:ring-2 focus:ring-white"
        />
      </th>
    )}

    {/* Expand */}

    {expandable && <th className="w-10" />}

    {/* Columns */}

    {getVisibleColumns().map((col) => (
      <th
        key={col.key}
        onClick={() =>
          sortableFieldsList.includes(col.key) &&
          handleSort(col.key)
        }
        style={col.width ? { minWidth: col.width } : {}}
        className={`
          px-3
          py-3
          text-left
          whitespace-nowrap
          transition-all
          duration-200
          ${
            sortableFieldsList.includes(col.key)
              ? "cursor-pointer"
              : ""
          }
        `}
      >
        <div
          className={`
            inline-flex
            items-center
            gap-1.5
            rounded-md
           
            py-1
            transition-all
            duration-200
            ${
              sortableFieldsList.includes(col.key)
                ? "hover:bg-white/15"
                : ""
            }
          `}
        >
          <span
            className={`
              text-[13px]
              font-semibold
              tracking-wide
              ${
                sortField === col.key
                  ? "text-white"
                  : "text-blue-100"
              }
            `}
          >
            {col.header || col.key}
          </span>

          {sortableFieldsList.includes(col.key) && (
            <SwapVertRoundedIcon
              sx={{
                fontSize: 16,
                color:
                  sortField === col.key
                    ? "#ffffff"
                    : "rgba(255,255,255,0.75)",
              }}
            />
          )}
        </div>
      </th>
    ))}

    {/* Actions */}

    {(actions.length > 0 || actionMenuItems.length > 0) && (
      <th className="w-24 px-4 text-right">
        <span className="text-[13px] font-semibold tracking-wide text-white">
          Actions
        </span>
      </th>
    )}
  </tr>
</thead>
    <tbody className={`${bodyClassName}`}>
      {loading ? (
        renderLoadingSkeleton()
      ) : paginatedData.length === 0 ? (
        <tr>
          <td
            colSpan={
              getVisibleColumns().length +
              (selectable ? 1 : 0) +
              (expandable ? 1 : 0) +
              (actions.length > 0 || actionMenuItems.length > 0 ? 1 : 0)
            }
            className="px-4 py-20 text-center"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
              </div>
              <p className="text-sm font-semibold text-slate-700">{emptyMessage}</p>
              <p className="text-xs text-slate-400">Try adjusting your search or filter</p>
            </div>
          </td>
        </tr>
      ) : (
        paginatedData.map((item, index) => {
          const rowKey = getRowKey(item);
          const isSelected = internalSelectedRows.includes(rowKey);
          const isExpanded = expandedRows.includes(rowKey);

          return (
            <React.Fragment key={rowKey}>
              <tr
                className={`
                  group border-b border-slate-100 last:border-0
                  transition-colors duration-150
                  ${isSelected ? "bg-slate-50" : "hover:bg-slate-50/70"}
                  ${rowClassName}
                `}
              >
                {selectable && (
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleRowSelect(rowKey)}
                      className="w-3.5 h-3.5 rounded-[4px] border-slate-300 text-slate-900 accent-slate-900 focus:ring-slate-400/30"
                    />
                  </td>
                )}
                {expandable && (
                  <td className="px-2 py-3">
                    <button
                      onClick={() => toggleRowExpansion(rowKey)}
                      className="w-4 h-4 flex items-center justify-center rounded hover:bg-slate-200/60 transition-colors"
                    >
                      <svg
                        className={`w-2.5 h-2.5 text-slate-400 transition-transform ${isExpanded ? "rotate-90" : ""}`}
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path d="M4 2.5L8 6L4 9.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </td>
                )}
                {getVisibleColumns().map((col) => {
                  const value = getNestedValue(item, col.key);

                  // Name-type column: avatar + bold name
                  if (col.avatar) {
                    const initial = String(value || "?").trim().charAt(0).toUpperCase();
                    return (
                      <td key={col.key} className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-[11px] font-semibold flex-shrink-0">
                            {initial}
                          </div>
                          <span className="text-sm font-medium text-slate-800 whitespace-nowrap">
                            {col.render ? col.render(value, item, index) : value}
                          </span>
                        </div>
                      </td>
                    );
                  }

                  // Badge-type column (Created By: User / Admin)
                  if (col.badge) {
                    const badgeStyles =
                      value === "Admin"
                        ? "bg-violet-50 text-violet-600"
                        : "bg-blue-50 text-blue-600";
                    return (
                      <td key={col.key} className="px-4 py-3">
                        <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium ${badgeStyles}`}>
                          {col.render ? col.render(value, item, index) : value}
                        </span>
                      </td>
                    );
                  }

                  // Status-type column — compact dot-style badge
                  if (col.status) {
                    const statusConfig =
                      {
                        Approved: { dot: "bg-teal-500", text: "text-teal-700", bg: "bg-teal-50/80" },
                        Pending: { dot: "bg-orange-500", text: "text-orange-700", bg: "bg-orange-50/80" },
                        Rejected: { dot: "bg-red-500", text: "text-red-700", bg: "bg-red-50/80" },
                      }[value] || { dot: "bg-slate-400", text: "text-slate-600", bg: "bg-slate-50" };

                    return (
                      <td key={col.key} className="px-4 py-3">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[11px] font-medium ${statusConfig.bg} ${statusConfig.text}`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${statusConfig.dot}`} />
                          {col.render ? col.render(value, item, index) : value}
                        </span>
                      </td>
                    );
                  }

                  return (
                    <td
                      key={col.key}
                      className={`
                        px-4 py-3 text-sm text-slate-600 whitespace-nowrap
                        ${cellClassName}
                        ${densityClasses[density]}
                      `}
                    >
                      {col.render ? col.render(value, item, index) : value || "—"}
                    </td>
                  );
                })}
                {(actions.length > 0 || actionMenuItems.length > 0) && (
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-0.5">
                      {actions.map((action, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (action.onClick) action.onClick(item);
                          }}
                          className={`
                            p-1 rounded-md text-slate-400
                            transition-colors duration-150
                            hover:bg-slate-100 hover:text-slate-600
                            ${action.className || ""}
                          `}
                          title={action.label}
                        >
                          {action.icon}
                        </button>
                      ))}

                      {actionMenuItems.length > 0 && (
                        <div className="relative">
                          <button
                            onClick={(e) => handleActionMenuToggle(rowKey, e)}
                            className="p-1 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                          >
                            <MoreVertIcon className="w-3.5 h-3.5" />
                          </button>

                          <AnimatePresence>
                            {actionMenuOpen === rowKey && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.96, y: -6 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.96, y: -6 }}
                                transition={{ duration: 0.15 }}
                                className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-30"
                              >
                                {actionMenuItems.map((action, idx) => (
                                  <button
                                    key={idx}
                                    onClick={(e) => handleActionClick(action, item, e)}
                                    className={`
                                      w-full px-3 py-1.5 text-[13px] text-left
                                      hover:bg-slate-50
                                      transition-colors duration-150
                                      flex items-center gap-2
                                      ${action.danger ? "text-red-600 hover:bg-red-50" : "text-slate-700"}
                                    `}
                                  >
                                    {action.icon && <span className="text-sm">{action.icon}</span>}
                                    {action.label}
                                    {action.shortcut && (
                                      <span className="ml-auto text-[11px] text-slate-400">{action.shortcut}</span>
                                    )}
                                  </button>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )}
                    </div>
                  </td>
                )}
              </tr>
              {expandable && isExpanded && renderExpandedRow && (
                <tr>
                  <td
                    colSpan={
                      getVisibleColumns().length +
                      (selectable ? 1 : 0) +
                      (actions.length > 0 || actionMenuItems.length > 0 ? 1 : 0) +
                      1
                    }
                    className="border-b border-slate-100"
                  >
                    <div className="px-4 py-3 bg-slate-50/70">{renderExpandedRow(item)}</div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          );
        })
      )}
    </tbody>
        </table>
      </div>

      {/* Pagination */}
      {showPagination && sortedData.length > 0 && (
        <div className="px-4 sm:px-6 py-3 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50 rounded-b-xl">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <span>Show</span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                // This would be handled by parent
                console.log("Items per page:", e.target.value);
              }}
              className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            >
              {itemsPerPageOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <span>entries</span>
          </div>

          <div className="text-sm text-slate-600">
            Showing{" "}
            {paginatedData.length > 0
              ? (currentPage - 1) * itemsPerPage + 1
              : 0}{" "}
            to {Math.min(currentPage * itemsPerPage, sortedData.length)} of{" "}
            {sortedData.length} entries
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-white transition-colors disabled:opacity-50"
            >
              <ChevronLeftIcon className="w-4 h-4" />
            </button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`
                    px-3.5 py-1.5 rounded-lg text-sm font-medium
                    transition-all duration-200
                    ${
                      currentPage === pageNum
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-slate-600 hover:bg-white"
                    }
                  `}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-white transition-colors disabled:opacity-50"
            >
              <ChevronRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
