import { Outlet } from "react-router-dom";
import BottomNav from "@/components/employee/BottomNav";

const EmployeeLayout = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <Outlet />
      <BottomNav />
    </div>
  );
};

export default EmployeeLayout;