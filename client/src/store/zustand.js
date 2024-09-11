import { create } from "zustand"

const useStore = create((set) => ({
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    setUser: (newUser) => {
        set({ user: newUser })
        // localStorage.setItem('user', JSON.stringify(newUser))
    }
}))



export default useStore;
