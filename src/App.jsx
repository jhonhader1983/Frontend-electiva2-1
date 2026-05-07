import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import AdminPage from "./pages/AdminPage";
import HomePage from "./pages/HomePage";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

const theme = createTheme({
  colorSchemes: {
    light: true,
    dark: true,
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const RutaAdmin = ({ children }) => {
  const token = localStorage.getItem("token");
  const usuario = JSON.parse(localStorage.getItem("usuario") || "null");

  console.log("RutaAdmin - token:", token);
  console.log("RutaAdmin - usuario:", usuario);
  console.log("RutaAdmin - rol:", usuario?.rol);

  if (!token || !usuario || usuario.rol !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

const RutaUsuario = ({ children }) => {
  const token = localStorage.getItem("token");
  const usuario = JSON.parse(localStorage.getItem("usuario") || "null");

  if (!token || !usuario) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthPage />} />

          <Route
            path="/admin"
            element={
              <RutaAdmin>
                <AdminPage />
              </RutaAdmin>
            }
          />

          <Route
            path="/home"
            element={
              <RutaUsuario>
                <HomePage />
              </RutaUsuario>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;