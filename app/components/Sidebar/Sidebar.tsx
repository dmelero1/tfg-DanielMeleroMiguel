import React from 'react'
import { Link, NavLink } from 'react-router'
import logo from 'app/components/Sidebar/ImgSidebar/logodmsport.png';
import { MdDashboard, MdFitnessCenter, MdPerson } from "react-icons/md"
import { PiCourtBasketballFill } from "react-icons/pi";

function Sidebar() {
    return (
        <aside className="bg-indigo-950 text-white w-16 sm:w-20 md:w-50 h-screen fixed top-0 left-0 shadow-lg p-4 md:p-6 transition-all duration-300">
            <div className="flex flex-col items-center">
                <Link to="/" className="mb-8 w-full flex justify-center">
                    <img
                        src={logo}
                        alt="Logo"
                        className="w-12 sm:w-16 md:w-32 transition-all duration-300"
                    />
                </Link>
                <nav className="flex flex-col items-center md:items-start gap-4 text-sm sm:text-base md:text-lg w-full">
                    <Link
                        to="/dashboard"
                        className="flex items-center px-2 sm:px-3 md:px-4 py-2 rounded-lg transition duration-300 hover:bg-gray-200 hover:text-indigo-950 hover:shadow-lg hover:scale-105 transform"
                    >
                        <MdDashboard className="text-xl mr-3" />
                        <span className="hidden md:inline">Dashboard</span>
                    </Link>
                    <Link
                        to="/exercises"
                        className="flex items-center px-2 sm:px-3 md:px-4 py-2 rounded-lg transition duration-300 hover:bg-gray-200 hover:text-indigo-950 hover:shadow-lg hover:scale-105 transform"
                    >
                        <MdFitnessCenter className="text-xl mr-3" />
                        <span className="hidden md:inline">Ejercicios</span>
                    </Link>
                    <Link
                        to="/instalaciones"
                        className="flex items-center px-2 sm:px-3 md:px-4 py-2 rounded-lg transition duration-300 hover:bg-gray-200 hover:text-indigo-950 hover:shadow-lg hover:scale-105 transform"
                    >
                        <PiCourtBasketballFill  className="text-xl mr-3" />
                        <span className="hidden md:inline">Instalaciones</span>
                    </Link>
                    <Link
                        to="/profile"
                        className="flex items-center px-2 sm:px-3 md:px-4 py-2 rounded-lg transition duration-300 hover:bg-gray-200 hover:text-indigo-950 hover:shadow-lg hover:scale-105 transform"
                    >
                        <MdPerson className="text-xl mr-3" />
                        <span className="hidden md:inline">Perfil</span>
                    </Link>
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;