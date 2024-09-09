import useStore from "../../store/zustand";
import "./admin.login.css";
import axios from "axios";

const AdminLogin = () => {
  const user = useStore((state) => state.setUser);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const email = data.get("email");
    const password = data.get("password");
    try {
      const response = await axios.post("/api/admin/login", {
        email,
        password,
      });
      user({
        name: response.data.name,
        email: response.data.email,
      });
    } catch (error) {
      console.log(error);
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
      <input type="submit" />
    </form>
  );
};

export default AdminLogin;
