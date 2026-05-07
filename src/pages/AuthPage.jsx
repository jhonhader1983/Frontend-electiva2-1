import { useState } from "react"
import Login from "../components/Login"
import Registro from "../components/Registro"
import { Box, Typography, Tabs, Tab, Paper, useTheme } from "@mui/material";

export default function AuthPage() {
  const [modo, setModo] = useState("login")
  const theme = useTheme();

  return (
    <Box sx={{
      display: "flex",
      minHeight: "100vh",
      bgcolor: "background.default"
    }}>

      {/* Panel izquierdo */}
      <Box sx={{
        width: { xs: "0", md: "420px" },
        display: { xs: "none", md: "flex" },
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 4,
        bgcolor: "primary.dark",
        color: "primary.contrastText"
      }}>
        <Box sx={{ textAlign: "center" }}>
          <Box sx={{ mb: 3 }}>
            <svg width="60" height="70" viewBox="0 0 60 70">
              <ellipse cx="30" cy="35" rx="12" ry="20" fill="none" stroke={theme.palette.primary.light} strokeWidth="1"/>
              <ellipse cx="18" cy="40" rx="9" ry="14" fill="none" stroke={theme.palette.primary.light} strokeWidth="1" transform="rotate(-30 18 40)"/>
              <ellipse cx="42" cy="40" rx="9" ry="14" fill="none" stroke={theme.palette.primary.light} strokeWidth="1" transform="rotate(30 42 40)"/>
              <circle cx="30" cy="18" r="3" fill={theme.palette.primary.light}/>
            </svg>
          </Box>

          <Typography variant="h3" sx={{ color: "primary.light", mb: 0.5, letterSpacing: 3, fontWeight: 'bold' }}>
            LA MAISON
          </Typography>
          <Typography variant="overline" sx={{ color: "primary.main", letterSpacing: 5, mb: 4, display: 'block' }}>
            RESTAURANT
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
            <Box sx={{ height: "0.5px", bgcolor: "divider", flex: 1 }}/>
            <Box sx={{ width: 6, height: 6, borderRadius: "50%", border: `1px solid ${theme.palette.primary.light}` }}/>
            <Box sx={{ height: "0.5px", bgcolor: "divider", flex: 1 }}/>
          </Box>

          <Typography variant="body1" sx={{ color: "primary.light", fontStyle: "italic", lineHeight: 1.8 }}>
            Una experiencia única<br/>en cada visita
          </Typography>

          <Box sx={{ mt: 6, color: "text.secondary", typography: "caption", letterSpacing: 1 }}>
            <Typography variant="inherit" sx={{ display: 'block', mb: 0.5 }}>Medellín, Colombia</Typography>
            <Typography variant="inherit" sx={{ display: 'block' }}>Reservas desde 1998</Typography>
          </Box>
        </Box>
      </Box>

      {/* Panel derecho */}
      <Box sx={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: { xs: 2, md: 4 }
      }}>
        <Paper elevation={0} sx={{
          width: "100%",
          maxWidth: "420px",
          bgcolor: "transparent",
          p: { xs: 2, sm: 4 }
        }}>

          {/* Tabs */}
          <Tabs 
            value={modo} 
            onChange={(e, newValue) => setModo(newValue)} 
            variant="fullWidth" 
            sx={{ mb: 4 }}
          >
            <Tab label="Iniciar sesión" value="login" />
            <Tab label="Registrarse" value="registro" />
          </Tabs>

          {modo === "login" ? <Login /> : <Registro onRegistrado={() => setModo("login")} />}
        </Paper>
      </Box>
    </Box>
  )
}