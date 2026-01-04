import type { InputHTMLAttributes, ReactNode } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: ReactNode;
}

const InputField = ({
  label,
  icon,
  className = "",
  ...props
}: InputFieldProps) => {
  return (
    <div className='form-control'>
      <label className='label'>
        <span className='label-text text-gray-700 font-medium'>{label}</span>
      </label>
      <div className='relative'>
        {icon && (
          <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-1'>
            {icon}
          </div>
        )}
        <input
          className={`input input-bordered w-full h-14 bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-[#A50034] focus:outline-none focus:ring-2 focus:ring-[#A50034] focus:ring-opacity-20 transition-all rounded-xl ${
            icon ? "pl-12" : "pl-4"
          } ${className}`}
          {...props}
        />
      </div>
    </div>
  );
};

export default InputField;
