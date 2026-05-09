import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/axios"

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600&family=DM+Sans:wght@300;400;500;600&family=Bebas+Neue&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --verde-cali:    #1a5c2a;
    --verde-caña:    #2d8b3a;
    --verde-deep:    #0a1f0e;
    --verde-noche:   #061209;
    --naranja-cali:  #e8621a;
    --naranja-light: #f4872e;
    --naranja-warm:  #ff9a3c;
    --rojo-salsa:    #c0392b;
    --rojo-feria:    #e74c3c;
    --caña:          #e8a020;
    --caña-light:    #f5c84a;
    --caña-pale:     #fde68a;
    --crema:         #fdf6e8;
    --crema-soft:    #f5e6c8;
    --opaco:         #7aaa80;
    --tenue:         #2d5c35;
    --dorado:        #d4a017;
    --dorado-light:  #f0c040;
    --tropical:      #27ae60;
    --cielo-cali:    #1a6b8a;
    --noche:         #040b06;
    --sombra-caña:   rgba(232,160,32,0.12);
    --sombra-naranja:rgba(232,98,26,0.08);
    --linea-verde:   rgba(45,139,58,0.15);
    --linea-dorada:  rgba(232,160,32,0.18);
  }

  html, body { height: 100%; }

  /* ===== ROOT ===== */
  .login-root {
    min-height: 100vh;
    background:
      radial-gradient(ellipse 80% 50% at 20% 20%, rgba(26,92,42,0.15) 0%, transparent 60%),
      radial-gradient(ellipse 60% 60% at 80% 80%, rgba(232,98,26,0.06) 0%, transparent 50%),
      radial-gradient(ellipse 50% 40% at 50% 0%, rgba(26,107,138,0.05) 0%, transparent 50%),
      linear-gradient(175deg, #050d07 0%, #0a1f0e 25%, #081a0c 50%, #061209 75%, #040b06 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'DM Sans', sans-serif;
    position: relative;
    overflow: hidden;
    padding: 20px;
  }

  /* Textura caña de azúcar sutil */
  .login-root::before {
    content: '';
    position: absolute; inset: 0;
    background-image:
      repeating-linear-gradient(
        90deg, transparent, transparent 60px,
        rgba(45,139,58,0.012) 60px, rgba(45,139,58,0.012) 61px
      ),
      repeating-linear-gradient(
        0deg, transparent, transparent 3px,
        rgba(255,255,255,0.004) 3px, rgba(255,255,255,0.004) 4px
      );
    pointer-events: none;
  }

  /* Marca de agua CALI grande */
  .login-watermark {
    position: absolute;
    left: 50%; top: 48%;
    transform: translate(-50%, -50%);
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(120px, 28vw, 340px);
    color: transparent;
    -webkit-text-stroke: 1px rgba(232,160,32,0.025);
    letter-spacing: 24px;
    pointer-events: none;
    user-select: none;
    white-space: nowrap;
  }

  /* Destello naranja tropical */
  .login-glow1 {
    position: absolute; top: 5%; right: 10%;
    width: 350px; height: 350px; border-radius: 50%;
    background: radial-gradient(circle,
      rgba(232,98,26,0.06) 0%,
      rgba(244,135,46,0.03) 40%,
      transparent 70%);
    pointer-events: none;
    animation: pulseGlow 7s ease-in-out infinite;
  }
  .login-glow2 {
    position: absolute; bottom: 10%; left: 5%;
    width: 300px; height: 300px; border-radius: 50%;
    background: radial-gradient(circle,
      rgba(39,174,96,0.06) 0%,
      rgba(45,139,58,0.03) 40%,
      transparent 70%);
    pointer-events: none;
    animation: pulseGlow 9s ease-in-out infinite reverse;
  }
  .login-glow3 {
    position: absolute; top: 40%; left: 50%;
    transform: translateX(-50%);
    width: 500px; height: 200px; border-radius: 50%;
    background: radial-gradient(ellipse,
      rgba(232,160,32,0.03) 0%,
      transparent 60%);
    pointer-events: none;
    animation: pulseGlow 10s ease-in-out infinite 2s;
  }
  @keyframes pulseGlow {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.3; transform: scale(1.15); }
  }

  /* Partículas de salsa flotantes */
  .login-particles {
    position: absolute; inset: 0;
    pointer-events: none; overflow: hidden;
  }
  .login-particle {
    position: absolute;
    border-radius: 50%;
    animation: floatUp linear infinite;
    opacity: 0;
  }
  @keyframes floatUp {
    0%   { opacity: 0; transform: translateY(0) scale(0.5); }
    10%  { opacity: 1; }
    90%  { opacity: 1; }
    100% { opacity: 0; transform: translateY(-100vh) scale(1); }
  }

  /* Cañas de azúcar decorativas */
  .login-cana-left {
    position: absolute; left: 0; bottom: 0;
    pointer-events: none; opacity: 0.7;
  }
  .login-cana-right {
    position: absolute; right: 0; bottom: 0;
    pointer-events: none; opacity: 0.6;
  }

  /* Cristo Rey silueta */
  .login-cristo {
    position: absolute;
    bottom: 0; left: 50%;
    transform: translateX(-50%);
    pointer-events: none;
    opacity: 0.025;
  }

  /* Montañas de Cali silueta */
  .login-mountains {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    pointer-events: none;
    opacity: 0.06;
  }

  /* ===== CARD PRINCIPAL ===== */
  .login-card {
    position: relative; z-index: 2;
    width: 100%; max-width: 460px;
    background:
      linear-gradient(170deg,
        rgba(10,31,14,0.92) 0%,
        rgba(6,18,9,0.95) 50%,
        rgba(4,11,6,0.92) 100%);
    border: 1px solid rgba(45,139,58,0.12);
    backdrop-filter: blur(16px);
    animation: fadeUp 0.9s cubic-bezier(0.22,1,0.36,1) both;
    box-shadow:
      0 0 0 1px rgba(232,160,32,0.05),
      0 25px 60px -15px rgba(0,0,0,0.5),
      0 0 80px -20px rgba(232,98,26,0.06);
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px) scale(0.98); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  /* Borde superior - tricolor caleño */
  .login-card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg,
      transparent 0%,
      var(--verde-caña) 15%,
      var(--caña) 35%,
      var(--naranja-cali) 50%,
      var(--caña) 65%,
      var(--verde-caña) 85%,
      transparent 100%);
  }

  /* Borde inferior sutil */
  .login-card::after {
    content: '';
    position: absolute; bottom: 0; left: 20%; right: 20%; height: 1px;
    background: linear-gradient(90deg,
      transparent, rgba(232,160,32,0.1), transparent);
  }

  /* ===== HEADER ===== */
  .login-header {
    padding: 40px 48px 32px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }

  /* Resplandor sutil detrás del logo */
  .login-header::before {
    content: '';
    position: absolute; top: -20px; left: 50%;
    transform: translateX(-50%);
    width: 200px; height: 100px;
    background: radial-gradient(ellipse,
      rgba(232,160,32,0.06) 0%, transparent 70%);
    pointer-events: none;
  }

  .login-brand {
    display: flex; flex-direction: column;
    align-items: center; gap: 2px;
    margin-bottom: 6px;
    position: relative;
  }

  .login-logo-icon {
    margin-bottom: 8px;
    animation: fadeUp 1s cubic-bezier(0.22,1,0.36,1) 0.2s both;
  }

  .login-logo {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 2.4rem;
    letter-spacing: 10px;
    background: linear-gradient(135deg, var(--caña-light), var(--caña), var(--naranja-warm));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1;
    display: block;
    animation: fadeUp 1s cubic-bezier(0.22,1,0.36,1) 0.3s both;
  }
  .login-logo-sub {
    font-size: 0.48rem;
    letter-spacing: 7px;
    color: var(--opaco);
    text-transform: uppercase;
    display: block;
    margin-bottom: 24px;
    animation: fadeUp 1s cubic-bezier(0.22,1,0.36,1) 0.4s both;
  }

  .login-divider {
    display: flex; align-items: center; gap: 12px;
    justify-content: center; margin-bottom: 18px;
    animation: fadeUp 1s cubic-bezier(0.22,1,0.36,1) 0.5s both;
  }
  .login-divider-line {
    width: 36px; height: 1px;
    background: linear-gradient(90deg, transparent, var(--linea-dorada), transparent);
  }
  .login-divider-icon {
    display: flex; align-items: center; gap: 4px;
  }
  .login-divider-diamond {
    width: 5px; height: 5px;
    border: 1px solid var(--caña);
    transform: rotate(45deg);
    opacity: 0.6;
  }
  .login-divider-diamond.center {
    width: 6px; height: 6px;
    background: var(--caña);
    opacity: 0.3;
  }

  .login-welcome {
    animation: fadeUp 1s cubic-bezier(0.22,1,0.36,1) 0.6s both;
  }
  .login-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.8rem;
    font-weight: 300;
    font-style: italic;
    color: var(--crema);
    margin-bottom: 10px;
    line-height: 1.2;
  }
  .login-title-accent {
    color: var(--naranja-warm);
    font-weight: 500;
  }
  .login-subtitle {
    font-size: 0.72rem;
    color: var(--opaco);
    letter-spacing: 0.5px;
    line-height: 1.7;
  }
  .login-subtitle-cali {
    display: inline-flex; align-items: center; gap: 6px;
    color: var(--caña);
    font-weight: 500;
  }

  /* Cita caleña */
  .login-quote {
    margin-top: 14px;
    padding: 10px 20px;
    font-family: 'Cormorant Garamond', serif;
    font-size: 0.82rem;
    font-style: italic;
    color: rgba(122,170,128,0.5);
    letter-spacing: 0.3px;
    position: relative;
  }
  .login-quote::before { content: '"'; }
  .login-quote::after { content: '"'; }

  /* ===== TABS ===== */
  .login-tabs {
    display: flex;
    border-top: 1px solid rgba(15,40,20,0.4);
    border-bottom: 1px solid rgba(15,40,20,0.4);
    background: rgba(0,0,0,0.15);
  }
  .login-tab {
    flex: 1; padding: 15px 8px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.56rem; letter-spacing: 3.5px; text-transform: uppercase;
    background: none; border: none; cursor: pointer;
    transition: all 0.3s;
    position: relative;
    display: flex; align-items: center; justify-content: center; gap: 8px;
  }
  .login-tab.active {
    color: var(--caña);
  }
  .login-tab.inactive {
    color: var(--tenue);
  }
  .login-tab.active::after {
    content: ''; position: absolute; bottom: -1px; left: 15%; right: 15%;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--caña), var(--naranja-cali), var(--caña), transparent);
  }
  .login-tab:hover:not(.active) { color: var(--opaco); }
  .login-tab-icon {
    width: 14px; height: 14px;
    opacity: 0.7;
  }

  /* ===== FORM BODY ===== */
  .login-body {
    padding: 32px 48px 40px;
    animation: fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.2s both;
  }

  .login-field {
    margin-bottom: 20px;
    position: relative;
    animation: slideField 0.6s cubic-bezier(0.22,1,0.36,1) both;
  }
  .login-field:nth-child(1) { animation-delay: 0.1s; }
  .login-field:nth-child(2) { animation-delay: 0.2s; }
  .login-field:nth-child(3) { animation-delay: 0.3s; }
  @keyframes slideField {
    from { opacity: 0; transform: translateX(-12px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  .login-label {
    display: flex; align-items: center; gap: 8px;
    font-size: 0.54rem;
    letter-spacing: 3px;
    color: var(--opaco);
    text-transform: uppercase;
    margin-bottom: 10px;
    font-weight: 400;
  }
  .login-label-icon {
    width: 13px; height: 13px;
    opacity: 0.5;
  }

  .login-input-wrap {
    position: relative;
  }

  .login-input {
    width: 100%;
    padding: 15px 18px 15px 44px;
    background: rgba(4, 11, 6, 0.6);
    border: 1px solid rgba(45,92,53,0.25);
    border-bottom: 2px solid rgba(45,92,53,0.3);
    color: var(--crema);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.88rem;
    font-weight: 300;
    outline: none;
    transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
    -webkit-appearance: none;
    border-radius: 0;
  }
  .login-input::placeholder { color: rgba(45,92,53,0.4); }
  .login-input:focus {
    border-color: rgba(232,160,32,0.2);
    border-bottom-color: var(--naranja-cali);
    background: rgba(4,11,6,0.85);
    box-shadow: 0 4px 16px -4px rgba(232,98,26,0.08);
  }
  .login-input:-webkit-autofill,
  .login-input:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0 100px #050d06 inset;
    -webkit-text-fill-color: var(--crema);
    caret-color: var(--crema);
  }

  .login-input-icon {
    position: absolute; left: 14px; top: 50%;
    transform: translateY(-50%);
    width: 16px; height: 16px;
    color: var(--tenue);
    transition: color 0.3s;
    pointer-events: none;
  }
  .login-input:focus ~ .login-input-icon-ref,
  .login-input-wrap:focus-within .login-input-icon {
    color: var(--caña);
  }

  .login-toggle-pass {
    position: absolute; right: 14px; top: 50%;
    transform: translateY(-50%);
    background: none; border: none;
    color: var(--tenue);
    cursor: pointer;
    padding: 4px;
    transition: color 0.25s;
    display: flex;
  }
  .login-toggle-pass:hover { color: var(--caña); }

  /* Nombre fields (registro) */
  .login-name-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }

  /* Remember + Forgot */
  .login-options {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 24px;
    margin-top: -6px;
  }

  .login-remember {
    display: flex; align-items: center; gap: 8px;
    cursor: pointer;
    font-size: 0.7rem;
    color: var(--opaco);
    transition: color 0.25s;
  }
  .login-remember:hover { color: var(--crema-soft); }
  .login-remember input {
    appearance: none; -webkit-appearance: none;
    width: 14px; height: 14px;
    border: 1px solid var(--tenue);
    background: rgba(4,11,6,0.5);
    cursor: pointer;
    position: relative;
    transition: all 0.25s;
  }
  .login-remember input:checked {
    border-color: var(--caña);
    background: var(--caña);
  }
  .login-remember input:checked::after {
    content: '✓';
    position: absolute; inset: 0;
    display: flex; align-items: center; justify-content: center;
    font-size: 10px;
    color: var(--verde-deep);
    font-weight: 700;
  }

  .login-forgot {
    font-size: 0.58rem;
    letter-spacing: 2px;
    color: var(--naranja-cali);
    text-transform: uppercase;
    cursor: pointer;
    background: none;
    border: none;
    font-family: 'DM Sans', sans-serif;
    transition: color 0.25s;
    padding: 0;
  }
  .login-forgot:hover { color: var(--naranja-warm); }

  /* Error */
  .login-error {
    background: rgba(192,57,43,0.08);
    border: 1px solid rgba(192,57,43,0.2);
    border-left: 3px solid var(--rojo-salsa);
    padding: 12px 16px;
    margin-bottom: 20px;
    font-size: 0.75rem;
    color: #e07060;
    letter-spacing: 0.3px;
    line-height: 1.5;
    display: flex; align-items: center; gap: 10px;
    animation: shakeError 0.4s ease-in-out;
  }
  @keyframes shakeError {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-6px); }
    40% { transform: translateX(6px); }
    60% { transform: translateX(-4px); }
    80% { transform: translateX(4px); }
  }
  .login-error-icon {
    width: 18px; height: 18px; flex-shrink: 0;
    color: var(--rojo-salsa);
  }

  /* Botón principal */
  .login-btn {
    width: 100%;
    padding: 17px;
    background: linear-gradient(135deg, var(--naranja-cali), var(--caña), var(--naranja-warm));
    background-size: 200% 200%;
    border: none;
    color: var(--verde-deep);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.6rem;
    font-weight: 600;
    letter-spacing: 4.5px;
    text-transform: uppercase;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
    display: flex; align-items: center; justify-content: center; gap: 10px;
    animation: gradientShift 4s ease-in-out infinite;
  }
  @keyframes gradientShift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  .login-btn::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(90deg,
      transparent 0%,
      rgba(255,255,255,0.2) 50%,
      transparent 100%);
    transform: translateX(-101%);
    transition: transform 0.5s;
  }
  .login-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow:
      0 8px 24px rgba(232,98,26,0.3),
      0 2px 8px rgba(232,160,32,0.2);
  }
  .login-btn:hover:not(:disabled)::before { transform: translateX(101%); }
  .login-btn:active:not(:disabled) { transform: translateY(0); }
  .login-btn:disabled { opacity: 0.6; cursor: not-allowed; animation: none; }

  .login-btn-icon {
    width: 16px; height: 16px;
    transition: transform 0.3s;
  }
  .login-btn:hover:not(:disabled) .login-btn-icon {
    transform: translateX(4px);
  }

  /* Spinner */
  .login-spinner {
    width: 18px; height: 18px;
    border: 2px solid rgba(4,11,6,0.3);
    border-top-color: var(--verde-deep);
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* Separador */
  .login-sep {
    display: flex; align-items: center; gap: 16px;
    margin: 26px 0 20px;
  }
  .login-sep-line {
    flex: 1; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(45,92,53,0.3), transparent);
  }
  .login-sep-text {
    font-size: 0.52rem; letter-spacing: 4px;
    color: var(--tenue); text-transform: uppercase;
  }

  /* Botón secundario */
  .login-register-btn {
    width: 100%;
    padding: 15px;
    background: rgba(45,139,58,0.04);
    border: 1px solid rgba(45,139,58,0.2);
    color: var(--opaco);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.58rem;
    font-weight: 400;
    letter-spacing: 3px;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.3s;
    display: flex; align-items: center; justify-content: center; gap: 8px;
  }
  .login-register-btn:hover {
    border-color: var(--naranja-cali);
    color: var(--naranja-warm);
    background: rgba(232,98,26,0.04);
  }

  /* Social buttons */
  .login-social {
    display: flex; gap: 12px;
    margin-bottom: 20px;
  }
  .login-social-btn {
    flex: 1;
    padding: 12px;
    background: rgba(4,11,6,0.5);
    border: 1px solid rgba(45,92,53,0.2);
    color: var(--opaco);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.55rem;
    letter-spacing: 1.5px;
    cursor: pointer;
    transition: all 0.25s;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    text-transform: uppercase;
  }
  .login-social-btn:hover {
    border-color: rgba(232,160,32,0.2);
    color: var(--crema);
  }
  .login-social-icon { width: 16px; height: 16px; }

  /* ===== FOOTER ===== */
  .login-footer {
    padding: 16px 48px;
    border-top: 1px solid rgba(15,40,20,0.3);
    display: flex; flex-direction: column;
    align-items: center; gap: 8px;
  }
  .login-footer-top {
    display: flex; align-items: center; gap: 12px;
  }
  .login-footer-line {
    width: 24px; height: 1px;
    background: linear-gradient(90deg, transparent, var(--linea-dorada), transparent);
  }
  .login-footer-text {
    font-size: 0.5rem; letter-spacing: 3.5px;
    color: rgba(45,92,53,0.35); text-transform: uppercase;
  }
  .login-footer-cali {
    display: flex; align-items: center; gap: 6px;
    font-size: 0.46rem; letter-spacing: 2px;
    color: rgba(122,170,128,0.25);
  }
  .login-footer-dot {
    width: 3px; height: 3px;
    background: var(--naranja-cali);
    border-radius: 50%;
    opacity: 0.3;
  }

  /* ===== REGISTER VIEW ===== */
  .login-register-body {
    padding: 28px 48px 36px;
    animation: fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both;
  }

  .login-terms {
    font-size: 0.65rem;
    color: var(--tenue);
    line-height: 1.8;
    margin-top: 16px;
    text-align: center;
  }
  .login-terms a {
    color: var(--caña);
    text-decoration: none;
    border-bottom: 1px solid rgba(232,160,32,0.2);
    transition: border-color 0.25s;
  }
  .login-terms a:hover { border-color: var(--caña); }

  /* ===== PASSWORD STRENGTH ===== */
  .login-strength {
    display: flex; gap: 4px;
    margin-top: 8px;
  }
  .login-strength-bar {
    flex: 1; height: 2px;
    background: rgba(45,92,53,0.2);
    transition: background 0.3s;
  }
  .login-strength-bar.weak { background: var(--rojo-salsa); }
  .login-strength-bar.medium { background: var(--caña); }
  .login-strength-bar.strong { background: var(--verde-caña); }

  .login-strength-text {
    font-size: 0.55rem;
    margin-top: 4px;
    letter-spacing: 1px;
  }
  .login-strength-text.weak { color: var(--rojo-salsa); }
  .login-strength-text.medium { color: var(--caña); }
  .login-strength-text.strong { color: var(--verde-caña); }

  /* ===== SUCCESS ANIMATION ===== */
  .login-success-overlay {
    position: absolute; inset: 0; z-index: 10;
    background: rgba(4,11,6,0.95);
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    gap: 16px;
    animation: fadeIn 0.4s ease both;
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .login-success-check {
    width: 60px; height: 60px;
    border: 2px solid var(--verde-caña);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    animation: scaleIn 0.5s cubic-bezier(0.22,1,0.36,1) 0.2s both;
  }
  @keyframes scaleIn {
    from { transform: scale(0); }
    to { transform: scale(1); }
  }
  .login-success-text {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.3rem;
    font-style: italic;
    color: var(--crema);
    animation: fadeUp 0.6s ease 0.4s both;
  }
  .login-success-sub {
    font-size: 0.7rem;
    color: var(--opaco);
    animation: fadeUp 0.6s ease 0.6s both;
  }

  @media (max-width: 500px) {
    .login-header { padding: 32px 24px 24px; }
    .login-body, .login-register-body { padding: 24px 24px 32px; }
    .login-footer { padding: 14px 24px; }
    .login-logo { font-size: 2rem; letter-spacing: 8px; }
    .login-title { font-size: 1.5rem; }
    .login-cana-left, .login-cana-right { opacity: 0.3; }
    .login-name-row { grid-template-columns: 1fr; gap: 0; }
  }
`

// ===== SVG COMPONENTS =====

// Cañas de azúcar izquierda
const CanaLeft = () => (
  <svg viewBox="0 0 200 500" xmlns="http://www.w3.org/2000/svg" className="login-cana-left" width="140" height="500">
    {/* Caña 1 */}
    <path d="M60 500 Q58 420 62 340 Q65 280 60 200 Q57 140 62 60" stroke="#2d6b38" strokeWidth="4" fill="none" opacity="0.4"/>
    {/* Nudos */}
    <ellipse cx="61" cy="360" rx="6" ry="3" fill="#2d8b3a" opacity="0.3"/>
    <ellipse cx="61" cy="280" rx="6" ry="3" fill="#2d8b3a" opacity="0.3"/>
    <ellipse cx="61" cy="200" rx="6" ry="3" fill="#2d8b3a" opacity="0.3"/>
    {/* Hojas */}
    <path d="M62 340 Q90 310 120 290" stroke="#1a5c2a" strokeWidth="2" fill="none" opacity="0.3"/>
    <path d="M62 340 Q95 320 130 310" stroke="#1a5c2a" strokeWidth="1.5" fill="none" opacity="0.2"/>
    <path d="M60 260 Q30 230 10 200" stroke="#1a5c2a" strokeWidth="2" fill="none" opacity="0.3"/>
    <path d="M62 200 Q90 170 120 155" stroke="#1a5c2a" strokeWidth="1.8" fill="none" opacity="0.25"/>
    <path d="M60 140 Q28 110 8 80" stroke="#1a5c2a" strokeWidth="1.5" fill="none" opacity="0.2"/>
    {/* Hojas llenas */}
    <ellipse cx="120" cy="288" rx="30" ry="5" fill="#1a5c2a" opacity="0.12" transform="rotate(-20 120 288)"/>
    <ellipse cx="10" cy="198" rx="28" ry="4" fill="#1a5c2a" opacity="0.1" transform="rotate(22 10 198)"/>

    {/* Caña 2 */}
    <path d="M30 500 Q28 440 32 370 Q34 310 30 230 Q28 170 32 100" stroke="#2d6b38" strokeWidth="3" fill="none" opacity="0.25"/>
    <path d="M32 370 Q58 345 85 330" stroke="#1a5c2a" strokeWidth="1.5" fill="none" opacity="0.2"/>
    <path d="M30 280 Q5 255 -10 235" stroke="#1a5c2a" strokeWidth="1.5" fill="none" opacity="0.2"/>

    {/* Orquídeas en la caña */}
    <g opacity="0.5">
      {/* Orquídea 1 */}
      <ellipse cx="62" cy="120" rx="14" ry="7" fill="#c0392b" opacity="0.4" transform="rotate(-8 62 120)"/>
      <ellipse cx="50" cy="127" rx="11" ry="5.5" fill="#e74c3c" opacity="0.35" transform="rotate(-35 50 127)"/>
      <ellipse cx="74" cy="125" rx="11" ry="5.5" fill="#e74c3c" opacity="0.35" transform="rotate(25 74 125)"/>
      <ellipse cx="62" cy="132" rx="10" ry="6" fill="#c0392b" opacity="0.3" transform="rotate(5 62 132)"/>
      <circle cx="62" cy="122" r="4.5" fill="#e8a020" opacity="0.7"/>
      <circle cx="62" cy="122" r="2" fill="#f5c84a" opacity="0.9"/>

      {/* Orquídea 2 pequeña */}
      <ellipse cx="30" cy="230" rx="10" ry="5" fill="#c0392b" opacity="0.35" transform="rotate(12 30 230)"/>
      <ellipse cx="21" cy="236" rx="8" ry="4" fill="#e74c3c" opacity="0.3" transform="rotate(-30 21 236)"/>
      <ellipse cx="39" cy="234" rx="8" ry="4" fill="#e74c3c" opacity="0.3" transform="rotate(30 39 234)"/>
      <circle cx="30" cy="232" r="3.5" fill="#e8a020" opacity="0.6"/>
      <circle cx="30" cy="232" r="1.5" fill="#f5c84a" opacity="0.8"/>
    </g>
  </svg>
)

// Cañas de azúcar derecha
const CanaRight = () => (
  <svg viewBox="0 0 180 480" xmlns="http://www.w3.org/2000/svg" className="login-cana-right" width="120" height="480">
    <path d="M120 480 Q122 400 118 320 Q115 260 120 170 Q123 110 118 40" stroke="#2d6b38" strokeWidth="3.5" fill="none" opacity="0.35"/>
    <ellipse cx="119" cy="340" rx="5" ry="2.5" fill="#2d8b3a" opacity="0.25"/>
    <ellipse cx="119" cy="260" rx="5" ry="2.5" fill="#2d8b3a" opacity="0.25"/>
    <ellipse cx="119" cy="170" rx="5" ry="2.5" fill="#2d8b3a" opacity="0.25"/>
    <path d="M118 310 Q90 280 70 260" stroke="#1a5c2a" strokeWidth="1.8" fill="none" opacity="0.25"/>
    <path d="M120 230 Q148 200 170 185" stroke="#1a5c2a" strokeWidth="1.8" fill="none" opacity="0.25"/>
    <path d="M118 150 Q88 120 68 100" stroke="#1a5c2a" strokeWidth="1.5" fill="none" opacity="0.2"/>
    <path d="M120 90 Q148 60 168 40" stroke="#1a5c2a" strokeWidth="1.5" fill="none" opacity="0.2"/>

    <ellipse cx="68" cy="258" rx="26" ry="4" fill="#1a5c2a" opacity="0.1" transform="rotate(24 68 258)"/>
    <ellipse cx="170" cy="183" rx="24" ry="4" fill="#1a5c2a" opacity="0.08" transform="rotate(-18 170 183)"/>

    {/* Caña 2 */}
    <path d="M150 480 Q152 420 148 350 Q146 290 150 210 Q152 150 148 80" stroke="#2d6b38" strokeWidth="2.5" fill="none" opacity="0.2"/>
    <path d="M148 350 Q125 325 105 310" stroke="#1a5c2a" strokeWidth="1.3" fill="none" opacity="0.15"/>

    {/* Orquídea */}
    <g opacity="0.45">
      <ellipse cx="118" cy="90" rx="13" ry="6" fill="#c0392b" opacity="0.4" transform="rotate(6 118 90)"/>
      <ellipse cx="107" cy="96" rx="10" ry="5" fill="#e74c3c" opacity="0.35" transform="rotate(-32 107 96)"/>
      <ellipse cx="129" cy="94" rx="10" ry="5" fill="#e74c3c" opacity="0.35" transform="rotate(28 129 94)"/>
      <circle cx="118" cy="92" r="4" fill="#e8a020" opacity="0.65"/>
      <circle cx="118" cy="92" r="1.8" fill="#f5c84a" opacity="0.85"/>
    </g>
  </svg>
)

// Montañas de Cali (Farallones)
const Mountains = () => (
  <svg viewBox="0 0 1200 200" xmlns="http://www.w3.org/2000/svg" className="login-mountains" preserveAspectRatio="none" width="100%" height="200">
    {/* Farallones de Cali - capa trasera */}
    <path d="M0 200 L0 140 Q100 60 200 100 Q280 40 360 80 Q420 20 500 70 Q560 30 640 65 Q720 15 800 55 Q880 25 960 60 Q1040 35 1100 75 Q1150 50 1200 90 L1200 200 Z"
      fill="#0a1f0e" opacity="0.8"/>
    {/* Capa frontal */}
    <path d="M0 200 L0 160 Q120 100 250 135 Q350 80 450 120 Q520 70 620 110 Q700 65 800 105 Q900 75 1000 110 Q1080 85 1200 120 L1200 200 Z"
      fill="#061209" opacity="0.6"/>
    {/* Cristo Rey silueta */}
    <g transform="translate(580, 20)" opacity="0.5">
      <rect x="-2" y="0" width="4" height="35" fill="#0a1f0e"/>
      <rect x="-15" y="5" width="30" height="3" fill="#0a1f0e"/>
      <ellipse cx="0" cy="-2" rx="4" ry="5" fill="#0a1f0e"/>
    </g>
  </svg>
)

// Particles component
const Particles = () => {
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 10,
    color: i % 3 === 0 ? '#e8a020' : i % 3 === 1 ? '#e8621a' : '#2d8b3a',
    opacity: Math.random() * 0.3 + 0.1,
  }))

  return (
    <div className="login-particles">
      {particles.map(p => (
        <div
          key={p.id}
          className="login-particle"
          style={{
            left: p.left,
            bottom: '-10px',
            width: p.size,
            height: p.size,
            background: p.color,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  )
}

// SVG Icons
const EmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="M22 7l-10 6L2 7"/>
  </svg>
)

const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2"/>
    <path d="M7 11V7a5 5 0 0110 0v4"/>
  </svg>
)

const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
)

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
  </svg>
)

const EyeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
)

const EyeOffIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
)

const ArrowIcon = () => (
  <svg className="login-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
)

const CheckIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2d8b3a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

const ErrorIcon = () => (
  <svg className="login-error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="15" y1="9" x2="9" y2="15"/>
    <line x1="9" y1="9" x2="15" y2="15"/>
  </svg>
)

// Logo icon - Orquídea estilizada
const LogoIcon = () => (
  <svg className="login-logo-icon" width="44" height="44" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="orchidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#e8a020"/>
        <stop offset="50%" stopColor="#e8621a"/>
        <stop offset="100%" stopColor="#c0392b"/>
      </linearGradient>
      <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2d8b3a"/>
        <stop offset="100%" stopColor="#1a5c2a"/>
      </linearGradient>
    </defs>
    {/* Hojas */}
    <ellipse cx="20" cy="42" rx="16" ry="5" fill="url(#leafGrad)" opacity="0.4" transform="rotate(-30 20 42)"/>
    <ellipse cx="40" cy="42" rx="16" ry="5" fill="url(#leafGrad)" opacity="0.4" transform="rotate(30 40 42)"/>
    {/* Pétalos */}
    <ellipse cx="30" cy="18" rx="12" ry="7" fill="url(#orchidGrad)" opacity="0.6" transform="rotate(-5 30 18)"/>
    <ellipse cx="18" cy="26" rx="10" ry="5.5" fill="url(#orchidGrad)" opacity="0.5" transform="rotate(-40 18 26)"/>
    <ellipse cx="42" cy="25" rx="10" ry="5.5" fill="url(#orchidGrad)" opacity="0.5" transform="rotate(35 42 25)"/>
    <ellipse cx="22" cy="34" rx="9" ry="5" fill="url(#orchidGrad)" opacity="0.4" transform="rotate(-20 22 34)"/>
    <ellipse cx="38" cy="34" rx="9" ry="5" fill="url(#orchidGrad)" opacity="0.4" transform="rotate(20 38 34)"/>
    {/* Centro */}
    <circle cx="30" cy="24" r="6" fill="#e8a020" opacity="0.85"/>
    <circle cx="30" cy="24" r="3" fill="#f5c84a" opacity="1"/>
    <circle cx="30" cy="24" r="1.2" fill="#fff" opacity="0.7"/>
  </svg>
)

export default function Login() {
  const [tab, setTab] = useState("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPass, setShowPass] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  // Register fields
  const [regNombre, setRegNombre] = useState("")
  const [regApellido, setRegApellido] = useState("")
  const [regEmail, setRegEmail] = useState("")
  const [regTelefono, setRegTelefono] = useState("")
  const [regPassword, setRegPassword] = useState("")
  const [regConfirm, setRegConfirm] = useState("")
  const [showRegPass, setShowRegPass] = useState(false)
  const [regLoading, setRegLoading] = useState(false)
  const [regError, setRegError] = useState("")
  const [regSuccess, setRegSuccess] = useState(false)

  const navigate = useNavigate()

  const getPasswordStrength = (pass) => {
    if (!pass) return { level: 0, text: "", class: "" }
    let score = 0
    if (pass.length >= 6) score++
    if (pass.length >= 10) score++
    if (/[A-Z]/.test(pass)) score++
    if (/[0-9]/.test(pass)) score++
    if (/[^A-Za-z0-9]/.test(pass)) score++
    if (score <= 2) return { level: score, text: "Débil", class: "weak" }
    if (score <= 3) return { level: score, text: "Media", class: "medium" }
    return { level: score, text: "Fuerte", class: "strong" }
  }

  const passwordStrength = getPasswordStrength(regPassword)

  const handleLogin = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const res = await api.post("/auth/login", { email, password })
      localStorage.setItem("token", res.data.token)
      localStorage.setItem("usuario", JSON.stringify(res.data.usuario))
      setSuccess(true)
      setTimeout(() => {
        if (res.data.usuario.rol === "admin") {
          navigate("/admin")
        } else {
          navigate("/home")
        }
      }, 1500)
    } catch (err) {
      setError(err.response?.data?.error || "Correo o contraseña incorrectos")
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setRegError("")

    if (regPassword !== regConfirm) {
      setRegError("Las contraseñas no coinciden")
      return
    }
    if (regPassword.length < 6) {
      setRegError("La contraseña debe tener al menos 6 caracteres")
      return
    }

    setRegLoading(true)
    try {
      await api.post("/auth/register", {
        nombre: regNombre,
        apellido: regApellido,
        email: regEmail,
        telefono: regTelefono,
        password: regPassword,
      })
      setRegSuccess(true)
      setTimeout(() => {
        setTab("login")
        setEmail(regEmail)
        setRegSuccess(false)
        setRegNombre("")
        setRegApellido("")
        setRegEmail("")
        setRegTelefono("")
        setRegPassword("")
        setRegConfirm("")
      }, 2000)
    } catch (err) {
      setRegError(err.response?.data?.error || "Error al crear la cuenta")
    } finally {
      setRegLoading(false)
    }
  }

  const caliQuotes = [
    "La sucursal del cielo",
    "Donde la salsa se vive",
    "Cali es Cali, lo demás es loma",
    "Capital mundial de la salsa",
  ]
  const [quote] = useState(caliQuotes[Math.floor(Math.random() * caliQuotes.length)])

  return (
    <>
      <style>{styles}</style>
      <div className="login-root">
        <div className="login-watermark">CALI</div>
        <div className="login-glow1" />
        <div className="login-glow2" />
        <div className="login-glow3" />
        <Particles />
        <CanaLeft />
        <CanaRight />
        <Mountains />

        <div className="login-card">
          {/* Success overlay */}
          {(success || regSuccess) && (
            <div className="login-success-overlay">
              <div className="login-success-check">
                <CheckIcon />
              </div>
              <span className="login-success-text">
                {success ? "¡Bienvenido de vuelta!" : "¡Cuenta creada!"}
              </span>
              <span className="login-success-sub">
                {success ? "Redirigiendo..." : "Ahora inicia sesión"}
              </span>
            </div>
          )}

          {/* Header */}
          <div className="login-header">
            <div className="login-brand">
              <LogoIcon />
              <span className="login-logo">La Maison</span>
              <span className="login-logo-sub">Cali · Alta Cocina Caleña</span>
            </div>
            <div className="login-divider">
              <div className="login-divider-line" />
              <div className="login-divider-icon">
                <div className="login-divider-diamond" />
                <div className="login-divider-diamond center" />
                <div className="login-divider-diamond" />
              </div>
              <div className="login-divider-line" />
            </div>
            <div className="login-welcome">
              <h1 className="login-title">
                {tab === "login"
                  ? <>Bienvenido a la <span className="login-title-accent">Sucursal del Cielo</span></>
                  : <>Únete a la <span className="login-title-accent">experiencia caleña</span></>
                }
              </h1>
              <p className="login-subtitle">
                {tab === "login"
                  ? <>Inicia sesión para vivir la experiencia en <span className="login-subtitle-cali">🌴 Santiago de Cali</span></>
                  : <>Crea tu cuenta y descubre los sabores del <span className="login-subtitle-cali">🍽️ Valle del Cauca</span></>
                }
              </p>
              <p className="login-quote">{quote}</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="login-tabs">
            <button
              className={`login-tab ${tab === "login" ? "active" : "inactive"}`}
              onClick={() => { setTab("login"); setError(""); setRegError(""); }}
            >
              Iniciar sesión
            </button>
            <button
              className={`login-tab ${tab === "register" ? "active" : "inactive"}`}
              onClick={() => { setTab("register"); setError(""); setRegError(""); }}
            >
              Registrarse
            </button>
          </div>

          {/* ===== LOGIN FORM ===== */}
          {tab === "login" && (
            <div className="login-body">
              <form onSubmit={handleLogin}>
                <div className="login-field">
                  <label className="login-label">
                    Correo electrónico
                  </label>
                  <div className="login-input-wrap">
                    <input
                      className="login-input"
                      type="email"
                      placeholder="correo@ejemplo.com"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                    <div className="login-input-icon">
                      <EmailIcon />
                    </div>
                  </div>
                </div>

                <div className="login-field">
                  <label className="login-label">
                    Contraseña
                  </label>
                  <div className="login-input-wrap">
                    <input
                      className="login-input"
                      type={showPass ? "text" : "password"}
                      placeholder="••••••••"
                      required
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                    <div className="login-input-icon">
                      <LockIcon />
                    </div>
                    <button
                      type="button"
                      className="login-toggle-pass"
                      onClick={() => setShowPass(!showPass)}
                      tabIndex={-1}
                    >
                      {showPass ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                  </div>
                </div>

                <div className="login-options">
                  <label className="login-remember">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={e => setRememberMe(e.target.checked)}
                    />
                    Recordarme
                  </label>
                  <button type="button" className="login-forgot">
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>

                {error && (
                  <div className="login-error">
                    <ErrorIcon />
                    {error}
                  </div>
                )}

                <button className="login-btn" type="submit" disabled={loading}>
                  {loading
                    ? <><div className="login-spinner" /> Verificando...</>
                    : <>Entrar <ArrowIcon /></>
                  }
                </button>
              </form>

              <div className="login-sep">
                <div className="login-sep-line" />
                <span className="login-sep-text">o continúa con</span>
                <div className="login-sep-line" />
              </div>

              <div className="login-social">
                <button className="login-social-btn" type="button">
                  <svg className="login-social-icon" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </button>
                <button className="login-social-btn" type="button">
                  <svg className="login-social-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/>
                  </svg>
                  Facebook
                </button>
              </div>

              <button className="login-register-btn" onClick={() => { setTab("register"); setError(""); }}>
                Crear cuenta nueva
              </button>
            </div>
          )}

          {/* ===== REGISTER FORM ===== */}
          {tab === "register" && (
            <div className="login-register-body">
              <form onSubmit={handleRegister}>
                <div className="login-name-row">
                  <div className="login-field">
                    <label className="login-label">Nombre</label>
                    <div className="login-input-wrap">
                      <input
                        className="login-input"
                        type="text"
                        placeholder="Juan"
                        required
                        value={regNombre}
                        onChange={e => setRegNombre(e.target.value)}
                      />
                      <div className="login-input-icon">
                        <UserIcon />
                      </div>
                    </div>
                  </div>
                  <div className="login-field">
                    <label className="login-label">Apellido</label>
                    <div className="login-input-wrap">
                      <input
                        className="login-input"
                        type="text"
                        placeholder="López"
                        required
                        value={regApellido}
                        onChange={e => setRegApellido(e.target.value)}
                      />
                      <div className="login-input-icon">
                        <UserIcon />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="login-field">
                  <label className="login-label">Correo electrónico</label>
                  <div className="login-input-wrap">
                    <input
                      className="login-input"
                      type="email"
                      placeholder="correo@ejemplo.com"
                      required
                      value={regEmail}
                      onChange={e => setRegEmail(e.target.value)}
                    />
                    <div className="login-input-icon">
                      <EmailIcon />
                    </div>
                  </div>
                </div>

                <div className="login-field">
                  <label className="login-label">Teléfono</label>
                  <div className="login-input-wrap">
                    <input
                      className="login-input"
                      type="tel"
                      placeholder="+57 300 123 4567"
                      value={regTelefono}
                      onChange={e => setRegTelefono(e.target.value)}
                    />
                    <div className="login-input-icon">
                      <PhoneIcon />
                    </div>
                  </div>
                </div>

                <div className="login-field">
                  <label className="login-label">Contraseña</label>
                  <div className="login-input-wrap">
                    <input
                      className="login-input"
                      type={showRegPass ? "text" : "password"}
                      placeholder="Mínimo 6 caracteres"
                      required
                      value={regPassword}
                      onChange={e => setRegPassword(e.target.value)}
                    />
                    <div className="login-input-icon">
                      <LockIcon />
                    </div>
                    <button
                      type="button"
                      className="login-toggle-pass"
                      onClick={() => setShowRegPass(!showRegPass)}
                      tabIndex={-1}
                    >
                      {showRegPass ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                  </div>
                  {regPassword && (
                    <>
                      <div className="login-strength">
                        {[1, 2, 3, 4, 5].map(i => (
                          <div
                            key={i}
                            className={`login-strength-bar ${i <= passwordStrength.level ? passwordStrength.class : ''}`}
                          />
                        ))}
                      </div>
                      <span className={`login-strength-text ${passwordStrength.class}`}>
                        {passwordStrength.text}
                      </span>
                    </>
                  )}
                </div>

                <div className="login-field">
                  <label className="login-label">Confirmar contraseña</label>
                  <div className="login-input-wrap">
                    <input
                      className="login-input"
                      type="password"
                      placeholder="Repite tu contraseña"
                      required
                      value={regConfirm}
                      onChange={e => setRegConfirm(e.target.value)}
                      style={
                        regConfirm && regConfirm !== regPassword
                          ? { borderBottomColor: '#c0392b' }
                          : regConfirm && regConfirm === regPassword
                            ? { borderBottomColor: '#2d8b3a' }
                            : {}
                      }
                    />
                    <div className="login-input-icon">
                      <LockIcon />
                    </div>
                  </div>
                </div>

                {regError && (
                  <div className="login-error">
                    <ErrorIcon />
                    {regError}
                  </div>
                )}

                <button className="login-btn" type="submit" disabled={regLoading}>
                  {regLoading
                    ? <><div className="login-spinner" /> Creando cuenta...</>
                    : <>Crear cuenta <ArrowIcon /></>
                  }
                </button>

                <p className="login-terms">
                  Al registrarte aceptas nuestros{" "}
                  <a href="#terms">términos y condiciones</a>{" "}
                  y nuestra{" "}
                  <a href="#privacy">política de privacidad</a>
                </p>
              </form>

              <div className="login-sep">
                <div className="login-sep-line" />
                <span className="login-sep-text">ya tienes cuenta</span>
                <div className="login-sep-line" />
              </div>

              <button className="login-register-btn" onClick={() => { setTab("login"); setRegError(""); }}>
                Iniciar sesión
              </button>
            </div>
          )}

          {/* Footer */}
          <div className="login-footer">
            <div className="login-footer-top">
              <div className="login-footer-line" />
              <span className="login-footer-text">Santiago de Cali · 2025</span>
              <div className="login-footer-line" />
            </div>
            <div className="login-footer-cali">
              <span>Valle del Cauca</span>
              <div className="login-footer-dot" />
              <span>Colombia</span>
              <div className="login-footer-dot" />
              <span>🇨🇴</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}