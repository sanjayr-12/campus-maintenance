import { Route, Routes } from "react-router-dom";
import AdminLogin from "./pages/Login/AdminLogin";
import { Dashboard } from "./pages/dashboard/Dashboard";
import Verify from "./utils/Verify";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<AdminLogin />} />
        <Route element={<Verify />}>
          <Route path="*" element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
