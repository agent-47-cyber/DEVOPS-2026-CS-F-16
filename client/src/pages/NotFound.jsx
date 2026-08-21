import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal.jsx';

function NotFound() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center text-center">
      <Reveal className="space-y-4">
        <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">Error 404</span>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">Route Not Found</h1>
        <p className="text-sm text-neutral-400 max-w-sm mx-auto">
          The requested page does not exist or has been relocated within the application routing graph.
        </p>
        <div className="pt-2">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-lg bg-neutral-100 px-4 py-2.5 text-xs font-semibold text-neutral-900 transition-colors hover:bg-neutral-300"
          >
            Return to Home &rarr;
          </Link>
        </div>
      </Reveal>
    </div>
  );
}

export default NotFound;
