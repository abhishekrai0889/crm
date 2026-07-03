import TrialInfo from "../components/trial/TrialInfo";
import TrialForm from "../components/trial/TrialForm";

const Trial = () => {
  return (
    <section className="grid min-h-screen lg:grid-cols-[40%_60%]">
      <TrialInfo />
      <TrialForm />
    </section>
  );
};

export default Trial;
