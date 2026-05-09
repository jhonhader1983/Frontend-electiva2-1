import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import PerfilModal from "../components/PerfilModal"
import api from "../api/axios"

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500&family=Bebas+Neue&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --verde:        #071209;
    --verde-deep:   #040b06;
    --verde-mid:    #0f2814;
    --verde-light:  #2d6b38;
    --caña:         #e8a020;
    --caña-light:   #f5c04a;
    --caña-line:    rgba(232,160,32,0.18);
    --rojo:         #c0392b;
    --naranja:      #e8621a;
    --crema:        #fdf6e8;
    --opaco:        #7aaa80;
    --tenue:        #2d5c35;
  }

  html { scroll-behavior: smooth; }
  body { background: var(--verde-deep); }

  .app { min-height: 100vh; background: var(--verde-deep); color: var(--crema); font-family: 'DM Sans', sans-serif; font-weight: 300; overflow-x: hidden; }

  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 900;
    height: 72px; padding: 0 56px;
    display: flex; align-items: center; justify-content: space-between;
    transition: background 0.5s, border-color 0.5s;
    border-bottom: 1px solid transparent;
  }
  .nav.scrolled {
    background: rgba(4,11,6,0.97);
    backdrop-filter: blur(22px) saturate(1.5);
    border-color: var(--caña-line);
  }
  .nav-logo { display: flex; flex-direction: column; line-height: 1; text-decoration: none; cursor: pointer; }
  .nav-logo-main { font-family: 'Bebas Neue', sans-serif; font-size: 1.95rem; letter-spacing: 6px; color: var(--caña); line-height: 1; }
  .nav-logo-sub { font-size: 0.5rem; letter-spacing: 8px; color: var(--opaco); text-transform: uppercase; margin-top: 3px; }
  .nav-center { position: absolute; left: 50%; transform: translateX(-50%); display: flex; gap: 32px; align-items: center; }
  .nav-link { font-size: 0.63rem; letter-spacing: 3.5px; text-transform: uppercase; color: var(--opaco); text-decoration: none; cursor: pointer; transition: color 0.25s; background: none; border: none; font-family: 'DM Sans', sans-serif; font-weight: 400; position: relative; }
  .nav-link:hover { color: var(--caña-light); }

  .nav-link-pedidos {
    display: flex; align-items: center; gap: 6px;
    color: var(--caña);
    position: relative;
  }
  .nav-link-pedidos::before {
    content: '';
    position: absolute;
    left: -10px; top: 50%;
    transform: translateY(-50%);
    width: 4px; height: 4px;
    background: var(--caña);
    border-radius: 50%;
    box-shadow: 0 0 8px var(--caña);
    animation: pulseDot 2s ease-in-out infinite;
  }
  @keyframes pulseDot {
    0%, 100% { opacity: 1; transform: translateY(-50%) scale(1); }
    50% { opacity: 0.5; transform: translateY(-50%) scale(1.3); }
  }

  .nav-right { display: flex; align-items: center; gap: 6px; }
  .nav-greeting { font-size: 0.6rem; letter-spacing: 2px; color: var(--tenue); text-transform: uppercase; margin-right: 8px; }
  .nav-btn { background: none; border: none; color: var(--opaco); padding: 8px 14px; cursor: pointer; font-family: 'DM Sans', sans-serif; font-size: 0.6rem; letter-spacing: 2.5px; text-transform: uppercase; transition: color 0.25s; }
  .nav-btn:hover { color: var(--crema); }
  .nav-btn-order { border: 1px solid var(--caña-line); color: var(--caña); padding: 9px 22px; position: relative; overflow: hidden; transition: color 0.3s, border-color 0.3s; }
  .nav-btn-order::before { content: ''; position: absolute; inset: 0; background: var(--caña); transform: translateX(-101%); transition: transform 0.32s cubic-bezier(0.4,0,0.2,1); }
  .nav-btn-order:hover { color: var(--verde-deep); border-color: var(--caña); }
  .nav-btn-order:hover::before { transform: translateX(0); }
  .nav-btn-order span { position: relative; z-index: 1; }
  .cart-badge { position: absolute; top: -6px; right: -6px; background: var(--rojo); color: #fff; width: 17px; height: 17px; border-radius: 50%; font-size: 0.58rem; font-weight: 500; display: flex; align-items: center; justify-content: center; }

  .hero {
    position: relative;
    height: 100vh;
    min-height: 720px;
    display: flex;
    align-items: flex-end;
    overflow: hidden;
  }

  .hero-bg {
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse 80% 70% at 60% 40%, #0e2e14 0%, transparent 65%),
      radial-gradient(ellipse 50% 50% at 15% 80%, rgba(232,98,26,0.12) 0%, transparent 55%),
      radial-gradient(ellipse 40% 40% at 85% 20%, rgba(232,160,32,0.08) 0%, transparent 50%),
      linear-gradient(180deg, #030b04 0%, #061009 35%, #081510 65%, #040b06 100%);
  }

  .hero-texture {
    position: absolute; inset: 0;
    background-image: repeating-linear-gradient(
      0deg, transparent, transparent 2px,
      rgba(255,255,255,0.008) 2px, rgba(255,255,255,0.008) 4px
    );
    pointer-events: none;
  }

  .hero-vline { position: absolute; right: 22%; top: 0; bottom: 0; width: 1px; background: linear-gradient(to bottom, transparent, rgba(232,160,32,0.15) 30%, rgba(232,160,32,0.15) 70%, transparent); pointer-events: none; }
  .hero-hline { position: absolute; left: 0; right: 0; bottom: 40%; height: 1px; background: linear-gradient(to right, transparent, rgba(232,160,32,0.1) 15%, rgba(232,160,32,0.1) 85%, transparent); pointer-events: none; }

  .hero-watermark {
    position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(110px, 18vw, 220px);
    color: transparent;
    -webkit-text-stroke: 1px rgba(232,160,32,0.038);
    letter-spacing: 18px; pointer-events: none; user-select: none; white-space: nowrap;
  }

  .hero-light1 {
    position: absolute; top: 15%; right: 18%;
    width: 320px; height: 320px; border-radius: 50%;
    background: radial-gradient(circle, rgba(232,160,32,0.07) 0%, transparent 70%);
    pointer-events: none;
    animation: pulse-light 5s ease-in-out infinite;
  }
  .hero-light2 {
    position: absolute; bottom: 20%; left: 8%;
    width: 240px; height: 240px; border-radius: 50%;
    background: radial-gradient(circle, rgba(232,98,26,0.06) 0%, transparent 70%);
    pointer-events: none;
    animation: pulse-light 7s ease-in-out infinite reverse;
  }
  @keyframes pulse-light {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(1.15); }
  }

  .hero-content {
    position: relative; z-index: 2;
    padding: 0 60px 100px;
    max-width: 860px;
    display: flex;
    flex-direction: column;
  }

  .hero-eyebrow {
    display: flex; align-items: center; gap: 14px;
    margin-bottom: 30px;
  }
  .hero-eyebrow-line { width: 32px; height: 1px; background: var(--caña); }
  .hero-eyebrow-text {
    font-size: 0.6rem; letter-spacing: 5px; color: var(--caña);
    text-transform: uppercase; font-weight: 500;
  }

  .hero-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(3.8rem, 7.5vw, 7rem);
    font-weight: 300;
    line-height: 1.0;
    color: var(--crema);
    margin-bottom: 8px;
    letter-spacing: -1px;
  }
  .hero-title-bold {
    display: block;
    font-family: 'Playfair Display', serif;
    font-weight: 900;
    font-size: clamp(4.8rem, 10vw, 9.5rem);
    background: linear-gradient(135deg, #f5c04a 0%, #e8a020 45%, #d4881a 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: 4px;
    line-height: 0.92;
    text-transform: uppercase;
  }

  .hero-desc {
    font-size: 0.88rem;
    line-height: 2.0;
    color: rgba(253,246,232,0.55);
    letter-spacing: 0.5px;
    max-width: 380px;
    margin: 28px 0 48px;
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    font-size: 1.05rem;
  }

  .hero-actions {
    display: flex; align-items: center; gap: 40px;
  }

  .hero-cta-primary {
    display: inline-flex; align-items: center; gap: 14px;
    font-size: 0.62rem; letter-spacing: 4px; text-transform: uppercase;
    color: var(--verde-deep);
    background: linear-gradient(135deg, var(--caña-light), var(--caña));
    border: none; padding: 16px 36px;
    cursor: pointer; font-family: 'DM Sans', sans-serif; font-weight: 500;
    transition: transform 0.3s, box-shadow 0.3s;
    position: relative; overflow: hidden;
  }
  .hero-cta-primary::after {
    content: ''; position: absolute; inset: 0;
    background: rgba(255,255,255,0.15);
    transform: translateX(-101%); transition: transform 0.3s;
  }
  .hero-cta-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(232,160,32,0.3); }
  .hero-cta-primary:hover::after { transform: translateX(0); }
  .hero-cta-primary .arrow { font-size: 1rem; transition: transform 0.3s; }
  .hero-cta-primary:hover .arrow { transform: translateX(5px); }

  .hero-cta {
    display: inline-flex; align-items: center; gap: 14px;
    font-size: 0.62rem; letter-spacing: 4px; text-transform: uppercase;
    color: var(--caña); cursor: pointer; background: none; border: none;
    font-family: 'DM Sans', sans-serif; transition: gap 0.3s;
  }
  .hero-cta:hover { gap: 22px; }
  .hero-cta-line { width: 38px; height: 1px; background: var(--caña); transition: width 0.3s; }
  .hero-cta:hover .hero-cta-line { width: 58px; }

  .hero-stats {
    position: absolute; right: 60px; bottom: 100px; z-index: 3;
    display: flex; flex-direction: column; gap: 24px;
    align-items: flex-end;
  }
  .hero-stat {
    text-align: right;
    border-right: 1px solid var(--caña-line);
    padding-right: 18px;
  }
  .hero-stat-num {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 2rem; color: var(--caña); letter-spacing: 2px; line-height: 1;
  }
  .hero-stat-label {
    font-size: 0.52rem; letter-spacing: 3px; color: var(--opaco);
    text-transform: uppercase; margin-top: 2px;
  }

  .hero-badge-wrap {
    position: absolute; right: calc(22% + 20px); bottom: 90px; z-index: 3;
    animation: spin-slow 20s linear infinite;
  }
  @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

  .pedido-banner {
    position: fixed;
    bottom: 24px; right: 24px;
    z-index: 800;
    background: linear-gradient(135deg, rgba(10,30,15,0.97), rgba(15,40,20,0.97));
    border: 1px solid var(--caña);
    border-left: 3px solid var(--caña);
    padding: 16px 20px;
    cursor: pointer;
    display: flex; align-items: center; gap: 14px;
    min-width: 280px;
    backdrop-filter: blur(20px);
    box-shadow: 0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(232,160,32,0.1);
    animation: slideInBanner 0.5s cubic-bezier(0.22,1,0.36,1) both;
    transition: transform 0.25s, box-shadow 0.25s;
  }
  .pedido-banner:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(232,160,32,0.3);
  }
  @keyframes slideInBanner {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .pedido-banner-icon {
    width: 36px; height: 36px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--naranja), var(--caña));
    display: flex; align-items: center; justify-content: center;
    color: var(--verde-deep);
    flex-shrink: 0;
    animation: pulseBanner 2s ease-in-out infinite;
  }
  @keyframes pulseBanner {
    0%, 100% { box-shadow: 0 0 0 0 rgba(232,160,32,0.4); }
    50% { box-shadow: 0 0 0 8px rgba(232,160,32,0); }
  }
  .pedido-banner-text { flex: 1; }
  .pedido-banner-label {
    font-size: 0.5rem;
    letter-spacing: 2px;
    color: var(--opaco);
    text-transform: uppercase;
    margin-bottom: 2px;
  }
  .pedido-banner-status {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    font-size: 0.95rem;
    color: var(--caña);
  }
  .pedido-banner-arrow {
    color: var(--caña);
    font-size: 1.2rem;
    transition: transform 0.25s;
  }
  .pedido-banner:hover .pedido-banner-arrow { transform: translateX(4px); }
  .pedido-banner-close {
    position: absolute;
    top: 6px; right: 8px;
    background: none; border: none;
    color: var(--tenue);
    cursor: pointer;
    font-size: 0.7rem;
    padding: 2px 6px;
    transition: color 0.2s;
  }
  .pedido-banner-close:hover { color: var(--rojo); }

  .band {
    background: linear-gradient(135deg, var(--caña) 0%, #d4881a 50%, var(--caña) 100%);
    padding: 0; display: flex; align-items: stretch; overflow: hidden;
    border-top: 1px solid rgba(255,255,255,0.1);
    border-bottom: 1px solid rgba(0,0,0,0.15);
  }
  .band-track {
    display: flex; gap: 0; white-space: nowrap;
    animation: marquee 28s linear infinite;
    padding: 15px 0;
  }
  @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  .band-item { display: flex; align-items: center; gap: 10px; padding: 0 24px; }
  .band-sep { font-size: 1rem; opacity: 0.4; color: var(--verde-deep); }
  .band-text { font-family: 'Bebas Neue', sans-serif; font-size: 1rem; letter-spacing: 4px; color: var(--verde-deep); text-transform: uppercase; }

  .pillars {
    display: grid; grid-template-columns: repeat(3, 1fr);
    background: #050e06;
  }
  .pillar {
    padding: 64px 52px;
    border-right: 1px solid rgba(232,160,32,0.1);
    position: relative; overflow: hidden;
    transition: background 0.4s;
  }
  .pillar:last-child { border-right: none; }
  .pillar:hover { background: rgba(15,40,20,0.4); }
  .pillar::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(to right, var(--caña), var(--naranja), transparent);
    transform: scaleX(0); transform-origin: left; transition: transform 0.5s;
  }
  .pillar:hover::before { transform: scaleX(1); }
  .pillar-num {
    font-family: 'Bebas Neue', sans-serif; font-size: 4rem;
    color: var(--caña); opacity: 0.12; line-height: 1; margin-bottom: 20px;
  }
  .pillar-icon-wrap {
    width: 52px; height: 52px; border: 1px solid var(--caña-line);
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 20px; font-size: 1.5rem;
    background: rgba(232,160,32,0.05);
    transition: border-color 0.3s, background 0.3s;
  }
  .pillar:hover .pillar-icon-wrap { border-color: rgba(232,160,32,0.4); background: rgba(232,160,32,0.1); }
  .pillar-title {
    font-family: 'Cormorant Garamond', serif; font-size: 1.25rem;
    font-weight: 400; color: var(--crema); margin-bottom: 12px; line-height: 1.2;
  }
  .pillar-text { font-size: 0.8rem; line-height: 2.0; color: var(--opaco); }

  .menu-section { padding: 100px 56px 120px; max-width: 1480px; margin: 0 auto; position: relative; }
  .section-header { margin-bottom: 64px; }
  .section-eyebrow { display: flex; align-items: center; gap: 14px; margin-bottom: 18px; }
  .section-eyebrow-line { width: 20px; height: 1px; background: var(--caña); }
  .section-eyebrow-text { font-size: 0.58rem; letter-spacing: 5px; color: var(--caña); text-transform: uppercase; }
  .section-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(2rem, 4.5vw, 3.4rem); font-weight: 300; color: var(--crema); letter-spacing: -0.3px; line-height: 1.05; }
  .section-title em { font-style: italic; color: var(--caña); }
  .section-subtitle { font-size: 0.79rem; color: var(--opaco); letter-spacing: 0.4px; line-height: 1.9; margin-top: 12px; max-width: 480px; }

  .cards-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: rgba(15,40,20,0.4); border: 1px solid rgba(15,40,20,0.4); }
  .product-card { position: relative; overflow: hidden; background: #070f08; cursor: pointer; transition: background 0.4s; display: flex; flex-direction: column; }
  .product-card:hover { background: #0b1a0c; }
  .product-card.featured { grid-row: span 2; }
  .product-card.featured .card-img-wrap { height: 390px; }
  .card-img-wrap { position: relative; overflow: hidden; height: 245px; flex-shrink: 0; }
  .card-img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.75s cubic-bezier(0.4,0,0.2,1), filter 0.5s; filter: brightness(0.7) saturate(0.85); }
  .product-card:hover .card-img-wrap img { transform: scale(1.09); filter: brightness(0.88) saturate(1.1); }
  .card-img-wrap::after { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, transparent 45%, rgba(26,100,50,0.18) 65%, transparent 80%); opacity: 0; transition: opacity 0.5s; }
  .product-card:hover .card-img-wrap::after { opacity: 1; }
  .card-gradient { position: absolute; inset: 0; background: linear-gradient(to top, rgba(5,11,6,0.94) 0%, rgba(7,18,8,0.28) 55%, transparent 100%); }
  .card-tag { position: absolute; top: 16px; left: 16px; font-size: 0.54rem; letter-spacing: 3.5px; text-transform: uppercase; color: var(--verde-deep); background: var(--caña); padding: 5px 11px; font-family: 'DM Sans', sans-serif; font-weight: 500; }
  .card-body { padding: 26px 28px 30px; flex: 1; display: flex; flex-direction: column; position: relative; }
  .card-body::before { content: ''; position: absolute; top: 0; left: 28px; right: 28px; height: 1px; background: var(--caña-line); transform: scaleX(0); transition: transform 0.45s; transform-origin: left; }
  .product-card:hover .card-body::before { transform: scaleX(1); }
  .card-name { font-family: 'Cormorant Garamond', serif; font-size: 1.3rem; font-weight: 400; color: var(--crema); margin-bottom: 8px; line-height: 1.2; transition: color 0.3s; }
  .product-card:hover .card-name { color: #fff; }
  .card-desc { font-size: 0.76rem; color: var(--opaco); line-height: 1.85; margin-bottom: 22px; flex: 1; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .card-footer { display: flex; justify-content: space-between; align-items: center; }
  .card-price { font-family: 'Cormorant Garamond', serif; font-size: 1.55rem; color: var(--caña); font-weight: 300; }
  .card-price sup { font-size: 0.78rem; color: var(--opaco); font-family: 'DM Sans', sans-serif; font-weight: 300; vertical-align: super; }
  .add-btn { background: none; border: none; color: var(--opaco); padding: 8px 0; cursor: pointer; font-family: 'DM Sans', sans-serif; font-size: 0.58rem; letter-spacing: 3px; text-transform: uppercase; display: flex; align-items: center; gap: 8px; transition: color 0.25s, gap 0.25s; position: relative; }
  .add-btn::after { content: ''; position: absolute; bottom: 4px; left: 0; right: 0; height: 1px; background: var(--caña); transform: scaleX(0); transition: transform 0.3s; transform-origin: left; }
  .add-btn:hover { color: var(--caña-light); gap: 14px; }
  .add-btn:hover::after { transform: scaleX(1); }
  .add-btn-icon { width: 18px; height: 18px; border: 1px solid currentColor; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.95rem; transition: background 0.25s, color 0.25s; flex-shrink: 0; }
  .add-btn:hover .add-btn-icon { background: var(--caña-light); color: var(--verde-deep); border-color: var(--caña-light); }
  .empty-msg { grid-column: 1/-1; text-align: center; color: var(--tenue); padding: 110px 20px; font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 1.5rem; }

  .quote-section {
    padding: 110px 56px;
    text-align: center;
    position: relative; overflow: hidden;
    background: linear-gradient(180deg, #040b06 0%, #071209 50%, #040b06 100%);
  }
  .quote-section::before {
    content: ''; position: absolute; left: 56px; right: 56px; top: 0; height: 1px;
    background: linear-gradient(to right, transparent, rgba(232,160,32,0.25), transparent);
  }
  .quote-section::after {
    content: ''; position: absolute; left: 56px; right: 56px; bottom: 0; height: 1px;
    background: linear-gradient(to right, transparent, rgba(232,160,32,0.25), transparent);
  }
  .quote-circle1 {
    position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%);
    width: 500px; height: 500px; border-radius: 50%;
    border: 1px solid rgba(232,160,32,0.06); pointer-events: none;
  }
  .quote-circle2 {
    position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%);
    width: 340px; height: 340px; border-radius: 50%;
    border: 1px solid rgba(232,160,32,0.04); pointer-events: none;
  }
  .quote-orchids { display: flex; justify-content: center; margin-bottom: 32px; }
  .quote-mark {
    font-family: 'Cormorant Garamond', serif; font-size: 7rem;
    color: var(--caña); opacity: 0.12; line-height: 0.4; display: block; margin-bottom: 30px;
  }
  .quote-text {
    font-family: 'Cormorant Garamond', serif; font-style: italic;
    font-size: clamp(1.5rem, 3vw, 2.4rem); font-weight: 300;
    color: var(--crema); line-height: 1.6;
    max-width: 740px; margin: 0 auto 28px;
  }
  .quote-text em { color: var(--caña); font-style: normal; }
  .quote-attr {
    font-size: 0.6rem; letter-spacing: 4.5px; color: var(--opaco);
    text-transform: uppercase; display: flex; align-items: center; justify-content: center; gap: 16px;
  }
  .quote-attr::before, .quote-attr::after {
    content: ''; display: inline-block; width: 24px; height: 1px; background: var(--caña); opacity: 0.4;
  }

  .cart-drawer { position: fixed; top: 0; right: 0; height: 100%; width: 400px; background: #040b06; border-left: 1px solid var(--caña-line); display: flex; flex-direction: column; z-index: 1000; transform: translateX(100%); transition: transform 0.42s cubic-bezier(0.4,0,0.2,1); }
  .cart-drawer.open { transform: translateX(0); }
  .cart-header { padding: 30px 32px 26px; border-bottom: 1px solid rgba(15,40,20,0.6); background: linear-gradient(135deg, rgba(15,40,20,0.2) 0%, transparent 60%); }
  .cart-header-top { display: flex; justify-content: space-between; align-items: flex-start; }
  .cart-eyebrow { font-size: 0.55rem; letter-spacing: 4px; color: var(--opaco); text-transform: uppercase; margin-bottom: 5px; }
  .cart-title { font-family: 'Cormorant Garamond', serif; font-size: 1.55rem; font-weight: 300; font-style: italic; color: var(--caña); }
  .close-btn { background: none; border: 1px solid rgba(45,92,53,0.7); color: var(--opaco); width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; font-size: 0.78rem; }
  .close-btn:hover { border-color: var(--caña); color: var(--caña); }
  .cart-items { flex: 1; overflow-y: auto; }
  .cart-items::-webkit-scrollbar { width: 2px; }
  .cart-items::-webkit-scrollbar-thumb { background: var(--tenue); }
  .cart-item { display: flex; justify-content: space-between; align-items: center; padding: 18px 32px; border-bottom: 1px solid rgba(20,56,28,0.4); transition: background 0.2s; }
  .cart-item:hover { background: rgba(232,160,32,0.03); }
  .cart-item-name { font-family: 'Cormorant Garamond', serif; font-size: 0.98rem; color: var(--crema); margin-bottom: 3px; }
  .cart-item-qty { font-size: 0.67rem; color: var(--tenue); letter-spacing: 1px; }
  .cart-item-right { display: flex; align-items: center; gap: 14px; }
  .cart-item-price { font-family: 'Cormorant Garamond', serif; font-size: 1rem; color: var(--caña); }
  .remove-btn { background: none; border: none; color: rgba(100,40,40,0.5); cursor: pointer; font-size: 0.7rem; transition: color 0.2s; padding: 2px; }
  .remove-btn:hover { color: #e74c3c; }
  .cart-empty { text-align: center; padding: 80px 32px; font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 1.05rem; color: var(--tenue); line-height: 1.9; }
  .cart-empty-sub { font-size: 0.68rem; color: rgba(45,92,53,0.5); font-style: normal; letter-spacing: 1px; margin-top: 8px; font-family: 'DM Sans', sans-serif; }
  .cart-footer { padding: 20px 32px 32px; border-top: 1px solid rgba(15,40,20,0.5); }
  .cart-total-row { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 20px; }
  .cart-total-label { font-size: 0.56rem; letter-spacing: 4px; color: var(--opaco); text-transform: uppercase; }
  .cart-total-val { font-family: 'Cormorant Garamond', serif; font-size: 1.9rem; color: var(--caña); font-weight: 300; }
  .wa-btn { width: 100%; padding: 15px; background: #075E54; color: white; border: none; cursor: pointer; font-family: 'DM Sans', sans-serif; font-size: 0.63rem; font-weight: 400; letter-spacing: 3px; text-transform: uppercase; display: flex; align-items: center; justify-content: center; gap: 10px; position: relative; overflow: hidden; }
  .wa-btn::before { content: ''; position: absolute; inset: 0; background: #128C7E; transform: translateX(-101%); transition: transform 0.3s; }
  .wa-btn:hover::before { transform: translateX(0); }
  .wa-btn > * { position: relative; z-index: 1; }
  .wa-btn:disabled { background: #0a1209; color: var(--tenue); cursor: not-allowed; }
  .wa-btn:disabled::before { display: none; }

  .modal-overlay { position: fixed; inset: 0; background: rgba(2,6,3,0.93); display: flex; align-items: center; justify-content: center; z-index: 2000; padding: 20px; backdrop-filter: blur(10px) saturate(0.5); }
  .modal-box { background: #070f08; border: 1px solid var(--caña-line); width: 100%; max-width: 490px; overflow: hidden; }
  .modal-header { padding: 36px 40px 26px; border-bottom: 1px solid rgba(15,40,20,0.5); background: linear-gradient(135deg, rgba(15,40,20,0.3) 0%, transparent 55%); }
  .modal-eyebrow { font-size: 0.55rem; letter-spacing: 4px; color: var(--opaco); text-transform: uppercase; margin-bottom: 7px; }
  .modal-title { font-family: 'Cormorant Garamond', serif; font-size: 1.7rem; font-style: italic; font-weight: 300; color: var(--crema); }
  .modal-total { font-family: 'Cormorant Garamond', serif; font-size: 2rem; color: var(--caña); margin-top: 3px; font-weight: 300; }
  .modal-body { padding: 30px 40px 34px; }
  .type-toggle { display: flex; gap: 0; margin-bottom: 26px; border: 1px solid rgba(15,40,20,0.8); }
  .type-btn { flex: 1; padding: 12px 8px; cursor: pointer; font-family: 'DM Sans', sans-serif; font-size: 0.62rem; letter-spacing: 2.5px; text-transform: uppercase; transition: all 0.25s; border: none; }
  .type-btn + .type-btn { border-left: 1px solid rgba(15,40,20,0.8); }
  .type-btn.active { background: rgba(15,40,20,0.4); color: var(--caña); }
  .type-btn.inactive { background: none; color: var(--tenue); }
  .type-btn:hover:not(.active) { color: var(--opaco); background: rgba(15,40,20,0.15); }
  .field-label { font-size: 0.57rem; letter-spacing: 3px; color: var(--opaco); text-transform: uppercase; display: block; margin-bottom: 10px; }
  .field-input { width: 100%; padding: 13px 16px; border: 1px solid rgba(15,40,20,0.6); border-bottom: 1px solid rgba(15,40,20,0.9); background: #040b06; color: var(--crema); font-family: 'DM Sans', sans-serif; font-size: 0.88rem; font-weight: 300; outline: none; transition: border-color 0.25s; margin-bottom: 20px; }
  .field-input:focus { border-color: rgba(232,160,32,0.35); border-bottom-color: var(--caña); }
  .field-input::placeholder { color: rgba(15,40,20,0.7); }
  .modal-actions { display: flex; gap: 0; margin-top: 4px; }
  .modal-cancel { padding: 14px 20px; background: none; border: 1px solid rgba(15,40,20,0.7); color: var(--tenue); cursor: pointer; font-family: 'DM Sans', sans-serif; font-size: 0.6rem; letter-spacing: 2.5px; text-transform: uppercase; transition: all 0.2s; }
  .modal-cancel:hover { color: var(--opaco); border-color: var(--opaco); }
  .modal-confirm { flex: 1; padding: 14px 18px; margin-left: 8px; background: #075E54; color: white; border: none; cursor: pointer; font-family: 'DM Sans', sans-serif; font-size: 0.6rem; font-weight: 400; letter-spacing: 3px; text-transform: uppercase; display: flex; align-items: center; justify-content: center; gap: 8px; position: relative; overflow: hidden; }
  .modal-confirm::before { content: ''; position: absolute; inset: 0; background: #0a7a6e; transform: translateX(-101%); transition: transform 0.3s; }
  .modal-confirm:hover::before { transform: translateX(0); }
  .modal-confirm > * { position: relative; z-index: 1; }

  .footer { padding: 56px; border-top: 1px solid var(--caña-line); display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 40px; background: rgba(4,11,6,0.8); }
  .footer-logo { font-family: 'Bebas Neue', sans-serif; font-size: 1.35rem; color: var(--tenue); letter-spacing: 5px; }
  .footer-center { text-align: center; }
  .footer-diamond { width: 7px; height: 7px; border: 1px solid var(--tenue); transform: rotate(45deg); display: inline-block; margin-bottom: 10px; }
  .footer-tagline { font-size: 0.57rem; letter-spacing: 4.5px; color: rgba(45,92,53,0.5); text-transform: uppercase; }
  .footer-right { text-align: right; font-size: 0.62rem; color: rgba(45,92,53,0.45); letter-spacing: 1px; }

  .drawer-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.65); z-index: 999; opacity: 0; pointer-events: none; transition: opacity 0.4s; backdrop-filter: blur(3px); }
  .drawer-overlay.show { opacity: 1; pointer-events: all; }

  @keyframes fadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
  .anim-up { animation: fadeUp 1s cubic-bezier(0.4,0,0.2,1) both; }
  .a1 { animation-delay: 0.1s; } .a2 { animation-delay: 0.3s; }
  .a3 { animation-delay: 0.5s; } .a4 { animation-delay: 0.72s; }
  .a5 { animation-delay: 0.88s; }

  @media (max-width: 1100px) {
    .cards-grid { grid-template-columns: repeat(2, 1fr); }
    .product-card.featured { grid-row: span 1; }
    .product-card.featured .card-img-wrap { height: 245px; }
    .pillars { grid-template-columns: 1fr; }
    .pillar { border-right: none; border-bottom: 1px solid rgba(232,160,32,0.1); }
    .pillar:last-child { border-bottom: none; }
    .nav-center { display: none; }
    .footer { grid-template-columns: 1fr 1fr; }
    .footer-center { display: none; }
    .hero-stats { display: none; }
    .hero-badge-wrap { display: none; }
  }
  @media (max-width: 700px) {
    .cards-grid { grid-template-columns: 1fr; }
    .nav { padding: 0 24px; }
    .hero-content { padding: 0 24px 80px; }
    .menu-section, .quote-section { padding-left: 24px; padding-right: 24px; }
    .pillar { padding: 44px 24px; }
    .footer { padding: 40px 24px; }
    .cart-drawer { width: 100%; }
    .nav-greeting { display: none; }
    .hero-title { font-size: 3.2rem; }
    .hero-title-bold { font-size: 4rem; }
    .pedido-banner { left: 16px; right: 16px; min-width: 0; bottom: 16px; }
  }
`

const CaliScene = () => (
  <svg
    viewBox="0 0 1440 520"
    preserveAspectRatio="xMidYMax slice"
    xmlns="http://www.w3.org/2000/svg"
    style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "68%", pointerEvents: "none" }}
  >
    <path d="M820 520 Q920 290 1010 255 Q1095 228 1175 265 Q1260 295 1440 272 L1440 520 Z" fill="#081a0a"/>
    <path d="M520 520 Q645 205 760 175 Q845 150 935 182 Q1005 204 1070 186 L1190 215 L1440 282 L1440 520 Z" fill="#0b2010"/>
    <path d="M200 520 Q335 248 455 215 Q545 190 630 218 Q698 236 762 222 Q830 210 918 244 L1020 285 L1020 520 Z" fill="#0e2813"/>
    <path d="M0 520 Q95 328 200 295 Q310 262 395 293 Q460 312 522 297 L570 293 L636 315 L660 520 Z" fill="#0a1e0d"/>
    <path d="M0 520 Q240 452 480 462 Q720 472 960 456 Q1140 444 1320 458 Q1400 463 1440 455 L1440 520 Z" fill="#070e08"/>
    <ellipse cx="808" cy="228" rx="22" ry="12" fill="#112216" opacity="0.8"/>
    <rect x="800" y="190" width="18" height="38" rx="1" fill="#163a20"/>
    <rect x="806" y="94" width="6" height="98" fill="#1e4a28"/>
    <rect x="792" y="118" width="34" height="6" rx="1" fill="#1e4a28"/>
    <ellipse cx="809" cy="88" rx="9" ry="12" fill="#1a4020"/>
    <rect x="804" y="99" width="10" height="22" fill="#1e4a28"/>
    <line x1="800" y1="106" x2="818" y2="106" stroke="#1e4a28" strokeWidth="3"/>
    <circle cx="809" cy="140" r="80" fill="rgba(232,160,32,0.025)"/>
    <circle cx="809" cy="140" r="50" fill="rgba(232,160,32,0.02)"/>
    <path d="M102 520 Q108 440 118 360 Q124 320 132 290" stroke="#0f2814" strokeWidth="10" fill="none" strokeLinecap="round"/>
    <ellipse cx="132" cy="283" rx="62" ry="24" fill="#1a3a20" opacity="0.8" transform="rotate(-12 132 283)"/>
    <ellipse cx="104" cy="298" rx="50" ry="20" fill="#163320" opacity="0.7" transform="rotate(-42 104 298)"/>
    <ellipse cx="162" cy="294" rx="50" ry="20" fill="#163320" opacity="0.7" transform="rotate(24 162 294)"/>
    <ellipse cx="132" cy="260" rx="42" ry="18" fill="#1e4428" opacity="0.65" transform="rotate(-5 132 260)"/>
    <ellipse cx="110" cy="272" rx="38" ry="16" fill="#163320" opacity="0.55" transform="rotate(-60 110 272)"/>
    <ellipse cx="154" cy="270" rx="38" ry="16" fill="#163320" opacity="0.55" transform="rotate(48 154 270)"/>
    <path d="M188 520 Q192 448 182 385 Q176 348 170 320" stroke="#0d2211" strokeWidth="7" fill="none" strokeLinecap="round"/>
    <ellipse cx="170" cy="313" rx="50" ry="21" fill="#163320" opacity="0.72" transform="rotate(-8 170 313)"/>
    <ellipse cx="148" cy="326" rx="40" ry="17" fill="#163320" opacity="0.62" transform="rotate(-36 148 326)"/>
    <ellipse cx="193" cy="322" rx="40" ry="17" fill="#163320" opacity="0.62" transform="rotate(20 193 322)"/>
    <circle cx="132" cy="286" r="5" fill="#1a3a20" opacity="0.6"/>
    <circle cx="170" cy="316" r="4" fill="#1a3a20" opacity="0.5"/>
    <path d="M1310 520 Q1316 442 1326 362 Q1332 322 1340 290" stroke="#0f2814" strokeWidth="10" fill="none" strokeLinecap="round"/>
    <ellipse cx="1340" cy="283" rx="62" ry="24" fill="#1a3a20" opacity="0.8" transform="rotate(15 1340 283)"/>
    <ellipse cx="1312" cy="298" rx="50" ry="20" fill="#163320" opacity="0.7" transform="rotate(-24 1312 298)"/>
    <ellipse cx="1368" cy="294" rx="50" ry="20" fill="#163320" opacity="0.7" transform="rotate(42 1368 294)"/>
    <ellipse cx="1340" cy="260" rx="42" ry="18" fill="#1e4428" opacity="0.65" transform="rotate(8 1340 260)"/>
    <path d="M1392 520 Q1396 450 1386 388 Q1380 350 1374 322" stroke="#0d2211" strokeWidth="7" fill="none" strokeLinecap="round"/>
    <ellipse cx="1374" cy="315" rx="50" ry="21" fill="#163320" opacity="0.72" transform="rotate(10 1374 315)"/>
    <ellipse cx="1352" cy="328" rx="40" ry="17" fill="#163320" opacity="0.62" transform="rotate(-20 1352 328)"/>
    <ellipse cx="1396" cy="324" rx="40" ry="17" fill="#163320" opacity="0.62" transform="rotate(36 1396 324)"/>
    {[
      [280,400],[310,415],[340,395],[290,430],[320,440],
      [1100,380],[1130,395],[1150,382],[1120,410],[1160,420],
      [1200,390],[1240,405],[1180,415],[1220,425],
      [580,440],[620,445],[660,438],[700,450],[740,443],
      [800,448],[840,452],[880,445],[920,455],[960,448],
    ].map(([x,y], i) => (
      <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 1.5 : 1} fill="#f5c04a" opacity={0.2 + (i % 4) * 0.08}/>
    ))}
    <path d="M380 495 Q500 488 620 492 Q740 496 860 490 Q980 486 1060 493" stroke="rgba(100,180,140,0.12)" strokeWidth="4" fill="none"/>
  </svg>
)

const OrchidDecor = () => (
  <svg
    viewBox="0 0 130 200"
    xmlns="http://www.w3.org/2000/svg"
    style={{ position: "absolute", top: 72, right: 44, width: 120, height: 188, pointerEvents: "none", opacity: 0.92 }}
  >
    <path d="M65 195 Q62 155 66 108 Q68 74 64 28" stroke="#2d6b38" strokeWidth="2" fill="none" opacity="0.6"/>
    <path d="M64 120 Q42 104 28 86" stroke="#2d6b38" strokeWidth="1.4" fill="none" opacity="0.45"/>
    <path d="M64 84 Q86 66 100 48" stroke="#2d6b38" strokeWidth="1.4" fill="none" opacity="0.45"/>
    <path d="M64 148 Q86 136 102 126" stroke="#2d6b38" strokeWidth="1.2" fill="none" opacity="0.38"/>
    <path d="M64 168 Q44 158 30 150" stroke="#2d6b38" strokeWidth="1" fill="none" opacity="0.32"/>
    <ellipse cx="64" cy="22" rx="18" ry="10" fill="#9b2335" opacity="0.7" transform="rotate(-12 64 22)"/>
    <ellipse cx="48" cy="30" rx="16" ry="8" fill="#b83040" opacity="0.6" transform="rotate(-45 48 30)"/>
    <ellipse cx="80" cy="28" rx="16" ry="8" fill="#b83040" opacity="0.6" transform="rotate(32 80 28)"/>
    <ellipse cx="64" cy="36" rx="14" ry="8" fill="#9b2335" opacity="0.55" transform="rotate(5 64 36)"/>
    <ellipse cx="52" cy="40" rx="12" ry="6" fill="#c0392b" opacity="0.48" transform="rotate(-20 52 40)"/>
    <ellipse cx="76" cy="38" rx="12" ry="6" fill="#c0392b" opacity="0.48" transform="rotate(18 76 38)"/>
    <circle cx="64" cy="24" r="6" fill="#e8a020" opacity="0.9"/>
    <circle cx="64" cy="24" r="3" fill="#f5c04a" opacity="1"/>
    <circle cx="64" cy="24" r="1.2" fill="#fff" opacity="0.6"/>
    <ellipse cx="28" cy="83" rx="14" ry="7" fill="#9b2335" opacity="0.58" transform="rotate(22 28 83)"/>
    <ellipse cx="16" cy="90" rx="12" ry="6" fill="#c0392b" opacity="0.48" transform="rotate(-32 16 90)"/>
    <ellipse cx="40" cy="88" rx="12" ry="6" fill="#c0392b" opacity="0.48" transform="rotate(46 40 88)"/>
    <ellipse cx="28" cy="95" rx="10" ry="5" fill="#9b2335" opacity="0.4"/>
    <circle cx="28" cy="85" r="4" fill="#e8a020" opacity="0.82"/>
    <circle cx="28" cy="85" r="1.8" fill="#f5c04a" opacity="0.9"/>
    <ellipse cx="100" cy="45" rx="14" ry="7" fill="#9b2335" opacity="0.55" transform="rotate(-18 100 45)"/>
    <ellipse cx="88" cy="52" rx="12" ry="6" fill="#c0392b" opacity="0.46" transform="rotate(-46 88 52)"/>
    <ellipse cx="112" cy="50" rx="12" ry="6" fill="#c0392b" opacity="0.46" transform="rotate(22 112 50)"/>
    <circle cx="100" cy="47" r="3.5" fill="#e8a020" opacity="0.78"/>
    <circle cx="100" cy="47" r="1.5" fill="#f5c04a" opacity="0.88"/>
    <ellipse cx="102" cy="122" rx="13" ry="7" fill="#9b2335" opacity="0.5" transform="rotate(14 102 122)"/>
    <ellipse cx="91" cy="129" rx="11" ry="5" fill="#c0392b" opacity="0.42" transform="rotate(-28 91 129)"/>
    <ellipse cx="113" cy="127" rx="11" ry="5" fill="#c0392b" opacity="0.42" transform="rotate(38 113 127)"/>
    <circle cx="102" cy="124" r="3" fill="#e8a020" opacity="0.72"/>
    <ellipse cx="30" cy="147" rx="12" ry="6" fill="#9b2335" opacity="0.45" transform="rotate(-10 30 147)"/>
    <ellipse cx="20" cy="153" rx="10" ry="5" fill="#c0392b" opacity="0.38" transform="rotate(-35 20 153)"/>
    <ellipse cx="42" cy="151" rx="10" ry="5" fill="#c0392b" opacity="0.38" transform="rotate(25 42 151)"/>
    <circle cx="30" cy="149" r="2.8" fill="#e8a020" opacity="0.65"/>
    <ellipse cx="104" cy="140" rx="22" ry="8" fill="#1a4a26" opacity="0.42" transform="rotate(38 104 140)"/>
    <ellipse cx="25" cy="168" rx="18" ry="7" fill="#1a4a26" opacity="0.35" transform="rotate(-22 25 168)"/>
    <ellipse cx="80" cy="172" rx="20" ry="7" fill="#1a4a26" opacity="0.38" transform="rotate(15 80 172)"/>
  </svg>
)

const HeroBadge = () => (
  <div style={{ position: "absolute", right: "calc(22% + 24px)", bottom: 95, zIndex: 3 }}>
    <div style={{ position: "relative", width: 88, height: 88 }}>
      <svg
        viewBox="0 0 88 88"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: 88, height: 88, animation: "spin-slow 22s linear infinite" }}
      >
        <defs>
          <path id="badgeCircle" d="M 44,44 m -34,0 a 34,34 0 1,1 68,0 a 34,34 0 1,1 -68,0"/>
        </defs>
        <circle cx="44" cy="44" r="41" fill="none" stroke="#e8a020" strokeWidth="0.8" opacity="0.3"/>
        <circle cx="44" cy="44" r="33" fill="none" stroke="#e8a020" strokeWidth="0.3" opacity="0.18"/>
        <text fontSize="6.5" fill="#e8a020" opacity="0.65" letterSpacing="3.2" fontFamily="'DM Sans', sans-serif" fontWeight="500">
          <textPath href="#badgeCircle">SANTIAGO DE CALI · ALTA COCINA · VALLE DEL CAUCA · </textPath>
        </text>
      </svg>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center" }}>
        <svg viewBox="0 0 30 28" width="30" height="28" xmlns="http://www.w3.org/2000/svg">
          <rect x="13" y="0" width="4" height="18" fill="#e8a020" opacity="0.55"/>
          <rect x="7" y="5" width="16" height="3" fill="#e8a020" opacity="0.55"/>
          <ellipse cx="15" cy="0" rx="4" ry="5" fill="#e8a020" opacity="0.42"/>
          <rect x="10" y="17" width="10" height="11" rx="1" fill="#e8a020" opacity="0.38"/>
        </svg>
        <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 11, color: "#e8a020", opacity: 0.7, letterSpacing: 2, lineHeight: 1 }}>2025</div>
      </div>
    </div>
  </div>
)

const QuoteOrchids = () => (
  <svg viewBox="0 0 200 48" width="200" height="48" xmlns="http://www.w3.org/2000/svg">
    <line x1="100" y1="46" x2="100" y2="6" stroke="#2d6b38" strokeWidth="1.2" opacity="0.4"/>
    <line x1="44" y1="42" x2="44" y2="18" stroke="#2d6b38" strokeWidth="1" opacity="0.32"/>
    <line x1="156" y1="42" x2="156" y2="18" stroke="#2d6b38" strokeWidth="1" opacity="0.32"/>
    <ellipse cx="44" cy="22" rx="16" ry="8" fill="#9b2335" opacity="0.38" transform="rotate(-15 44 22)"/>
    <ellipse cx="32" cy="28" rx="13" ry="6" fill="#c0392b" opacity="0.3" transform="rotate(-40 32 28)"/>
    <ellipse cx="56" cy="26" rx="13" ry="6" fill="#c0392b" opacity="0.3" transform="rotate(26 56 26)"/>
    <circle cx="44" cy="23" r="3.5" fill="#e8a020" opacity="0.62"/>
    <circle cx="44" cy="23" r="1.5" fill="#f5c04a" opacity="0.8"/>
    <ellipse cx="100" cy="16" rx="18" ry="9" fill="#9b2335" opacity="0.46"/>
    <ellipse cx="86" cy="23" rx="14" ry="7" fill="#c0392b" opacity="0.36" transform="rotate(-34 86 23)"/>
    <ellipse cx="114" cy="23" rx="14" ry="7" fill="#c0392b" opacity="0.36" transform="rotate(34 114 23)"/>
    <ellipse cx="100" cy="28" rx="12" ry="6" fill="#9b2335" opacity="0.3"/>
    <circle cx="100" cy="17" r="4.5" fill="#e8a020" opacity="0.72"/>
    <circle cx="100" cy="17" r="2" fill="#f5c04a" opacity="0.88"/>
    <circle cx="100" cy="17" r="0.8" fill="#fff" opacity="0.6"/>
    <ellipse cx="156" cy="22" rx="16" ry="8" fill="#9b2335" opacity="0.38" transform="rotate(18 156 22)"/>
    <ellipse cx="144" cy="28" rx="13" ry="6" fill="#c0392b" opacity="0.3" transform="rotate(-28 144 28)"/>
    <ellipse cx="168" cy="26" rx="13" ry="6" fill="#c0392b" opacity="0.3" transform="rotate(44 168 26)"/>
    <circle cx="156" cy="23" r="3.5" fill="#e8a020" opacity="0.62"/>
    <circle cx="156" cy="23" r="1.5" fill="#f5c04a" opacity="0.8"/>
  </svg>
)

const BoxIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
    <line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
)

const bandItems = [
  { text: "Santiago de Cali", icon: "🌺" },
  { text: "Valle del Cauca", icon: "🌿" },
  { text: "Cocina de Autor", icon: "👨‍🍳" },
  { text: "Sabor Caleño", icon: "💃" },
  { text: "Farallones", icon: "⛰️" },
  { text: "Cristo Rey", icon: "✝" },
  { text: "Orquídeas del Valle", icon: "🌸" },
  { text: "Salsa & Sazón", icon: "🎶" },
  { text: "Santiago de Cali", icon: "🌺" },
  { text: "Valle del Cauca", icon: "🌿" },
  { text: "Cocina de Autor", icon: "👨‍🍳" },
  { text: "Sabor Caleño", icon: "💃" },
  { text: "Farallones", icon: "⛰️" },
  { text: "Cristo Rey", icon: "✝" },
  { text: "Orquídeas del Valle", icon: "🌸" },
  { text: "Salsa & Sazón", icon: "🎶" },
]

const ESTADO_MSG = {
  pendiente: "Pedido recibido",
  confirmado: "Pedido confirmado",
  preparando: "Preparando tu pedido 👨‍🍳",
  enviado: "En camino 🛵",
  entregado: "Entregado ✓",
  cancelado: "Pedido cancelado",
}

export default function HomePage() {
  const navigate = useNavigate()
  const [productos, setProductos] = useState([])
  const [carrito, setCarrito] = useState([])
  const [carritoAbierto, setCarritoAbierto] = useState(false)
  const [perfilAbierto, setPerfilAbierto] = useState(false)
  const [modalAbierto, setModalAbierto] = useState(false)
  const [tipoEntrega, setTipoEntrega] = useState("domicilio")
  const [direccion, setDireccion] = useState("")
  const [mesa, setMesa] = useState("")
  const [contacto, setContacto] = useState("")
  const [navScrolled, setNavScrolled] = useState(false)
  const [usuario, setUsuario] = useState(JSON.parse(localStorage.getItem("usuario") || "null"))
  const [pedidoActivo, setPedidoActivo] = useState(null)
  const [mostrarBanner, setMostrarBanner] = useState(true)
  const menuRef = useRef(null)

  useEffect(() => {
    api.get("/productos").then(res => setProductos(res.data)).catch(() => {})
  }, [])

  useEffect(() => {
    const h = () => setNavScrolled(window.scrollY > 40)
    window.addEventListener("scroll", h, { passive: true })
    return () => window.removeEventListener("scroll", h)
  }, [])

  // ⭐ CARGAR PEDIDO ACTIVO DESDE MYSQL
  const cargarPedidoActivo = async () => {
    try {
      const userId = usuario?.id || usuario?._id || usuario?.usuario_id
      const res = await api.get(`/pedidos/mis-pedidos?usuario_id=${userId || ""}`)
      const pedidos = Array.isArray(res.data) ? res.data : []

      const activo = pedidos.find(p => {
        const estado = p.estado?.toLowerCase()
        return estado && !["entregado", "cancelado"].includes(estado)
      })
      setPedidoActivo(activo || null)
    } catch (err) {
      console.log("ℹ️ No hay pedidos activos")
      setPedidoActivo(null)
    }
  }

  useEffect(() => {
    cargarPedidoActivo()
    const interval = setInterval(cargarPedidoActivo, 30000)
    return () => clearInterval(interval)
  }, [])

  const agregarAlCarrito = (p) => setCarrito(prev => {
    const e = prev.find(x => x._id === p._id || x.id === p.id)
    if (e) return prev.map(x => (x._id === p._id || x.id === p.id) ? { ...x, cantidad: x.cantidad + 1 } : x)
    return [...prev, { ...p, cantidad: 1 }]
  })

  const eliminarDelCarrito = (id) => setCarrito(prev => prev.filter(p => p._id !== id && p.id !== id))
  const totalItems = carrito.reduce((a, p) => a + p.cantidad, 0)
  const total = carrito.reduce((a, p) => a + p.precio * p.cantidad, 0)
  const abrirModal = () => { if (!carrito.length) return; setCarritoAbierto(false); setModalAbierto(true) }

  // ⭐ CONFIRMAR PEDIDO Y GUARDAR EN MYSQL
  const confirmarPedido = async () => {
    if (!contacto) return alert("Por favor ingresa un número de contacto")
    if (tipoEntrega === "domicilio" && !direccion) return alert("Por favor ingresa una dirección")
    if (tipoEntrega === "presencial" && !mesa) return alert("Por favor ingresa el número de mesa")

    try {
      const userId = usuario?.id || usuario?._id || usuario?.usuario_id

      console.log("📤 Enviando pedido al backend...", { userId, total, items: carrito.length })

      const response = await api.post("/pedidos", {
        usuario_id: userId,
        items: carrito.map(p => ({
          nombre: p.nombre,
          precio: p.precio,
          cantidad: p.cantidad
        })),
        total,
        tipoEntrega,
        direccion: tipoEntrega === "domicilio" ? direccion : null,
        mesa: tipoEntrega === "presencial" ? mesa : null,
        contacto,
      })

      console.log("✅ Pedido guardado:", response.data)
      setMostrarBanner(true)
      setTimeout(cargarPedidoActivo, 500)
    } catch (e) {
      console.error("❌ Error guardando pedido:", e.response?.data || e.message)
      alert("Hubo un error al guardar el pedido, pero aún puedes pedir por WhatsApp")
    }

    let msg = "Hola, quiero pedir:%0A"
    carrito.forEach(p => { msg += `${p.nombre} x${p.cantidad} - $${(p.precio * p.cantidad).toLocaleString()}%0A` })
    msg += `Total: $${total.toLocaleString()}%0A`
    msg += tipoEntrega === "domicilio" ? `Dirección: ${direccion}%0A` : `Mesa: ${mesa}%0A`
    msg += `Contacto: ${contacto}`
    setModalAbierto(false); setCarrito([]); setDireccion(""); setMesa(""); setContacto("")
    window.open(`https://wa.me/573175397038?text=${msg}`, "_blank")
  }

  const handleActualizarPerfil = (u) => setUsuario(prev => ({ ...prev, ...u }))
  const handleLogout = () => { localStorage.clear(); navigate("/") }

  return (
    <>
      <style>{styles}</style>
      <style>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
      <div className="app">

        <nav className={`nav ${navScrolled ? "scrolled" : ""}`}>
          <div className="nav-logo" onClick={() => navigate("/home")}>
            <span className="nav-logo-main">La Maison</span>
            <span className="nav-logo-sub">Cali · Alta Cocina</span>
          </div>
          <div className="nav-center">
            <button className="nav-link" onClick={() => menuRef.current?.scrollIntoView({ behavior: "smooth" })}>Menú</button>
            <button
              className={`nav-link ${pedidoActivo ? "nav-link-pedidos" : ""}`}
              onClick={() => navigate("/mis-pedidos")}
            >
              Mis Pedidos
            </button>
            <button className="nav-link" onClick={() => navigate("/reservas")}>Reservas</button>
            <button className="nav-link" onClick={() => navigate("/nosotros")}>Nosotros</button>
          </div>
          <div className="nav-right">
            <span className="nav-greeting">{usuario?.nombre}</span>
            <button className="nav-btn" onClick={() => setPerfilAbierto(true)}>Perfil</button>
            <button className="nav-btn nav-btn-order" onClick={() => setCarritoAbierto(true)}>
              <span>Pedido{totalItems > 0 && <span className="cart-badge">{totalItems}</span>}</span>
            </button>
            <button className="nav-btn" onClick={handleLogout}>Salir</button>
          </div>
        </nav>

        <section className="hero">
          <div className="hero-bg" />
          <div className="hero-texture" />
          <div className="hero-light1" />
          <div className="hero-light2" />
          <CaliScene />
          <OrchidDecor />
          <div className="hero-vline" />
          <div className="hero-hline" />
          <div className="hero-watermark">CALI</div>
          <HeroBadge />

          <div className="hero-stats anim-up a5">
            <div className="hero-stat">
              <div className="hero-stat-num">100%</div>
              <div className="hero-stat-label">Valle del Cauca</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-num">Chef</div>
              <div className="hero-stat-label">Cocina de autor</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-num">2025</div>
              <div className="hero-stat-label">Santiago de Cali</div>
            </div>
          </div>

          <div className="hero-content">
            <div className="hero-eyebrow anim-up a1">
              <div className="hero-eyebrow-line" />
              <span className="hero-eyebrow-text">Cocina de Autor · Santiago de Cali</span>
            </div>

            <h1 className="hero-title anim-up a2">
              Sabor que
              <span className="hero-title-bold">Enamora</span>
            </h1>

            <p className="hero-desc anim-up a3">
              Bajo la mirada del Cristo Rey y los Farallones.<br />
              Ingredientes del Valle, orquídeas, sazón y alma caleña en cada plato.
            </p>

            <div className="hero-actions anim-up a4">
              <button
                className="hero-cta-primary"
                onClick={() => menuRef.current?.scrollIntoView({ behavior: "smooth" })}
              >
                Ver la carta <span className="arrow">→</span>
              </button>
              <button
                className="hero-cta"
                onClick={() => setCarritoAbierto(true)}
              >
                <div className="hero-cta-line" />
                Hacer pedido
              </button>
            </div>
          </div>
        </section>

        <div className="band" aria-hidden="true">
          <div className="band-track">
            {bandItems.map((item, i) => (
              <div className="band-item" key={i}>
                <span className="band-sep">{item.icon}</span>
                <span className="band-text">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <section className="pillars">
          {[
            { n: "01", icon: "🌿", title: "Del Valle al Plato", text: "Papa criolla, chontaduro, lulo, maracuyá — seleccionamos directamente con agricultores del Valle del Cauca para que cada ingrediente llegue en su punto exacto de madurez." },
            { n: "02", icon: "💃", title: "Alma Caleña", text: "Como la salsa que nos define: técnica impecable, ritmo y pasión. Cocina de autor que celebra con orgullo la identidad del suroccidente colombiano." },
            { n: "03", icon: "🌺", title: "Orquídea del Valle", text: "La flor que nos representa: elegancia, color y vida. Cada plato está diseñado con esa misma delicadeza — bello, vibrante y profundamente memorable." },
          ].map((p) => (
            <div className="pillar" key={p.n}>
              <div className="pillar-num">{p.n}</div>
              <div className="pillar-icon-wrap">{p.icon}</div>
              <div className="pillar-title">{p.title}</div>
              <div className="pillar-text">{p.text}</div>
            </div>
          ))}
        </section>

        <section className="menu-section" ref={menuRef}>
          <div className="section-header">
            <div className="section-eyebrow">
              <div className="section-eyebrow-line" />
              <span className="section-eyebrow-text">Carta del día</span>
            </div>
            <h2 className="section-title">Nuestros<br /><em>platos de autor</em></h2>
            <p className="section-subtitle">
              {productos.length} creaciones disponibles hoy. Sabores del Valle del Cauca con técnica de autor.
            </p>
          </div>

          <div className="cards-grid">
            {productos.length === 0 && <div className="empty-msg">No hay platos disponibles en este momento.</div>}
            {productos.map((p, idx) => (
              <div className={`product-card ${idx === 0 ? "featured" : ""}`} key={p._id || p.id}>
                <div className="card-img-wrap">
                  <img src={p.imagen || `https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=85`} alt={p.nombre} />
                  <div className="card-gradient" />
                  {p.categoria && <span className="card-tag">{p.categoria}</span>}
                </div>
                <div className="card-body">
                  <h3 className="card-name">{p.nombre}</h3>
                  <p className="card-desc">{p.descripcion}</p>
                  <div className="card-footer">
                    <div className="card-price"><sup>$</sup>{p.precio.toLocaleString()}</div>
                    <button className="add-btn" onClick={() => agregarAlCarrito(p)}>
                      <span className="add-btn-icon">+</span>Agregar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="quote-section">
          <div className="quote-circle1" />
          <div className="quote-circle2" />
          <div className="quote-orchids"><QuoteOrchids /></div>
          <span className="quote-mark">"</span>
          <p className="quote-text">
            En Cali todo tiene color, ritmo y sabor.<br />
            Nuestra cocina es el eco de esa <em>alegría inigualable</em>.
          </p>
          <span className="quote-attr">Chef · La Maison, Santiago de Cali</span>
        </section>

        <footer className="footer">
          <div className="footer-logo">La Maison</div>
          <div className="footer-center">
            <div className="footer-diamond" />
            <div className="footer-tagline">Alta Cocina · Santiago de Cali</div>
          </div>
          <div className="footer-right">© 2025 · Todos los derechos reservados</div>
        </footer>

        <div className={`drawer-overlay ${carritoAbierto ? "show" : ""}`} onClick={() => setCarritoAbierto(false)} />
        <div className={`cart-drawer ${carritoAbierto ? "open" : ""}`}>
          <div className="cart-header">
            <div className="cart-header-top">
              <div>
                <p className="cart-eyebrow">Selección</p>
                <h2 className="cart-title">Tu pedido</h2>
              </div>
              <button className="close-btn" onClick={() => setCarritoAbierto(false)}>✕</button>
            </div>
          </div>
          <div className="cart-items">
            {carrito.length === 0 ? (
              <div className="cart-empty">Tu selección está vacía<div className="cart-empty-sub">Elige tus platos del menú</div></div>
            ) : carrito.map(p => (
              <div className="cart-item" key={p._id || p.id}>
                <div>
                  <div className="cart-item-name">{p.nombre}</div>
                  <div className="cart-item-qty">× {p.cantidad} · ${p.precio.toLocaleString()} c/u</div>
                </div>
                <div className="cart-item-right">
                  <span className="cart-item-price">${(p.precio * p.cantidad).toLocaleString()}</span>
                  <button className="remove-btn" onClick={() => eliminarDelCarrito(p._id || p.id)}>✕</button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-footer">
            <div className="cart-total-row">
              <span className="cart-total-label">Total</span>
              <span className="cart-total-val">${total.toLocaleString()}</span>
            </div>
            <button className="wa-btn" onClick={abrirModal} disabled={carrito.length === 0}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.528 5.855L0 24l6.335-1.505A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.028-1.38l-.36-.214-3.733.888.936-3.638-.235-.375A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
              </svg>
              <span>Pedir por WhatsApp</span>
            </button>
          </div>
        </div>

        {modalAbierto && (
          <div className="modal-overlay">
            <div className="modal-box">
              <div className="modal-header">
                <p className="modal-eyebrow">Confirmación</p>
                <h2 className="modal-title">Confirmar pedido</h2>
                <div className="modal-total">${total.toLocaleString()}</div>
              </div>
              <div className="modal-body">
                <div className="type-toggle">
                  {["domicilio", "presencial"].map(t => (
                    <button key={t} className={`type-btn ${tipoEntrega === t ? "active" : "inactive"}`} onClick={() => setTipoEntrega(t)}>
                      {t === "domicilio" ? "🏠 Domicilio" : "🪑 En Mesa"}
                    </button>
                  ))}
                </div>
                <label className="field-label">{tipoEntrega === "domicilio" ? "Dirección de entrega" : "Número de mesa"}</label>
                {tipoEntrega === "domicilio" ? (
                  <input className="field-input" placeholder="Ej: Cra. 66 # 11-35, Granada, Cali" value={direccion} onChange={e => setDireccion(e.target.value)} />
                ) : (
                  <input className="field-input" placeholder="Ej: Mesa 4" value={mesa} onChange={e => setMesa(e.target.value)} />
                )}
                <label className="field-label">Número de contacto</label>
                <input className="field-input" type="tel" placeholder="Ej: 3001234567" value={contacto} onChange={e => setContacto(e.target.value)} />
                <div className="modal-actions">
                  <button className="modal-cancel" onClick={() => setModalAbierto(false)}>Cancelar</button>
                  <button className="modal-confirm" onClick={confirmarPedido}><span>Confirmar y pedir →</span></button>
                </div>
              </div>
            </div>
          </div>
        )}

        {pedidoActivo && mostrarBanner && (
          <div
            className="pedido-banner"
            onClick={() => navigate("/mis-pedidos")}
          >
            <button
              className="pedido-banner-close"
              onClick={(e) => { e.stopPropagation(); setMostrarBanner(false); }}
            >
              ✕
            </button>
            <div className="pedido-banner-icon">
              <BoxIcon />
            </div>
            <div className="pedido-banner-text">
              <div className="pedido-banner-label">Pedido activo</div>
              <div className="pedido-banner-status">
                {ESTADO_MSG[pedidoActivo.estado?.toLowerCase()] || "En proceso"}
              </div>
            </div>
            <span className="pedido-banner-arrow">→</span>
          </div>
        )}

        {perfilAbierto && <PerfilModal onCerrar={() => setPerfilAbierto(false)} onActualizado={handleActualizarPerfil} />}
      </div>
    </>
  )
}