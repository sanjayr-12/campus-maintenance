// App.jsx

import { Route, Routes } from "react-router-dom";
import AdminLogin from "./pages/Login/AdminLogin";
import useStore from "./store/zustand"; // Import zustand store

function App() {
  // Correct usage of the hook to access state
  const user = useStore((state) => state.user);

  return (
    <div>
      <Routes>
        <Route path="/login" element={<AdminLogin />} />
      </Routes>
      {console.log(user)}
    </div>
  );
}

export default App;
