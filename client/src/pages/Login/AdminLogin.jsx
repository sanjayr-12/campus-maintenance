import useStore from "../../store/zustand";
import "./admin.login.css";
import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";

const sanitizeInput = (input) => {
  return DOMPurify.sanitize(input);
};

const AdminLogin = () => {
  const navigate = useNavigate();
  const user = useStore((state) => state.setUser);
  const [dis, setDis] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const email = sanitizeInput(data.get("email"));
    const password = sanitizeInput(data.get("password"));

    try {
      setDis(true);
      setLoading(true);
      const response = await axios.post("/api/admin/login", {
        email,
        password,
      });
      toast.success("Logged in");
      setDis(false);
      setLoading(false);
      user({
        name: response.data.name,
        email: response.data.email,
        admin: response.data.isAdmin,
      });
      navigate("/dashboard");
      console.log(response.data);
    } catch (error) {
      setDis(false);
      setLoading(false);
      toast.error(error.response.data.message);
      console.log(error);
      navigate("/login");
    }
  };

  return (
    <div className="form-main-container">
      <h1>Admin Login</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          required
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
        />
        <br />
        <input
          type="submit"
          disabled={dis}
          value={loading ? "Logging..." : "Submit"}
        />{" "}
        {/* Update button text */}
        <Toaster />
      </form>
    </div>
  );
};

export default AdminLogin;
