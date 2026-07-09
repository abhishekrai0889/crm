import { useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

type Props = {
  label: string;
  value: string;
  link?: boolean;
  editable?: boolean;
  tags?: boolean;
};

export default function EditableField({
  label,
  value,
  link = false,
  editable = true,
  tags = false,
}: Props) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(value);

  const handleSave = () => {
    setEditing(false);
  };

  const handleCancel = () => {
    setText(value);
    setEditing(false);
  };

  return (
    <div className="group border-b border-slate-200 py-4 last:border-b-0">
      <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-slate-400">
        {label}
      </p>

      {!editing ? (
        <div className="mt-1 flex items-center justify-between gap-3">
          <div className="flex-1">
            {tags ? (
              <div className="flex flex-wrap gap-2">
                {text.split(",").map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
            ) : link ? (
              <a
                href="#"
                className="text-[16px] text-blue-600 hover:underline"
              >
                {text}
              </a>
            ) : (
              <p className="text-[16px] text-slate-900">{text}</p>
            )}
          </div>

          {editable && (
            <button
              onClick={() => setEditing(true)}
              className="opacity-0 transition group-hover:opacity-100 rounded-md p-1 text-slate-400 hover:bg-blue-50 hover:text-blue-600"
            >
              <EditOutlinedIcon sx={{ fontSize: 17 }} />
            </button>
          )}
        </div>
      ) : (
        <div className="mt-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full rounded-lg border border-blue-500 px-3 py-2 text-[15px] outline-none ring-2 ring-blue-100"
          />

          <div className="mt-2 flex gap-2">
            <button
              onClick={handleSave}
              className="rounded-md bg-blue-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Save
            </button>

            <button
              onClick={handleCancel}
              className="rounded-md border border-slate-300 bg-white px-4 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}