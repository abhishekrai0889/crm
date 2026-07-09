import { useState, useEffect } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import type { MergeCandidate, MergeKeepId } from "./types";

interface MergeContactModalProps {
  open: boolean;
  onClose: () => void;
  existingContact?: MergeCandidate;
  newContact?: MergeCandidate;
  onMerge?: (keepId: MergeKeepId) => void;
}

const MergeContactModal = ({
  open,
  onClose,
  existingContact,
  newContact,
  onMerge,
}: MergeContactModalProps) => {
  const [keepId, setKeepId] = useState<MergeKeepId>("existing");

  // Reset selection to "existing" every time the modal opens
  useEffect(() => {
    if (open) setKeepId("existing");
  }, [open]);

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const existing: MergeCandidate = existingContact || {
    name: "Rhea Kapoor",
    email: "rhea@northwind.com",
    phone: "+91 98110 40521",
    designation: "COO",
    company: "Northwind Consulting",
    activityCount: 14,
    dealCount: 2,
  };

  const incoming: MergeCandidate = newContact || {
    name: "Rhea K.",
    email: "rhea@northwind.com",
    phone: "—",
    designation: "—",
    company: "—",
    activityCount: 0,
    dealCount: 0,
  };

  const handleMerge = () => {
    onMerge?.(keepId);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="mergeTitle"
        className="w-full max-w-[560px] rounded-3xl bg-white shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <h3 id="mergeTitle" className="text-lg font-bold text-slate-800">
            Merge duplicate contacts
          </h3>

          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100"
          >
            <CloseRoundedIcon />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          <p className="text-sm text-slate-500">
            Choose which record to keep. Activities, deals and tickets from
            both are combined onto the kept record.
          </p>

          <div className="grid grid-cols-2 gap-4">
            {/* Existing (keep) column */}
            <button
              type="button"
              onClick={() => setKeepId("existing")}
              className={`text-left rounded-2xl border-2 p-4 transition-all outline-none ${
                keepId === "existing"
                  ? "border-blue-500 bg-blue-50/60 shadow-sm"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <span
                className={`inline-block rounded-full px-2.5 py-1 text-[11px] font-semibold mb-3 ${
                  keepId === "existing"
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                Keep · existing
              </span>

              <p className="font-bold text-slate-900 mb-2">{existing.name}</p>

              <div className="space-y-1 text-sm text-slate-600">
                <p>{existing.email}</p>
                <p>{existing.phone}</p>
                <p>
                  {existing.designation} · {existing.company}
                </p>
                <p className="text-slate-400">
                  {existing.activityCount} activities · {existing.dealCount} deals
                </p>
              </div>
            </button>

            {/* New (merge in) column */}
            <button
              type="button"
              onClick={() => setKeepId("new")}
              className={`text-left rounded-2xl border-2 p-4 transition-all outline-none ${
                keepId === "new"
                  ? "border-blue-500 bg-blue-50/60 shadow-sm"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <span
                className={`inline-block rounded-full px-2.5 py-1 text-[11px] font-semibold mb-3 ${
                  keepId === "new"
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                Merge in · new
              </span>

              <p className="font-bold text-slate-900 mb-2">{incoming.name}</p>

              <div className="space-y-1 text-sm text-slate-600">
                <p>{incoming.email}</p>
                <p>{incoming.phone}</p>
                <p>
                  {incoming.designation} · {incoming.company}
                </p>
                <p className="text-slate-400">
                  {incoming.activityCount} activities · {incoming.dealCount} deals
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-medium text-slate-700 hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleMerge}
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Merge contacts
          </button>
        </div>
      </div>
    </div>
  );
};

export default MergeContactModal;