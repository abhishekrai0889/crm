import AuthInfo from "../common/AuthInfo";

const TrialInfo: React.FC = () => {
  return (
    <AuthInfo
      badge="START FREE TRIAL"
      title={`Sign up on Monday.
Team live by Friday.`}
      description="Create your workspace, import your data and invite the team — no consultant, no implementation fee."
      features={[
        "14-day free trial",
        "No credit card required",
        "One-click CRM import",
      ]}
    />
  );
};

export default TrialInfo;