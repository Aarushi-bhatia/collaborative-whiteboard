"use client"
import { useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"; 
import { useAuth } from "../lib/auth"

export default function AuthGuard({ children }) {
  const navigate = useNavigate()
  const { token } = useAuth()

  useEffect(() => {
    if (!token) {
      navigate("/")
    }
  }, [token])

  return token ? children : null
}
