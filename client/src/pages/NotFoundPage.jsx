import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-md mx-auto">
        <div className="text-[#5c95e0] text-7xl mb-6">
          <i className="fas fa-exclamation-circle"></i>
        </div>
        <h1 className="text-4xl font-bold mb-4 text-[#1d3309]">404</h1>
        <p className="text-2xl mb-8">Page Not Found</p>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn btn-primary px-8 py-3">
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;