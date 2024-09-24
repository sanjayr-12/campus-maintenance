import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import "./home.css";

export const Home = () => {
  const [allData, setAllData] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function getAll() {
      try {
        const result = await axios.get("/api/admin/all", {
          withCredentials: true,
        });
        setAllData(result.data);
      } catch (error) {
        console.log(error);
      }
    }

    getAll();
  }, [count]);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`api/staff/delete/${id}`, {
        withCredentials: true,
      });
      toast.success(response.data.message);
      setCount(count+1)
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
    }
  };

  return (
    <div>
      {allData.map((data) => {
        return (
          <div key={data._id}>
            <h3>Managing Staff: {data.name}</h3>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Location</th>
                  <th>delete</th>
                </tr>
              </thead>
              <tbody>
                {data.workers.map((worker) => {
                  return (
                    <tr key={worker._id}>
                      <td>{worker.id}</td>
                      <td>{worker.name}</td>
                      <td>{data.location}</td>
                      <td>
                        {" "}
                        <button
                          onClick={() => handleDelete(worker._id)}
                          className="delete-btn"
                        >
                          X
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      })}
      <Toaster/>
    </div>
  );
};
