import { useState, useEffect } from "react";
import api from "../api/axios";

export default function PerfilModal({ onCerrar, onActualizado }) {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
    passwordActual: "",
    passwordNueva: "",
    passwordConfirm: ""
  });
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");
  const [seccion, setSeccion] = useState("info");

  useEffect(() => {
    api.get("/usuarios/perfil")
      .then(res => {
        const u = res.data;
        setForm(f => ({
          ...f,
          nombre: u.nombre || "",
          email: u.email || "",
          telefono: u.telefono || "",
          direccion: u.direccion || ""
        }));
      })
      .catch(() => setError("No se pudo cargar el perfil"))
      .finally(() => setCargando(false));
  }, []);

  const handleGuardar = async (e) => {
    e.preventDefault();
    setError("");
    setExito("");

    if (seccion === "password") {
      if (form.passwordNueva !== form.passwordConfirm) {
        return setError("Las contraseñas nuevas no coinciden");
      }
      if (form.passwordNueva.length < 6) {
        return setError("La contraseña nueva debe tener al menos 6 caracteres");
      }
    }

    setGuardando(true);
    try {
      const body = seccion === "info"
        ? { nombre: form.nombre, email: form.email, telefono: form.telefono, direccion: form.direccion }
        : { passwordActual: form.passwordActual, passwordNueva: form.passwordNueva };

      const res = await api.put("/usuarios/perfil", body);
      
      const usuarioActualizado = res.data.usuario;
      const stored = JSON.parse(localStorage.getItem("usuario") || "{}");
      localStorage.setItem("usuario", JSON.stringify({ ...stored, ...usuarioActualizado }));
      
      if (onActualizado) onActualizado(usuarioActualizado);
      
      setExito(res.data.mensaje);
      if (seccion === "password") {
        setForm(f => ({ ...f, passwordActual: "", passwordNueva: "", passwordConfirm: "" }));
      }
    } catch (err) {
      setError(err.response?.data?.error || "Error al actualizar el perfil");
    } finally {
      setGuardando(false);
    }
  };

  const cambiar = (campo, valor) => {
    setForm(f => ({ ...f, [campo]: valor }));
    setError("");
    setExito("");
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 14px",
    border: "0.5px solid #3a2a10",
    borderRadius: "6px",
    fontFamily: "Georgia, serif",
    fontSize: "0.9rem",
    background: "#0e0c08",
    color: "#f0e6d0",
    outline: "none",
    boxSizing: "border-box"
  };

  const labelStyle = {
    fontSize: "0.75rem",
    color: "#6a5020",
    display: "block",
    marginBottom: "6px",
    letterSpacing: "1px"
  };

  if (cargando) {
    return (
      <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000 }}>
        <div style={{ color: "#c9a84c", fontFamily: "Georgia, serif", fontStyle: "italic" }}>Cargando perfil...</div>
      </div>
    );
  }

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000, padding: "20px" }}>
      <div style={{ background: "#1a1208", borderRadius: "16px", border: "1px solid #2e2416", width: "100%", maxWidth: "480px", maxHeight: "90vh", overflow: "auto" }}>

        {/* Header */}
        <div style={{ padding: "24px 28px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2 style={{ color: "#c9a84c", fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: "1.3rem", margin: 0 }}>
              Mi perfil
            </h2>
            <p style={{ color: "#6a5020", fontSize: "0.8rem", margin: "4px 0 0" }}>Actualiza tu información personal</p>
          </div>
          <button onClick={onCerrar} style={{ background: "none", border: "none", color: "#8a8a8a", fontSize: "1.4rem", cursor: "pointer", lineHeight: 1 }}>✕</button>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", margin: "20px 28px 0", borderBottom: "1px solid #2e2416" }}>
          {[
            { key: "info", label: "Información" },
            { key: "password", label: "Contraseña" }
          ].map(t => (
            <button key={t.key} onClick={() => { setSeccion(t.key); setError(""); setExito(""); }}
              style={{
                padding: "8px 20px", background: "none", border: "none",
                borderBottom: seccion === t.key ? "2px solid #c9a84c" : "2px solid transparent",
                color: seccion === t.key ? "#c9a84c" : "#6a5020",
                cursor: "pointer", fontFamily: "Georgia, serif", fontSize: "0.85rem",
                marginBottom: "-1px"
              }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleGuardar} style={{ padding: "24px 28px 28px" }}>
          {seccion === "info" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={labelStyle}>NOMBRE COMPLETO</label>
                <input style={inputStyle} value={form.nombre} onChange={e => cambiar("nombre", e.target.value)} required placeholder="Tu nombre" />
              </div>
              <div>
                <label style={labelStyle}>CORREO ELECTRÓNICO</label>
                <input style={inputStyle} type="email" value={form.email} onChange={e => cambiar("email", e.target.value)} required placeholder="correo@ejemplo.com" />
              </div>
              <div>
                <label style={labelStyle}>NÚMERO DE TELÉFONO</label>
                <input style={inputStyle} type="tel" value={form.telefono} onChange={e => cambiar("telefono", e.target.value)} placeholder="Ej: 3001234567" />
              </div>
              <div>
                <label style={labelStyle}>DIRECCIÓN</label>
                <input style={inputStyle} value={form.direccion} onChange={e => cambiar("direccion", e.target.value)} placeholder="Ej: Calle 10 # 5-20, Apto 301" />
              </div>
            </div>
          )}

          {seccion === "password" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={labelStyle}>CONTRASEÑA ACTUAL</label>
                <input style={inputStyle} type="password" value={form.passwordActual} onChange={e => cambiar("passwordActual", e.target.value)} required placeholder="••••••••" />
              </div>
              <div>
                <label style={labelStyle}>NUEVA CONTRASEÑA</label>
                <input style={inputStyle} type="password" value={form.passwordNueva} onChange={e => cambiar("passwordNueva", e.target.value)} required placeholder="Mínimo 6 caracteres" />
              </div>
              <div>
                <label style={labelStyle}>CONFIRMAR NUEVA CONTRASEÑA</label>
                <input style={inputStyle} type="password" value={form.passwordConfirm} onChange={e => cambiar("passwordConfirm", e.target.value)} required placeholder="••••••••" />
              </div>
            </div>
          )}

          {error && (
            <div style={{ marginTop: "16px", padding: "10px 14px", background: "rgba(163,45,45,0.15)", border: "1px solid #a32d2d", borderRadius: "6px", color: "#e07070", fontSize: "0.85rem" }}>
              {error}
            </div>
          )}

          {exito && (
            <div style={{ marginTop: "16px", padding: "10px 14px", background: "rgba(39,174,96,0.12)", border: "1px solid #27ae60", borderRadius: "6px", color: "#5dca85", fontSize: "0.85rem" }}>
              ✓ {exito}
            </div>
          )}

          <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
            <button type="button" onClick={onCerrar}
              style={{ flex: 1, padding: "12px", background: "none", border: "1px solid #3a2a10", color: "#8a8a8a", borderRadius: "6px", cursor: "pointer", fontFamily: "Georgia, serif" }}>
              Cancelar
            </button>
            <button type="submit" disabled={guardando}
              style={{ flex: 2, padding: "12px", background: guardando ? "#2e2416" : "#c9a84c", color: guardando ? "#8a8a8a" : "#1a1208", border: "none", borderRadius: "6px", cursor: guardando ? "not-allowed" : "pointer", fontFamily: "Georgia, serif", fontWeight: "bold", fontSize: "0.95rem" }}>
              {guardando ? "Guardando..." : "Guardar cambios"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}