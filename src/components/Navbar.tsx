import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Florin from '../../public/Florin.jpeg';
import { IoCarSport } from "react-icons/io5";


interface NavbarProps {
    onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onLogout }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [navbarOpen, setNavbarOpen] = useState(false);

    return (
        <nav className="bg-gradient-to-t from-slate-300 to-slate-900 h-24  ">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <IoCarSport className='w-12 h-12' />

                    <span className="self-center font-serif text-2xl font-semibold whitespace-nowrap dark:text-white">Cars App</span>
                </Link>
                <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <button
                        type="button"
                        className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        aria-expanded={dropdownOpen}
                    >
                        <span className="sr-only">Open user menu</span>
                        <img className="w-12 h-12 rounded-full shadow-md shadow-slate-600" src={Florin} alt="user photo" />
                    </button>

                    {dropdownOpen && (
                        <div className="z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
                            <div className="px-4 py-3">
                                <span className="block text-sm text-gray-900 dark:text-white">Florin Bejera</span>
                                <span className="block text-sm text-gray-500 truncate dark:text-gray-400">florinpetru0306@gmail.com</span>
                            </div>
                            <ul className="py-2">
                                <button
                                    onClick={onLogout}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                >
                                    Logout
                                </button>
                            </ul>
                        </div>
                    )}
                    <button
                        onClick={() => setNavbarOpen(!navbarOpen)}
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-user"
                        aria-expanded={navbarOpen}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    );
};
