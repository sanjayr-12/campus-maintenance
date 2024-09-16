import { Routes, Route } from "react-router-dom";
import { NavBar } from "../../components/navbar/NavBar";
import { AssignWorks } from "../assign/AssignWorks";
import { RegisterStaff } from "../../components/registerStaff/RegisterStaff";
import { Home } from "../Home/Home";

export const Dashboard = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="assign-works" element={<AssignWorks />} />
        <Route path="register-staff" element={<RegisterStaff />} />
      </Routes>
    </div>
  );
};
