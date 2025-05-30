import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import SignUp from "../components/SignUp/SignUp";
import logo from "../components/Sidebar/ImgSidebar/logodmsport.png";
import { GrUserAdmin } from "react-icons/gr";
import { Link } from "react-router";

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = React.useState<{ username?: string; role?: string }>({});

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(storedUser);
    if (storedUser?.role !== "admin") {
      navigate("/dashboard");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <nav className="flex justify-between items-center px-6 py-4 bg-gray-800 shadow-md">
        <div className="flex items-center gap-5 text-xl font-bold">
          Panel de Administración
          <span className="flex items-center gap-1 text-md text-gray-300 uppercase">
            <GrUserAdmin />
            {user?.username || "Admin"}
          </span>
        </div>

        <div className="flex items-center gap-6">
          <Link to="/dashboard">
            <img
              src={logo}
              alt="Logo"
              className="w-10 h-auto sm:w-18 md:w-24 object-contain"
            />
          </Link>
          <button
            onClick={handleLogout}
            className="py-2 px-4 text-white font-semibold rounded-2xl border-4 border-black border-t-0 bg-red-600 shadow-[4px_8px_0_0_#000] transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:translate-y-1 hover:shadow-[1px_2px_0_0_#000] focus:outline-none"
          >
            Cerrar sesión
          </button>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center overflow-hidden px-4">
        <SignUp />
      </div>
    </div>
  );
};

export default SignUpPage;
