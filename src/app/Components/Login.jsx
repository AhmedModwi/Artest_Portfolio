import { signIn } from 'next-auth/react';
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  return (
    <button onClick={() => signIn('google')}
                className="flex items-center justify-center rounded-full p-2 ">
            <FcGoogle className=" " title="Sign in with Google" size="24" /> 
        </button>
  )
}
