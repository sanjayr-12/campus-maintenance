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
  const setisAdmin = useStore((state) => state.setAdmin);
  const isAdmin = useStore((state)=> state.admin)
  const [dis, setDis] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [isAdmin, setisAdmin] = useState(true)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const email = sanitizeInput(data.get("email"));
    const password = sanitizeInput(data.get("password"));
    try {
      setDis(true);
      setLoading(true);
      let response = null
      if (isAdmin) {
        response = await axios.post("/api/admin/login", {
          email,
          password,
        });
        toast.success("Logged in as Admin");
        user({
          name: response.data.name,
          email: response.data.email,
          admin: true,
        });
      } else {
        response = await axios.post("/api/staff/login", { username:email, password })
        toast.success("Logged in as Staff");
         user({
           name: response.data.name,
           slug: response.data.slug,
           admin: false,
         });
      }
      setDis(false);
      setLoading(false);
      
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

  const handleStaff = () => {
     setisAdmin(!isAdmin)
  }

  return (
    <div className="form-main-container">
      <h1>{isAdmin?"Admin Login":"Staff Login"}</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <input
          type={isAdmin?"email":"text"}
          name="email"
          placeholder={isAdmin?"Enter your email":"Enter your username"}
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
        />
        <br />
        <p onClick={handleStaff}>Not an admin! sign in as a Staff</p>
        
        <Toaster />
      </form>
    </div>
  );
};

export default AdminLogin;
