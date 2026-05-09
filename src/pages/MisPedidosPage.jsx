import { useState, useEffect } from "react"
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
    --azul: #3498db;
    --verde-success: #27ae60;
  }

  .ped-root {
    min-height: 100vh;
    background:
      radial-gradient(ellipse 70% 60% at 70% 30%, #0e2e14 0%, transparent 60%),
      radial-gradient(ellipse 40% 40% at 10% 80%, rgba(232,98,26,0.06) 0%, transparent 55%),
      linear-gradient(180deg, #030b04 0%, #061009 50%, #040b06 100%);
    font-family: 'DM Sans', sans-serif;
    color: var(--crema);
  }

  /* NAVBAR */
  .ped-nav {
    display: flex; align-items: center; justify-content: space-between;
    padding: 24px 60px;
    border-bottom: 1px solid rgba(232,160,32,0.1);
    background: rgba(4,11,6,0.85);
    backdrop-filter: blur(10px);
    position: sticky; top: 0; z-index: 100;
  }
  .ped-logo { display: flex; flex-direction: column; cursor: pointer; }
  .ped-logo-name {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.5rem; letter-spacing: 6px; color: var(--caña);
  }
  .ped-logo-sub {
    font-size: 0.5rem; letter-spacing: 4px;
    color: var(--opaco); text-transform: uppercase;
  }
  .ped-back {
    background: none; border: none;
    color: var(--opaco);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.65rem; letter-spacing: 3px; text-transform: uppercase;
    cursor: pointer; transition: color 0.25s;
    display: flex; align-items: center; gap: 8px;
  }
  .ped-back:hover { color: var(--caña); }

  /* HEADER */
  .ped-header {
    text-align: center;
    padding: 60px 20px 40px;
    max-width: 800px;
    margin: 0 auto;
  }
  .ped-eyebrow {
    display: inline-flex; align-items: center; gap: 14px;
    font-size: 0.55rem;
    letter-spacing: 5px;
    color: var(--caña);
    text-transform: uppercase;
    margin-bottom: 20px;
  }
  .ped-eyebrow::before, .ped-eyebrow::after {
    content: ''; width: 30px; height: 1px; background: var(--caña);
  }
  .ped-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 300;
    font-style: italic;
    color: var(--crema);
    margin-bottom: 16px;
    line-height: 1.1;
  }
  .ped-title-accent {
    color: var(--caña);
    font-weight: 500;
  }
  .ped-subtitle {
    font-size: 0.9rem;
    color: var(--opaco);
    line-height: 1.7;
  }

  /* FILTROS */
  .ped-filters {
    max-width: 1100px;
    margin: 0 auto 40px;
    padding: 0 20px;
    display: flex; gap: 8px; flex-wrap: wrap;
    justify-content: center;
  }
  .ped-filter {
    padding: 10px 20px;
    background: rgba(10,20,12,0.5);
    border: 1px solid rgba(45,92,53,0.3);
    color: var(--opaco);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.6rem;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.25s;
  }
  .ped-filter:hover {
    border-color: rgba(232,160,32,0.3);
    color: var(--crema);
  }
  .ped-filter.active {
    background: var(--caña);
    border-color: var(--caña);
    color: var(--verde-deep);
    font-weight: 500;
  }

  /* CONTENT */
  .ped-content {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 20px 80px;
  }

  .ped-loading {
    text-align: center;
    padding: 80px 20px;
    color: var(--opaco);
    font-style: italic;
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.2rem;
  }

  .ped-empty {
    text-align: center;
    padding: 80px 20px;
    background: rgba(10,20,12,0.4);
    border: 1px solid rgba(232,160,32,0.08);
  }
  .ped-empty-icon {
    width: 60px; height: 60px;
    margin: 0 auto 20px;
    color: var(--tenue);
  }
  .ped-empty-text {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.4rem;
    font-style: italic;
    color: var(--opaco);
    margin-bottom: 8px;
  }
  .ped-empty-sub {
    font-size: 0.78rem;
    color: var(--tenue);
    margin-bottom: 24px;
  }
  .ped-empty-btn {
    padding: 12px 28px;
    background: linear-gradient(135deg, var(--naranja), var(--caña));
    border: none;
    color: var(--verde-deep);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.6rem; font-weight: 600;
    letter-spacing: 3px; text-transform: uppercase;
    cursor: pointer;
    transition: all 0.3s;
  }
  .ped-empty-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(232,160,32,0.3);
  }

  /* PEDIDO CARD */
  .ped-card {
    background: rgba(10,20,12,0.5);
    border: 1px solid rgba(232,160,32,0.1);
    margin-bottom: 24px;
    overflow: hidden;
    transition: all 0.3s;
    animation: fadeUp 0.5s ease both;
  }
  .ped-card:hover {
    border-color: rgba(232,160,32,0.25);
    transform: translateY(-2px);
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .ped-card-header {
    display: flex; justify-content: space-between; align-items: center;
    padding: 20px 28px;
    background: linear-gradient(135deg, rgba(15,40,20,0.4) 0%, transparent 60%);
    border-bottom: 1px solid rgba(45,92,53,0.2);
    cursor: pointer;
  }
  .ped-card-header-left {
    display: flex; align-items: center; gap: 20px;
  }
  .ped-card-id {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1rem;
    color: var(--caña);
    letter-spacing: 2px;
  }
  .ped-card-date {
    font-size: 0.7rem;
    color: var(--opaco);
    letter-spacing: 1px;
  }
  .ped-card-header-right {
    display: flex; align-items: center; gap: 16px;
  }
  .ped-card-total {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.4rem;
    color: var(--caña);
    font-weight: 300;
  }

  /* BADGE ESTADO */
  .ped-badge {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 6px 14px;
    font-size: 0.55rem;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    font-weight: 600;
    border-radius: 2px;
  }
  .ped-badge-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    animation: pulseDot 2s ease-in-out infinite;
  }
  @keyframes pulseDot {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(1.3); }
  }

  .ped-badge.pendiente {
    background: rgba(232,160,32,0.15);
    color: var(--caña);
    border: 1px solid rgba(232,160,32,0.3);
  }
  .ped-badge.pendiente .ped-badge-dot { background: var(--caña); }

  .ped-badge.confirmado {
    background: rgba(52,152,219,0.15);
    color: var(--azul);
    border: 1px solid rgba(52,152,219,0.3);
  }
  .ped-badge.confirmado .ped-badge-dot { background: var(--azul); }

  .ped-badge.preparando {
    background: rgba(232,98,26,0.15);
    color: var(--naranja);
    border: 1px solid rgba(232,98,26,0.3);
  }
  .ped-badge.preparando .ped-badge-dot { background: var(--naranja); }

  .ped-badge.enviado {
    background: rgba(155,89,182,0.15);
    color: #9b59b6;
    border: 1px solid rgba(155,89,182,0.3);
  }
  .ped-badge.enviado .ped-badge-dot { background: #9b59b6; }

  .ped-badge.entregado {
    background: rgba(39,174,96,0.15);
    color: var(--verde-success);
    border: 1px solid rgba(39,174,96,0.3);
  }
  .ped-badge.entregado .ped-badge-dot {
    background: var(--verde-success);
    animation: none;
  }

  .ped-badge.cancelado {
    background: rgba(192,57,43,0.15);
    color: var(--rojo);
    border: 1px solid rgba(192,57,43,0.3);
  }
  .ped-badge.cancelado .ped-badge-dot {
    background: var(--rojo);
    animation: none;
  }

  /* TIMELINE */
  .ped-timeline {
    padding: 28px 28px 24px;
    background: rgba(4,11,6,0.4);
    border-bottom: 1px solid rgba(45,92,53,0.15);
  }
  .ped-timeline-track {
    display: flex; justify-content: space-between;
    position: relative;
    margin: 10px 0 20px;
  }
  .ped-timeline-track::before {
    content: '';
    position: absolute;
    top: 12px; left: 12px; right: 12px;
    height: 2px;
    background: rgba(45,92,53,0.3);
    z-index: 0;
  }
  .ped-timeline-progress {
    position: absolute;
    top: 12px; left: 12px;
    height: 2px;
    background: linear-gradient(90deg, var(--caña), var(--naranja));
    z-index: 1;
    transition: width 0.6s ease;
  }
  .ped-timeline-step {
    display: flex; flex-direction: column;
    align-items: center;
    flex: 1;
    position: relative;
    z-index: 2;
  }
  .ped-timeline-dot {
    width: 26px; height: 26px;
    border-radius: 50%;
    background: var(--verde-deep);
    border: 2px solid rgba(45,92,53,0.5);
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 8px;
    transition: all 0.3s;
  }
  .ped-timeline-step.done .ped-timeline-dot {
    background: var(--caña);
    border-color: var(--caña);
    color: var(--verde-deep);
  }
  .ped-timeline-step.active .ped-timeline-dot {
    background: var(--naranja);
    border-color: var(--naranja);
    color: white;
    box-shadow: 0 0 0 4px rgba(232,98,26,0.2);
    animation: pulseRing 2s infinite;
  }
  @keyframes pulseRing {
    0%, 100% { box-shadow: 0 0 0 4px rgba(232,98,26,0.2); }
    50% { box-shadow: 0 0 0 8px rgba(232,98,26,0.05); }
  }
  .ped-timeline-icon {
    width: 14px; height: 14px;
    color: var(--tenue);
    transition: color 0.3s;
  }
  .ped-timeline-step.done .ped-timeline-icon,
  .ped-timeline-step.active .ped-timeline-icon {
    color: currentColor;
  }
  .ped-timeline-label {
    font-size: 0.55rem;
    letter-spacing: 1.5px;
    color: var(--tenue);
    text-transform: uppercase;
    text-align: center;
    transition: color 0.3s;
  }
  .ped-timeline-step.done .ped-timeline-label {
    color: var(--opaco);
  }
  .ped-timeline-step.active .ped-timeline-label {
    color: var(--naranja);
    font-weight: 600;
  }

  .ped-timeline-msg {
    text-align: center;
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    font-size: 0.95rem;
    color: var(--crema);
    margin-top: 18px;
    padding: 12px 16px;
    background: rgba(232,160,32,0.05);
    border-left: 2px solid var(--caña);
  }

  /* DETAILS */
  .ped-details {
    padding: 24px 28px;
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 30px;
  }

  .ped-section-title {
    font-size: 0.55rem;
    letter-spacing: 3px;
    color: var(--opaco);
    text-transform: uppercase;
    margin-bottom: 14px;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(232,160,32,0.1);
  }

  .ped-items {
    display: flex; flex-direction: column;
    gap: 10px;
  }
  .ped-item {
    display: flex; justify-content: space-between; align-items: center;
    padding: 10px 0;
    border-bottom: 1px dashed rgba(45,92,53,0.2);
  }
  .ped-item:last-child { border-bottom: none; }
  .ped-item-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 0.95rem;
    color: var(--crema);
  }
  .ped-item-qty {
    display: inline-block;
    margin-right: 10px;
    color: var(--caña);
    font-weight: 600;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.75rem;
  }
  .ped-item-price {
    color: var(--opaco);
    font-size: 0.85rem;
  }

  .ped-info {
    background: rgba(4,11,6,0.4);
    padding: 16px;
    border: 1px solid rgba(45,92,53,0.15);
  }
  .ped-info-row {
    display: flex; justify-content: space-between;
    padding: 8px 0;
    font-size: 0.78rem;
    border-bottom: 1px solid rgba(45,92,53,0.15);
  }
  .ped-info-row:last-child { border-bottom: none; }
  .ped-info-label {
    color: var(--opaco);
    letter-spacing: 1px;
  }
  .ped-info-value {
    color: var(--crema);
    text-align: right;
    max-width: 60%;
  }

  /* ACCIONES */
  .ped-actions {
    padding: 16px 28px;
    background: rgba(4,11,6,0.5);
    border-top: 1px solid rgba(45,92,53,0.15);
    display: flex; gap: 12px; justify-content: flex-end;
  }
  .ped-action-btn {
    padding: 10px 20px;
    background: none;
    border: 1px solid rgba(45,92,53,0.4);
    color: var(--opaco);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.55rem;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.25s;
    display: flex; align-items: center; gap: 8px;
  }
  .ped-action-btn:hover {
    border-color: var(--caña);
    color: var(--caña);
  }
  .ped-action-btn.danger:hover {
    border-color: var(--rojo);
    color: var(--rojo);
  }
  .ped-action-btn.success {
    background: #075E54;
    border-color: #075E54;
    color: white;
  }
  .ped-action-btn.success:hover {
    background: #128C7E;
    border-color: #128C7E;
  }

  /* REFRESH */
  .ped-refresh {
    position: fixed;
    bottom: 30px; right: 30px;
    width: 48px; height: 48px;
    border-radius: 50%;
    background: var(--caña);
    color: var(--verde-deep);
    border: none;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 4px 16px rgba(232,160,32,0.4);
    transition: all 0.3s;
    z-index: 50;
  }
  .ped-refresh:hover {
    transform: rotate(180deg);
    background: var(--caña-light);
  }
  .ped-refresh.loading {
    animation: spin 1s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  @media (max-width: 850px) {
    .ped-nav { padding: 20px 24px; }
    .ped-card-header { padding: 16px 20px; flex-direction: column; gap: 12px; align-items: flex-start; }
    .ped-card-header-right { width: 100%; justify-content: space-between; }
    .ped-details { grid-template-columns: 1fr; padding: 20px; }
    .ped-timeline { padding: 20px; }
    .ped-actions { padding: 14px 20px; flex-wrap: wrap; }
    .ped-timeline-label { font-size: 0.45rem; letter-spacing: 1px; }
  }
`

// ICONS
const ArrowLeft = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
)
const RefreshIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg>
)
const BoxIcon = () => (
  <svg className="ped-empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
)
const CheckIcon = () => (
  <svg className="ped-timeline-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
)
const ClockIcon = () => (
  <svg className="ped-timeline-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
)
const FireIcon = () => (
  <svg className="ped-timeline-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z"/></svg>
)
const TruckIcon = () => (
  <svg className="ped-timeline-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
)
const HomeIcon = () => (
  <svg className="ped-timeline-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
)
const WhatsappIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.528 5.855L0 24l6.335-1.505A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
)

// Estados del pedido
const ESTADOS = [
  { key: "pendiente", label: "Pendiente", icon: ClockIcon, msg: "Tu pedido fue recibido. Esperando confirmación..." },
  { key: "confirmado", label: "Confirmado", icon: CheckIcon, msg: "¡Tu pedido fue confirmado! Pronto comenzaremos a prepararlo." },
  { key: "preparando", label: "Preparando", icon: FireIcon, msg: "Nuestro chef está preparando tu pedido con mucho amor 👨‍🍳" },
  { key: "enviado", label: "En camino", icon: TruckIcon, msg: "¡Tu pedido va en camino! Llegará pronto." },
  { key: "entregado", label: "Entregado", icon: HomeIcon, msg: "¡Pedido entregado! Esperamos que lo disfrutes 🌺" },
]

const getEstadoIndex = (estado) => {
  const idx = ESTADOS.findIndex(e => e.key === estado?.toLowerCase())
  return idx === -1 ? 0 : idx
}

const formatDate = (dateStr) => {
  if (!dateStr) return "Fecha desconocida"
  const d = new Date(dateStr)
  return d.toLocaleDateString("es-CO", {
    day: "2-digit", month: "long", year: "numeric",
    hour: "2-digit", minute: "2-digit"
  })
}

export default function MisPedidosPage() {
  const navigate = useNavigate()
  const [pedidos, setPedidos] = useState([])
  const [loading, setLoading] = useState(true)
  const [filtro, setFiltro] = useState("todos")
  const [refreshing, setRefreshing] = useState(false)

  const cargarPedidos = async () => {
    setRefreshing(true)
    try {
      // Ajusta el endpoint según tu backend
      const res = await api.get("/pedidos/mis-pedidos")
      setPedidos(Array.isArray(res.data) ? res.data : [])
    } catch (err) {
      console.error("Error al cargar pedidos:", err)
      setPedidos([])
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    cargarPedidos()
    // Auto-refresh cada 30 segundos
    const interval = setInterval(cargarPedidos, 30000)
    return () => clearInterval(interval)
  }, [])

  const pedidosFiltrados = pedidos.filter(p => {
    if (filtro === "todos") return true
    if (filtro === "activos") return !["entregado", "cancelado"].includes(p.estado?.toLowerCase())
    return p.estado?.toLowerCase() === filtro
  })

  // Mensaje de WhatsApp para soporte
  const contactarSoporte = (pedido) => {
    const msg = `Hola, tengo una consulta sobre mi pedido #${pedido._id?.slice(-6) || pedido.id}`
    window.open(`https://wa.me/573175397038?text=${encodeURIComponent(msg)}`, "_blank")
  }

  const cancelarPedido = async (id) => {
    if (!confirm("¿Estás seguro de cancelar este pedido?")) return
    try {
      await api.put(`/pedidos/${id}/cancelar`)
      cargarPedidos()
    } catch (err) {
      alert("No se pudo cancelar el pedido")
    }
  }

  return (
    <>
      <style>{styles}</style>
      <div className="ped-root">
        {/* NAV */}
        <nav className="ped-nav">
          <div className="ped-logo" onClick={() => navigate("/home")}>
            <span className="ped-logo-name">LA MAISON</span>
            <span className="ped-logo-sub">Cali · Alta Cocina</span>
          </div>
          <button className="ped-back" onClick={() => navigate("/home")}>
            <ArrowLeft /> Volver al inicio
          </button>
        </nav>

        {/* HEADER */}
        <div className="ped-header">
          <div className="ped-eyebrow">Tus pedidos</div>
          <h1 className="ped-title">
            Estado de <span className="ped-title-accent">tu pedido</span>
          </h1>
          <p className="ped-subtitle">
            Sigue en tiempo real el progreso de tus pedidos
          </p>
        </div>

        {/* FILTROS */}
        <div className="ped-filters">
          {[
            { key: "todos", label: "Todos" },
            { key: "activos", label: "Activos" },
            { key: "pendiente", label: "Pendientes" },
            { key: "preparando", label: "Preparando" },
            { key: "enviado", label: "En camino" },
            { key: "entregado", label: "Entregados" },
          ].map(f => (
            <button
              key={f.key}
              className={`ped-filter ${filtro === f.key ? "active" : ""}`}
              onClick={() => setFiltro(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        <div className="ped-content">
          {loading ? (
            <div className="ped-loading">Cargando tus pedidos...</div>
          ) : pedidosFiltrados.length === 0 ? (
            <div className="ped-empty">
              <BoxIcon />
              <div className="ped-empty-text">
                {pedidos.length === 0
                  ? "Aún no tienes pedidos"
                  : "No hay pedidos con este filtro"}
              </div>
              <div className="ped-empty-sub">
                {pedidos.length === 0
                  ? "Explora nuestro menú y haz tu primer pedido"
                  : "Prueba con otro filtro"}
              </div>
              {pedidos.length === 0 && (
                <button className="ped-empty-btn" onClick={() => navigate("/home")}>
                  Ver el menú
                </button>
              )}
            </div>
          ) : (
            pedidosFiltrados.map((pedido, idx) => {
              const estadoIdx = getEstadoIndex(pedido.estado)
              const estadoActual = ESTADOS[estadoIdx]
              const isCancelado = pedido.estado?.toLowerCase() === "cancelado"
              const progressWidth = isCancelado ? 0 : (estadoIdx / (ESTADOS.length - 1)) * 100

              return (
                <div className="ped-card" key={pedido._id || pedido.id || idx}>
                  {/* HEADER */}
                  <div className="ped-card-header">
                    <div className="ped-card-header-left">
                      <div className="ped-card-id">
                        Pedido #{(pedido._id || pedido.id || "000000").toString().slice(-6).toUpperCase()}
                      </div>
                      <div className="ped-card-date">
                        {formatDate(pedido.createdAt || pedido.fecha)}
                      </div>
                    </div>
                    <div className="ped-card-header-right">
                      <div className={`ped-badge ${isCancelado ? "cancelado" : estadoActual.key}`}>
                        <span className="ped-badge-dot" />
                        {isCancelado ? "Cancelado" : estadoActual.label}
                      </div>
                      <div className="ped-card-total">
                        ${(pedido.total || 0).toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* TIMELINE (no se muestra si está cancelado) */}
                  {!isCancelado && (
                    <div className="ped-timeline">
                      <div className="ped-timeline-track">
                        <div
                          className="ped-timeline-progress"
                          style={{ width: `calc(${progressWidth}% - 24px)` }}
                        />
                        {ESTADOS.map((e, i) => {
                          const Icon = e.icon
                          const isDone = i < estadoIdx
                          const isActive = i === estadoIdx
                          return (
                            <div
                              key={e.key}
                              className={`ped-timeline-step ${isDone ? "done" : ""} ${isActive ? "active" : ""}`}
                            >
                              <div className="ped-timeline-dot">
                                <Icon />
                              </div>
                              <span className="ped-timeline-label">{e.label}</span>
                            </div>
                          )
                        })}
                      </div>
                      <div className="ped-timeline-msg">
                        {estadoActual.msg}
                      </div>
                    </div>
                  )}

                  {/* DETAILS */}
                  <div className="ped-details">
                    <div>
                      <div className="ped-section-title">Productos pedidos</div>
                      <div className="ped-items">
                        {(pedido.items || []).map((item, i) => (
                          <div className="ped-item" key={i}>
                            <div className="ped-item-name">
                              <span className="ped-item-qty">×{item.cantidad}</span>
                              {item.nombre}
                            </div>
                            <div className="ped-item-price">
                              ${((item.precio || 0) * (item.cantidad || 1)).toLocaleString()}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="ped-section-title">Información</div>
                      <div className="ped-info">
                        {pedido.tipoEntrega && (
                          <div className="ped-info-row">
                            <span className="ped-info-label">Tipo</span>
                            <span className="ped-info-value">
                              {pedido.tipoEntrega === "domicilio" ? "🏠 Domicilio" : "🪑 En mesa"}
                            </span>
                          </div>
                        )}
                        {pedido.direccion && (
                          <div className="ped-info-row">
                            <span className="ped-info-label">Dirección</span>
                            <span className="ped-info-value">{pedido.direccion}</span>
                          </div>
                        )}
                        {pedido.mesa && (
                          <div className="ped-info-row">
                            <span className="ped-info-label">Mesa</span>
                            <span className="ped-info-value">#{pedido.mesa}</span>
                          </div>
                        )}
                        {pedido.contacto && (
                          <div className="ped-info-row">
                            <span className="ped-info-label">Contacto</span>
                            <span className="ped-info-value">{pedido.contacto}</span>
                          </div>
                        )}
                        <div className="ped-info-row">
                          <span className="ped-info-label">Total</span>
                          <span className="ped-info-value" style={{color:'var(--caña)', fontWeight:600}}>
                            ${(pedido.total || 0).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ACCIONES */}
                  <div className="ped-actions">
                    {!isCancelado && pedido.estado?.toLowerCase() === "pendiente" && (
                      <button
                        className="ped-action-btn danger"
                        onClick={() => cancelarPedido(pedido._id || pedido.id)}
                      >
                        Cancelar pedido
                      </button>
                    )}
                    <button
                      className="ped-action-btn success"
                      onClick={() => contactarSoporte(pedido)}
                    >
                      <WhatsappIcon /> Contactar soporte
                    </button>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* BOTÓN REFRESH FLOTANTE */}
        <button
          className={`ped-refresh ${refreshing ? "loading" : ""}`}
          onClick={cargarPedidos}
          title="Actualizar pedidos"
        >
          <RefreshIcon />
        </button>
      </div>
    </>
  )
}