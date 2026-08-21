import { useMemo } from 'react';
import Reveal from '../components/Reveal.jsx';
import { getSkills } from '../api/index.js';
import { useApi } from '../hooks/useApi.js';

function Skills() {
  const { data: skills, loading, error, refetch } = useApi(getSkills, []);

  // Group fetched skills dynamically by category
  const categorizedSkills = useMemo(() => {
    if (!skills || !Array.isArray(skills)) return {};
    return skills.reduce((acc, skill) => {
      const cat = skill.category || 'General';
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(skill);
      return acc;
    }, {});
  }, [skills]);

  const categories = Object.keys(categorizedSkills);

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">Technical Expertise</span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">Skills & Competencies</h1>
        <p className="text-neutral-400 max-w-2xl text-base leading-relaxed">
          Comprehensive inventory of fullstack web development and DevOps automation technologies loaded from MongoDB via Express.
        </p>
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="animate-pulse rounded-xl border border-neutral-800/80 bg-neutral-900/40 p-6 h-60 space-y-4">
              <div className="h-6 w-48 bg-neutral-800 rounded" />
              <div className="h-4 w-32 bg-neutral-800/60 rounded" />
              <div className="flex flex-wrap gap-2 pt-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-8 w-24 bg-neutral-800 rounded-lg" />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="rounded-xl border border-red-900/50 bg-red-950/20 p-8 text-center space-y-3">
          <p className="text-sm text-red-400 font-mono">Failed to fetch skills: {error}</p>
          <button
            onClick={refetch}
            className="rounded-md border border-red-800 bg-red-900/40 px-4 py-1.5 text-xs text-red-200 hover:bg-red-900/60 transition-colors"
          >
            Retry Fetching Skills
          </button>
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && categories.length === 0 && (
        <div className="rounded-xl border border-neutral-800/80 bg-neutral-900/20 p-12 text-center text-sm text-neutral-500">
          No skills records found in the database.
        </div>
      )}

      {/* Grid of Categorized Skill Cards */}
      {!loading && !error && categories.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((categoryName, idx) => (
            <Reveal key={categoryName} delay={idx * 80}>
              <div className="h-full rounded-xl border border-neutral-800/80 bg-neutral-900/30 p-6 transition-all duration-300 hover:border-neutral-700 hover:bg-neutral-900/60">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-white">{categoryName}</h2>
                  <span className="text-[11px] font-mono text-neutral-500">
                    {categorizedSkills[categoryName].length} skills
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {categorizedSkills[categoryName].map((skill) => (
                    <div
                      key={skill._id || skill.name}
                      className="flex items-center justify-between gap-2.5 rounded-lg border border-neutral-800/80 bg-neutral-950/60 px-3 py-1.5 text-xs transition-colors hover:border-neutral-700"
                    >
                      <span className="font-medium text-neutral-200">{skill.name}</span>
                      {skill.level && (
                        <span className="text-[10px] font-mono text-neutral-500">
                          {skill.level}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}

export default Skills;
