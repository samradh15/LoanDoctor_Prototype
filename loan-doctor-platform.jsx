import React, { useState, useEffect, useRef, useCallback } from 'react';

// =========================================================================
// DESIGN SYSTEM & TOKENS (Shared across all roles)
// =========================================================================
const C = {
    // Backgrounds
    bg:           "#0F0F0F",
    card1:        "#1A1A1A",   // standard surface
    card2:        "#242424",   // elevated / input surface
    border:       "#2E2E2E",
    borderMid:    "#3A3A3A",

    // Brand
    clay:         "#E8570C",   // primary orange
    primary:      "#E8570C",
    primaryDim:   "rgba(232,87,12,0.12)",
    primaryGlow:  "rgba(232,87,12,0.25)",

    // Semantic
    teal:         "#22C55E",   // success green (legacy alias)
    success:      "#22C55E",
    successDim:   "rgba(34,197,94,0.10)",
    amber:        "#F59E0B",   // warning
    warning:      "#F59E0B",
    warningDim:   "rgba(245,158,11,0.10)",
    red:          "#EF4444",   // danger
    danger:       "#EF4444",
    dangerDim:    "rgba(239,68,68,0.10)",
    blue:         "#3B82F6",   // info / admin
    info:         "#3B82F6",
    infoDim:      "rgba(59,130,246,0.10)",
    purple:       "#A78BFA",   // franchisee
    violetDim:    "rgba(167,139,250,0.12)",

    // Text
    textPrimary:   "#F5F5F5",
    textSecondary: "#A3A3A3",
    textMuted:     "#6B6B6B",
};

const F = {
    serif: "'Fraunces', serif",
    sans:  "'Plus Jakarta Sans', sans-serif",
    mono:  "'Syne Mono', monospace"
};

const px = (n) => `${n}px`;

// Status chip factory — semantic colours per README spec
const statusChip = (status) => {
    const map = {
        APPROVED:   { bg: "rgba(34,197,94,.12)",   border: "rgba(34,197,94,.25)",   color: "#22C55E" },
        VERIFIED:   { bg: "rgba(34,197,94,.12)",   border: "rgba(34,197,94,.25)",   color: "#22C55E" },
        ACTIVE:     { bg: "rgba(34,197,94,.12)",   border: "rgba(34,197,94,.25)",   color: "#22C55E" },
        PENDING:    { bg: "rgba(245,158,11,.12)",  border: "rgba(245,158,11,.25)",  color: "#F59E0B" },
        "IN REVIEW":{ bg: "rgba(245,158,11,.12)",  border: "rgba(245,158,11,.25)",  color: "#F59E0B" },
        SUBMITTED:  { bg: "rgba(59,130,246,.12)",  border: "rgba(59,130,246,.25)",  color: "#3B82F6" },
        OBJECTION:  { bg: "rgba(239,68,68,.12)",   border: "rgba(239,68,68,.25)",   color: "#EF4444" },
        REJECTED:   { bg: "rgba(239,68,68,.12)",   border: "rgba(239,68,68,.25)",   color: "#EF4444" },
        INACTIVE:   { bg: "rgba(107,107,107,.12)", border: "rgba(107,107,107,.25)", color: "#6B6B6B" },
    };
    const s = map[status?.toUpperCase()] || map.PENDING;
    return {
        background: s.bg, color: s.color,
        border: `1px solid ${s.border}`,
        fontFamily: F.mono, fontSize: px(9), letterSpacing: "0.5px",
        padding: "3px 8px", borderRadius: px(6),
        display: "inline-flex", alignItems: "center", justifyContent: "center"
    };
};

// Generic chip (for categories, non-status use)
const chip = (bg, color, border) => ({
    background: bg, color, border: `1px solid ${border}`,
    fontFamily: F.mono, fontSize: px(9), fontWeight: 600,
    padding: "4px 8px", borderRadius: px(6), display: "inline-flex",
    alignItems: "center", justifyContent: "center", letterSpacing: "0.5px"
});

// Primary CTA with gradient
const cta = (color = C.clay, extra = {}) => {
    const isOrange = color === C.clay || color === C.primary;
    const isGreen  = color === C.teal  || color === C.success;
    const bg = isOrange
        ? "linear-gradient(135deg,#E8570C,#F97316)"
        : isGreen
        ? "linear-gradient(135deg,#16A34A,#22C55E)"
        : color;
    return {
        width: "100%", height: px(54), background: bg, color: "#fff",
        fontFamily: F.sans, fontWeight: 700, fontSize: px(15),
        border: "none", borderRadius: px(14), display: "flex",
        alignItems: "center", justifyContent: "center", gap: px(8),
        boxShadow: `0 6px 24px ${color}66`, transition: "all .15s",
        cursor: "pointer", ...extra
    };
};

const ghostCta = (color = C.textMuted, extra = {}) => ({
    width: "100%", height: px(50), background: "transparent", color: color,
    fontFamily: F.sans, fontWeight: 600, fontSize: px(14),
    border: `1.5px solid ${C.border}`, borderRadius: px(14), display: "flex",
    alignItems: "center", justifyContent: "center", gap: px(8),
    cursor: "pointer", ...extra
});

// Role accent colours per README spec
const roleColor = {
    customer:     "#E8570C",
    sales_exec:   "#22C55E",
    team_leader:  "#F59E0B",
    franchisee:   "#A78BFA",
    admin:        "#3B82F6"
};

const roleLabel = {
    customer:     "CUSTOMER",
    sales_exec:   "SALES EXEC",
    team_leader:  "TEAM LEADER",
    franchisee:   "FRANCHISEE",
    admin:        "ADMINISTRATOR"
};

// =========================================================================
// SVG ICONS
// =========================================================================
const I = {
    cross: (c = "#fff", s = 24) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>,
    mic: (c = "#fff", s = 24) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" /></svg>,
    home: (c = "#fff", s = 24) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    list: (c = "#fff", s = 24) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
    folder: (c = "#fff", s = 24) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>,
    chat: (c = "#fff", s = 24) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
    person: (c = "#fff", s = 24) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    bell: (c = "#fff", s = 24) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
    check: (c = "#fff", s = 24) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
    arrow: (c = "#fff", s = 24) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
    back: (c = "#fff", s = 24) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
    doc: (c = "#fff", s = 24) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
    lock: (c = "#fff", s = 24) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
    pin: (c = "#fff", s = 24) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    filter: (c = "#fff", s = 24) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
    upload: (c = "#fff", s = 24) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
    call: (c = "#fff", s = 24) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
    video: (c = "#fff", s = 24) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>,
    warn: (c = "#fff", s = 24) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
    info: (c = "#fff", s = 24) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
    play: (c = "#fff", s = 24) => <svg width={s} height={s} viewBox="0 0 24 24" fill="#fff" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
    chevron: (c = "#fff", s = 24) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
    gps: (c = "#fff", s = 24) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>,
    search: (c = "#fff", s = 24) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    edit: (c = "#fff", s = 24) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
    wa: (c = "#fff", s = 24) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>,
    star: (c = "#fff", s = 24) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    plus: (c = "#fff", s = 24) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    users: (c = "#fff", s = 24) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
    chart: (c = "#fff", s = 24) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>,
    briefcase: (c = "#fff", s = 24) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>,
    settings: (c = "#fff", s = 24) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>,
    award: (c = "#fff", s = 24) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
};

// =========================================================================
// GLOBAL CSS & ANIMATIONS
// =========================================================================
function StyleBlock() {
    return (
        <style dangerouslySetInnerHTML={{
            __html: `
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700;9..144,900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne+Mono&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; user-select: none; -webkit-tap-highlight-color: transparent; }
        ::-webkit-scrollbar { display: none; }
        body { background: #080808; display: flex; align-items: center; justify-content: center; height: 100vh; font-family: 'Plus Jakarta Sans', sans-serif; overflow: hidden; }
        #root { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; }
        .app-frame { width: 375px; height: 812px; border-radius: 46px; background: ${C.bg}; position: relative; overflow: hidden; box-shadow: 0 0 0 1px rgba(255,255,255,.06), 0 30px 80px rgba(0,0,0,.9); }
        .sc { width: 100%; height: 100%; position: absolute; top: 0; left: 0; overflow-x: hidden; overflow-y: auto; color: ${C.textPrimary}; animation: fadeUp 0.3s cubic-bezier(0.16,1,0.3,1) both; }
        .dynamic-island { position: absolute; top: 12px; left: 50%; transform: translateX(-50%); width: 116px; height: 32px; background: #000; border-radius: 16px; z-index: 999; }
        .tappable { transition: transform 0.15s cubic-bezier(0.16,1,0.3,1); cursor: pointer; }
        .tappable:active { transform: scale(0.97); }
        button { -webkit-tap-highlight-color: transparent; }
        @keyframes fadeUp { 0% { opacity: 0; transform: translateY(18px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes slideUp { 0% { transform: translateY(100%); } 100% { transform: translateY(0); } }
        @keyframes slideDown { 0% { transform: translateY(-100%); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
        @keyframes slideInRight { 0% { opacity: 0; transform: translateX(32px); } 100% { opacity: 1; transform: translateX(0); } }
        @keyframes popIn { 0% { opacity: 0; transform: scale(0); } 60% { transform: scale(1.1); } 100% { opacity: 1; transform: scale(1); } }
        @keyframes bounceIn { 0% { transform: scale(0); } 60% { transform: scale(1.15); } 100% { transform: scale(1); } }
        @keyframes rA { 0%,100% { transform: scale(1.00); opacity: 0.50; } 50% { transform: scale(1.10); opacity: 0.08; } }
        @keyframes rB { 0%,100% { transform: scale(1.00); opacity: 0.35; } 50% { transform: scale(1.07); opacity: 0.05; } }
        @keyframes rC { 0%,100% { transform: scale(1.00); opacity: 0.20; } 50% { transform: scale(1.04); opacity: 0.03; } }
        @keyframes sBar { 0%,100% { transform: scaleY(0.25); } 50% { transform: scaleY(1.00); } }
        @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0.15; } }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes msgIn { 0% { opacity: 0; transform: translateY(8px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes strokeIn { from { stroke-dashoffset: 200; } to { stroke-dashoffset: 0; } }
        @keyframes fabP { 0%,100% { box-shadow: 0 8px 28px rgba(232,87,12,0.45), 0 0 0 0px rgba(232,87,12,0.15); } 50% { box-shadow: 0 8px 28px rgba(232,87,12,0.45), 0 0 0 10px rgba(232,87,12,0.00); } }
        @keyframes badgeP { 0%,100% { transform: scale(1.00); } 50% { transform: scale(1.04); } }
        @keyframes dotP { 0%,100% { transform: scale(1.0); opacity: 1; } 50% { transform: scale(1.6); opacity: 0.6; } }
        @keyframes shimmer { 0% { background-position: -300px 0; } 100% { background-position: 300px 0; } }
        @keyframes confettiDrop { 0% { transform: translateY(-10px) rotate(0deg); opacity: 1; } 100% { transform: translateY(60px) rotate(360deg); opacity: 0; } }
        @keyframes toastIn { 0% { opacity: 0; transform: translateY(-16px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes toastOut { 0% { opacity: 1; transform: translateY(0); } 100% { opacity: 0; transform: translateY(-16px); } }
        @keyframes progressFill { from { width: 0%; } }
        .skel { background: linear-gradient(90deg,#1A1A1A 0%,#242424 50%,#1A1A1A 100%); background-size: 300% 100%; animation: shimmer 1.5s ease infinite; border-radius: 8px; }
        .shimmer-bg { background: linear-gradient(90deg,rgba(255,255,255,0) 0%,rgba(255,255,255,0.04) 50%,rgba(255,255,255,0) 100%); background-size: 200% 100%; animation: shimmer 2s infinite linear; }
        .hide-scroll { scrollbar-width: none; }
        .hide-scroll::-webkit-scrollbar { display: none; }
        input { outline: none; }
        input::placeholder { color: #6B6B6B; }
      `}} />
    );
}

// =========================================================================
// SHARED COMPONENTS
// =========================================================================

