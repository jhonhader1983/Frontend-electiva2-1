import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/axios"

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&family=Bebas+Neue&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html, body, #root { height: 100%; margin: 0; padding: 0; }

  :root {
    --verde-cali:    #1a5c2a;
    --verde-caña:    #2d8b3a;
    --verde-deep:    #0a1f0e;
    --naranja-cali:  #e8621a;
    --naranja-warm:  #ff9a3c;
    --rojo-salsa:    #c0392b;
    --caña:          #e8a020;
    --caña-light:    #f5c84a;
    --crema:         #fdf6e8;
    --opaco:         #7aaa80;
    --tenue:         #2d5c35;
  }

  .auth-split {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    font-family: 'DM Sans', sans-serif;
    background: #040b06;
    overflow: hidden;
  }

  /* ===== PANEL IZQUIERDO ===== */
  .auth-left {
    position: relative;
    background:
      radial-gradient(ellipse 80% 60% at 30% 30%, rgba(232,98,26,0.18) 0%, transparent 60%),
      radial-gradient(ellipse 60% 50% at 70% 80%, rgba(45,139,58,0.22) 0%, transparent 60%),
      linear-gradient(135deg, #0a1f0e 0%, #1a5c2a 50%, #0a1f0e 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 40px;
    overflow: hidden;
    color: var(--crema);
  }

  .auth-left::before {
    content: '';
    position: absolute; inset: 0;
    background-image: repeating-linear-gradient(
      90deg, transparent, transparent 80px,
      rgba(232,160,32,0.025) 80px, rgba(232,160,32,0.025) 81px
    );
    pointer-events: none;
  }

  .auth-watermark {
    position: absolute;
    left: 50%; top: 50%;
    transform: translate(-50%, -50%);
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(140px, 22vw, 280px);
    color: transparent;
    -webkit-text-stroke: 1px rgba(232,160,32,0.07);
    letter-spacing: 18px;
    pointer-events: none;
    user-select: none;
  }

  .auth-left-content {
    position: relative; z-index: 2;
    text-align: center;
    max-width: 420px;
  }

  .auth-left-icon {
    margin-bottom: 24px;
    animation: fadeUp 1s ease both;
    display: flex; justify-content: center;
  }

  .auth-brand-name {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 3.5rem;
    letter-spacing: 16px;
    line-height: 1;
    margin-bottom: 6px;
    background: linear-gradient(135deg, #f5c84a, #e8a020, #ff9a3c);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: fadeUp 1s ease 0.2s both;
  }
  .auth-brand-tagline {
    font-size: 0.6rem;
    letter-spacing: 8px;
    color: var(--opaco);
    text-transform: uppercase;
    margin-bottom: 36px;
    animation: fadeUp 1s ease 0.3s both;
  }

  .auth-divider-left {
    display: flex; align-items: center; gap: 14px;
    justify-content: center; margin-bottom: 28px;
    animation: fadeUp 1s ease 0.4s both;
  }
  .auth-div-line {
    width: 60px; height: 1px;
    background: linear-gradient(90deg, transparent, var(--caña), transparent);
  }
  .auth-div-dot {
    width: 6px; height: 6px;
    background: var(--caña);
    transform: rotate(45deg);
  }

  .auth-headline {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.9rem;
    font-weight: 300;
    font-style: italic;
    line-height: 1.3;
    margin-bottom: 16px;
    animation: fadeUp 1s ease 0.5s both;
  }
  .auth-headline-accent {
    color: var(--naranja-warm);
    font-weight: 500;
  }

  .auth-tagline-cali {
    font-size: 0.85rem;
    color: var(--opaco);
    line-height: 1.7;
    margin-bottom: 36px;
    animation: fadeUp 1s ease 0.6s both;
  }

  .auth-features {
    display: flex; flex-direction: column;
    gap: 14px;
    animation: fadeUp 1s ease 0.7s both;
  }
  .auth-feature {
    display: flex; align-items: center; gap: 14px;
    padding: 12px 18px;
    background: rgba(0,0,0,0.25);
    border: 1px solid rgba(232,160,32,0.1);
    border-left: 2px solid var(--caña);
    text-align: left;
  }
  .auth-feature-icon {
    width: 28px; height: 28px;
    flex-shrink: 0;
    color: var(--caña);
  }
  .auth-feature-text {
    font-size: 0.72rem;
    color: var(--crema);
    line-height: 1.4;
  }
  .auth-feature-text strong {
    display: block;
    color: var(--caña);
    font-size: 0.68rem;
    letter-spacing: 1px;
    margin-bottom: 2px;
    font-weight: 600;
  }

  .auth-left-footer {
    position: absolute;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    z-index: 2;
  }
  .auth-left-footer-text {
    font-size: 0.58rem;
    letter-spacing: 4px;
    color: rgba(122,170,128,0.5);
    text-transform: uppercase;
    margin-bottom: 4px;
  }
  .auth-left-footer-sub {
    font-size: 0.52rem;
    letter-spacing: 2px;
    color: rgba(122,170,128,0.3);
  }

  .auth-deco-cana {
    position: absolute;
    pointer-events: none;
    opacity: 0.4;
  }
  .auth-deco-cana.left { left: -20px; bottom: 0; }
  .auth-deco-cana.right { right: -20px; top: 0; transform: rotate(180deg); }

  /* ===== PANEL DERECHO ===== */
  .auth-right {
    position: relative;
    background:
      radial-gradient(ellipse 70% 50% at 50% 30%, rgba(15,40,20,0.6) 0%, transparent 70%),
      linear-gradient(180deg, #050d07 0%, #040b06 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px 40px;
    overflow-y: auto;
  }

  .auth-right::-webkit-scrollbar { width: 6px; }
  .auth-right::-webkit-scrollbar-track { background: transparent; }
  .auth-right::-webkit-scrollbar-thumb {
    background: rgba(232,160,32,0.2);
    border-radius: 3px;
  }

  .auth-right::before {
    content: '';
    position: absolute; inset: 0;
    background-image: repeating-linear-gradient(
      0deg, transparent, transparent 3px,
      rgba(255,255,255,0.005) 3px, rgba(255,255,255,0.005) 4px
    );
    pointer-events: none;
  }

  .auth-form-wrap {
    position: relative; z-index: 2;
    width: 100%;
    max-width: 400px;
    animation: fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) both;
    padding: 20px 0;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .auth-form-header {
    text-align: center;
    margin-bottom: 28px;
  }

  .auth-form-divider {
    display: flex; align-items: center; gap: 12px;
    justify-content: center; margin-bottom: 16px;
  }
  .auth-form-div-line {
    width: 30px; height: 1px;
    background: rgba(232,160,32,0.2);
  }
  .auth-form-div-dot {
    width: 4px; height: 4px;
    border: 1px solid var(--caña);
    transform: rotate(45deg);
  }

  .auth-form-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.7rem;
    font-weight: 300;
    font-style: italic;
    color: var(--crema);
    margin-bottom: 8px;
    line-height: 1.2;
  }
  .auth-form-subtitle {
    font-size: 0.72rem;
    color: var(--opaco);
    letter-spacing: 0.5px;
    line-height: 1.6;
  }

  .auth-tabs {
    display: flex;
    border-bottom: 1px solid rgba(45,92,53,0.3);
    margin-bottom: 24px;
  }
  .auth-tab {
    flex: 1; padding: 12px 8px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.58rem; letter-spacing: 3px; text-transform: uppercase;
    background: none; border: none; cursor: pointer;
    transition: color 0.25s;
    position: relative;
    color: var(--tenue);
  }
  .auth-tab.active { color: var(--caña); }
  .auth-tab.active::after {
    content: ''; position: absolute; bottom: -1px; left: 20%; right: 20%;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--caña), var(--naranja-cali), var(--caña), transparent);
  }
  .auth-tab:hover:not(.active) { color: var(--opaco); }

  .auth-field { margin-bottom: 16px; position: relative; }

  .auth-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .auth-label {
    display: block;
    font-size: 0.54rem;
    letter-spacing: 3px;
    color: var(--opaco);
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  .auth-input-wrap { position: relative; }

  .auth-input {
    width: 100%;
    padding: 13px 16px 13px 42px;
    background: rgba(4, 11, 6, 0.6);
    border: 1px solid rgba(45,92,53,0.25);
    border-bottom: 2px solid rgba(45,92,53,0.3);
    color: var(--crema);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.85rem;
    font-weight: 300;
    outline: none;
    transition: all 0.3s;
    border-radius: 0;
  }
  .auth-input::placeholder { color: rgba(45,92,53,0.4); }
  .auth-input:focus {
    border-color: rgba(232,160,32,0.2);
    border-bottom-color: var(--naranja-cali);
    background: rgba(4,11,6,0.85);
  }
  .auth-input:-webkit-autofill,
  .auth-input:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0 100px #050d06 inset;
    -webkit-text-fill-color: var(--crema);
    caret-color: var(--crema);
  }

  .auth-input-icon {
    position: absolute; left: 14px; top: 50%;
    transform: translateY(-50%);
    width: 16px; height: 16px;
    color: var(--tenue);
    pointer-events: none;
  }
  .auth-input-wrap:focus-within .auth-input-icon { color: var(--caña); }

  .auth-toggle-pass {
    position: absolute; right: 14px; top: 50%;
    transform: translateY(-50%);
    background: none; border: none;
    color: var(--tenue);
    cursor: pointer;
    padding: 4px;
    display: flex;
    transition: color 0.25s;
  }
  .auth-toggle-pass:hover { color: var(--caña); }

  .auth-options {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 20px;
  }
  .auth-remember {
    display: flex; align-items: center; gap: 8px;
    cursor: pointer;
    font-size: 0.7rem;
    color: var(--opaco);
  }
  .auth-remember input {
    appearance: none; -webkit-appearance: none;
    width: 14px; height: 14px;
    border: 1px solid var(--tenue);
    background: rgba(4,11,6,0.5);
    cursor: pointer;
    position: relative;
  }
  .auth-remember input:checked {
    border-color: var(--caña);
    background: var(--caña);
  }
  .auth-remember input:checked::after {
    content: '✓';
    position: absolute; inset: 0;
    display: flex; align-items: center; justify-content: center;
    font-size: 10px;
    color: var(--verde-deep);
    font-weight: 700;
  }
  .auth-forgot {
    font-size: 0.58rem;
    letter-spacing: 2px;
    color: var(--naranja-cali);
    text-transform: uppercase;
    cursor: pointer;
    background: none; border: none;
    font-family: 'DM Sans', sans-serif;
    transition: color 0.25s;
  }
  .auth-forgot:hover { color: var(--naranja-warm); }

  .auth-error {
    background: rgba(192,57,43,0.08);
    border: 1px solid rgba(192,57,43,0.2);
    border-left: 3px solid var(--rojo-salsa);
    padding: 12px 16px;
    margin-bottom: 18px;
    font-size: 0.75rem;
    color: #e07060;
    line-height: 1.5;
    display: flex; align-items: center; gap: 10px;
    animation: shake 0.4s;
  }

  .auth-success {
    background: rgba(45,139,58,0.1);
    border: 1px solid rgba(45,139,58,0.3);
    border-left: 3px solid var(--verde-caña);
    padding: 12px 16px;
    margin-bottom: 18px;
    font-size: 0.75rem;
    color: #7aaa80;
    line-height: 1.5;
    display: flex; align-items: center; gap: 10px;
    animation: fadeUp 0.4s;
  }

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-6px); }
    75% { transform: translateX(6px); }
  }

  .auth-btn {
    width: 100%;
    padding: 15px;
    background: linear-gradient(135deg, var(--naranja-cali), var(--caña), var(--naranja-warm));
    background-size: 200% 200%;
    border: none;
    color: var(--verde-deep);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.6rem;
    font-weight: 600;
    letter-spacing: 4px;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.3s;
    display: flex; align-items: center; justify-content: center; gap: 10px;
    animation: gradient 4s ease infinite;
  }
  @keyframes gradient {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  .auth-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(232,98,26,0.3);
  }
  .auth-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  .auth-spinner {
    width: 16px; height: 16px;
    border: 2px solid rgba(4,11,6,0.3);
    border-top-color: var(--verde-deep);
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  .auth-sep {
    display: flex; align-items: center; gap: 14px;
    margin: 18px 0 14px;
  }
  .auth-sep-line {
    flex: 1; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(45,92,53,0.3), transparent);
  }
  .auth-sep-text {
    font-size: 0.5rem; letter-spacing: 3px;
    color: var(--tenue); text-transform: uppercase;
  }

  .auth-switch-btn {
    width: 100%;
    padding: 12px;
    background: rgba(45,139,58,0.04);
    border: 1px solid rgba(45,139,58,0.2);
    color: var(--opaco);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.56rem;
    letter-spacing: 3px;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.3s;
  }
  .auth-switch-btn:hover {
    border-color: var(--naranja-cali);
    color: var(--naranja-warm);
  }

  /* Password strength */
  .auth-strength {
    display: flex; gap: 4px;
    margin-top: 8px;
  }
  .auth-strength-bar {
    flex: 1; height: 2px;
    background: rgba(45,92,53,0.2);
    transition: background 0.3s;
  }
  .auth-strength-bar.weak { background: var(--rojo-salsa); }
  .auth-strength-bar.medium { background: var(--caña); }
  .auth-strength-bar.strong { background: var(--verde-caña); }
  .auth-strength-text {
    font-size: 0.55rem;
    margin-top: 4px;
    letter-spacing: 1px;
  }
  .auth-strength-text.weak { color: var(--rojo-salsa); }
  .auth-strength-text.medium { color: var(--caña); }
  .auth-strength-text.strong { color: var(--verde-caña); }

  .auth-terms {
    font-size: 0.65rem;
    color: var(--tenue);
    line-height: 1.6;
    margin-top: 14px;
    text-align: center;
  }
  .auth-terms a {
    color: var(--caña);
    text-decoration: none;
    border-bottom: 1px solid rgba(232,160,32,0.2);
  }

  @media (max-width: 900px) {
    .auth-split { grid-template-columns: 1fr; }
    .auth-left { display: none; }
  }
