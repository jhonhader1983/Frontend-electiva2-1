import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function AdminPage() {
  const [productos, setProductos] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [pestana, setPestana] = useState("productos");
  const [form, setForm] = useState({ nombre: "", descripcion: "", precio: "", imagen: "", categoria: "" });
  const [editandoId, setEditandoId] = useState(null);
  const [mensaje, setMensaje] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/");
    else {
      cargarProductos();
      cargarPedidos();
    }
  }, []);

  const cargarProductos = async () => {
    try {
      const res = await api.get("/productos");
      setProductos(res.data);
    } catch (error) {
      console.error("Error cargando productos", error);
    }
  };

  const cargarPedidos = async () => {
    try {
      const res = await api.get("/pedidos");
      setPedidos(res.data);
    } catch (error) {
      console.error("Error cargando pedidos", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editandoId) {
        await api.put(`/productos/${editandoId}`, form);
        setMensaje("Producto actualizado ✅");
      } else {
        await api.post("/productos", form);
        setMensaje("Producto creado ✅");
      }
      setForm({ nombre: "", descripcion: "", precio: "", imagen: "", categoria: "" });
      setEditandoId(null);
      cargarProductos();
      setTimeout(() => setMensaje(""), 3000);
    } catch (error) {
      setMensaje(error.response?.data?.error || "Error al guardar");
    }
  };

  const handleEditar = (producto) => {
    setForm({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      imagen: producto.imagen,
      categoria: producto.categoria
    });
    setEditandoId(producto._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEliminar = async (id) => {
    if (!confirm("¿Eliminar este producto?")) return;
    await api.delete(`/productos/${id}`);
    setMensaje("Producto eliminado ✅");
    cargarProductos();
    setTimeout(() => setMensaje(""), 3000);
  };

  const cambiarEstado = async (id, estado) => {
    await api.put(`/pedidos/${id}`, { estado });
    cargarPedidos();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/");
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 14px",
    border: "0.5px solid #3a2a10",
    borderRadius: "6px",
    fontFamily: "Georgia, serif",
    fontSize: "0.9rem",
    background: "#1a1208",
    color: "#f0e6d0",
    outline: "none",
    boxSizing: "border-box"
  };

  const estadoColor = {
    "pendiente": "#c9a84c",
    "en proceso": "#3498db",
    "entregado": "#27ae60"
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0e0c08", color: "#f0e6d0", fontFamily: "Georgia, serif" }}>

      
      <header style={{ background: "#1a1208", padding: "16px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #2e2416" }}>
        <div style={{ fontSize: "1.6rem", color: "#c9a84c", fontStyle: "italic", letterSpacing: "3px" }}>
          La Maison
        </div>
        <span style={{ color: "#6a5020", fontSize: "0.8rem", letterSpacing: "2px" }}>PANEL ADMINISTRADOR</span>
        <button onClick={handleLogout} style={{ background: "none", border: "1px solid #a32d2d", color: "#a32d2d", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", fontFamily: "Georgia, serif" }}>
          Cerrar sesión
        </button>
      </header>

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px 20px" }}>

        
        <div style={{ display: "flex", gap: "0", marginBottom: "40px", borderBottom: "1px solid #2e2416" }}>
          {[
            { key: "productos", label: `PRODUCTOS (${productos.length})` },
            { key: "pedidos", label: `PEDIDOS (${pedidos.length})` }
          ].map(t => (
            <button key={t.key} onClick={() => setPestana(t.key)} style={{
              padding: "12px 30px", background: "none", border: "none",
              borderBottom: pestana === t.key ? "2px solid #c9a84c" : "2px solid transparent",
              color: pestana === t.key ? "#c9a84c" : "#6a5020",
              cursor: "pointer", fontFamily: "Georgia, serif", fontSize: "0.85rem",
              letterSpacing: "1px"
            }}>
              {t.label}
            </button>
          ))}
        </div>

        
        {pestana === "productos" && (
          <>
            
            <div style={{ background: "#1a1208", borderRadius: "12px", border: "1px solid #2e2416", padding: "30px", marginBottom: "40px" }}>
              <h2 style={{ color: "#c9a84c", margin: "0 0 24px", fontSize: "1.3rem", letterSpacing: "1px" }}>
                {editandoId ? "Editar producto" : "Agregar producto"}
              </h2>

              <form onSubmit={handleSubmit}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                  <div>
                    <label style={{ fontSize: "0.75rem", color: "#6a5020", display: "block", marginBottom: "6px", letterSpacing: "1px" }}>NOMBRE</label>
                    <input style={inputStyle} placeholder="Ej: Filete de res" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} required />
                  </div>
                  <div>
                    <label style={{ fontSize: "0.75rem", color: "#6a5020", display: "block", marginBottom: "6px", letterSpacing: "1px" }}>CATEGORÍA</label>
                    <input style={inputStyle} placeholder="Ej: Carnes" value={form.categoria} onChange={e => setForm({ ...form, categoria: e.target.value })} />
                  </div>
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <label style={{ fontSize: "0.75rem", color: "#6a5020", display: "block", marginBottom: "6px", letterSpacing: "1px" }}>DESCRIPCIÓN</label>
                  <input style={inputStyle} placeholder="Descripción del plato" value={form.descripcion} onChange={e => setForm({ ...form, descripcion: e.target.value })} />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>
                  <div>
                    <label style={{ fontSize: "0.75rem", color: "#6a5020", display: "block", marginBottom: "6px", letterSpacing: "1px" }}>PRECIO (COP)</label>
                    <input style={inputStyle} type="number" placeholder="Ej: 35000" value={form.precio} onChange={e => setForm({ ...form, precio: e.target.value })} required />
                  </div>
                  <div>
                    <label style={{ fontSize: "0.75rem", color: "#6a5020", display: "block", marginBottom: "6px", letterSpacing: "1px" }}>URL DE IMAGEN</label>
                    <input style={inputStyle} placeholder="https:{/* Tabs */}..." value={form.imagen} onChange={e => setForm({ ...form, imagen: e.target.value })} />
                  </div>
                </div>

                {form.imagen && (
                  <div style={{ marginBottom: "20px" }}>
                    <img src={form.imagen} alt="preview" style={{ width: "120px", height: "80px", objectFit: "cover", borderRadius: "8px", border: "1px solid #2e2416" }} />
                  </div>
                )}

                {mensaje && (
                  <p style={{ color: "#c9a84c", fontSize: "0.85rem", marginBottom: "16px", textAlign: "center", background: "#2e2416", padding: "10px", borderRadius: "6px" }}>
                    {mensaje}
                  </p>
                )}

                <div style={{ display: "flex", gap: "12px" }}>
                  <button type="submit" style={{ flex: 1, padding: "12px", background: "#c9a84c", color: "#1a1208", border: "none", borderRadius: "6px", cursor: "pointer", fontFamily: "Georgia, serif", fontSize: "1rem", fontWeight: "700", letterSpacing: "1px" }}>
                    {editandoId ? "ACTUALIZAR" : "AGREGAR"}
                  </button>
                  {editandoId && (
                    <button type="button" onClick={() => { setEditandoId(null); setForm({ nombre: "", descripcion: "", precio: "", imagen: "", categoria: "" }); }}
                      style={{ padding: "12px 24px", background: "none", color: "#8a8a8a", border: "1px solid #3a2a10", borderRadius: "6px", cursor: "pointer", fontFamily: "Georgia, serif" }}>
                      Cancelar
                    </button>
                  )}
                </div>
              </form>
            </div>

            
            <div style={{ background: "#1a1208", borderRadius: "12px", border: "1px solid #2e2416", overflow: "hidden" }}>
              <div style={{ padding: "20px 30px", borderBottom: "1px solid #2e2416" }}>
                <h2 style={{ color: "#c9a84c", margin: 0, fontSize: "1.2rem", letterSpacing: "1px" }}>
                  PRODUCTOS ({productos.length})
                </h2>
              </div>
              {productos.length === 0 ? (
                <p style={{ color: "#6a5020", textAlign: "center", padding: "40px", fontStyle: "italic" }}>
                  No hay productos aún. Agrega el primero.
                </p>
              ) : (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid #2e2416" }}>
                      {["Imagen", "Nombre", "Categoría", "Precio", "Acciones"].map(h => (
                        <th key={h} style={{ padding: "14px 20px", textAlign: "left", fontSize: "0.75rem", color: "#6a5020", letterSpacing: "1px" }}>{h.toUpperCase()}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {productos.map(p => (
                      <tr key={p._id} style={{ borderBottom: "1px solid #2e2416" }}>
                        <td style={{ padding: "14px 20px" }}>
                          <img src={p.imagen || "https://via.placeholder.com/60"} alt={p.nombre} style={{ width: "56px", height: "56px", objectFit: "cover", borderRadius: "6px", border: "1px solid #2e2416" }} />
                        </td>
                        <td style={{ padding: "14px 20px" }}>
                          <p style={{ margin: "0 0 4px", color: "#f0e6d0" }}>{p.nombre}</p>
                          <p style={{ margin: 0, color: "#6a5020", fontSize: "0.8rem" }}>{p.descripcion}</p>
                        </td>
                        <td style={{ padding: "14px 20px", color: "#8a8a8a", fontSize: "0.85rem" }}>{p.categoria}</td>
                        <td style={{ padding: "14px 20px", color: "#c9a84c", fontWeight: "bold" }}>${Number(p.precio).toLocaleString()}</td>
                        <td style={{ padding: "14px 20px" }}>
                          <button onClick={() => handleEditar(p)} style={{ background: "none", border: "1px solid #c9a84c", color: "#c9a84c", padding: "6px 14px", borderRadius: "4px", cursor: "pointer", fontFamily: "Georgia, serif", marginRight: "8px" }}>Editar</button>
                          <button onClick={() => handleEliminar(p._id)} style={{ background: "none", border: "1px solid #a32d2d", color: "#a32d2d", padding: "6px 14px", borderRadius: "4px", cursor: "pointer", fontFamily: "Georgia, serif" }}>Eliminar</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}

        
        {pestana === "pedidos" && (
          <div style={{ background: "#1a1208", borderRadius: "12px", border: "1px solid #2e2416", overflow: "hidden" }}>
            <div style={{ padding: "20px 30px", borderBottom: "1px solid #2e2416" }}>
              <h2 style={{ color: "#c9a84c", margin: 0, fontSize: "1.2rem", letterSpacing: "1px" }}>
                HISTORIAL DE PEDIDOS ({pedidos.length})
              </h2>
            </div>
            {pedidos.length === 0 ? (
              <p style={{ color: "#6a5020", textAlign: "center", padding: "40px", fontStyle: "italic" }}>
                No hay pedidos aún.
              </p>
            ) : (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #2e2416" }}>
                    {["Cliente", "Pedido", "Total", "Estado", "Fecha"].map(h => (
                      <th key={h} style={{ padding: "14px 20px", textAlign: "left", fontSize: "0.75rem", color: "#6a5020", letterSpacing: "1px" }}>{h.toUpperCase()}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pedidos.map(p => (
                    <tr key={p._id} style={{ borderBottom: "1px solid #2e2416" }}>
                      <td style={{ padding: "14px 20px" }}>
                        <p style={{ margin: "0 0 4px", color: "#f0e6d0" }}>{p.usuario.nombre}</p>
                        <p style={{ margin: 0, color: "#6a5020", fontSize: "0.8rem" }}>{p.usuario.email}</p>
                      </td>
                      <td style={{ padding: "14px 20px" }}>
                        {p.items.map((item, i) => (
                          <p key={i} style={{ margin: "0 0 4px", color: "#8a8a8a", fontSize: "0.85rem" }}>
                            {item.nombre} x{item.cantidad}
                          </p>
                        ))}
                      </td>
                      <td style={{ padding: "14px 20px", color: "#c9a84c", fontWeight: "bold" }}>
                        ${p.total.toLocaleString()}
                      </td>
                      <td style={{ padding: "14px 20px" }}>
                        <select
                          value={p.estado}
                          onChange={e => cambiarEstado(p._id, e.target.value)}
                          style={{ background: "#0e0c08", color: estadoColor[p.estado], border: `1px solid ${estadoColor[p.estado]}`, padding: "6px 10px", borderRadius: "4px", fontFamily: "Georgia, serif", cursor: "pointer" }}>
                          <option value="pendiente">Pendiente</option>
                          <option value="en proceso">En proceso</option>
                          <option value="entregado">Entregado</option>
                        </select>
                      </td>
                      <td style={{ padding: "14px 20px", color: "#6a5020", fontSize: "0.85rem" }}>
                        {new Date(p.createdAt).toLocaleDateString("es-CO", { day: "2-digit", month: "short", year: "numeric" })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

export default AdminPage;