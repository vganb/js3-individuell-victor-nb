import Link from "next/link";
import SignInForm from "../../_components/sign-in-form";
import { SignIn } from "@clerk/nextjs";

function SignInPage() {
  return (
    // <div className="">
    // <h1 className="text-4xl font-bold text-center mb-6">Login to your account</h1>
    // <SignInForm/>
    //   <p className="mt-6 text-center">Dont have an account? <Link className="text-blue-500 underline" href="/sign-up">Register</Link> instead</p>
      
    // </div>
    <SignIn path="/sign-in"/>
  );
}


export default SignInPage