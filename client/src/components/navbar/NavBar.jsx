import { Link } from "react-router-dom";
import useStore from "../../store/zustand";
import "./nav.css";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const NavBar = () => {
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const setLogout = useStore((state) => state.setLogOut);

  // console.log(user);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "/api/util/logout",
        {},
        { withCredentials: true }
      );
      if (response.status == 200) {
        setUser({ user: null });
        setLogout(true);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      setLogout(false);
      toast.error("error in loggout");
    }
  };

  return (
    <div className="main-nav-container">
      <div className="nav-container">
        <p>{user?.name}</p>
        <Link to="/assign-works">Assign Works</Link>
        <Link to="/register-staff">Register</Link>
        <p className="nav-logout" onClick={handleLogout}>
          Logout
        </p>
      </div>
      <Toaster />
    </div>
  );
};
