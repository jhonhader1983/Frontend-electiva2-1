import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/axios"

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&family=Bebas+Neue&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body, #root { margin: 0; padding: 0; }

  :root {
    --verde-deep: #040b06;
    --verde-mid: #0f2814;
    --caña: #e8a020;
    --caña-light: #f5c84a;
    --naranja: #e8621a;
    --crema: #fdf6e8;
    --opaco: #7aaa80;
    --tenue: #2d5c35;
    --rojo: #c0392b;
  }

  .res-root {
    min-height: 100vh;
    background:
      radial-gradient(ellipse 70% 60% at 70% 30%, #0e2e14 0%, transparent 60%),
      radial-gradient(ellipse 40% 40% at 10% 80%, rgba(232,98,26,0.06) 0%, transparent 55%),
      linear-gradient(180deg, #030b04 0%, #061009 50%, #040b06 100%);
    font-family: 'DM Sans', sans-serif;
    color: var(--crema);
  }

  /* NAVBAR */
  .res-nav {
    display: flex; align-items: center; justify-content: space-between;
    padding: 24px 60px;
    border-bottom: 1px solid rgba(232,160,32,0.1);
  }
  .res-logo {
    display: flex; flex-direction: column;
  }
  .res-logo-name {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.5rem;
    letter-spacing: 6px;
    color: var(--caña);
  }
  .res-logo-sub {
    font-size: 0.5rem;
    letter-spacing: 4px;
    color: var(--opaco);
    text-transform: uppercase;
  }
  .res-back {
    background: none; border: none;
    color: var(--opaco);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.65rem;
    letter-spacing: 3px;
    text-transform: uppercase;
    cursor: pointer;
    transition: color 0.25s;
    display: flex; align-items: center; gap: 8px;
  }
  .res-back:hover { color: var(--caña); }

  /* HEADER */
  .res-header {
    text-align: center;
    padding: 60px 20px 40px;
    max-width: 800px;
    margin: 0 auto;
  }
  .res-eyebrow {
    display: inline-flex; align-items: center; gap: 14px;
    font-size: 0.55rem;
    letter-spacing: 5px;
    color: var(--caña);
    text-transform: uppercase;
    margin-bottom: 20px;
  }
  .res-eyebrow::before, .res-eyebrow::after {
    content: ''; width: 30px; height: 1px;
    background: var(--caña);
  }
  .res-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 300;
    font-style: italic;
    color: var(--crema);
    margin-bottom: 16px;
    line-height: 1.1;
  }
  .res-title-accent {
    color: var(--caña);
    font-weight: 500;
  }
  .res-subtitle {
    font-size: 0.95rem;
    color: var(--opaco);
    line-height: 1.7;
    max-width: 540px;
    margin: 0 auto;
  }

  /* CONTENT */
  .res-content {
    max-width: 1100px;
    margin: 0 auto;
    padding: 40px 20px 80px;
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 50px;
  }

  /* FORM */
  .res-form-card {
    background: rgba(10,20,12,0.6);
    border: 1px solid rgba(232,160,32,0.1);
    padding: 40px;
    position: relative;
  }
  .res-form-card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, transparent, var(--caña), transparent);
  }

  .res-form-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.4rem;
    font-style: italic;
    color: var(--crema);
    margin-bottom: 4px;
  }
  .res-form-sub {
    font-size: 0.65rem;
    letter-spacing: 2px;
    color: var(--tenue);
    text-transform: uppercase;
    margin-bottom: 28px;
  }

  .res-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
  .res-field { margin-bottom: 18px; }
  .res-label {
    display: block;
    font-size: 0.55rem;
    letter-spacing: 3px;
    color: var(--opaco);
    text-transform: uppercase;
    margin-bottom: 8px;
  }
  .res-input, .res-select, .res-textarea {
    width: 100%;
    padding: 13px 16px;
    background: rgba(4,11,6,0.6);
    border: 1px solid rgba(45,92,53,0.3);
    border-bottom: 2px solid rgba(45,92,53,0.4);
    color: var(--crema);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.85rem;
    outline: none;
    transition: all 0.3s;
    border-radius: 0;
  }
  .res-input:focus, .res-select:focus, .res-textarea:focus {
    border-bottom-color: var(--caña);
    background: rgba(4,11,6,0.85);
  }
  .res-textarea { min-height: 90px; resize: vertical; }
  .res-select {
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%237aaa80' stroke-width='1.5'%3e%3cpolyline points='6 9 12 15 18 9'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 14px center;
    background-size: 16px;
    padding-right: 40px;
  }
  .res-input::placeholder { color: rgba(45,92,53,0.5); }

  .res-error {
    background: rgba(192,57,43,0.1);
    border-left: 3px solid var(--rojo);
    padding: 12px 16px;
    font-size: 0.75rem;
    color: #e07060;
    margin-bottom: 16px;
  }
  .res-success {
    background: rgba(45,139,58,0.1);
    border-left: 3px solid #2d8b3a;
    padding: 12px 16px;
    font-size: 0.75rem;
    color: #7aaa80;
    margin-bottom: 16px;
  }

  .res-btn {
    width: 100%;
    padding: 16px;
    background: linear-gradient(135deg, var(--naranja), var(--caña), var(--caña-light));
    background-size: 200% 200%;
    border: none;
    color: var(--verde-deep);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.62rem;
    font-weight: 600;
    letter-spacing: 4px;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.3s;
    display: flex; align-items: center; justify-content: center; gap: 10px;
    margin-top: 8px;
    animation: gradient 4s ease infinite;
  }
  @keyframes gradient {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  .res-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(232,98,26,0.3);
  }
  .res-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  .res-spinner {
    width: 16px; height: 16px;
    border: 2px solid rgba(4,11,6,0.3);
    border-top-color: var(--verde-deep);
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* INFO PANEL */
  .res-info {
    display: flex; flex-direction: column;
    gap: 24px;
  }
  .res-info-card {
    background: rgba(10,20,12,0.4);
    border: 1px solid rgba(232,160,32,0.08);
    padding: 24px;
  }
  .res-info-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.2rem;
    font-style: italic;
    color: var(--caña);
    margin-bottom: 16px;
  }
  .res-info-item {
    display: flex; align-items: flex-start; gap: 14px;
    padding: 10px 0;
    border-bottom: 1px solid rgba(45,92,53,0.15);
  }
  .res-info-item:last-child { border-bottom: none; }
  .res-info-icon {
    width: 18px; height: 18px;
    color: var(--caña);
    flex-shrink: 0;
    margin-top: 2px;
  }
  .res-info-text {
    font-size: 0.78rem;
    color: var(--crema);
    line-height: 1.5;
  }
  .res-info-text strong {
    display: block;
    font-size: 0.6rem;
    letter-spacing: 2px;
    color: var(--opaco);
    text-transform: uppercase;
    margin-bottom: 2px;
    font-weight: 500;
  }

  @media (max-width: 850px) {
    .res-content { grid-template-columns: 1fr; }
    .res-nav { padding: 20px 24px; }
    .res-form-card { padding: 28px 24px; }
    .res-row { grid-template-columns: 1fr; gap: 0; }
  }
