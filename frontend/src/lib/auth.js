import { create } from "zustand"

export const useAuth = create(set => ({
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  user: null,
  setToken: token => {
    if (token) {
      localStorage.setItem("token", token)
    } else {
      localStorage.removeItem("token")
    }
    set({ token })
  },
  setUser: user => set({ user }),
  logout: () => {
    localStorage.removeItem("token")
    set({ token: null, user: null })
  }
}))
