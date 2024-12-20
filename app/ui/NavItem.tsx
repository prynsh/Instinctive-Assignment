
import { LucideIcon } from 'lucide-react';

interface NavItemProps {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export function NavItem({ icon: Icon, label, active = false, onClick }: NavItemProps) {
  return (
    <div
      onClick={onClick}
      className={`
        flex items-center gap-3 p-2 rounded-lg mb-2 cursor-pointer 
        transition-colors duration-200 
        ${active ? 'bg-gray-200 text-black font-extrabold' : 'text-gray-500 hover:bg-gray-100'}
        sm:p-3
      `}
    >
      <Icon className="h-5 w-5" />
      <span className="font-medium">{label}</span>
    </div>
  );
}
