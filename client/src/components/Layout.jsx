import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-950 text-neutral-100">
      <Navbar />
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-12">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
