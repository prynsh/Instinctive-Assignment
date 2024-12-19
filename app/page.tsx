
import { Header } from "./components/Header";
import { Sidebar } from "./components/SideBar";
import StudentTable from "./components/StudentTable";

export default function Home() {
  return (
    <div>
      <div className="flex h-screen bg-gray-100">
        <Sidebar/>
        <div className="flex-1 flex flex-col">
        <Header/>
        <div>
          <StudentTable/>
        </div>
        </div>
      </div>
     

    </div>
  );
}
