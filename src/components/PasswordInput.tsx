import { useState, type InputHTMLAttributes } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";

interface PasswordInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
}

const PasswordInput = ({
  label,
  className = "",
  ...props
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='form-control'>
      <label className='label'>
        <span className='label-text text-gray-700 font-medium'>{label}</span>
      </label>
      <div className='relative'>
        <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
          <Lock size={20} className='text-gray-400' />
        </div>
        <input
          type={showPassword ? "text" : "password"}
          className={`input input-bordered w-full pl-12 pr-12 h-14 bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-[#A50034] focus:outline-none focus:ring-2 focus:ring-[#A50034] focus:ring-opacity-20 transition-all rounded-xl ${className}`}
          {...props}
        />
        <button
          type='button'
          className='absolute inset-y-0 right-0 pr-4 flex items-center'
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? (
            <EyeOff
              size={20}
              className='text-gray-400 hover:text-gray-600 transition-colors'
            />
          ) : (
            <Eye
              size={20}
              className='text-gray-400 hover:text-gray-600 transition-colors'
            />
          )}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
