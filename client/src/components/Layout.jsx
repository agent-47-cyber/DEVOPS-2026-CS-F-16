import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

function Layout() {
  return (
    <div className="relative flex min-h-screen flex-col bg-neutral-950 text-neutral-100 selection:bg-neutral-800 selection:text-white">
      {/* Background ambient gradient glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(120,119,198,0.08),rgba(255,255,255,0))]"
        aria-hidden="true"
      />

      <Navbar />

      <main className="relative z-10 mx-auto w-full max-w-5xl flex-1 px-6 py-12">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
