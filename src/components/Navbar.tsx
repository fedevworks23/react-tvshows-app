import { Link, NavLink } from "react-router";
import { FaBars } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store";
import { clearShowDetails } from "../store/tvShowsReducer";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const linksList = [
    { path: "shows", name: "Shows" },
    { path: "schedule", name: "Schedule" },
  ];

  return (
    <nav className="relative flex justify-between items-center bg-ss-primary shadow px-4 py-3">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <span className="font-bold text-yellow-400 text-2xl">
          <NavLink
            to={"/"}
            className="pb-1 font-medium text-white hover:text-yellow-400"
            onClick={() => dispatch(clearShowDetails())}
          >
            Tv Shows
          </NavLink>
        </span>
      </div>
      {/* Desktop Nav Links */}
      <div className="hidden md:flex gap-6 ml-10">
        {linksList.map(({ path, name }, index) => (
          <NavLink
            key={index}
            to={path}
            className="flex items-center pb-1 font-medium text-white hover:text-yellow-400"
          >
            {name}
          </NavLink>
        ))}
      </div>
      {/* Search, Sign In, Menu */}
      <div className="flex items-center gap-2 md:gap-4">
        <div className="hidden sm:block relative">
          <input
            type="text"
            placeholder="Search for movies or TV shows"
            className="bg-[#181e26] px-4 py-1 pl-10 rounded focus:outline-none w-[160px] md:w-[260px] text-white"
          />
          <FiSearch className="top-2.5 left-3 absolute text-gray-400" />
        </div>
        <button className="hidden sm:block bg-[#181e26] hover:bg-yellow-400 px-4 py-1 border border-gray-600 rounded font-medium text-white hover:text-black transition">
          Search
        </button>
        {/* Hamburger menu for mobile */}
        <button
          className="md:hidden ml-2"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Open menu"
        >
          <FaBars className="text-white text-2xl" />
        </button>
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden top-full left-0 z-10 absolute flex flex-col bg-[#181e26] shadow-lg w-full animate-fade-in">
          {linksList.map(({ path, name }, index) => (
            <Link
              key={index}
              to={path}
              className="px-6 py-3 border-[#232a36] border-b text-white hover:text-yellow-400"
              onClick={() => setMenuOpen(false)}
            >
              {name}
            </Link>
          ))}
          <div className="flex flex-col gap-2 p-4">
            <input
              type="text"
              placeholder="Search for movies or TV shows"
              className="bg-[#232a36] px-4 py-2 rounded text-white"
            />
            <button className="bg-yellow-400 px-4 py-2 rounded font-medium text-black">
              Search
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
