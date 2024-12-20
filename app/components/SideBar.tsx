
// import { HelpCircle } from 'lucide-react';
import { IoIosHelpCircleOutline } from "react-icons/io"
import { NavItem } from '../ui/NavItem';
import { Logo } from '../ui/Logo';
import { TbSettings2 } from "react-icons/tb";
import { RiBookMarkedLine, RiDashboard3Line, RiBookReadFill } from "react-icons/ri";
import { VscPieChart } from "react-icons/vsc";
import { IconType } from 'react-icons';
import Link from "next/link";
const menuItems = [
  { icon: RiDashboard3Line, label: 'Dashboard', active: false },
  { icon: RiBookReadFill, label: 'Students', active: true },
  { icon: RiBookMarkedLine, label: 'Chapter', active: false },
  { icon: IoIosHelpCircleOutline,   label: 'Help', active: false },
  { icon: VscPieChart, label: 'Reports', active: false },
  { icon: TbSettings2, label: 'Settings', active: false },
];

interface NavItem{
  icon: IconType;
}

export function Sidebar() {
  return (
    <div className="w-64 bg-gray-50 h-screen p-4">
      <Link href={"/"} >
      <Logo className="mb-8" />
      </Link>
      <nav>
        {menuItems.map((item, index) => (
          <NavItem 
            key={index} 
            icon={item.icon} 
            label={item.label} 
            active={item.active}
          />
        ))}
      </nav>
    </div>
  );
}