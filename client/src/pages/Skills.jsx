import Reveal from '../components/Reveal.jsx';
import { getSkills } from '../api/index.js';
import { useApi } from '../hooks/useApi.js';

function Skills() {
  const { data: skills, loading, error } = useApi(getSkills, []);
  const groups = (skills || []).reduce((all, skill) => ({ ...all, [skill.category || 'Other']: [...(all[skill.category || 'Other'] || []), skill] }), {});
  return <div className="min-h-screen pt-32"><section className="px-5 pb-24 md:px-10"><div className="mx-auto max-w-[1200px]"><Reveal><p className="font-mono text-[10px] uppercase tracking-[.22em] text-[#9df4e6]">Technical practice</p><h1 className="mt-5 text-[clamp(3.5rem,10vw,9rem)] font-bold leading-[.78] tracking-[-.1em]">Tools are only as good as the <span className="editorial-italic text-[#9df4e6]">thinking</span> behind them.</h1></Reveal>{loading && <div className="mt-16 h-48 animate-pulse border-t border-white/20" />}{error && <p className="mt-16 font-mono text-sm text-red-300">Unable to load skills.</p>}<div className="mt-16">{Object.entries(groups).map(([category, list]) => <Reveal key={category}><section className="grid gap-5 border-t border-white/20 py-6 md:grid-cols-[.65fr_1.35fr]"><h2 className="font-mono text-[10px] uppercase tracking-[.18em] text-[#9df4e6]">{category}</h2><div className="flex flex-wrap gap-x-5 gap-y-3">{list.map((skill) => <span key={skill._id || skill.name} className="text-base text-white/75">{skill.name}<sup className="ml-1 font-mono text-[8px] text-white/35">{skill.level}</sup></span>)}</div></section></Reveal>)}</div></div></section></div>;
}

export default Skills;
