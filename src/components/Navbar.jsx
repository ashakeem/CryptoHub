import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeSwitch from "./ThemeSwitch";
import { IoMenu } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { UserAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const [nav, setNav] = useState(false);
  const handleNav = () => setNav(!nav);
  const handleSignOut = async () => {
    try {
      await logout();
      navigate("/");
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <div className=" rounded-div flex items-center justify-between h-20 font-bold">
      <Link to="/">
        <h1 className="text-2xl">Cryptohub</h1>
      </Link>
      <div className="hidden md:block">
        <ThemeSwitch />
      </div>
      {user?.email ? (
        <div>
          <Link to="/account" className="p-4">
            Account
          </Link>
          <button onClick={handleSignOut}>Sign out</button>
        </div>
      ) : (
        <div className="hidden md:block">
          <Link to="/signin" className="p-4 hover:text-accent">
            Sign In
          </Link>
          <Link
            to="/signup"
            className="bg-button text-btnText px-5 py-2 ml-2 rounded-2xl shadow-lg hover:shadow-2xl"
          >
            Sign Up
          </Link>
        </div>
      )}
      {/* Menu Icon */}
      <div className="block md:hidden cursor-pointer z-10" onClick={handleNav}>
        {nav ? <IoMdClose size={25} /> : <IoMenu size={20} />}
      </div>

      {/* Mobile Menu */}
      <div
        className={
          nav
            ? "md:hidden fixed left-0 top-20 flex flex-col items-center justify-between w-full h-[90%] bg-primary ease-in duration-300 z-10"
            : "fixed left-[-100%] top-20 h-[90%] flex flex-col items-center justify-between ease-in duration-300"
        }
      >
        <ul className="w-full p-4 ">
          <li className="border-b py-6">
            <Link onClick={handleNav} to="/">
              Home
            </Link>
          </li>
          <li className="border-b py-6">
            <Link onClick={handleNav} to="/account">
              Account
            </Link>
          </li>
          <li className="py-6">
            <ThemeSwitch />
          </li>
        </ul>
        <div className="flex flex-col w-full p-4">
          <Link onClick={handleNav} to="/signin">
            <button className="w-full my-2 p-3 bg-primary text-primary border border-secondary rounded-2xl shadow-xl">
              Sign In
            </button>
          </Link>
          <Link onClick={handleNav} to="/signup">
            <button className="w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
