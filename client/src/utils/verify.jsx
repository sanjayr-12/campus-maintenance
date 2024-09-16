import { useEffect } from "react";
import useStore from "../store/zustand";
import axios from "axios";
import { useNavigate, Outlet } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Verify = () => {
  const user = useStore((state) => state.user);
  const navigate = useNavigate();
  const logout = useStore((state) => state.logout)
  console.log(logout);
  useEffect(() => {
    if (!logout) {
      async function verify() {
        try {
          const response = await axios.get("/api/util/verify", {
            withCredentials: true,
          });
          if (response.status === 200) {
            // console.log(response.data);
            localStorage.setItem(
              "user",
              JSON.stringify({
                name: response.data.name,
                admin: response.data?.isAdmin || false
              })
            );
          }
          toast.success("verified");
          navigate("/");
        } catch (error) {
          console.log(error);
          toast.error("verification fails");
          localStorage.removeItem("user");
          navigate("/login");
        }
      }
      verify();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <Toaster />
      <Outlet />
    </>
  );
};

export default Verify;
