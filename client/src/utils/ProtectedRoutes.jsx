import { Navigate, Outlet } from "react-router-dom"
import useStore from "../store/zustand"

export const ProtectedRoutes = () => {
    const user = useStore((state)=>state.user)
  return user?<Outlet/>:<Navigate to="/login"/>
}
