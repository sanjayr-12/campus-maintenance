import useStore from "../../store/zustand";
import "./admin.login.css";
import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const user = useStore((state) => state.setUser);
  const [dis, setDis] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const email = data.get("email");
    const password = data.get("password");
    try {
      setDis(true);
      const response = await axios.post("/api/admin/login", {
        email,
        password,
      });
      toast.success("Logged in");
      setDis(false);
      user({
        name: response.data.name,
        email: response.data.email,
      });
      navigate("/dashboard");
      console.log(response.data);
    } catch (error) {
      setDis(false);
      toast.error(error.response.data.message);
      console.log(error);
      navigate("/login");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" placeholder="enter your email" />
      <br />
      <input
        type="password"
        name="password"
        placeholder="enter your password"
      />
      <br />
      <input type="submit" disabled={dis} />
      <Toaster />
    </form>
  );
};

export default AdminLogin;
