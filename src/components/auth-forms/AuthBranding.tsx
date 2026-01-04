interface AuthBrandingProps {
  features?: string[];
}

const defaultFeatures = [
  "Empowering Merchandisers with real-time data.",
  "Streamlining Promoter performance tracking.",
  "Advanced tools for Sales & Product Managers.",
  "Unified Sales Management System (SOMS).",
];

const AuthBranding = ({ features }: AuthBrandingProps) => {
  const displayFeatures = features || defaultFeatures;

  return (
    <div className='hidden lg:flex flex-col justify-center items-center bg-[#A50034] p-12 text-white relative overflow-hidden'>
      {/* Decorative circles */}
      <div className='absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32' />
      <div className='absolute bottom-0 left-0 w-96 h-96 bg-white opacity-5 rounded-full -ml-48 -mb-48' />

      <div className='relative z-10 text-center'>
        {/* Logo */}
        <div className='mb-8'>
          <h1 className='text-6xl font-bold mb-2 tracking-tight'>LG</h1>
          <div className='h-1 w-24 bg-white mx-auto rounded-full' />
        </div>

        {/* Tagline */}
        <h2 className='text-4xl font-light mb-4'>Life&apos;s Good</h2>
        <p className='text-xl font-light mb-8 opacity-90 uppercase tracking-widest'>
          SOMS Platform
        </p>

        {/* Features */}
        <div className='space-y-4 text-left max-w-sm mt-10'>
          {displayFeatures.map((feature, index) => (
            <div key={index} className='flex items-start gap-3'>
              <div className='w-2 h-2 bg-white rounded-full mt-2 shadow-[0_0_8px_rgba(255,255,255,0.8)]' />
              <p className='text-lg font-light leading-tight'>{feature}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthBranding;
