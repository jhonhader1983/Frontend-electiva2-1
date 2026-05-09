import { useNavigate } from "react-router-dom"

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&family=Bebas+Neue&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body, #root { margin: 0; padding: 0; }

  :root {
    --verde-deep: #040b06;
    --caña: #e8a020;
    --caña-light: #f5c84a;
    --naranja: #e8621a;
    --crema: #fdf6e8;
    --opaco: #7aaa80;
    --tenue: #2d5c35;
  }

  .nos-root {
    min-height: 100vh;
    background:
      radial-gradient(ellipse 70% 60% at 30% 20%, #0e2e14 0%, transparent 60%),
      radial-gradient(ellipse 50% 50% at 90% 80%, rgba(232,98,26,0.08) 0%, transparent 60%),
      linear-gradient(180deg, #030b04 0%, #061009 50%, #040b06 100%);
    font-family: 'DM Sans', sans-serif;
    color: var(--crema);
  }

  .nos-nav {
    display: flex; align-items: center; justify-content: space-between;
    padding: 24px 60px;
    border-bottom: 1px solid rgba(232,160,32,0.1);
  }
  .nos-logo { display: flex; flex-direction: column; }
  .nos-logo-name {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.5rem; letter-spacing: 6px; color: var(--caña);
  }
  .nos-logo-sub {
    font-size: 0.5rem; letter-spacing: 4px;
    color: var(--opaco); text-transform: uppercase;
  }
  .nos-back {
    background: none; border: none;
    color: var(--opaco);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.65rem; letter-spacing: 3px; text-transform: uppercase;
    cursor: pointer; transition: color 0.25s;
    display: flex; align-items: center; gap: 8px;
  }
  .nos-back:hover { color: var(--caña); }

  /* HERO */
  .nos-hero {
    text-align: center;
    padding: 80px 20px 60px;
    max-width: 900px;
    margin: 0 auto;
  }
  .nos-eyebrow {
    display: inline-flex; align-items: center; gap: 14px;
    font-size: 0.55rem; letter-spacing: 5px;
    color: var(--caña); text-transform: uppercase;
    margin-bottom: 24px;
  }
  .nos-eyebrow::before, .nos-eyebrow::after {
    content: ''; width: 30px; height: 1px; background: var(--caña);
  }
  .nos-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(3rem, 6vw, 5rem);
    font-weight: 300; font-style: italic;
    color: var(--crema);
    margin-bottom: 24px; line-height: 1.05;
  }
  .nos-title-accent {
    color: var(--caña);
    font-weight: 500;
    display: block;
  }
  .nos-subtitle {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.15rem;
    font-style: italic;
    color: var(--opaco);
    line-height: 1.7;
    max-width: 620px;
    margin: 0 auto;
  }

  /* HISTORIA */
  .nos-section {
    max-width: 1100px;
    margin: 0 auto;
    padding: 60px 20px;
  }
  .nos-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;
  }
  .nos-section-eyebrow {
    font-size: 0.55rem; letter-spacing: 5px;
    color: var(--caña); text-transform: uppercase;
    margin-bottom: 16px;
  }
  .nos-section-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.4rem;
    font-style: italic;
    color: var(--crema);
    margin-bottom: 20px;
    line-height: 1.2;
  }
  .nos-section-text {
    font-size: 0.92rem;
    color: var(--opaco);
    line-height: 1.8;
    margin-bottom: 14px;
  }
  .nos-section-text strong {
    color: var(--caña);
    font-weight: 500;
  }

  .nos-image-card {
    aspect-ratio: 4/5;
    background:
      radial-gradient(circle at 50% 30%, rgba(232,160,32,0.15) 0%, transparent 60%),
      linear-gradient(135deg, #0a1f0e 0%, #1a5c2a 50%, #0a1f0e 100%);
    border: 1px solid rgba(232,160,32,0.2);
    position: relative;
    overflow: hidden;
    display: flex; align-items: center; justify-content: center;
  }
  .nos-image-card::before {
    content: '';
    position: absolute; inset: 12px;
    border: 1px solid rgba(232,160,32,0.15);
  }

  /* VALORES */
  .nos-valores {
    background: rgba(10,20,12,0.4);
    padding: 80px 20px;
    border-top: 1px solid rgba(232,160,32,0.08);
    border-bottom: 1px solid rgba(232,160,32,0.08);
  }
  .nos-valores-header {
    text-align: center;
    max-width: 700px;
    margin: 0 auto 50px;
  }
  .nos-valores-grid {
    max-width: 1100px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
  }
  .nos-valor {
    text-align: center;
    padding: 36px 24px;
    background: rgba(4,11,6,0.5);
    border: 1px solid rgba(232,160,32,0.08);
    border-top: 2px solid var(--caña);
    transition: transform 0.3s, border-color 0.3s;
  }
  .nos-valor:hover {
    transform: translateY(-4px);
    border-color: var(--naranja);
  }
  .nos-valor-icon {
    width: 50px; height: 50px;
    margin: 0 auto 20px;
    color: var(--caña);
  }
  .nos-valor-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.4rem;
    font-style: italic;
    color: var(--crema);
    margin-bottom: 12px;
  }
  .nos-valor-text {
    font-size: 0.82rem;
    color: var(--opaco);
    line-height: 1.7;
  }

  /* CHEF */
  .nos-chef {
    padding: 80px 20px;
  }
  .nos-chef-quote {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
    position: relative;
    padding: 40px 20px;
  }
  .nos-chef-quote::before {
    content: '"';
    font-family: 'Cormorant Garamond', serif;
    font-size: 8rem;
    color: var(--caña);
    opacity: 0.2;
    position: absolute;
    top: -20px; left: 50%;
    transform: translateX(-50%);
    line-height: 1;
  }
  .nos-quote-text {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.6rem;
    font-style: italic;
    color: var(--crema);
    line-height: 1.5;
    margin-bottom: 24px;
    position: relative;
    z-index: 2;
  }
  .nos-quote-author {
    font-size: 0.7rem;
    letter-spacing: 4px;
    color: var(--caña);
    text-transform: uppercase;
  }
  .nos-quote-author-sub {
    font-size: 0.6rem;
    letter-spacing: 2px;
    color: var(--opaco);
    text-transform: uppercase;
    margin-top: 4px;
  }

  /* CTA */
  .nos-cta {
    padding: 80px 20px;
    text-align: center;
    background:
      radial-gradient(ellipse at center, rgba(232,98,26,0.08) 0%, transparent 70%);
  }
  .nos-cta-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.4rem;
    font-style: italic;
    color: var(--crema);
    margin-bottom: 16px;
  }
  .nos-cta-text {
    font-size: 0.9rem;
    color: var(--opaco);
    margin-bottom: 32px;
  }
  .nos-cta-buttons {
    display: flex; justify-content: center; gap: 16px; flex-wrap: wrap;
  }
  .nos-btn-primary {
    padding: 16px 36px;
    background: linear-gradient(135deg, var(--naranja), var(--caña), var(--caña-light));
    background-size: 200% 200%;
    border: none;
    color: var(--verde-deep);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.62rem; font-weight: 600;
    letter-spacing: 4px; text-transform: uppercase;
    cursor: pointer;
    transition: all 0.3s;
    animation: gradient 4s ease infinite;
  }
  @keyframes gradient {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  .nos-btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(232,98,26,0.3);
  }
  .nos-btn-secondary {
    padding: 16px 36px;
    background: none;
    border: 1px solid var(--caña);
    color: var(--caña);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.62rem; font-weight: 600;
    letter-spacing: 4px; text-transform: uppercase;
    cursor: pointer;
    transition: all 0.3s;
  }
  .nos-btn-secondary:hover {
    background: rgba(232,160,32,0.1);
  }

  @media (max-width: 850px) {
    .nos-nav { padding: 20px 24px; }
    .nos-grid { grid-template-columns: 1fr; gap: 40px; }
    .nos-valores-grid { grid-template-columns: 1fr; }
  }
