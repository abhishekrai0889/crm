// pages/Billing.jsx
// Plan & Billing — one section, three tabs (Plan / Payment method / Invoices)
// mapping to PRD D.4.1 / D.4.2 / D.4.3. Frontend only; plan changes and
// billing data are mocked in local state (Avneet wires Stripe + the API).
import React, { useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import LayersIcon from "@mui/icons-material/Layers";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import DownloadIcon from "@mui/icons-material/Download";
import LockIcon from "@mui/icons-material/Lock";
import Modal from "../ui/Modal";
import Table from "../ui/Table";
import { plans } from "../data/plans";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
const MIN_SEATS = 1;
const MAX_SEATS = 100;

const currency = (n) => `$${n.toLocaleString("en-US")}`;

// Mock billing artifacts — replace with API data later.
const paymentMethod = {
  brand: "Visa",
  last4: "4242",
  expiry: "08 / 2027",
  holder: "Sumeet Sarna",
  billingEmail: "billing@acme.com",
  address: "4th Floor, Cyber Hub, Gurugram, Haryana 122002, India",
  taxId: "GSTIN 06ABCDE1234F1Z5",
};

const invoices = [
  {
    id: "INV-2026-007",
    date: "Jul 1, 2026",
    desc: "Growth · 7 seats · annual",
    amount: 2352,
    status: "Paid",
  },
  {
    id: "INV-2026-006",
    date: "Jun 1, 2026",
    desc: "Growth · 6 seats · annual",
    amount: 2016,
    status: "Paid",
  },
  {
    id: "INV-2026-005",
    date: "May 1, 2026",
    desc: "Growth · 6 seats · annual",
    amount: 2016,
    status: "Paid",
  },
  {
    id: "INV-2026-004",
    date: "Apr 1, 2026",
    desc: "Starter · 6 seats · annual",
    amount: 864,
    status: "Paid",
  },
  {
    id: "INV-2026-003",
    date: "Mar 1, 2026",
    desc: "Starter · 5 seats · annual",
    amount: 720,
    status: "Paid",
  },
];

const Billing = () => {
  const [activeTab, setActiveTab] = useState("plan");

  // Mock current subscription — replace with API data later.
  const [subscription, setSubscription] = useState({
    plan: "Growth",
    annual: true,
    seats: 7,
    status: "Active",
    renewalDate: "August 1, 2026",
  });

  // "What-if" controls for browsing plans
  const [annual, setAnnual] = useState(subscription.annual);
  const [seats, setSeats] = useState(subscription.seats);
  const [pendingChange, setPendingChange] = useState(null); // target plan object

  const currentPlan = plans.find((p) => p.name === subscription.plan);

  const perSeat = (plan) => (annual ? plan.price : plan.monthly);
  const monthlyTotal = (plan) => perSeat(plan) * seats;

  const adjustSeats = (delta) =>
    setSeats((s) => Math.min(MAX_SEATS, Math.max(MIN_SEATS, s + delta)));

  const openChange = (plan) => setPendingChange(plan);

  const confirmChange = () => {
    setSubscription({
      ...subscription,
      plan: pendingChange.name,
      annual,
      seats,
    });
    const direction =
      pendingChange.tier > currentPlan.tier ? "upgraded to" : "changed to";
    toast.success(`Plan ${direction} ${pendingChange.name}`);
    setPendingChange(null);
  };

  const featureDelta = (from, to) => {
    if (!from || !to) return [];
    const clean = (arr) =>
      arr.filter((f) => !f.toLowerCase().startsWith("everything in"));
    if (to.tier > from.tier) {
      return clean(to.features).filter((f) => !from.features.includes(f));
    }
    return clean(from.features).filter((f) => !to.features.includes(f));
  };

  const isUpgrade = pendingChange && pendingChange.tier > currentPlan.tier;

  const tabs = [
    { key: "plan", label: "Plan", icon: <LayersIcon sx={{ fontSize: 17 }} /> },
    {
      key: "payment",
      label: "Payment method",
      icon: <CreditCardIcon sx={{ fontSize: 17 }} />,
    },
    {
      key: "invoices",
      label: "Invoices",
      icon: <ReceiptLongIcon sx={{ fontSize: 17 }} />,
    },
  ];

  const invoiceColumns = [
    { key: "id", header: "Invoice", sortable: true },
    { key: "date", header: "Date", sortable: true },
    { key: "desc", header: "Description", sortable: false },
    {
      key: "amount",
      header: "Amount",
      render: (v) => (
        <span className="font-semibold text-slate-700">{currency(v)}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (v) => (
        <span
          className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
            v === "Paid"
              ? "bg-emerald-100 text-emerald-700 border-emerald-300"
              : "bg-red-100 text-red-700 border-red-300"
          }`}
        >
          {v}
        </span>
      ),
    },
    {
      key: "download",
      header: "Download",
      sortable: false,
      render: (_v, item) => (
        <button
          onClick={() => toast.info(`Downloading ${item.id}.pdf`)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
        >
          <DownloadIcon sx={{ fontSize: 15 }} />
          PDF
        </button>
      ),
    },
  ];

  return (
    <div>
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">
          Plan &amp; Billing
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          View your current plan, manage payment and download invoices.
        </p>
      </div>

      {/* Current plan summary — persistent across tabs */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-6 sm:p-7 text-white shadow-md mb-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-blue-100">
                Current plan
              </span>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-white/20 text-white">
                {subscription.status}
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <h2 className="text-3xl font-extrabold">{subscription.plan}</h2>
              {currentPlan && (
                <span className="text-blue-100 text-sm">
                  {currency(perSeatFromSub(currentPlan, subscription))} / user /
                  month
                </span>
              )}
            </div>
            <p className="text-blue-100 text-sm mt-1.5">
              {subscription.seats} seats ·{" "}
              {subscription.annual ? "Billed annually" : "Billed monthly"} ·
              Renews {subscription.renewalDate}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2.5">
            <button
              onClick={() => setActiveTab("payment")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-white/15 hover:bg-white/25 transition-all duration-200"
            >
              <CreditCardIcon sx={{ fontSize: 17 }} />
              Payment method
            </button>
            <button
              onClick={() => setActiveTab("invoices")}
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium bg-white/15 hover:bg-white/25 transition-all duration-200"
            >
              Invoices
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
     <div className="mb-8 border-b border-slate-200">

  <div className="flex items-center gap-1 overflow-x-auto">

    {tabs.map((tab) => {
      const active = activeTab === tab.key;

      return (
        <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          className={`
            relative
            flex
            items-center
            gap-3
            px-6
            py-4
            rounded-t-2xl
            whitespace-nowrap
            transition-all
            duration-300
            group
            ${
              active
                ? "bg-white text-blue-600 border border-slate-200 border-b-white shadow-[0_-2px_15px_rgba(15,23,42,.06)]"
                : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
            }
          `}
        >

          {/* Icon */}

          <div
            className={`
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              transition-all
              duration-300
              ${
                active
                  ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg"
                  : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
              }
            `}
          >
            {tab.icon}
          </div>

          <div className="text-left">

            <p className="text-[15px] font-semibold">
              {tab.label}
            </p>

           

          </div>

          {active && (
            <span className="absolute bottom-[-2px] left-0 h-[3px] w-full bg-white"></span>
          )}

        </button>
      );
    })}

  </div>

</div>
      {/* ---------- Plan tab ---------- */}
      {activeTab === "plan" && (
        <div>
          {/* Change plan controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
            <h3 className="text-lg font-bold text-slate-800">
              Change your plan
            </h3>
            <div className="flex flex-wrap items-center gap-4">
              {/* Billing cycle toggle */}
              <div className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
                <span
                  className={`text-sm font-medium ${!annual ? "text-slate-900" : "text-slate-400"}`}
                >
                  Monthly
                </span>
                <button
                  onClick={() => setAnnual((a) => !a)}
                  className={`relative h-6 w-12 rounded-full transition-all duration-300 ${
                    annual ? "bg-blue-600" : "bg-slate-300"
                  }`}
                  aria-label="Toggle billing cycle"
                >
                  <span
                    className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-all duration-300 ${
                      annual ? "left-7" : "left-1"
                    }`}
                  />
                </button>
                <span
                  className={`text-sm font-medium ${annual ? "text-slate-900" : "text-slate-400"}`}
                >
                  Annual
                </span>
                <span className="rounded-full bg-green-100 px-2 py-0.5 text-[11px] font-semibold text-green-700">
                  Save 20%
                </span>
              </div>

              {/* Seat stepper */}
              <div className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm">
                <span className="text-sm font-medium text-slate-500">
                  Seats
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => adjustSeats(-1)}
                    disabled={seats <= MIN_SEATS}
                    className="w-7 h-7 rounded-full flex items-center justify-center border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    aria-label="Decrease seats"
                  >
                    <RemoveIcon sx={{ fontSize: 16 }} />
                  </button>
                  <span className="w-8 text-center text-sm font-bold text-slate-800">
                    {seats}
                  </span>
                  <button
                    onClick={() => adjustSeats(1)}
                    disabled={seats >= MAX_SEATS}
                    className="w-7 h-7 rounded-full flex items-center justify-center border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    aria-label="Increase seats"
                  >
                    <AddIcon sx={{ fontSize: 16 }} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Plan cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {plans.map((plan, index) => {
              const isCurrent = plan.name === subscription.plan;
              const upgrade = !plan.custom && plan.tier > currentPlan.tier;

              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06 }}
                  className={`relative flex flex-col rounded-2xl border bg-white p-5 transition-all duration-200 ${
                    isCurrent
                      ? "border-blue-600 shadow-lg ring-1 ring-blue-200"
                      : "border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                  }`}
                >
                  {isCurrent && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-blue-600 px-3 py-0.5 text-[11px] font-bold text-white">
                      Your plan
                    </span>
                  )}

                  <div className="flex items-center gap-2">
                    <span
                      className={`h-3 w-3 rotate-45 rounded-[2px] ${plan.color}`}
                    />
                    <h4 className="text-base font-bold text-slate-800">
                      {plan.name}
                    </h4>
                  </div>
                  <p className="mt-2 min-h-[40px] text-[13px] leading-6 text-slate-500">
                    {plan.tagline}
                  </p>

                  {/* Price */}
                  <div className="mt-3 pb-4 border-b border-slate-100">
                    {plan.custom ? (
                      <div className="text-2xl font-extrabold text-slate-800">
                        Custom
                      </div>
                    ) : (
                      <>
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-extrabold text-slate-800">
                            {currency(monthlyTotal(plan))}
                          </span>
                          <span className="text-sm text-slate-500">/mo</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">
                          {currency(perSeat(plan))}/user × {seats} ·{" "}
                          {annual
                            ? `billed annually (${currency(monthlyTotal(plan) * 12)}/yr)`
                            : "billed monthly"}
                        </p>
                      </>
                    )}
                  </div>

                  {/* Action */}
                  <div className="mt-4">
                    {isCurrent ? (
                      <button
                        disabled
                        className="w-full rounded-lg border border-slate-200 py-2.5 text-sm font-semibold text-slate-400 cursor-default"
                      >
                        Current plan
                      </button>
                    ) : plan.custom ? (
                      <button
                        onClick={() =>
                          toast.info(
                            "Our sales team will reach out about Enterprise",
                          )
                        }
                        className="w-full rounded-lg border border-slate-200 py-2.5 text-sm font-semibold text-slate-800 hover:border-blue-400 hover:text-blue-600 transition-colors"
                      >
                        Contact sales
                      </button>
                    ) : upgrade ? (
                      <button
                        onClick={() => openChange(plan)}
                        className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 shadow-md shadow-blue-200 transition-all duration-200"
                      >
                        <ArrowUpwardIcon sx={{ fontSize: 16 }} />
                        Upgrade
                      </button>
                    ) : (
                      <button
                        onClick={() => openChange(plan)}
                        className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 py-2.5 text-sm font-semibold text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition-colors"
                      >
                        <ArrowDownwardIcon sx={{ fontSize: 16 }} />
                        Downgrade
                      </button>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="mt-5 flex-1 space-y-2.5">
                    {plan.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-[13px] leading-6 text-slate-600"
                      >
                        <CheckRoundedIcon
                          sx={{
                            fontSize: 16,
                            color: "var(--blue-600, #1A56DB)",
                            marginTop: "3px",
                            flexShrink: 0,
                          }}
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>

          <p className="mt-6 text-center text-sm text-slate-500">
            Plan changes are prorated automatically. Downgrades take effect at
            the end of the current billing period.
          </p>
        </div>
      )}

      {/* ---------- Payment method tab (PRD D.4.2) ---------- */}
      {activeTab === "payment" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* Card on file */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-800">
                Payment method
              </h3>
              <button
                onClick={() => toast.info("Update card — coming soon")}
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                Update
              </button>
            </div>
            <div className="p-6">
              {/* Card visual */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0F172A] via-[#1E3A8A] to-[#2563EB] h-[260px] p-6 shadow-xl">
                {/* Background Glow */}
                <div className="absolute -top-20 -right-16 h-56 w-56 rounded-full bg-white/10 blur-3xl"></div>
                <div className="absolute -bottom-24 -left-20 h-60 w-60 rounded-full bg-cyan-300/10 blur-3xl"></div>

                {/* Header */}
                <div className="relative z-10 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {/* Card Chip */}
                    <div className="w-12 h-9 rounded-md bg-gradient-to-br from-yellow-300 to-yellow-500 shadow-inner"></div>

                    <CreditCardIcon
                      sx={{
                        fontSize: 28,
                        color: "#fff",
                        opacity: 0.8,
                      }}
                    />
                  </div>

                  <div className="text-right">
                    <span className="inline-flex items-center rounded-full bg-emerald-500/20 border border-emerald-300/30 px-3 py-1 text-[11px] font-semibold text-emerald-200">
                      Default
                    </span>

                    <h4 className="mt-3 text-xl font-bold text-white">
                      {paymentMethod.brand}
                    </h4>
                  </div>
                </div>

                {/* Card Number */}

                <div className="relative z-10 mt-10">
                  <p className="text-[30px] tracking-[8px] font-semibold text-white">
                    •••• •••• •••• {paymentMethod.last4}
                  </p>
                </div>

                {/* Bottom */}

                <div className="absolute bottom-6 left-6 right-6 z-10 flex items-end justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-[2px] text-blue-200">
                      Card Holder
                    </p>

                    <h4 className="mt-1 text-base font-semibold text-white">
                      {paymentMethod.holder}
                    </h4>
                  </div>

                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-[2px] text-blue-200">
                      Expires
                    </p>

                    <h4 className="mt-1 text-base font-semibold text-white">
                      {paymentMethod.expiry}
                    </h4>
                  </div>
                </div>
              </div>

              {/* Security */}

              <div className="mt-5 rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-50 to-green-50 px-5 py-4 flex items-center gap-4">
                <div className="h-11 w-11 rounded-full bg-emerald-100 flex items-center justify-center">
                  <LockIcon
                    sx={{
                      fontSize: 20,
                      color: "#059669",
                    }}
                  />
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-emerald-700">
                    Secure Payments
                  </h4>

                  <p className="text-xs text-emerald-600 mt-1">
                    Payments are securely processed by <strong>Stripe</strong>.
                    Card details are encrypted and never stored on our servers.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Billing details */}
       <div className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden">

  {/* Header */}

  <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">

    <div>

      <h3 className="text-lg font-bold text-slate-800">
        Billing Details
      </h3>

      <p className="text-sm text-slate-500 mt-1">
        Manage your billing information
      </p>

    </div>

    <button
      onClick={() => toast.info("Edit billing details — coming soon")}
      className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-all"
    >
      <EditRoundedIcon sx={{ fontSize: 18 }} />
      Edit
    </button>

  </div>

  {/* Body */}

  <div className="p-6 space-y-4">

    {/* Email */}

    <div className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-all hover:border-blue-300 hover:bg-blue-50">

      <div className="flex items-center gap-4">

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
          <EmailRoundedIcon sx={{ fontSize: 24 }} />
        </div>

        <div>

          <p className="text-xs uppercase tracking-wider text-slate-400">
            Billing Email
          </p>

          <h4 className="mt-1 font-semibold text-slate-800">
            {paymentMethod.billingEmail}
          </h4>

        </div>

      </div>

      <ChevronRightRoundedIcon className="text-slate-400 transition group-hover:text-blue-600 group-hover:translate-x-1" />

    </div>

    {/* Address */}

    <div className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-all hover:border-violet-300 hover:bg-violet-50">

      <div className="flex items-center gap-4">

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
          <LocationOnRoundedIcon sx={{ fontSize: 24 }} />
        </div>

        <div>

          <p className="text-xs uppercase tracking-wider text-slate-400">
            Billing Address
          </p>

          <h4 className="mt-1 font-semibold text-slate-800">
            {paymentMethod.address}
          </h4>

        </div>

      </div>

      <ChevronRightRoundedIcon className="text-slate-400 transition group-hover:text-violet-600 group-hover:translate-x-1" />

    </div>

    {/* Tax */}

    <div className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-all hover:border-emerald-300 hover:bg-emerald-50">

      <div className="flex items-center gap-4">

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
          <BadgeRoundedIcon sx={{ fontSize: 24 }} />
        </div>

        <div>

          <p className="text-xs uppercase tracking-wider text-slate-400">
            Tax ID
          </p>

          <h4 className="mt-1 font-semibold text-slate-800">
            {paymentMethod.taxId}
          </h4>

        </div>

      </div>

      <ChevronRightRoundedIcon className="text-slate-400 transition group-hover:text-emerald-600 group-hover:translate-x-1" />

    </div>

  </div>

</div>
        </div>
      )}

      {/* ---------- Invoices tab (PRD D.4.3) ---------- */}
      {activeTab === "invoices" && (
        <Table
          title="Billing history"
          subtitle="Download invoices for your records"
          columns={invoiceColumns}
          data={invoices}
          searchPlaceholder="Search invoices..."
          itemsPerPage={10}
          showColumnVisibility={false}
          showRefresh={false}
          emptyMessage="No invoices yet"
        />
      )}

      {/* Change confirmation modal */}
      <Modal
        isOpen={!!pendingChange}
        onClose={() => setPendingChange(null)}
        title={
          isUpgrade
            ? `Upgrade to ${pendingChange?.name}`
            : `Downgrade to ${pendingChange?.name}`
        }
        size="lg"
        showFooter={false}
      >
        {pendingChange && (
          <div className="space-y-4">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 flex items-center justify-between">
              <div className="text-sm">
                <span className="text-slate-500">From </span>
                <span className="font-semibold text-slate-800">
                  {currentPlan.name}
                </span>
                <span className="text-slate-400 mx-2">→</span>
                <span className="font-semibold text-blue-700">
                  {pendingChange.name}
                </span>
              </div>
              <div className="text-right">
                <div className="text-lg font-extrabold text-slate-800">
                  {currency(monthlyTotal(pendingChange))}
                  <span className="text-xs font-medium text-slate-500">
                    {" "}
                    /mo
                  </span>
                </div>
                <div className="text-[11px] text-slate-400">
                  {seats} seats · {annual ? "annual" : "monthly"}
                </div>
              </div>
            </div>

            {isUpgrade ? (
              <div>
                <p className="text-sm font-semibold text-slate-700 mb-2">
                  You'll unlock:
                </p>
                <ul className="space-y-1.5">
                  {featureDelta(currentPlan, pendingChange).map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-sm text-slate-600"
                    >
                      <CheckRoundedIcon
                        sx={{
                          fontSize: 16,
                          color: "#059669",
                          marginTop: "3px",
                        }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                <p className="flex items-center gap-2 text-sm font-semibold text-amber-800 mb-2">
                  <WarningAmberIcon sx={{ fontSize: 18 }} />
                  You'll lose access to:
                </p>
                <ul className="space-y-1.5">
                  {featureDelta(currentPlan, pendingChange)
                    .slice(0, 6)
                    .map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-sm text-amber-800/90"
                      >
                        <RemoveIcon sx={{ fontSize: 16, marginTop: "3px" }} />
                        {f}
                      </li>
                    ))}
                </ul>
                <p className="text-xs text-amber-700/80 mt-3">
                  Your data is retained. Features become read-only where
                  applicable until you upgrade again.
                </p>
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
              <button
                onClick={() => setPendingChange(null)}
                className="px-4 py-2 rounded-lg font-medium text-slate-700 hover:bg-slate-100 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmChange}
                className={`px-4 py-2 rounded-lg font-medium text-white transition-all duration-200 ${
                  isUpgrade
                    ? "bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-200"
                    : "bg-slate-800 hover:bg-slate-900"
                }`}
              >
                {isUpgrade
                  ? `Upgrade to ${pendingChange.name}`
                  : `Confirm downgrade`}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

// Per-seat price for the *committed* subscription (uses its own cycle,
// independent of the what-if toggle on the Plan tab).
function perSeatFromSub(plan, sub) {
  return sub.annual ? plan.price : plan.monthly;
}

export default Billing;
