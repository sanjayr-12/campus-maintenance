import { Route, Routes } from "react-router-dom";
import AdminLogin from "./pages/Login/AdminLogin";
// import { ProtectedRoutes } from "./utils/ProtectedRoutes";
import { Dashboard } from "./pages/dashboard/Dashboard";
import Verify from "./utils/Verify";
import { AssignWorks } from "./pages/assign/AssignWorks";
import { RegisterStaff } from "./components/registerStaff/RegisterStaff";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<AdminLogin />} />
        {/* <Route element={<ProtectedRoutes />}> */}
        <Route element={<Verify />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/assign-works" element={<AssignWorks />} />
          <Route path="/register-staff" element={<RegisterStaff/>}/>
        </Route>
        {/* </Route> */}
      </Routes>
    </div>
  );
}

export default App;
