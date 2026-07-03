import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";

const features = [
  {
    icon: <GroupsRoundedIcon sx={{ fontSize: 20 }} />,
    title: "Unified CRM",
    desc: "Customers, deals & support in one place.",
  },
  {
    icon: <AutoAwesomeRoundedIcon sx={{ fontSize: 20 }} />,
    title: "AI Automation",
    desc: "Automate repetitive work with AI.",
  },
  {
    icon: <TrendingUpRoundedIcon sx={{ fontSize: 20 }} />,
    title: "Real-time Insights",
    desc: "Track sales and team performance.",
  },
];

const LoginInfo = () => {
  return (
    <aside
      className="
      relative hidden lg:flex min-h-screen flex-col justify-between
      overflow-hidden
      bg-[linear-gradient(135deg,#0D2E7A_0%,#1849C6_100%)]
      px-14 py-12 text-white"
    >
      {/* Glow */}
      <div className="absolute right-[-120px] top-[-80px] h-[420px] w-[420px] rounded-full bg-blue-300/20 blur-[120px]" />

      {/* Logo */}

      <div className="relative z-10 flex items-center gap-3">

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
          <span className="text-lg font-bold">E</span>
        </div>

        <h2 className="text-[28px] font-bold tracking-tight">
          ENTHIS
        </h2>

      </div>

      {/* Content */}

      <div className="relative z-10 max-w-[420px]">

        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium">
          CRM Platform
        </span>

        <h1 className="mt-6 text-[42px] font-bold leading-[1.15]">
          Welcome back 👋
        </h1>

        <p className="mt-4 text-[17px] leading-8 text-white/75">
          Continue managing customers, deals, campaigns
          and support from one unified dashboard.
        </p>

        {/* Cards */}

        <div className="mt-10 space-y-4">

          {features.map((item) => (
            <div
              key={item.title}
              className="
              flex items-start gap-4
              rounded-2xl
              border border-white/10
              bg-white/5
              p-5
              backdrop-blur"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-[#6EE7B7]">
                {item.icon}
              </div>

              <div>

                <h4 className="text-[16px] font-semibold">
                  {item.title}
                </h4>

                <p className="mt-1 text-[14px] leading-6 text-white/70">
                  {item.desc}
                </p>

              </div>

            </div>
          ))}

        </div>

      </div>

      {/* Bottom Stats */}

      <div className="relative z-10 grid grid-cols-3 gap-4">

        <div className="rounded-2xl bg-white/5 p-5 backdrop-blur border border-white/10">
          <h3 className="text-2xl font-bold">25K+</h3>
          <p className="mt-1 text-sm text-white/70">
            Customers
          </p>
        </div>

        <div className="rounded-2xl bg-white/5 p-5 backdrop-blur border border-white/10">
          <h3 className="text-2xl font-bold">99.9%</h3>
          <p className="mt-1 text-sm text-white/70">
            Uptime
          </p>
        </div>

        <div className="rounded-2xl bg-white/5 p-5 backdrop-blur border border-white/10">
          <h3 className="text-2xl font-bold">24/7</h3>
          <p className="mt-1 text-sm text-white/70">
            Support
          </p>
        </div>

      </div>
    </aside>
  );
};

export default LoginInfo;