
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import toast from "react-hot-toast";

const Navbar = ({ onSearchResults, onNoteClick }) => {
  const { user, logout } = useAuth();
  const [searchInput, setSearchInput] = useState("");

  const navigate = useNavigate();

  if (!user) {
    return null; 
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchInput) {
      toast.error("Please enter a search query");
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:8000/api/note/search?query=${searchInput}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      if (res.data.success) {
        onSearchResults(res.data.data);
      }
    } catch (error) {
      onSearchResults([]);
      toast.error("Failed to search notes");
    }
  };

  return (
    <div className="bg-white flex flex-col sm:flex-row items-center justify-between px-6 py-2 drop-shadow">
      <div className="flex items-center justify-between w-full sm:w-auto">
        <h2
          className="text-xl font-medium text-black py-2 cursor-pointer"
          onClick={() => {
            setSearchInput("");
            onNoteClick();
          }}
        >
          Notes
        </h2>
        <div className="flex items-center gap-4 sm:hidden">
          {" "}
          <button
            className="border-2 px-3 py-2 rounded-md text-white bg-red-600 hover:bg-red-500"
            onClick={handleLogout}
          >
            Logout
          </button>
          <div className="border-2 w-12 h-12 rounded-full flex justify-center items-center text-xl font-bold bg-slate-200">
            {user?.name?.split("")[0].toUpperCase()}
          </div>
        </div>
      </div>
      <form
        className="relative flex items-center w-full sm:w-auto mt-4 sm:mt-0 cursor-pointer"
        onSubmit={handleSearch}
      >
        <IoSearchOutline className="w-5 h-5 text-gray-400 absolute right-3" />
        <input
          type="text"
          placeholder="Search..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-full sm:w-[500px] px-3 py-2 border border-gray-300 rounded-md"
        />
      </form>
      <div className="hidden sm:flex justify-center items-center gap-4 mt-4 sm:mt-0">
        {" "}
        <button
          className="border-2 px-3 py-2 rounded-md text-white bg-red-600 hover:bg-red-500"
          onClick={handleLogout}
        >
          Logout
        </button>
        <div className="border-2 w-12 h-12 rounded-full flex justify-center items-center text-xl font-bold bg-slate-200">
          {user?.name?.split("")[0].toUpperCase()}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
