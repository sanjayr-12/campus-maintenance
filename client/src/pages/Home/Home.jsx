import { useEffect, useState } from "react";
import axios from "axios";
import "./home.css";

export const Home = () => {
  const [allData, setAllData] = useState([]);

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
  }, []);
  console.log(allData);
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
                </tr>
              </thead>
              <tbody>
                {data.workers.map((worker) => {
                  return (
                    <tr key={worker._id}>
                      <td>{worker.id}</td>
                      <td>{worker.name}</td>
                      <td>{data.location}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
};
