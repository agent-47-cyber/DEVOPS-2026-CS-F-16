import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="space-y-4 text-center py-12">
      <h1 className="text-4xl font-bold text-white">404</h1>
      <p className="text-neutral-400">Page not found</p>
      <Link to="/" className="inline-block text-sm text-neutral-300 underline hover:text-white">
        Return to Home
      </Link>
    </div>
  );
}

export default NotFound;
