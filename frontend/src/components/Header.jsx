import React from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logout from "@/components/Logout";
import ModeToggle from "@/components/ui/mode-toggle";

const Header = ({ onMenuClick }) => {
  return (
    <header className="bg-background border-b px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="md:hidden" onClick={onMenuClick}>
          <Menu className="w-6 h-6" />
        </Button>
        <h2 className="text-2xl font-bold">Welcome to Skilligr</h2>
      </div>
      <div className="flex items-center gap-4">
        <ModeToggle/>
        <Logout/>
      </div>
    </header>
  );
};

export default Header;