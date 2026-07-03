import LoginInfo from "../components/login/LoginInfo";
import LoginForm from "../components/login/LoginForm";

const SignIn= () => {
  return (
 <section className="grid min-h-screen lg:grid-cols-2">
  {/* Left Side */}
  <LoginInfo />

  {/* Right Side */}
  <LoginForm />
</section>
  );
};

export default SignIn;