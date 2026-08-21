import { NavLink } from 'react-router-dom';

function Navbar() {
  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Work', path: '/projects' },
    { label: 'Skills', path: '/skills' },
    { label: 'Experience', path: '/experience' },
    { label: 'Contact', path: '/contact' },
    { label: 'Resume', path: '/resume' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-800/80 bg-neutral-950/75 backdrop-blur-md transition-all duration-200">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        {/* Brand / Monogram */}
        <NavLink
          to="/"
          className="group flex items-center space-x-2 text-sm font-semibold tracking-tight text-white transition-opacity hover:opacity-80"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-neutral-800 border border-neutral-700 text-xs font-mono text-neutral-200 group-hover:border-neutral-500 transition-colors">
            YK
          </span>
          <span className="font-medium tracking-tight">Yatin Khandelwal</span>
        </NavLink>

        {/* Public Navigation */}
        <nav className="flex items-center space-x-1 sm:space-x-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `rounded-md px-3 py-1.5 text-xs sm:text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-neutral-800/90 text-white shadow-sm ring-1 ring-neutral-700/50'
                    : 'text-neutral-400 hover:bg-neutral-900 hover:text-neutral-200'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
