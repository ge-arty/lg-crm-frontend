import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, User, Calendar } from "lucide-react";
import toast from "react-hot-toast";
import { useAuthStore } from "../../store/useAuthStore";
import AuthFormContainer from "../../components/auth-forms/AuthFormContainer";
import AuthLayout from "../../components/layouts/AuthLayout";
import InputField from "../../components/InputField";
import PasswordInput from "../../components/PasswordInput";
import AuthBranding from "../../components/auth-forms/AuthBranding";

type DayOfWeek = "sunday" | "monday" | "tuesday" | "wednesday" | "thursday";

const AVAILABLE_DAYS: { value: DayOfWeek; label: string }[] = [
  { value: "sunday", label: "Sunday" },
  { value: "monday", label: "Monday" },
  { value: "tuesday", label: "Tuesday" },
  { value: "wednesday", label: "Wednesday" },
  { value: "thursday", label: "Thursday" },
];

const MAX_DAYS_OFF = 2;

const SignupPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    daysOff: ["sunday", "monday"] as DayOfWeek[],
  });
  const { signup, isSigningUp } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.daysOff.length !== MAX_DAYS_OFF) {
      toast.error("You must select exactly 2 days off.");
      return;
    }

    await signup({
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      password: formData.password,
      daysOff: formData.daysOff,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDayToggle = (day: DayOfWeek) => {
    const isSelected = formData.daysOff.includes(day);

    if (isSelected) {
      const newDays = formData.daysOff.filter((d) => d !== day);
      if (newDays.length === 0) {
        toast.error("You must have at least 1 day off selected.");
        return;
      }
      setFormData((prev) => ({ ...prev, daysOff: newDays }));
    } else {
      if (formData.daysOff.length >= MAX_DAYS_OFF) {
        toast.error("You can select a maximum of 2 days off.");
        return;
      }
      setFormData((prev) => ({
        ...prev,
        daysOff: [...prev.daysOff, day],
      }));
    }
  };

  return (
    <AuthLayout>
      <AuthFormContainer
        title='Create account'
        subtitle='Set up access for your LG SOMS workspace'
      >
        <form onSubmit={handleSubmit} className='space-y-5'>
          <InputField
            label='Email'
            type='email'
            name='email'
            placeholder='your.email@lge.com'
            icon={<Mail size={20} className='text-gray-400' />}
            value={formData.email}
            onChange={handleChange}
            required
          />

          <InputField
            label='First name'
            type='text'
            name='firstName'
            placeholder='John'
            icon={<User size={20} className='text-gray-400' />}
            value={formData.firstName}
            onChange={handleChange}
            required
          />

          <InputField
            label='Last name'
            type='text'
            name='lastName'
            placeholder='Doe'
            icon={<User size={20} className='text-gray-400' />}
            value={formData.lastName}
            onChange={handleChange}
            required
          />

          <PasswordInput
            label='Password'
            name='password'
            placeholder='Create a strong password'
            value={formData.password}
            onChange={handleChange}
            required
          />

          {/* Days Off */}
          <div className='space-y-2'>
            <label className='flex items-center gap-2 text-sm font-medium text-gray-700'>
              <Calendar size={18} className='text-gray-500' />
              Days Off (exactly 2 days, Fri & Sat are working)
            </label>
            <div className='grid grid-cols-2 gap-3'>
              {AVAILABLE_DAYS.map((day) => {
                const isSelected = formData.daysOff.includes(day.value);
                const reachMax =
                  !isSelected && formData.daysOff.length >= MAX_DAYS_OFF;

                return (
                  <button
                    key={day.value}
                    type='button'
                    onClick={() => handleDayToggle(day.value)}
                    disabled={reachMax}
                    className={`px-4 py-3 rounded-lg border-2 font-medium text-sm transition-all duration-200 ${
                      isSelected
                        ? "bg-[#A50034] text-white border-[#A50034] shadow-md"
                        : reachMax
                        ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                        : "bg-white text-gray-700 border-gray-300 hover:border-[#A50034] hover:bg-gray-50"
                    }`}
                  >
                    {day.label}
                  </button>
                );
              })}
            </div>
            <p className='text-xs text-gray-500 mt-2'>
              You must select exactly two days off. Friday and Saturday are
              working days and are not available as days off.
            </p>
          </div>

          <button
            type='submit'
            className='btn w-full h-14 bg-[#A50034] hover:bg-[#C4003C] text-white border-none rounded-xl text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 disabled:bg-gray-300'
            disabled={isSigningUp}
          >
            {isSigningUp ? (
              <span className='loading loading-spinner loading-md' />
            ) : (
              "Create account"
            )}
          </button>
        </form>

        <p className='text-center mt-8 text-gray-600'>
          Already have an account?{" "}
          <Link
            to='/login'
            className='text-[#A50034] hover:text-[#C4003C] font-semibold transition-colors'
          >
            Sign in
          </Link>
        </p>
      </AuthFormContainer>

      <AuthBranding />
    </AuthLayout>
  );
};

export default SignupPage;
