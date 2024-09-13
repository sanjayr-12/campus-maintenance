import { create } from "zustand"


const useStore = create((set) => ({
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    admin: true,
    logout: false,
    setUser: (newUser) => {
        set({ user: newUser })
        // localStorage.setItem('user', JSON.stringify(newUser))
    },
    setAdmin: (bool) => {
        set({admin:bool})
    },
    setLogOut: (bool) => {
        set({logout:bool})
    }
}))



export default useStore;
