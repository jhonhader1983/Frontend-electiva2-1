import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { Box, TextField, Button, Typography, Container, CircularProgress } from "@mui/material";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });
      console.log("Respuesta:", res.data);
      console.log("Rol:", res.data.usuario.rol);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("usuario", JSON.stringify(res.data.usuario));

      if (res.data.usuario.rol === "admin") {
        navigate("/admin");
      } else {
        navigate("/home");
      }

    } catch (err) {
      setError(err.response?.data?.error || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8, p: 4, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3 }}>
      <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h5" component="h2" align="center" gutterBottom fontWeight="bold">
          Bienvenido de vuelta
        </Typography>

        <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 2 }}>
          Inicia sesión para gestionar tu reserva
        </Typography>

        <TextField
          label="Correo electrónico"
          type="email"
          variant="outlined"
          fullWidth
          required
          placeholder="correo@ejemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label="Contraseña"
          type="password"
          variant="outlined"
          fullWidth
          required
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Typography 
          variant="caption" 
          color="primary" 
          align="right" 
          sx={{ cursor: "pointer", fontWeight: "bold" }}
        >
          ¿Olvidaste tu contraseña?
        </Typography>

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
          {loading ? <CircularProgress size={24} color="inherit" /> : "Iniciar sesión"}
        </Button>
      </Box>
    </Container>
  );
}