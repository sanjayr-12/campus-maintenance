import { Link } from "react-router-dom";
import useStore from "../../store/zustand";
import "./nav.css";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const NavBar = () => {
  const user = useStore((state) => state.user);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "/api/admin/logout",
        {},
        { withCredentials: true }
      );
      if (response.status == 200) {
        toast.success("logged out");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error("error in loggout");
    }
  };

  return (
    <div className="main-nav-container">
      <div className="nav-container">
        <p>{user.name}</p>
        <Link to="/assign-works">Assign Works</Link>
        <Link to="/status">Status</Link>
        <p className="nav-logout" onClick={handleLogout}>
          Logout
        </p>
      </div>
      <Toaster />
    </div>
  );
};
