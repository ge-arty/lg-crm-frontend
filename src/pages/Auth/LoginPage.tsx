import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import AuthBranding from "../../components/auth-forms/AuthBranding";
import AuthLayout from "../../components/layouts/AuthLayout";
import { useAuthStore } from "../../store/useAuthStore";
import AuthFormContainer from "../../components/auth-forms/AuthFormContainer";
import InputField from "../../components/InputField";
import PasswordInput from "../../components/PasswordInput";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({ email, password });
  };

  return (
    <AuthLayout>
      <AuthBranding />

      <AuthFormContainer
        title='Sign in'
        subtitle='Use your corporate credentials to continue'
      >
        <form onSubmit={handleSubmit} className='space-y-6'>
          {/* Email */}
          <InputField
            label='Email'
            type='email'
            placeholder='your.email@lge.com'
            icon={<Mail size={20} className='text-gray-400' />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password */}
          <PasswordInput
            label='Password'
            placeholder='Enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Submit */}
          <button
            type='submit'
            className='btn w-full h-14 bg-[#A50034] hover:bg-[#C4003C] text-white border-none rounded-xl text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 disabled:bg-gray-300'
            disabled={isLoggingIn}
          >
            {isLoggingIn ? (
              <span className='loading loading-spinner loading-md' />
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        {/* Sign up link */}
        <p className='text-center mt-8 text-gray-600'>
          Don&apos;t have an account?{" "}
          <Link
            to='/signup'
            className='text-[#A50034] hover:text-[#C4003C] font-semibold transition-colors'
          >
            Create account
          </Link>
        </p>
      </AuthFormContainer>
    </AuthLayout>
  );
};

export default LoginPage;
