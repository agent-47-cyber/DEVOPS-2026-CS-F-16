import { Link } from 'react-router-dom';

function Projects() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold tracking-tight text-white">Work & Projects</h1>
      <p className="text-neutral-400">
        List of all projects retrieved from the database will appear here in Phase 6.
      </p>
      <div className="pt-2">
        <Link
          to="/projects/demo-project"
          className="inline-block text-sm text-neutral-300 underline hover:text-white"
        >
          View sample project detail &rarr;
        </Link>
      </div>
    </div>
  );
}

export default Projects;
