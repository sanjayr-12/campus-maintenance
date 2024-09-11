import { useEffect } from "react"
import useStore from "../store/zustand"
import axios from "axios"
import { useNavigate, Outlet } from "react-router-dom"
import toast, { Toaster } from "react-hot-toast";

const Verify = () => {
    const user = useStore((state) => state.user)
    const navigate = useNavigate()
    useEffect(() => {
        async function verify() {
                try {
                    const response = await axios.get("/api/admin/verify", { withCredentials: true })
                    if (response.status === 200) {
                        localStorage.setItem("user", JSON.stringify({
                            name: response.data.name,
                            email:response.data.email
                        }))
                    }
                      toast.success("verified");
                    navigate("/dashboard")
                  
                } catch (error) {
                    console.log(error);
                    localStorage.removeItem("user")
                    navigate("/login")
                    toast.error("verification fails")
                }
        }

        verify()
    }, [navigate, user])
    

    return (
        <>
            <Toaster/>
        <Outlet />;
      </>
    );
}

export default Verify