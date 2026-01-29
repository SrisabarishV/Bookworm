import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-purple-700 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo / Home Link */}
        <Link to="/" className="text-2xl font-bold tracking-wide hover:text-purple-200 transition">
          📚 Bookworm
        </Link>

        {/* Simple Menu */}
        <div className="flex gap-6 font-medium">
          <Link to="/" className="hover:text-purple-200 transition">Home</Link>
          {/* <a href="https://gutendex.com/" target="_blank" rel="noreferrer" className="hover:text-purple-200 transition">API</a> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;