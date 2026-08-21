import { useParams, Link } from 'react-router-dom';

function ProjectDetail() {
  const { id } = useParams();

  return (
    <div className="space-y-4">
      <div className="mb-2">
        <Link to="/projects" className="text-sm text-neutral-400 hover:text-white">
          &larr; Back to all projects
        </Link>
      </div>
      <h1 className="text-3xl font-bold tracking-tight text-white">Project Case Study</h1>
      <p className="text-neutral-400">
        Viewing project details for ID: <span className="font-mono text-neutral-200">{id}</span>. Full case-study layout and real data integration will be implemented in Phase 6.
      </p>
    </div>
  );
}

export default ProjectDetail;
