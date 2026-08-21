function Footer() {
  return (
    <footer className="mt-auto border-t border-neutral-800/80 bg-neutral-950 py-10 text-xs text-neutral-500">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <div>
          <p className="text-neutral-400 font-medium">Yatin Khandelwal &copy; {new Date().getFullYear()}</p>
          <p className="text-neutral-600 text-[11px] mt-0.5">B.Tech Fullstack & DevOps Capstone Project</p>
        </div>
        <div className="flex items-center space-x-4 text-neutral-400">
          <span className="inline-flex items-center gap-1.5 text-[11px]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse-dot"></span>
            All systems operational
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
