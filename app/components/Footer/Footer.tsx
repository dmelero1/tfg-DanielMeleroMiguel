import { FaInstagram, FaTiktok, FaXTwitter } from "react-icons/fa6";
import logo from "../Sidebar/ImgSidebar/logodmsport.png"

const Footer = () => {
  return (
    <footer className="bg-black text-white py-4 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between">
        <div className="mb-4 sm:mb-0">
          <img src={logo} alt="DMSport Logo" className="h-20" />
        </div>

        <div className="flex items-center gap-2">
          <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-pink-400">
            <FaInstagram size={20} />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-red-400">
            <FaTiktok size={20} />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-blue-400">
            <FaXTwitter  size={20} />
          </a>
          <p className="ml-2">@dmsport</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;