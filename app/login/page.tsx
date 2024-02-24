// Code: Login and signup page
import SignupLogin from "@/components/login-signup/Signup";

export function generateMetadata(){
  return {
    title: "Login | Quizzifyme",
    description: "Login",
  };
}

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <SignupLogin />
    </div>
  );
}
