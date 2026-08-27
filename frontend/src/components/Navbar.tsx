import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            onClick={closeMenu}
            className="text-2xl font-bold tracking-[0.2em] text-gray-900"
          >
            SCENTORA
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  isActive
                    ? "text-gray-900"
                    : "text-gray-500 hover:text-gray-900"
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/products"
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  isActive
                    ? "text-gray-900"
                    : "text-gray-500 hover:text-gray-900"
                }`
              }
            >
              Shop
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  isActive
                    ? "text-gray-900"
                    : "text-gray-500 hover:text-gray-900"
                }`
              }
            >
              About
            </NavLink>
          </div>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-4 md:flex">
            <Link
              to="/cart"
              className="text-sm font-medium text-gray-700 transition hover:text-gray-900"
            >
              Cart
            </Link>

            <Link
              to="/login"
              className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700"
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="text-center border-t border-gray-100 py-4 md:hidden">
            <div className="flex flex-col gap-2">

              <NavLink
                to="/"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-3 text-sm font-medium ${
                    isActive
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50"
                  }`
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/products"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-3 text-sm font-medium ${
                    isActive
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50"
                  }`
                }
              >
                Shop
              </NavLink>

              <NavLink
                to="/about"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-3 text-sm font-medium ${
                    isActive
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50"
                  }`
                }
              >
                About
              </NavLink>

              <Link
                to="/cart"
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50"
              >
                Cart
              </Link>

              <Link
                to="/login"
                onClick={closeMenu}
                className="mt-2 rounded-xl bg-gray-900 px-4 py-3 text-center text-sm font-medium text-white hover:bg-gray-700"
              >
                Login
              </Link>

            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;