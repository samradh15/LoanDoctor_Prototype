import React, { useState, useEffect } from "react";

const px = (n) => `${n}px`;

const C = {
    bg: "#111510", card1: "#1C2118", card2: "#242B20",
    clay: "#C84B0C", teal: "#4CC9A0", amber: "#F5A623",
    textPrimary: "#EDF0E8", textMuted: "#7A8072",
    border: "rgba(237,240,232,0.07)",
};

const F = {
    serif: "'Fraunces', serif",
    sans: "'Plus Jakarta Sans', sans-serif",
    mono: "'Syne Mono', monospace"
};

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;0,9..144,900&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Syne+Mono&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
::-webkit-scrollbar{width:0;height:0;}
@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
@keyframes slideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}
@keyframes rA{0%,100%{transform:scale(1);opacity:.6}50%{transform:scale(1.07);opacity:.1}}
@keyframes rB{0%,100%{transform:scale(1);opacity:.55}50%{transform:scale(1.06);opacity:.08}}
@keyframes rC{0%,100%{transform:scale(1);opacity:.5}50%{transform:scale(1.05);opacity:.06}}
@keyframes sBar{0%,100%{transform:scaleY(.35)}50%{transform:scaleY(1)}}
@keyframes blink{0%,100%{opacity:1}50%{opacity:.25}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes strokeIn{from{stroke-dashoffset:200}to{stroke-dashoffset:0}}
@keyframes fabP{0%{box-shadow:0 0 0 0 rgba(200,75,12,.6)}70%{box-shadow:0 0 0 15px rgba(200,75,12,0)}100%{box-shadow:0 0 0 0 rgba(200,75,12,0)}}
@keyframes popIn{from{transform:scale(0)}to{transform:scale(1)}}
@keyframes msgIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
@keyframes dotP{0%,100%{transform:scale(1)}50%{transform:scale(1.2)}}
@keyframes badgeP{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}
.sc{animation:fadeUp .3s ease both;}
input,button{font-family:'Plus Jakarta Sans',sans-serif;}
button{cursor:pointer;border:none;}
`;

const chip = (col, extra = {}) => {
    const rgb = col === C.clay ? "200,75,12" : col === C.teal ? "76,201,160" : col === C.amber ? "245,166,35" : "237,240,232";
    return { background: `rgba(${rgb},.09)`, border: `1px solid rgba(${rgb},.2)`, color: col, borderRadius: px(5), padding: "3px 8px", fontSize: px(10), fontFamily: F.mono, display: "inline-block", ...extra };
};

const cta = (bg = C.clay, extra = {}) => ({
    width: "100%", height: px(50), borderRadius: px(13), background: bg,
    color: "#fff", fontSize: px(14), fontWeight: 600, fontFamily: F.sans,
    boxShadow: bg === C.clay ? "0 4px 20px rgba(200,75,12,.35)" : "none",
    display: "flex", alignItems: "center", justifyContent: "center", gap: px(8), ...extra
});

const ghostCta = (extra = {}) => ({
    width: "100%", height: px(50), borderRadius: px(13), background: "transparent",
    color: C.textPrimary, border: `1px solid rgba(237,240,232,.15)`, fontSize: px(14), fontWeight: 600, fontFamily: F.sans,
    display: "flex", alignItems: "center", justifyContent: "center", gap: px(8), ...extra
});

const I = {
    cross: (c = C.clay, s = 20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>,
  plus: (c = "#fff", s = 18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>,
    mic: (c = "#fff", s = 20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round"><rect x="9" y="2" width="6" height="11" rx="3" /><path d="M5 10a7 7 0 0014 0M12 19v3M8 22h8" /></svg>,
    home: (c, s = 18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" /><path d="M9 21V12h6v9" /></svg>,
    list: (c, s = 18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round"><path d="M3 6h18M3 12h18M3 18h18" /></svg>,
    folder: (c, s = 18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" /></svg>,
    chat: (c, s = 18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>,
    person: (c, s = 18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" /></svg>,
    bell: (c = C.textMuted, s = 18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" /></svg>,
    check: (c = C.teal, s = 13) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>,
    arrow: (c = "#fff", s = 15) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>,
    back: (c = C.textPrimary, s = 17) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>,
    doc: (c = C.teal, s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>,
    lock: (c = "#fff", s = 14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>,
    pin: (c = C.clay, s = 13) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round"><path d="M12 2a7 7 0 017 7c0 5-7 13-7 13S5 14 5 9a7 7 0 017-7z" /><circle cx="12" cy="9" r="2.5" /></svg>,
    filter: (c = C.textMuted, s = 15) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>,
    upload: (c = C.clay, s = 15) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>,
    call: (c = C.teal, s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.13 1.16 2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" /></svg>,
    video: (c = C.textMuted, s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" /></svg>,
    warn: (c = C.amber, s = 15) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /></svg>,
    info: (c = C.textMuted, s = 13) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>,
    play: (c = "#fff", s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill={c}><polygon points="5 3 19 12 5 21" /></svg>,
    chevron: (c = C.textMuted, s = 13) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><polyline points="6 9 12 15 18 9" /></svg>,
    gps: (c = C.teal, s = 14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="3" /><line x1="12" y1="2" x2="12" y2="6" /><line x1="12" y1="18" x2="12" y2="22" /><line x1="2" y1="12" x2="6" y2="12" /><line x1="18" y1="12" x2="22" y2="12" /></svg>,
    search: (c = C.textMuted, s = 15) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>,
    edit: (c = C.textMuted, s = 13) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>,
    wa: (c = C.teal, s = 20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" /></svg>,
    star: (c = C.amber, s = 14) => <svg width={s} height={s} viewBox="0 0 24 24" fill={c} stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
};

function SB() {
    const [t, setT] = useState(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    useEffect(() => { const i = setInterval(() => setT(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })), 15000); return () => clearInterval(i); }, []);
    return (
        <div style={{ height: px(46), display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 22px 0 26px", flexShrink: 0 }}>
            <span style={{ fontFamily: F.mono, fontSize: px(12), color: "rgba(237,240,232,.45)", fontWeight: 600 }}>{t}</span>
            <div style={{ display: "flex", alignItems: "center", gap: px(5) }}>
                {[3, 5, 7, 9].map((h, i) => <div key={i} style={{ width: px(3), height: px(h), background: "rgba(237,240,232,.4)", borderRadius: px(1.5) }} />)}
                <div style={{ display: "flex", gap: px(1.5), marginLeft: px(4) }}>{[1, 1, 1].map((_, i) => <div key={i} style={{ width: px(4), height: px(6), background: "rgba(237,240,232,.4)", borderRadius: px(1) }} />)}</div>
            </div>
        </div>
    );
}

function BNav({ active, onNav, hasPurchase }) {
    const tabs = hasPurchase ?
        [{ id: "main_home", l: "Home", ic: I.home }, { id: "schemes", l: "Schemes", ic: I.list }, { id: "myapp", l: "My App", ic: I.folder }, { id: "chat", l: "Chat", ic: I.chat }, { id: "profile", l: "Profile", ic: I.person }]
        : [{ id: "main_home", l: "Home", ic: I.home }, { id: "schemes", l: "Schemes", ic: I.list }, { id: "chat", l: "Chat", ic: I.chat }, { id: "profile", l: "Profile", ic: I.person }];

    return (
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: px(62), background: "rgba(17,21,16,.96)", backdropFilter: "blur(18px)", borderTop: `1px solid ${C.border}`, display: "flex", alignItems: "center", zIndex: 100 }}>
            {tabs.map(t => {
                const a = active === t.id; return (
                    <button key={t.id} onClick={() => onNav(t.id)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: px(3), background: "none", padding: "5px 0" }}>
                        <div style={{ width: px(34), height: px(26), borderRadius: px(9), background: a ? "rgba(200,75,12,.11)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "all .2s" }}>
                            {t.ic(a ? C.clay : C.textMuted)}
                        </div>
                        <span style={{ fontFamily: F.mono, fontSize: px(8), color: a ? C.clay : C.textMuted }}>{t.l}</span>
                    </button>
                );
            })}
        </div>
    );
}
// ── S01 SPLASH ─────────────────────────────────────────────────────────────
function S01({ go }) {
    useEffect(() => { const t = setTimeout(() => go("s02"), 2500); return () => clearTimeout(t); }, []);
    return (
        <div className="sc" style={{ height: "100%", background: C.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative" }}>
            <SB />
            <div style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: px(12) }}>
                <div style={{ position: "relative" }}>
                    <div style={{ position: "absolute", inset: "-38px", background: "radial-gradient(circle 180px at center,rgba(200,75,12,.07),transparent)", borderRadius: "50%" }} />
                    <div style={{ width: px(72), height: px(72), borderRadius: px(20), background: "#1E2419", border: "1px solid rgba(200,75,12,.22)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {I.cross(C.clay, 32)}
                    </div>
                </div>
                <div style={{ textAlign: "center" }}>
                    <div style={{ fontFamily: F.serif, fontWeight: 700, fontSize: px(27), color: C.textPrimary, letterSpacing: "-0.4px" }}>Loan Doctor</div>
                    <div style={{ fontFamily: F.mono, fontSize: px(10), color: "rgba(237,240,232,.32)", letterSpacing: "2.5px", marginTop: px(5) }}>YOUR LOAN. OUR PRESCRIPTION.</div>
                </div>
            </div>
            <div style={{ position: "absolute", bottom: px(56), display: "flex", gap: px(6), alignItems: "center" }}>
                <div style={{ width: px(16), height: px(5), borderRadius: px(3), background: C.clay }} />
                {[1, 2, 3].map(i => <div key={i} style={{ width: px(5), height: px(5), borderRadius: "50%", background: "rgba(237,240,232,.16)" }} />)}
            </div>
        </div>
    );
}

// ── S02 WHY CHOOSE US ──────────────────────────────────────────────────────
function S02({ go }) {
    const vals = [
        { bg: "rgba(200,75,12,.11)", ic: C.clay, title: "AI Voice Matching", sub: "Just speak — AI finds your best scheme instantly" },
        { bg: "rgba(76,201,160,.09)", ic: C.teal, title: "200+ Verified Schemes", sub: "Government & private, all RBI verified" },
        { bg: "rgba(245,166,35,.09)", ic: C.amber, title: "6 Indian Languages", sub: "Hindi, Tamil, Telugu, Marathi, Punjabi & more" },
    ];
    return (
        <div className="sc" style={{ height: "100%", background: C.bg, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <SB />
            <div style={{ height: px(195), background: C.card1, flexShrink: 0, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", backgroundImage: "linear-gradient(135deg,rgba(200,75,12,.055),transparent 55%)" }}>
                <div style={{ position: "absolute", top: px(12), left: px(12), background: C.card2, border: `1px solid ${C.border}`, borderRadius: px(6), padding: "4px 8px" }}>
                    <span style={{ fontFamily: F.mono, fontSize: px(9), color: C.textMuted }}>TRUSTED BY 50,000+ USERS</span>
                </div>
                <div style={{ position: "relative", width: px(140), height: px(140), display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ position: "absolute", inset: 0, border: "1.5px dashed rgba(200,75,12,.25)", borderRadius: "50%" }} />
                    <div style={{ position: "absolute", inset: px(20), border: "1.5px dashed rgba(76,201,160,.25)", borderRadius: "50%" }} />
                    {I.cross(C.clay, 30)}
                </div>
            </div>
            <div style={{ flex: 1, padding: "18px 16px 20px", overflow: "auto", display: "flex", flexDirection: "column" }}>
                <div style={{ fontFamily: F.mono, fontSize: px(9), color: C.clay, letterSpacing: "2px", marginBottom: px(5) }}>WHY CHOOSE US</div>
                <div style={{ fontFamily: F.serif, fontWeight: 700, fontSize: px(19), color: C.textPrimary, marginBottom: px(16), lineHeight: 1.2 }}>India's Smartest<br />Loan Advisory</div>
                <div style={{ display: "flex", flexDirection: "column", gap: px(9) }}>
                    {vals.map((v, i) => (
                        <div key={i} style={{ background: "rgba(237,240,232,.025)", border: `1px solid ${C.border}`, borderRadius: px(10), padding: "10px 12px", display: "flex", alignItems: "flex-start", gap: px(10) }}>
                            <div style={{ width: px(28), height: px(28), borderRadius: px(8), background: v.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                {I.cross(v.ic, 14)}
                            </div>
                            <div>
                                <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: px(12), color: C.textPrimary }}>{v.title}</div>
                                <div style={{ fontFamily: F.sans, fontSize: px(10), color: C.textMuted, marginTop: px(2) }}>{v.sub}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <div style={{ flex: 1 }} />
                <button onClick={() => go("s03")} style={cta(C.clay, { marginTop: px(18) })}>Get Started {I.arrow()}</button>
            </div>
        </div>
    );
}

// ── S03 LANGUAGE ───────────────────────────────────────────────────────────
function S03({ go }) {
    const [sel, setSel] = useState(0);
    const langs = [
        { flag: "🇮🇳", name: "हिंदी", nat: "Hindi" }, { flag: "🇬🇧", name: "English", nat: "English" },
        { flag: "🇮🇳", name: "Tamil", nat: "தமிழ்" }, { flag: "🇮🇳", name: "Telugu", nat: "తెలుగు" },
        { flag: "🇮🇳", name: "Marathi", nat: "मराठी" }, { flag: "🇮🇳", name: "Punjabi", nat: "ਪੰਜਾਬੀ" },
    ];
    return (
        <div className="sc" style={{ height: "100%", background: C.bg, display: "flex", flexDirection: "column" }}>
            <SB />
            <div style={{ padding: "0 16px 24px", flex: 1, overflow: "auto", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "center", gap: px(8), marginBottom: px(6) }}>
                    <div style={{ flex: 1, height: px(1), background: C.border }} />
                    <span style={{ fontFamily: F.mono, fontSize: px(9), color: C.textMuted }}>Step 1 of 2</span>
                </div>
                <div style={{ fontFamily: F.serif, fontWeight: 700, fontSize: px(22), color: C.textPrimary, marginBottom: px(4) }}>Select Language</div>
                <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted, marginBottom: px(18) }}>Choose your preferred consultation language</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: px(8) }}>
                    {langs.map((l, i) => {
                        const a = sel === i; return (
                            <button key={i} onClick={() => setSel(i)} style={{ background: a ? "rgba(200,75,12,.065)" : C.card1, border: `1.5px solid ${a ? C.clay : C.border}`, borderRadius: px(12), padding: "13px 11px", display: "flex", alignItems: "center", gap: px(8), position: "relative", textAlign: "left", transition: "all .18s" }}>
                                <div style={{ width: px(26), height: px(26), borderRadius: "50%", background: C.card2, display: "flex", alignItems: "center", justifyContent: "center", fontSize: px(14) }}>{l.flag}</div>
                                <div>
                                    <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: px(13), color: C.textPrimary }}>{l.name}</div>
                                    <div style={{ fontFamily: F.sans, fontSize: px(10), color: C.textMuted }}>{l.nat}</div>
                                </div>
                                {a && <div style={{ position: "absolute", right: px(9), top: px(9), width: px(16), height: px(16), borderRadius: "50%", background: C.clay, display: "flex", alignItems: "center", justifyContent: "center", animation: "popIn .2s cubic-bezier(.16,1,.3,1)" }}>{I.check("#fff", 9)}</div>}
                            </button>
                        );
                    })}
                </div>
                <div style={{ flex: 1 }} />
                <button onClick={() => go("s04")} style={cta(C.clay, { marginTop: px(20) })}>Continue in {langs[sel].name} {I.arrow()}</button>
            </div>
        </div>
    );
}

// ── S04 OTP ────────────────────────────────────────────────────────────────
function S04({ go }) {
    const [cnt, setCnt] = useState(28);
    useEffect(() => { const i = setInterval(() => setCnt(c => c > 0 ? c - 1 : 0), 1000); return () => clearInterval(i); }, []);
    const otp = ["9", "4", "2", ""];
    return (
        <div className="sc" style={{ height: "100%", background: C.bg, display: "flex", flexDirection: "column" }}>
            <SB />
            <div style={{ padding: "8px 16px 10px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: px(8) }}>
                <div style={{ width: px(32), height: px(32), borderRadius: px(10), background: "#1E2419", border: "1px solid rgba(200,75,12,.22)", display: "flex", alignItems: "center", justifyContent: "center" }}>{I.cross(C.clay, 16)}</div>
                <span style={{ fontFamily: F.serif, fontWeight: 700, fontSize: px(16), color: C.textPrimary }}>Loan Doctor</span>
            </div>
            <div style={{ padding: "22px 16px", flex: 1, display: "flex", flexDirection: "column" }}>
                <div style={{ fontFamily: F.serif, fontWeight: 700, fontSize: px(21), color: C.textPrimary, marginBottom: px(4) }}>Welcome back</div>
                <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted, marginBottom: px(22) }}>Enter OTP sent to your mobile number</div>
                <div style={{ marginBottom: px(18) }}>
                    <div style={{ fontFamily: F.mono, fontSize: px(9), color: C.textMuted, marginBottom: px(6) }}>MOBILE NUMBER</div>
                    <div style={{ height: px(48), background: C.card2, border: `1px solid ${C.border}`, borderRadius: px(10), display: "flex", alignItems: "center", padding: "0 14px", gap: px(8) }}>
                        {I.person(C.textMuted, 16)}
                        <span style={{ fontFamily: F.sans, fontSize: px(14), color: C.textPrimary }}>+91 98765 43210</span>
                    </div>
                </div>
                <div style={{ marginBottom: px(12) }}>
                    <div style={{ fontFamily: F.mono, fontSize: px(9), color: C.textMuted, marginBottom: px(8) }}>ENTER OTP</div>
                    <div style={{ display: "flex", gap: px(10) }}>
                        {otp.map((v, i) => (
                            <div key={i} style={{ flex: 1, height: px(50), background: C.card2, borderRadius: px(10), border: `1.5px solid ${v ? C.teal : C.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F.mono, fontWeight: 700, fontSize: px(20), color: C.teal, boxShadow: v ? "0 0 12px rgba(76,201,160,.15)" : "none", transition: "all .2s" }}>{v}</div>
                        ))}
                    </div>
                </div>
                <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted, marginBottom: px(26) }}>
                    OTP sent… Resend in <span style={{ color: cnt > 0 ? C.textMuted : C.clay, cursor: cnt === 0 ? "pointer" : "default" }}>{cnt > 0 ? `${cnt}s` : "Resend"}</span>
                </div>
                <div style={{ flex: 1 }} />
                <button onClick={() => go("s06")} style={cta(C.clay)}>Verify & Continue {I.arrow()}</button>
                <div style={{ textAlign: "center", marginTop: px(16), fontFamily: F.sans, fontSize: px(12), color: C.textMuted }}>
                    New user? <span style={{ color: C.teal, cursor: "pointer" }}>Create account</span>
                </div>
            </div>
        </div>
    );
}

