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
      <div className="px-4 sm:px-6 py-4 border-b border-slate-200">
        <div className="flex flex-col gap-4">
          {/* Toolbar - Title takes 4 cols, search and actions on right */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Left side - Custom Filters and Left Toolbar (Optional) */}
            <div className="flex items-center gap-2 flex-1">
              {/* Title and Subtitle - Full width */}
              {(title || subtitle) && (
                <div className="w-full">
                  {title && (
                    <h2 className="text-xl font-bold text-slate-800">
                      {title}
                    </h2>
                  )}
                  {subtitle && (
                    <p className="text-sm text-slate-500">{subtitle}</p>
                  )}
                </div>
              )}
            </div>

            {/* Right side - Search and Actions */}
            <div className="flex items-center gap-2 flex-wrap ml-auto">
              {toolbarRight}

              {/* Search Bar - Now on the right side */}
              {showSearch && (
                <div className="relative min-w-[200px] max-w-xs">
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder={searchPlaceholder}
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
              )}

              {showColumnVisibility && (
                <div className="relative">
                  <button
                    onClick={() => setShowColumnFilter(!showColumnFilter)}
                    className={`p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all duration-200 ${
                      showColumnFilter ? "bg-slate-100" : ""
                    }`}
                    title="Customize columns"
                  >
                    <ViewColumnIcon className="w-4 h-4" />
                  </button>

                  {showColumnFilter && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-slate-200 p-3 z-20"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-slate-700">
                          Columns
                        </span>
                        <button
                          onClick={() => setShowColumnFilter(false)}
                          className="text-slate-400 hover:text-slate-600"
                        >
                          <CloseIcon className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="space-y-1 max-h-48 overflow-y-auto">
                        {columns.map((col) => (
                          <label
                            key={col.key}
                            className="flex items-center gap-2 p-1.5 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
                          >
                            <input
                              type="checkbox"
                              checked={visibleColumns.includes(col.key)}
                              onChange={() => toggleColumnVisibility(col.key)}
                              className="w-3.5 h-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm text-slate-600">
                              {col.header || col.key}
                            </span>
                          </label>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {showRefresh && (
                <button
                  onClick={handleRefresh}
                  className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all duration-200 hover:rotate-180"
                  title="Refresh"
                >
                  <RefreshIcon className="w-4 h-4" />
                </button>
              )}

              {showExport && (
                <button
                  onClick={handleExport}
                  className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all duration-200"
                  title="Export"
                >
                  <DownloadIcon className="w-4 h-4" />
                </button>
              )}

              {toolbarActions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.onClick}
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium
                    transition-all duration-200
                    ${
                      action.variant === "primary"
                        ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-200"
                        : action.variant === "success"
                          ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-200"
                          : action.variant === "danger"
                            ? "bg-red-600 text-white hover:bg-red-700 shadow-md shadow-red-200"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }
                    flex items-center gap-1.5
                  `}
                >
                  {action.icon}
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead
            className={`
              ${currentTheme.header}
              border-b ${currentTheme.border}
              ${stickyHeader ? "sticky top-0 z-10" : ""}
              ${headerClassName}
            `}
          >
            <tr>
              {selectable && (
                <th className="px-4 py-3 w-10">
                  <input
                    type="checkbox"
                    checked={
                      paginatedData.length > 0 &&
                      paginatedData.every((item) =>
                        internalSelectedRows.includes(getRowKey(item)),
                      )
                    }
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
              )}
              {expandable && <th className="px-2 py-3 w-8"></th>}
              {getVisibleColumns().map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  className={`
                    px-4 py-3 text-left
                    text-xs font-semibold
                    ${currentTheme.text}
                    uppercase tracking-wider
                    ${sortableFieldsList.includes(col.key) ? "cursor-pointer hover:text-blue-600" : ""}
                    ${densityClasses[density]}
                    ${col.width ? `min-w-[${col.width}]` : ""}
                  `}
                  style={col.width ? { minWidth: col.width } : {}}
                >
                  <div className="flex items-center gap-1.5">
                    <span>{col.header || col.key}</span>
                    {sortableFieldsList.includes(col.key) && (
                      <span className="text-slate-400">
                        {sortField === col.key &&
                          (sortDirection === "asc" ? "↑" : "↓")}
                      </span>
                    )}
                  </div>
                </th>
              ))}
              {(actions.length > 0 || actionMenuItems.length > 0) && (
                <th className="px-4 py-3 w-12 text-right">
                  <span
                    className={`text-xs font-semibold ${currentTheme.text} uppercase tracking-wider`}
                  >
                    Actions
                  </span>
                </th>
              )}
            </tr>
          </thead>

          <tbody className={`divide-y ${currentTheme.border} ${bodyClassName}`}>
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
                  className="px-4 py-16 text-center"
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                        />
                      </svg>
                    </div>
                    <p className="text-lg font-medium text-slate-700">
                      {emptyMessage}
                    </p>
                    <p className="text-sm text-slate-400">
                      Try adjusting your search or filter
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedData.map((item, index) => {
                const rowKey = getRowKey(item);
                const isSelected = internalSelectedRows.includes(rowKey);
                const isExpanded = expandedRows.includes(rowKey);
                const isEven = index % 2 === 0;

                return (
                  <React.Fragment key={rowKey}>
                    <tr
                      className={`
                        transition-all duration-200
                        ${stripedRows ? (isEven ? "bg-white/50" : "bg-slate-50/50") : ""}
                        ${isSelected ? currentTheme.selected : ""}
                        ${hoverEffect !== "none" ? hoverEffectClasses[hoverEffect] : ""}
                        ${rowClassName}
                      `}
                    >
                      {selectable && (
                        <td className="px-4 py-3">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleRowSelect(rowKey)}
                            className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                          />
                        </td>
                      )}
                      {expandable && (
                        <td className="px-2 py-3">
                          <button
                            onClick={() => toggleRowExpansion(rowKey)}
                            className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
                          >
                            {isExpanded ? "▼" : "▶"}
                          </button>
                        </td>
                      )}
                      {getVisibleColumns().map((col) => (
                        <td
                          key={col.key}
                          className={`
                            px-4 py-3
                            ${currentTheme.text}
                            ${cellClassName}
                            ${densityClasses[density]}
                          `}
                        >
                          {col.render
                            ? col.render(
                                getNestedValue(item, col.key),
                                item,
                                index,
                              )
                            : getNestedValue(item, col.key) || "-"}
                        </td>
                      ))}
                      {(actions.length > 0 || actionMenuItems.length > 0) && (
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            {/* Quick Actions */}
                            {actions.map((action, idx) => (
                              <button
                                key={idx}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (action.onClick) action.onClick(item);
                                }}
                                className={`
                                  p-1.5 rounded-lg
                                  transition-all duration-200
                                  hover:scale-110 hover:bg-slate-100
                                  ${action.className || ""}
                                `}
                                title={action.label}
                              >
                                {action.icon}
                              </button>
                            ))}

                            {/* Action Menu */}
                            {actionMenuItems.length > 0 && (
                              <div className="relative">
                                <button
                                  onClick={(e) =>
                                    handleActionMenuToggle(rowKey, e)
                                  }
                                  className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors opacity-0 group-hover:opacity-100"
                                >
                                  <MoreVertIcon className="w-4 h-4 text-slate-400" />
                                </button>

                                <AnimatePresence>
                                  {actionMenuOpen === rowKey && (
                                    <motion.div
                                      initial={{
                                        opacity: 0,
                                        scale: 0.95,
                                        y: -10,
                                      }}
                                      animate={{ opacity: 1, scale: 1, y: 0 }}
                                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                      className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-slate-200 py-1 z-30"
                                    >
                                      {actionMenuItems.map((action, idx) => (
                                        <button
                                          key={idx}
                                          onClick={(e) =>
                                            handleActionClick(action, item, e)
                                          }
                                          className={`
                                            w-full px-4 py-2 text-sm text-left
                                            hover:bg-slate-50
                                            transition-colors duration-150
                                            flex items-center gap-2
                                            ${action.danger ? "text-red-600 hover:bg-red-50" : "text-slate-700"}
                                            ${idx === 0 ? "rounded-t-xl" : ""}
                                            ${idx === actionMenuItems.length - 1 ? "rounded-b-xl" : ""}
                                          `}
                                        >
                                          {action.icon && (
                                            <span className="text-lg">
                                              {action.icon}
                                            </span>
                                          )}
                                          {action.label}
                                          {action.shortcut && (
                                            <span className="ml-auto text-xs text-slate-400">
                                              {action.shortcut}
                                            </span>
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
                            (actions.length > 0 || actionMenuItems.length > 0
                              ? 1
                              : 0) +
                            1
                          }
                        >
                          <div className="px-4 py-3 bg-slate-50/50">
                            {renderExpandedRow(item)}
                          </div>
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
