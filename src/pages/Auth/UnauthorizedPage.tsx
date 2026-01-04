import { Link } from "react-router-dom";

const UnauthorizedPage = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='text-center'>
        <h1 className='text-4xl font-bold text-gray-900 mb-4'>403</h1>
        <p className='text-gray-600 mb-4'>У вас нет доступа к этой странице</p>
        <Link to='/' className='text-[#A50034] hover:underline font-medium'>
          Back to Home Page
        </Link>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