// Status Bar
function SB({ extraSpace = false }) {
    const [t, setT] = useState(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    useEffect(() => {
        const iv = setInterval(() => setT(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })), 30000);
        return () => clearInterval(iv);
    }, []);
    return (
        <div style={{ height: px(50), display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", marginTop: extraSpace ? px(10) : 0, flexShrink: 0 }}>
            <span style={{ fontFamily: F.mono, fontSize: px(12), color: C.textMuted }}>{t}</span>
            <div style={{ display: "flex", alignItems: "center", gap: px(5) }}>
                {/* signal bars */}
                {[10,14,18].map((h, i) => <div key={i} style={{ width: px(3), height: px(h), background: "rgba(245,245,245,.35)", borderRadius: px(1.5) }} />)}
                {/* battery */}
                <div style={{ width: px(22), height: px(11), border: "1.5px solid rgba(245,245,245,.35)", borderRadius: px(3), marginLeft: px(2), position: "relative", display: "flex", alignItems: "center", padding: "1.5px" }}>
                    <div style={{ width: "70%", height: "100%", background: "rgba(245,245,245,.35)", borderRadius: px(1.5) }} />
                    <div style={{ position: "absolute", right: px(-4), top: "50%", transform: "translateY(-50%)", width: px(2.5), height: px(5), background: "rgba(245,245,245,.3)", borderRadius: px(1) }} />
                </div>
            </div>
        </div>
    );
}

// Toast notification system
function Toast({ toast }) {
    if (!toast) return null;
    const colours = {
        success: { bg: C.successDim, border: "rgba(34,197,94,.35)",  icon: C.success, left: C.success },
        warning: { bg: C.warningDim, border: "rgba(245,158,11,.35)", icon: C.warning, left: C.warning },
        error:   { bg: C.dangerDim,  border: "rgba(239,68,68,.35)",  icon: C.danger,  left: C.danger  },
        info:    { bg: C.infoDim,    border: "rgba(59,130,246,.35)", icon: C.info,    left: C.info    },
    };
    const s = colours[toast.type] || colours.info;
    return (
        <div style={{
            position: "absolute", top: px(60), left: px(16), right: px(16), zIndex: 300,
            background: C.card1, border: `1px solid ${s.border}`,
            borderRadius: px(12), padding: "12px 14px",
            boxShadow: "0 8px 32px rgba(0,0,0,.5)",
            borderLeft: `3px solid ${s.left}`,
            display: "flex", alignItems: "center", gap: px(10),
            animation: "toastIn .3s cubic-bezier(0.16,1,0.3,1) both"
        }}>
            <div style={{ width: px(8), height: px(8), borderRadius: "50%", background: s.icon, flexShrink: 0 }} />
            <span style={{ fontFamily: F.sans, fontSize: px(13), color: C.textPrimary, flex: 1 }}>{toast.msg}</span>
        </div>
    );
}

// Confirmation bottom sheet
function ConfirmSheet({ sheet, onConfirm, onCancel }) {
    if (!sheet) return null;
    return (
        <div style={{
            position: "absolute", inset: 0, zIndex: 200,
            background: "rgba(0,0,0,.7)",
            display: "flex", flexDirection: "column", justifyContent: "flex-end"
        }} onClick={onCancel}>
            <div onClick={e => e.stopPropagation()} style={{
                background: C.card1, borderRadius: "24px 24px 0 0",
                padding: "8px 20px 40px",
                animation: "slideUp .35s cubic-bezier(0.16,1,0.3,1) both"
            }}>
                <div style={{ width: px(40), height: px(4), background: C.border, borderRadius: px(2), margin: "8px auto 20px" }} />
                <div style={{ fontFamily: F.serif, fontWeight: 700, fontSize: px(18), color: C.textPrimary, marginBottom: px(8) }}>{sheet.title}</div>
                {sheet.body && <div style={{ fontFamily: F.sans, fontSize: px(13), color: C.textSecondary, lineHeight: 1.6, marginBottom: px(20) }}>{sheet.body}</div>}
                <button onClick={onConfirm} style={{
                    ...cta(sheet.danger ? C.danger : C.clay, {}),
                    marginBottom: px(10)
                }}>{sheet.confirmLabel || "Confirm"}</button>
                <button onClick={onCancel} style={ghostCta(C.textSecondary, {})}>{sheet.cancelLabel || "Cancel"}</button>
            </div>
        </div>
    );
}

// Skeleton card loader
function SkeletonCard({ h = 72, r = 16 }) {
    return <div className="skel" style={{ height: px(h), borderRadius: px(r), marginBottom: px(10) }} />;
}

// Primary CTA with loading spinner
function LoadingCTA({ label, color, onClick, icon, disabled, extra = {} }) {
    const [loading, setLoading] = useState(false);
    const handleClick = () => {
        if (loading || disabled) return;
        setLoading(true);
        setTimeout(() => { setLoading(false); if (onClick) onClick(); }, 1400);
    };
    return (
        <button onClick={handleClick} disabled={disabled} style={{
            ...cta(color || C.clay, extra),
            opacity: disabled ? 0.5 : 1,
            cursor: disabled ? "not-allowed" : "pointer"
        }}>
            {loading
                ? <div style={{ width: px(20), height: px(20), border: "2px solid rgba(255,255,255,.25)", borderTop: "2px solid #fff", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                : <>{icon && icon}{label}</>}
        </button>
    );
}

// CountUp Component for animated numbers (dashboards)
function AnimatedNumber({ value, suffix = "", prefix = "₹", delay = 0 }) {
    const [displayVal, setDisplayVal] = useState(0);
    const num = parseInt(value.replace(/,/g, ''));
    
    useEffect(() => {
        let startTime = null;
        const duration = 1200; // ms
        let raf;
        
        const animate = (t) => {
            if (!startTime) startTime = t;
            const progress = (t - startTime) / duration;
            if (progress < 1) {
                // easeOutQuart
                const easeOut = 1 - Math.pow(1 - progress, 4);
                setDisplayVal(Math.floor(num * easeOut));
                raf = requestAnimationFrame(animate);
            } else {
                setDisplayVal(num);
            }
        };
        
        const timer = setTimeout(() => {
            raf = requestAnimationFrame(animate);
        }, delay);
        
        return () => { clearTimeout(timer); cancelAnimationFrame(raf); };
    }, [num, delay]);
    
    return <span>{prefix}{displayVal.toLocaleString()}{suffix}</span>;
}

// Pre-login / Role select shared top header
function PreLoginHeader({ go, back, step = 1, showBack = false }) {
    return (
        <>
            <SB />
            <div style={{ padding: "0 16px 14px", display: "flex", alignItems: "center", borderBottom: `1px solid ${C.border}` }}>
                {showBack ? (
                    <button onClick={back} style={{ display: "flex", alignItems: "center", gap: px(5), background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(10), padding: "6px 12px 6px 8px", color: C.textPrimary }}>
                        {I.back(C.textPrimary, 15)}
                        <span style={{ fontFamily: F.sans, fontSize: px(13), fontWeight: 600 }}>Back</span>
                    </button>
                ) : <div style={{ width: px(70) }} />}
                
                <div style={{ flex: 1, display: "flex", justifyContent: "center", gap: px(4) }}>
                    {[1, 2, 3, 4].map(s => (
                        <div key={s} style={{ width: s === step ? px(16) : px(6), height: px(4), borderRadius: px(2), background: s === step ? C.clay : s < step ? "rgba(200,75,12,.3)" : C.card2, transition: "all .3s" }} />
                    ))}
                </div>
                
                <div style={{ width: px(70), display: "flex", justifyContent: "flex-end" }}>
                    {step < 4 && <button onClick={() => go("s04")} style={{ background: "none", fontFamily: F.sans, fontSize: px(12), color: C.textMuted }}>Skip</button>}
                </div>
            </div>
        </>
    );
}

// Role Dashboard Header Wrapper
function RoleHeader({ children, role, name, title }) {
    const rc = roleColor[role] || C.clay;
    const rl = roleLabel[role];
    return (
        <div style={{ padding: "0 16px 16px", borderBottom: `1px solid ${C.border}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                    <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted, marginBottom: px(2) }}>{title}</div>
                    <div style={{ fontFamily: F.serif, fontWeight: 700, fontSize: px(20), color: C.textPrimary, letterSpacing: "-0.3px" }}>{name}</div>
                </div>
                <div style={{
                    background: rc + "18", color: rc,
                    border: `1px solid ${rc}40`,
                    fontFamily: F.mono, fontSize: px(10), letterSpacing: "0.5px",
                    padding: "4px 10px", borderRadius: px(6),
                    display: "inline-flex", alignItems: "center"
                }}>
                    {rl}
                </div>
            </div>
            {children}
        </div>
    );
}



// =========================================================================
// SHARED ONBOARDING SCREENS
// =========================================================================

// S01 - SPLASH
function S01({ go }) {
    useEffect(() => { const t = setTimeout(() => go("s02"), 2500); return () => clearTimeout(t); }, [go]);
    return (
        <div className="sc" style={{ background: C.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative" }}>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: px(280), height: px(280), background: "radial-gradient(circle 140px at center,rgba(200,75,12,.15),transparent)", borderRadius: "50%", pointerEvents: "none" }} />
            <div style={{ width: px(86), height: px(86), borderRadius: px(26), background: "linear-gradient(135deg, #C84B0C, #8C3004)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 12px 30px rgba(200,75,12,.35)", marginBottom: px(24), zIndex: 1 }}>
                {I.cross("#fff", 44)}
            </div>
            <div style={{ fontFamily: F.mono, fontSize: px(11), color: C.textMuted, letterSpacing: "2.5px" }}>YOUR LOAN.</div>
            <div style={{ fontFamily: F.mono, fontSize: px(11), color: C.clay, letterSpacing: "2px", marginTop: px(4) }}>OUR PRESCRIPTION.</div>
            <div style={{ position: "absolute", bottom: px(60), display: "flex", gap: px(8) }}>
                {[1, 0, 0].map((a, i) => <div key={i} style={{ width: a ? px(24) : px(6), height: px(6), borderRadius: px(3), background: a ? C.clay : C.card2, transition: "width .3s" }} />)}
            </div>
        </div>
    );
}

// S02 - WHY CHOOSE US
function S02({ go, back }) {
    return (
        <div className="sc" style={{ background: C.bg, display: "flex", flexDirection: "column" }}>
            <PreLoginHeader go={go} back={back} step={2} showBack={true} />
            <div style={{ height: px(200), display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                <div style={{ position: "absolute", width: px(160), height: px(160), borderRadius: "50%", border: "1.5px dashed rgba(200,75,12,.2)", animation: "spin 20s linear infinite" }} />
                <div style={{ position: "absolute", width: px(110), height: px(110), borderRadius: "50%", border: "1.5px dashed rgba(76,201,160,.2)", animation: "spin 15s linear infinite reverse" }} />
                <div style={{ width: px(64), height: px(64), borderRadius: px(20), background: C.card1, border: `1px solid ${C.clay}`, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }}>{I.cross(C.clay, 32)}</div>
                <div style={{ position: "absolute", bottom: px(20), ...chip(C.card1, C.textPrimary, C.clay) }}>TRUSTED BY 50,000+ USERS</div>
            </div>
            <div style={{ padding: "0 24px", flex: 1 }}>
                <div style={{ fontFamily: F.serif, fontWeight: 700, fontSize: px(26), color: C.textPrimary, lineHeight: 1.2, marginBottom: px(24) }}>We prescribe the perfect loan for you.</div>
                <div style={{ display: "flex", flexDirection: "column", gap: px(16) }}>
                    {[
                        { t: "AI Voice Matching", d: "Just speak to our bot to find eligibility", i: I.mic(C.clay, 20), c: C.clay },
                        { t: "200+ Verified Schemes", d: "Central & State govt subsidies", i: I.list(C.teal, 20), c: C.teal },
                        { t: "6 Indian Languages", d: "Hindi, Tamil, Marathi & more", i: I.chat(C.amber, 20), c: C.amber }
                    ].map((f, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: px(16) }}>
                            <div style={{ width: px(44), height: px(44), borderRadius: px(14), background: f.c + "15", border: `1px solid ${f.c}40`, display: "flex", alignItems: "center", justifyContent: "center" }}>{f.i}</div>
                            <div>
                                <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: px(16), color: C.textPrimary }}>{f.t}</div>
                                <div style={{ fontFamily: F.sans, fontSize: px(13), color: C.textMuted }}>{f.d}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div style={{ padding: "0 24px 34px" }}>
                <button onClick={() => go("s03")} style={cta(C.clay)}>Get Started →</button>
            </div>
        </div>
    );
}

// S03 - LANGUAGE SELECT
function S03({ go, back }) {
    const langs = ["English", "हिंदी", "தமிழ்", "తెలుగు", "मराठी", "ਪੰਜਾਬੀ"];
    const [sel, setSel] = useState(0);
    return (
        <div className="sc" style={{ background: C.bg, display: "flex", flexDirection: "column" }}>
            <PreLoginHeader go={go} back={back} step={3} showBack={true} />
            <div style={{ padding: "16px 24px", flex: 1 }}>
                <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: px(12), color: C.textMuted, marginBottom: px(8) }}>STEP 1 OF 2</div>
                <div style={{ fontFamily: F.serif, fontWeight: 700, fontSize: px(26), color: C.textPrimary, lineHeight: 1.2, marginBottom: px(24) }}>Choose your preferred language</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: px(14) }}>
                    {langs.map((l, i) => {
                        const a = sel === i;
                        return (
                            <div key={i} onClick={() => setSel(i)} style={{ background: a ? "rgba(200,75,12,.08)" : C.card1, border: `1.5px solid ${a ? C.clay : C.border}`, borderRadius: px(14), padding: "20px 16px", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", transition: "all .2s" }}>
                                {a && <div style={{ position: "absolute", top: px(-8), right: px(-8), width: px(24), height: px(24), borderRadius: "50%", background: C.clay, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,.3)", animation: "popIn .3s cubic-bezier(.16,1,.3,1)" }}>{I.check("#fff", 14)}</div>}
                                <span style={{ fontFamily: a ? F.serif : F.sans, fontWeight: a ? 700 : 500, fontSize: px(18), color: a ? C.clay : C.textPrimary }}>{l}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div style={{ padding: "0 24px 34px" }}>
                <button onClick={() => go("s04")} style={cta(C.clay)}>Continue in {langs[sel]}</button>
            </div>
        </div>
    );
}

// S04 - ROLE SELECT (PROTOTYPE ENTRY)
function S04({ selectRole, back }) {
    const roles = [
        { id: "customer", i: "👤", n: "Customer", d: "Apply for loans & track status", c: C.clay },
        { id: "sales_exec", i: "🤝", n: "Sales Executive", d: "Create leads & collect documents", c: C.teal },
        { id: "team_leader", i: "👥", n: "Team Leader", d: "Manage team & track performance", c: C.amber },
        { id: "franchisee", i: "🏢", n: "Franchisee", d: "Oversee branch & revenue", c: C.purple },
        { id: "admin", i: "⚙️", n: "Administrator", d: "Full system control", c: C.blue }
    ];
    const [sel, setSel] = useState("customer");
    
    return (
        <div className="sc" style={{ background: C.bg, display: "flex", flexDirection: "column" }}>
            <PreLoginHeader go={()=>{}} back={back} step={4} showBack={true} />
            <div style={{ padding: "16px 24px 0" }}>
                <div style={{ fontFamily: F.serif, fontWeight: 700, fontSize: px(24), color: C.textPrimary, lineHeight: 1.2 }}>Prototype Roles</div>
                <div style={{ fontFamily: F.sans, fontSize: px(13), color: C.textMuted, marginTop: px(8), marginBottom: px(20) }}>Select a role to preview that specific app experience. In the real app, this is determined by login credentials.</div>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "0 24px", display: "flex", flexDirection: "column", gap: px(12) }}>
                {roles.map(r => {
                    const a = sel === r.id;
                    return (
                        <div key={r.id} onClick={() => setSel(r.id)} style={{ background: a ? r.c + "10" : C.card1, border: `1.5px solid ${a ? r.c : C.border}`, borderRadius: px(14), padding: "16px", display: "flex", alignItems: "center", gap: px(16), position: "relative", transition: "all .2s" }}>
                            {a && <div style={{ position: "absolute", top: px(-6), right: px(-6), width: px(22), height: px(22), borderRadius: "50%", background: r.c, display: "flex", alignItems: "center", justifyContent: "center", animation: "popIn .3s cubic-bezier(.16,1,.3,1)" }}>{I.check("#fff", 12)}</div>}
                            <div style={{ width: px(46), height: px(46), borderRadius: px(12), background: C.card2, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: px(22) }}>{r.i}</div>
                            <div>
                                <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: px(15), color: a ? r.c : C.textPrimary }}>{r.n}</div>
                                <div style={{ fontFamily: F.sans, fontSize: px(12), color: C.textMuted, marginTop: px(2) }}>{r.d}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div style={{ padding: "20px 24px 34px", background: `linear-gradient(translate, transparent, ${C.bg})` }}>
                <button onClick={() => selectRole(sel)} style={cta(roles.find(r => r.id === sel).c)}>Enter as {roles.find(r => r.id === sel).n}</button>
            </div>
        </div>
    );
}

// =========================================================================
// ROLE 1 - CUSTOMER APP (Accent: CLAY)
// =========================================================================

// S06 - Voice AI Welcome
function S06({ go }) {
    const bars = [11, 21, 28, 20, 30, 17, 24, 13];
    return (
        <div className="sc" style={{ background: "#0E1210", display: "flex", flexDirection: "column", alignItems: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "38%", left: "50%", transform: "translate(-50%,-50%)", width: px(280), height: px(280), background: "radial-gradient(circle 140px at center,rgba(76,201,160,.08),transparent)", borderRadius: "50%", pointerEvents: "none" }} />
            <SB />
            <div style={{ padding: "0 16px 8px", display: "flex", width: "100%", justifyContent: "flex-end" }}>
                 <button onClick={() => go("s09")} style={{ background: "none", fontFamily: F.sans, fontSize: px(12), color: C.textMuted }}>Talk to Person</button>
            </div>
            
            <div style={{ textAlign: "center", marginTop: px(6) }}>
                <div style={{ fontFamily: F.mono, fontSize: px(9), color: C.teal, letterSpacing: "1.5px" }}>AI ADVISOR ACTIVE</div>
                <div style={{ fontFamily: F.serif, fontWeight: 600, fontSize: px(20), color: C.textPrimary, marginTop: px(4) }}>नमस्ते, Rahul!</div>
            </div>
            <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", marginTop: px(30), width: px(138), height: px(138) }}>
                {["rA", "rB", "rC"].map((a, i) => (
                    <div key={i} style={{ position: "absolute", width: px(138 - i * 24), height: px(138 - i * 24), borderRadius: "50%", border: `1px solid rgba(76,201,160,${[.06, .12, .18][2 - i]})`, animation: `${a} 2.4s ease-in-out ${[.8, .4, 0][i]}s infinite` }} />
                ))}
                <div style={{ width: px(68), height: px(68), borderRadius: "50%", background: "#1C2A23", border: `1.5px solid ${C.teal}`, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }}>
                    {I.cross(C.teal, 28)}
                </div>
            </div>
            <div style={{ margin: "22px 20px 0", background: C.card1, border: `1px solid ${C.border}`, borderRadius: "12px 12px 12px 3px", padding: "12px 14px", position: "relative", zIndex: 2 }}>
                <div style={{ fontFamily: F.mono, fontSize: px(8), color: C.teal, marginBottom: px(5) }}>LOAN DOCTOR AI</div>
                <div style={{ fontFamily: F.sans, fontSize: px(12), color: C.textPrimary, lineHeight: 1.5 }}>नमस्ते Rahul! आप किस तरह का loan लेना चाहते हैं? Amount और purpose बताइए।</div>
            </div>
            <div style={{ display: "flex", gap: px(3), alignItems: "center", marginTop: px(20), height: px(32) }}>
                {bars.map((h, i) => <div key={i} style={{ width: px(3), height: px(h), background: C.teal, borderRadius: px(2), transformOrigin: "bottom", animation: `sBar .9s ease-in-out ${i * .08}s infinite` }} />)}
            </div>
            <div style={{ fontFamily: F.mono, fontSize: px(8), color: C.textMuted, marginTop: px(5) }}>AI SPEAKING…</div>

            <div style={{ flex: 1 }} />

            <button onClick={() => go("s07")} style={{ width: px(52), height: px(52), borderRadius: "50%", background: C.clay, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 5px 22px rgba(200,75,12,.4)", marginBottom: px(8), zIndex: 2 }}>
                {I.mic("#fff", 22)}
            </button>
            <div style={{ fontFamily: F.mono, fontSize: px(8), color: C.textMuted, marginBottom: px(30), zIndex: 2 }}>Tap to respond</div>
        </div>
    );
}

// S07 - Full Chatbot Interface
function S07({ go, back, setSchemeData, isOverlay, onCloseModal }) {
    const defaultFlow = [
        { by: "ai", text: "नमस्ते! आपका स्वागत है। किस purpose के लिए loan चाहते हैं?", delay: 800 },
        { by: "user", text: "Business expand के लिए — कपड़े की दुकान है।", delay: 1800 },
        { by: "ai", text: "Business कितने साल पुराना है? Monthly turnover?", delay: 2800 },
        { by: "user", text: "3 साल पुराना, ₹40,000 monthly।", delay: 4200 },
        { by: "ai", text: "Aadhaar, PAN, 6 months bank statement available?", delay: 5200 },
        { by: "user", text: "हाँ, सब available हैं।", delay: 6500 },
        { by: "ai", text: "Perfect! Profile analyse हो रहा है…", delay: 7500 },
        { by: "ai", type: "result", delay: 9500 }
    ];

    const [msgs, setMsgs] = useState([]);
    const bottomRef = useRef(null);

    useEffect(() => {
        let maxT = 0;
        const timers = defaultFlow.map((m) => {
            if (m.delay > maxT) maxT = m.delay;
            return setTimeout(() => setMsgs(prev => [...prev, m]), m.delay);
        });
        return () => timers.forEach(clearTimeout);
    }, []);

    useEffect(() => { if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: "smooth" }); }, [msgs.length]);

    const B_MATCH = { t: "MUDRA Tarun Loan", s: "PM Mudra Yojana", a: "₹10L", r: "8.5%", e: "5 Year", tag: "BEST MATCH" };

    return (
        <div className="sc" style={{ background: C.bg, display: "flex", flexDirection: "column", zIndex: isOverlay ? 100 : 1 }}>
            {!isOverlay && <SB />}
            
            <div style={{ padding: `${isOverlay ? px(24) : 0} 16px 14px`, display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${C.border}`, background: C.bg }}>
                <div style={{ display: "flex", alignItems: "center", gap: px(10) }}>
                    <button onClick={isOverlay ? onCloseModal : back} style={{ display: "flex", alignItems: "center", gap: px(5), background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(10), padding: "6px 12px 6px 8px", color: C.textPrimary }}>
                        {isOverlay ? I.cross(C.textPrimary, 15) : I.back(C.textPrimary, 15)}
                        <span style={{ fontFamily: F.sans, fontSize: px(13), fontWeight: 600 }}>{isOverlay ? "Close" : "Back"}</span>
                    </button>
                    <div style={{ display: "flex", alignItems: "center", gap: px(8) }}>
                        <div style={{ width: px(30), height: px(30), borderRadius: "50%", background: "#1C2A23", border: `1px solid ${C.teal}`, display: "flex", alignItems: "center", justifyContent: "center" }}>{I.cross(C.teal, 12)}</div>
                        <div>
                            <div style={{ fontFamily: F.serif, fontWeight: 700, fontSize: px(14), color: C.textPrimary }}>Loan Doctor AI</div>
                            <div style={{ display: "flex", alignItems: "center", gap: px(4) }}>
                                <div style={{ width: px(4), height: px(4), borderRadius: "50%", background: C.teal, animation: "blink 1.2s infinite" }} />
                                <span style={{ fontFamily: F.sans, fontSize: px(10), color: C.teal }}>Live Matchmaking</span>
                            </div>
                        </div>
                    </div>
                </div>
                {!isOverlay && <button onClick={() => go("s09")} style={{ border: `1px solid ${C.clay}`, background: "transparent", color: C.clay, borderRadius: px(6), padding: "4px 8px", fontFamily: F.sans, fontWeight: 600, fontSize: px(10) }}>Specialist</button>}
            </div>

            <div className="hide-scroll" style={{ flex: 1, padding: "20px 16px 80px", overflowY: "auto", display: "flex", flexDirection: "column", gap: px(16) }}>
                {msgs.map((m, i) => {
                    if (m.type === "result") {
                        return (
                            <div key={i} style={{ width: "100%", animation: "msgIn .3s forwards" }}>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: px(6), marginBottom: px(20), marginTop: px(10) }}>
                                    <div style={{ height: px(1), flex: 1, background: C.border }} />
                                    <div style={chip(C.card2, C.teal, C.teal + "40")}><span style={{ width: px(4), height: px(4), borderRadius: "50%", background: C.teal, marginRight: px(4), animation: "blink 1s infinite" }} />AI MATCHED 3 SCHEMES</div>
                                    <div style={{ height: px(1), flex: 1, background: C.border }} />
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", gap: px(12) }}>
                                    {[
                                        B_MATCH,
                                        { t: "CGTMSE Scheme", s: "Min. of MSME", a: "₹5L", r: "9.2%", e: "7 Year" },
                                        { t: "PM SVANidhi", s: "Min. Housing & Urban", a: "₹5L", r: "7.0%", e: "3 Year" }
                                    ].map((r, k) => (
                                        <button key={k} onClick={() => { setSchemeData(r); if(isOverlay) onCloseModal(); go("scheme_detail"); }} style={{ width: "100%", textAlign: "left", background: r.tag ? "rgba(200,75,12,.035)" : C.card1, border: `1px solid ${r.tag ? C.clay : C.border}`, borderRadius: px(14), padding: "14px", position: "relative" }}>
                                            {r.tag && <div style={{ position: "absolute", top: px(-8), right: px(10), ...chip(C.clay, "#fff", "transparent"), padding: "2px 6px" }}>🔥 {r.tag}</div>}
                                            <div style={{ display: "flex", alignItems: "center", gap: px(12), marginBottom: px(10) }}>
                                                <div style={{ width: px(36), height: px(36), borderRadius: px(10), background: C.card2, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>{I.cross(r.tag ? C.clay : C.textPrimary, 16)}</div>
                                                <div>
                                                    <div style={{ fontFamily: F.sans, fontWeight: 700, fontSize: px(14), color: C.textPrimary }}>{r.t}</div>
                                                    <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted }}>{r.s}</div>
                                                </div>
                                            </div>
                                            <div style={{ display: "flex", gap: px(8) }}>
                                                {[{l: "Amount", v: `Up to ${r.a}`, c: C.clay}, {l: "Rate", v: r.r, c: C.teal}].map((x, j) => (
                                                    <div key={j} style={{ flex: 1, background: C.bg, border: `1px solid ${C.border}`, borderRadius: px(8), padding: "8px 10px" }}>
                                                        <div style={{ fontFamily: F.sans, fontSize: px(9), color: C.textMuted }}>{x.l}</div>
                                                        <div style={{ fontFamily: F.mono, fontWeight: 600, fontSize: px(12), color: x.c, marginTop: px(2) }}>{x.v}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </button>
                                    ))}
                                    <button onClick={() => { if(isOverlay) onCloseModal(); go("schemes_browse"); }} style={cta(C.card2, { border: `1px solid ${C.border}`, color: C.textPrimary, marginTop: px(8) })}>Explore All Schemes →</button>
                                    {!isOverlay && <button onClick={() => go("s09")} style={{ fontFamily: F.sans, fontSize: px(12), color: C.textMuted, background: "none", borderBottom: `1px solid ${C.textMuted}`, paddingBottom: px(2), margin: "16px auto" }}>Not satisfied? Talk to a specialist →</button>}
                                </div>
                            </div>
                        );
                    }
                    return (
                        <div key={i} style={{ alignSelf: m.by === "user" ? "flex-end" : "flex-start", maxWidth: "80%", animation: "msgIn .25s forwards", transformOrigin: m.by === "user" ? "bottom right" : "bottom left" }}>
                            <div style={{ background: m.by === "user" ? C.clay : C.card1, border: m.by === "ai" ? `1px solid rgba(76,201,160,.2)` : "none", borderRadius: m.by === "user" ? "14px 14px 3px 14px" : "14px 14px 14px 3px", padding: "12px 14px", fontFamily: F.sans, fontSize: px(13), color: "#fff", lineHeight: 1.4 }}>
                                {m.text}
                            </div>
                            <div style={{ fontFamily: F.sans, fontSize: px(9), color: C.textMuted, marginTop: px(6), textAlign: m.by === "user" ? "right" : "left" }}>
                                {m.by === "user" ? "Delivered" : "AI matched"}
                            </div>
                        </div>
                    );
                })}
                {msgs.length < defaultFlow.length && <div style={{ display: "flex", gap: px(4), padding: px(12) }}>{[1, 2, 3].map(i => <div key={i} style={{ width: px(6), height: px(6), borderRadius: "50%", background: C.teal, animation: `blink 1s infinite ${i * .2}s` }} />)}</div>}
                <div ref={bottomRef} />
            </div>

            <div style={{ position: "absolute", bottom: 0, width: "100%", padding: "16px", background: `linear-gradient(translate, transparent, ${C.bg} 20%)` }}>
                <div style={{ height: px(52), background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(26), padding: "4px 4px 4px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontFamily: F.sans, fontSize: px(13), color: C.textMuted }}>Type or tap mic…</span>
                    <button style={{ width: px(44), height: px(44), borderRadius: "50%", background: C.clay, display: "flex", alignItems: "center", justifyContent: "center" }}>{I.mic("#fff", 20)}</button>
                </div>
            </div>
        </div>
    );
}

// SchemesBrowser — pre and post purchase (Blinkit-style)
function SchemesBrowser({ go, hasPurchase }) {
    const [tab, setTab] = useState("central");
    const [category, setCategory] = useState("business");

    const central = {
        business: [
            { name: "MUDRA Tarun", ministry: "PM Mudra Yojana", amount: "₹10L", rate: "8.5%", tenure: "5yr", tag: "🔥 Popular" },
            { name: "MUDRA Kishore", ministry: "PM Mudra Yojana", amount: "₹5L", rate: "8.2%", tenure: "5yr" },
            { name: "CGTMSE", ministry: "Min. of MSME", amount: "₹5L", rate: "9.2%", tenure: "7yr", tag: "No Collateral" }
        ],
        traders: [
            { name: "PM SVANidhi", ministry: "Min. Housing", amount: "₹5L", rate: "7%", tenure: "3yr", tag: "⚡ Fast" },
            { name: "MUDRA Shishu", ministry: "PM Mudra Yojana", amount: "₹50K", rate: "Low", tenure: "3yr" }
        ],
        agri: [
            { name: "Kisan Credit Card", ministry: "NABARD", amount: "₹3L", rate: "4%", tenure: "1yr", tag: "⚡ Fast" },
            { name: "PM Fasal Bima", ministry: "Min. Agriculture", amount: "Crop cover", rate: "1.5%", tenure: "-" }
        ],
        women: [
            { name: "Mahila Udyam Nidhi", ministry: "SIDBI", amount: "₹10L", rate: "7.5%", tenure: "10yr", tag: "Women Only" },
            { name: "Stree Shakti", ministry: "SBI", amount: "₹25L", rate: "0.5% off", tenure: "5yr" }
        ]
    };

    const state = {
        business: [
            { name: "TNSCB Business Loan", ministry: "Govt. of Tamil Nadu", amount: "₹3L", rate: "6.5%", tenure: "5yr" },
            { name: "MSME Tamil Nadu", ministry: "MSME Dept. TN", amount: "₹10L", rate: "8%", tenure: "7yr", tag: "State Special" }
        ],
        startups: [
            { name: "Kalaignar Startup Scheme", ministry: "TN Startup", amount: "₹5L", rate: "0%", tenure: "3yr", tag: "0% Interest" }
        ],
        agri: [
            { name: "NABARD Rural TN", ministry: "NABARD", amount: "₹2L", rate: "4%", tenure: "2yr" }
        ]
    };

    const data = tab === "central" ? central : state;

    const renderRow = (list) =>
        list.map((s, idx) => (
            <button
                key={idx}
                onClick={() =>
                    go("scheme_detail", {
                        t: s.name,
                        s: s.ministry,
                        a: s.amount,
                        r: s.rate,
                        e: s.tenure,
                        tag: s.tag
                    })
                }
                style={{
                    minWidth: px(152),
                    background: C.card1,
                    borderRadius: px(14),
                    border: `1px solid ${C.border}`,
                    padding: "12px 12px 10px",
                    marginRight: px(10),
                    textAlign: "left"
                }}
            >
                {s.tag && (
                    <div
                        style={{
                            ...chip(C.clay, "#fff", "transparent"),
                            padding: "2px 6px",
                            position: "absolute"
                        }}
                    >
                        {s.tag}
                    </div>
                )}
                <div
                    style={{
                        width: px(34),
                        height: px(34),
                        borderRadius: px(10),
                        background: C.card2,
                        border: `1px solid ${C.border}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: px(8)
                    }}
                >
                    {I.cross(C.clay, 16)}
                </div>
                <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: px(13), color: C.textPrimary }}>{s.name}</div>
                <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted }}>{s.ministry}</div>
                <div style={{ display: "flex", marginTop: px(8), gap: px(4) }}>
                    <div
                        style={{
                            flex: 1,
                            borderRadius: px(8),
                            border: `1px solid ${C.border}`,
                            padding: "6px 8px",
                            background: C.bg
                        }}
                    >
                        <div style={{ fontFamily: F.sans, fontSize: px(9), color: C.textMuted }}>Amount</div>
                        <div style={{ fontFamily: F.mono, fontSize: px(11), fontWeight: 600, color: C.clay }}>{s.amount}</div>
                    </div>
                    <div
                        style={{
                            flex: 1,
                            borderRadius: px(8),
                            border: `1px solid ${C.border}`,
                            padding: "6px 8px",
                            background: C.bg
                        }}
                    >
                        <div style={{ fontFamily: F.sans, fontSize: px(9), color: C.textMuted }}>Rate</div>
                        <div style={{ fontFamily: F.mono, fontSize: px(11), fontWeight: 600, color: C.teal }}>{s.rate}</div>
                    </div>
                </div>
            </button>
        ));

    return (
        <div className="sc" style={{ background: C.bg, display: "flex", flexDirection: "column" }}>
            <SB />
            <div style={{ padding: "10px 16px 12px", borderBottom: `1px solid ${C.border}` }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: px(10) }}>
                    <div style={{ fontFamily: F.serif, fontWeight: 700, fontSize: px(18), color: C.textPrimary }}>Browse Schemes</div>
                    <div style={{ display: "flex", gap: px(8) }}>
                        <button
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: px(4),
                                borderRadius: px(16),
                                border: `1px solid ${C.border}`,
                                background: C.card1,
                                padding: "6px 10px",
                                fontFamily: F.sans,
                                fontSize: px(11),
                                color: C.textPrimary
                            }}
                        >
                            {I.pin(C.clay, 14)}
                            Chennai, TN
                        </button>
                        <button
                            style={{
                                width: px(32),
                                height: px(32),
                                borderRadius: px(12),
                                border: `1px solid ${C.border}`,
                                background: C.card1,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            {I.filter(C.textPrimary, 16)}
                        </button>
                    </div>
                </div>
                <div
                    style={{
                        height: px(40),
                        borderRadius: px(12),
                        border: `1px solid ${C.border}`,
                        background: C.card1,
                        padding: "0 10px",
                        display: "flex",
                        alignItems: "center",
                        gap: px(8)
                    }}
                >
                    {I.search(C.textMuted, 16)}
                    <span style={{ fontFamily: F.sans, fontSize: px(13), color: C.textMuted }}>Search by scheme, bank, ministry…</span>
                </div>
                <div
                    style={{
                        marginTop: px(10),
                        display: "flex",
                        borderRadius: px(999),
                        border: `1px solid ${C.border}`,
                        padding: px(3),
                        background: C.card1
                    }}
                >
                    {[
                        { id: "central", label: "Central Govt." },
                        { id: "state", label: "State (TN)" }
                    ].map((t) => {
                        const active = tab === t.id;
                        return (
                            <button
                                key={t.id}
                                onClick={() => setTab(t.id)}
                                style={{
                                    flex: 1,
                                    borderRadius: px(999),
                                    border: "none",
                                    background: active ? C.clay : "transparent",
                                    color: active ? "#fff" : C.textMuted,
                                    fontFamily: F.sans,
                                    fontSize: px(12),
                                    fontWeight: 600,
                                    padding: "6px 0"
                                }}
                            >
                                {t.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="hide-scroll" style={{ flex: 1, padding: "14px 16px 80px", overflowY: "auto" }}>
                <div style={{ fontFamily: F.mono, fontSize: px(9), color: C.textMuted, letterSpacing: "1.5px", marginBottom: px(8) }}>
                    CATEGORIES
                </div>
                <div style={{ display: "flex", gap: px(8), marginBottom: px(18), overflowX: "auto" }}>
                    {[
                        { id: "business", label: "Business Loans" },
                        { id: "traders", label: "Small Traders" },
                        { id: "agri", label: "Agriculture" },
                        { id: "women", label: "Women Schemes" },
                        { id: "startups", label: "Startups" }
                    ]
                        .filter((c) => (tab === "central" ? c.id !== "startups" : true))
                        .map((c) => {
                            const active = category === c.id;
                            return (
                                <button
                                    key={c.id}
                                    onClick={() => setCategory(c.id)}
                                    style={{
                                        padding: "8px 12px",
                                        borderRadius: px(999),
                                        border: `1px solid ${active ? C.clay : C.border}`,
                                        background: active ? "rgba(200,75,12,.1)" : C.card1,
                                        fontFamily: F.sans,
                                        fontSize: px(12),
                                        color: active ? C.clay : C.textPrimary
                                    }}
                                >
                                    {c.label}
                                </button>
                            );
                        })}
                </div>

                <div style={{ fontFamily: F.mono, fontSize: px(9), color: C.textMuted, letterSpacing: "1.5px", marginBottom: px(8) }}>
                    SCHEMES
                </div>
                <div style={{ display: "flex", overflowX: "auto", marginBottom: px(24) }}>
                    {renderRow(data[category] || [])}
                </div>
            </div>

            {!hasPurchase && (
                <button
                    onClick={() => go("s09")}
                    style={{
                        position: "absolute",
                        right: px(20),
                        bottom: px(80),
                        width: px(52),
                        height: px(52),
                        borderRadius: "50%",
                        background: C.clay,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        animation: "fabP 2s infinite",
                        boxShadow: "0 6px 20px rgba(200,75,12,.5)"
                    }}
                >
                    {I.person("#fff", 22)}
                </button>
            )}
        </div>
    );
}

// SchemeDetail — full scheme view with CTAs
function SchemeDetail({ go, back, scheme, hasPurchase }) {
    const s = scheme || {
        t: "MUDRA Tarun Loan",
        s: "PM Mudra Yojana",
        a: "₹10L",
        r: "8.5%",
        e: "5 Year",
        tag: "BEST MATCH"
    };

    return (
        <div className="sc" style={{ background: C.bg, display: "flex", flexDirection: "column" }}>
            <SB />
            <div style={{ padding: "0 16px 12px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <button
                    onClick={back}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: px(5),
                        background: C.card1,
                        border: `1px solid ${C.border}`,
                        borderRadius: px(10),
                        padding: "6px 12px 6px 8px",
                        color: C.textPrimary
                    }}
                >
                    {I.back(C.textPrimary, 15)}
                    <span style={{ fontFamily: F.sans, fontSize: px(13), fontWeight: 600 }}>Back</span>
                </button>
                {s.tag && <div style={chip(C.clay, "#fff", "transparent")}>{s.tag}</div>}
            </div>

            <div className="hide-scroll" style={{ flex: 1, padding: "18px 18px 110px", overflowY: "auto", display: "flex", flexDirection: "column", gap: px(18) }}>
                <div>
                    <div style={{ fontFamily: F.serif, fontWeight: 700, fontSize: px(22), color: C.textPrimary }}>{s.t}</div>
                    <div style={{ fontFamily: F.sans, fontSize: px(12), color: C.textMuted, marginTop: px(4) }}>{s.s}</div>
                </div>

                <div
                    style={{
                        borderRadius: px(16),
                        border: `1px solid ${C.border}`,
                        background: "linear-gradient(135deg,#151A13,#111510)",
                        padding: "14px 14px 12px",
                        position: "relative"
                    }}
                >
                    <div
                        style={{
                            position: "absolute",
                            top: px(10),
                            right: px(10),
                            ...chip("rgba(0,0,0,.55)", "#fff", "transparent"),
                            padding: "2px 8px",
                            fontSize: px(10)
                        }}
                    >
                        04:32
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: px(120) }}>
                        <div
                            style={{
                                width: px(52),
                                height: px(52),
                                borderRadius: "50%",
                                background: "rgba(0,0,0,.7)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow: "0 6px 20px rgba(0,0,0,.7)"
                            }}
                        >
                            {I.play("#fff", 26)}
                        </div>
                    </div>
                    <div style={{ marginTop: px(10) }}>
                        <div style={{ fontFamily: F.mono, fontSize: px(9), color: C.textMuted, letterSpacing: "1.5px" }}>SCHEME EXPLAINER</div>
                        <div style={{ fontFamily: F.sans, fontWeight: 500, fontSize: px(13), color: C.textPrimary, marginTop: px(4) }}>
                            How MUDRA Tarun works for small traders
                        </div>
                    </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: px(10) }}>
                    <div
                        style={{
                            borderRadius: px(12),
                            border: `1px solid ${C.border}`,
                            background: C.card1,
                            padding: "10px 10px 8px"
                        }}
                    >
                        <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted }}>Loan Amount</div>
                        <div style={{ fontFamily: F.mono, fontSize: px(14), fontWeight: 600, color: C.clay, marginTop: px(4) }}>{s.a}</div>
                    </div>
                    <div
                        style={{
                            borderRadius: px(12),
                            border: `1px solid ${C.border}`,
                            background: C.card1,
                            padding: "10px 10px 8px"
                        }}
                    >
                        <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted }}>Interest Rate</div>
                        <div style={{ fontFamily: F.mono, fontSize: px(14), fontWeight: 600, color: C.teal, marginTop: px(4) }}>{s.r}</div>
                    </div>
                    <div
                        style={{
                            borderRadius: px(12),
                            border: `1px solid ${C.border}`,
                            background: C.card1,
                            padding: "10px 10px 8px"
                        }}
                    >
                        <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted }}>Tenure</div>
                        <div style={{ fontFamily: F.mono, fontSize: px(14), fontWeight: 600, color: C.teal, marginTop: px(4) }}>{s.e}</div>
                    </div>
                    <div
                        style={{
                            borderRadius: px(12),
                            border: `1px solid ${C.border}`,
                            background: C.card1,
                            padding: "10px 10px 8px"
                        }}
                    >
                        <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted }}>Collateral</div>
                        <div style={{ fontFamily: F.mono, fontSize: px(14), fontWeight: 600, color: C.teal, marginTop: px(4) }}>None</div>
                    </div>
                </div>

                <div
                    style={{
                        borderRadius: px(14),
                        border: `1px solid ${C.border}`,
                        background: C.card1,
                        padding: "12px 12px 10px"
                    }}
                >
                    <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: px(13), color: C.textPrimary, marginBottom: px(6) }}>
                        ✅ Eligibility Checklist
                    </div>
                    {["Indian citizen, 18–65 years", "Business turnover within scheme limits", "No major loan defaults", "KYC and bank statement available"].map(
                        (item, idx) => (
                            <div key={idx} style={{ display: "flex", alignItems: "center", gap: px(8), marginTop: px(4) }}>
                                <div
                                    style={{
                                        width: px(18),
                                        height: px(18),
                                        borderRadius: "50%",
                                        background: "rgba(76,201,160,.15)",
                                        border: `1px solid ${C.teal}`,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}
                                >
                                    {I.check(C.teal, 12)}
                                </div>
                                <span style={{ fontFamily: F.sans, fontSize: px(12), color: C.textPrimary }}>{item}</span>
                            </div>
                        )
                    )}
                </div>

                <div
                    style={{
                        borderRadius: px(14),
                        border: `1px solid ${C.border}`,
                        background: C.card1,
                        padding: "12px 12px 10px"
                    }}
                >
                    <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: px(13), color: C.textPrimary, marginBottom: px(6) }}>
                        📄 Documents Required
                    </div>
                    {["Aadhaar Card", "PAN Card", "Recent Photograph", "6 months Bank Statement", "Project Report (DPR)", "Quotations", "Category Certificate (if applicable)"].map(
                        (item, idx) => (
                            <div key={idx} style={{ display: "flex", alignItems: "center", gap: px(6), marginTop: px(4) }}>
                                <div
                                    style={{
                                        width: px(6),
                                        height: px(6),
                                        borderRadius: "50%",
                                        background: C.clay
                                    }}
                                />
                                <span style={{ fontFamily: F.sans, fontSize: px(12), color: C.textPrimary }}>{item}</span>
                            </div>
                        )
                    )}
                </div>

                <div
                    style={{
                        borderRadius: px(14),
                        border: `1px solid ${C.border}`,
                        background: C.card1,
                        padding: "12px 12px 10px"
                    }}
                >
                    <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: px(13), color: C.textPrimary, marginBottom: px(6) }}>
                        ⚡ How It Works
                    </div>
                    {[
                        "Apply via Loan Doctor",
                        "Documents verified in 24 hours",
                        "Lender assigns case",
                        "Disbursed in 5–7 working days"
                    ].map((item, idx) => (
                        <div key={idx} style={{ display: "flex", alignItems: "center", gap: px(8), marginTop: px(4) }}>
                            <div
                                style={{
                                    width: px(18),
                                    height: px(18),
                                    borderRadius: "50%",
                                    background: "rgba(200,75,12,.12)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontFamily: F.mono,
                                    fontSize: px(10),
                                    color: C.clay
                                }}
                            >
                                {idx + 1}
                            </div>
                            <span style={{ fontFamily: F.sans, fontSize: px(12), color: C.textPrimary }}>{item}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ position: "absolute", bottom: 0, width: "100%", padding: "12px 18px 18px", background: `linear-gradient(translate, transparent, ${C.bg})` }}>
                {!hasPurchase ? (
                    <>
                        <button
                            onClick={() => go("payment", { scheme: s })}
                            style={cta(C.clay, { marginBottom: px(8) })}
                        >
                            Continue &amp; Buy — Apply for {s.t}
                        </button>
                        <button
                            onClick={() => go("specialist_confirm")}
                            style={{
                                ...ghostCta(C.textPrimary),
                                borderRadius: px(13),
                                border: `1px solid ${C.border}`
                            }}
                        >
                            Consult a Specialist First
                        </button>
                    </>
                ) : (
                    <button onClick={() => go("payment", { scheme: s })} style={cta(C.clay)}>
                        Apply for {s.t}
                    </button>
                )}
            </div>
        </div>
    );
}

// Minimal SpecialistConfirm + SpecialistBooked + CallBooked + Payment + PaySuccess + MarketingHome
function SpecialistConfirm({ go, back, scheme }) {
    const s = scheme || { t: "MUDRA Tarun Loan" };
    const [slot, setSlot] = useState("10:00 AM");

    const times = ["10:00 AM", "11:30 AM", "1:00 PM", "2:30 PM", "4:00 PM", "5:30 PM"];

    return (
        <div className="sc" style={{ background: C.bg, display: "flex", flexDirection: "column" }}>
            <SB />
            <RoleHeader role="customer" name="Rahul Kumar" title="Book consultation">
                <div style={{ fontFamily: F.sans, fontSize: px(12), color: C.textMuted, marginTop: px(8) }}>
                    Free 20-min call to clarify doubts before you apply.
                </div>
            </RoleHeader>
            <div className="hide-scroll" style={{ flex: 1, padding: "14px 16px 100px", overflowY: "auto", display: "flex", flexDirection: "column", gap: px(14) }}>
                <div
                    style={{
                        borderRadius: px(14),
                        border: `1px solid ${C.border}`,
                        background: C.card1,
                        padding: "12px 12px 10px",
                        display: "flex",
                        alignItems: "center",
                        gap: px(10)
                    }}
                >
                    <div
                        style={{
                            width: px(42),
                            height: px(42),
                            borderRadius: "50%",
                            background: C.card2,
                            border: `1px solid ${C.borderMid}`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        {I.person(C.clay, 20)}
                    </div>
                    <div>
                        <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: px(14), color: C.textPrimary }}>Ramesh K. — Senior Loan Advisor</div>
                        <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted }}>847 consultations · ★ 4.9</div>
                    </div>
                </div>

                <div>
                    <div style={{ fontFamily: F.mono, fontSize: px(9), color: C.textMuted, letterSpacing: "1.5px", marginBottom: px(8) }}>DATE</div>
                    <div style={{ display: "flex", gap: px(8), overflowX: "auto" }}>
                        {["Today", "Tomorrow", "Wed 5", "Thu 6", "Fri 7"].map((d, idx) => {
                            const active = idx === 1;
                            return (
                                <div
                                    key={d}
                                    style={{
                                        minWidth: px(80),
                                        padding: "8px 10px",
                                        borderRadius: px(10),
                                        border: `1px solid ${active ? C.clay : C.border}`,
                                        background: active ? "rgba(200,75,12,.1)" : C.card1,
                                        fontFamily: F.sans,
                                        fontSize: px(12),
                                        color: active ? C.clay : C.textPrimary,
                                        textAlign: "center"
                                    }}
                                >
                                    {d}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div>
                    <div style={{ fontFamily: F.mono, fontSize: px(9), color: C.textMuted, letterSpacing: "1.5px", marginBottom: px(8) }}>
                        TIME SLOT
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: px(8) }}>
                        {times.map((t) => {
                            const active = slot === t;
                            return (
                                <button
                                    key={t}
                                    onClick={() => setSlot(t)}
                                    style={{
                                        borderRadius: px(10),
                                        border: `1px solid ${active ? C.clay : C.border}`,
                                        background: active ? "rgba(200,75,12,.08)" : C.card1,
                                        padding: "10px 8px",
                                        fontFamily: F.sans,
                                        fontSize: px(12),
                                        color: active ? C.clay : C.textPrimary
                                    }}
                                >
                                    {t}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div>
                    <div style={{ fontFamily: F.mono, fontSize: px(9), color: C.textMuted, letterSpacing: "1.5px", marginBottom: px(6) }}>SCHEME</div>
                    <div
                        style={{
                            borderRadius: px(10),
                            border: `1px solid ${C.border}`,
                            background: C.card1,
                            padding: "10px 12px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between"
                        }}
                    >
                        <span style={{ fontFamily: F.sans, fontSize: px(13), color: C.textPrimary }}>{s.t}</span>
                        <span style={{ ...chip("rgba(200,75,12,.12)", C.clay, "transparent"), fontSize: px(9) }}>Prefilled</span>
                    </div>
                </div>
            </div>

            <div style={{ position: "absolute", bottom: 0, width: "100%", padding: "10px 16px 18px", background: `linear-gradient(translate, transparent, ${C.bg})` }}>
                <button onClick={() => go("specialist_booked")} style={cta(C.clay)}>
                    Confirm Consultation
                </button>
                <button
                    onClick={() => go("schemes_browse")}
                    style={{ ...ghostCta(C.textMuted), marginTop: px(8) }}
                >
                    Skip — Explore All Schemes
                </button>
            </div>
        </div>
    );
}

function SpecialistBooked({ go }) {
    return (
        <div className="sc" style={{ background: "#0E1210", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <SB />
            <div
                style={{
                    marginTop: px(80),
                    width: px(120),
                    height: px(120),
                    borderRadius: "50%",
                    background: "radial-gradient(circle 60px at center,rgba(76,201,160,.4),transparent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <div
                    style={{
                        width: px(62),
                        height: px(62),
                        borderRadius: "50%",
                        background: "#1C2A23",
                        border: `1.5px solid ${C.teal}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 10px 26px rgba(0,0,0,.7)"
                    }}
                >
                    {I.calendar ? I.calendar(C.teal, 30) : I.check(C.teal, 30)}
                </div>
            </div>
            <div style={{ marginTop: px(22), textAlign: "center", padding: "0 32px" }}>
                <div style={{ fontFamily: F.serif, fontWeight: 700, fontSize: px(22), color: C.textPrimary }}>Consultation Confirmed!</div>
                <div style={{ fontFamily: F.sans, fontSize: px(12), color: C.textMuted, marginTop: px(6) }}>
                    You’ll get a Google Meet link and WhatsApp reminder before the call.
                </div>
            </div>
            <div style={{ marginTop: px(26), width: "100%", padding: "0 24px", display: "flex", flexDirection: "column", gap: px(10) }}>
                <div
                    style={{
                        borderRadius: px(12),
                        border: `1px solid ${C.border}`,
                        background: C.card1,
                        padding: "10px 12px",
                        display: "flex",
                        alignItems: "center",
                        gap: px(8)
                    }}
                >
                    {I.wa(C.teal, 18)}
                    <div style={{ fontFamily: F.sans, fontSize: px(12), color: C.textPrimary }}>Google Meet link sent to WhatsApp</div>
                </div>
                <div
                    style={{
                        borderRadius: px(12),
                        border: `1px solid ${C.border}`,
                        background: C.card1,
                        padding: "10px 12px",
                        fontFamily: F.sans,
                        fontSize: px(12),
                        color: C.textPrimary
                    }}
                >
                    Date &amp; Time: Tomorrow · 4:00 PM · 20 minutes
                </div>
                <div
                    style={{
                        borderRadius: px(12),
                        border: `1px solid ${C.border}`,
                        background: C.card1,
                        padding: "10px 12px",
                        fontFamily: F.sans,
                        fontSize: px(12),
                        color: C.textPrimary
                    }}
                >
                    Ref: <span style={{ fontFamily: F.mono, color: C.teal }}>LD-CONSULT-2024-12 · MUDRA Tarun</span>
                </div>
            </div>
            <div style={{ flex: 1 }} />
            <div style={{ width: "100%", padding: "0 24px 26px" }}>
                <button onClick={() => go("schemes_browse")} style={cta(C.clay)}>
                    Explore All Schemes
                </button>
                <button
                    onClick={() => go("marketing_home")}
                    style={{ ...ghostCta(C.textMuted), marginTop: px(8) }}
                >
                    Go to Home
                </button>
            </div>
        </div>
    );
}

function CallBooked({ go }) {
    return (
        <div className="sc" style={{ background: "#0E1210", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <SB />
            <div
                style={{
                    marginTop: px(90),
                    width: px(120),
                    height: px(120),
                    borderRadius: "50%",
                    background: "radial-gradient(circle 60px at center,rgba(76,201,160,.4),transparent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <div
                    style={{
                        width: px(62),
                        height: px(62),
                        borderRadius: "50%",
                        background: "#1C2A23",
                        border: `1.5px solid ${C.teal}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 10px 26px rgba(0,0,0,.7)"
                    }}
                >
                    {I.call(C.teal, 28)}
                </div>
            </div>
            <div style={{ marginTop: px(22), textAlign: "center", padding: "0 32px" }}>
                <div style={{ fontFamily: F.serif, fontWeight: 700, fontSize: px(22), color: C.textPrimary }}>Callback Booked!</div>
                <div style={{ fontFamily: F.sans, fontSize: px(12), color: C.textMuted, marginTop: px(6) }}>
                    You’ll receive a call from Ramesh within your selected time window.
                </div>
            </div>
            <div style={{ marginTop: px(24), width: "100%", padding: "0 24px" }}>
                <div
                    style={{
                        borderRadius: px(12),
                        border: `1px solid ${C.border}`,
                        background: C.card1,
                        padding: "10px 12px",
                        fontFamily: F.sans,
                        fontSize: px(12),
                        color: C.textPrimary
                    }}
                >
                    Ref: <span style={{ fontFamily: F.mono, color: C.teal }}>LD-CALL-2024-041</span>
                </div>
            </div>
            <div style={{ flex: 1 }} />
            <div style={{ width: "100%", padding: "0 24px 26px" }}>
                <button onClick={() => go("marketing_home")} style={cta(C.clay)}>
                    Explore App While You Wait
                </button>
            </div>
        </div>
    );
}

function MarketingHome({ go }) {
    return (
        <div className="sc" style={{ background: C.bg, display: "flex", flexDirection: "column" }}>
            <SB />
            <div className="hide-scroll" style={{ flex: 1, padding: "16px 16px 90px", overflowY: "auto" }}>
                <div
                    style={{
                        borderRadius: px(18),
                        border: `1px solid ${C.border}`,
                        background: "radial-gradient(circle at top left,rgba(200,75,12,.4),#111510)",
                        padding: "16px 16px 14px",
                        marginBottom: px(18)
                    }}
                >
                    <div style={{ fontFamily: F.mono, fontSize: px(9), color: C.textMuted, letterSpacing: "1.5px" }}>ELIGIBILITY IN 2 MINUTES</div>
                    <div style={{ fontFamily: F.serif, fontWeight: 700, fontSize: px(20), color: C.textPrimary, marginTop: px(6) }}>
                        Let our AI match the perfect loan for you.
                    </div>
                    <div style={{ display: "flex", gap: px(10), marginTop: px(14) }}>
                        <button
                            onClick={() => go("s06")}
                            style={{
                                ...cta(C.clay, { width: "auto", padding: "0 14px" }),
                                height: px(42),
                                fontSize: px(13)
                            }}
                        >
                            Start AI Check →
                        </button>
                        <button
                            onClick={() => go("s09")}
                            style={{
                                ...ghostCta(C.textPrimary, { width: "auto", padding: "0 10px" }),
                                height: px(42)
                            }}
                        >
                            Talk to Specialist
                        </button>
                    </div>
                </div>

                <div
                    style={{
                        borderRadius: px(16),
                        border: `1px solid ${C.border}`,
                        background: C.card1,
                        padding: "12px 12px 10px",
                        marginBottom: px(16)
                    }}
                >
                    <div style={{ fontFamily: F.mono, fontSize: px(9), color: C.textMuted, letterSpacing: "1.5px", marginBottom: px(6) }}>
                        OUR TRACK RECORD
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        {[
                            { label: "Disbursed", value: "₹47Cr+" },
                            { label: "Customers", value: "50K+" },
                            { label: "Schemes", value: "200+" },
                            { label: "Satisfaction", value: "98%" }
                        ].map((m) => (
                            <div key={m.label} style={{ textAlign: "center", minWidth: px(70) }}>
                                <div style={{ fontFamily: F.mono, fontSize: px(13), color: C.clay }}>{m.value}</div>
                                <div style={{ fontFamily: F.sans, fontSize: px(10), color: C.textMuted }}>{m.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ marginBottom: px(16) }}>
                    <div style={{ fontFamily: F.mono, fontSize: px(9), color: C.textMuted, letterSpacing: "1.5px", marginBottom: px(8) }}>
                        LIVE OFFERS
                    </div>
                    <div style={{ display: "flex", overflowX: "auto", gap: px(10) }}>
                        {[
                            { title: "0% Processing Fee", tag: "Limited 7 days", color: C.clay },
                            { title: "Women Entrepreneur Bonus", tag: "Extra cash-back", color: C.teal }
                        ].map((o) => (
                            <div
                                key={o.title}
                                style={{
                                    minWidth: px(180),
                                    borderRadius: px(14),
                                    border: `1px solid ${C.border}`,
                                    background: C.card1,
                                    padding: "10px 12px"
                                }}
                            >
                                <div
                                    style={{
                                        ...chip(o.color + "25", o.color, "transparent"),
                                        animation: "badgeP 2s infinite",
                                        marginBottom: px(6)
                                    }}
                                >
                                    LIVE
                                </div>
                                <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: px(13), color: C.textPrimary }}>{o.title}</div>
                                <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted, marginTop: px(4) }}>{o.tag}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <div style={{ fontFamily: F.mono, fontSize: px(9), color: C.textMuted, letterSpacing: "1.5px", marginBottom: px(8) }}>
                        SUCCESS STORIES
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: px(10) }}>
                        {[
                            { name: "Priya Sharma", text: "Expanded her boutique with a ₹7L MUDRA loan in 6 weeks." },
                            { name: "Ravi Kumar", text: "Street vendor to shop owner via PM SVANidhi." }
                        ].map((s) => (
                            <div
                                key={s.name}
                                style={{
                                    borderRadius: px(14),
                                    border: `1px solid ${C.border}`,
                                    background: C.card1,
                                    padding: "10px 12px"
                                }}
                            >
                                <div style={{ display: "flex", alignItems: "center", gap: px(8), marginBottom: px(4) }}>
                                    <div
                                        style={{
                                            width: px(24),
                                            height: px(24),
                                            borderRadius: "50%",
                                            background: C.card2,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontFamily: F.sans,
                                            fontSize: px(11),
                                            color: C.textPrimary
                                        }}
                                    >
                                        {s.name
                                            .split(" ")
                                            .map((x) => x[0])
                                            .join("")}
                                    </div>
                                    <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: px(13), color: C.textPrimary }}>{s.name}</div>
                                </div>
                                <div style={{ fontFamily: F.sans, fontSize: px(12), color: C.textMuted }}>{s.text}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div style={{ position: "absolute", bottom: 0, width: "100%", padding: "10px 16px 18px", background: `linear-gradient(translate, transparent, ${C.bg})` }}>
                <button onClick={() => go("schemes_browse")} style={cta(C.clay)}>
                    See Eligible Schemes →
                </button>
            </div>
        </div>
    );
}

function PaymentScreen({ go, back, scheme }) {
    const [plan, setPlan] = useState("token");
    const tokenAmount = 999;
    const fullAmount = 10000;
    const payable = plan === "token" ? tokenAmount : fullAmount;

    return (
        <div className="sc" style={{ background: C.bg, display: "flex", flexDirection: "column" }}>
            <SB />
            <div style={{ padding: "0 16px 10px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <button
                    onClick={back}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: px(5),
                        background: C.card1,
                        border: `1px solid ${C.border}`,
                        borderRadius: px(10),
                        padding: "6px 12px 6px 8px",
                        color: C.textPrimary
                    }}
                >
                    {I.back(C.textPrimary, 15)}
                    <span style={{ fontFamily: F.sans, fontSize: px(13), fontWeight: 600 }}>Back</span>
                </button>
                <div style={{ fontFamily: F.sans, fontSize: px(12), color: C.textMuted }}>Secure Payment</div>
            </div>

            <div className="hide-scroll" style={{ flex: 1, padding: "16px 16px 110px", overflowY: "auto", display: "flex", flexDirection: "column", gap: px(14) }}>
                <div>
                    <div style={{ fontFamily: F.serif, fontWeight: 700, fontSize: px(20), color: C.textPrimary }}>Choose Your Plan</div>
                    {scheme && (
                        <div style={{ fontFamily: F.sans, fontSize: px(12), color: C.textMuted, marginTop: px(4) }}>For {scheme.t}</div>
                    )}
                </div>

                <div
                    onClick={() => setPlan("token")}
                    style={{
                        borderRadius: px(14),
                        border: `1.5px solid ${plan === "token" ? C.clay : C.border}`,
                        background: C.card1,
                        padding: "12px 12px 10px",
                        cursor: "pointer"
                    }}
                >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                            <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: px(14), color: C.textPrimary }}>Token Amount</div>
                            <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted, marginTop: px(3) }}>
                                Agent in 2 hrs · Document help · Application submission
                            </div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                            <div style={{ fontFamily: F.mono, fontSize: px(16), color: C.clay }}>₹{tokenAmount.toLocaleString()}</div>
                            <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted }}>one-time</div>
                        </div>
                    </div>
                </div>

                <div
                    onClick={() => setPlan("full")}
                    style={{
                        borderRadius: px(14),
                        border: `1.5px solid ${plan === "full" ? C.teal : C.border}`,
                        background: "linear-gradient(135deg,#1C2A1F,#111510)",
                        padding: "12px 12px 10px",
                        position: "relative",
                        cursor: "pointer"
                    }}
                >
                    <div
                        style={{
                            position: "absolute",
                            top: px(-8),
                            right: px(12),
                            ...chip(C.teal, "#fff", "transparent"),
                            padding: "2px 6px",
                            animation: "badgeP 2s infinite"
                        }}
                    >
                        RECOMMENDED
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                            <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: px(14), color: C.textPrimary }}>Full Service</div>
                            <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted, marginTop: px(3) }}>
                                Priority support · Dedicated agent · End-to-end till disbursement · 6 months follow-up
                            </div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                            <div style={{ fontFamily: F.mono, fontSize: px(16), color: C.teal }}>₹{fullAmount.toLocaleString()}</div>
                            <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted }}>one-time</div>
                        </div>
                    </div>
                </div>

                <div>
                    <div style={{ fontFamily: F.mono, fontSize: px(9), color: C.textMuted, letterSpacing: "1.5px", marginBottom: px(8) }}>PAYMENT METHOD</div>
                    <div style={{ display: "flex", gap: px(10) }}>
                        {["UPI / GPay", "Debit / Credit Card", "Net Banking"].map((m, idx) => (
                            <div
                                key={m}
                                style={{
                                    flex: 1,
                                    borderRadius: px(10),
                                    border: `1px solid ${idx === 0 ? C.clay : C.border}`,
                                    background: idx === 0 ? "rgba(200,75,12,.12)" : C.card1,
                                    padding: "10px 8px",
                                    fontFamily: F.sans,
                                    fontSize: px(11),
                                    color: idx === 0 ? C.clay : C.textPrimary,
                                    textAlign: "center"
                                }}
                            >
                                {m}
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: px(8), marginTop: px(8) }}>
                    {I.lock(C.textMuted, 14)}
                    <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted }}>
                        256-bit SSL · Razorpay Secured · We never store your card details
                    </div>
                </div>
            </div>

            <div style={{ position: "absolute", bottom: 0, width: "100%", padding: "10px 16px 20px", background: `linear-gradient(translate, transparent, ${C.bg})` }}>
                <button onClick={() => go("payment_success")} style={cta(C.clay)}>
                    Pay ₹{payable.toLocaleString()} Securely
                </button>
            </div>
        </div>
    );
}

function PaymentSuccess({ go }) {
    return (
        <div className="sc" style={{ background: "#0E1210", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <SB />
            <div
                style={{
                    marginTop: px(90),
                    width: px(130),
                    height: px(130),
                    borderRadius: "50%",
                    background: "radial-gradient(circle 70px at center,rgba(76,201,160,.4),transparent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <svg width={64} height={64} viewBox="0 0 52 52">
                    <circle
                        cx="26"
                        cy="26"
                        r="24"
                        fill="none"
                        stroke={C.teal}
                        strokeWidth="3"
                        strokeDasharray="150"
                        strokeDashoffset="150"
                        style={{ animation: "strokeIn 0.7s forwards" }}
                    />
                    <polyline
                        points="16,27 23,33 36,20"
                        fill="none"
                        stroke={C.teal}
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeDasharray="60"
                        strokeDashoffset="60"
                        style={{ animation: "strokeIn 0.7s 0.2s forwards" }}
                    />
                </svg>
            </div>
            <div style={{ marginTop: px(20), textAlign: "center", padding: "0 32px" }}>
                <div style={{ fontFamily: F.serif, fontWeight: 700, fontSize: px(22), color: C.textPrimary }}>Payment Successful!</div>
                <div style={{ fontFamily: F.sans, fontSize: px(12), color: C.textMuted, marginTop: px(6) }}>
                    Your Loan Doctor service is activated. A dedicated agent will contact you shortly.
                </div>
            </div>
            <div style={{ marginTop: px(24), width: "100%", padding: "0 24px", display: "flex", flexDirection: "column", gap: px(10) }}>
                <div
                    style={{
                        borderRadius: px(12),
                        border: `1px solid ${C.border}`,
                        background: C.card1,
                        padding: "10px 12px",
                        display: "flex",
                        alignItems: "center",
                        gap: px(8)
                    }}
                >
                    {I.doc(C.teal, 18)}
                    <div style={{ fontFamily: F.sans, fontSize: px(12), color: C.textPrimary }}>Invoice sent to your WhatsApp and email</div>
                </div>
                <div
                    style={{
                        borderRadius: px(12),
                        border: `1px solid ${C.border}`,
                        background: C.card1,
                        padding: "10px 12px",
                        display: "flex",
                        alignItems: "center",
                        gap: px(8)
                    }}
                >
                    {I.person(C.clay, 18)}
                    <div style={{ fontFamily: F.sans, fontSize: px(12), color: C.textPrimary }}>Ramesh K. assigned as your agent</div>
                </div>
                <div
                    style={{
                        borderRadius: px(12),
                        border: `1px solid ${C.border}`,
                        background: C.card1,
                        padding: "10px 12px",
                        fontFamily: F.sans,
                        fontSize: px(12),
                        color: C.textPrimary
                    }}
                >
                    Case Ref: <span style={{ fontFamily: F.mono, color: C.teal }}>LD-2024-038</span>
                </div>
            </div>
            <div style={{ flex: 1 }} />
            <div style={{ width: "100%", padding: "0 24px 26px" }}>
                <button onClick={() => go("customer_main")} style={cta(C.clay)}>
                    Open My Application
                </button>
            </div>
        </div>
    );
}

// Customer Main App Tabs (Home, Schemes, My App, Chat, Profile)
// ─── Shared bottom-nav renderer ───────────────────────────────────────────
function BottomNav({ items, navTab, onNav, accent }) {
    const ac = accent || C.clay;
    return (
        <div style={{
            position: "absolute", bottom: 0, left: 0, width: "100%",
            height: px(68), zIndex: 100,
            background: "rgba(15,15,15,0.96)",
            backdropFilter: "blur(24px)",
            borderTop: `1px solid ${C.border}`,
            display: "flex", alignItems: "center"
        }}>
            {items.map((it) => {
                const active = navTab === it.id;
                return (
                    <button
                        key={it.id}
                        onClick={() => onNav(it.id)}
                        className="tappable"
                        style={{
                            flex: 1, border: "none", background: "transparent",
                            display: "flex", flexDirection: "column",
                            alignItems: "center", gap: px(4), padding: "6px 0", cursor: "pointer"
                        }}
                    >
                        <div style={{
                            width: px(36), height: px(28), borderRadius: px(10),
                            display: "flex", alignItems: "center", justifyContent: "center",
                            background: active ? ac + "1A" : "transparent",
                            transition: "all .2s"
                        }}>
                            {it.icon(active ? ac : C.textMuted, 20)}
                        </div>
                        <span style={{
                            fontFamily: F.sans, fontWeight: 500, fontSize: px(9),
                            color: active ? ac : C.textMuted, lineHeight: 1
                        }}>{it.label}</span>
                    </button>
                );
            })}
        </div>
    );
}

function CustomerBottomNav({ navTab, onNav }) {
    return <BottomNav navTab={navTab} onNav={onNav} accent={C.clay} items={[
        { id: "home",    label: "Home",    icon: I.home   },
        { id: "schemes", label: "Schemes", icon: I.list   },
        { id: "my_app",  label: "My App",  icon: I.doc    },
        { id: "chat",    label: "Chat",    icon: I.chat   },
        { id: "profile", label: "Profile", icon: I.person }
    ]} />;
}

function CustomerHome({ onNav }) {
    return (
        <div className="sc" style={{ background: C.bg, position: "relative" }}>
            <SB />
            <div className="hide-scroll" style={{ padding: "10px 16px 90px", overflowY: "auto" }}>
                <RoleHeader role="customer" name="Rahul Kumar" title="Active application">
                    <div
                        style={{
                            marginTop: px(10),
                            borderRadius: px(12),
                            border: `1px solid ${C.clay}`,
                            background: C.card1,
                            padding: "10px 12px"
                        }}
                    >
                        <div style={{ fontFamily: F.sans, fontSize: px(12), color: C.textMuted }}>MUDRA Tarun Loan</div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: px(6) }}>
                            <div
                                style={{
                                    ...chip("rgba(245,166,35,.16)", C.amber, "transparent"),
                                    padding: "2px 8px",
                                    fontSize: px(9)
                                }}
                            >
                                IN REVIEW
                            </div>
                            <div
                                style={{
                                    fontFamily: F.mono,
                                    fontSize: px(11),
                                    color: C.textMuted
                                }}
                            >
                                Step 2 of 4
                            </div>
                        </div>
                        <div
                            style={{
                                marginTop: px(10),
                                height: px(6),
                                borderRadius: px(999),
                                background: "#171B16",
                                overflow: "hidden"
                            }}
                        >
                            <div
                                style={{
                                    width: "35%",
                                    height: "100%",
                                    background: "linear-gradient(90deg,#C84B0C,#F5A623)",
                                    borderRadius: px(999)
                                }}
                            />
                        </div>
                        <div
                            style={{
                                marginTop: px(6),
                                display: "flex",
                                justifyContent: "space-between",
                                fontFamily: F.sans,
                                fontSize: px(11),
                                color: C.textMuted
                            }}
                        >
                            <span>Applied</span>
                            <span>Docs</span>
                            <span>Review</span>
                            <span>Approved</span>
                        </div>
                    </div>
                </RoleHeader>

                <div style={{ marginTop: px(14) }}>
                    <div style={{ fontFamily: F.mono, fontSize: px(9), color: C.textMuted, letterSpacing: "1.5px", marginBottom: px(6) }}>
                        QUICK ACTIONS
                    </div>
                    <div style={{ display: "flex", gap: px(10) }}>
                        <button
                            onClick={() => onNav("my_app")}
                            style={{
                                flex: 1,
                                borderRadius: px(12),
                                border: `1px solid ${C.border}`,
                                background: C.card1,
                                padding: "10px 10px",
                                display: "flex",
                                alignItems: "center",
                                gap: px(8)
                            }}
                        >
                            {I.upload(C.clay, 18)}
                            <span style={{ fontFamily: F.sans, fontSize: px(12), color: C.textPrimary }}>Upload Docs</span>
                        </button>
                        <button
                            onClick={() => onNav("chat")}
                            style={{
                                flex: 1,
                                borderRadius: px(12),
                                border: `1px solid ${C.border}`,
                                background: C.card1,
                                padding: "10px 10px",
                                display: "flex",
                                alignItems: "center",
                                gap: px(8)
                            }}
                        >
                            {I.chat(C.teal, 18)}
                            <span style={{ fontFamily: F.sans, fontSize: px(12), color: C.textPrimary }}>Chat Agent</span>
                        </button>
                    </div>
                </div>

                <div style={{ marginTop: px(18) }}>
                    <div style={{ fontFamily: F.mono, fontSize: px(9), color: C.textMuted, letterSpacing: "1.5px", marginBottom: px(8) }}>
                        OTHER SCHEMES YOU MAY LIKE
                    </div>
                    <div style={{ display: "flex", gap: px(8), overflowX: "auto" }}>
                        {["PM SVANidhi", "Mahila Udyam Nidhi", "MSME TN"].map((t) => (
                            <div
                                key={t}
                                style={{
                                    padding: "8px 12px",
                                    borderRadius: px(999),
                                    border: `1px solid ${C.border}`,
                                    background: C.card1,
                                    fontFamily: F.sans,
                                    fontSize: px(11),
                                    color: C.textPrimary
                                }}
                            >
                                {t}
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ marginTop: px(18) }}>
                    <div style={{ fontFamily: F.mono, fontSize: px(9), color: C.textMuted, letterSpacing: "1.5px", marginBottom: px(8) }}>RECENT UPDATES</div>
                    <div
                        style={{
                            borderRadius: px(12),
                            border: `1px solid ${C.border}`,
                            background: C.card1,
                            padding: "10px 12px",
                            marginBottom: px(8)
                        }}
                    >
                        <div
                            style={{
                                width: px(3),
                                height: "100%",
                                background: C.teal,
                                borderRadius: px(2),
                                position: "absolute"
                            }}
                        />
                        <div style={{ fontFamily: F.sans, fontSize: px(12), color: C.textPrimary }}>Documents received. Review in progress.</div>
                        <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted, marginTop: px(2) }}>Mar 2 · 9:41 AM</div>
                    </div>
                </div>
            </div>
            <CustomerBottomNav navTab="home" onNav={onNav} />
        </div>
    );
}

function CustomerMyApp({ onNav }) {
    return (
        <div className="sc" style={{ background: C.bg, position: "relative" }}>
            <SB />
            <div className="hide-scroll" style={{ padding: "10px 16px 90px", overflowY: "auto" }}>
                <RoleHeader role="customer" name="MUDRA Tarun Loan" title="My application">
                    <div
                        style={{
                            marginTop: px(10),
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}
                    >
                        <div style={{ fontFamily: F.mono, fontSize: px(11), color: C.textMuted }}>LD-2024-038</div>
                        <div
                            style={{
                                ...chip("rgba(245,166,35,.16)", C.amber, "transparent"),
                                padding: "2px 8px",
                                fontSize: px(9)
                            }}
                        >
                            IN REVIEW
                        </div>
                    </div>
                    <div
                        style={{
                            marginTop: px(10),
                            height: px(6),
                            borderRadius: px(999),
                            background: "#171B16",
                            overflow: "hidden"
                        }}
                    >
                        <div
                            style={{
                                width: "35%",
                                height: "100%",
                                background: "linear-gradient(90deg,#C84B0C,#F5A623)",
                                borderRadius: px(999)
                            }}
                        />
                    </div>
                    <div
                        style={{
                            marginTop: px(6),
                            fontFamily: F.sans,
                            fontSize: px(11),
                            color: C.textMuted
                        }}
                    >
                        Step 2 of 4 — Document Verification
                    </div>
                </RoleHeader>

                <div style={{ marginTop: px(14) }}>
                    <div style={{ fontFamily: F.mono, fontSize: px(9), color: C.textMuted, letterSpacing: "1.5px", marginBottom: px(8) }}>
                        APPLICATION JOURNEY
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: px(10) }}>
                        {[
                            { label: "Application Submitted", meta: "Mar 1 · 10:32 AM", status: "done" },
                            { label: "Payment Received ₹999", meta: "Mar 1 · 10:35 AM", status: "done" },
                            {
                                label: "Document Verification",
                                meta: "2 of 4 documents uploaded",
                                status: "current"
                            },
                            { label: "Loan Disbursement", meta: "Expected 5–7 working days after approval", status: "future" }
                        ].map((s, idx) => (
                            <div key={s.label} style={{ display: "flex", alignItems: "flex-start", gap: px(8) }}>
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                    <div
                                        style={{
                                            width: px(16),
                                            height: px(16),
                                            borderRadius: "50%",
                                            background:
                                                s.status === "done"
                                                    ? C.clay
                                                    : s.status === "current"
                                                    ? "rgba(245,166,35,.15)"
                                                    : "transparent",
                                            border:
                                                s.status === "future"
                                                    ? `1px solid ${C.border}`
                                                    : s.status === "current"
                                                    ? `1px solid ${C.amber}`
                                                    : "none",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            boxShadow:
                                                s.status === "current" ? "0 0 0 4px rgba(245,166,35,.08)" : "none",
                                            marginTop: px(3)
                                        }}
                                    >
                                        {s.status === "done" && I.check("#fff", 10)}
                                        {s.status === "current" && (
                                            <div
                                                style={{
                                                    width: px(6),
                                                    height: px(6),
                                                    borderRadius: "50%",
                                                    background: C.amber,
                                                    animation: "dotP 1.2s infinite"
                                                }}
                                            />
                                        )}
                                    </div>
                                    {idx < 3 && (
                                        <div
                                            style={{
                                                flex: 1,
                                                width: px(2),
                                                background: "rgba(237,240,232,.18)",
                                                marginTop: px(2)
                                            }}
                                        />
                                    )}
                                </div>
                                <div>
                                    <div style={{ fontFamily: F.sans, fontSize: px(12), color: C.textPrimary }}>{s.label}</div>
                                    <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted }}>{s.meta}</div>
                                    {s.status === "current" && (
                                        <button
                                            onClick={() => onNav("my_app")}
                                            style={{
                                                marginTop: px(6),
                                                ...cta(C.clay, {
                                                    width: "auto",
                                                    height: px(32),
                                                    padding: "0 12px",
                                                    fontSize: px(11)
                                                })
                                            }}
                                        >
                                            Upload Missing Docs
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ marginTop: px(18) }}>
                    <div style={{ fontFamily: F.mono, fontSize: px(9), color: C.textMuted, letterSpacing: "1.5px", marginBottom: px(6) }}>
                        DOCUMENT CHECKLIST
                    </div>
                    <div style={{ marginBottom: px(8), fontFamily: F.sans, fontSize: px(12), color: C.textMuted }}>2 of 4 uploaded</div>
                    <div
                        style={{
                            height: px(6),
                            borderRadius: px(999),
                            background: "#171B16",
                            overflow: "hidden",
                            marginBottom: px(10)
                        }}
                    >
                        <div
                            style={{
                                width: "50%",
                                height: "100%",
                                background: "linear-gradient(90deg,#C84B0C,#F5A623)",
                                borderRadius: px(999)
                            }}
                        />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: px(8) }}>
                        {[
                            { label: "Aadhaar Card", status: "done" },
                            { label: "PAN Card", status: "done" },
                            { label: "Bank Statement", status: "pending", note: "All 6 months must be from same account" },
                            { label: "Project Report (DPR)", status: "pending" },
                            { label: "Quotations", status: "pending" },
                            { label: "Category Certificate — Optional", status: "optional" }
                        ].map((d) => (
                            <div
                                key={d.label}
                                style={{
                                    borderRadius: px(12),
                                    border: `1px solid ${
                                        d.status === "done" ? C.teal : d.status === "optional" ? C.border : C.clay
                                    }`,
                                    background: C.card1,
                                    padding: "8px 10px"
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between"
                                    }}
                                >
                                    <div style={{ fontFamily: F.sans, fontSize: px(12), color: C.textPrimary }}>{d.label}</div>
                                    {d.status === "done" && (
                                        <span
                                            style={{
                                                fontFamily: F.mono,
                                                fontSize: px(10),
                                                color: C.teal
                                            }}
                                        >
                                            ✓ Uploaded
                                        </span>
                                    )}
                                    {d.status === "pending" && (
                                        <button
                                            style={{
                                                ...cta(C.clay, {
                                                    width: "auto",
                                                    height: px(30),
                                                    padding: "0 12px",
                                                    fontSize: px(11),
                                                    boxShadow: "none"
                                                })
                                            }}
                                        >
                                            Upload
                                        </button>
                                    )}
                                </div>
                                {d.note && (
                                    <div
                                        style={{
                                            fontFamily: F.sans,
                                            fontSize: px(11),
                                            color: C.textMuted,
                                            marginTop: px(4)
                                        }}
                                    >
                                        {d.note}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <CustomerBottomNav navTab="my_app" onNav={onNav} />
        </div>
    );
}

function CustomerChat({ onNav }) {
    return (
        <div className="sc" style={{ background: C.bg, position: "relative" }}>
            <SB />
            <div
                style={{
                    padding: "8px 16px 10px",
                    borderBottom: `1px solid ${C.border}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: px(8) }}>
                    <div
                        style={{
                            width: px(32),
                            height: px(32),
                            borderRadius: "50%",
                            background: C.card1,
                            position: "relative",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        {I.person(C.teal, 18)}
                        <div
                            style={{
                                position: "absolute",
                                bottom: px(2),
                                right: px(2),
                                width: px(8),
                                height: px(8),
                                borderRadius: "50%",
                                background: C.teal,
                                border: "2px solid #111510"
                            }}
                        />
                    </div>
                    <div>
                        <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: px(13), color: C.textPrimary }}>Ramesh K.</div>
                        <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted }}>Loan Advisor · MUDRA Tarun</div>
                    </div>
                </div>
                <div style={{ display: "flex", gap: px(10) }}>
                    {I.call(C.textPrimary, 18)}
                    {I.video ? I.video(C.textPrimary, 18) : null}
                </div>
            </div>

            <div className="hide-scroll" style={{ padding: "14px 16px 80px", overflowY: "auto", display: "flex", flexDirection: "column", gap: px(10) }}>
                <div
                    style={{
                        borderRadius: px(10),
                        background: "rgba(76,201,160,.12)",
                        padding: "8px 10px",
                        fontFamily: F.sans,
                        fontSize: px(11),
                        color: C.textPrimary
                    }}
                >
                    Case registered. Ramesh assigned as your advisor.
                </div>
                <div
                    style={{
                        alignSelf: "flex-start",
                        maxWidth: "80%",
                        background: C.card1,
                        borderRadius: "14px 14px 14px 3px",
                        padding: "10px 12px",
                        fontFamily: F.sans,
                        fontSize: px(12),
                        color: C.textPrimary
                    }}
                >
                    Namaste Rahul ji! Please upload your latest 6 months bank statement. That’s the only item pending now.
                </div>
                <div
                    style={{
                        alignSelf: "flex-end",
                        maxWidth: "80%",
                        background: C.clay,
                        borderRadius: "14px 14px 3px 14px",
                        padding: "10px 12px",
                        fontFamily: F.sans,
                        fontSize: px(12),
                        color: "#fff"
                    }}
                >
                    Done, uploaded ✅
                </div>
                <div
                    style={{
                        borderRadius: px(10),
                        background: "rgba(76,201,160,.12)",
                        padding: "8px 10px",
                        fontFamily: F.sans,
                        fontSize: px(11),
                        color: C.textPrimary
                    }}
                >
                    Documents received. Review in progress.
                </div>
            </div>

            <div
                style={{
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                    padding: "10px 16px 18px",
                    background: `linear-gradient(translate, transparent, ${C.bg})`
                }}
            >
                <div
                    style={{
                        height: px(48),
                        borderRadius: px(24),
                        border: `1px solid ${C.border}`,
                        background: C.card1,
                        padding: "4px 4px 4px 14px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}
                >
                    <span style={{ fontFamily: F.sans, fontSize: px(13), color: C.textMuted }}>Type a message…</span>
                    <button
                        style={{
                            width: px(40),
                            height: px(40),
                            borderRadius: "50%",
                            background: C.clay,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        {I.mic("#fff", 18)}
                    </button>
                </div>
            </div>
            <CustomerBottomNav navTab="chat" onNav={onNav} />
        </div>
    );
}

function CustomerProfile({ onNav }) {
    return (
        <div className="sc" style={{ background: C.bg, position: "relative" }}>
            <SB />
            <div className="hide-scroll" style={{ padding: "14px 16px 90px", overflowY: "auto" }}>
                <div style={{ display: "flex", alignItems: "center", gap: px(12), marginBottom: px(16) }}>
                    <div
                        style={{
                            width: px(42),
                            height: px(42),
                            borderRadius: "50%",
                            background: C.card1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontFamily: F.sans,
                            fontSize: px(16),
                            color: C.textPrimary
                        }}
                    >
                        RK
                    </div>
                    <div>
                        <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: px(14), color: C.textPrimary }}>Rahul Kumar</div>
                        <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted }}>+91-98••• 24••</div>
                    </div>
                    <button
                        style={{
                            marginLeft: "auto",
                            borderRadius: px(999),
                            border: `1px solid ${C.border}`,
                            background: C.card1,
                            padding: "6px 10px",
                            fontFamily: F.sans,
                            fontSize: px(11),
                            color: C.textPrimary
                        }}
                    >
                        Edit
                    </button>
                </div>

                <div
                    style={{
                        borderRadius: px(12),
                        border: `1px solid ${C.border}`,
                        background: C.card1,
                        padding: "10px 12px",
                        marginBottom: px(16)
                    }}
                >
                    <div style={{ fontFamily: F.mono, fontSize: px(9), color: C.textMuted, letterSpacing: "1.5px" }}>KYC &amp; APPLICATION</div>
                    <div
                        style={{
                            marginTop: px(8),
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}
                    >
                        <div>
                            <div style={{ fontFamily: F.sans, fontSize: px(12), color: C.textPrimary }}>MUDRA Tarun Loan</div>
                            <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted }}>KYC: Verified ✓</div>
                        </div>
                        <div
                            style={{
                                ...chip("rgba(245,166,35,.16)", C.amber, "transparent"),
                                padding: "2px 8px",
                                fontSize: px(9)
                            }}
                        >
                            IN REVIEW
                        </div>
                    </div>
                </div>

                <div style={{ marginBottom: px(16) }}>
                    <div style={{ fontFamily: F.mono, fontSize: px(9), color: C.textMuted, letterSpacing: "1.5px", marginBottom: px(6) }}>
                        ACCOUNT
                    </div>
                    {["Language", "Notifications", "Mobile Number"].map((item) => (
                        <div
                            key={item}
                            style={{
                                borderRadius: px(10),
                                border: `1px solid ${C.border}`,
                                background: C.card1,
                                padding: "10px 12px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginBottom: px(6)
                            }}
                        >
                            <span style={{ fontFamily: F.sans, fontSize: px(12), color: C.textPrimary }}>{item}</span>
                            {I.chevron(C.textMuted, 16)}
                        </div>
                    ))}
                </div>

                <div style={{ marginBottom: px(16) }}>
                    <div style={{ fontFamily: F.mono, fontSize: px(9), color: C.textMuted, letterSpacing: "1.5px", marginBottom: px(6) }}>
                        SUPPORT
                    </div>
                    {["Contact Agent", "Help & FAQ", "Report Issue"].map((item) => (
                        <div
                            key={item}
                            style={{
                                borderRadius: px(10),
                                border: `1px solid ${C.border}`,
                                background: C.card1,
                                padding: "10px 12px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginBottom: px(6)
                            }}
                        >
                            <span style={{ fontFamily: F.sans, fontSize: px(12), color: C.textPrimary }}>{item}</span>
                            {I.chevron(C.textMuted, 16)}
                        </div>
                    ))}
                </div>

                <div style={{ marginBottom: px(16) }}>
                    <div style={{ fontFamily: F.mono, fontSize: px(9), color: C.textMuted, letterSpacing: "1.5px", marginBottom: px(6) }}>
                        LEGAL
                    </div>
                    {["Privacy Policy", "Terms of Service"].map((item) => (
                        <div
                            key={item}
                            style={{
                                borderRadius: px(10),
                                border: `1px solid ${C.border}`,
                                background: C.card1,
                                padding: "10px 12px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginBottom: px(6)
                            }}
                        >
                            <span style={{ fontFamily: F.sans, fontSize: px(12), color: C.textPrimary }}>{item}</span>
                            {I.chevron(C.textMuted, 16)}
                        </div>
                    ))}
                </div>

                <button
                    style={{
                        width: "100%",
                        borderRadius: px(12),
                        border: `1px solid rgba(224,82,82,.7)`,
                        background: "transparent",
                        padding: "10px 12px",
                        fontFamily: F.sans,
                        fontSize: px(12),
                        color: C.red
                    }}
                >
                    Log Out
                </button>
            </div>
            <CustomerBottomNav navTab="profile" onNav={onNav} />
        </div>
    );
}

// =========================================================================
// ROLE 2 - SALES EXECUTIVE APP (Active nav & CTAs: CLAY per design system)
// =========================================================================

function SalesExecBottomNav({ navTab, onNav }) {
    const items = [
        { id: "se_home", label: "Home", icon: I.home },
        { id: "se_leads", label: "Leads", icon: I.list },
        { id: "se_checklist", label: "Checklist", icon: I.doc },
        { id: "se_profile", label: "Profile", icon: I.person }
    ];
    return (
        <div
            style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                padding: "10px 14px 18px",
                background: "linear-gradient(transparent,#0B0C0A 45%)"
            }}
        >
            <div
                style={{
                    borderRadius: px(24),
                    background: "rgba(12,15,11,.96)",
                    border: `1px solid ${C.border}`,
                    padding: "6px 10px",
                    display: "flex",
                    justifyContent: "space-between"
                }}
            >
                {items.map((it) => {
                    const active = navTab === it.id;
                    return (
                        <button
                            key={it.id}
                            onClick={() => onNav(it.id)}
                            style={{
                                flex: 1,
                                border: "none",
                                background: "transparent",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: px(2),
                                padding: "4px 0"
                            }}
                        >
                            <div
                                style={{
                                    width: px(34),
                                    height: px(26),
                                    borderRadius: px(9),
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    background: active ? "rgba(200,75,12,0.11)" : "transparent"
                                }}
                            >
                                {it.icon(active ? C.clay : C.textMuted, 18)}
                            </div>
                            <span
                                style={{
                                    fontFamily: F.mono,
                                    fontSize: px(8),
                                    color: active ? C.clay : C.textMuted
                                }}
                            >
                                {it.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

function SalesExecHome({ onNav }) {
    return (
        <div className="sc" style={{ background: C.bg, position: "relative" }}>
            <SB />
            <div className="hide-scroll" style={{ padding: "10px 16px 110px", overflowY: "auto", overflowX: "hidden" }}>
                <RoleHeader role="sales_exec" name="Arjun Singh" title="Good morning 👋">
                    <div
                        style={{
                            marginTop: px(12),
                            borderRadius: px(14),
                            border: `1px solid ${C.border}`,
                            background: "linear-gradient(135deg,#12221C,#0F1511)",
                            padding: "12px 12px 10px",
                            width: "100%",
                            minWidth: 0
                        }}
                    >
                        <div style={{ fontFamily: F.mono, fontSize: px(9), color: C.textMuted, letterSpacing: "1.5px", overflow: "visible", wordBreak: "keep-all" }}>
                            THIS WEEK&apos;S COLLECTION
                        </div>
                        <div
                            style={{
                                marginTop: px(6),
                                display: "flex",
                                flexWrap: "wrap",
                                alignItems: "baseline",
                                justifyContent: "space-between",
                                gap: px(8)
                            }}
                        >
                            <div style={{ fontFamily: F.serif, fontWeight: 700, fontSize: px(22), color: C.textPrimary, flexShrink: 0 }}>
                                <AnimatedNumber value="38400" />
                            </div>
                            <div
                                style={{
                                    ...chip("rgba(245,166,35,.16)", C.amber, "transparent"),
                                    padding: "2px 8px",
                                    fontSize: px(9),
                                    flexShrink: 0,
                                    whiteSpace: "nowrap"
                                }}
                            >
                                GROWTH PERFORMER · 8%
                            </div>
                        </div>
                        <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted, marginTop: px(6) }}>
                            ₹11,600 more to reach HIGH PERFORMER (10% + bonus)
                        </div>
                        <div
                            style={{
                                marginTop: px(10),
                                height: px(6),
                                borderRadius: px(999),
                                background: "#171B16",
                                overflow: "hidden"
                            }}
                        >
                            <div
                                className="shimmer-bg"
                                style={{
                                    width: "78%",
                                    height: "100%",
                                    backgroundImage:
                                        "linear-gradient(90deg,rgba(200,75,12,0.9),rgba(76,201,160,0.9))",
                                    borderRadius: px(999)
                                }}
                            />
                        </div>
                        <div
                            style={{
                                marginTop: px(10),
                                display: "flex",
                                flexDirection: "column",
                                gap: px(4),
                                fontFamily: F.sans,
                                fontSize: px(11),
                                color: C.textMuted
                            }}
                        >
                            {[
                                "Starter · ₹25K–₹35K · 5%",
                                "Growth · ₹35K–₹50K · 8% (You are here)",
                                "High · ₹50K–₹1L · 10% + ₹1,500 bonus",
                                "Superstar · ₹1L+ · 10% + ₹3,000 bonus"
                            ].map((row, idx) => (
                                <div key={row} style={{ display: "flex", alignItems: "center", gap: px(6) }}>
                                    <div
                                        style={{
                                            width: px(6),
                                            height: px(6),
                                            borderRadius: "50%",
                                            background:
                                                idx === 1 ? C.clay : "rgba(237,240,232,0.12)",
                                            boxShadow:
                                                idx === 1 ? "0 0 0 4px rgba(200,75,12,.16)" : "none"
                                        }}
                                    />
                                    <span>{row}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </RoleHeader>

                <div style={{ marginTop: px(16) }}>
                    <div style={{ fontFamily: F.mono, fontSize: px(9), color: C.textMuted, letterSpacing: "1.5px", marginBottom: px(6) }}>
                        KPIS
                    </div>
                    <div style={{ display: "flex", overflowX: "auto", gap: px(8), paddingBottom: px(2) }}>
                        {[
                            { label: "My Leads", val: "12" },
                            { label: "Converted", val: "4" },
                            { label: "Pending", val: "6" },
                            { label: "Approved", val: "2" }
                        ].map((k) => (
                            <div
                                key={k.label}
                                style={{
                                    minWidth: px(98),
                                    flexShrink: 0,
                                    borderRadius: px(12),
                                    border: `1px solid ${C.border}`,
                                    background: C.card1,
                                    padding: "8px 10px"
                                }}
                            >
                                <div style={{ fontFamily: F.mono, fontSize: px(15), color: C.teal }}>{k.val}</div>
                                <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted, whiteSpace: "nowrap", overflow: "visible" }}>{k.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ marginTop: px(16) }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: px(6) }}>
                        <div style={{ fontFamily: F.mono, fontSize: px(9), color: C.textMuted, letterSpacing: "1.5px" }}>
                            RECENT LEADS
                        </div>
                        <button
                            onClick={() => onNav("se_leads")}
                            style={{
                                background: "none",
                                border: "none",
                                fontFamily: F.sans,
                                fontSize: px(11),
                                color: C.clay,
                                cursor: "pointer"
                            }}
                        >
                            View All →
                        </button>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: px(8) }}>
                        {[
                            { name: "Ravi Kumar", type: "PM SVANidhi", amt: "₹2,00,000", status: "PENDING" },
                            { name: "Sonal Jain", type: "MUDRA Tarun", amt: "₹7,50,000", status: "APPROVED" },
                            { name: "Amit Traders", type: "CGTMSE", amt: "₹5,00,000", status: "OBJECTION" }
                        ].map((l) => (
                            <div key={l.name} className="tappable" style={{
                                borderRadius: px(14), border: `1px solid ${C.border}`,
                                background: C.card1, padding: "12px 14px"
                            }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <div>
                                        <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: px(13), color: C.textPrimary }}>{l.name}</div>
                                        <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted, marginTop: px(2) }}>{l.type}</div>
                                    </div>
                                    <div style={{ textAlign: "right" }}>
                                        <div style={{ fontFamily: F.mono, fontSize: px(12), color: C.textPrimary, marginBottom: px(4) }}>{l.amt}</div>
                                        <div style={statusChip(l.status)}>{l.status}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ marginTop: px(16), marginBottom: px(24) }}>
                    <div style={{ fontFamily: F.mono, fontSize: px(9), color: C.textMuted, letterSpacing: "1.5px", marginBottom: px(6) }}>
                        OBJECTION ALERTS
                    </div>
                    <div
                        style={{
                            borderRadius: px(12),
                            border: `1px solid rgba(224,82,82,.7)`,
                            background: "rgba(224,82,82,.08)",
                            padding: "10px 12px",
                            overflow: "visible"
                        }}
                    >
                        <div style={{ fontFamily: F.sans, fontSize: px(12), color: C.textPrimary }}>
                            ⚠️ Objection on Ravi Kumar&apos;s application
                        </div>
                        <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted, marginTop: px(4) }}>
                            Missing: Bank statement page 3
                        </div>
                        <button
                            style={{
                                marginTop: px(8),
                                ...cta(C.clay, {
                                    width: "auto",
                                    height: px(32),
                                    padding: "0 12px",
                                    fontSize: px(11),
                                    boxShadow: "0 4px 18px rgba(200,75,12,0.32)"
                                })
                            }}
                        >
                            Resolve Now
                        </button>
                    </div>
                </div>
            </div>
            <SalesExecBottomNav navTab="se_home" onNav={onNav} />
        </div>
    );
}

function SalesExecLeads({ onNav }) {
    const [loading, setLoading] = useState(true);
    useEffect(() => { const t = setTimeout(() => setLoading(false), 600); return () => clearTimeout(t); }, []);
    return (
        <div className="sc" style={{ background: C.bg, position: "relative" }}>
            <SB />
            <div style={{
                padding: "14px 16px",
                borderBottom: `1px solid ${C.border}`,
                display: "flex", alignItems: "center", justifyContent: "space-between"
            }}>
                <div>
                    <div style={{ fontFamily: F.serif, fontWeight: 700, fontSize: px(20), color: C.textPrimary, letterSpacing: "-0.3px" }}>My Leads</div>
                    <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted, marginTop: px(2) }}>Track and create loan leads</div>
                </div>
                <button
                    onClick={() => onNav("se_new_lead")}
                    style={{ ...cta(C.clay, { width: "auto", height: px(36), padding: "0 14px", fontSize: px(12) }) }}
                >
                    {I.plus("#fff", 14)} New Lead
                </button>
            </div>

            <div className="hide-scroll" style={{ padding: "12px 16px 90px", overflowY: "auto" }}>
                <div style={{
                    height: px(44), borderRadius: px(12), border: `1px solid ${C.border}`,
                    background: C.card1, padding: "0 14px", display: "flex", alignItems: "center", gap: px(8), marginBottom: px(12)
                }}>
                    {I.search(C.textMuted, 16)}
                    <span style={{ fontFamily: F.sans, fontSize: px(13), color: C.textMuted }}>Search by name, scheme, amount…</span>
                </div>
                <div style={{ display: "flex", gap: px(6), marginBottom: px(14), overflowX: "auto" }}>
                    {["All", "Pending", "Approved", "Objection", "Rejected"].map((f, idx) => (
                        <button key={f} className="tappable" style={{
                            padding: "6px 12px", borderRadius: px(20), whiteSpace: "nowrap",
                            border: `1px solid ${idx === 0 ? roleColor.sales_exec : C.border}`,
                            background: idx === 0 ? "rgba(34,197,94,0.12)" : C.card1,
                            fontFamily: F.sans, fontWeight: 500, fontSize: px(11),
                            color: idx === 0 ? roleColor.sales_exec : C.textSecondary,
                            cursor: "pointer"
                        }}>{f}</button>
                    ))}
                </div>

                {loading
                    ? [1,2,3].map(i => <SkeletonCard key={i} h={80} />)
                    : <div style={{ display: "flex", flexDirection: "column", gap: px(0) }}>
                    {[
                        { name: "Ravi Kumar", scheme: "PM SVANidhi", amt: "₹2,00,000", status: "PENDING", updated: "Today 2:30 PM" },
                        { name: "Sonal Jain", scheme: "MUDRA Tarun", amt: "₹7,50,000", status: "APPROVED", updated: "Yesterday 5:10 PM" },
                        { name: "Amit Traders", scheme: "CGTMSE", amt: "₹5,00,000", status: "OBJECTION", updated: "Today 11:05 AM" }
                    ].map((l) => {
                        return (
                            <div key={l.name} className="tappable" style={{
                                borderRadius: px(14), border: `1px solid ${C.border}`,
                                background: C.card1, padding: "12px 14px", marginBottom: px(8)
                            }}>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: px(10) }}>
                                        <div style={{
                                            width: px(36), height: px(36), borderRadius: "50%",
                                            background: "rgba(34,197,94,0.10)", border: "1px solid rgba(34,197,94,0.25)",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            fontFamily: F.serif, fontWeight: 700, fontSize: px(13), color: roleColor.sales_exec
                                        }}>
                                            {l.name.split(" ").map((x) => x[0]).join("")}
                                        </div>
                                        <div>
                                            <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: px(13), color: C.textPrimary }}>{l.name}</div>
                                            <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted, marginTop: px(2) }}>{l.scheme} · {l.amt}</div>
                                        </div>
                                    </div>
                                    <div style={statusChip(l.status)}>{l.status}</div>
                                </div>
                                <div style={{ fontFamily: F.mono, fontSize: px(10), color: C.textMuted, marginTop: px(8) }}>
                                    Updated: {l.updated}
                                </div>
                            </div>
                        );
                    })}
                </div>}
            </div>
            <SalesExecBottomNav navTab="se_leads" onNav={onNav} />
        </div>
    );
}

