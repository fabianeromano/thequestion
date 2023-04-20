import LayoutRegister from "@/components/layout-register";
import RegisterStep1 from "@/components/register-steps/register-step1";
import RegisterStep2 from "@/components/register-steps/register-step2";
import RegisterStep3 from "@/components/register-steps/register-step3";
import RegisterStep4 from "@/components/register-steps/register-step4";

const Register = () => {
  return (
    <LayoutRegister>
      <RegisterStep1 />
      <RegisterStep2 />
      <RegisterStep3 />
      <RegisterStep4 />
    </LayoutRegister>
  );
};

export default Register;