// ── NEW MARKETING HOME (PRE-PURCHASE) ──────────────────────────────────────
function HomeNew({ go }) {
    const achievements = [["₹47Cr+", "Disbursed"], ["50K+", "Users"], ["200+", "Schemes"], ["98%", "Success"]];
    const offers = [
        { title: "MUDRA Tarun", sub: "Up to ₹10L · 8.5% p.a.", badge: "🔥 Ends in 2 days", bColor: C.clay, p: "badgeP" },
        { title: "PM SVANidhi", sub: "Up to ₹5L · 7.0% p.a.", badge: "⚡ Limited slots", bColor: C.teal, p: "badgeP" }
    ];
    return (
        <div className="sc" style={{ height: "100%", background: C.bg, display: "flex", flexDirection: "column" }}>
            <SB />
            <div style={{ padding: "8px 16px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${C.border}` }}>
                <div>
                    <div style={{ fontFamily: F.sans, fontSize: px(10), color: C.textMuted }}>Welcome to</div>
                    <div style={{ fontFamily: F.serif, fontWeight: 700, fontSize: px(20), color: C.textPrimary }}>Loan Doctor</div>
                </div>
                <div style={{ width: px(34), height: px(34), borderRadius: px(10), background: C.card1, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {I.cross(C.clay, 18)}
                </div>
            </div>

            <div style={{ flex: 1, overflowY: "auto", paddingBottom: px(40) }}>
                {/* Hero Card */}
                <div style={{ margin: "16px", background: "linear-gradient(145deg, #1C2118, #181c14)", border: "1px solid rgba(200,75,12,.2)", borderRadius: px(16), padding: "20px 16px", position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", top: 0, right: 0, width: px(150), height: px(150), background: "radial-gradient(circle at top right, rgba(200,75,12,.15), transparent 70%)", pointerEvents: "none" }} />
                    <div style={{ display: "flex", gap: px(6), alignItems: "center", marginBottom: px(12) }}>
                        <div style={{ width: px(6), height: px(6), borderRadius: "50%", background: C.teal, animation: "blink 1.2s infinite" }} />
                        <span style={{ fontFamily: F.mono, fontSize: px(10), color: C.teal, letterSpacing: "1px" }}>AI ADVISOR READY</span>
                    </div>
                    <div style={{ fontFamily: F.serif, fontWeight: 700, fontSize: px(24), color: C.textPrimary, lineHeight: 1.2, marginBottom: px(8) }}>
                        Find Your Perfect<br />Loan in 60 Seconds
                    </div>
                    <div style={{ fontFamily: F.sans, fontSize: px(12), color: C.textMuted, marginBottom: px(20), lineHeight: 1.4 }}>
                        Just speak to our AI. We'll match you with the best government and private schemes instantly.
                    </div>
                    <button onClick={() => go("s06")} style={cta(C.clay, { marginBottom: px(10) })}>
                        {I.mic("#fff", 18)} Check Eligibility with AI
                    </button>
                    <button onClick={() => go("s09")} style={ghostCta()}>
                        Talk to a Specialist instead
                    </button>
                </div>

                {/* Achievement Bar */}
                <div style={{ display: "flex", padding: "0 16px", gap: px(8), marginBottom: px(24) }}>
                    {achievements.map(([v, l], i) => (
                        <div key={i} style={{ flex: 1, background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(10), padding: "10px 4px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <div style={{ fontFamily: F.sans, fontWeight: 700, fontSize: px(13), color: C.textPrimary }}>{v}</div>
                            <div style={{ fontFamily: F.sans, fontSize: px(9), color: C.textMuted, marginTop: px(2) }}>{l}</div>
                        </div>
                    ))}
                </div>

                {/* Live Offers */}
                <div style={{ padding: "0 16px", marginBottom: px(12), display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ fontFamily: F.sans, fontWeight: 700, fontSize: px(15), color: C.textPrimary }}>Live Offers</div>
                </div>
                <div style={{ display: "flex", overflowX: "auto", padding: "0 16px 24px", gap: px(12) }}>
                    {offers.map((o, i) => (
                        <div key={i} onClick={() => go("schemes_browse")} style={{ width: px(200), flexShrink: 0, background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(14), padding: "14px", position: "relative", cursor: "pointer" }}>
                            <div style={{ position: "absolute", top: px(-10), minWidth: px(100), left: px(14), background: `rgba(${o.bColor === C.clay ? "200,75,12" : "76,201,160"},.15)`, border: `1px solid ${o.bColor}`, color: o.bColor, fontFamily: F.mono, fontSize: px(9), padding: "4px 8px", borderRadius: px(6), animation: `${o.p} 2s infinite` }}>{o.badge}</div>
                            <div style={{ marginTop: px(8), fontFamily: F.serif, fontWeight: 700, fontSize: px(16), color: C.textPrimary, marginBottom: px(4) }}>{o.title}</div>
                            <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted }}>{o.sub}</div>
                        </div>
                    ))}
                </div>

                {/* Video Library */}
                <div style={{ padding: "0 16px", marginBottom: px(12) }}>
                    <div style={{ fontFamily: F.sans, fontWeight: 700, fontSize: px(15), color: C.textPrimary }}>📹 Video Library</div>
                </div>
                <div style={{ display: "flex", overflowX: "auto", padding: "0 16px 24px", gap: px(12) }}>
                    {[
                        { t: "How MUDRA Loan Works", d: "2:45", c: ["#1a0a05", "#1C1206"] },
                        { t: "Business Loan Guide 2024", d: "5:12", c: ["#0a1a15", "#061c12"] },
                        { t: "Zero Collateral Schemes", d: "3:30", c: ["#1a1505", "#1c1606"] }
                    ].map((v, i) => (
                        <div key={i} style={{ width: px(140), flexShrink: 0, cursor: "pointer" }}>
                            <div style={{ height: px(85), background: `linear-gradient(135deg, ${v.c[0]}, ${v.c[1]})`, borderRadius: px(12), border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", marginBottom: px(8) }}>
                                <div style={{ width: px(28), height: px(28), borderRadius: "50%", background: "rgba(255,255,255,.9)", display: "flex", alignItems: "center", justifyContent: "center" }}>{I.play("#111510", 12)}</div>
                                <div style={{ position: "absolute", bottom: px(6), right: px(6), background: "rgba(0,0,0,.6)", fontFamily: F.mono, fontSize: px(8), color: "#fff", padding: "2px 5px", borderRadius: px(4) }}>{v.d}</div>
                            </div>
                            <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textPrimary, lineHeight: 1.3 }}>{v.t}</div>
                        </div>
                    ))}
                </div>

                {/* Success Stories */}
                <div style={{ padding: "0 16px", marginBottom: px(12) }}>
                    <div style={{ fontFamily: F.sans, fontWeight: 700, fontSize: px(15), color: C.textPrimary }}>💬 Success Stories</div>
                </div>
                <div style={{ padding: "0 16px 24px", display: "flex", flexDirection: "column", gap: px(10) }}>
                    {[
                        { n: "Priya Sharma", l: "Mumbai", s: "₹8L MUDRA Tarun" },
                        { n: "Ramkumar", l: "Chennai", s: "₹3L PM SVANidhi" },
                        { n: "Sunita Devi", l: "Delhi", s: "₹5L CGTMSE" }
                    ].map((r, i) => (
                        <div key={i} style={{ background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(12), padding: "12px 14px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: px(6) }}>
                                <div style={{ display: "flex", alignItems: "center", gap: px(8) }}>
                                    <div style={{ width: px(28), height: px(28), borderRadius: px(8), background: C.card2, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F.sans, fontWeight: 700, fontSize: px(11), color: C.textPrimary }}>
                                        {r.n.charAt(0)}
                                    </div>
                                    <div>
                                        <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: px(12), color: C.textPrimary }}>{r.n}</div>
                                        <div style={{ fontFamily: F.sans, fontSize: px(10), color: C.textMuted }}>{r.l}</div>
                                    </div>
                                </div>
                                <div style={{ display: "flex" }}>{[1, 2, 3, 4, 5].map(s => <span key={s}>{I.star(C.amber, 11)}</span>)}</div>
                            </div>
                            <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textPrimary }}>Successfully got <span style={{ color: C.teal, fontWeight: 600 }}>{r.s}</span> in just 7 days!</div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA Block */}
                <div style={{ margin: "0 16px", padding: "16px", background: C.card2, borderRadius: px(14), border: `1px solid ${C.border}`, textAlign: "center" }}>
                    <div style={{ fontFamily: F.serif, fontWeight: 700, fontSize: px(18), color: C.textPrimary, marginBottom: px(6) }}>Confused?</div>
                    <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted, marginBottom: px(16) }}>Let our AI or Experts guide you to the right loan.</div>
                    <button onClick={() => go("s06")} style={{ ...cta(C.clay), marginBottom: px(10) }}>{I.mic("#fff", 16)} Use AI Advisor</button>
                    <button onClick={() => go("s09")} style={ghostCta()}>Request Expert Callback</button>
                </div>

            </div>
        </div>
    );
}

// ── S06 VOICE WELCOME ──────────────────────────────────────────────────────
function S06({ go }) {
    const bars = [11, 21, 28, 20, 30, 17, 24, 13];
    return (
        <div className="sc" style={{ height: "100%", background: "#0E1210", display: "flex", flexDirection: "column", alignItems: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "38%", left: "50%", transform: "translate(-50%,-50%)", width: px(280), height: px(280), background: "radial-gradient(circle 140px at center,rgba(76,201,160,.08),transparent)", borderRadius: "50%", pointerEvents: "none" }} />
            <SB />
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
            <div style={{ fontFamily: F.mono, fontSize: px(8), color: C.textMuted, marginBottom: px(20), zIndex: 2 }}>Tap to respond</div>

            <div style={{ padding: "0 16px 24px", width: "100%", zIndex: 2 }}>
                <button onClick={() => go("s09")} style={{ ...ghostCta(), height: px(44) }}>Prefer to talk to a person?</button>
            </div>
        </div>
    );
}


// ── S07 LIVE CHAT + INLINE RESULTS (FULL UI) ──────────────────────────────
function S07({ go, back, setSchemeData, isOverlay, onCloseModal }) {
    const [step, setStep] = useState(0);
    const [q, setQ] = useState("");
    const msgs = [
        { t: "ai", text: "नमस्ते! आपका स्वागत है। मैं आपके लिए best loan scheme ढूंढूंगा। आप किस purpose के लिए loan लेना चाहते हैं?" },
        { t: "user", text: "Business expand करने के लिए — कपड़े की दुकान है।" },
        { t: "ai", text: "कितने साल पुराना business है और monthly turnover कितना है?" },
        { t: "user", text: "3 साल पुराना है, monthly ₹40,000 कमाता हूँ।" },
        { t: "ai", text: "Documents available हैं? Aadhaar, PAN, 6 months bank statement?" },
        { t: "user", text: "हाँ, सब available हैं।" },
        { t: "ai", text: "Perfect! आपका profile analyse हो रहा है…" },
        { t: "result" },
        { t: "ai", text: "Is there anything else you'd like to ask?", cond: true }
    ];

    useEffect(() => {
        if (step < msgs.length - 2) {
            const t = setTimeout(() => setStep(s => s + 1), 850);
            return () => clearTimeout(t);
        } else if (step === msgs.length - 2) {
            const t = setTimeout(() => setStep(s => s + 1), 1800);
            return () => clearTimeout(t);
        }
    }, [step]);

    const handleSelectScheme = (scheme) => {
        setSchemeData(scheme);
        if (isOverlay) onCloseModal();
        go("scheme_detail");
    };
    const handleNav = (scr) => {
        if (isOverlay) onCloseModal();
        go(scr);
    }

    const results = [
        { best: true, match: "94%", title: "MUDRA Tarun Loan", sub: "Pradhan Mantri Mudra Yojana", chips: [["Up to ₹10L", C.clay], ["8.5% p.a.", C.teal], ["5–7 Days", C.textMuted]] },
        { best: false, match: "87%", title: "CGTMSE Scheme", sub: "Ministry of MSME", chips: [["Up to ₹5L", C.clay], ["9.2% p.a.", C.teal], ["7–10 Days", C.textMuted]] },
        { best: false, match: "81%", title: "PM SVANidhi", sub: "PM Street Vendor Scheme", chips: [["Up to ₹5L", C.clay], ["7% p.a.", C.teal], ["3–5 Days", C.textMuted]] },
    ];

    return (
        <div className="sc" style={{ height: "100%", background: C.bg, display: "flex", flexDirection: "column", position: isOverlay ? "absolute" : "relative", inset: 0, zIndex: 1000 }}>
            {isOverlay ? <div style={{ height: px(46) }} /> : <SB />}
            <div style={{ padding: "0 16px 10px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${C.border}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: px(10) }}>
                    <button onClick={isOverlay ? onCloseModal : back} style={{ background: "none", padding: px(2) }}>{isOverlay ? I.cross(C.textMuted, 20) : I.back(C.textMuted, 18)}</button>
                    <div style={{ width: px(30), height: px(30), borderRadius: "50%", background: "#1C2A23", border: `1.5px solid ${C.teal}`, display: "flex", alignItems: "center", justifyContent: "center" }}>{I.cross(C.teal, 14)}</div>
                    <div>
                        <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: px(13), color: C.textPrimary }}>Loan Doctor AI</div>
                        <div style={{ display: "flex", alignItems: "center", gap: px(4) }}>
                            <div style={{ width: px(5), height: px(5), borderRadius: "50%", background: C.teal, animation: "blink 1.2s ease infinite" }} />
                            <span style={{ fontFamily: F.sans, fontSize: px(10), color: C.teal }}>Live</span>
                        </div>
                    </div>
                </div>
                <button onClick={() => handleNav("s09")} style={{ border: `1px solid ${C.clay}`, background: "transparent", color: C.clay, borderRadius: px(6), padding: "4px 8px", fontFamily: F.sans, fontWeight: 600, fontSize: px(10) }}>Specialist</button>
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 80px", display: "flex", flexDirection: "column", gap: px(12) }}>
                {msgs.slice(0, step + 1).map((m, i) => {
                    if (m.cond && step < msgs.length) return null;
                    return (
                        <div key={i} style={{ display: "flex", flexDirection: m.t === "user" ? "row-reverse" : "column", animation: "msgIn .22s ease both" }}>
                            {m.t === "result" ? (
                                <div style={{ margin: "16px 0", width: "100%" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: px(6), marginBottom: px(10), alignSelf: "center", justifyContent: "center" }}>
                                        <div style={{ display: "flex", gap: px(4), padding: "4px 10px", background: "rgba(76,201,160,.12)", borderRadius: px(20), alignItems: "center" }}>
                                            <div style={{ width: px(6), height: px(6), borderRadius: "50%", background: C.teal, animation: "blink 1.2s ease infinite" }} />
                                            <span style={{ fontFamily: F.mono, fontSize: px(9), color: C.teal, letterSpacing: "1px", fontWeight: 700 }}>AI MATCHED 3 SCHEMES FOR YOU</span>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column", gap: px(8), marginBottom: px(16) }}>
                                        {results.map((r, k) => (
                                            <button key={k} onClick={() => handleSelectScheme(r)} style={{ width: "100%", textAlign: "left", background: r.best ? "rgba(200,75,12,.035)" : C.card1, border: `1px solid ${r.best ? C.clay : C.border}`, borderRadius: px(14), padding: "12px", position: "relative" }}>
                                                {r.best && <div style={{ position: "absolute", top: 0, right: px(12), background: C.clay, color: "#fff", fontFamily: F.mono, fontSize: px(7), padding: "3px 7px", borderRadius: "0 0 5px 5px", fontWeight: 700 }}>BEST MATCH</div>}
                                                <div style={{ display: "flex", alignItems: "flex-start", gap: px(10), marginBottom: px(8) }}>
                                                    <div style={{ width: px(30), height: px(30), borderRadius: px(8), background: "rgba(200,75,12,.11)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{I.doc(C.clay, 15)}</div>
                                                    <div style={{ flex: 1 }}>
                                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                            <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: px(13), color: C.textPrimary }}>{r.title}</div>
                                                            <span style={{ fontFamily: F.mono, fontSize: px(10), color: C.teal, background: "rgba(76,201,160,.1)", padding: "2px 6px", borderRadius: px(4) }}>{r.match}</span>
                                                        </div>
                                                        <div style={{ fontFamily: F.sans, fontSize: px(10), color: C.textMuted, marginTop: px(1) }}>{r.sub}</div>
                                                    </div>
                                                </div>
                                                <div style={{ display: "flex", gap: px(6), flexWrap: "wrap", borderTop: `1px solid ${C.border}`, paddingTop: px(8) }}>
                                                    {r.chips.map(([l, c], j) => <span key={j} style={chip(c)}>{l}</span>)}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                    <button onClick={() => handleNav("schemes_browse")} style={{ ...cta(C.clay), height: px(48), marginBottom: px(16) }}>Explore All Schemes {I.arrow()}</button>
                                    <div style={{ textAlign: "center" }}>
                                        <button onClick={() => handleNav("s09")} style={{ fontFamily: F.sans, fontSize: px(12), color: C.textMuted, background: "none", borderBottom: `1px solid ${C.textMuted}`, paddingBottom: px(2) }}>Not satisfied? Talk to a specialist →</button>
                                    </div>
                                </div>
                            ) : (
                                <div style={{ maxWidth: "78%", background: m.t === "ai" ? C.card2 : "rgba(200,75,12,.10)", borderRadius: m.t === "ai" ? "3px 12px 12px 12px" : "12px 12px 3px 12px", border: m.t !== "ai" ? `1px solid rgba(200,75,12,.25)` : "none", padding: "10px 14px" }}>
                                    <div style={{ fontFamily: F.sans, fontSize: px(13), color: C.textPrimary, lineHeight: 1.45 }}>{m.text}</div>
                                </div>
                            )}
                        </div>
                    )
                })}
                {step < msgs.length - 2 && msgs[step + 1]?.t === "ai" && (
                    <div style={{ display: "flex", gap: px(4), padding: "8px 12px", background: C.card2, borderRadius: "3px 12px 12px 12px", alignSelf: "flex-start", alignItems: "center" }}>
                        {[1, 2, 3].map((j) => <div key={j} style={{ width: px(5), height: px(5), borderRadius: "50%", background: C.textMuted, animation: `blink 1s ease ${j * 0.2}s infinite` }} />)}
                    </div>
                )}
            </div>

            <div style={{ position: "absolute", bottom: px(20), left: 0, right: 0, padding: "0 16px", display: "flex", gap: px(8), alignItems: "center" }}>
                <div style={{ flex: 1, height: px(48), background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(24), display: "flex", alignItems: "center", padding: "0 16px", boxShadow: "0 -10px 30px rgba(17,21,16,1)" }}>
                    <input type="text" placeholder="Type or tap mic to speak…" value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { setQ(""); setStep(msgs.length) } }} style={{ width: "100%", background: "transparent", border: "none", color: C.textPrimary, fontFamily: F.sans, fontSize: px(13), outline: "none" }} />
                </div>
                <button style={{ width: px(46), height: px(46), borderRadius: "50%", background: C.clay, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 5px 15px rgba(200,75,12,.3)" }}>{I.mic("#fff", 20)}</button>
            </div>
        </div>
    );
}

// ── SPECIALIST CONFIRM (NEW S08a) ──────────────────────────────────────────
function SpecialistConfirm({ go, back, data, setSelectedSlot }) {
    const [slot, setSlot] = useState(0);
    const dates = ["Today", "Tomorrow", "Wed 5", "Thu 6", "Fri 7"];
    const times = ["10:00 AM", "11:30 AM", "1:00 PM", "2:30 PM", "4:00 PM", "5:30 PM"];

    const handleConfirm = () => {
        setSelectedSlot({ date: dates[0], time: times[slot], scheme: data?.t || "General Inquiry" });
        go("specialist_booked");
    };

    return (
        <div className="sc" style={{ height: "100%", background: C.bg, display: "flex", flexDirection: "column" }}>
            <SB />
            <div style={{ padding: "0 16px 14px", display: "flex", alignItems: "center", gap: px(10), borderBottom: `1px solid ${C.border}` }}>
                <button onClick={back} style={{ width: px(26), height: px(26), borderRadius: "50%", background: C.card1, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>{I.back(C.textMuted, 13)}</button>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 40px", display: "flex", flexDirection: "column" }}>

                <div style={{ position: "relative", background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(16), padding: "16px", marginBottom: px(24), overflow: "hidden" }}>
                    <div style={{ position: "absolute", top: 0, right: 0, width: px(100), height: px(100), background: "radial-gradient(circle at top right, rgba(76,201,160,.15), transparent 70%)", pointerEvents: "none" }} />
                    <div style={{ display: "flex", alignItems: "flex-start", gap: px(12) }}>
                        <div style={{ width: px(48), height: px(48), borderRadius: "50%", background: C.card2, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                            {I.person(C.clay, 22)}
                            <div style={{ position: "absolute", bottom: 0, right: 0, width: px(12), height: px(12), background: C.teal, borderRadius: "50%", border: `2px solid ${C.card1}` }} />
                        </div>
                        <div>
                            <div style={{ fontFamily: F.serif, fontWeight: 700, fontSize: px(18), color: C.textPrimary }}>Ramesh K.</div>
                            <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted, marginBottom: px(8) }}>Senior Loan Advisor</div>
                            <div style={{ display: "flex", alignItems: "center", gap: px(6) }}>
                                <div style={{ display: "flex" }}>{[1, 2, 3, 4, 5].map(s => <span key={s}>{I.star(C.amber, 10)}</span>)}</div>
                                <span style={{ fontFamily: F.mono, fontSize: px(10), color: C.textPrimary }}>4.9</span>
                                <span style={{ fontFamily: F.sans, fontSize: px(9), color: C.textMuted }}>· 847 done</span>
                            </div>
                        </div>
                    </div>
                    <div style={{ marginTop: px(14), background: "rgba(237,240,232,.05)", padding: "8px 12px", borderRadius: px(8), display: "flex", alignItems: "center", gap: px(8) }}>
                        {I.info(C.textMuted, 14)}
                        <span style={{ fontFamily: F.sans, fontSize: px(11), color: C.textPrimary }}>Free 20-min consultation · No commitment</span>
                    </div>
                </div>

                <div style={{ fontFamily: F.sans, fontWeight: 700, fontSize: px(16), color: C.textPrimary, marginBottom: px(12) }}>Select a time slot</div>
                <div style={{ display: "flex", overflowX: "auto", gap: px(8), marginBottom: px(20), paddingBottom: px(4) }}>
                    {dates.map((d, i) => (
                        <button key={i} style={{ flexShrink: 0, background: i === 0 ? C.clay : C.card1, border: `1px solid ${i === 0 ? C.clay : C.border}`, color: i === 0 ? "#fff" : C.textMuted, borderRadius: px(20), padding: "8px 16px", fontFamily: F.sans, fontWeight: 600, fontSize: px(12) }}>{d}</button>
                    ))}
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: px(10), marginBottom: px(30) }}>
                    {times.map((t, i) => {
                        const act = slot === i;
                        return (
                            <button key={i} onClick={() => setSlot(i)} style={{ background: C.card1, border: `1.5px solid ${act ? C.clay : C.border}`, borderRadius: px(12), height: px(46), display: "flex", alignItems: "center", justifyContent: "center", position: "relative", transition: "all .15s" }}>
                                {act && <div style={{ position: "absolute", top: px(-6), right: px(-6), width: px(18), height: px(18), borderRadius: "50%", background: C.clay, display: "flex", alignItems: "center", justifyContent: "center" }}>{I.check("#fff", 10)}</div>}
                                <span style={{ fontFamily: F.mono, fontSize: px(13), color: act ? C.clay : C.textPrimary, fontWeight: act ? 700 : 400 }}>{t}</span>
                            </button>
                        )
                    })}
                </div>

                {data?.t && (
                    <div style={{ marginBottom: px(20), display: "inline-flex", alignItems: "center", gap: px(6), background: "rgba(200,75,12,.1)", padding: "6px 12px", borderRadius: px(20), border: `1px solid rgba(200,75,12,.3)` }}>
                        {I.doc(C.clay, 14)}
                        <span style={{ fontFamily: F.sans, fontSize: px(11), color: C.textPrimary }}>Ref: {data.t}</span>
                    </div>
                )}

                <div style={{ flex: 1 }} />
                <button onClick={handleConfirm} style={{ ...cta(C.clay), marginBottom: px(12) }}>Confirm Consultation</button>
                <div style={{ textAlign: "center" }}>
                    <button onClick={() => go("schemes_browse")} style={{ background: "none", fontFamily: F.sans, fontSize: px(12), color: C.textMuted, borderBottom: `1px solid ${C.textMuted}`, paddingBottom: px(2) }}>Skip — Explore All Schemes</button>
                </div>
            </div>
        </div>
    );
}

// ── SPECIALIST BOOKED (NEW S08b) ───────────────────────────────────────────
function SpecialistBooked({ go, selectedSlot }) {
    return (
        <div className="sc" style={{ height: "100%", background: "#08100D", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative" }}>
            <SB />
            <div style={{ position: "absolute", top: "40%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                <div style={{ position: "relative", width: px(100), height: px(100), display: "flex", alignItems: "center", justifyContent: "center", marginBottom: px(24) }}>
                    <div style={{ position: "absolute", inset: "-30px", background: "radial-gradient(circle 80px at center,rgba(76,201,160,.15),transparent)", borderRadius: "50%", animation: "dotP 2s infinite" }} />
                    <div style={{ width: px(70), height: px(70), borderRadius: "50%", background: C.teal, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }}>
                        {I.check("#111510", 36)}
                    </div>
                </div>
                <div style={{ fontFamily: F.serif, fontWeight: 700, fontSize: px(26), color: C.textPrimary, marginBottom: px(10) }}>Consultation Confirmed!</div>
                <div style={{ fontFamily: F.sans, fontSize: px(13), color: C.textMuted, textAlign: "center", padding: "0 30px", lineHeight: 1.4, marginBottom: px(30) }}>
                    Ramesh K. will meet you on <br /><span style={{ color: C.textPrimary, fontWeight: 700 }}>{selectedSlot?.date} at {selectedSlot?.time}</span>.
                </div>

                <div style={{ width: px(310), display: "flex", flexDirection: "column", gap: px(10) }}>
                    <div style={{ background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(12), padding: "14px 16px", display: "flex", alignItems: "center", gap: px(12) }}>
                        <div style={{ width: px(34), height: px(34), borderRadius: px(10), background: "rgba(76,201,160,.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>{I.wa(C.teal, 18)}</div>
                        <span style={{ fontFamily: F.sans, fontWeight: 600, fontSize: px(13), color: C.textPrimary }}>Google Meet link sent to WhatsApp</span>
                    </div>
                    <div style={{ background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(12), padding: "14px 16px", display: "flex", alignItems: "center", gap: px(12) }}>
                        <div style={{ width: px(34), height: px(34), borderRadius: px(10), background: C.card2, display: "flex", alignItems: "center", justifyContent: "center", fontSize: px(16) }}>📅</div>
                        <div>
                            <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: px(13), color: C.textPrimary }}>{selectedSlot?.date} · {selectedSlot?.time}</div>
                            <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted }}>20 minutes</div>
                        </div>
                    </div>
                    <div style={{ background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(12), padding: "14px 16px", display: "flex", alignItems: "center", gap: px(12) }}>
                        <div style={{ width: px(34), height: px(34), borderRadius: px(10), background: "rgba(200,75,12,.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>{I.doc(C.clay, 18)}</div>
                        <div style={{ overflow: "hidden" }}>
                            <div style={{ fontFamily: F.mono, fontSize: px(10), color: C.textMuted, marginBottom: px(2) }}>REF: LD-CONSULT-2024-12</div>
                            <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: px(13), color: C.textPrimary, whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>{selectedSlot?.scheme}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ position: "absolute", bottom: px(40), width: "100%", padding: "0 24px", textAlign: "center" }}>
                <button onClick={() => go("schemes_browse")} style={{ ...cta(C.clay), marginBottom: px(16) }}>Explore All Schemes</button>
                <button onClick={() => go("home_new")} style={{ background: "none", fontFamily: F.sans, fontWeight: 600, fontSize: px(13), color: C.textMuted }}>Go to Home</button>
            </div>
        </div>
    );
}


// ── S09 REQUEST CALL (SPECIALIST LEAD FORM) ────────────────────────────────

function S09({ go, back }) {
    const [slot, setSlot] = useState(0);
    return (
        <div className="sc" style={{ height: "100%", background: C.bg, display: "flex", flexDirection: "column" }}>
            <SB />
            <div style={{ padding: "0 16px 10px", display: "flex", alignItems: "center", gap: px(10), borderBottom: `1px solid ${C.border}` }}>
                <button onClick={back} style={{ width: px(26), height: px(26), borderRadius: "50%", background: C.card1, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>{I.back(C.textMuted, 13)}</button>
                <div>
                    <div style={{ fontFamily: F.serif, fontWeight: 700, fontSize: px(16), color: C.textPrimary }}>Request Call</div>
                    <div style={{ fontFamily: F.sans, fontSize: px(10), color: C.textMuted }}>Free Expert Consultation</div>
                </div>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
                <div style={{ background: "rgba(76,201,160,.06)", border: `1px solid rgba(76,201,160,.2)`, borderRadius: px(12), padding: "14px", display: "flex", alignItems: "center", gap: px(12), marginBottom: px(20) }}>
                    <div style={{ width: px(40), height: px(40), borderRadius: px(10), background: C.teal, display: "flex", alignItems: "center", justifyContent: "center" }}>{I.call("#111510", 20)}</div>
                    <div>
                        <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: px(13), color: C.textPrimary }}>Need help choosing?</div>
                        <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted, marginTop: px(2) }}>Our certified loan experts will guide you. 100% Free.</div>
                    </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: px(16), marginBottom: px(24) }}>
                    <div>
                        <div style={{ fontFamily: F.mono, fontSize: px(9), color: C.textMuted, marginBottom: px(6) }}>YOUR NAME</div>
                        <input type="text" defaultValue="Rahul Kumar" style={{ width: "100%", height: px(48), background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(10), padding: "0 14px", color: C.textPrimary, fontSize: px(14), outline: "none" }} />
                    </div>
                    <div>
                        <div style={{ fontFamily: F.mono, fontSize: px(9), color: C.textMuted, marginBottom: px(6) }}>MOBILE NUMBER</div>
                        <input type="text" defaultValue="+91 98765 43210" style={{ width: "100%", height: px(48), background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(10), padding: "0 14px", color: C.textPrimary, fontSize: px(14), outline: "none" }} />
                    </div>
                    <div>
                        <div style={{ fontFamily: F.mono, fontSize: px(9), color: C.textMuted, marginBottom: px(6) }}>LOAN PURPOSE</div>
                        <div style={{ position: "relative" }}>
                            <select style={{ width: "100%", height: px(48), background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(10), padding: "0 34px 0 14px", color: C.textPrimary, fontSize: px(14), appearance: "none", outline: "none" }}>
                                <option>Start a New Business</option>
                                <option>Expand Existing Business</option>
                                <option>Agriculture / Farming</option>
                                <option>Equipment Purchase</option>
                            </select>
                            <div style={{ position: "absolute", right: px(14), top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>{I.chevron(C.textMuted, 14)}</div>
                        </div>
                    </div>
                </div>

                <div style={{ fontFamily: F.mono, fontSize: px(9), color: C.textMuted, marginBottom: px(10), letterSpacing: "1px" }}>PREFERRED TIME</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: px(8), marginBottom: px(24) }}>
                    {["Morning", "Afternoon", "Evening"].map((l, i) => (
                        <button key={i} onClick={() => setSlot(i)} style={{ background: C.card1, border: `1.5px solid ${slot === i ? C.clay : C.border}`, borderRadius: px(10), padding: "12px 6px", display: "flex", flexDirection: "column", alignItems: "center", gap: px(6), transition: "all .15s" }}>
                            <span style={{ fontSize: px(18) }}>{["🌅", "☀️", "🌆"][i]}</span>
                            <span style={{ fontFamily: F.sans, fontSize: px(11), color: slot === i ? C.clay : C.textMuted, fontWeight: slot === i ? 600 : 400 }}>{l}</span>
                        </button>
                    ))}
                </div>

                <button onClick={() => go("s10")} style={cta(C.clay, { marginBottom: px(16) })}>Request Callback</button>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: px(6) }}>
                    {I.info(C.textMuted, 14)}
                    <span style={{ fontFamily: F.mono, fontSize: px(9), color: C.textMuted }}>100% Free · No Spam · Cancel Anytime</span>
                </div>
            </div>
        </div>
    );
}

// ── S10 CALL BOOKED ────────────────────────────────────────────────────────
function S10({ go }) {
    useEffect(() => { const t = setTimeout(() => go("home_new"), 3500); return () => clearTimeout(t); }, []);
    return (
        <div className="sc" style={{ height: "100%", background: "#0B100D", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative" }}>
            <SB />
            <div style={{ position: "absolute", top: "45%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ position: "relative", width: px(100), height: px(100), display: "flex", alignItems: "center", justifyContent: "center", marginBottom: px(24) }}>
                    <div style={{ position: "absolute", inset: "-30px", background: "radial-gradient(circle 80px at center,rgba(76,201,160,.15),transparent)", borderRadius: "50%", animation: "dotP 2s infinite" }} />
                    <div style={{ width: px(70), height: px(70), borderRadius: "50%", background: C.teal, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }}>
                        {I.call("#111510", 30)}
                    </div>
                </div>
                <div style={{ fontFamily: F.serif, fontWeight: 700, fontSize: px(26), color: C.textPrimary, marginBottom: px(6) }}>Callback Booked!</div>
                <div style={{ fontFamily: F.sans, fontSize: px(12), color: C.textMuted, textAlign: "center", padding: "0 30px" }}>Our expert will call you at your preferred time.</div>

                <div style={{ marginTop: px(30), width: px(300), background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(14), padding: "16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: px(12), borderBottom: `1px solid ${C.border}`, paddingBottom: px(12), marginBottom: px(12) }}>
                        <div style={{ width: px(40), height: px(40), borderRadius: "50%", background: C.card2, display: "flex", alignItems: "center", justifyContent: "center", color: C.textPrimary, fontSize: px(14), fontWeight: 700 }}>RK</div>
                        <div>
                            <div style={{ fontFamily: F.mono, fontSize: px(9), color: C.textMuted, marginBottom: px(2) }}>YOUR EXPERT</div>
                            <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: px(14), color: C.textPrimary }}>Ramesh K.</div>
                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                            <div style={{ fontFamily: F.mono, fontSize: px(9), color: C.textMuted, marginBottom: px(2) }}>TIME SLOT</div>
                            <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: px(13), color: C.textPrimary }}>Morning (9-12 AM)</div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                            <div style={{ fontFamily: F.mono, fontSize: px(9), color: C.textMuted, marginBottom: px(2) }}>REFERENCE</div>
                            <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: px(13), color: C.teal }}>LD-CALL-041</div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ position: "absolute", bottom: px(40), textAlign: "center", width: "100%" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: px(6), marginBottom: px(20) }}>
                    {I.wa(C.teal, 16)}<span style={{ fontFamily: F.sans, fontSize: px(11), color: C.teal, fontWeight: 500 }}>Confirmation sent to WhatsApp</span>
                </div>
                <button onClick={() => go("home_new")} style={{ ...ghostCta(), width: px(300), margin: "0 auto" }}>Explore App While You Wait</button>
            </div>
        </div>
    );
}

// ── SCHEMES BROWSER ────────────────────────────────────────────────────────
function SchemesBrowser({ go, back, setSchemeData, inMainApp }) {
    const [tab, setTab] = useState("C");
    const cCats = ["Business Loans", "Small Traders", "Agriculture", "Women Schemes"];
    const sCats = ["Business Loans", "Startups", "Agriculture"];
    const cData = {
        "Business Loans": [
            { t: "MUDRA Tarun", s: "PM Mudra Yojana", chips: [["Up to ₹10L", C.clay], ["8.5% p.a.", C.teal]], badge: "🔥 Popular" },
            { t: "MUDRA Kishore", s: "PM Mudra Yojana", chips: [["Up to ₹5L", C.clay], ["8.2% p.a.", C.teal]] },
            { t: "CGTMSE", s: "Ministry of MSME", chips: [["Up to ₹5L", C.clay], ["9.2% p.a.", C.teal]], badge: "No Collateral" },
        ],
        "Small Traders": [
            { t: "PM SVANidhi", s: "Ministry of Housing", chips: [["Up to ₹5L", C.clay], ["7% p.a.", C.teal]], badge: "⚡ Fast" },
            { t: "MUDRA Shishu", s: "PM Mudra Yojana", chips: [["Up to ₹50K", C.clay], ["Low Interest", C.teal]] },
        ],
        "Agriculture": [
            { t: "Kisan Credit Card", s: "NABARD", chips: [["Up to ₹3L", C.clay], ["4% p.a.", C.teal]], badge: "⚡ Fast" },
        ],
        "Women Schemes": [
            { t: "Mahila Udyam", s: "SIDBI", chips: [["Up to ₹10L", C.clay], ["7.5% p.a.", C.teal]], badge: "Women Only" },
        ]
    };
    const sData = {
        "Business Loans": [
            { t: "TNSCB Loan", s: "TN Slum Clearance", chips: [["Up to ₹3L", C.clay], ["6.5% p.a.", C.teal]] },
            { t: "MSME TN", s: "TN Industries Dept", chips: [["Up to ₹10L", C.clay], ["8% p.a.", C.teal]], badge: "State Special" },
        ],
        "Startups": [
            { t: "Kalaignar Startup", s: "TN Startup Mission", chips: [["Up to ₹5L", C.clay], ["0% p.a.", C.teal]], badge: "0% Interest" },
        ],
        "Agriculture": [
            { t: "NABARD Rural TN", s: "National Bank", chips: [["Up to ₹2L", C.clay], ["4% p.a.", C.teal]] },
        ]
    };

    const cats = tab === "C" ? cCats : sCats;
    const data = tab === "C" ? cData : sData;

    const handleSelect = (sc) => { setSchemeData(sc); go("scheme_detail"); };

    return (
        <div className="sc" style={{ height: "100%", background: C.bg, display: "flex", flexDirection: "column", position: "relative" }}>
            {!inMainApp && <SB />}
            <div style={{ padding: `${inMainApp ? px(16) : 0} 16px 12px`, borderBottom: `1px solid ${C.border}` }}>
                {!inMainApp && (
                    <div style={{ display: "flex", alignItems: "center", gap: px(10), marginBottom: px(16) }}>
                        <button onClick={back} style={{ width: px(26), height: px(26), borderRadius: "50%", background: C.card1, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>{I.back(C.textMuted, 13)}</button>
                        <div style={{ fontFamily: F.serif, fontWeight: 700, fontSize: px(16), color: C.textPrimary }}>Browse Schemes</div>
                    </div>
                )}
                <div style={{ display: "flex", gap: px(8) }}>
                    <div style={{ flex: 1, position: "relative" }}>
                        <div style={{ position: "absolute", left: px(12), top: "50%", transform: "translateY(-50%)" }}>{I.search()}</div>
                        <input type="text" placeholder="Search schemes, amounts..." style={{ width: "100%", height: px(40), background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(10), padding: "0 14px 0 36px", color: C.textPrimary, fontSize: px(13), outline: "none" }} />
                    </div>
                    <button style={{ width: px(40), height: px(40), background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(10), display: "flex", alignItems: "center", justifyContent: "center" }}>{I.filter()}</button>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: px(12) }}>
                    <button style={{ display: "flex", alignItems: "center", gap: px(4), background: "rgba(76,201,160,.12)", border: `1px solid ${C.teal}`, borderRadius: px(6), padding: "4px 8px" }}>
                        {I.gps(C.teal, 12)} <span style={{ fontFamily: F.sans, fontSize: px(10), fontWeight: 600, color: C.teal }}>TN, India</span> {I.chevron(C.teal, 12)}
                    </button>
                </div>
            </div>

            <div style={{ padding: "14px 16px 0" }}>
                <div style={{ width: "100%", height: px(44), background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(12), position: "relative", display: "flex", alignItems: "center", padding: "0 4px" }}>
                    <div style={{ position: "absolute", width: "calc(50% - 4px)", height: px(36), background: C.card2, border: `1px solid ${C.border}`, borderRadius: px(10), left: tab === "C" ? px(4) : "calc(50%)", transition: "left .2s cubic-bezier(.16,1,.3,1)" }} />
                    <button onClick={() => setTab("C")} style={{ flex: 1, height: "100%", zIndex: 1, fontFamily: F.sans, fontWeight: 600, fontSize: px(12), color: tab === "C" ? C.textPrimary : C.textMuted, background: "transparent" }}>Central</button>
                    <button onClick={() => setTab("S")} style={{ flex: 1, height: "100%", zIndex: 1, fontFamily: F.sans, fontWeight: 600, fontSize: px(12), color: tab === "S" ? C.textPrimary : C.textMuted, background: "transparent" }}>State — TN</button>
                </div>
            </div>

            <div style={{ flex: 1, overflowY: "auto", paddingBottom: px(inMainApp ? 80 : 20) }}>
                {cats.map((c, i) => (
                    <div key={i} style={{ marginTop: px(24) }}>
                        <div style={{ padding: "0 16px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: px(12) }}>
                            <div style={{ fontFamily: F.sans, fontWeight: 700, fontSize: px(16), color: C.textPrimary }}>{c}</div>
                            <button style={{ background: "transparent", color: C.clay, fontFamily: F.sans, fontSize: px(12), fontWeight: 600 }}>See all</button>
                        </div>
                        <div style={{ display: "flex", overflowX: "auto", padding: "0 16px", gap: px(12) }}>
                            {data[c]?.map((sc, j) => (
                                <button key={j} onClick={() => handleSelect(sc)} style={{ width: px(180), flexShrink: 0, textAlign: "left", background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(14), padding: "14px", position: "relative" }}>
                                    {sc.badge && <div style={{ position: "absolute", top: px(-10), minWidth: px(80), left: px(14), background: `rgba(${sc.badge.includes("🔥") ? "200,75,12" : "76,201,160"},.15)`, border: `1px solid ${sc.badge.includes("🔥") ? C.clay : C.teal}`, color: sc.badge.includes("🔥") ? C.clay : C.teal, fontFamily: F.mono, fontSize: px(9), padding: "4px 8px", borderRadius: px(6) }}>{sc.badge}</div>}
                                    <div style={{ width: px(36), height: px(36), borderRadius: px(10), background: "rgba(200,75,12,.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: px(10), marginTop: sc.badge ? px(8) : 0 }}>{I.cross(C.clay, 18)}</div>
                                    <div style={{ fontFamily: F.serif, fontWeight: 700, fontSize: px(15), color: C.textPrimary, marginBottom: px(4) }}>{sc.t}</div>
                                    <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted, marginBottom: px(14) }}>{sc.s}</div>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: px(6) }}>
                                        {sc.chips.map(([l, col], k) => <span key={k} style={chip(col)}>{l}</span>)}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {!inMainApp && (
                <button onClick={() => go("s09")} style={{ position: "absolute", bottom: px(20), right: px(20), width: px(52), height: px(52), borderRadius: "50%", background: C.clay, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 15px rgba(200,75,12,.4)", animation: "fabP 2s infinite", zIndex: 10 }}>
                    {I.person("#fff", 20)}
                    <span style={{ fontFamily: F.sans, fontSize: px(8), color: "#fff", fontWeight: 700, marginTop: px(1) }}>Consult</span>
                </button>
            )}
        </div>
    );
}

// ── SCHEME DETAIL ──────────────────────────────────────────────────────────
function SchemeDetail({ go, back, data, showSpec }) {
    if (!data) return <div />;
    return (
        <div className="sc" style={{ height: "100%", background: C.bg, display: "flex", flexDirection: "column", zIndex: 100 }}>
            {showSpec && <SB />}
            <div style={{ padding: `${showSpec ? 0 : px(16)} 16px 14px`, display: "flex", alignItems: "center", gap: px(10), borderBottom: `1px solid ${C.border}` }}>
                <button onClick={back} style={{ width: px(26), height: px(26), borderRadius: "50%", background: C.card1, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>{I.back(C.textMuted, 13)}</button>
                <div style={{ fontFamily: F.serif, fontWeight: 700, fontSize: px(16), color: C.textPrimary }}>Scheme Details</div>
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: "16px", paddingBottom: "100px" }}>
                {/* Video Header */}
                <div style={{ height: px(180), background: "linear-gradient(135deg, #1C2A23, #111510)", borderRadius: px(16), border: `1px solid ${C.teal}`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", marginBottom: px(20) }}>
                    <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at center, rgba(76,201,160,.1) 1px, transparent 1px)", backgroundSize: "16px 16px" }} />
                    <div style={{ width: px(46), height: px(46), borderRadius: "50%", background: "rgba(255,255,255,.9)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1, boxShadow: "0 4px 12px rgba(0,0,0,.3)" }}>{I.play("#111510", 22)}</div>
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, rgba(0,0,0,.8), transparent)", padding: "20px 14px 12px", display: "flex", alignItems: "center", gap: px(8) }}>
                        <div style={{ width: px(6), height: px(6), borderRadius: "50%", background: C.teal, animation: "blink 1.2s infinite" }} />
                        <span style={{ fontFamily: F.sans, fontWeight: 600, fontSize: px(12), color: "#fff" }}>How {data.t} Works</span>
                    </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: px(12), marginBottom: px(20) }}>
                    <div style={{ width: px(50), height: px(50), borderRadius: px(12), background: "rgba(200,75,12,.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>{I.cross(C.clay, 26)}</div>
                    <div>
                        <div style={{ fontFamily: F.serif, fontWeight: 700, fontSize: px(22), color: C.textPrimary, marginBottom: px(2) }}>{data.t}</div>
                        <div style={{ fontFamily: F.sans, fontSize: px(12), color: C.textMuted }}>{data.s}</div>
                    </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: px(10), marginBottom: px(24) }}>
                    <div style={{ background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(12), padding: "12px" }}>
                        <div style={{ fontFamily: F.mono, fontSize: px(9), color: C.textMuted, marginBottom: px(4) }}>MAX AMOUNT</div>
                        <div style={{ fontFamily: F.sans, fontWeight: 700, fontSize: px(15), color: C.clay }}>{data.chips[0][0]}</div>
                    </div>
                    <div style={{ background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(12), padding: "12px" }}>
                        <div style={{ fontFamily: F.mono, fontSize: px(9), color: C.textMuted, marginBottom: px(4) }}>INTEREST</div>
                        <div style={{ fontFamily: F.sans, fontWeight: 700, fontSize: px(15), color: C.teal }}>{data.chips[1][0]}</div>
                    </div>
                    <div style={{ background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(12), padding: "12px" }}>
                        <div style={{ fontFamily: F.mono, fontSize: px(9), color: C.textMuted, marginBottom: px(4) }}>TENURE</div>
                        <div style={{ fontFamily: F.sans, fontWeight: 700, fontSize: px(15), color: C.teal }}>Up to 5 Years</div>
                    </div>
                    <div style={{ background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(12), padding: "12px" }}>
                        <div style={{ fontFamily: F.mono, fontSize: px(9), color: C.textMuted, marginBottom: px(4) }}>COLLATERAL</div>
                        <div style={{ fontFamily: F.sans, fontWeight: 700, fontSize: px(15), color: data.badge?.includes("No") ? C.teal : C.amber }}>{data.badge?.includes("No") ? "None Required" : "Required"}</div>
                    </div>
                </div>

                <div style={{ background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(16), padding: "16px", marginBottom: px(16) }}>
                    <div style={{ display: "flex", gap: px(8), alignItems: "center", marginBottom: px(16) }}>
                        <div style={{ width: px(24), height: px(24), borderRadius: "50%", background: "rgba(76,201,160,.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>{I.check(C.teal, 12)}</div>
                        <span style={{ fontFamily: F.sans, fontWeight: 700, fontSize: px(14), color: C.textPrimary }}>Eligibility Checklist</span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: px(12) }}>
                        {["Indian Citizen above 18 years", "Existing business > 2 years vintage", "No defaults in any bank/NBFC", "Udyam Registration Certificate"].map((t, i) => (
                            <div key={i} style={{ display: "flex", gap: px(10), alignItems: "flex-start" }}>
                                <div style={{ width: px(14), height: px(14), borderRadius: "50%", border: `1.5px solid ${C.teal}`, display: "flex", alignItems: "center", justifyContent: "center", marginTop: px(2) }} />
                                <span style={{ fontFamily: F.sans, fontSize: px(12), color: C.textMuted, lineHeight: 1.4 }}>{t}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(16), padding: "16px", marginBottom: px(24) }}>
                    <div style={{ display: "flex", gap: px(8), alignItems: "center", marginBottom: px(16) }}>
                        <div style={{ width: px(24), height: px(24), borderRadius: "50%", background: "rgba(200,75,12,.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>{I.doc(C.clay, 12)}</div>
                        <span style={{ fontFamily: F.sans, fontWeight: 700, fontSize: px(14), color: C.textPrimary }}>Documents Required</span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: px(12) }}>
                        {["Aadhaar Card", "PAN Card", "6 Months Bank Statement", "Business Address Proof", "ITR (optional but recommended)"].map((t, i) => (
                            <div key={i} style={{ display: "flex", gap: px(10), alignItems: "center" }}>
                                <div style={{ width: px(6), height: px(6), borderRadius: "50%", background: C.clay }} />
                                <span style={{ fontFamily: F.sans, fontSize: px(12), color: C.textMuted }}>{t}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: `linear-gradient(to top, ${C.bg} 80%, transparent)`, padding: "40px 16px 20px", pointerEvents: "none" }}>
                <div style={{ pointerEvents: "auto", display: "flex", flexDirection: "column", paddingBottom: !showSpec ? px(80) : 0 }}>
                    <button onClick={() => go("payment")} style={{ ...cta(C.clay), marginBottom: px(10) }}>
                        {showSpec ? `Continue & Buy — Apply for ${data.t}` : `Apply for ${data.t}`}
                    </button>
                    {showSpec && (
                        <button onClick={() => go("specialist_confirm")} style={ghostCta()}>Consult a Specialist First</button>
                    )}
                </div>
            </div>
        </div>
    );
}


// ── PAYMENT ────────────────────────────────────────────────────────────────

function Payment({ go, back }) {
    const [plan, setPlan] = useState(0);
    const [method, setMethod] = useState(0);
    const [loading, setLoading] = useState(false);
    const methods = [["📱", "GPay/UPI"], ["💳", "Card"], ["🏦", "Net Banking"]];
    const handlePay = () => { setLoading(true); setTimeout(() => go("pay_success"), 1800); };

    return (
        <div className="sc" style={{ height: "100%", background: C.bg, display: "flex", flexDirection: "column" }}>
            <SB />
            <div style={{ padding: "0 16px 14px", display: "flex", alignItems: "center", gap: px(10), borderBottom: `1px solid ${C.border}` }}>
                <button onClick={back} style={{ width: px(26), height: px(26), borderRadius: "50%", background: C.card1, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>{I.back(C.textMuted, 13)}</button>
                <div>
                    <div style={{ fontFamily: F.serif, fontWeight: 700, fontSize: px(16), color: C.textPrimary }}>Choose Your Plan</div>
                    <div style={{ fontFamily: F.sans, fontSize: px(10), color: C.textMuted }}>Secure your application process</div>
                </div>
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>

                <button onClick={() => setPlan(0)} style={{ width: "100%", textAlign: "left", background: C.card1, border: `1.5px solid ${plan === 0 ? C.clay : C.border}`, borderRadius: px(16), padding: "16px", marginBottom: px(12), position: "relative", transition: "all .2s" }}>
                    {plan === 0 ?
                        <div style={{ position: "absolute", top: px(16), right: px(16), width: px(22), height: px(22), borderRadius: "50%", background: C.clay, display: "flex", alignItems: "center", justifyContent: "center", animation: "popIn .2s cubic-bezier(.16,1,.3,1)" }}>{I.check("#fff", 12)}</div>
                        : <div style={{ position: "absolute", top: px(16), right: px(16), width: px(22), height: px(22), borderRadius: "50%", border: `2px solid ${C.border}` }} />
                    }
                    <div style={{ fontFamily: F.mono, fontSize: px(10), color: C.textMuted, marginBottom: px(6) }}>TOKEN AMOUNT</div>
                    <div style={{ fontFamily: F.serif, fontWeight: 900, fontSize: px(32), color: C.textPrimary, display: "flex", alignItems: "flex-start", marginBottom: px(12) }}>
                        <sup style={{ fontSize: px(16), marginTop: px(8), color: C.textMuted, marginRight: px(2) }}>₹</sup>999
                    </div>
                    {[["Agent assigned in 2 hrs", "Pay the rest after approval"], ["App submission", "Basic doc collection"]].map(([t, s], i) => (
                        <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: px(10), marginBottom: i === 0 ? px(10) : 0 }}>
                            <div style={{ width: px(16), height: px(16), borderRadius: "50%", background: "rgba(76,201,160,.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: px(2) }}>{I.check(C.teal, 10)}</div>
                            <div>
                                <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: px(12), color: C.textPrimary, marginBottom: px(2) }}>{t}</div>
                                <div style={{ fontFamily: F.sans, fontSize: px(10), color: C.textMuted }}>{s}</div>
                            </div>
                        </div>
                    ))}
                </button>

                <button onClick={() => setPlan(1)} style={{ width: "100%", textAlign: "left", background: C.card1, border: `1.5px solid ${plan === 1 ? C.clay : C.border}`, borderRadius: px(16), padding: "16px", marginBottom: px(20), position: "relative", transition: "all .2s" }}>
                    <div style={{ position: "absolute", top: 0, left: px(16), background: C.teal, padding: "4px 8px", borderRadius: "0 0 6px 6px", fontFamily: F.mono, fontSize: px(9), color: "#111510", fontWeight: 700 }}>★ RECOMMENDED</div>
                    {plan === 1 ?
                        <div style={{ position: "absolute", top: px(16), right: px(16), width: px(22), height: px(22), borderRadius: "50%", background: C.clay, display: "flex", alignItems: "center", justifyContent: "center", animation: "popIn .2s cubic-bezier(.16,1,.3,1)" }}>{I.check("#fff", 12)}</div>
                        : <div style={{ position: "absolute", top: px(16), right: px(16), width: px(22), height: px(22), borderRadius: "50%", border: `2px solid ${C.border}` }} />
                    }
                    <div style={{ fontFamily: F.mono, fontSize: px(10), color: C.textMuted, marginBottom: px(6), marginTop: px(14) }}>FULL SERVICE</div>
                    <div style={{ fontFamily: F.serif, fontWeight: 900, fontSize: px(32), color: C.textPrimary, display: "flex", alignItems: "flex-start", marginBottom: px(12) }}>
                        <sup style={{ fontSize: px(16), marginTop: px(8), color: C.textMuted, marginRight: px(2) }}>₹</sup>10,000
                    </div>
                    {[["Priority handling", "1hr response & senior agent"], ["End-to-end processing", "6mo follow-up support"]].map(([t, s], i) => (
                        <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: px(10), marginBottom: i === 0 ? px(10) : 0 }}>
                            <div style={{ width: px(16), height: px(16), borderRadius: "50%", background: "rgba(76,201,160,.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: px(2) }}>{I.check(C.teal, 10)}</div>
                            <div>
                                <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: px(12), color: C.textPrimary, marginBottom: px(2) }}>{t}</div>
                                <div style={{ fontFamily: F.sans, fontSize: px(10), color: C.textMuted }}>{s}</div>
                            </div>
                        </div>
                    ))}
                </button>

                <div style={{ fontFamily: F.mono, fontSize: px(10), color: C.textMuted, marginBottom: px(10), letterSpacing: "1px" }}>PAYMENT METHOD</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: px(10), marginBottom: px(24) }}>
                    {methods.map(([em, l], i) => (
                        <button key={i} onClick={() => setMethod(i)} style={{ background: C.card1, border: `1.5px solid ${method === i ? C.clay : C.border}`, borderRadius: px(12), padding: "14px 6px", display: "flex", flexDirection: "column", alignItems: "center", gap: px(6), transition: "all .15s" }}>
                            <span style={{ fontSize: px(22) }}>{em}</span>
                            <span style={{ fontFamily: F.sans, fontSize: px(11), color: method === i ? C.clay : C.textMuted, fontWeight: method === i ? 600 : 400 }}>{l}</span>
                        </button>
                    ))}
                </div>

                <button onClick={handlePay} style={cta(C.clay, { marginBottom: px(12) })}>
                    {loading ? <div style={{ width: px(20), height: px(20), border: "2.5px solid rgba(255,255,255,.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin .7s linear infinite" }} /> : <>{I.lock()} Pay ₹{plan === 0 ? "999" : "10,000"} Securely</>}
                </button>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: px(6) }}>
                    {I.lock(C.textMuted, 13)}<span style={{ fontFamily: F.mono, fontSize: px(10), color: C.textMuted }}>256-bit SSL · Razorpay Secured</span>
                </div>
            </div>
        </div>
    );
}

// ── PAYMENT SUCCESS ────────────────────────────────────────────────────────
function PaySuccess({ go }) {
    return (
        <div className="sc" style={{ height: "100%", background: "#0B100D", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative" }}>
            <SB />
            <div style={{ position: "absolute", top: "45%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                <div style={{ position: "relative", width: px(110), height: px(110), display: "flex", alignItems: "center", justifyContent: "center", marginBottom: px(24) }}>
                    <div style={{ position: "absolute", inset: "-20px", background: "radial-gradient(circle 90px at center, rgba(76,201,160,.15), transparent)", borderRadius: "50%", animation: "dotP 2.5s infinite" }} />
                    <svg width="86" height="86" viewBox="0 0 86 86" fill="none">
                        <circle cx="43" cy="43" r="41.5" stroke={C.teal} strokeWidth="3" />
                        <path d="M26 44.5L37.5 56L60 30" stroke={C.teal} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: 200, animation: "strokeIn .8s ease-out forwards .2s" }} />
                    </svg>
                </div>
                <div style={{ fontFamily: F.serif, fontWeight: 700, fontSize: px(28), color: C.textPrimary, marginBottom: px(30) }}>Payment Successful!</div>

                <div style={{ width: px(310), display: "flex", flexDirection: "column", gap: px(10) }}>
                    <div style={{ background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(12), padding: "14px 16px", display: "flex", alignItems: "center", gap: px(12) }}>
                        <div style={{ width: px(34), height: px(34), borderRadius: px(10), background: "rgba(76,201,160,.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>{I.wa(C.teal, 18)}</div>
                        <span style={{ fontFamily: F.sans, fontWeight: 600, fontSize: px(13), color: C.textPrimary }}>Invoice sent to WhatsApp</span>
                    </div>
                    <div style={{ background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(12), padding: "14px 16px", display: "flex", alignItems: "center", gap: px(12) }}>
                        <div style={{ width: px(34), height: px(34), borderRadius: px(10), background: "rgba(200,75,12,.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>{I.person(C.clay, 18)}</div>
                        <div>
                            <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: px(13), color: C.textPrimary }}>Ramesh K.</div>
                            <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted }}>Your Dedicated Agent</div>
                        </div>
                    </div>
                    <div style={{ background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(12), padding: "14px 16px", display: "flex", alignItems: "center", gap: px(12) }}>
                        <div style={{ width: px(34), height: px(34), borderRadius: px(10), background: "rgba(76,201,160,.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>{I.doc(C.teal, 18)}</div>
                        <div>
                            <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: px(13), color: C.textPrimary }}>Case Reference</div>
                            <div style={{ fontFamily: F.mono, fontSize: px(12), color: C.teal }}>LD-2024-038</div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ position: "absolute", bottom: px(40), width: "100%", padding: "0 24px" }}>
                <button onClick={() => go("main_home")} style={cta(C.clay)}>Open My Application</button>
            </div>
        </div>
    );
}

// ── MAIN APP DASHBOARD (S11-S15) ───────────────────────────────────────────
// ── S11 HOME ───────────────────────────────────────────────────────────────
function S11({ hasPurchase }) {
    return (
        <div className="sc" style={{ height: "100%", background: C.bg, display: "flex", flexDirection: "column" }}>
            <SB />

            <div style={{ padding: "0 16px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${C.border}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: px(10) }}>
                    <div style={{ width: px(36), height: px(36), borderRadius: "50%", background: C.card1, border: `1px solid ${C.clay}`, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                        <span style={{ fontFamily: F.serif, fontWeight: 700, fontSize: px(14), color: C.textPrimary }}>RK</span>
                    </div>
                    <div>
                        <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted }}>Welcome back,</div>
                        <div style={{ fontFamily: F.serif, fontWeight: 700, fontSize: px(16), color: C.textPrimary }}>Ramesh Kumar</div>
                    </div>
                </div>
                <div style={{ display: "flex", gap: px(8) }}>
                    <button style={{ width: px(38), height: px(38), borderRadius: px(12), background: C.card1, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>{I.search(C.textPrimary, 18)}</button>
                    <div style={{ width: px(38), height: px(38), borderRadius: px(12), background: C.card1, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                        {I.bell(C.textPrimary, 18)}
                        <div style={{ position: "absolute", top: px(8), right: px(9), width: px(7), height: px(7), borderRadius: "50%", background: C.clay, border: `2px solid ${C.card1}`, animation: "dotP 2s infinite" }} />
                    </div>
                </div>
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 100px" }}>

                {/* SECTION 1 - Application Status Card */}
                {hasPurchase && (
                    <div style={{ background: C.card1, border: `1px solid ${C.clay}`, borderRadius: px(16), padding: "18px", marginBottom: px(20), position: "relative", overflow: "hidden" }}>
                        <div style={{ position: "absolute", top: 0, right: 0, width: px(150), height: px(150), background: "radial-gradient(circle at top right, rgba(200,75,12,.15), transparent 70%)", pointerEvents: "none" }} />
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: px(8) }}>
                            <div>
                                <div style={{ fontFamily: F.mono, fontSize: px(10), color: C.textMuted, marginBottom: px(4) }}>ACTIVE APPLICATION</div>
                                <div style={{ fontFamily: F.serif, fontWeight: 700, fontSize: px(18), color: C.textPrimary }}>MUDRA Tarun Loan</div>
                            </div>
                            <span style={{ background: "rgba(245,166,35,.1)", border: `1px solid ${C.amber}`, color: C.amber, fontFamily: F.mono, fontSize: px(9), padding: "4px 8px", borderRadius: px(6), fontWeight: 700 }}>IN REVIEW</span>
                        </div>

                        <div style={{ marginTop: px(16), marginBottom: px(16) }}>
                            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: F.sans, fontSize: px(11), color: C.textPrimary, marginBottom: px(6) }}>
                                <span>Progress: 35%</span>
                                <span style={{ color: C.textMuted }}>Step 2 of 4</span>
                            </div>
                            <div style={{ height: px(6), background: C.card2, borderRadius: px(3), overflow: "hidden" }}>
                                <div style={{ width: "35%", height: "100%", background: `linear-gradient(90deg, ${C.clay}, ${C.amber})`, borderRadius: px(3) }} />
                            </div>
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative", paddingTop: px(8) }}>
                            <div style={{ position: "absolute", top: px(14), left: px(10), right: px(10), height: px(2), background: C.card2, zIndex: 0 }} />
                            <div style={{ position: "absolute", top: px(14), left: px(10), width: "35%", height: px(2), background: C.clay, zIndex: 0 }} />

                            {[
                                { l: "Applied", s: 2, c: C.clay },
                                { l: "Docs", s: 1, c: C.amber },
                                { l: "Review", s: 0, c: C.border },
                                { l: "Approved", s: 0, c: C.border }
                            ].map((st, i) => (
                                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: px(6), zIndex: 1, width: px(40) }}>
                                    <div style={{ width: px(14), height: px(14), borderRadius: "50%", background: st.s === 2 ? C.clay : st.s === 1 ? C.card1 : C.bg, border: `2px solid ${st.c}`, display: "flex", alignItems: "center", justifyContent: "center", animation: st.s === 1 ? "dotP 1.5s infinite" : "none" }}>
                                        {st.s === 1 && <div style={{ width: px(6), height: px(6), borderRadius: "50%", background: C.amber }} />}
                                    </div>
                                    <span style={{ fontFamily: F.sans, fontSize: px(9), color: st.s > 0 ? C.textPrimary : C.textMuted, textAlign: "center" }}>{st.l}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* SECTION 2 - Quick Actions */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: px(12), marginBottom: px(24) }}>
                    <button style={{ background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(12), padding: "12px 14px", display: "flex", alignItems: "center", gap: px(10) }}>
                        <div style={{ width: px(32), height: px(32), borderRadius: px(10), background: "rgba(76,201,160,.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>{I.plus(C.teal, 16)}</div>
                        <span style={{ fontFamily: F.sans, fontWeight: 600, fontSize: px(13), color: C.textPrimary }}>Upload Docs</span>
                    </button>
                    <button style={{ background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(12), padding: "12px 14px", display: "flex", alignItems: "center", gap: px(10) }}>
                        <div style={{ width: px(32), height: px(32), borderRadius: px(10), background: "rgba(200,75,12,.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>{I.person(C.clay, 16)}</div>
                        <span style={{ fontFamily: F.sans, fontWeight: 600, fontSize: px(13), color: C.textPrimary }}>Chat Agent</span>
                    </button>
                </div>

                {/* SECTION 3 - Achievement Strip */}
                <div style={{ background: "linear-gradient(90deg, #1C2A23, #2A170C)", border: `1px solid ${C.border}`, borderRadius: px(12), padding: "16px", marginBottom: px(30), display: "flex", justifyContent: "space-between" }}>
                    {[["₹47Cr+", "Disbursed"], ["50K+", "Customers"], ["98%", "Success"]].map(([v, l], i) => (
                        <div key={i} style={{ textAlign: "center" }}>
                            <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: px(15), color: "#fff", marginBottom: px(2) }}>{v}</div>
                            <div style={{ fontFamily: F.sans, fontSize: px(10), color: "rgba(255,255,255,.7)" }}>{l}</div>
                        </div>
                    ))}
                </div>

                {/* SECTION 4 - Video Library */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: px(12) }}>
                    <div style={{ display: "flex", alignItems: "center", gap: px(8) }}>
                        <span style={{ fontSize: px(18) }}>📹</span>
                        <span style={{ fontFamily: F.serif, fontWeight: 700, fontSize: px(16), color: C.textPrimary }}>Video Library</span>
                    </div>
                    <button style={{ background: "none", color: C.clay, fontFamily: F.sans, fontSize: px(12), fontWeight: 600 }}>View all →</button>
                </div>
                <div style={{ display: "flex", overflowX: "auto", gap: px(12), paddingBottom: px(8), marginBottom: px(24) }}>
                    {[
                        { t: "How MUDRA Loan Works", d: "3:45", c: "linear-gradient(135deg, rgb(162, 53, 2) 0%, rgb(40, 14, 2) 100%)" },
                        { t: "Business Loan Guide 2024", d: "5:20", c: "linear-gradient(135deg, rgb(30, 114, 88) 0%, rgb(11, 40, 31) 100%)" },
                        { t: "Zero Collateral Schemes", d: "2:15", c: "linear-gradient(135deg, rgb(151, 99, 13) 0%, rgb(38, 25, 3) 100%)" }
                    ].map((v, i) => (
                        <div key={i} style={{ width: px(140), flexShrink: 0 }}>
                            <div style={{ width: "100%", height: px(80), background: v.c, borderRadius: px(12), position: "relative", marginBottom: px(8), display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <div style={{ width: px(30), height: px(30), borderRadius: "50%", background: "rgba(255,255,255,.2)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    {I.play("#fff", 14)}
                                </div>
                                <div style={{ position: "absolute", bottom: px(6), right: px(6), background: "rgba(0,0,0,.6)", color: "#fff", fontFamily: F.mono, fontSize: px(9), padding: "2px 6px", borderRadius: px(4) }}>{v.d}</div>
                            </div>
                            <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: px(12), color: C.textPrimary, lineHeight: 1.3 }}>{v.t}</div>
                        </div>
                    ))}
                </div>

                {/* SECTION 5 - Success Stories */}
                <div style={{ display: "flex", alignItems: "center", gap: px(8), marginBottom: px(12) }}>
                    <span style={{ fontSize: px(18) }}>💬</span>
                    <span style={{ fontFamily: F.serif, fontWeight: 700, fontSize: px(16), color: C.textPrimary }}>Success Stories</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: px(12), marginBottom: px(30) }}>
                    {[
                        { n: "Priya Sharma", l: "Mumbai", s: "₹8L MUDRA Tarun", q: "Got loan in 6 days. The documentation help was incredible." },
                        { n: "Ramkumar", l: "Chennai", s: "₹3L PM SVANidhi", q: "As a street vendor, I never thought I'd get a proper bank loan." },
                        { n: "Sunita Devi", l: "Delhi", s: "₹5L CGTMSE", q: "My tailoring shop expanded thanks to Loan Doctor's guidance." }
                    ].map((s, i) => (
                        <div key={i} style={{ background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(14), padding: "14px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: px(8) }}>
                                <div style={{ display: "flex", alignItems: "center", gap: px(8) }}>
                                    <div style={{ width: px(30), height: px(30), borderRadius: "50%", background: C.card2, display: "flex", alignItems: "center", justifyContent: "center", color: C.textPrimary, fontFamily: F.serif, fontWeight: 700, fontSize: px(13) }}>{s.n.charAt(0)}</div>
                                    <div>
                                        <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: px(13), color: C.textPrimary }}>{s.n}</div>
                                        <div style={{ fontFamily: F.sans, fontSize: px(10), color: C.textMuted }}>{s.l} · {s.s}</div>
                                    </div>
                                </div>
                                <div style={{ display: "flex" }}>{[1, 2, 3, 4, 5].map(x => <span key={x}>{I.star(C.amber, 10)}</span>)}</div>
                            </div>
                            <div style={{ fontFamily: F.sans, fontSize: px(12), color: C.textMuted, fontStyle: "italic", lineHeight: 1.4 }}>"{s.q}"</div>
                        </div>
                    ))}
                </div>

                {/* SECTION 6 - Live Offers */}
                <div style={{ display: "flex", alignItems: "center", gap: px(8), marginBottom: px(12) }}>
                    <span style={{ fontSize: px(18) }}>🔥</span>
                    <span style={{ fontFamily: F.serif, fontWeight: 700, fontSize: px(16), color: C.textPrimary }}>Live Scheme Offers</span>
                </div>
                <div style={{ display: "flex", overflowX: "auto", gap: px(12), paddingBottom: px(8), marginBottom: px(30) }}>
                    {[
                        { t: "MUDRA Tarun", b: "🔥 Ends in 2 days", bc: C.clay },
                        { t: "PM SVANidhi", b: "⚡ Limited slots", bc: C.amber }
                    ].map((o, i) => (
                        <div key={i} style={{ width: px(200), flexShrink: 0, background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(14), padding: "14px", position: "relative" }}>
                            <div style={{ position: "absolute", top: px(-10), left: px(14), background: C.bg, border: `1px solid ${o.bc}`, color: o.bc, fontFamily: F.mono, fontSize: px(9), padding: "4px 8px", borderRadius: px(6), animation: "pulse 2s infinite" }}>{o.b}</div>
                            <div style={{ marginTop: px(10), fontFamily: F.serif, fontWeight: 700, fontSize: px(16), color: C.textPrimary, marginBottom: px(4) }}>{o.t}</div>
                            <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted, marginBottom: px(12) }}>Low documentation, fast approval.</div>
                            <button style={{ ...ghostCta(), padding: "6px 14px", height: "auto", fontSize: px(12) }}>Check Eligibility →</button>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}

// ── S13 DOCUMENTATION (MY APP) ─────────────────────────────────────────────
function S13({ setActiveD, setSheet }) {
    const [anim, setAnim] = useState(0);
    useEffect(() => { setTimeout(() => setAnim(35), 300); }, []);

    const dList = [
        { id: "adhar", n: "Aadhaar Card", s: true },
        { id: "pan", n: "PAN Card", s: true },
        { id: "bank", n: "Bank Statement", s: false, w: "6 months continuous statements required." },
        { id: "business", n: "Business Proof", s: false }
    ];
    const up = dList.filter(d => d.s).length;

    return (
        <div className="sc" style={{ height: "100%", background: C.bg, display: "flex", flexDirection: "column" }}>
            <SB />
            <div style={{ padding: "0 16px 14px", display: "flex", alignItems: "center", borderBottom: `1px solid ${C.border}` }}>
                <div style={{ fontFamily: F.serif, fontWeight: 700, fontSize: px(18), color: C.textPrimary }}>Application Dashboard</div>
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 100px" }}>

                {/* HEADER CARD */}
                <div style={{ background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(16), padding: "18px", marginBottom: px(24) }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: px(8) }}>
                        <div>
                            <div style={{ fontFamily: F.mono, fontSize: px(10), color: C.textMuted, marginBottom: px(4) }}>MY APPLICATION</div>
                            <div style={{ fontFamily: F.serif, fontWeight: 700, fontSize: px(20), color: C.textPrimary, marginBottom: px(8) }}>MUDRA Tarun Loan</div>
                            <span style={{ display: "inline-block", background: "rgba(237,240,232,.08)", borderRadius: px(6), padding: "4px 8px", fontFamily: F.mono, fontSize: px(10), color: C.textPrimary, border: `1px solid ${C.border}` }}>Case: LD-2024-038</span>
                        </div>
                        <span style={{ background: "rgba(245,166,35,.1)", border: `1px solid ${C.amber}`, color: C.amber, fontFamily: F.mono, fontSize: px(9), padding: "4px 8px", borderRadius: px(6), fontWeight: 700 }}>IN REVIEW</span>
                    </div>

                    <div style={{ marginTop: px(20) }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: F.sans, fontSize: px(12), color: C.textPrimary, marginBottom: px(8) }}>
                            <span style={{ fontWeight: 600 }}>Step 2 of 4 — Document Verification</span>
                            <span style={{ color: C.amber, fontWeight: 700 }}>{anim}%</span>
                        </div>
                        <div style={{ height: px(8), background: C.card2, borderRadius: px(4), overflow: "hidden" }}>
                            <div style={{ width: `${anim}%`, height: "100%", background: `linear-gradient(90deg, ${C.clay}, ${C.amber})`, borderRadius: px(4), transition: "width 1s cubic-bezier(.16,1,.3,1)" }} />
                        </div>
                    </div>
                </div>

                {/* TIMELINE SECTION */}
                <div style={{ fontFamily: F.serif, fontWeight: 700, fontSize: px(18), color: C.textPrimary, marginBottom: px(16) }}>Application Journey</div>
                <div style={{ background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(16), padding: "20px 16px", marginBottom: px(24) }}>
                    {[
                        { t: "Application Submitted", d: "Mar 1, 2024 · 10:32 AM", s: "done" },
                        { t: "Payment Received ₹999", d: "Mar 1, 2024 · 10:35 AM", s: "done" },
                        {
                            t: "Document Verification", d: `In progress — ${up} of 4 documents uploaded`, s: "curr",
                            sub: (
                                <div style={{ marginTop: px(10), background: C.bg, border: `1px solid ${C.border}`, borderRadius: px(10), padding: "12px" }}>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: px(6), marginBottom: px(10) }}>
                                        {dList.map((d, i) => (
                                            <div key={i} style={{ display: "flex", alignItems: "center", gap: px(4), background: d.s ? "rgba(76,201,160,.1)" : C.card2, border: `1px solid ${d.s ? C.teal : C.border}`, padding: "4px 8px", borderRadius: px(6) }}>
                                                {d.s ? I.check(C.teal, 10) : <span style={{ color: C.clay, fontSize: px(10) }}>✗</span>}
                                                <span style={{ fontFamily: F.sans, fontSize: px(10), color: d.s ? C.teal : C.textMuted }}>{d.id.toUpperCase()}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <button onClick={() => { setActiveD("bank"); setSheet(true); }} style={{ background: "transparent", border: `1px solid ${C.clay}`, color: C.clay, padding: "6px 12px", borderRadius: px(6), fontFamily: F.sans, fontSize: px(11), fontWeight: 600 }}>Upload Missing Docs →</button>
                                </div>
                            )
                        },
                        { t: "Loan Disbursement", d: "Expected: 5–7 working days after approval", s: "wait" }
                    ].map((s, i, arr) => (
                        <div key={i} style={{ display: "flex", gap: px(16), position: "relative", paddingBottom: i === arr.length - 1 ? 0 : px(24) }}>
                            {i !== arr.length - 1 && <div style={{ position: "absolute", top: px(24), left: px(11), bottom: 0, width: px(2), background: s.s === "done" ? C.teal : C.border }} />}
                            <div style={{ width: px(24), height: px(24), borderRadius: "50%", background: s.s === "done" ? C.teal : s.s === "curr" ? "rgba(245,166,35,.2)" : C.card2, border: s.s === "curr" ? `2px solid ${C.amber}` : `1px solid ${s.s === "done" ? C.teal : C.border}`, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1, flexShrink: 0 }}>
                                {s.s === "done" && I.check("#111510", 12)}
                                {s.s === "curr" && <div style={{ width: px(8), height: px(8), borderRadius: "50%", background: C.amber, animation: "blink 1.5s infinite" }} />}
                            </div>
                            <div style={{ paddingTop: px(2), flex: 1 }}>
                                <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: px(14), color: s.s === "wait" ? C.textMuted : C.textPrimary, marginBottom: px(4) }}>{s.t}</div>
                                <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted }}>{s.d}</div>
                                {s.sub && s.sub}
                            </div>
                        </div>
                    ))}
                </div>

                {/* DOCUMENTS SECTION */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: px(16) }}>
                    <div style={{ fontFamily: F.serif, fontWeight: 700, fontSize: px(18), color: C.textPrimary }}>Document Checklist</div>
                    <div style={{ fontFamily: F.mono, fontSize: px(11), color: C.amber, fontWeight: 700 }}>{up} of {dList.length} Uploaded</div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: px(12), marginBottom: px(24) }}>
                    {dList.map((d) => (
                        <div key={d.id} style={{ background: C.card1, border: `1.5px solid ${d.s ? C.teal : C.border}`, borderRadius: px(14), padding: "16px", transition: "border .3s" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: px(12) }}>
                                    <div style={{ width: px(40), height: px(40), borderRadius: px(10), background: d.s ? "rgba(76,201,160,.1)" : C.card2, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        {I.doc(d.s ? C.teal : C.textMuted, 20)}
                                    </div>
                                    <div>
                                        <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: px(14), color: C.textPrimary, marginBottom: px(2) }}>{d.n}</div>
                                        <div style={{ fontFamily: F.sans, fontSize: px(11), color: d.s ? C.teal : C.textMuted }}>{d.s ? "Verified" : "Pending Action"}</div>
                                    </div>
                                </div>
                                {d.s ? (
                                    <div style={{ width: px(28), height: px(28), borderRadius: "50%", background: C.teal, display: "flex", alignItems: "center", justifyContent: "center", animation: "popIn .3s" }}>{I.check("#111510", 14)}</div>
                                ) : (
                                    <button onClick={() => { setActiveD(d.id); setSheet(true); }} style={{ background: "rgba(200,75,12,.1)", color: C.clay, border: `1px solid ${C.clay}`, borderRadius: px(8), padding: "8px 14px", fontFamily: F.sans, fontWeight: 600, fontSize: px(12) }}>Upload</button>
                                )}
                            </div>
                            {d.w && !d.s && (
                                <div style={{ display: "flex", gap: px(8), marginTop: px(14), padding: "10px 12px", background: "rgba(245,166,35,.08)", borderRadius: px(10), border: `1px solid rgba(245,166,35,.2)` }}>
                                    {I.info(C.amber, 14)}
                                    <span style={{ fontFamily: F.sans, fontSize: px(11), color: C.textPrimary, lineHeight: 1.4 }}>{d.w}</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: px(10), justifyContent: "center", marginBottom: px(24) }}>
                    <div style={{ width: px(24), height: px(24), borderRadius: "50%", background: "rgba(237,240,232,.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>{I.check(C.textMuted, 10)}</div>
                    <span style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted }}>All documents are 256-bit encrypted</span>
                </div>

                <button style={{ ...cta(up === dList.length ? C.clay : C.card2), opacity: up === dList.length ? 1 : 0.5, marginBottom: px(30) }}>Submit All Documents</button>

                {/* RECENT UPDATES */}
                <div style={{ fontFamily: F.serif, fontWeight: 700, fontSize: px(18), color: C.textPrimary, marginBottom: px(16) }}>Recent Updates</div>
                <div style={{ display: "flex", flexDirection: "column", gap: px(12) }}>
                    <div style={{ background: C.card1, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.clay}`, borderRadius: px(12), padding: "16px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: px(6) }}>
                            <span style={{ fontFamily: F.sans, fontWeight: 600, fontSize: px(13), color: C.textPrimary }}>Action required: Upload Bank Statement</span>
                        </div>
                        <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted }}>Today</div>
                    </div>
                    <div style={{ background: C.card1, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.teal}`, borderRadius: px(12), padding: "16px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: px(6) }}>
                            <span style={{ fontFamily: F.sans, fontWeight: 600, fontSize: px(13), color: C.textPrimary }}>Documents received</span>
                        </div>
                        <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted }}>Mar 2 · 9:41 AM</div>
                    </div>
                </div>

            </div>
        </div>
    );
}


// ── S14 CHAT ───────────────────────────────────────────────────────────────

function S14() {
    const msgs = [
        { t: "sys", date: "Today, 10:14 AM", text: "Case LD-2024-038 registered. Ramesh K. assigned as your agent." },
        { t: "agent", time: "10:15", text: "Namaste Rahul ji! Please upload your Bank Statement in the documentation tab so we can proceed.", name: "Ramesh K." },
        { t: "user", time: "10:22", text: "Done, 6 months statement uploaded 👍" },
        { t: "sys", text: "Documents received. Under review. ETA: 3–5 working days." },
    ];
    return (
        <div className="sc" style={{ height: "100%", background: C.bg, display: "flex", flexDirection: "column" }}>
            <SB />
            <div style={{ padding: "8px 16px 12px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: px(12) }}>
                    <div style={{ position: "relative" }}>
                        <div style={{ width: px(38), height: px(38), borderRadius: "50%", background: C.card1, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: px(14), color: C.textPrimary }}>RK</div>
                        <div style={{ position: "absolute", bottom: px(1), right: px(1), width: px(9), height: px(9), borderRadius: "50%", background: C.teal, border: `1.5px solid ${C.bg}` }} />
                    </div>
                    <div>
                        <div style={{ fontFamily: F.sans, fontWeight: 700, fontSize: px(15), color: C.textPrimary }}>Ramesh K.</div>
                        <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted }}>Loan Agent</div>
                    </div>
                </div>
                <div style={{ display: "flex", gap: px(16) }}>
                    <button style={{ background: "none" }}>{I.call(C.textPrimary, 18)}</button>
                    <button style={{ background: "none" }}>{I.video(C.textPrimary, 18)}</button>
                </div>
            </div>

            <div style={{ background: "rgba(200,75,12,.05)", borderBottom: `1px solid rgba(200,75,12,.1)`, padding: "8px", textAlign: "center" }}>
                <span style={{ fontFamily: F.mono, fontSize: px(10), color: C.clay }}>CASE REFERENCE: LD-2024-038</span>
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 80px", display: "flex", flexDirection: "column", gap: px(14) }}>
                {msgs.map((m, i) => {
                    if (m.t === "sys") {
                        return (
                            <div key={i} style={{ width: "100%", textAlign: "center", margin: "8px 0", animation: `msgIn .22s ease both ${i * .1}s` }}>
                                {m.date && <div style={{ fontFamily: F.mono, fontSize: px(9), color: C.textMuted, marginBottom: px(10) }}>{m.date}</div>}
                                <div style={{ display: "inline-block", background: "rgba(76,201,160,.12)", color: C.teal, padding: "6px 12px", borderRadius: px(12), fontFamily: F.sans, fontSize: px(10), maxWidth: "85%" }}>{m.text}</div>
                            </div>
                        );
                    }
                    const isUsr = m.t === "user";
                    return (
                        <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: isUsr ? "flex-end" : "flex-start", animation: `msgIn .22s ease both ${i * .1}s` }}>
                            {!isUsr && <div style={{ fontFamily: F.sans, fontSize: px(10), color: C.textMuted, marginBottom: px(4), marginLeft: px(4) }}>{m.name}</div>}
                            <div style={{ maxWidth: "78%", background: isUsr ? "rgba(200,75,12,.12)" : C.card1, border: `1px solid ${isUsr ? "rgba(200,75,12,.2)" : C.border}`, borderRadius: isUsr ? "12px 12px 3px 12px" : "3px 12px 12px 12px", padding: "10px 12px" }}>
                                <div style={{ fontFamily: F.sans, fontSize: px(13), color: C.textPrimary, lineHeight: 1.4 }}>{m.text}</div>
                                <div style={{ fontFamily: F.mono, fontSize: px(9), color: C.textMuted, marginTop: px(4), textAlign: isUsr ? "right" : "left" }}>{m.time}</div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div style={{ position: "absolute", bottom: px(62), left: 0, right: 0, padding: "10px 16px", background: C.bg, borderTop: `1px solid ${C.border}` }}>
                <div style={{ display: "flex", gap: px(8), alignItems: "center" }}>
                    <div style={{ width: px(36), height: px(36), borderRadius: "50%", background: C.card1, display: "flex", alignItems: "center", justifyContent: "center" }}>{I.cross(C.textPrimary, 16)}</div>
                    <div style={{ flex: 1, height: px(40), background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(20), display: "flex", alignItems: "center", padding: "0 14px" }}>
                        <span style={{ fontFamily: F.sans, fontSize: px(12), color: C.textMuted }}>Type a message…</span>
                    </div>
                    <button style={{ width: px(36), height: px(36), borderRadius: "50%", background: C.clay, display: "flex", alignItems: "center", justifyContent: "center" }}>{I.mic("#fff", 16)}</button>
                </div>
            </div>
        </div>
    );
}

// ── S15 PROFILE ────────────────────────────────────────────────────────────
function S15() {
    const [notif, setNotif] = useState(true);
    return (
        <div className="sc" style={{ height: "100%", background: C.bg, display: "flex", flexDirection: "column" }}>
            <SB />
            <div style={{ flex: 1, overflowY: "auto", padding: "8px 16px 90px" }}>

                <div style={{ display: "flex", alignItems: "center", gap: px(16), marginBottom: px(24) }}>
                    <div style={{ width: px(70), height: px(70), borderRadius: px(20), background: C.card1, border: `2px solid ${C.clay}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F.serif, fontWeight: 700, fontSize: px(26), color: C.textPrimary }}>RK</div>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: F.serif, fontWeight: 700, fontSize: px(20), color: C.textPrimary, marginBottom: px(2) }}>Rahul Kumar</div>
                        <div style={{ fontFamily: F.sans, fontSize: px(13), color: C.textMuted, marginBottom: px(8) }}>+91 98765 43210</div>
                        <button style={{ background: "rgba(237,240,232,.08)", borderRadius: px(6), padding: "4px 10px", fontFamily: F.sans, fontWeight: 600, fontSize: px(10), color: C.textPrimary }}>Edit Profile</button>
                    </div>
                </div>

                <div style={{ background: "linear-gradient(135deg, rgba(200,75,12,.1), transparent)", border: `1px solid rgba(200,75,12,.2)`, borderRadius: px(16), padding: "16px", marginBottom: px(24) }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: px(8) }}>
                        <span style={{ fontFamily: F.mono, fontSize: px(9), color: C.clay }}>ACTIVE APP</span>
                        <span style={{ fontFamily: F.mono, fontSize: px(9), color: C.amber }}>IN REVIEW</span>
                    </div>
                    <div style={{ fontFamily: F.serif, fontWeight: 700, fontSize: px(16), color: C.textPrimary, marginBottom: px(10) }}>MUDRA Tarun Loan</div>
                    <div style={{ height: px(4), background: "rgba(0,0,0,.3)", borderRadius: px(2), overflow: "hidden" }}>
                        <div style={{ width: "35%", height: "100%", background: C.clay }} />
                    </div>
                </div>

                {[
                    {
                        t: "ACCOUNT", items: [
                            ["Language", "English (India)", null, true],
                            ["Push Notifications", null, notif, false, () => setNotif(!notif)],
                            ["Update Mobile Number", null, null, true],
                        ]
                    },
                    {
                        t: "SUPPORT", items: [
                            ["Contact Dedicated Agent", null, null, true],
                            ["Help & FAQ", null, null, true],
                            ["Report an Issue", null, null, true],
                        ]
                    },
                    {
                        t: "LEGAL", items: [
                            ["Privacy Policy", null, null, true],
                            ["Terms of Service", null, null, true],
                        ]
                    }
                ].map((g, i) => (
                    <div key={i} style={{ marginBottom: px(24) }}>
                        <div style={{ fontFamily: F.mono, fontSize: px(9), color: C.textMuted, marginBottom: px(10), paddingLeft: px(4), letterSpacing: "1px" }}>{g.t}</div>
                        <div style={{ background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(12), overflow: "hidden" }}>
                            {g.items.map(([l, r, tog, chev, cb], ii) => (
                                <div key={ii} onClick={cb} style={{ padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: ii < g.items.length - 1 ? `1px solid ${C.border}` : "none", cursor: cb ? "pointer" : "default" }}>
                                    <span style={{ fontFamily: F.sans, fontWeight: 500, fontSize: px(13), color: C.textPrimary }}>{l}</span>
                                    <div style={{ display: "flex", alignItems: "center", gap: px(8) }}>
                                        {r && <span style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted }}>{r}</span>}
                                        {tog !== null && tog !== undefined && (
                                            <div style={{ width: px(38), height: px(22), borderRadius: px(11), background: tog ? C.clay : C.card2, border: `1px solid ${tog ? C.clay : C.border}`, position: "relative", cursor: "pointer", transition: "all .2s" }}>
                                                <div style={{ position: "absolute", top: px(2), left: tog ? px(18) : px(2), width: px(16), height: px(16), borderRadius: "50%", background: "#fff", transition: "all .2s cubic-bezier(.16,1,.3,1)" }} />
                                            </div>
                                        )}
                                        {chev && I.chevron(C.textMuted, 14)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                <button style={{ ...ghostCta(), border: "none", color: "rgba(245,166,35,.8)" }}>Log Out</button>
            </div>
        </div>
    );
}

// ── APP ROOT AND ROUTER ────────────────────────────────────────────────────
export default function App() {
    const [scr, setScr] = useState("s01");
    const [hist, setHist] = useState([]);
    const [hasPurchase, setHasPurchase] = useState(false);
    const [navTab, setNavTab] = useState("home");
    const [schemeData, setSchemeData] = useState(null);
    const [cameraOpen, setCameraOpen] = useState(false);
    const [, setActiveD] = useState(null);
    const [aiModalOpen, setAiModalOpen] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);

    const go = (s) => {
        if (s === "s07" && hasPurchase && navTab !== "chat") {
            setAiModalOpen(true);
            return;
        }
        setHist(h => [...h, scr]);
        setScr(s);
    };
    const back = () => {
        if (hist.length > 0) {
            const p = hist[hist.length - 1];
            setHist(h => h.slice(0, -1));
            setScr(p);
        }
    };

    const isMainApp = ["main_home", "myapp", "chat", "profile", "schemes"].includes(scr);

    const renderScr = () => {
        switch (scr) {
            case "s01": return <S01 go={go} />;
            case "s02": return <S02 go={go} />;
            case "s03": return <S03 go={go} />;
            case "s04": return <S04 go={go} />;
            case "home_new": return <HomeNew go={go} />;
            case "schemes_browse": return <SchemesBrowser go={go} back={back} setSchemeData={setSchemeData} inMainApp={false} />;
            case "scheme_detail": return <SchemeDetail go={go} back={back} data={schemeData} showSpec={!hasPurchase} />;
            case "s06": return <S06 go={go} back={back} />;
            case "s07": return <S07 go={go} back={back} setSchemeData={setSchemeData} isOverlay={false} />;
            case "specialist_confirm": return <SpecialistConfirm go={go} back={back} data={schemeData} setSelectedSlot={setSelectedSlot} />;
            case "specialist_booked": return <SpecialistBooked go={go} selectedSlot={selectedSlot} />;
            case "s09": return <S09 go={go} back={back} />;
            case "s10": return <S10 go={go} />;
            case "payment": return <Payment go={go} back={back} />;
            case "pay_success": return <PaySuccess go={(s) => { setHasPurchase(true); setNavTab("home"); setScr(s); setHist([]); }} />;
            case "main_home": return <S11 go={go} hasPurchase={hasPurchase} />;
            case "myapp": return <S13 setActiveD={setActiveD} setSheet={setCameraOpen} />;
            case "chat": return <S14 />;
            case "profile": return <S15 />;
            case "schemes": return <SchemesBrowser go={go} back={back} setSchemeData={setSchemeData} inMainApp={true} />;
            default: return <S01 go={go} />;
        }
    };

    return (
        <div style={{ width: "100vw", height: "100vh", background: "#000", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F.sans }}>
            <style>{CSS}</style>
            <div style={{ width: px(375), height: px(812), background: C.bg, borderRadius: px(46), overflow: "hidden", boxShadow: "0 24px 80px rgba(0,0,0,.7),0 0 0 1px rgba(255,255,255,.07)", position: "relative", flexShrink: 0 }}>

                <div style={{ position: "absolute", top: px(12), left: "50%", transform: "translateX(-50%)", width: px(116), height: px(32), background: "#000", borderRadius: px(20), zIndex: 999, pointerEvents: "none" }} />

                {renderScr()}

                {isMainApp && (
                    <BNav active={navTab} onNav={(t) => { setNavTab(t); setScr(t === "home" ? "main_home" : t); }} hasPurchase={hasPurchase} />
                )}

                {isMainApp && navTab !== "chat" && (
                    <div style={{ position: "absolute", bottom: px(74), right: px(20), display: "flex", alignItems: "center", gap: px(10), zIndex: 99 }}>
                        <div style={{ background: C.card1, color: C.textPrimary, padding: "6px 12px", borderRadius: px(16), border: `1px solid ${C.border}`, fontFamily: F.sans, fontSize: px(12), fontWeight: 600, boxShadow: "0 4px 15px rgba(0,0,0,.5)" }}>Ask AI</div>
                        <button onClick={() => setAiModalOpen(true)} style={{ width: px(52), height: px(52), borderRadius: "50%", background: C.clay, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 15px rgba(200,75,12,.4)", animation: "fabP 2s infinite" }}>
                            {I.mic("#fff", 20)}
                        </button>
                    </div>
                )}

                {cameraOpen && (
                    <div style={{ position: "absolute", inset: 0, zIndex: 9999, display: "flex", flexDirection: "column" }}>
                        <div onClick={() => setCameraOpen(false)} style={{ flex: 1, background: "rgba(0,0,0,.6)", backdropFilter: "blur(4px)" }} />
                        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: C.card1, borderRadius: "24px 24px 0 0", padding: "20px 16px 30px", zIndex: 11, animation: "slideUp .4s cubic-bezier(.16,1,.3,1)" }}>
                            <div style={{ width: px(40), height: px(4), background: C.card2, borderRadius: px(2), margin: "0 auto 20px" }} />
                            <div style={{ fontFamily: F.sans, fontWeight: 700, fontSize: px(16), color: C.textPrimary, marginBottom: px(20), textAlign: "center" }}>Upload Document</div>
                            <button onClick={() => setCameraOpen(false)} style={{ width: "100%", height: px(56), background: C.card2, borderRadius: px(14), display: "flex", alignItems: "center", gap: px(14), padding: "0 20px", marginBottom: px(12) }}>
                                <div style={{ width: px(36), height: px(36), borderRadius: "50%", background: "rgba(237,240,232,.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>{I.wa(C.textPrimary, 16)}</div>
                                <div style={{ textAlign: "left" }}>
                                    <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: px(14), color: C.textPrimary }}>Take Photo</div>
                                    <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted }}>Use your camera to scan</div>
                                </div>
                            </button>
                            <button onClick={() => setCameraOpen(false)} style={{ width: "100%", height: px(56), background: C.card2, borderRadius: px(14), display: "flex", alignItems: "center", gap: px(14), padding: "0 20px" }}>
                                <div style={{ width: px(36), height: px(36), borderRadius: "50%", background: "rgba(237,240,232,.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>{I.doc(C.textPrimary, 16)}</div>
                                <div style={{ textAlign: "left" }}>
                                    <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: px(14), color: C.textPrimary }}>Upload File</div>
                                    <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted }}>Choose from files or gallery</div>
                                </div>
                            </button>
                        </div>
                    </div>
                )}

                {aiModalOpen && (
                    <div style={{ position: "absolute", inset: 0, zIndex: 9998, animation: "slideUp .3s ease" }}>
                        <S07 go={go} back={back} setSchemeData={setSchemeData} isOverlay={true} onCloseModal={() => setAiModalOpen(false)} />
                    </div>
                )}
            </div>
        </div>
    );
}
