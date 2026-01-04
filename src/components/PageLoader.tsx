const PageLoader = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center'>
      <div className='text-center'>
        {/* LG Logo with animation */}
        <div className='relative mb-8'>
          <div className='absolute inset-0 flex items-center justify-center'>
            <div className='w-32 h-32 border-4 border-[#A50034] border-t-transparent rounded-full animate-spin' />
          </div>
          <div className='relative z-10 flex items-center justify-center h-32'>
            <h1 className='text-7xl font-bold text-[#A50034] animate-pulse'>
              LG
            </h1>
          </div>
        </div>

        {/* Loading text */}
        <p className='text-xl text-gray-600 font-light mb-2'>
          Life&apos;s Good
        </p>
        <p className='text-sm text-gray-500'>Loading your workspace...</p>

        {/* Loading dots animation */}
        <div className='flex justify-center gap-2 mt-6'>
          <div
            className='w-2 h-2 bg-[#A50034] rounded-full animate-bounce'
            style={{ animationDelay: "0ms" }}
          />
          <div
            className='w-2 h-2 bg-[#A50034] rounded-full animate-bounce'
            style={{ animationDelay: "150ms" }}
          />
          <div
            className='w-2 h-2 bg-[#A50034] rounded-full animate-bounce'
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
