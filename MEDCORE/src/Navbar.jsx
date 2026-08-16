import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const linkClass = (path) =>
    `text-sm font-medium tracking-wide transition-colors pb-1 border-b-2 ${
      location.pathname === path
        ? "text-paper border-amber"
        : "text-paper/70 border-transparent hover:text-paper"
    }`;

  return (
    <nav className="grid grid-cols-3 items-center bg-pharmacy-dark px-6 py-4">
      <div className="justify-self-start">
        <Link to="/" className={linkClass("/")}>Home</Link>
      </div>
      <div className="justify-self-center">
        <Link to="/shop" className={linkClass("/shop")}>Shop</Link>
      </div>
      <div className="justify-self-end">
        <Link to="/admin" className={linkClass("/admin")}>Admin Portal</Link>
      </div>
    </nav>
  );
}

export default Navbar;