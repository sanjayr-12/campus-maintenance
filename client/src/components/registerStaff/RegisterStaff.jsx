import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import "./registerStaff.css";
import { useEffect, useState } from "react";

export const RegisterStaff = () => {
  const [staff, setstaff] = useState([]);

  useEffect(() => {
    async function getAll() {
      try {
        const response = await axios.get(
          "/api/admin/getAllstaff",
          {},
          { withCredentials: true }
        );
        setstaff(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getAll();
  }, []);

  console.log(staff);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const name = formdata.get("name");
    const password = formdata.get("password");

    try {
      const response = await axios.post(
        "/api/admin/staffSignup",
        { name, password },
        { withCredentials: true }
      );
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className="main-register-container">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter the name" name="name" />
        <br />
        <input type="text" placeholder="Password" name="password" />
        <br />
        <input type="submit" />

        <Toaster />
      </form>
      <span></span>

      <div className="get-staff-container">
        <p>All the staff available</p>
        <ul>
          {staff.map((item) => {
            return (
              <div key={item._id} className="children">
                <li>
                  {item.name} - {item.slug}
                </li>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
