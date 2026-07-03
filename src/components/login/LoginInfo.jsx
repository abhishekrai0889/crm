import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import SectionBadge from "../common/SectionBadge";
const features = [
  "One customer record across every module",
  "AI Copilot included in every plan",
  "Enterprise-grade security",
];

const LoginInfo = () => {
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
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#5B8DF5] to-[#2E6BEF] text-lg font-bold">
            E
          </div>

          <h2 className="text-[30px] font-bold tracking-tight">ENTHIS</h2>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 my-auto max-w-[430px]">
        <SectionBadge className="bg-white/10 text-white backdrop-blur border border-white/10">
          CRM Platform
        </SectionBadge>
        <h1 className="mt-6 text-[40px] font-extrabold leading-[1.08] tracking-[-0.03em]">
          Welcome back to your
          <br />
          customer command center.
        </h1>

        <p className="mt-5 text-[18px] leading-8 text-white/75">
          Pick up where your team left off — pipelines, campaigns, tickets and
          projects, all on one timeline.
        </p>

        {/* Features */}

        <div className="mt-10 space-y-4">
          {features.map((item) => (
            <div
              key={item}
              className="
              flex items-center gap-4
              rounded-xl
              border border-white/10
              bg-white/5
              px-5 py-3.5
              backdrop-blur-md
              transition-all duration-300
              hover:bg-white/10
              hover:border-white/20"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-400/15">
                <CheckRoundedIcon
                  sx={{
                    color: "#6EE7B7",
                    fontSize: 22,
                  }}
                />
              </div>

              <span className="flex-1 text-[17px] text-white/90">{item}</span>

              <ArrowForwardRoundedIcon
                sx={{
                  color: "rgba(255,255,255,.45)",
                  fontSize: 20,
                }}
              />
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

export default LoginInfo;