function SalesExecNewLead({ onNav }) {
    const steps = [
        "Applicant Details",
        "Eligibility Check",
        "Business & Project",
        "Financial Validation",
        "Documents",
        "Declaration"
    ];
    const currentStep = 1;

    return (
        <div className="sc" style={{ background: C.bg, position: "relative" }}>
            <SB />
            <div
                style={{
                    padding: "8px 16px 10px",
                    borderBottom: `1px solid ${C.border}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}
            >
                <div>
                    <div style={{ fontFamily: F.sans, fontSize: px(12), color: C.textMuted }}>STEP 1 OF 6</div>
                    <div style={{ fontFamily: F.serif, fontWeight: 700, fontSize: px(18), color: C.textPrimary }}>New Lead</div>
                </div>
                <button
                    onClick={() => onNav("se_leads")}
                    style={{
                        background: "none",
                        border: "none",
                        fontFamily: F.sans,
                        fontSize: px(11),
                        color: C.textMuted
                    }}
                >
                    Cancel
                </button>
            </div>

            <div className="hide-scroll" style={{ padding: "12px 16px 90px", overflowY: "auto" }}>
                <div
                    style={{
                        marginBottom: px(10),
                        height: px(6),
                        borderRadius: px(999),
                        background: "#171B16",
                        overflow: "hidden"
                    }}
                >
                    <div
                        style={{
                            width: `${(currentStep / steps.length) * 100}%`,
                            height: "100%",
                            background: "linear-gradient(90deg,#4CC9A0,#C84B0C)",
                            borderRadius: px(999)
                        }}
                    />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: px(10) }}>
                    {steps.map((s, idx) => (
                        <div
                            key={s}
                            style={{
                                flex: 1,
                                fontFamily: F.sans,
                                fontSize: px(9),
                                color: idx === currentStep - 1 ? C.teal : C.textMuted,
                                textAlign: "center"
                            }}
                        >
                            {s}
                        </div>
                    ))}
                </div>

                <div
                    style={{
                        borderRadius: px(14),
                        border: `1px solid ${C.border}`,
                        background: C.card1,
                        padding: "12px 12px 10px",
                        display: "flex",
                        flexDirection: "column",
                        gap: px(10)
                    }}
                >
                    {[
                        "Full Name (as per Aadhaar)",
                        "Date of Birth",
                        "PAN Number",
                        "Mobile Number",
                        "Current address same as Aadhaar?"
                    ].map((label, idx) => (
                        <div key={label}>
                            <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted, marginBottom: px(4) }}>{label}</div>
                            <div
                                style={{
                                    height: px(40),
                                    borderRadius: px(10),
                                    border: `1px solid ${idx === 0 ? C.teal : C.border}`,
                                    background: C.card2,
                                    padding: "0 10px",
                                    display: "flex",
                                    alignItems: "center",
                                    fontFamily: F.sans,
                                    fontSize: px(12),
                                    color: C.textPrimary
                                }}
                            >
                                {idx === 0 ? "Ravi Kumar" : idx === 1 ? "DD/MM/YYYY" : ""}
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: px(14) }}>
                    <div style={{ fontFamily: F.mono, fontSize: px(9), color: C.textMuted, letterSpacing: "1.5px", marginBottom: px(6) }}>
                        CATEGORY
                    </div>
                    <div
                        style={{
                            height: px(40),
                            borderRadius: px(10),
                            border: `1px solid ${C.border}`,
                            background: C.card1,
                            padding: "0 10px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            fontFamily: F.sans,
                            fontSize: px(12),
                            color: C.textPrimary
                        }}
                    >
                        General
                        {I.chevron(C.textMuted, 16)}
                    </div>
                </div>
            </div>

            <div
                style={{
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                    padding: "10px 16px 18px",
                    background: `linear-gradient(translate, transparent, ${C.bg})`,
                    display: "flex",
                    gap: px(8)
                }}
            >
                <button
                    style={{
                        ...ghostCta(C.textMuted),
                        height: px(42),
                        borderRadius: px(13),
                        border: `1px solid ${C.border}`
                    }}
                    onClick={() => onNav("se_leads")}
                >
                    ← Back
                </button>
                <button
                    style={{
                        ...cta(C.teal),
                        height: px(42)
                    }}
                >
                    Next →
                </button>
            </div>
        </div>
    );
}

function SalesExecChecklist({ onNav }) {
    return (
        <div className="sc" style={{ background: C.bg, position: "relative" }}>
            <SB />
            <div className="hide-scroll" style={{ padding: "10px 16px 90px", overflowY: "auto" }}>
                <RoleHeader role="sales_exec" name="Pre-Digital Validation" title="Checklist">
                    <div style={{ fontFamily: F.sans, fontSize: px(12), color: C.textMuted, marginTop: px(6) }}>
                        Ensure all sections are complete before digital submission.
                    </div>
                </RoleHeader>

                <div style={{ marginTop: px(14) }}>
                    <div style={{ fontFamily: F.mono, fontSize: px(9), color: C.textMuted, letterSpacing: "1.5px", marginBottom: px(6) }}>
                        OVERALL STATUS
                    </div>
                    <div
                        style={{
                            borderRadius: px(12),
                            border: `1px solid ${C.border}`,
                            background: C.card1,
                            padding: "10px 12px"
                        }}
                    >
                        <div style={{ fontFamily: F.sans, fontSize: px(12), color: C.textPrimary }}>4 of 6 sections complete</div>
                        <div
                            style={{
                                marginTop: px(8),
                                height: px(6),
                                borderRadius: px(999),
                                background: "#171B16",
                                overflow: "hidden"
                            }}
                        >
                            <div
                                style={{
                                    width: "66%",
                                    height: "100%",
                                    background: C.teal,
                                    borderRadius: px(999)
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: px(14), display: "flex", flexDirection: "column", gap: px(10) }}>
                    {[
                        { title: "Applicant Details", status: "COMPLETE" },
                        { title: "Eligibility Check", status: "COMPLETE" },
                        { title: "Business & Project Details", status: "INCOMPLETE" },
                        { title: "Financial Validation", status: "INCOMPLETE" },
                        { title: "Documents Upload", status: "PENDING" },
                        { title: "Final Declaration", status: "PENDING" }
                    ].map((sec) => {
                        const color =
                            sec.status === "COMPLETE"
                                ? C.teal
                                : sec.status === "INCOMPLETE"
                                ? C.clay
                                : C.amber;
                        return (
                            <div
                                key={sec.title}
                                style={{
                                    borderRadius: px(12),
                                    border: `1px solid ${C.border}`,
                                    background: C.card1,
                                    padding: "10px 12px"
                                }}
                            >
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <div style={{ fontFamily: F.sans, fontSize: px(12), color: C.textPrimary }}>{sec.title}</div>
                                    <div
                                        style={{
                                            ...chip(color + "1A", color, "transparent"),
                                            padding: "2px 8px",
                                            fontSize: px(9)
                                        }}
                                    >
                                        {sec.status}
                                    </div>
                                </div>
                                <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted, marginTop: px(4) }}>
                                    Customer answers + your verification will appear here.
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <SalesExecBottomNav navTab="se_checklist" onNav={onNav} />
        </div>
    );
}

function SalesExecProfile({ onNav }) {
    return (
        <div className="sc" style={{ background: C.bg, position: "relative" }}>
            <SB />
            <div className="hide-scroll" style={{ padding: "14px 16px 90px", overflowY: "auto" }}>
                <div style={{ display: "flex", alignItems: "center", gap: px(12), marginBottom: px(16) }}>
                    <div
                        style={{
                            width: px(42),
                            height: px(42),
                            borderRadius: "50%",
                            background: C.card1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontFamily: F.sans,
                            fontSize: px(16),
                            color: C.textPrimary
                        }}
                    >
                        AS
                    </div>
                    <div>
                        <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: px(14), color: C.textPrimary }}>Arjun Singh</div>
                        <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted }}>Exec ID: SE-CH-014</div>
                    </div>
                    <div
                        style={{
                            marginLeft: "auto",
                            ...chip("rgba(76,201,160,.18)", C.teal, "transparent"),
                            padding: "2px 8px",
                            fontSize: px(9)
                        }}
                    >
                        SALES EXECUTIVE
                    </div>
                </div>

                <div
                    style={{
                        borderRadius: px(12),
                        border: `1px solid ${C.border}`,
                        background: C.card1,
                        padding: "10px 12px",
                        marginBottom: px(16)
                    }}
                >
                    <div style={{ fontFamily: F.mono, fontSize: px(9), color: C.textMuted, letterSpacing: "1.5px" }}>
                        COMMISSION SUMMARY
                    </div>
                    <div
                        style={{
                            marginTop: px(8),
                            display: "flex",
                            justifyContent: "space-between"
                        }}
                    >
                        <div>
                            <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted }}>This month</div>
                            <div style={{ fontFamily: F.mono, fontSize: px(14), color: C.teal }}>₹12,400</div>
                        </div>
                        <div>
                            <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted }}>This week</div>
                            <div style={{ fontFamily: F.mono, fontSize: px(14), color: C.clay }}>₹3,072</div>
                        </div>
                        <div>
                            <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted }}>Pending payout</div>
                            <div style={{ fontFamily: F.mono, fontSize: px(14), color: C.textPrimary }}>₹8,200</div>
                        </div>
                    </div>
                </div>

                <div style={{ marginBottom: px(16) }}>
                    <div style={{ fontFamily: F.mono, fontSize: px(9), color: C.textMuted, letterSpacing: "1.5px", marginBottom: px(6) }}>
                        ACCOUNT
                    </div>
                    {["Language", "Notifications", "Change PIN"].map((item) => (
                        <div
                            key={item}
                            style={{
                                borderRadius: px(10),
                                border: `1px solid ${C.border}`,
                                background: C.card1,
                                padding: "10px 12px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginBottom: px(6)
                            }}
                        >
                            <span style={{ fontFamily: F.sans, fontSize: px(12), color: C.textPrimary }}>{item}</span>
                            {I.chevron(C.textMuted, 16)}
                        </div>
                    ))}
                </div>

                <button
                    style={{
                        width: "100%",
                        borderRadius: px(12),
                        border: `1px solid rgba(224,82,82,.7)`,
                        background: "transparent",
                        padding: "10px 12px",
                        fontFamily: F.sans,
                        fontSize: px(12),
                        color: C.red
                    }}
                >
                    Log Out
                </button>
            </div>
            <SalesExecBottomNav navTab="se_profile" onNav={onNav} />
        </div>
    );
}

// =========================================================================
// ROLE 3 - TEAM LEADER APP (Accent: AMBER)
// =========================================================================

function TLBottomNav({ navTab, onNav }) {
    return <BottomNav navTab={navTab} onNav={onNav} accent={C.amber} items={[
        { id: "tl_home",    label: "Home",    icon: I.home   },
        { id: "tl_team",    label: "Team",    icon: I.users  },
        { id: "tl_leads",   label: "Leads",   icon: I.list   },
        { id: "tl_profile", label: "Profile", icon: I.person }
    ]} />;
}

function TLHome({ onNav }) {
    const members = [
        { name: "Arjun Singh", leads: 12, amt: "₹62,400", slab: "High", pct: 83 },
        { name: "Ramesh K.",   leads: 8,  amt: "₹38,200", slab: "Growth", pct: 51 },
        { name: "Nitu Sharma", leads: 6,  amt: "₹24,800", slab: "Starter", pct: 33 },
    ];
    return (
        <div className="sc" style={{ background: C.bg, position: "relative" }}>
            <SB />
            <div className="hide-scroll" style={{ padding: "10px 16px 110px", overflowY: "auto", overflowX: "hidden" }}>
                <RoleHeader role="team_leader" name="Priya Menon" title="Good afternoon 👋">
                    {/* Team target card */}
                    <div style={{ marginTop: px(12), borderRadius: px(14), border: `1px solid rgba(245,158,11,0.25)`, background: "linear-gradient(135deg,rgba(245,158,11,0.08),rgba(245,158,11,0.02))", padding: "14px" }}>
                        <div style={{ fontFamily: F.mono, fontSize: px(9), color: C.textMuted, letterSpacing: "1.5px", marginBottom: px(8) }}>TEAM WEEKLY COLLECTION</div>
                        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: px(8), flexWrap: "wrap" }}>
                            <div style={{ fontFamily: F.serif, fontWeight: 900, fontSize: px(28), color: C.textPrimary, letterSpacing: "-0.5px" }}>
                                <AnimatedNumber value="184200" />
                            </div>
                            <div style={{ fontFamily: F.mono, fontSize: px(11), color: C.amber }}>73.6% of target</div>
                        </div>
                        <div style={{ marginTop: px(10), height: px(6), borderRadius: px(3), background: C.card2, overflow: "hidden" }}>
                            <div style={{ width: "73.6%", height: "100%", background: "linear-gradient(90deg,#F59E0B,#FBBF24)", borderRadius: px(3), animation: "progressFill 0.8s ease-out both" }} />
                        </div>
                        <div style={{ marginTop: px(6), fontFamily: F.sans, fontSize: px(11), color: C.textSecondary }}>
                            ₹65,800 more to unlock 1% incentive (est. <span style={{ color: C.amber }}>₹2,500</span>)
                        </div>
                        <div style={{ marginTop: px(10), fontFamily: F.mono, fontSize: px(10), color: C.textMuted }}>
                            Target: ₹2,50,000 · Closes Saturday
                        </div>
                    </div>
                </RoleHeader>

                {/* KPI strip */}
                <div style={{ marginTop: px(16), display: "flex", overflowX: "auto", gap: px(8), paddingRight: px(4) }}>
                    {[{ label: "Team Size", val: "8" }, { label: "Total Leads", val: "64" }, { label: "Converted", val: "22" }, { label: "Pending", val: "31" }, { label: "Objections", val: "4" }].map((k, i) => (
                        <div key={k.label} className="tappable" style={{
                            minWidth: px(80), flexShrink: 0,
                            borderRadius: px(12), border: `1px solid ${C.border}`, background: C.card1, padding: "10px 10px"
                        }}>
                            <div style={{ fontFamily: F.mono, fontSize: px(16), color: C.amber, fontWeight: 700 }}>{k.val}</div>
                            <div style={{ fontFamily: F.sans, fontSize: px(10), color: C.textMuted, marginTop: px(2), whiteSpace: "nowrap" }}>{k.label}</div>
                        </div>
                    ))}
                </div>

                {/* Team performance */}
                <div style={{ marginTop: px(18) }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: px(10) }}>
                        <div style={{ fontFamily: F.sans, fontWeight: 700, fontSize: px(14), color: C.textPrimary }}>Team Performance</div>
                        <button onClick={() => onNav("tl_team")} style={{ background: "none", border: "none", fontFamily: F.sans, fontWeight: 600, fontSize: px(12), color: C.amber, cursor: "pointer" }}>View All →</button>
                    </div>
                    {/* Best performer highlight */}
                    <div style={{ borderRadius: px(14), border: `1.5px solid rgba(245,158,11,0.3)`, background: "linear-gradient(135deg,rgba(245,158,11,0.08),rgba(245,158,11,0.02))", padding: "12px 14px", marginBottom: px(10) }}>
                        <div style={{ fontFamily: F.mono, fontSize: px(9), color: C.amber, letterSpacing: "1px", marginBottom: px(4) }}>🏆 BEST PERFORMER THIS WEEK</div>
                        <div style={{ fontFamily: F.serif, fontWeight: 700, fontSize: px(16), color: C.textPrimary }}>Arjun Singh</div>
                        <div style={{ fontFamily: F.sans, fontSize: px(12), color: C.textSecondary, marginTop: px(2) }}>₹62,400 · 12 leads · High slab</div>
                    </div>
                    {members.map((m) => (
                        <div key={m.name} className="tappable" style={{ borderRadius: px(14), border: `1px solid ${C.border}`, background: C.card1, padding: "12px 14px", marginBottom: px(8) }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: px(10) }}>
                                    <div style={{ width: px(36), height: px(36), borderRadius: "50%", background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F.serif, fontWeight: 700, fontSize: px(13), color: C.amber }}>
                                        {m.name.split(" ").map((x) => x[0]).join("")}
                                    </div>
                                    <div>
                                        <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: px(13), color: C.textPrimary }}>{m.name}</div>
                                        <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted, marginTop: px(2) }}>{m.leads} leads · {m.amt}</div>
                                    </div>
                                </div>
                                <div style={{ ...chip("rgba(245,158,11,0.12)", C.amber, "rgba(245,158,11,0.25)"), fontSize: px(9) }}>{m.slab}</div>
                            </div>
                            {/* mini progress */}
                            <div style={{ marginTop: px(10), height: px(4), borderRadius: px(2), background: C.card2 }}>
                                <div style={{ width: `${m.pct}%`, height: "100%", background: "linear-gradient(90deg,#F59E0B,#FBBF24)", borderRadius: px(2) }} />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Escalation card */}
                <div style={{ marginTop: px(4), marginBottom: px(24), borderRadius: px(14), border: `1px solid rgba(239,68,68,0.25)`, background: C.dangerDim, padding: "12px 14px" }}>
                    <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: px(13), color: C.textPrimary }}>⚠️ 2 cases need your attention</div>
                    <div style={{ fontFamily: F.sans, fontSize: px(12), color: C.textSecondary, marginTop: px(4) }}>Objections raised by bank — review before Friday</div>
                    <button onClick={() => onNav("tl_leads")} style={{ marginTop: px(10), ...cta(C.danger, { height: px(36), fontSize: px(12) }) }}>Review Cases →</button>
                </div>
            </div>
            <TLBottomNav navTab="tl_home" onNav={onNav} />
        </div>
    );
}

function TLTeam({ onNav }) {
    const [loading, setLoading] = useState(true);
    useEffect(() => { const t = setTimeout(() => setLoading(false), 600); return () => clearTimeout(t); }, []);
    const members = [
        { name: "Arjun Singh", id: "SE-CH-014", leads: 12, amt: "₹62,400", status: "Active" },
        { name: "Ramesh K.",   id: "SE-CH-022", leads: 8,  amt: "₹38,200", status: "Active" },
        { name: "Nitu Sharma", id: "SE-CH-031", leads: 6,  amt: "₹24,800", status: "Active" },
        { name: "Dev Patel",   id: "SE-CH-041", leads: 3,  amt: "₹11,200", status: "Inactive" },
    ];
    return (
        <div className="sc" style={{ background: C.bg, position: "relative" }}>
            <SB />
            <div style={{ padding: "14px 16px", borderBottom: `1px solid ${C.border}` }}>
                <div style={{ fontFamily: F.serif, fontWeight: 700, fontSize: px(20), color: C.textPrimary, letterSpacing: "-0.3px" }}>My Team</div>
                <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted, marginTop: px(2) }}>4 members · {members.filter(m => m.status === "Active").length} Active</div>
            </div>
            <div className="hide-scroll" style={{ padding: "12px 16px 90px", overflowY: "auto" }}>
                {loading ? [1,2,3].map(i => <SkeletonCard key={i} h={72} />) :
                members.map((m) => (
                    <div key={m.name} className="tappable" style={{ borderRadius: px(14), border: `1px solid ${C.border}`, background: C.card1, padding: "12px 14px", marginBottom: px(8) }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: px(10) }}>
                                <div style={{ width: px(40), height: px(40), borderRadius: "50%", background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F.serif, fontWeight: 700, fontSize: px(14), color: C.amber }}>
                                    {m.name.split(" ").map((x) => x[0]).join("")}
                                </div>
                                <div>
                                    <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: px(13), color: C.textPrimary }}>{m.name}</div>
                                    <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted, marginTop: px(2) }}>{m.id} · {m.leads} leads · {m.amt}</div>
                                </div>
                            </div>
                            <div style={statusChip(m.status === "Active" ? "ACTIVE" : "INACTIVE")}>{m.status}</div>
                        </div>
                    </div>
                ))}
            </div>
            <TLBottomNav navTab="tl_team" onNav={onNav} />
        </div>
    );
}

function TLLeads({ onNav }) {
    const [loading, setLoading] = useState(true);
    useEffect(() => { const t = setTimeout(() => setLoading(false), 600); return () => clearTimeout(t); }, []);
    const leads = [
        { name: "Ravi Kumar",    scheme: "PM SVANidhi",  amt: "₹2,00,000", status: "PENDING",   assigned: "Arjun Singh" },
        { name: "Sonal Jain",   scheme: "MUDRA Tarun",  amt: "₹7,50,000", status: "OBJECTION", assigned: "Ramesh K."  },
        { name: "Meena Devi",   scheme: "CGTMSE",       amt: "₹3,00,000", status: "APPROVED",  assigned: "Nitu Sharma"},
    ];
    return (
        <div className="sc" style={{ background: C.bg, position: "relative" }}>
            <SB />
            <div style={{ padding: "14px 16px", borderBottom: `1px solid ${C.border}` }}>
                <div style={{ fontFamily: F.serif, fontWeight: 700, fontSize: px(20), color: C.textPrimary, letterSpacing: "-0.3px" }}>All Team Leads</div>
                <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted, marginTop: px(2) }}>Review, approve, escalate</div>
            </div>
            <div className="hide-scroll" style={{ padding: "12px 16px 90px", overflowY: "auto" }}>
                {loading ? [1,2,3].map(i => <SkeletonCard key={i} h={88} />) :
                leads.map((l) => (
                    <div key={l.name} className="tappable" style={{ borderRadius: px(14), border: `1px solid ${C.border}`, background: C.card1, padding: "12px 14px", marginBottom: px(8) }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                            <div>
                                <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: px(13), color: C.textPrimary }}>{l.name}</div>
                                <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted, marginTop: px(2) }}>{l.scheme} · {l.amt}</div>
                                <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted, marginTop: px(2) }}>By: {l.assigned}</div>
                            </div>
                            <div style={statusChip(l.status)}>{l.status}</div>
                        </div>
                        <div style={{ marginTop: px(10), display: "flex", gap: px(8) }}>
                            <button className="tappable" style={{ ...cta(C.success, { width: "auto", height: px(32), padding: "0 12px", fontSize: px(11) }) }}>Approve</button>
                            <button className="tappable" style={{ ...ghostCta(C.danger, { width: "auto", height: px(32), padding: "0 12px", fontSize: px(11), border: `1px solid rgba(239,68,68,0.3)` }) }}>Escalate</button>
                        </div>
                    </div>
                ))}
            </div>
            <TLBottomNav navTab="tl_leads" onNav={onNav} />
        </div>
    );
}

function TLProfile({ onNav }) {
    return (
        <div className="sc" style={{ background: C.bg, position: "relative" }}>
            <SB />
            <div className="hide-scroll" style={{ padding: "14px 16px 90px", overflowY: "auto" }}>
                <div style={{ display: "flex", alignItems: "center", gap: px(12), marginBottom: px(16) }}>
                    <div style={{ width: px(42), height: px(42), borderRadius: "50%", background: C.card1, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F.sans, fontSize: px(16), color: C.textPrimary }}>PM</div>
                    <div>
                        <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: px(14), color: C.textPrimary }}>Priya Menon</div>
                        <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted }}>Team Leader · TL-CH-003</div>
                    </div>
                    <div style={{ marginLeft: "auto", ...chip("rgba(245,166,35,.18)", C.amber, "transparent"), padding: "2px 8px", fontSize: px(9) }}>TEAM LEADER</div>
                </div>
                <div style={{ borderRadius: px(12), border: `1px solid ${C.border}`, background: C.card1, padding: "10px 12px", marginBottom: px(16) }}>
                    <div style={{ fontFamily: F.mono, fontSize: px(9), color: C.textMuted, letterSpacing: "1.5px" }}>INCENTIVE</div>
                    <div style={{ marginTop: px(8), fontFamily: F.sans, fontSize: px(12), color: C.textPrimary }}>Own 1% on team collection · This month: ₹1,842</div>
                </div>
                <button style={{ width: "100%", borderRadius: px(12), border: `1px solid rgba(224,82,82,.7)`, background: "transparent", padding: "10px 12px", fontFamily: F.sans, fontSize: px(12), color: C.red }}>Log Out</button>
            </div>
            <TLBottomNav navTab="tl_profile" onNav={onNav} />
        </div>
    );
}

// =========================================================================
// ROLE 4 - FRANCHISEE APP (Accent: PURPLE)
// =========================================================================

function FRBottomNav({ navTab, onNav }) {
    return <BottomNav navTab={navTab} onNav={onNav} accent={C.purple} items={[
        { id: "fr_home",         label: "Home",    icon: I.home   },
        { id: "fr_team",         label: "Team",    icon: I.users  },
        { id: "fr_applications", label: "Apps",    icon: I.list   },
        { id: "fr_finance",      label: "Finance", icon: I.chart  },
        { id: "fr_profile",      label: "Profile", icon: I.person }
    ]} />;
}

function FRHome({ onNav }) {
    const bars = [
        { label: "MUDRA Tarun", h: 70, val: "₹2.1Cr", color: C.clay },
        { label: "PM SVANidhi", h: 45, val: "₹78L",  color: C.success },
        { label: "CGTMSE",      h: 32, val: "₹55L",  color: C.amber },
        { label: "Others",      h: 18, val: "₹26L",  color: C.card2 },
    ];
    return (
        <div className="sc" style={{ background: C.bg, position: "relative" }}>
            <SB />
            <div className="hide-scroll" style={{ padding: "10px 16px 110px", overflowY: "auto", overflowX: "hidden" }}>
                <RoleHeader role="franchisee" name="Suresh Iyer" title="Chennai Franchise · FR-TN-0024">
                    {/* Revenue card with violet glow */}
                    <div style={{ marginTop: px(12), borderRadius: px(14), border: `1px solid rgba(167,139,250,0.25)`, background: "linear-gradient(135deg,rgba(167,139,250,0.08),rgba(167,139,250,0.02))", padding: "14px" }}>
                        <div style={{ fontFamily: F.mono, fontSize: px(9), color: C.textMuted, letterSpacing: "1.5px", marginBottom: px(8) }}>THIS MONTH REVENUE</div>
                        <div style={{ fontFamily: F.serif, fontWeight: 900, fontSize: px(28), color: C.textPrimary, letterSpacing: "-0.5px" }}>
                            <AnimatedNumber value="482000" />
                        </div>
                        <div style={{ marginTop: px(8), display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: px(8) }}>
                            <div style={{ fontFamily: F.sans, fontSize: px(12), color: C.textSecondary }}>Commission: <span style={{ color: C.success, fontWeight: 600 }}>₹28,920</span></div>
                            <div style={{ fontFamily: F.sans, fontSize: px(12), color: C.textSecondary }}>Pending: <span style={{ color: C.amber, fontWeight: 600 }}>₹14,400</span></div>
                        </div>
                        <button onClick={() => onNav("fr_finance")} style={{ marginTop: px(12), ...ghostCta(C.purple, { height: px(38), border: `1px solid rgba(167,139,250,0.3)`, fontSize: px(13) }) }}>
                            Download Statement →
                        </button>
                    </div>
                </RoleHeader>

                {/* KPI grid */}
                <div style={{ marginTop: px(16), display: "grid", gridTemplateColumns: "1fr 1fr", gap: px(10) }}>
                    {[
                        { label: "Total Leads", val: "186" },
                        { label: "Approvals",   val: "64"  },
                        { label: "Active Execs",val: "12"  },
                        { label: "Objections",  val: "8"   }
                    ].map((k) => (
                        <div key={k.label} className="tappable" style={{ borderRadius: px(14), border: `1px solid ${C.border}`, background: C.card1, padding: "14px 14px" }}>
                            <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: px(20), color: C.purple }}>{k.val}</div>
                            <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted, marginTop: px(4) }}>{k.label}</div>
                        </div>
                    ))}
                </div>

                {/* Scheme bar chart */}
                <div style={{ marginTop: px(20) }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: px(12) }}>
                        <div style={{ fontFamily: F.sans, fontWeight: 700, fontSize: px(14), color: C.textPrimary }}>Scheme Performance</div>
                        <div style={{ fontFamily: F.mono, fontSize: px(10), color: C.textMuted }}>This Month</div>
                    </div>
                    <div style={{ borderRadius: px(14), border: `1px solid ${C.border}`, background: C.card1, padding: "14px 14px" }}>
                        <div style={{ display: "flex", alignItems: "flex-end", gap: px(10), height: px(90) }}>
                            {bars.map((b, i) => (
                                <div key={b.label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: px(4) }}>
                                    <div style={{ fontFamily: F.mono, fontSize: px(9), color: C.textSecondary }}>{b.val}</div>
                                    <div style={{
                                        width: "100%", borderRadius: px(6),
                                        background: `linear-gradient(180deg,${b.color},${b.color}99)`,
                                        height: px(b.h),
                                        animation: `progressFill 0.${8 + i}s ease-out both`,
                                        animationDelay: `${i * 0.1}s`
                                    }} />
                                </div>
                            ))}
                        </div>
                        <div style={{ display: "flex", gap: px(10), marginTop: px(8) }}>
                            {bars.map((b) => (
                                <div key={b.label} style={{ flex: 1, fontFamily: F.sans, fontSize: px(9), color: C.textMuted, textAlign: "center" }}>{b.label}</div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Geo indicator */}
                <div style={{ marginTop: px(14), borderRadius: px(12), border: `1px solid ${C.border}`, background: C.card1, padding: "10px 14px", display: "flex", alignItems: "center", gap: px(8) }}>
                    {I.pin(C.purple, 16)}
                    <div style={{ fontFamily: F.sans, fontSize: px(12), color: C.textSecondary }}>Active region: <span style={{ color: C.textPrimary, fontWeight: 600 }}>Tamil Nadu · Chennai</span></div>
                </div>
            </div>
            <FRBottomNav navTab="fr_home" onNav={onNav} />
        </div>
    );
}

function FRTeam({ onNav }) {
    return (
        <div className="sc" style={{ background: C.bg, position: "relative" }}>
            <SB />
            <div style={{ padding: "8px 16px 10px", borderBottom: `1px solid ${C.border}` }}>
                <div style={{ fontFamily: F.serif, fontWeight: 700, fontSize: px(18), color: C.textPrimary }}>Team</div>
                <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted }}>3 Team Leaders · 12 Sales Execs</div>
            </div>
            <div className="hide-scroll" style={{ padding: "12px 16px 90px", overflowY: "auto" }}>
                {[{ name: "Priya Menon", role: "Team Leader", size: 8, collection: "₹1,84,200" }].map((m) => (
                    <div key={m.name} style={{ borderRadius: px(12), border: `1px solid ${C.border}`, background: C.card1, padding: "10px 12px", marginBottom: px(8) }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div>
                                <div style={{ fontFamily: F.sans, fontSize: px(13), color: C.textPrimary }}>{m.name}</div>
                                <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted }}>{m.role} · Team of {m.size}</div>
                            </div>
                            <div style={{ fontFamily: F.mono, fontSize: px(12), color: C.purple }}>{m.collection}</div>
                        </div>
                    </div>
                ))}
            </div>
            <FRBottomNav navTab="fr_team" onNav={onNav} />
        </div>
    );
}

function FRApplications({ onNav }) {
    return (
        <div className="sc" style={{ background: C.bg, position: "relative" }}>
            <SB />
            <div style={{ padding: "8px 16px 10px", borderBottom: `1px solid ${C.border}` }}>
                <div style={{ fontFamily: F.serif, fontWeight: 700, fontSize: px(18), color: C.textPrimary }}>Applications</div>
                <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted }}>All applications across branch</div>
            </div>
            <div className="hide-scroll" style={{ padding: "12px 16px 90px", overflowY: "auto" }}>
                {[{ name: "Ravi Kumar", scheme: "MUDRA Tarun", amt: "₹5L", status: "PENDING", exec: "Arjun Singh" }].map((a) => (
                    <div key={a.name} style={{ borderRadius: px(12), border: `1px solid ${C.border}`, background: C.card1, padding: "10px 12px", marginBottom: px(8) }}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div>
                                <div style={{ fontFamily: F.sans, fontSize: px(13), color: C.textPrimary }}>{a.name}</div>
                                <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted }}>Assigned to {a.exec}</div>
                            </div>
                            <div style={{ ...chip(C.amber + "1A", C.amber, "transparent"), padding: "2px 8px", fontSize: px(9) }}>{a.status}</div>
                        </div>
                        <div style={{ marginTop: px(6) }}>
                            <button style={{ ...cta(C.clay, { width: "auto", height: px(30), padding: "0 10px", fontSize: px(10) }) }}>Pre-Check & Forward</button>
                            <button style={{ ...ghostCta(C.red, { width: "auto", height: px(30), padding: "0 10px", fontSize: px(10), marginLeft: px(8) }) }}>Escalate to Admin</button>
                        </div>
                    </div>
                ))}
            </div>
            <FRBottomNav navTab="fr_applications" onNav={onNav} />
        </div>
    );
}

function FRFinance({ onNav }) {
    return (
        <div className="sc" style={{ background: C.bg, position: "relative" }}>
            <SB />
            <div className="hide-scroll" style={{ padding: "10px 16px 90px", overflowY: "auto" }}>
                <RoleHeader role="franchisee" name="Commission & Revenue" title="Finance">
                    <div style={{ marginTop: px(10), borderRadius: px(12), border: `1px solid ${C.border}`, background: C.card1, padding: "10px 12px" }}>
                        <div style={{ fontFamily: F.sans, fontSize: px(12), color: C.textPrimary }}>Current month: ₹4,82,000 collection · ₹28,920 commission · ₹14,400 pending payout</div>
                    </div>
                </RoleHeader>
                <div style={{ marginTop: px(14) }}>
                    <div style={{ fontFamily: F.mono, fontSize: px(9), color: C.textMuted, letterSpacing: "1.5px", marginBottom: px(6) }}>PENDING PAYOUTS</div>
                    {[{ date: "Mar 10", amt: "₹14,400" }].map((p) => (
                        <div key={p.date} style={{ borderRadius: px(12), border: `1px solid ${C.border}`, background: C.card1, padding: "10px 12px", marginBottom: px(8) }}>
                            <div style={{ fontFamily: F.sans, fontSize: px(12), color: C.textPrimary }}>Expected {p.date}</div>
                            <div style={{ fontFamily: F.mono, fontSize: px(14), color: C.purple }}>{p.amt}</div>
                        </div>
                    ))}
                </div>
                <button style={{ ...cta(C.clay, { marginTop: px(8) }) }}>Download Report</button>
            </div>
            <FRBottomNav navTab="fr_finance" onNav={onNav} />
        </div>
    );
}

function FRProfile({ onNav }) {
    return (
        <div className="sc" style={{ background: C.bg, position: "relative" }}>
            <SB />
            <div className="hide-scroll" style={{ padding: "14px 16px 90px", overflowY: "auto" }}>
                <div style={{ display: "flex", alignItems: "center", gap: px(12), marginBottom: px(16) }}>
                    <div style={{ width: px(42), height: px(42), borderRadius: "50%", background: C.card1, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F.sans, fontSize: px(16), color: C.textPrimary }}>SI</div>
                    <div>
                        <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: px(14), color: C.textPrimary }}>Suresh Iyer</div>
                        <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted }}>FR-TN-0024 · Chennai</div>
                    </div>
                    <div style={{ marginLeft: "auto", ...chip("rgba(167,139,250,.18)", C.purple, "transparent"), padding: "2px 8px", fontSize: px(9) }}>FRANCHISEE</div>
                </div>
                <div style={{ borderRadius: px(12), border: `1px solid ${C.border}`, background: C.card1, padding: "10px 12px", marginBottom: px(16) }}>
                    <div style={{ fontFamily: F.mono, fontSize: px(9), color: C.textMuted, letterSpacing: "1.5px" }}>CONTRACT</div>
                    <div style={{ marginTop: px(6), fontFamily: F.sans, fontSize: px(12), color: C.textPrimary }}>KYC: Verified ✓ · Digital Agreement: Signed Mar 1, 2024 ✓</div>
                </div>
                <button style={{ width: "100%", borderRadius: px(12), border: `1px solid rgba(224,82,82,.7)`, background: "transparent", padding: "10px 12px", fontFamily: F.sans, fontSize: px(12), color: C.red }}>Log Out</button>
            </div>
            <FRBottomNav navTab="fr_profile" onNav={onNav} />
        </div>
    );
}

// =========================================================================
// ROLE 5 - ADMINISTRATOR APP (Accent: BLUE)
// =========================================================================

function ADBottomNav({ navTab, onNav }) {
    return <BottomNav navTab={navTab} onNav={onNav} accent={C.blue} items={[
        { id: "ad_home",         label: "Home",    icon: I.home      },
        { id: "ad_users",        label: "Users",   icon: I.users     },
        { id: "ad_applications", label: "Apps",    icon: I.list      },
        { id: "ad_schemes",      label: "Schemes", icon: I.briefcase },
        { id: "ad_settings",     label: "Settings",icon: I.settings  }
    ]} />;
}

function ADHome({ onNav }) {
    const funnel = [
        { label: "Total Leads",    n: 486, pct: 100, color: C.blue },
        { label: "Docs Verified",  n: 312, pct: 64,  color: C.blue + "CC" },
        { label: "Sent to Bank",   n: 198, pct: 41,  color: C.blue + "99" },
        { label: "Approved",       n: 142, pct: 29,  color: C.success },
        { label: "Disbursed",      n: 118, pct: 24,  color: C.success },
    ];
    const health = [
        { label: "API", status: "Operational" },
        { label: "Payments", status: "Active" },
        { label: "ML Engine", status: "Operational" },
    ];
    return (
        <div className="sc" style={{ background: C.bg, position: "relative" }}>
            <SB />
            <div className="hide-scroll" style={{ padding: "10px 16px 110px", overflowY: "auto", overflowX: "hidden" }}>
                <RoleHeader role="admin" name="Command Center" title="Loan Doctor Platform">
                    {/* KPI strip */}
                    <div style={{ marginTop: px(12), display: "flex", overflowX: "auto", gap: px(8), paddingRight: px(4) }}>
                        {[
                            { label: "Total Users", val: "2,841" },
                            { label: "Active Apps", val: "486"   },
                            { label: "Approved",    val: "142"   },
                            { label: "Disbursed",   val: "₹47Cr" },
                            { label: "Objections",  val: "23"    }
                        ].map((k) => (
                            <div key={k.label} className="tappable" style={{ minWidth: px(90), flexShrink: 0, borderRadius: px(12), border: `1px solid ${C.border}`, background: C.card1, padding: "10px 10px" }}>
                                <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: px(14), color: C.blue }}>{k.val}</div>
                                <div style={{ fontFamily: F.sans, fontSize: px(10), color: C.textMuted, whiteSpace: "nowrap", marginTop: px(2) }}>{k.label}</div>
                            </div>
                        ))}
                    </div>
                    {/* System health pills */}
                    <div style={{ marginTop: px(12), display: "flex", gap: px(8), flexWrap: "wrap" }}>
                        {health.map((h) => (
                            <div key={h.label} style={{ display: "flex", alignItems: "center", gap: px(6), background: C.successDim, border: "1px solid rgba(34,197,94,0.25)", borderRadius: px(20), padding: "4px 10px" }}>
                                <div style={{ width: px(6), height: px(6), borderRadius: "50%", background: C.success, animation: "dotP 2s ease infinite" }} />
                                <span style={{ fontFamily: F.mono, fontSize: px(10), color: C.success }}>{h.label}: {h.status}</span>
                            </div>
                        ))}
                    </div>
                </RoleHeader>

                {/* Funnel visualization */}
                <div style={{ marginTop: px(18) }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: px(12) }}>
                        <div style={{ fontFamily: F.sans, fontWeight: 700, fontSize: px(14), color: C.textPrimary }}>Applications Funnel</div>
                        <div style={{ fontFamily: F.mono, fontSize: px(10), color: C.textMuted }}>Live</div>
                    </div>
                    <div style={{ borderRadius: px(14), border: `1px solid ${C.border}`, background: C.card1, padding: "14px", display: "flex", flexDirection: "column", gap: px(8) }}>
                        {funnel.map((f) => (
                            <div key={f.label}>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: px(4) }}>
                                    <div style={{ fontFamily: F.sans, fontSize: px(12), color: C.textSecondary }}>{f.label}</div>
                                    <div style={{ fontFamily: F.mono, fontSize: px(12), color: f.color, fontWeight: 700 }}>{f.n}</div>
                                </div>
                                <div style={{ height: px(6), background: C.card2, borderRadius: px(3) }}>
                                    <div style={{ width: `${f.pct}%`, height: "100%", background: f.color, borderRadius: px(3), animation: "progressFill 0.8s ease-out both" }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Objection queue */}
                <div style={{ marginTop: px(16), borderRadius: px(14), border: `1px solid rgba(239,68,68,0.25)`, background: C.dangerDim, padding: "14px" }}>
                    <div style={{ fontFamily: F.mono, fontSize: px(9), color: C.danger, letterSpacing: "1px", marginBottom: px(6) }}>ACTION REQUIRED</div>
                    <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: px(14), color: C.textPrimary }}>23 Objections Pending</div>
                    <div style={{ fontFamily: F.sans, fontSize: px(12), color: C.textSecondary, marginTop: px(4) }}>Banks have raised objections on these applications</div>
                    <button onClick={() => onNav("ad_applications")} style={{ marginTop: px(12), ...cta(C.danger, { height: px(38), fontSize: px(12) }) }}>Review Objections →</button>
                </div>

                {/* Recent activity */}
                <div style={{ marginTop: px(18), marginBottom: px(24) }}>
                    <div style={{ fontFamily: F.sans, fontWeight: 700, fontSize: px(14), color: C.textPrimary, marginBottom: px(10) }}>Recent Activity</div>
                    {[
                        { icon: C.success, text: "New franchisee onboarded — Chennai (FR-TN-0024)", time: "2h ago" },
                        { icon: C.blue,    text: "₹8L disbursed — MUDRA Tarun — Ravi Kumar", time: "4h ago" },
                        { icon: C.danger,  text: "Objection raised — CGTMSE — Arjun's lead", time: "5h ago" },
                    ].map((a, i) => (
                        <div key={i} style={{ borderRadius: px(12), border: `1px solid ${C.border}`, background: C.card1, padding: "10px 14px", marginBottom: px(8), display: "flex", alignItems: "center", gap: px(10) }}>
                            <div style={{ width: px(8), height: px(8), borderRadius: "50%", background: a.icon, flexShrink: 0 }} />
                            <div style={{ flex: 1, fontFamily: F.sans, fontSize: px(12), color: C.textSecondary }}>{a.text}</div>
                            <div style={{ fontFamily: F.mono, fontSize: px(10), color: C.textMuted, flexShrink: 0 }}>{a.time}</div>
                        </div>
                    ))}
                </div>
            </div>
            <ADBottomNav navTab="ad_home" onNav={onNav} />
        </div>
    );
}

function ADUsers({ onNav }) {
    return (
        <div className="sc" style={{ background: C.bg, position: "relative" }}>
            <SB />
            <div style={{ padding: "8px 16px 10px", borderBottom: `1px solid ${C.border}` }}>
                <div style={{ fontFamily: F.serif, fontWeight: 700, fontSize: px(18), color: C.textPrimary }}>User Management</div>
                <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted }}>Franchisees · Team Leaders · Sales Execs · Customers</div>
            </div>
            <div className="hide-scroll" style={{ padding: "12px 16px 90px", overflowY: "auto" }}>
                {["Franchisees", "Team Leaders", "Sales Execs", "Customers"].map((tab) => (
                    <button key={tab} style={{ marginRight: px(8), marginBottom: px(8), padding: "6px 12px", borderRadius: px(999), border: `1px solid ${C.border}`, background: C.card1, fontFamily: F.sans, fontSize: px(11), color: C.textPrimary }}>{tab}</button>
                ))}
                {[{ name: "Suresh Iyer", id: "FR-TN-0024", status: "Active" }, { name: "Priya Menon", id: "TL-CH-003", status: "Active" }].map((u) => (
                    <div key={u.id} style={{ borderRadius: px(12), border: `1px solid ${C.border}`, background: C.card1, padding: "10px 12px", marginBottom: px(8) }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: px(8) }}>
                                <div style={{ width: px(32), height: px(32), borderRadius: "50%", background: C.card2, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F.sans, fontSize: px(11), color: C.textPrimary }}>{u.name.split(" ").map((x) => x[0]).join("")}</div>
                                <div>
                                    <div style={{ fontFamily: F.sans, fontSize: px(13), color: C.textPrimary }}>{u.name}</div>
                                    <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted }}>{u.id}</div>
                                </div>
                            </div>
                            <div style={{ ...chip("rgba(76,201,160,.18)", C.teal, "transparent"), padding: "2px 8px", fontSize: px(9) }}>{u.status}</div>
                        </div>
                    </div>
                ))}
            </div>
            <ADBottomNav navTab="ad_users" onNav={onNav} />
        </div>
    );
}

function ADApplications({ onNav }) {
    return (
        <div className="sc" style={{ background: C.bg, position: "relative" }}>
            <SB />
            <div style={{ padding: "8px 16px 10px", borderBottom: `1px solid ${C.border}` }}>
                <div style={{ fontFamily: F.serif, fontWeight: 700, fontSize: px(18), color: C.textPrimary }}>All Applications</div>
                <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted }}>Filter by status, scheme, franchise</div>
            </div>
            <div className="hide-scroll" style={{ padding: "12px 16px 90px", overflowY: "auto" }}>
                {[{ name: "Ravi Kumar", scheme: "MUDRA Tarun", status: "PENDING" }].map((a) => (
                    <div key={a.name} style={{ borderRadius: px(12), border: `1px solid ${C.border}`, background: C.card1, padding: "10px 12px", marginBottom: px(8) }}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div style={{ fontFamily: F.sans, fontSize: px(13), color: C.textPrimary }}>{a.name} · {a.scheme}</div>
                            <div style={{ ...chip(C.amber + "1A", C.amber, "transparent"), padding: "2px 8px", fontSize: px(9) }}>{a.status}</div>
                        </div>
                        <div style={{ marginTop: px(6), display: "flex", gap: px(8) }}>
                            <button style={{ ...cta(C.teal, { width: "auto", height: px(30), padding: "0 10px", fontSize: px(10) }) }}>Approve for Bank</button>
                            <button style={{ ...ghostCta(C.red, { width: "auto", height: px(30), padding: "0 10px", fontSize: px(10) }) }}>Reject</button>
                        </div>
                    </div>
                ))}
            </div>
            <ADBottomNav navTab="ad_applications" onNav={onNav} />
        </div>
    );
}

function ADSchemes({ onNav }) {
    return (
        <div className="sc" style={{ background: C.bg, position: "relative" }}>
            <SB />
            <div style={{ padding: "8px 16px 10px", borderBottom: `1px solid ${C.border}` }}>
                <div style={{ fontFamily: F.serif, fontWeight: 700, fontSize: px(18), color: C.textPrimary }}>Scheme Master</div>
                <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted }}>Central & State schemes</div>
            </div>
            <div className="hide-scroll" style={{ padding: "12px 16px 90px", overflowY: "auto", overflowX: "hidden" }}>
                {[{ name: "MUDRA Tarun", ministry: "PM Mudra Yojana", amount: "₹10L", rate: "8.5%", status: "Active" }].map((s) => (
                    <div key={s.name} style={{ borderRadius: px(12), border: `1px solid ${C.border}`, background: C.card1, padding: "10px 12px", marginBottom: px(8) }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: px(8) }}>
                            <div>
                                <div style={{ fontFamily: F.sans, fontSize: px(13), color: C.textPrimary }}>{s.name}</div>
                                <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted }}>{s.ministry} · {s.amount} · {s.rate}</div>
                            </div>
                            <div style={{ ...chip("rgba(76,201,160,.18)", C.teal, "transparent"), padding: "2px 8px", fontSize: px(9) }}>{s.status}</div>
                        </div>
                    </div>
                ))}
            </div>
            <ADBottomNav navTab="ad_schemes" onNav={onNav} />
        </div>
    );
}

function ADSettings({ onNav }) {
    return (
        <div className="sc" style={{ background: C.bg, position: "relative" }}>
            <SB />
            <div className="hide-scroll" style={{ padding: "10px 16px 90px", overflowY: "auto" }}>
                <RoleHeader role="admin" name="System Configuration" title="Settings">
                    <div style={{ marginTop: px(10) }}>
                        <div style={{ fontFamily: F.mono, fontSize: px(9), color: C.textMuted, letterSpacing: "1.5px", marginBottom: px(6) }}>COMMISSION RULES</div>
                        <div style={{ borderRadius: px(12), border: `1px solid ${C.border}`, background: C.card1, padding: "10px 12px", marginBottom: px(8) }}>SE slabs · TL incentive 1% · Franchisee %</div>
                        <button style={{ ...cta(C.clay, { marginBottom: px(12) }) }}>Save Commission Rules</button>
                    </div>
                    <div style={{ marginTop: px(10) }}>
                        <div style={{ fontFamily: F.mono, fontSize: px(9), color: C.textMuted, letterSpacing: "1.5px", marginBottom: px(6) }}>NOTIFICATION SETTINGS</div>
                        <div style={{ borderRadius: px(12), border: `1px solid ${C.border}`, background: C.card1, padding: "10px 12px" }}>Objection alerts · Approval alerts · Payout alerts</div>
                    </div>
                    <div style={{ marginTop: px(16), borderRadius: px(12), border: "1px solid rgba(224,82,82,.5)", padding: "10px 12px" }}>
                        <div style={{ fontFamily: F.sans, fontSize: px(12), color: C.red }}>Danger Zone</div>
                        <button disabled style={{ ...ghostCta(C.red, { marginTop: px(8), opacity: 0.6 }) }}>Reset Platform Data (disabled)</button>
                    </div>
                </RoleHeader>
            </div>
            <ADBottomNav navTab="ad_settings" onNav={onNav} />
        </div>
    );
}

// =========================================================================
// SIMPLE PLACEHOLDER / TODO SCREENS (to avoid broken navigation)
// =========================================================================

function PlaceholderScreen({ title, onBack }) {
    return (
        <div className="sc" style={{ background: C.bg, display: "flex", flexDirection: "column" }}>
            <SB />
            <div style={{ padding: "12px 16px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: px(8) }}>
                <button
                    onClick={onBack}
                    style={{
                        background: C.card1,
                        border: `1px solid ${C.border}`,
                        borderRadius: px(10),
                        padding: "6px 10px",
                        display: "flex",
                        alignItems: "center",
                        gap: px(4),
                        color: C.textPrimary
                    }}
                >
                    {I.back(C.textPrimary, 16)}
                    <span style={{ fontFamily: F.sans, fontSize: px(12), fontWeight: 600 }}>Back</span>
                </button>
                <span style={{ fontFamily: F.sans, fontSize: px(13), color: C.textMuted }}>Prototype section in progress</span>
            </div>
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 24px" }}>
                <div
                    style={{
                        background: C.card1,
                        borderRadius: px(14),
                        border: `1px dashed ${C.borderMid}`,
                        padding: "20px 18px",
                        textAlign: "center",
                        maxWidth: px(280)
                    }}
                >
                    <div style={{ fontFamily: F.mono, fontSize: px(9), color: C.textMuted, letterSpacing: "1.5px", marginBottom: px(6) }}>COMING SOON</div>
                    <div style={{ fontFamily: F.serif, fontWeight: 700, fontSize: px(20), color: C.textPrimary, marginBottom: px(10) }}>
                        {title}
                    </div>
                    <div style={{ fontFamily: F.sans, fontSize: px(13), color: C.textMuted, lineHeight: 1.5 }}>
                        This part of the Loan Doctor prototype will be wired next. Flows, metrics, and interactions follow the product spec —
                        this is just a visual placeholder so the demo never breaks.
                    </div>
                </div>
            </div>
        </div>
    );
}

// Basic S09 – Request a Call (customer, minimal but product-like)
function S09RequestCall({ go, back }) {
    const slots = [
        { id: "morning", label: "Morning 9–12" },
        { id: "afternoon", label: "Afternoon 12–4" },
        { id: "evening", label: "Evening 4–7" }
    ];
    const [slot, setSlot] = useState("afternoon");

    return (
        <div className="sc" style={{ background: C.bg, display: "flex", flexDirection: "column" }}>
            <SB />
            <div style={{ padding: "0 16px 12px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <button
                    onClick={back}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: px(5),
                        background: C.card1,
                        border: `1px solid ${C.border}`,
                        borderRadius: px(10),
                        padding: "6px 12px 6px 8px",
                        color: C.textPrimary
                    }}
                >
                    {I.back(C.textPrimary, 15)}
                    <span style={{ fontFamily: F.sans, fontSize: px(13), fontWeight: 600 }}>Back</span>
                </button>
                <div style={chip(C.card1, C.teal, C.teal + "40")}>Free Expert Consultation</div>
            </div>

            <div style={{ padding: "18px 20px 0", flex: 1, display: "flex", flexDirection: "column", gap: px(18) }}>
                <div
                    style={{
                        background: C.card1,
                        borderRadius: px(14),
                        border: `1px solid ${C.border}`,
                        padding: "14px 14px 12px",
                        display: "flex",
                        gap: px(10),
                        alignItems: "center"
                    }}
                >
                    <div
                        style={{
                            width: px(40),
                            height: px(40),
                            borderRadius: "50%",
                            background: C.card2,
                            border: `1px solid ${C.borderMid}`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        {I.person(C.teal, 20)}
                    </div>
                    <div>
                        <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: px(14), color: C.textPrimary }}>Ramesh K. — Senior Loan Advisor</div>
                        <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted }}>Free 20-min · No commitment</div>
                    </div>
                </div>

                <div>
                    <div style={{ fontFamily: F.mono, fontSize: px(9), color: C.textMuted, letterSpacing: "1.5px", marginBottom: px(6) }}>YOUR DETAILS</div>
                    <div
                        style={{
                            background: C.card1,
                            borderRadius: px(10),
                            border: `1px solid ${C.border}`,
                            padding: "10px 12px",
                            display: "flex",
                            flexDirection: "column",
                            gap: px(6)
                        }}
                    >
                        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: F.sans, fontSize: px(13), color: C.textPrimary }}>
                            <span>Rahul Kumar</span>
                            <span style={{ color: C.textMuted }}>Edit</span>
                        </div>
                        <div style={{ fontFamily: F.sans, fontSize: px(12), color: C.textMuted }}>+91-98••• 24••</div>
                    </div>
                </div>

                <div>
                    <div style={{ fontFamily: F.mono, fontSize: px(9), color: C.textMuted, letterSpacing: "1.5px", marginBottom: px(8) }}>PREFERRED TIME</div>
                    <div style={{ display: "flex", gap: px(10) }}>
                        {slots.map((s) => {
                            const active = slot === s.id;
                            return (
                                <button
                                    key={s.id}
                                    onClick={() => setSlot(s.id)}
                                    style={{
                                        flex: 1,
                                        borderRadius: px(10),
                                        border: `1px solid ${active ? C.clay : C.border}`,
                                        background: active ? "rgba(200,75,12,.08)" : C.card1,
                                        padding: "10px 8px",
                                        fontFamily: F.sans,
                                        fontSize: px(12),
                                        color: active ? C.clay : C.textPrimary
                                    }}
                                >
                                    {s.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div
                    style={{
                        fontFamily: F.sans,
                        fontSize: px(11),
                        color: C.textMuted,
                        display: "flex",
                        alignItems: "center",
                        gap: px(6)
                    }}
                >
                    {I.lock(C.textMuted, 14)}
                    <span>100% free · No spam · Cancel anytime</span>
                </div>
            </div>

            <div style={{ padding: "0 20px 26px" }}>
                <button onClick={() => go("s10_call_booked")} style={cta(C.clay)}>
                    Request Callback
                </button>
            </div>
        </div>
    );
}

// =========================================================================
// APP SHELL & NAVIGATION
// =========================================================================

function LoanDoctorPlatformApp() {
    const [role, setRole] = useState(null); // customer | sales_exec | team_leader | franchisee | admin
    const [screen, setScreen] = useState("s01");
    const [history, setHistory] = useState([]);
    const [navTab, setNavTab] = useState(null);
    const [hasPurchase, setHasPurchase] = useState(false);
    const [selectedScheme, setSelectedScheme] = useState(null);

    const go = (next, data) => {
        setHistory((prev) => [...prev, { screen, navTab }]);
        if (next === "scheme_detail" && data) {
            setSelectedScheme(data);
        }
        if (next === "customer_main") {
            setHasPurchase(true);
            setNavTab("home");
            setScreen("cust_home");
            return;
        }
        if (next === "schemes_browse" && data && data.from === "main") {
            setHasPurchase(true);
        }
        setScreen(next);
    };

    const back = () => {
        setHistory((prev) => {
            if (!prev.length) return prev;
            const last = prev[prev.length - 1];
            setScreen(last.screen);
            setNavTab(last.navTab || null);
            return prev.slice(0, -1);
        });
    };

    const onNav = (tabId) => {
        setNavTab(tabId);
        setHistory([]);
        if (role === "customer") {
            if (tabId === "home") setScreen("cust_home");
            if (tabId === "schemes") setScreen("schemes_browse");
            if (tabId === "my_app") setScreen("cust_my_app");
            if (tabId === "chat") setScreen("cust_chat");
            if (tabId === "profile") setScreen("cust_profile");
        }
        if (role === "sales_exec") {
            if (tabId === "se_home") setScreen("se_home");
            if (tabId === "se_leads") setScreen("se_leads");
            if (tabId === "se_checklist") setScreen("se_checklist");
            if (tabId === "se_profile") setScreen("se_profile");
        }
        if (role === "team_leader") {
            if (tabId === "tl_home") setScreen("tl_home");
            if (tabId === "tl_team") setScreen("tl_team");
            if (tabId === "tl_leads") setScreen("tl_leads");
            if (tabId === "tl_profile") setScreen("tl_profile");
        }
        if (role === "franchisee") {
            if (tabId === "fr_home") setScreen("fr_home");
            if (tabId === "fr_team") setScreen("fr_team");
            if (tabId === "fr_applications") setScreen("fr_applications");
            if (tabId === "fr_finance") setScreen("fr_finance");
            if (tabId === "fr_profile") setScreen("fr_profile");
        }
        if (role === "admin") {
            if (tabId === "ad_home") setScreen("ad_home");
            if (tabId === "ad_users") setScreen("ad_users");
            if (tabId === "ad_applications") setScreen("ad_applications");
            if (tabId === "ad_schemes") setScreen("ad_schemes");
            if (tabId === "ad_settings") setScreen("ad_settings");
        }
    };

    const selectRole = (r) => {
        setRole(r);
        setHistory([]);
        setNavTab(null);
        const roleHome = {
            customer: "s06",
            sales_exec: "se_home",
            team_leader: "tl_home",
            franchisee: "fr_home",
            admin: "ad_home"
        }[r];
        setScreen(roleHome || "s06");
    };

    const renderScreen = () => {
        switch (screen) {
            case "s01":
                return <S01 go={go} />;
            case "s02":
                return <S02 go={go} back={back} />;
            case "s03":
                return <S03 go={go} back={back} />;
            case "s04":
                return <S04 selectRole={selectRole} back={back} />;
            case "s06":
                return <S06 go={go} />;
            case "s07":
                return <S07 go={go} back={back} setSchemeData={setSelectedScheme} isOverlay={false} />;
            case "s09":
                return <S09RequestCall go={go} back={back} />;
            case "s10_call_booked":
                return <CallBooked go={go} />;
            case "schemes_browse":
                return <SchemesBrowser go={go} hasPurchase={hasPurchase} />;
            case "scheme_detail":
                return <SchemeDetail go={go} back={back} scheme={selectedScheme} hasPurchase={hasPurchase} />;
            case "specialist_confirm":
                return <SpecialistConfirm go={go} back={back} scheme={selectedScheme} />;
            case "specialist_booked":
                return <SpecialistBooked go={go} />;
            case "marketing_home":
                return <MarketingHome go={go} />;
            case "payment":
                return <PaymentScreen go={go} back={back} scheme={selectedScheme} />;
            case "payment_success":
                return <PaymentSuccess go={go} />;
            case "cust_home":
                return <CustomerHome onNav={onNav} />;
            case "cust_my_app":
                return <CustomerMyApp onNav={onNav} />;
            case "cust_chat":
                return <CustomerChat onNav={onNav} />;
            case "cust_profile":
                return <CustomerProfile onNav={onNav} />;
            case "se_home":
                return <SalesExecHome onNav={onNav} />;
            case "se_leads":
                return <SalesExecLeads onNav={onNav} />;
            case "se_new_lead":
                return <SalesExecNewLead onNav={onNav} />;
            case "se_checklist":
                return <SalesExecChecklist onNav={onNav} />;
            case "se_profile":
                return <SalesExecProfile onNav={onNav} />;
            case "tl_home":
                return <TLHome onNav={onNav} />;
            case "tl_team":
                return <TLTeam onNav={onNav} />;
            case "tl_leads":
                return <TLLeads onNav={onNav} />;
            case "tl_profile":
                return <TLProfile onNav={onNav} />;
            case "fr_home":
                return <FRHome onNav={onNav} />;
            case "fr_team":
                return <FRTeam onNav={onNav} />;
            case "fr_applications":
                return <FRApplications onNav={onNav} />;
            case "fr_finance":
                return <FRFinance onNav={onNav} />;
            case "fr_profile":
                return <FRProfile onNav={onNav} />;
            case "ad_home":
                return <ADHome onNav={onNav} />;
            case "ad_users":
                return <ADUsers onNav={onNav} />;
            case "ad_applications":
                return <ADApplications onNav={onNav} />;
            case "ad_schemes":
                return <ADSchemes onNav={onNav} />;
            case "ad_settings":
                return <ADSettings onNav={onNav} />;
            default:
                return <PlaceholderScreen title="Prototype screen" onBack={back} />;
        }
    };

    const showFloatingMic = role === "customer" && hasPurchase && navTab !== "chat";

    return (
        <>
            <StyleBlock />
            <div className="app-frame">
                <div className="dynamic-island" />
                {renderScreen()}
                {showFloatingMic && (
                    <button
                        onClick={() => go("s07")}
                        style={{
                            position: "absolute",
                            right: px(22),
                            bottom: px(84),
                            width: px(52),
                            height: px(52),
                            borderRadius: "50%",
                            background: C.clay,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#fff",
                            animation: "fabP 2s infinite",
                            boxShadow: "0 6px 20px rgba(200,75,12,.5)",
                            zIndex: 50
                        }}
                    >
                        {I.mic("#fff", 22)}
                    </button>
                )}
            </div>
        </>
    );
}

export default LoanDoctorPlatformApp;
