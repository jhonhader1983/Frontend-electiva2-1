import { useState } from "react"
import api from "../api/axios"

const inputStyle = {
  width: "100%",
  padding: "10px 14px",
  border: "0.5px solid #d4c5a0",
  borderRadius: "6px",
  fontFamily: "Georgia, serif",
  fontSize: "0.9rem",
  background: "#faf8f4",
  color: "#1a1208",
  outline: "none",
  boxSizing: "border-box"
}

const labelStyle = {
  fontSize: "0.75rem",
  color: "#6a6a6a",
  fontWeight: "500",
  display: "block",
  marginBottom: "6px",
  letterSpacing: "0.5px"
}

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async () => {
    setError("")
    setLoading(true)
    try {
      const res = await api.post("/auth/login", { email, password })
      localStorage.setItem("token", res.data.token)
      alert("Bienvenido a La Maison")
    } catch (err) {
      setError(err.response?.data?.error || "Error al iniciar sesión")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.4rem", color: "#1a1208", margin: "0 0 0.4rem" }}>
        Bienvenido de vuelta
      </h2>
      <p style={{ color: "#8a8a8a", fontSize: "0.85rem", margin: "0 0 1.8rem" }}>
        Inicia sesión para gestionar tu reserva
      </p>

      <div style={{ marginBottom: "1.2rem" }}>
        <label style={labelStyle}>Correo electrónico</label>
        <input style={inputStyle} type="email" placeholder="correo@ejemplo.com" onChange={e => setEmail(e.target.value)} />
      </div>

      <div style={{ marginBottom: "0.8rem" }}>
        <label style={labelStyle}>Contraseña</label>
        <input style={inputStyle} type="password" placeholder="••••••••" onChange={e => setPassword(e.target.value)} />
      </div>

      <p style={{ textAlign: "right", fontSize: "0.8rem", color: "#c9a84c", cursor: "pointer", margin: "0 0 1.5rem" }}>
        ¿Olvidaste tu contraseña?
      </p>

      {error && (
        <p style={{ color: "#a32d2d", fontSize: "0.8rem", marginBottom: "1rem", textAlign: "center" }}>{error}</p>
      )}

      <button
        onClick={handleLogin}
        disabled={loading}
        style={{
          width: "100%",
          padding: "12px",
          background: loading ? "#3a2a10" : "#1a1208",
          color: "#c9a84c",
          border: "none",
          borderRadius: "6px",
          fontFamily: "Georgia, serif",
          fontSize: "1rem",
          fontWeight: "700",
          cursor: loading ? "not-allowed" : "pointer",
          letterSpacing: "1px",
          transition: "background 0.2s"
        }}
      >
        {loading ? "Iniciando..." : "Iniciar sesión"}
      </button>
    </div>
  )
}