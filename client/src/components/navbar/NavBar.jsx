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
  const data = localStorage.getItem("user");
  const admin = JSON.parse(data);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "/api/util/logout",
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        setUser({ user: null });
        setLogout(true);
        navigate("/login");
      }
    } catch (error) {
      console.error(error.response.data.error);
      setLogout(false);
      toast.error("error in loggout ");
    }
  };

  const handleclick = () => {
    navigate("/");
  };

  return (
    <div className="main-nav-container">
      <div className="nav-container">
        <p onClick={handleclick}>{user?.name}</p>
        <Link to="assign-works">Assign Works</Link>
        {admin?.admin && <Link to="register-staff">Register</Link>}
        <p className="nav-logout" onClick={handleLogout}>
          Logout
        </p>
      </div>
      <Toaster />
    </div>
  );
};
