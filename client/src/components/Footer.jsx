import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-[#080808] px-5 pb-6 pt-4 text-white md:px-10">
      <div className="mx-auto max-w-[1600px] border-t border-white/25 pt-4">
        <div className="flex flex-col justify-between gap-4 text-[11px] sm:flex-row sm:items-center">
          <p className="font-mono uppercase tracking-[.14em] text-white/45">© {new Date().getFullYear()} Yatin Khandelwal</p>
          <div className="flex gap-5 text-white/60">
            <Link to="/projects" className="hover:text-[#9df4e6]">Work</Link>
            <Link to="/contact" className="hover:text-[#9df4e6]">Contact</Link>
            <Link to="/admin/login" className="hover:text-[#9df4e6]">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
