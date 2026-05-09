import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import AdminPage from "./pages/AdminPage";
import HomePage from "./pages/HomePage";
import ReservasPage from "./pages/ReservasPage";
import NosotrosPage from "./pages/NosotrosPage";
import MisPedidosPage from "./pages/MisPedidosPage"; // ⬅️ NUEVO

const RutaAdmin = ({ children }) => {
  const token = localStorage.getItem("token");
  const usuario = JSON.parse(localStorage.getItem("usuario") || "null");
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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/admin" element={<RutaAdmin><AdminPage /></RutaAdmin>} />
        <Route path="/home" element={<RutaUsuario><HomePage /></RutaUsuario>} />
        <Route path="/reservas" element={<RutaUsuario><ReservasPage /></RutaUsuario>} />
        <Route path="/nosotros" element={<RutaUsuario><NosotrosPage /></RutaUsuario>} />
        {/* ⬇️ NUEVA RUTA */}
        <Route path="/mis-pedidos" element={<RutaUsuario><MisPedidosPage /></RutaUsuario>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;