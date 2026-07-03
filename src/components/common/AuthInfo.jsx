import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import SectionBadge from "./SectionBadge";

const AuthInfo = ({
  badge,
  title,
  description,
  features,
}) => {
  return (
    <aside
      className="
      relative hidden lg:flex min-h-screen flex-col
      overflow-hidden
      bg-[linear-gradient(140deg,#081C54_0%,#123FA8_55%,#295BFF_100%)]
      px-12 py-12 text-white"
    >
      {/* Glow */}
      <div className="absolute -right-36 -top-36 h-[420px] w-[420px] rounded-full bg-[#5B8DF5]/30 blur-[110px]" />
      <div className="absolute -left-16 bottom-0 h-[220px] w-[220px] rounded-full bg-cyan-400/10 blur-[80px]" />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(white 1px,transparent 1px),linear-gradient(90deg,white 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Logo */}

      <div className="relative z-10">
        <div className="inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/10 px-4 py-2.5 backdrop-blur-xl">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#5B8DF5] to-[#2E6BEF] text-base font-bold">
            E
          </div>

          <h2 className="text-[24px] font-bold tracking-tight">
            ENTHIS
          </h2>
        </div>
      </div>

      {/* Content */}

      <div className="relative z-10 my-auto max-w-[430px]">

        <SectionBadge className="border border-white/10 bg-white/10 text-white backdrop-blur text-[11px]">
          {badge}
        </SectionBadge>

        <h1 className="mt-6 text-[40px] font-extrabold leading-[1.08] tracking-[-0.03em] whitespace-pre-line">
          {title}
        </h1>

        <p className="mt-5 text-[16px] leading-7 text-white/75">
          {description}
        </p>

        <div className="mt-9 space-y-5">

          {features.map((item) => (
            <div
              key={item}
              className="flex items-center gap-4"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-400/10">
                <CheckRoundedIcon
                  sx={{
                    color: "#6EE7B7",
                    fontSize: 20,
                  }}
                />
              </div>

              <span className="text-[16px] text-white/90">
                {item}
              </span>

            </div>
          ))}

        </div>

      </div>

      {/* Footer */}

      <div className="relative z-10 mt-12 flex items-center justify-between border-t border-white/10 pt-6 text-[13px] text-white/50">

        <span>© 2026 ENTHIS</span>

        <span>Powered by Engenia</span>

      </div>

    </aside>
  );
};

export default AuthInfo;