`

const ArrowLeft = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
)

const ChefIcon = () => (
  <svg className="nos-valor-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 13.87A4 4 0 017.41 6a5.11 5.11 0 011.05-1.54 5 5 0 017.08 0A5.11 5.11 0 0116.59 6 4 4 0 0118 13.87V21H6z"/>
    <line x1="6" y1="17" x2="18" y2="17"/>
  </svg>
)
const HeartIcon = () => (
  <svg className="nos-valor-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
  </svg>
)
const LeafIcon = () => (
  <svg className="nos-valor-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 014 13V8a1 1 0 011-1h6a7 7 0 017 7v5a1 1 0 01-1 1z"/>
    <path d="M11 20v-6"/>
  </svg>
)

// Logo orquídea grande
const OrchidLogo = () => (
  <svg width="180" height="180" viewBox="0 0 200 200">
    <defs>
      <linearGradient id="og" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f5c84a"/>
        <stop offset="50%" stopColor="#e8a020"/>
        <stop offset="100%" stopColor="#e8621a"/>
      </linearGradient>
    </defs>
    <ellipse cx="100" cy="60" rx="40" ry="22" fill="url(#og)" opacity="0.6" transform="rotate(-5 100 60)"/>
    <ellipse cx="62" cy="80" rx="32" ry="17" fill="url(#og)" opacity="0.5" transform="rotate(-40 62 80)"/>
    <ellipse cx="138" cy="78" rx="32" ry="17" fill="url(#og)" opacity="0.5" transform="rotate(35 138 78)"/>
    <ellipse cx="74" cy="108" rx="28" ry="14" fill="url(#og)" opacity="0.4" transform="rotate(-20 74 108)"/>
    <ellipse cx="126" cy="108" rx="28" ry="14" fill="url(#og)" opacity="0.4" transform="rotate(20 126 108)"/>
    <circle cx="100" cy="80" r="18" fill="#e8a020" opacity="0.9"/>
    <circle cx="100" cy="80" r="9" fill="#f5c84a"/>
    <circle cx="100" cy="80" r="3" fill="#fff" opacity="0.7"/>
    {/* Tallo */}
    <line x1="100" y1="100" x2="100" y2="180" stroke="#2d8b3a" strokeWidth="2" opacity="0.5"/>
    <ellipse cx="80" cy="160" rx="22" ry="6" fill="#1a5c2a" opacity="0.4" transform="rotate(-25 80 160)"/>
    <ellipse cx="120" cy="160" rx="22" ry="6" fill="#1a5c2a" opacity="0.4" transform="rotate(25 120 160)"/>
  </svg>
)

const ChefAvatar = () => (
  <svg width="160" height="200" viewBox="0 0 160 200">
    {/* Sombrero chef */}
    <ellipse cx="80" cy="40" rx="38" ry="28" fill="#fdf6e8" opacity="0.95"/>
    <ellipse cx="55" cy="48" rx="22" ry="20" fill="#fdf6e8" opacity="0.95"/>
    <ellipse cx="105" cy="48" rx="22" ry="20" fill="#fdf6e8" opacity="0.95"/>
    <rect x="42" y="55" width="76" height="20" fill="#fdf6e8" opacity="0.95"/>
    {/* Cabeza */}
    <circle cx="80" cy="100" r="32" fill="#d4a574" opacity="0.9"/>
    {/* Cuerpo chef */}
    <path d="M40 200 L40 145 Q40 130 55 128 L105 128 Q120 130 120 145 L120 200 Z" fill="#fdf6e8" opacity="0.9"/>
    {/* Botones */}
    <circle cx="65" cy="150" r="2.5" fill="#e8a020"/>
    <circle cx="95" cy="150" r="2.5" fill="#e8a020"/>
    <circle cx="65" cy="170" r="2.5" fill="#e8a020"/>
    <circle cx="95" cy="170" r="2.5" fill="#e8a020"/>
    {/* Ojos */}
    <circle cx="70" cy="98" r="2" fill="#040b06"/>
    <circle cx="90" cy="98" r="2" fill="#040b06"/>
    {/* Sonrisa */}
    <path d="M70 112 Q80 118 90 112" stroke="#040b06" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    {/* Bigote */}
    <path d="M68 105 Q75 108 80 106 Q85 108 92 105" stroke="#5a3a2a" strokeWidth="2" fill="none"/>
  </svg>
)

export default function NosotrosPage() {
  const navigate = useNavigate()

  return (
    <>
      <style>{styles}</style>
      <div className="nos-root">
        {/* NAV */}
        <nav className="nos-nav">
          <div className="nos-logo">
            <span className="nos-logo-name">LA MAISON</span>
            <span className="nos-logo-sub">Cali · Alta Cocina</span>
          </div>
          <button className="nos-back" onClick={() => navigate("/home")}>
            <ArrowLeft /> Volver al inicio
          </button>
        </nav>

        {/* HERO */}
        <div className="nos-hero">
          <div className="nos-eyebrow">Conoce nuestra historia</div>
          <h1 className="nos-title">
            Pasión por la
            <span className="nos-title-accent">cocina caleña</span>
          </h1>
          <p className="nos-subtitle">
            Más que un restaurante, somos un homenaje a los sabores, los aromas y las tradiciones
            del Valle del Cauca, servidos con técnica de alta cocina.
          </p>
        </div>

        {/* HISTORIA */}
        <div className="nos-section">
          <div className="nos-grid">
            <div>
              <div className="nos-section-eyebrow">Nuestra historia</div>
              <h2 className="nos-section-title">
                Nacidos en el corazón de la <em style={{color:'var(--caña)'}}>Sucursal del Cielo</em>
              </h2>
              <p className="nos-section-text">
                <strong>La Maison</strong> nació en 2018 de un sueño compartido entre chefs caleños
                apasionados por elevar la gastronomía del Valle del Cauca a un nivel internacional,
                sin perder la esencia y el alma de nuestra tierra.
              </p>
              <p className="nos-section-text">
                Inspirados por la riqueza del <strong>Pacífico</strong>, las frutas tropicales del Valle,
                y la calidez de la gente caleña, creamos una propuesta única que fusiona técnicas
                francesas con ingredientes locales de la más alta calidad.
              </p>
              <p className="nos-section-text">
                Hoy, bajo la mirada del <strong>Cristo Rey</strong> y los Farallones, recibimos a
                comensales de todo el mundo que buscan vivir una experiencia gastronómica que les
                conecte con la verdadera Cali.
              </p>
            </div>
            <div className="nos-image-card">
              <OrchidLogo />
            </div>
          </div>
        </div>

        {/* VALORES */}
        <div className="nos-valores">
          <div className="nos-valores-header">
            <div className="nos-section-eyebrow" style={{textAlign:'center'}}>Lo que nos define</div>
            <h2 className="nos-section-title" style={{textAlign:'center'}}>
              Nuestros <em style={{color:'var(--caña)'}}>valores</em>
            </h2>
          </div>
          <div className="nos-valores-grid">
            <div className="nos-valor">
              <ChefIcon />
              <h3 className="nos-valor-title">Cocina de autor</h3>
              <p className="nos-valor-text">
                Cada plato es una creación única donde la técnica se encuentra con la creatividad
                y el respeto por nuestras raíces.
              </p>
            </div>
            <div className="nos-valor">
              <HeartIcon />
              <h3 className="nos-valor-title">Calidez caleña</h3>
              <p className="nos-valor-text">
                Te recibimos como en casa. La hospitalidad y la alegría caleña son parte
                esencial de nuestra experiencia.
              </p>
            </div>
            <div className="nos-valor">
              <LeafIcon />
              <h3 className="nos-valor-title">Producto local</h3>
              <p className="nos-valor-text">
                Trabajamos directamente con productores del Valle del Cauca para garantizar
                ingredientes frescos y sostenibles.
              </p>
            </div>
          </div>
        </div>

        {/* CHEF */}
        <div className="nos-chef">
          <div className="nos-grid" style={{maxWidth:'900px', margin:'0 auto'}}>
            <div style={{display:'flex', justifyContent:'center'}}>
              <ChefAvatar />
            </div>
            <div className="nos-chef-quote">
              <p className="nos-quote-text">
                Cocinar es contar la historia de nuestra tierra en cada plato.
                En La Maison, cada bocado es un pedacito del Valle.
              </p>
              <div className="nos-quote-author">Carlos Vásquez</div>
              <div className="nos-quote-author-sub">Chef Ejecutivo · Fundador</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="nos-cta">
          <h2 className="nos-cta-title">¿Listo para vivir la experiencia?</h2>
          <p className="nos-cta-text">Reserva tu mesa o conoce nuestra carta</p>
          <div className="nos-cta-buttons">
            <button className="nos-btn-primary" onClick={() => navigate("/reservas")}>
              Reservar mesa
            </button>
            <button className="nos-btn-secondary" onClick={() => navigate("/menu")}>
              Ver el menú
            </button>
          </div>
        </div>
      </div>
    </>
  )
}