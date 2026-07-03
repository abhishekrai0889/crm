import AuthInfo from "../common/AuthInfo";

export default function LoginInfo() {
  return (
    <AuthInfo
      badge="CRM PLATFORM"
      title={`Welcome back to your
customer command center.`}
      description="Pick up where your team left off — pipelines, campaigns, tickets and projects, all on one timeline."
      features={[
        "One customer record across every module",
        "AI Copilot included in every plan",
        "Enterprise-grade security",
      ]}
    />
  );
}
