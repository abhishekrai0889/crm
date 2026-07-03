import ForgotInfo from "../components/forgot/ForgotInfo";
import ForgotForm from "../components/forgot/ForgotForm";

const ForgotPassword = () => {
  return (
    <section className="grid min-h-screen lg:grid-cols-[40%_60%]">
      {/* Left Side */}
      <ForgotInfo />

      {/* Right Side */}
      <ForgotForm />
    </section>
  );
};

export default ForgotPassword;