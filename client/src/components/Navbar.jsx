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
    <header className="border-b border-neutral-800 bg-neutral-950/80 sticky top-0 z-50 backdrop-blur">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <NavLink to="/" className="font-semibold tracking-tight text-white hover:text-neutral-200">
          Portfolio
        </NavLink>
        <nav className="flex items-center space-x-6 text-sm">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? 'text-white font-medium transition-colors'
                  : 'text-neutral-400 hover:text-neutral-200 transition-colors'
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
