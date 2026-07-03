import AuthInfo from "../common/AuthInfo";

export default function ForgotPasswordInfo() {
  return (
    <AuthInfo
      badge="PASSWORD RECOVERY"
      title={`Locked out?
It happens to everyone.
`}
      description="Enter the email on your account and we'll send you a secure, single-use reset link. It expires in one hour."
      features={[
        "Reset links are single-use and expire in 1 hour",
        "All sessions are signed out after a reset",
        "Signed in with Google or Microsoft? No password needed",
      ]}
    />
  );
}