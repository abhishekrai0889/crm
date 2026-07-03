import React, { useState, useEffect, useMemo, useRef } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import DownloadIcon from "@mui/icons-material/Download";
import PrintIcon from "@mui/icons-material/Print";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CloseIcon from "@mui/icons-material/Close";
import RefreshIcon from "@mui/icons-material/Refresh";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

const Table = ({
  columns = [],
  data = [],
  title,
  subtitle,
  showSearch = true,
  showPagination = true,
  showExport = true,
  showPrint = true,
  showFilter = true,
  showRefresh = true,
  showFullscreen = true,
  showColumnVisibility = true,
  itemsPerPage = 10,
  itemsPerPageOptions = [5, 10, 25, 50, 100],
  onRowClick,
  onSelectionChange,
  onRefresh,
  selectable = false,
  loading = false,
  emptyMessage = "No data available",
  className = "",
  headerClassName = "",
  bodyClassName = "",
  rowClassName = "",
  cellClassName = "",
  searchPlaceholder = "Search...",
  searchableFields = [],
  sortableFields = [],
  initialSortField = "",
  initialSortDirection = "asc",
  exportFileName = "export-data",
  onExport,
  actions,
  customStyles = {},
  gradientHeader = false,
  stripedRows = false,
  hoverEffect = "default",
  borderRadius = "xl",
  shadow = "lg",
  density = "normal",
  theme = "light",
  compact = false,
  stickyHeader = false,
  maxHeight = "auto",
  showTotalCount = true,
  showQuickFilters = true,
  showExportOptions = true,
  expandableRows = false,
  renderExpandedRow,
  rowSelectionMode = "checkbox",
  autoResetPage = true,
  tableActions,
  rowActionsPosition = "end",
}) => {
  // ==================== HELPER FUNCTIONS (DEFINED FIRST) ====================
  const getNestedValue = (obj, path) => {
    return path.split(".").reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : null;
    }, obj);
  };

  const getRowKey = (item) => {
    return item.id || item._id || item.key || JSON.stringify(item);
  };

  // ==================== STATE ====================
  const tableRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState(initialSortField);
  const [sortDirection, setSortDirection] = useState(initialSortDirection);
  const [selectedRows, setSelectedRows] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState(
    columns.map((col) => col.key),
  );
  const [showColumnFilter, setShowColumnFilter] = useState(false);
  const [expandedRows, setExpandedRows] = useState([]);
  const [filterValues, setFilterValues] = useState({});
  const [quickFilter, setQuickFilter] = useState("all");

  // ==================== STYLING CONFIGURATIONS ====================
  const borderRadiusClasses = {
    none: "rounded-none",
    sm: "rounded-lg",
    md: "rounded-xl",
    lg: "rounded-2xl",
    xl: "rounded-3xl",
    "2xl": "rounded-[2rem]",
  };

  const shadowClasses = {
    none: "shadow-none",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl",
    "2xl": "shadow-2xl",
  };

  const densityClasses = {
    compact: "text-xs",
    normal: "text-sm",
    relaxed: "text-base",
  };

  const hoverEffectClasses = {
    none: "",
    default: "hover:bg-slate-50",
    glow: "hover:shadow-md hover:bg-white transition-all duration-300",
    lift: "hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300",
    scale: "hover:scale-[1.01] transition-all duration-300",
  };

  const themeClasses = {
    light: {
      bg: "bg-white",
      border: "border-slate-200",
      text: "text-slate-700",
      header: "bg-slate-50",
      hover: "hover:bg-slate-50",
      selected: "bg-blue-50",
      shadow: "shadow-xl",
    },
    dark: {
      bg: "bg-slate-800",
      border: "border-slate-700",
      text: "text-slate-200",
      header: "bg-slate-900",
      hover: "hover:bg-slate-700",
      selected: "bg-blue-900/30",
      shadow: "shadow-2xl",
    },
    glass: {
      bg: "bg-white/80 backdrop-blur-xl",
      border: "border-white/20",
      text: "text-slate-700",
      header: "bg-white/40 backdrop-blur-sm",
      hover: "hover:bg-white/50",
      selected: "bg-blue-500/10",
      shadow: "shadow-2xl",
    },
    minimal: {
      bg: "bg-transparent",
      border: "border-slate-100",
      text: "text-slate-700",
      header: "bg-transparent",
      hover: "hover:bg-slate-50/50",
      selected: "bg-blue-50/50",
      shadow: "shadow-none",
    },
  };

  const currentTheme = themeClasses[theme] || themeClasses.light;

  // ==================== COMPUTED VALUES ====================
  const searchableFieldsList =
    searchableFields.length > 0
      ? searchableFields
      : columns.filter((col) => col.searchable !== false).map((col) => col.key);

  const sortableFieldsList =
    sortableFields.length > 0
      ? sortableFields
      : columns.filter((col) => col.sortable !== false).map((col) => col.key);

  // Filter and search data
  const filteredData = useMemo(() => {
    let result = data;

    // Quick filters
    if (quickFilter !== "all") {
      result = result.filter((item) => {
        const status = getNestedValue(item, "status")?.toLowerCase() || "";
        return status === quickFilter;
      });
    }

    // Global search
    if (searchTerm.trim()) {
      result = result.filter((item) => {
        return searchableFieldsList.some((field) => {
          const value = getNestedValue(item, field);
          if (value === null || value === undefined) return false;
          return String(value).toLowerCase().includes(searchTerm.toLowerCase());
        });
      });
    }

    // Column filters
    Object.keys(filterValues).forEach((key) => {
      if (filterValues[key]) {
        result = result.filter((item) => {
          const value = getNestedValue(item, key);
          return String(value)
            .toLowerCase()
            .includes(filterValues[key].toLowerCase());
        });
      }
    });

    return result;
  }, [data, searchTerm, searchableFieldsList, filterValues, quickFilter]);

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

  // ==================== EFFECTS ====================
  useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange(selectedRows);
    }
  }, [selectedRows, onSelectionChange]);

  useEffect(() => {
    if (autoResetPage) {
      setCurrentPage(1);
    }
  }, [data, searchTerm, filterValues, quickFilter, autoResetPage]);

  // ==================== HANDLERS ====================
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    if (tableRef.current) {
      tableRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleRowSelect = (rowKey) => {
    if (rowSelectionMode === "radio") {
      setSelectedRows([rowKey]);
      return;
    }

    setSelectedRows((prev) => {
      if (prev.includes(rowKey)) {
        return prev.filter((key) => key !== rowKey);
      } else {
        return [...prev, rowKey];
      }
    });
  };

  const handleSelectAll = () => {
    const visibleKeys = paginatedData.map((item) => getRowKey(item));
    const allSelected = visibleKeys.every((key) => selectedRows.includes(key));

    if (allSelected) {
      setSelectedRows((prev) =>
        prev.filter((key) => !visibleKeys.includes(key)),
      );
    } else {
      const newSelected = [...selectedRows];
      visibleKeys.forEach((key) => {
        if (!newSelected.includes(key)) {
          newSelected.push(key);
        }
      });
      setSelectedRows(newSelected);
    }
  };

  const toggleRowExpansion = (rowKey) => {
    setExpandedRows((prev) =>
      prev.includes(rowKey)
        ? prev.filter((key) => key !== rowKey)
        : [...prev, rowKey],
    );
  };

  const handleExport = (format = "csv") => {
    if (onExport) {
      onExport(sortedData, format);
      return;
    }

    const headers = columns
      .filter((col) => visibleColumns.includes(col.key))
      .map((col) => col.header || col.key);

    const rows = sortedData.map((item) => {
      return visibleColumns.map((key) => {
        const value = getNestedValue(item, key);
        return value !== null && value !== undefined ? value : "";
      });
    });

    if (format === "csv") {
      const csvContent = [
        headers.join(","),
        ...rows.map((row) => row.join(",")),
      ].join("\n");

      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${exportFileName}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
    } else if (format === "json") {
      const jsonData = JSON.stringify(sortedData, null, 2);
      const blob = new Blob([jsonData], { type: "application/json" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${exportFileName}.json`;
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh();
    } else {
      setSearchTerm("");
      setCurrentPage(1);
      setSelectedRows([]);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setFilterValues({});
    setQuickFilter("all");
    setCurrentPage(1);
  };

  // ==================== RENDER FUNCTIONS ====================
  const renderLoadingSkeleton = () => {
    const rows = Math.min(itemsPerPage, 10);
    return Array.from({ length: rows }).map((_, index) => (
      <tr key={index} className="animate-pulse">
        {selectable && (
          <td className="px-4 py-3">
            <div className="w-4 h-4 bg-slate-200 rounded"></div>
          </td>
        )}
        {visibleColumns.map((key, colIndex) => (
          <td key={colIndex} className="px-4 py-3">
            <div className="h-3 bg-gradient-to-r from-slate-200 to-slate-100 rounded w-full"></div>
          </td>
        ))}
        {actions && (
          <td className="px-4 py-3">
            <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
          </td>
        )}
      </tr>
    ));
  };

  const quickFilterOptions = [
    { value: "all", label: "All" },
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "pending", label: "Pending" },
  ];

  // ==================== MAIN RENDER ====================
  return (
    <div
      ref={tableRef}
      className={`
        ${currentTheme.bg}
        border ${currentTheme.border}
        ${borderRadiusClasses[borderRadius]}
        ${shadowClasses[shadow]}
        ${className}
        ${isFullscreen ? "fixed inset-0 z-50 rounded-none" : ""}
        transition-all duration-300
        print:shadow-none print:border-0 print:bg-white
      `}
      style={{ maxHeight: isFullscreen ? "100vh" : maxHeight }}
    >
      {/* Header with Toolbar */}
      <div
        className={`
        px-4 sm:px-6 py-4
        border-b ${currentTheme.border}
        ${
          gradientHeader
            ? "bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10"
            : currentTheme.header
        }
      `}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            {title && (
              <h3
                className={`
                text-xl sm:text-2xl font-bold
                ${currentTheme.text}
                flex items-center gap-3
              `}
              >
                {title}
                {showTotalCount && (
                  <span className="text-sm font-normal text-slate-400 bg-slate-100 px-3 py-0.5 rounded-full">
                    {sortedData.length}
                  </span>
                )}
              </h3>
            )}
            {subtitle && (
              <p
                className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-500"} mt-0.5`}
              >
                {subtitle}
              </p>
            )}
            {selectedRows.length > 0 && (
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                  {selectedRows.length} selected
                </span>
                <button
                  onClick={() => setSelectedRows([])}
                  className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
                >
                  Clear
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Quick Filters */}
            {showQuickFilters && (
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700 rounded-lg p-0.5">
                {quickFilterOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setQuickFilter(option.value)}
                    className={`
                      px-3 py-1 text-xs font-medium rounded-lg transition-all duration-200
                      ${
                        quickFilter === option.value
                          ? "bg-white dark:bg-slate-600 shadow-sm text-slate-700 dark:text-white"
                          : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-white"
                      }
                    `}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}

            {/* Search */}
            {showSearch && (
              <div className="relative group min-w-[150px]">
                <SearchIcon
                  className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${theme === "dark" ? "text-slate-400" : "text-slate-400"} group-focus-within:text-blue-500 transition-colors duration-200`}
                />
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchTerm}
                  onChange={handleSearch}
                  className={`
                    pl-9 pr-8 py-2 w-full
                    ${
                      theme === "dark"
                        ? "bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                        : "bg-slate-50 border-slate-200 text-slate-700 placeholder:text-slate-400"
                    }
                    border rounded-lg
                    text-sm
                    focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 focus:bg-white dark:focus:bg-slate-600
                    transition-all duration-200
                  `}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <CloseIcon className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center gap-1">
              {showRefresh && (
                <button
                  onClick={handleRefresh}
                  className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200 hover:rotate-180"
                  title="Refresh"
                >
                  <RefreshIcon className="w-4 h-4" />
                </button>
              )}

              {showFilter && (
                <div className="relative">
                  <button
                    onClick={() => setShowColumnFilter(!showColumnFilter)}
                    className={`
                      p-2 rounded-lg border border-slate-200 dark:border-slate-700
                      text-slate-600 dark:text-slate-400
                      hover:bg-slate-100 dark:hover:bg-slate-700
                      transition-all duration-200
                      ${showColumnFilter ? "bg-slate-100 dark:bg-slate-700" : ""}
                    `}
                    title="Filter columns"
                  >
                    <FilterListIcon className="w-4 h-4" />
                  </button>

                  {showColumnFilter && (
                    <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 p-3 z-20 animate-fadeIn">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                          Columns
                        </span>
                        <button
                          onClick={() => setShowColumnFilter(false)}
                          className="text-slate-400 hover:text-slate-600 transition-colors"
                        >
                          <CloseIcon className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="space-y-1 max-h-60 overflow-y-auto">
                        {columns.map((col) => (
                          <label
                            key={col.key}
                            className="flex items-center gap-2 p-2 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg cursor-pointer transition-colors"
                          >
                            <input
                              type="checkbox"
                              checked={visibleColumns.includes(col.key)}
                              onChange={() => {
                                if (visibleColumns.includes(col.key)) {
                                  if (visibleColumns.length > 1) {
                                    setVisibleColumns((prev) =>
                                      prev.filter((k) => k !== col.key),
                                    );
                                  }
                                } else {
                                  setVisibleColumns((prev) => [
                                    ...prev,
                                    col.key,
                                  ]);
                                }
                              }}
                              className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 focus:ring-2"
                            />
                            <span className="text-sm text-slate-700 dark:text-slate-300">
                              {col.header || col.key}
                            </span>
                          </label>
                        ))}
                      </div>
                      <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between">
                        <button
                          onClick={() =>
                            setVisibleColumns(columns.map((c) => c.key))
                          }
                          className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                        >
                          Show All
                        </button>
                        <button
                          onClick={() => setVisibleColumns([])}
                          className="text-xs text-red-600 hover:text-red-700 font-medium"
                        >
                          Hide All
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {showExport && (
                <div className="relative group">
                  <button
                    onClick={() => handleExport("csv")}
                    className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200"
                    title="Export"
                  >
                    <DownloadIcon className="w-4 h-4" />
                  </button>
                  {showExportOptions && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 p-2 z-20 hidden group-hover:block animate-fadeIn">
                      <button
                        onClick={() => handleExport("csv")}
                        className="w-full px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-left"
                      >
                        Export as CSV
                      </button>
                      <button
                        onClick={() => handleExport("json")}
                        className="w-full px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-left"
                      >
                        Export as JSON
                      </button>
                    </div>
                  )}
                </div>
              )}

              {showPrint && (
                <button
                  onClick={handlePrint}
                  className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200"
                  title="Print"
                >
                  <PrintIcon className="w-4 h-4" />
                </button>
              )}

              {showFullscreen && (
                <button
                  onClick={toggleFullscreen}
                  className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200"
                  title="Fullscreen"
                >
                  {isFullscreen ? (
                    <FullscreenExitIcon className="w-4 h-4" />
                  ) : (
                    <FullscreenIcon className="w-4 h-4" />
                  )}
                </button>
              )}

              {tableActions &&
                tableActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.onClick}
                    className={`
                    px-4 py-2 rounded-lg font-medium text-sm
                    transition-all duration-200 transform hover:scale-105 active:scale-95
                    ${
                      action.variant === "primary"
                        ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg"
                        : action.variant === "danger"
                          ? "bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 shadow-md hover:shadow-lg"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }
                  `}
                  >
                    {action.icon && <span className="mr-2">{action.icon}</span>}
                    {action.label}
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div
        className={`
        overflow-x-auto
        ${stickyHeader ? "max-h-[600px]" : ""}
      `}
      >
        <table className="w-full">
          <thead
            className={`
            ${currentTheme.header}
            ${stickyHeader ? "sticky top-0 z-10" : ""}
            border-b ${currentTheme.border}
            ${headerClassName}
          `}
          >
            <tr>
              {selectable && (
                <th className="px-4 py-3.5 w-10">
                  <input
                    type="checkbox"
                    checked={
                      paginatedData.length > 0 &&
                      paginatedData.every((item) =>
                        selectedRows.includes(getRowKey(item)),
                      )
                    }
                    onChange={handleSelectAll}
                    className="
                      w-4 h-4 rounded
                      border-slate-300
                      text-blue-600
                      focus:ring-blue-500 focus:ring-2
                      transition-all duration-200
                    "
                  />
                </th>
              )}
              {expandableRows && <th className="px-2 py-3.5 w-8"></th>}
              {columns
                .filter((col) => visibleColumns.includes(col.key))
                .map((col) => (
                  <th
                    key={col.key}
                    onClick={() => handleSort(col.key)}
                    className={`
                      px-4 py-3.5 text-left
                      text-xs font-semibold
                      ${currentTheme.text}
                      uppercase tracking-wider
                      ${sortableFieldsList.includes(col.key) ? "cursor-pointer hover:text-blue-600 group" : ""}
                      ${col.width ? `min-w-[${col.width}]` : ""}
                      transition-all duration-200
                      ${densityClasses[density]}
                    `}
                    style={col.width ? { minWidth: col.width } : {}}
                  >
                    <div className="flex items-center gap-1.5">
                      <span>{col.header || col.key}</span>
                      {sortableFieldsList.includes(col.key) && (
                        <span className="flex flex-col">
                          <ExpandLessIcon
                            className={`
                              w-3 h-3 -mb-1
                              ${
                                sortField === col.key && sortDirection === "asc"
                                  ? "text-blue-600 opacity-100"
                                  : "text-slate-400 opacity-0 group-hover:opacity-50"
                              }
                              transition-all duration-200
                            `}
                          />
                          <ExpandMoreIcon
                            className={`
                              w-3 h-3 -mt-1
                              ${
                                sortField === col.key &&
                                sortDirection === "desc"
                                  ? "text-blue-600 opacity-100"
                                  : "text-slate-400 opacity-0 group-hover:opacity-50"
                              }
                              transition-all duration-200
                            `}
                          />
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              {actions && rowActionsPosition === "start" && (
                <th className="px-4 py-3.5 w-12 text-left">
                  <span
                    className={`text-xs font-semibold ${currentTheme.text} uppercase tracking-wider ${densityClasses[density]}`}
                  >
                    Actions
                  </span>
                </th>
              )}
              {actions && rowActionsPosition === "end" && (
                <th className="px-4 py-3.5 w-12 text-right">
                  <span
                    className={`text-xs font-semibold ${currentTheme.text} uppercase tracking-wider ${densityClasses[density]}`}
                  >
                    Actions
                  </span>
                </th>
              )}
            </tr>
          </thead>

          <tbody
            className={`
              divide-y ${currentTheme.border}
              ${bodyClassName}
            `}
          >
            {loading ? (
              renderLoadingSkeleton()
            ) : paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={
                    columns.filter((col) => visibleColumns.includes(col.key))
                      .length +
                    (selectable ? 1 : 0) +
                    (expandableRows ? 1 : 0) +
                    (actions ? 1 : 0)
                  }
                  className="px-4 py-16 text-center"
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center">
                      <svg
                        className="w-10 h-10 text-slate-400"
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
                    <p className={`text-lg font-medium ${currentTheme.text}`}>
                      {emptyMessage}
                    </p>
                    <p
                      className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-400"}`}
                    >
                      Try adjusting your search or filter
                    </p>
                    {(searchTerm ||
                      Object.keys(filterValues).length > 0 ||
                      quickFilter !== "all") && (
                      <button
                        onClick={clearAllFilters}
                        className="mt-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                      >
                        Clear all filters
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              paginatedData.map((item, index) => {
                const rowKey = getRowKey(item);
                const isSelected = selectedRows.includes(rowKey);
                const isExpanded = expandedRows.includes(rowKey);
                const isEven = index % 2 === 0;

                return (
                  <React.Fragment key={rowKey}>
                    <tr
                      onClick={() => onRowClick && onRowClick(item)}
                      className={`
                        transition-all duration-200
                        ${stripedRows ? (isEven ? "bg-white/50" : "bg-slate-50/50") : "bg-transparent"}
                        ${isSelected ? currentTheme.selected + " border-l-4 border-l-blue-500" : ""}
                        ${onRowClick ? "cursor-pointer" : ""}
                        ${hoverEffect !== "none" ? hoverEffectClasses[hoverEffect] : ""}
                        ${rowClassName}
                        ${theme === "dark" ? "hover:bg-slate-700/50" : ""}
                      `}
                    >
                      {selectable && (
                        <td
                          className="px-4 py-3"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <input
                            type={
                              rowSelectionMode === "radio"
                                ? "radio"
                                : "checkbox"
                            }
                            checked={isSelected}
                            onChange={() => handleRowSelect(rowKey)}
                            className={`
                              w-4 h-4
                              ${
                                rowSelectionMode === "radio"
                                  ? "rounded-full border-slate-300 text-blue-600 focus:ring-blue-500"
                                  : "rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                              }
                              focus:ring-2
                              transition-all duration-200
                            `}
                          />
                        </td>
                      )}
                      {expandableRows && (
                        <td
                          className="px-2 py-3"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleRowExpansion(rowKey);
                          }}
                        >
                          <button className="p-1 hover:bg-slate-100 rounded-lg transition-colors">
                            {isExpanded ? (
                              <ExpandLessIcon className="w-4 h-4 text-slate-400" />
                            ) : (
                              <ExpandMoreIcon className="w-4 h-4 text-slate-400" />
                            )}
                          </button>
                        </td>
                      )}
                      {columns
                        .filter((col) => visibleColumns.includes(col.key))
                        .map((col) => (
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
                      {actions && rowActionsPosition === "start" && (
                        <td className="px-4 py-3 text-left">
                          <div className="flex items-center gap-1">
                            {actions.map((action, idx) => (
                              <button
                                key={idx}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  action.onClick(item);
                                }}
                                className={`
                                  p-1.5 rounded-lg
                                  transition-all duration-200
                                  hover:scale-110
                                  ${action.className || ""}
                                `}
                                title={action.label}
                              >
                                {action.icon || (
                                  <MoreVertIcon className="w-4 h-4 text-slate-400 hover:text-slate-600" />
                                )}
                              </button>
                            ))}
                          </div>
                        </td>
                      )}
                      {actions && rowActionsPosition === "end" && (
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            {actions.map((action, idx) => (
                              <button
                                key={idx}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  action.onClick(item);
                                }}
                                className={`
                                  p-1.5 rounded-lg
                                  transition-all duration-200
                                  hover:scale-110
                                  ${action.className || ""}
                                `}
                                title={action.label}
                              >
                                {action.icon || (
                                  <MoreVertIcon className="w-4 h-4 text-slate-400 hover:text-slate-600" />
                                )}
                              </button>
                            ))}
                          </div>
                        </td>
                      )}
                    </tr>
                    {expandableRows && isExpanded && renderExpandedRow && (
                      <tr>
                        <td
                          colSpan={
                            columns.filter((col) =>
                              visibleColumns.includes(col.key),
                            ).length +
                            (selectable ? 1 : 0) +
                            (actions ? 1 : 0) +
                            1
                          }
                        >
                          <div className="px-4 py-3 bg-slate-50/50 dark:bg-slate-700/30">
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
        <div
          className={`
          px-4 sm:px-6 py-4
          border-t ${currentTheme.border}
          ${currentTheme.header}
          flex flex-col sm:flex-row sm:items-center justify-between gap-3
          rounded-b-xl
        `}
        >
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className={currentTheme.text}>Show</span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                // This is handled by the parent component
                // The value is passed as a prop
                console.log("Items per page changed to:", e.target.value);
              }}
              className={`
                px-3 py-1.5
                bg-white dark:bg-slate-700
                border ${currentTheme.border}
                rounded-lg
                focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500
                text-sm font-medium
                ${currentTheme.text}
                transition-all duration-200
              `}
            >
              {itemsPerPageOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <span className={currentTheme.text}>entries</span>
          </div>

          <div className={`text-sm ${currentTheme.text}`}>
            Showing{" "}
            <span className="font-semibold">
              {sortedData.length === 0
                ? 0
                : (currentPage - 1) * itemsPerPage + 1}
            </span>{" "}
            to{" "}
            <span className="font-semibold">
              {Math.min(currentPage * itemsPerPage, sortedData.length)}
            </span>{" "}
            of <span className="font-semibold">{sortedData.length}</span>{" "}
            entries
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`
                px-3 py-1.5 rounded-lg
                border ${currentTheme.border}
                ${currentTheme.text}
                hover:bg-white dark:hover:bg-slate-700
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-200
                text-sm
              `}
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
                        ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md"
                        : `${currentTheme.text} hover:bg-white dark:hover:bg-slate-700`
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
              className={`
                px-3 py-1.5 rounded-lg
                border ${currentTheme.border}
                ${currentTheme.text}
                hover:bg-white dark:hover:bg-slate-700
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-200
                text-sm
              `}
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