`

// SVGs
const CanaDeco = ({ side }) => (
  <svg className={`auth-deco-cana ${side}`} viewBox="0 0 150 400" width="120" height="400">
    <path d="M75 400 Q72 320 78 240 Q82 180 75 100 Q70 50 78 0" stroke="#2d8b3a" strokeWidth="3" fill="none" opacity="0.5"/>
    <ellipse cx="76" cy="280" rx="5" ry="2.5" fill="#2d8b3a" opacity="0.4"/>
    <ellipse cx="76" cy="200" rx="5" ry="2.5" fill="#2d8b3a" opacity="0.4"/>
    <ellipse cx="76" cy="120" rx="5" ry="2.5" fill="#2d8b3a" opacity="0.4"/>
    <path d="M78 240 Q105 215 130 200" stroke="#1a5c2a" strokeWidth="1.5" fill="none" opacity="0.3"/>
    <path d="M75 160 Q48 135 25 120" stroke="#1a5c2a" strokeWidth="1.5" fill="none" opacity="0.3"/>
    <path d="M78 80 Q105 55 128 38" stroke="#1a5c2a" strokeWidth="1.3" fill="none" opacity="0.25"/>
    <ellipse cx="78" cy="60" rx="14" ry="7" fill="#c0392b" opacity="0.5" transform="rotate(-8 78 60)"/>
    <ellipse cx="65" cy="68" rx="11" ry="5.5" fill="#e74c3c" opacity="0.4" transform="rotate(-35 65 68)"/>
    <ellipse cx="91" cy="66" rx="11" ry="5.5" fill="#e74c3c" opacity="0.4" transform="rotate(28 91 66)"/>
    <circle cx="78" cy="62" r="5" fill="#e8a020" opacity="0.85"/>
    <circle cx="78" cy="62" r="2.2" fill="#f5c84a" opacity="1"/>
  </svg>
)

const LogoIcon = () => (
  <svg width="60" height="60" viewBox="0 0 60 60">
    <defs>
      <linearGradient id="orchidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f5c84a"/>
        <stop offset="50%" stopColor="#e8a020"/>
        <stop offset="100%" stopColor="#e8621a"/>
      </linearGradient>
    </defs>
    <ellipse cx="30" cy="20" rx="14" ry="8" fill="url(#orchidGrad)" opacity="0.7" transform="rotate(-5 30 20)"/>
    <ellipse cx="18" cy="28" rx="11" ry="6" fill="url(#orchidGrad)" opacity="0.55" transform="rotate(-40 18 28)"/>
    <ellipse cx="42" cy="27" rx="11" ry="6" fill="url(#orchidGrad)" opacity="0.55" transform="rotate(35 42 27)"/>
    <ellipse cx="22" cy="36" rx="9" ry="5" fill="url(#orchidGrad)" opacity="0.45" transform="rotate(-20 22 36)"/>
    <ellipse cx="38" cy="36" rx="9" ry="5" fill="url(#orchidGrad)" opacity="0.45" transform="rotate(20 38 36)"/>
    <circle cx="30" cy="26" r="6" fill="#e8a020"/>
    <circle cx="30" cy="26" r="3" fill="#f5c84a"/>
    <circle cx="30" cy="26" r="1.2" fill="#fff" opacity="0.7"/>
  </svg>
)

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 6L2 7"/>
  </svg>
)
const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
  </svg>
)
const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
)
const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
  </svg>
)
const EyeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
)
const EyeOffIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
)
const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)
const ErrorIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}>
    <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
  </svg>
)
const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}>
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)
const SalsaIcon = () => (
  <svg className="auth-feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
  </svg>
)
const FoodIcon = () => (
  <svg className="auth-feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 11l18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 11-5.8-1.6"/>
  </svg>
)
const MountainIcon = () => (
  <svg className="auth-feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 3l4 8 5-5 5 15H2L8 3z"/>
  </svg>
)

export default function AuthPage() {
  const [tab, setTab] = useState("login")
  const navigate = useNavigate()

  // ===== LOGIN STATE =====
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPass, setShowPass] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // ===== REGISTER STATE =====
  const [regNombre, setRegNombre] = useState("")
  const [regApellido, setRegApellido] = useState("")
  const [regEmail, setRegEmail] = useState("")
  const [regTelefono, setRegTelefono] = useState("")
  const [regPassword, setRegPassword] = useState("")
  const [regConfirm, setRegConfirm] = useState("")
  const [showRegPass, setShowRegPass] = useState(false)
  const [regLoading, setRegLoading] = useState(false)
  const [regError, setRegError] = useState("")
  const [regSuccess, setRegSuccess] = useState("")

  // ===== FORGOT PASSWORD STATE =====
  const [resetEmail, setResetEmail] = useState("")
  const [resetCode, setResetCode] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [resetLoading, setResetLoading] = useState(false)
  const [resetError, setResetError] = useState("")
  const [resetSuccess, setResetSuccess] = useState("")

  // ===== HANDLERS =====
  const handleLogin = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const res = await api.post("/auth/login", { email, password })
      localStorage.setItem("token", res.data.token)
      localStorage.setItem("usuario", JSON.stringify(res.data.usuario))
      if (res.data.usuario.rol === "admin") {
        navigate("/admin")
      } else {
        navigate("/home")
      }
    } catch (err) {
      setError(err.response?.data?.error || "Correo o contraseña incorrectos")
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setRegError("")
    setRegSuccess("")

    // Validaciones
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
      // Ajusta los nombres de campos según tu backend
      const payload = {
        nombre: regNombre,
        apellido: regApellido,
        email: regEmail,
        telefono: regTelefono,
        password: regPassword,
      }

      const res = await api.post("/auth/register", payload)

      setRegSuccess("¡Cuenta creada exitosamente! Ya puedes iniciar sesión.")

      // Si el backend devuelve token directamente, hacer login automático
      if (res.data?.token && res.data?.usuario) {
        localStorage.setItem("token", res.data.token)
        localStorage.setItem("usuario", JSON.stringify(res.data.usuario))
        setTimeout(() => {
          if (res.data.usuario.rol === "admin") {
            navigate("/admin")
          } else {
            navigate("/home")
          }
        }, 1500)
      } else {
        // Si no, cambiar a tab de login con el email pre-llenado
        setTimeout(() => {
          setEmail(regEmail)
          setTab("login")
          setRegSuccess("")
          // Limpiar campos
          setRegNombre("")
          setRegApellido("")
          setRegEmail("")
          setRegTelefono("")
          setRegPassword("")
          setRegConfirm("")
        }, 2000)
      }
    } catch (err) {
      console.error("Error registro:", err.response?.data)
      setRegError(
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Error al crear la cuenta. Verifica los datos."
      )
    } finally {
      setRegLoading(false)
    }
  }

  // Password strength
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

  const handleForgotPassword = async (e) => {
    e.preventDefault()
    setResetError("")
    setResetSuccess("")
    setResetLoading(true)
    try {
      const res = await api.post("/auth/forgot-password", { email: resetEmail })
      setResetSuccess("Código enviado a tu correo. Revisa tu bandeja de entrada.")
      setTimeout(() => {
        setTab("verify")
        setResetSuccess("")
      }, 2000)
    } catch (err) {
      setResetError(err.response?.data?.error || "Error al solicitar el código")
    } finally {
      setResetLoading(false)
    }
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()
    setResetError("")
    setResetSuccess("")
    setResetLoading(true)
    try {
      await api.post("/auth/reset-password", { email: resetEmail, code: resetCode, newPassword })
      setResetSuccess("Contraseña actualizada exitosamente.")
      setTimeout(() => {
        setTab("login")
        setResetSuccess("")
        setResetEmail("")
        setResetCode("")
        setNewPassword("")
      }, 2000)
    } catch (err) {
      setResetError(err.response?.data?.error || "Código inválido o error al actualizar")
    } finally {
      setResetLoading(false)
    }
  }

  const strength = getPasswordStrength(regPassword)

  return (
    <>
      <style>{styles}</style>
      <div className="auth-split">
        {/* ===== PANEL IZQUIERDO ===== */}
        <div className="auth-left">
          <div className="auth-watermark">CALI</div>
          <CanaDeco side="left" />
          <CanaDeco side="right" />

          <div className="auth-left-content">
            <div className="auth-left-icon">
              <LogoIcon />
            </div>
            <h1 className="auth-brand-name">LA MAISON</h1>
            <p className="auth-brand-tagline">Restaurant · Cali</p>

            <div className="auth-divider-left">
              <div className="auth-div-line" />
              <div className="auth-div-dot" />
              <div className="auth-div-line" />
            </div>

            <h2 className="auth-headline">
              Sabores del <span className="auth-headline-accent">Valle del Cauca</span> en cada plato
            </h2>
            <p className="auth-tagline-cali">
              Una experiencia única donde la alta cocina se encuentra con la calidez caleña
            </p>

            <div className="auth-features">
              <div className="auth-feature">
                <SalsaIcon />
                <div className="auth-feature-text">
                  <strong>Sucursal del Cielo</strong>
                  Capital mundial de la salsa
                </div>
              </div>
              <div className="auth-feature">
                <FoodIcon />
                <div className="auth-feature-text">
                  <strong>Cocina del Pacífico</strong>
                  Sabores tradicionales del Valle
                </div>
              </div>
              <div className="auth-feature">
                <MountainIcon />
                <div className="auth-feature-text">
                  <strong>Vista a los Farallones</strong>
                  Experiencia gastronómica única
                </div>
              </div>
            </div>
          </div>

          <div className="auth-left-footer">
            <div className="auth-left-footer-text">Santiago de Cali</div>
            <div className="auth-left-footer-sub">Valle del Cauca · Colombia 🇨🇴</div>
          </div>
        </div>

        {/* ===== PANEL DERECHO ===== */}
        <div className="auth-right">
          <div className="auth-form-wrap">
            <div className="auth-form-header">
              <div className="auth-form-divider">
                <div className="auth-form-div-line" />
                <div className="auth-form-div-dot" />
                <div className="auth-form-div-line" />
              </div>
              <h2 className="auth-form-title">
                {tab === "login" ? "Bienvenido de vuelta" : "Crea tu cuenta"}
              </h2>
              <p className="auth-form-subtitle">
                {tab === "login"
                  ? "Inicia sesión para continuar tu experiencia"
                  : "Únete y descubre los sabores caleños"}
              </p>
            </div>

            <div className="auth-tabs">
              <button
                className={`auth-tab ${tab === "login" ? "active" : ""}`}
                onClick={() => { setTab("login"); setError(""); setRegError(""); setRegSuccess(""); }}
              >
                Iniciar sesión
              </button>
              <button
                className={`auth-tab ${tab === "register" ? "active" : ""}`}
                onClick={() => { setTab("register"); setError(""); setRegError(""); setRegSuccess(""); }}
              >
                Registrarse
              </button>
            </div>

            {/* ===== FORMULARIO LOGIN ===== */}
            {tab === "login" && (
              <>
                <form onSubmit={handleLogin}>
                  <div className="auth-field">
                    <label className="auth-label">Correo electrónico</label>
                    <div className="auth-input-wrap">
                      <input
                        className="auth-input"
                        type="email"
                        placeholder="correo@ejemplo.com"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                      />
                      <div className="auth-input-icon"><EmailIcon /></div>
                    </div>
                  </div>

                  <div className="auth-field">
                    <label className="auth-label">Contraseña</label>
                    <div className="auth-input-wrap">
                      <input
                        className="auth-input"
                        type={showPass ? "text" : "password"}
                        placeholder="••••••••"
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                      />
                      <div className="auth-input-icon"><LockIcon /></div>
                      <button
                        type="button"
                        className="auth-toggle-pass"
                        onClick={() => setShowPass(!showPass)}
                        tabIndex={-1}
                      >
                        {showPass ? <EyeOffIcon /> : <EyeIcon />}
                      </button>
                    </div>
                  </div>

                  <div className="auth-options">
                    <label className="auth-remember">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={e => setRememberMe(e.target.checked)}
                      />
                      Recordarme
                    </label>
                    <button type="button" className="auth-forgot" onClick={() => { setTab("forgot"); setError(""); setResetError(""); setResetSuccess(""); }}>
                      ¿Olvidaste tu contraseña?
                    </button>
                  </div>

                  {error && (
                    <div className="auth-error">
                      <ErrorIcon />
                      {error}
                    </div>
                  )}

                  <button className="auth-btn" type="submit" disabled={loading}>
                    {loading
                      ? <><div className="auth-spinner" /> Verificando...</>
                      : <>Entrar <ArrowIcon /></>
                    }
                  </button>
                </form>

                <div className="auth-sep">
                  <div className="auth-sep-line" />
                  <span className="auth-sep-text">¿no tienes cuenta?</span>
                  <div className="auth-sep-line" />
                </div>

                <button
                  className="auth-switch-btn"
                  onClick={() => { setTab("register"); setError(""); }}
                >
                  Crear cuenta nueva
                </button>
              </>
            )}

            {/* ===== FORMULARIO REGISTRO ===== */}
            {tab === "register" && (
              <>
                <form onSubmit={handleRegister}>
                  <div className="auth-row">
                    <div className="auth-field">
                      <label className="auth-label">Nombre</label>
                      <div className="auth-input-wrap">
                        <input
                          className="auth-input"
                          type="text"
                          placeholder="Juan"
                          required
                          value={regNombre}
                          onChange={e => setRegNombre(e.target.value)}
                        />
                        <div className="auth-input-icon"><UserIcon /></div>
                      </div>
                    </div>
                    <div className="auth-field">
                      <label className="auth-label">Apellido</label>
                      <div className="auth-input-wrap">
                        <input
                          className="auth-input"
                          type="text"
                          placeholder="López"
                          required
                          value={regApellido}
                          onChange={e => setRegApellido(e.target.value)}
                        />
                        <div className="auth-input-icon"><UserIcon /></div>
                      </div>
                    </div>
                  </div>

                  <div className="auth-field">
                    <label className="auth-label">Correo electrónico</label>
                    <div className="auth-input-wrap">
                      <input
                        className="auth-input"
                        type="email"
                        placeholder="correo@ejemplo.com"
                        required
                        value={regEmail}
                        onChange={e => setRegEmail(e.target.value)}
                      />
                      <div className="auth-input-icon"><EmailIcon /></div>
                    </div>
                  </div>

                  <div className="auth-field">
                    <label className="auth-label">Teléfono (opcional)</label>
                    <div className="auth-input-wrap">
                      <input
                        className="auth-input"
                        type="tel"
                        placeholder="+57 300 123 4567"
                        value={regTelefono}
                        onChange={e => setRegTelefono(e.target.value)}
                      />
                      <div className="auth-input-icon"><PhoneIcon /></div>
                    </div>
                  </div>

                  <div className="auth-field">
                    <label className="auth-label">Contraseña</label>
                    <div className="auth-input-wrap">
                      <input
                        className="auth-input"
                        type={showRegPass ? "text" : "password"}
                        placeholder="Mínimo 6 caracteres"
                        required
                        value={regPassword}
                        onChange={e => setRegPassword(e.target.value)}
                      />
                      <div className="auth-input-icon"><LockIcon /></div>
                      <button
                        type="button"
                        className="auth-toggle-pass"
                        onClick={() => setShowRegPass(!showRegPass)}
                        tabIndex={-1}
                      >
                        {showRegPass ? <EyeOffIcon /> : <EyeIcon />}
                      </button>
                    </div>
                    {regPassword && (
                      <>
                        <div className="auth-strength">
                          {[1,2,3,4,5].map(i => (
                            <div
                              key={i}
                              className={`auth-strength-bar ${i <= strength.level ? strength.class : ''}`}
                            />
                          ))}
                        </div>
                        <span className={`auth-strength-text ${strength.class}`}>
                          Seguridad: {strength.text}
                        </span>
                      </>
                    )}
                  </div>

                  <div className="auth-field">
                    <label className="auth-label">Confirmar contraseña</label>
                    <div className="auth-input-wrap">
                      <input
                        className="auth-input"
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
                      <div className="auth-input-icon"><LockIcon /></div>
                    </div>
                  </div>

                  {regError && (
                    <div className="auth-error">
                      <ErrorIcon />
                      {regError}
                    </div>
                  )}

                  {regSuccess && (
                    <div className="auth-success">
                      <CheckIcon />
                      {regSuccess}
                    </div>
                  )}

                  <button className="auth-btn" type="submit" disabled={regLoading}>
                    {regLoading
                      ? <><div className="auth-spinner" /> Creando cuenta...</>
                      : <>Crear cuenta <ArrowIcon /></>
                    }
                  </button>

                  <p className="auth-terms">
                    Al registrarte aceptas nuestros{" "}
                    <a href="#terms">términos</a> y{" "}
                    <a href="#privacy">política de privacidad</a>
                  </p>
                </form>

                <div className="auth-sep">
                  <div className="auth-sep-line" />
                  <span className="auth-sep-text">¿ya tienes cuenta?</span>
                  <div className="auth-sep-line" />
                </div>

                <button
                  className="auth-switch-btn"
                  onClick={() => { setTab("login"); setRegError(""); setRegSuccess(""); }}
                >
                  Iniciar sesión
                </button>
              </>
            )}

            {/* ===== FORMULARIO RECUPERAR CONTRASEÑA ===== */}
            {tab === "forgot" && (
              <>
                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ color: 'var(--crema)', fontSize: '0.9rem', marginBottom: '8px' }}>Recuperar Contraseña</h3>
                  <p style={{ color: 'var(--tenue)', fontSize: '0.7rem' }}>Ingresa tu correo y te enviaremos un código de verificación.</p>
                </div>
                <form onSubmit={handleForgotPassword}>
                  <div className="auth-field">
                    <label className="auth-label">Correo electrónico</label>
                    <div className="auth-input-wrap">
                      <input
                        className="auth-input"
                        type="email"
                        placeholder="correo@ejemplo.com"
                        required
                        value={resetEmail}
                        onChange={e => setResetEmail(e.target.value)}
                      />
                      <div className="auth-input-icon"><EmailIcon /></div>
                    </div>
                  </div>

                  {resetError && (
                    <div className="auth-error">
                      <ErrorIcon />
                      {resetError}
                    </div>
                  )}

                  {resetSuccess && (
                    <div className="auth-success">
                      <CheckIcon />
                      {resetSuccess}
                    </div>
                  )}

                  <button className="auth-btn" type="submit" disabled={resetLoading}>
                    {resetLoading
                      ? <><div className="auth-spinner" /> Enviando...</>
                      : <>Enviar código <ArrowIcon /></>
                    }
                  </button>
                </form>

                <div className="auth-sep">
                  <div className="auth-sep-line" />
                </div>
                <button
                  className="auth-switch-btn"
                  onClick={() => { setTab("login"); setResetError(""); setResetSuccess(""); }}
                >
                  Volver al inicio de sesión
                </button>
              </>
            )}

            {/* ===== FORMULARIO VERIFICAR CÓDIGO ===== */}
            {tab === "verify" && (
              <>
                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ color: 'var(--crema)', fontSize: '0.9rem', marginBottom: '8px' }}>Nueva Contraseña</h3>
                  <p style={{ color: 'var(--tenue)', fontSize: '0.7rem' }}>Ingresa el código que enviamos a tu correo y tu nueva contraseña.</p>
                </div>
                <form onSubmit={handleResetPassword}>
                  <div className="auth-field">
                    <label className="auth-label">Código de verificación</label>
                    <div className="auth-input-wrap">
                      <input
                        className="auth-input"
                        type="text"
                        placeholder="123456"
                        required
                        value={resetCode}
                        onChange={e => setResetCode(e.target.value)}
                      />
                      <div className="auth-input-icon"><LockIcon /></div>
                    </div>
                  </div>
                  
                  <div className="auth-field">
                    <label className="auth-label">Nueva Contraseña</label>
                    <div className="auth-input-wrap">
                      <input
                        className="auth-input"
                        type="password"
                        placeholder="••••••••"
                        required
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                      />
                      <div className="auth-input-icon"><LockIcon /></div>
                    </div>
                  </div>

                  {resetError && (
                    <div className="auth-error">
                      <ErrorIcon />
                      {resetError}
                    </div>
                  )}

                  {resetSuccess && (
                    <div className="auth-success">
                      <CheckIcon />
                      {resetSuccess}
                    </div>
                  )}

                  <button className="auth-btn" type="submit" disabled={resetLoading}>
                    {resetLoading
                      ? <><div className="auth-spinner" /> Verificando...</>
                      : <>Cambiar contraseña <ArrowIcon /></>
                    }
                  </button>
                </form>

                <div className="auth-sep">
                  <div className="auth-sep-line" />
                </div>
                <button
                  className="auth-switch-btn"
                  onClick={() => { setTab("login"); setResetError(""); setResetSuccess(""); }}
                >
                  Cancelar
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}