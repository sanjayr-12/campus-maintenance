import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import "./assignWorkers.css"

export const AssignWorks = () => {
  const [form, setForm] = useState([]);
  const [staff, setstaff] = useState([]);

  useEffect(() => {
    async function getStaff() {
      try {
        const response = await axios.get("/api/admin/getAllstaff", {
          withCredentials: true,
        });
        setstaff(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getStaff();
  });
  const handleNumbers = (e) => {
    let count = e.target.value;
    if (count > 10) {
      count = 10
    }
    if (count < 0) {
      count=0
    }
    setForm(Array.from({ length: count }, (_, i) => i));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const workerArray = data.getAll("workers");
    const staff = data.get("staff");
    const location = data.get("location");
    const workers = workerArray.map((worker) => ({
      name: worker,
    }));

    try {
      const response = await axios.post("/api/admin/addWorkers", {
        slug: staff,
        location,
        workers,
      });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.error)
    }
  };
  return (
    <div className="assign-main-container">
      <form onSubmit={handleSubmit} className="assign-form-container">
        <label htmlFor="staff">Username:</label>
        <select name="staff" id="staff" required>
          {staff.map((item) => {
            return (
              <option key={item.slug} value={item.slug}>
                {item.name}
              </option>
            );
          })}
        </select>
        <br />
        <label htmlFor="location">Location:</label>
        <input type="text" name="location" id="location" required />
        <br />
        <label htmlFor="numberOfWorkers">No of Workers:</label>
        <input type="number" id="numberOfWorkers" onChange={handleNumbers} min={1} max={10} />
        {form.map((index) => (
          <div key={index}>
            <label htmlFor={`worker-${index}`}>Workers:</label>
            <input type="text" name="workers" id={`worker-${index}`} required />
          </div>
        ))}
        <input type="submit" />
      </form>
      <Toaster />
    </div>
  );
};
