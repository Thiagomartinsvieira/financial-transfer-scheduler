import React from "react";
import { Building2Icon } from "lucide-react";

interface HeaderProps {
  title?: string;
  logoSrc?: string;
}

const Header = ({
  title = "Financial Transfer Scheduling System",
  logoSrc = "",
}: HeaderProps) => {
  return (
    <header className="w-full h-20 bg-blue-800 text-white shadow-md flex items-center px-6 sticky top-0 z-10">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {logoSrc ? (
            <img src={logoSrc} alt="Logo" className="h-10 w-auto" />
          ) : (
            <Building2Icon className="h-8 w-8 text-blue-200" />
          )}
          <h1 className="text-2xl font-bold">{title}</h1>
        </div>
        <div className="flex items-center space-x-4">
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="hover:text-blue-200 transition-colors">
              Dashboard
            </a>
            <a href="#" className="hover:text-blue-200 transition-colors">
              Accounts
            </a>
            <a href="#" className="hover:text-blue-200 transition-colors">
              Transfers
            </a>
            <a href="#" className="hover:text-blue-200 transition-colors">
              Help
            </a>
          </nav>
          <div className="flex items-center space-x-2 border-l pl-4 border-blue-700">
            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-sm font-medium">JD</span>
            </div>
            <span className="hidden md:inline">John Doe</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
