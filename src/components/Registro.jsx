import { useState } from "react"
import api from "../api/axios"
import { Box, TextField, Button, Typography, Container, CircularProgress } from "@mui/material";

export default function Registro({ onRegistrado }) {
  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleRegistro = async (e) => {
    if (e) e.preventDefault();
    setError("")
    setLoading(true)
    try {
      await api.post("/auth/register", { nombre, email, password })
      alert("Registro exitoso, ahora inicia sesión")
      onRegistrado()
    } catch (err) {
      setError(err.response?.data?.error || "Error al registrarse")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="xs" sx={{ mt: 8, p: 4, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3 }}>
      <Box component="form" onSubmit={handleRegistro} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h5" component="h2" align="center" gutterBottom fontWeight="bold">
          Crea tu cuenta
        </Typography>

        <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 2 }}>
          Regístrate para hacer tu reserva
        </Typography>

        <TextField
          label="Nombre completo"
          type="text"
          variant="outlined"
          fullWidth
          required
          placeholder="Tu nombre"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
        />

        <TextField
          label="Correo electrónico"
          type="email"
          variant="outlined"
          fullWidth
          required
          placeholder="correo@ejemplo.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <TextField
          label="Contraseña"
          type="password"
          variant="outlined"
          fullWidth
          required
          placeholder="••••••••"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        {error && (
          <Typography variant="body2" color="error" align="center">
            {error}
          </Typography>
        )}

        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          disabled={loading}
          sx={{ mt: 1, py: 1.5, fontWeight: "bold" }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Crear cuenta"}
        </Button>
      </Box>
    </Container>
  )
}