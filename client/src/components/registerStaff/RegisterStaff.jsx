import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import "./registerStaff.css";
import { useEffect, useState } from "react";

export const RegisterStaff = () => {
  const [staff, setstaff] = useState([]);
  const [render, setRender] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getAll() {
      setLoading(true); 
      try {
        const response = await axios.get(
          "/api/admin/getAllstaff",
          {},
          { withCredentials: true }
        );
        setstaff(response.data);
      } catch (error) {
        toast.error(error.response.data.error);
      } finally {
        setLoading(false); 
      }
    }
    getAll();
  }, [render]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formdata = new FormData(e.target);
    const name = formdata.get("name");
    const password = formdata.get("password");
    try {
      const response = await axios.post(
        "/api/admin/staffSignup",
        { name, password },
        { withCredentials: true }
      );
      setRender(render + 1);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await axios.delete(`/api/admin/delete/${id}`, {
        withCredentials: true,
      });
      toast.success(result.data.message);
      setRender(render + 1);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className="main-register-container">
      <form onSubmit={handleSubmit}>
        <p>Register for new Staff</p>
        <input type="text" placeholder="Enter the name" name="name" />
        <br />
        <input type="text" placeholder="Password" name="password" />
        <br />
        <input
          type="submit"
          value={isSubmitting ? "Submitting..." : "Submit"}
          disabled={isSubmitting}
        />{" "}
        <Toaster />
      </form>
      <span></span>

      <div className="get-staff-container">
        <p>All the staff available</p>
        <table className="staff-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>User ID</th>
              <th>Delete</th>
            </tr>
          </thead>
          {loading ? (
            <tbody>
              <tr>
                <td colSpan="3">Loading...</td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {staff.map((item) => {
                return (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.slug}</td>
                    <td>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="delete-btn"
                      >
                        X
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};
