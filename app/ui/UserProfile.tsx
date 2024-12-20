import Image from "next/image";
import  User_pic  from "../ui/assets/User_pic.png"

export function UserProfile() {
  return (
    <div className="flex items-center gap-2">
      <Image src={User_pic} alt="Profile" className="h-8 w-8 rounded-full object-cover" />
      <span className="font-medium text-sm sm:text-base">Adeline H. Dancy</span>
    </div>
  );
}
