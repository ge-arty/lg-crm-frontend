import type { ReactNode } from "react";

interface AuthFormContainerProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  showMobileLogo?: boolean;
}

const AuthFormContainer = ({
  title,
  subtitle,
  children,
  showMobileLogo = true,
}: AuthFormContainerProps) => {
  return (
    <div className='p-8 lg:p-12 flex flex-col justify-center'>
      <div className='mb-8'>
        {/* Mobile Logo */}
        {showMobileLogo && (
          <div className='lg:hidden mb-6 text-center'>
            <h1 className='text-5xl font-bold text-[#A50034] mb-2'>LG</h1>
            <p className='text-gray-600'>Life&apos;s Good SOMS</p>
          </div>
        )}

        {/* Title */}
        <h2 className='text-3xl font-bold text-gray-800 mb-2'>{title}</h2>
        <p className='text-gray-600'>{subtitle}</p>
      </div>

      {children}
    </div>
  );
};

export default AuthFormContainer;
