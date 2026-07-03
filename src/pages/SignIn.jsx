import LoginInfo from "../components/login/LoginInfo";
import LoginForm from "../components/login/LoginForm";

const SignIn= () => {
  return (
 <section className="grid min-h-screen lg:grid-cols-[40%_60%]">
  <LoginInfo />
  <LoginForm />
</section>
  );
};

export default SignIn;