`

const ClockIcon = () => (
  <svg className="res-info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
)
const PinIcon = () => (
  <svg className="res-info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
)
const PhoneIcon = () => (
  <svg className="res-info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
)
const ArrowLeft = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
)
const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
)

export default function ReservasPage() {
  const navigate = useNavigate()
  const usuario = JSON.parse(localStorage.getItem("usuario") || "null")

  const [form, setForm] = useState({
    nombre: usuario?.nombre || "",
    telefono: usuario?.telefono || "",
    email: usuario?.email || "",
    fecha: "",
    hora: "",
    personas: "2",
    ocasion: "",
    notas: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setLoading(true)

    try {
      // Ajusta el endpoint según tu backend
      await api.post("/reservas", {
        ...form,
        usuario_id: usuario?.id,
      })
      setSuccess("¡Reserva confirmada! Te enviamos los detalles a tu correo.")
      setForm({
        ...form,
        fecha: "",
        hora: "",
        personas: "2",
        ocasion: "",
        notas: "",
      })
    } catch (err) {
      setError(err.response?.data?.error || "Error al crear la reserva. Intenta de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  // Fecha mínima = hoy
  const today = new Date().toISOString().split("T")[0]

  return (
    <>
      <style>{styles}</style>
      <div className="res-root">
        {/* NAVBAR */}
        <nav className="res-nav">
          <div className="res-logo">
            <span className="res-logo-name">LA MAISON</span>
            <span className="res-logo-sub">Cali · Alta Cocina</span>
          </div>
          <button className="res-back" onClick={() => navigate("/home")}>
            <ArrowLeft /> Volver al inicio
          </button>
        </nav>

        {/* HEADER */}
        <div className="res-header">
          <div className="res-eyebrow">Reserva tu mesa</div>
          <h1 className="res-title">
            Vive una <span className="res-title-accent">experiencia única</span>
          </h1>
          <p className="res-subtitle">
            Reserva tu mesa en La Maison y déjate sorprender por los sabores del Valle del Cauca,
            preparados con la pasión de nuestra cocina de autor.
          </p>
        </div>

        {/* CONTENT */}
        <div className="res-content">
          {/* FORM */}
          <div className="res-form-card">
            <h2 className="res-form-title">Detalles de tu reserva</h2>
            <p className="res-form-sub">Completa el formulario</p>

            <form onSubmit={handleSubmit}>
              <div className="res-row">
                <div className="res-field">
                  <label className="res-label">Nombre completo</label>
                  <input
                    className="res-input"
                    type="text"
                    name="nombre"
                    placeholder="Juan López"
                    required
                    value={form.nombre}
                    onChange={handleChange}
                  />
                </div>
                <div className="res-field">
                  <label className="res-label">Teléfono</label>
                  <input
                    className="res-input"
                    type="tel"
                    name="telefono"
                    placeholder="+57 300 123 4567"
                    required
                    value={form.telefono}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="res-field">
                <label className="res-label">Correo electrónico</label>
                <input
                  className="res-input"
                  type="email"
                  name="email"
                  placeholder="correo@ejemplo.com"
                  required
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div className="res-row">
                <div className="res-field">
                  <label className="res-label">Fecha</label>
                  <input
                    className="res-input"
                    type="date"
                    name="fecha"
                    required
                    min={today}
                    value={form.fecha}
                    onChange={handleChange}
                  />
                </div>
                <div className="res-field">
                  <label className="res-label">Hora</label>
                  <select
                    className="res-select"
                    name="hora"
                    required
                    value={form.hora}
                    onChange={handleChange}
                  >
                    <option value="">Selecciona</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="13:00">1:00 PM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="18:00">6:00 PM</option>
                    <option value="19:00">7:00 PM</option>
                    <option value="20:00">8:00 PM</option>
                    <option value="21:00">9:00 PM</option>
                    <option value="22:00">10:00 PM</option>
                  </select>
                </div>
              </div>

              <div className="res-row">
                <div className="res-field">
                  <label className="res-label">Personas</label>
                  <select
                    className="res-select"
                    name="personas"
                    required
                    value={form.personas}
                    onChange={handleChange}
                  >
                    {[1,2,3,4,5,6,7,8,9,10].map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? "persona" : "personas"}</option>
                    ))}
                    <option value="11+">Más de 10</option>
                  </select>
                </div>
                <div className="res-field">
                  <label className="res-label">Ocasión (opcional)</label>
                  <select
                    className="res-select"
                    name="ocasion"
                    value={form.ocasion}
                    onChange={handleChange}
                  >
                    <option value="">Sin ocasión especial</option>
                    <option value="cumpleaños">Cumpleaños</option>
                    <option value="aniversario">Aniversario</option>
                    <option value="negocios">Cena de negocios</option>
                    <option value="cita">Cita romántica</option>
                    <option value="familiar">Reunión familiar</option>
                    <option value="otro">Otra</option>
                  </select>
                </div>
              </div>

              <div className="res-field">
                <label className="res-label">Notas adicionales</label>
                <textarea
                  className="res-textarea"
                  name="notas"
                  placeholder="Alergias, preferencias, peticiones especiales..."
                  value={form.notas}
                  onChange={handleChange}
                />
              </div>

              {error && <div className="res-error">{error}</div>}
              {success && <div className="res-success">{success}</div>}

              <button className="res-btn" type="submit" disabled={loading}>
                {loading
                  ? <><div className="res-spinner" /> Confirmando...</>
                  : <>Confirmar reserva <ArrowRight /></>
                }
              </button>
            </form>
          </div>

          {/* INFO */}
          <div className="res-info">
            <div className="res-info-card">
              <h3 className="res-info-title">Información del restaurante</h3>
              <div className="res-info-item">
                <PinIcon />
                <div className="res-info-text">
                  <strong>Ubicación</strong>
                  Av. Roosevelt #45-23, Granada<br/>
                  Santiago de Cali, Valle del Cauca
                </div>
              </div>
              <div className="res-info-item">
                <ClockIcon />
                <div className="res-info-text">
                  <strong>Horario</strong>
                  Lun - Vie: 12:00 PM - 11:00 PM<br/>
                  Sáb - Dom: 12:00 PM - 12:00 AM
                </div>
              </div>
              <div className="res-info-item">
                <PhoneIcon />
                <div className="res-info-text">
                  <strong>Reservas telefónicas</strong>
                  +57 (2) 555-0123<br/>
                  +57 300 123 4567
                </div>
              </div>
            </div>

            <div className="res-info-card">
              <h3 className="res-info-title">Recomendaciones</h3>
              <p style={{fontSize: '0.78rem', color: 'var(--opaco)', lineHeight: 1.7}}>
                Te recomendamos reservar con al menos <strong style={{color:'var(--caña)'}}>24 horas de anticipación</strong>.
                Para grupos mayores a 8 personas, contáctanos directamente al teléfono.
                Cancelaciones gratuitas hasta 4 horas antes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}