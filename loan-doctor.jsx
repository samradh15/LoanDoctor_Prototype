import { useState, useEffect } from "react";

const C = {
  bg: "#111510", card1: "#1C2118", card2: "#242B20",
  clay: "#C84B0C", teal: "#4CC9A0", amber: "#F5A623",
  textPrimary: "#EDF0E8", textMuted: "#7A8072",
  border: "rgba(237,240,232,0.07)",
};
const F = { serif: "'Fraunces', serif", sans: "'Plus Jakarta Sans', sans-serif", mono: "'Syne Mono', monospace" };

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;0,9..144,900&family=Plus+Jakarta+Sans:wght@400;500;600&family=Syne+Mono&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
::-webkit-scrollbar{width:0;}
@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
@keyframes ringA{0%,100%{transform:scale(1);opacity:.6}50%{transform:scale(1.07);opacity:.1}}
@keyframes ringB{0%,100%{transform:scale(1);opacity:.55}50%{transform:scale(1.06);opacity:.08}}
@keyframes ringC{0%,100%{transform:scale(1);opacity:.5}50%{transform:scale(1.05);opacity:.06}}
@keyframes bar{0%,100%{transform:scaleY(.35)}50%{transform:scaleY(1)}}
@keyframes blink{0%,100%{opacity:1}50%{opacity:.25}}
@keyframes fab{0%,100%{transform:scale(1);opacity:.8}50%{transform:scale(1.2);opacity:.25}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes strokeIn{from{stroke-dashoffset:200}to{stroke-dashoffset:0}}
@keyframes popIn{from{transform:scale(0)}to{transform:scale(1)}}
@keyframes msgIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
@keyframes dotP{0%,100%{transform:scale(1)}50%{transform:scale(1.5)}}
@keyframes notifP{0%,100%{transform:scale(1)}60%{transform:scale(1.35)}}
.sc{animation:fadeUp .3s ease both;}
input,button{font-family:'Plus Jakarta Sans',sans-serif;}
button{cursor:pointer;border:none;}
`;

const px = n => `${n}px`;

const chip = (col) => {
  const rgb = col === C.clay ? "200,75,12" : col === C.teal ? "76,201,160" : "237,240,232";
  return { background: `rgba(${rgb},.09)`, border: `1px solid rgba(${rgb},.2)`, color: col, borderRadius: px(5), padding: "3px 8px", fontSize: px(10), fontFamily: F.mono, display: "inline-block" };
};

const cta = (bg = C.clay, extra = {}) => ({
  width: "100%", height: px(50), borderRadius: px(13), background: bg,
  color: "#fff", fontSize: px(14), fontWeight: 600, fontFamily: F.sans,
  boxShadow: bg === C.clay ? "0 4px 18px rgba(200,75,12,.32)" : "none",
  display: "flex", alignItems: "center", justifyContent: "center", gap: px(8), ...extra
});

// ── ICONS ──────────────────────────────────────────────────────────────────
const I = {
  cross: (c = C.clay, s = 20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>,
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
};

// ── STATUS BAR ─────────────────────────────────────────────────────────────
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

// ── BOTTOM NAV ─────────────────────────────────────────────────────────────
function BNav({ active, onNav }) {
  const tabs = [{ id: 11, l: "Home", ic: I.home }, { id: 12, l: "Schemes", ic: I.list }, { id: 13, l: "Docs", ic: I.folder }, { id: 14, l: "Chat", ic: I.chat }, { id: 15, l: "Profile", ic: I.person }];
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
  useEffect(() => { const t = setTimeout(() => go(2), 2500); return () => clearTimeout(t); }, []);
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
      <div style={{ flex: 1, padding: "18px 16px 20px", overflow: "auto" }}>
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
        <button onClick={() => go(3)} style={cta(C.clay, { marginTop: px(18) })}>Get Started {I.arrow()}</button>
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
      <div style={{ padding: "0 16px 24px", flex: 1, overflow: "auto" }}>
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
        <button onClick={() => go(4)} style={cta(C.clay, { marginTop: px(20) })}>Continue in {langs[sel].name} {I.arrow()}</button>
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
      <div style={{ padding: "22px 16px", flex: 1 }}>
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
        <button onClick={() => go(5)} style={cta(C.clay)}>Verify & Continue {I.arrow()}</button>
        <div style={{ textAlign: "center", marginTop: px(16), fontFamily: F.sans, fontSize: px(12), color: C.textMuted }}>
          New user? <span style={{ color: C.teal, cursor: "pointer" }}>Create account</span>
        </div>
      </div>
    </div>
  );
}

// ── S05 VOICE WELCOME ──────────────────────────────────────────────────────
function S05({ go }) {
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
        {["ringA", "ringB", "ringC"].map((a, i) => (
          <div key={i} style={{ position: "absolute", width: px(138 - i * 24), height: px(138 - i * 24), borderRadius: "50%", border: `1px solid rgba(76,201,160,${[.06, .12, .18][2 - i]})`, animation: `${a} 2.4s ease-in-out ${[.8, .4, 0][i]}s infinite` }} />
        ))}
        <div style={{ width: px(68), height: px(68), borderRadius: "50%", background: "#1C2A23", border: `1.5px solid ${C.teal}`, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }}>
          {I.cross(C.teal, 28)}
        </div>
      </div>
      <div style={{ margin: "22px 20px 0", background: C.card1, border: `1px solid ${C.border}`, borderRadius: "12px 12px 12px 3px", padding: "12px 14px" }}>
        <div style={{ fontFamily: F.mono, fontSize: px(8), color: C.teal, marginBottom: px(5) }}>LOAN DOCTOR AI</div>
        <div style={{ fontFamily: F.sans, fontSize: px(12), color: C.textPrimary, lineHeight: 1.5 }}>नमस्ते Rahul! आप किस तरह का loan लेना चाहते हैं? Amount और purpose बताइए।</div>
      </div>
      <div style={{ display: "flex", gap: px(3), alignItems: "center", marginTop: px(20), height: px(32) }}>
        {bars.map((h, i) => <div key={i} style={{ width: px(3), height: px(h), background: C.teal, borderRadius: px(2), transformOrigin: "bottom", animation: `bar .9s ease-in-out ${i * .08}s infinite` }} />)}
      </div>
      <div style={{ fontFamily: F.mono, fontSize: px(8), color: C.textMuted, marginTop: px(5) }}>AI SPEAKING…</div>
      <div style={{ flex: 1 }} />
      <button onClick={() => go(6)} style={{ width: px(52), height: px(52), borderRadius: "50%", background: C.clay, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 5px 22px rgba(200,75,12,.4)", marginBottom: px(8) }}>
        {I.mic("#fff", 22)}
      </button>
      <div style={{ fontFamily: F.mono, fontSize: px(8), color: C.textMuted, marginBottom: px(38) }}>Tap to respond</div>
    </div>
  );
}

// ── S06 LIVE CHAT ──────────────────────────────────────────────────────────
function S06({ go, back }) {
  const [step, setStep] = useState(0);
  const msgs = [
    { t: "ai", text: "Business कितने साल पुराना है, और monthly turnover?" },
    { t: "user", text: "3 साल का कपड़े का business। Monthly 40,000 कमाता हूँ।" },
    { t: "ai", text: "Aadhaar, PAN, 6 months bank statement available है?" },
    { t: "user", text: "हाँ, सब available है।" },
    { t: "sys" },
  ];
  useEffect(() => {
    if (step < msgs.length) { const t = setTimeout(() => setStep(s => s + 1), 850); return () => clearTimeout(t); }
    else { const t = setTimeout(() => go(7), 1400); return () => clearTimeout(t); }
  }, [step]);
  return (
    <div className="sc" style={{ height: "100%", background: C.bg, display: "flex", flexDirection: "column" }}>
      <SB />
      <div style={{ padding: "0 16px 10px", display: "flex", alignItems: "center", gap: px(10), borderBottom: `1px solid ${C.border}` }}>
        <button onClick={back} style={{ background: "none", padding: px(2) }}>{I.back()}</button>
        <div style={{ width: px(30), height: px(30), borderRadius: "50%", background: "#1C2A23", border: `1.5px solid ${C.teal}`, display: "flex", alignItems: "center", justifyContent: "center" }}>{I.cross(C.teal, 14)}</div>
        <div>
          <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: px(13), color: C.textPrimary }}>Loan Doctor AI</div>
          <div style={{ display: "flex", alignItems: "center", gap: px(4) }}>
            <div style={{ width: px(5), height: px(5), borderRadius: "50%", background: C.teal, animation: "blink 1.2s ease infinite" }} />
            <span style={{ fontFamily: F.sans, fontSize: px(10), color: C.teal }}>Live Consultation</span>
          </div>
        </div>
      </div>
      <div style={{ margin: "8px 16px 2px", background: "rgba(76,201,160,.065)", border: "1px solid rgba(76,201,160,.22)", borderRadius: px(20), padding: "5px 12px", display: "flex", alignItems: "center", gap: px(8) }}>
        <div style={{ display: "flex", gap: px(2), alignItems: "center" }}>
          {[10, 16, 22, 14].map((h, i) => <div key={i} style={{ width: px(2), height: px(h * .45), background: C.teal, borderRadius: px(1), animation: `bar .9s ease-in-out ${i * .1}s infinite` }} />)}
        </div>
        <span style={{ fontFamily: F.sans, fontSize: px(10), color: C.teal }}>Voice recording — transcribed live</span>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "10px 16px", display: "flex", flexDirection: "column", gap: px(10) }}>
        {msgs.slice(0, step).map((m, i) => (
          <div key={i} style={{ display: "flex", flexDirection: m.t === "user" ? "row-reverse" : "row", animation: "msgIn .2s ease both" }}>
            {m.t === "sys"
              ? <div style={{ width: "100%", textAlign: "center", fontFamily: F.sans, fontStyle: "italic", fontSize: px(11), color: C.teal, padding: "8px 12px", background: "rgba(76,201,160,.05)", borderRadius: px(8), border: "1px solid rgba(76,201,160,.12)", display: "flex", alignItems: "center", justifyContent: "center", gap: px(6) }}>
                Analysing profile · Matching top schemes…
                <span style={{ display: "flex", gap: px(3), alignItems: "center" }}>
                  {[0, 1, 2].map(j => <span key={j} style={{ width: px(4), height: px(4), borderRadius: "50%", background: C.teal, display: "inline-block", animation: `bar .8s ease-in-out ${j * .2}s infinite` }} />)}
                </span>
              </div>
              : <div style={{ maxWidth: "78%", background: m.t === "ai" ? C.card2 : "rgba(200,75,12,.10)", borderRadius: m.t === "ai" ? "3px 12px 12px 12px" : "12px 12px 3px 12px", padding: "9px 12px" }}>
                <div style={{ fontFamily: F.sans, fontSize: px(12), color: C.textPrimary, lineHeight: 1.45 }}>{m.text}</div>
                <div style={{ fontFamily: F.mono, fontSize: px(9), color: C.textMuted, marginTop: px(3) }}>10:0{i}</div>
              </div>
            }
          </div>
        ))}
      </div>
      <div style={{ padding: "8px 16px 20px", display: "flex", gap: px(8), alignItems: "center" }}>
        <div style={{ flex: 1, height: px(40), background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(20), display: "flex", alignItems: "center", padding: "0 14px" }}>
          <span style={{ fontFamily: F.sans, fontSize: px(12), color: C.textMuted }}>Type a message…</span>
        </div>
        <button style={{ width: px(36), height: px(36), borderRadius: "50%", background: C.clay, display: "flex", alignItems: "center", justifyContent: "center" }}>{I.mic("#fff", 15)}</button>
      </div>
    </div>
  );
}

// ── S07 RECOMMENDATIONS ────────────────────────────────────────────────────
function S07({ go, back }) {
  const schemes = [
    { best: true, title: "MUDRA Tarun Loan", sub: "Pradhan Mantri Mudra Yojana", desc: "Collateral-free for established businesses. Quick disbursal, flexible tenure.", chips: [["Up to ₹10L", C.clay], ["8.5% p.a.", C.teal], ["5–7 Days", C.textMuted]] },
    { best: false, title: "CGTMSE Scheme", sub: "Credit Guarantee Fund Trust", desc: "Up to ₹5L with no collateral. Backed by Ministry of MSME.", chips: [["Up to ₹5L", C.clay], ["9.2% p.a.", C.teal], ["7–10 Days", C.textMuted]] },
    { best: false, title: "PM SVANidhi", sub: "PM Street Vendor Scheme", desc: "Micro credit for small traders. Low interest, easy repayment.", chips: [["Up to ₹5L", C.clay], ["7% p.a.", C.teal], ["3–5 Days", C.textMuted]] },
  ];
  return (
    <div className="sc" style={{ height: "100%", background: C.bg, display: "flex", flexDirection: "column" }}>
      <SB />
      <div style={{ padding: "0 16px 12px", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: px(6), marginBottom: px(6) }}>
          <div style={{ width: px(6), height: px(6), borderRadius: "50%", background: C.teal, animation: "blink 1.2s ease infinite" }} />
          <span style={{ fontFamily: F.mono, fontSize: px(9), color: C.teal, letterSpacing: "1px" }}>AI MATCHED · 3 SCHEMES</span>
        </div>
        <div style={{ fontFamily: F.serif, fontWeight: 700, fontSize: px(18), color: C.textPrimary }}>Best Schemes for Your Profile</div>
        <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted, marginTop: px(2) }}>Based on your business profile and documents</div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "14px 16px", display: "flex", flexDirection: "column", gap: px(12) }}>
        {schemes.map((s, i) => (
          <button key={i} onClick={() => go(8)} style={{ width: "100%", textAlign: "left", background: s.best ? "rgba(200,75,12,.035)" : C.card1, border: `1px solid ${s.best ? "rgba(200,75,12,.32)" : C.border}`, borderRadius: px(14), padding: "14px 13px", position: "relative", transition: "transform .15s", cursor: "pointer" }}>
            {s.best && <div style={{ position: "absolute", top: 0, right: px(12), background: C.clay, color: "#fff", fontFamily: F.mono, fontSize: px(7), padding: "3px 7px", borderRadius: "0 0 5px 5px" }}>BEST MATCH</div>}
            <div style={{ display: "flex", alignItems: "flex-start", gap: px(10), marginBottom: px(8) }}>
              <div style={{ width: px(30), height: px(30), borderRadius: px(8), background: "rgba(200,75,12,.11)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{I.doc(C.clay, 15)}</div>
              <div>
                <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: px(13), color: C.textPrimary }}>{s.title}</div>
                <div style={{ fontFamily: F.sans, fontSize: px(10), color: C.textMuted }}>{s.sub}</div>
              </div>
            </div>
            <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted, marginBottom: px(10), lineHeight: 1.4 }}>{s.desc}</div>
            <div style={{ display: "flex", gap: px(6), flexWrap: "wrap" }}>
              {s.chips.map(([l, c], j) => <span key={j} style={chip(c)}>{l}</span>)}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ── S08 SCHEME DETAIL ──────────────────────────────────────────────────────
function S08({ go, back }) {
  const stats = [["LOAN AMOUNT", "₹10L", C.clay], ["INTEREST RATE", "8.5%", C.teal], ["PROCESSING", "5–7 Days", C.teal], ["COLLATERAL", "None", C.teal]];
  return (
    <div className="sc" style={{ height: "100%", background: C.bg, display: "flex", flexDirection: "column" }}>
      <SB />
      <div style={{ padding: "0 16px 10px", display: "flex", alignItems: "center", gap: px(10), borderBottom: `1px solid ${C.border}` }}>
        <button onClick={back} style={{ width: px(26), height: px(26), borderRadius: "50%", background: C.card1, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>{I.back(C.textMuted, 13)}</button>
        <span style={{ fontFamily: F.sans, fontWeight: 600, fontSize: px(14), color: C.textPrimary }}>MUDRA Tarun Loan</span>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "12px 13px" }}>
        <div style={{ borderRadius: px(12), height: px(118), background: "linear-gradient(135deg,#1a0a05,#1C1206)", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(200,75,12,.18)", marginBottom: px(14) }}>
          <div style={{ width: px(44), height: px(44), borderRadius: "50%", background: "rgba(255,255,255,.9)", display: "flex", alignItems: "center", justifyContent: "center" }}>{I.play("#111510", 18)}</div>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent,rgba(0,0,0,.7))", padding: "16px 12px 10px", display: "flex", alignItems: "center", gap: px(6) }}>
            <div style={{ width: px(6), height: px(6), borderRadius: "50%", background: C.clay }} />
            <span style={{ fontFamily: F.sans, fontSize: px(9), color: "#fff" }}>How MUDRA Tarun Loan Works — Loan Doctor</span>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: px(8), marginBottom: px(14) }}>
          {stats.map(([l, v, c], i) => (
            <div key={i} style={{ background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(10), padding: "12px 13px" }}>
              <div style={{ fontFamily: F.mono, fontSize: px(8), color: C.textMuted, marginBottom: px(4) }}>{l}</div>
              <div style={{ fontFamily: F.serif, fontWeight: 700, fontSize: px(18), color: c }}>{v}</div>
            </div>
          ))}
        </div>
        <div style={{ background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(12), padding: "13px 14px", marginBottom: px(16) }}>
          <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: px(12), color: C.textPrimary, marginBottom: px(6) }}>About This Scheme</div>
          <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted, lineHeight: 1.55 }}>MUDRA Tarun provides loans between ₹5L–₹10L for growing micro-enterprises. No collateral required. Quick approval with flexible repayment tenure up to 5 years.</div>
        </div>
        <button onClick={() => go(9)} style={{ width: "100%", height: px(46), borderRadius: px(12), background: "transparent", border: `1.5px solid ${C.teal}`, color: C.teal, fontFamily: F.sans, fontWeight: 600, fontSize: px(14), cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: px(6), marginBottom: px(10) }}>
          {I.check(C.teal, 16)} Confirm Plan
        </button>
        <button onClick={back} style={{ width: "100%", height: px(40), borderRadius: px(12), background: "transparent", border: "none", color: C.textMuted, fontFamily: F.sans, fontSize: px(13), cursor: "pointer" }}>Not Interested</button>
      </div>
    </div>
  );
}

// ── S09 PAYMENT ────────────────────────────────────────────────────────────
function S09({ go, back }) {
  const [plan, setPlan] = useState(0);
  const [method, setMethod] = useState(0);
  const [loading, setLoading] = useState(false);
  const methods = [["📱", "GPay / UPI"], ["💳", "Card"], ["🏦", "Net Banking"]];
  const handlePay = () => { setLoading(true); setTimeout(() => go(10), 1800); };

  const amount = plan === 0 ? "999" : "10,000";

  return (
    <div className="sc" style={{ height: "100%", background: C.bg, display: "flex", flexDirection: "column" }}>
      <SB />
      <div style={{ padding: "0 16px 10px", display: "flex", alignItems: "center", gap: px(10), borderBottom: `1px solid ${C.border}` }}>
        <button onClick={back} style={{ width: px(26), height: px(26), borderRadius: "50%", background: C.card1, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>{I.back(C.textMuted, 13)}</button>
        <div>
          <div style={{ fontFamily: F.serif, fontWeight: 700, fontSize: px(16), color: C.textPrimary }}>Confirm Plan</div>
          <div style={{ fontFamily: F.sans, fontSize: px(10), color: C.textMuted }}>Secure your consultation slot</div>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>

        <button onClick={() => setPlan(0)} style={{ width: "100%", textAlign: "left", background: C.card1, border: `1.5px solid ${plan === 0 ? C.clay : C.border}`, borderRadius: px(15), padding: "16px", marginBottom: px(12), position: "relative", cursor: "pointer", transition: "all .2s" }}>
          {plan === 0 && <div style={{ position: "absolute", top: px(16), right: px(16), width: px(20), height: px(20), borderRadius: "50%", background: C.clay, display: "flex", alignItems: "center", justifyContent: "center", animation: "popIn .2s" }}>{I.check("#fff", 12)}</div>}
          <div style={{ fontFamily: F.mono, fontSize: px(9), color: C.textMuted, marginBottom: px(8) }}>TOKEN AMOUNT</div>
          <div style={{ fontFamily: F.serif, fontWeight: 900, fontSize: px(32), color: C.textPrimary, display: "flex", alignItems: "flex-start", marginBottom: px(8) }}>
            <sup style={{ fontSize: px(16), marginTop: px(8), color: C.textMuted }}>₹</sup>999
          </div>
          <div style={{ display: "flex", alignItems: "flex-start", gap: px(8) }}>
            <div style={{ width: px(16), height: px(16), borderRadius: "50%", background: "rgba(76,201,160,.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: px(1) }}>{I.check(C.teal, 9)}</div>
            <div>
              <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: px(11), color: C.textPrimary }}>Dedicated agent assigned</div>
              <div style={{ fontFamily: F.sans, fontSize: px(10), color: C.textMuted }}>Pay the rest after approval</div>
            </div>
          </div>
        </button>

        <button onClick={() => setPlan(1)} style={{ width: "100%", textAlign: "left", background: C.card1, border: `1.5px solid ${plan === 1 ? C.clay : C.border}`, borderRadius: px(15), padding: "16px", marginBottom: px(16), position: "relative", cursor: "pointer", transition: "all .2s" }}>
          {plan === 1 && <div style={{ position: "absolute", top: px(16), right: px(16), width: px(20), height: px(20), borderRadius: "50%", background: C.clay, display: "flex", alignItems: "center", justifyContent: "center", animation: "popIn .2s" }}>{I.check("#fff", 12)}</div>}
          <div style={{ fontFamily: F.mono, fontSize: px(9), color: C.textMuted, marginBottom: px(8) }}>FULL SCHEME AMOUNT</div>
          <div style={{ fontFamily: F.serif, fontWeight: 900, fontSize: px(32), color: C.textPrimary, display: "flex", alignItems: "flex-start", marginBottom: px(8) }}>
            <sup style={{ fontSize: px(16), marginTop: px(8), color: C.textMuted }}>₹</sup>10,000
          </div>
          <div style={{ display: "flex", alignItems: "flex-start", gap: px(8) }}>
            <div style={{ width: px(16), height: px(16), borderRadius: "50%", background: "rgba(76,201,160,.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: px(1) }}>{I.check(C.teal, 9)}</div>
            <div>
              <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: px(11), color: C.textPrimary }}>Full scheme processing</div>
              <div style={{ fontFamily: F.sans, fontSize: px(10), color: C.textMuted }}>End-to-end document & application support</div>
            </div>
          </div>
        </button>

        <div style={{ fontFamily: F.mono, fontSize: px(9), color: C.textMuted, marginBottom: px(10), letterSpacing: "1px" }}>PAYMENT METHOD</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: px(8), marginBottom: px(18) }}>
          {methods.map(([em, l], i) => (
            <button key={i} onClick={() => setMethod(i)} style={{ background: C.card1, border: `1.5px solid ${method === i ? C.clay : C.border}`, borderRadius: px(10), padding: "10px 8px", display: "flex", flexDirection: "column", alignItems: "center", gap: px(4), transition: "all .15s" }}>
              <span style={{ fontSize: px(20) }}>{em}</span>
              <span style={{ fontFamily: F.sans, fontSize: px(10), color: method === i ? C.clay : C.textMuted, fontWeight: method === i ? 600 : 400 }}>{l}</span>
            </button>
          ))}
        </div>
        <button onClick={handlePay} style={cta(C.clay)}>
          {loading ? <div style={{ width: px(18), height: px(18), border: "2px solid rgba(255,255,255,.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin .7s linear infinite" }} /> : <>{I.lock()} Pay ₹{amount} Securely</>}
        </button>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: px(5), marginTop: px(10) }}>
          {I.lock(C.textMuted, 12)}<span style={{ fontFamily: F.mono, fontSize: px(9), color: C.textMuted }}>256-bit SSL · Razorpay</span>
        </div>
      </div>
    </div>
  );
}

// ── S10 SUCCESS ────────────────────────────────────────────────────────────
function S10({ go }) {
  const [drawn, setDrawn] = useState(false);
  useEffect(() => { const t = setTimeout(() => setDrawn(true), 400); return () => clearTimeout(t); }, []);
  return (
    <div className="sc" style={{ height: "100%", background: "#0B100D", display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
      <div style={{ position: "absolute", top: "38%", left: "50%", transform: "translate(-50%,-50%)", width: px(280), height: px(280), background: "radial-gradient(circle 120px at center,rgba(76,201,160,.1),transparent)", borderRadius: "50%", pointerEvents: "none" }} />
      <SB />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 24px", width: "100%" }}>
        <div style={{ position: "relative", width: px(96), height: px(96), marginBottom: px(18) }}>
          <div style={{ position: "absolute", inset: "-10px", border: "1px solid rgba(76,201,160,.15)", borderRadius: "50%", animation: "ringA 2s ease infinite" }} />
          <svg width={96} height={96} viewBox="0 0 96 96">
            <circle cx="48" cy="48" r="44" fill="rgba(76,201,160,.12)" stroke={C.teal} strokeWidth="1.5" />
            {drawn && <polyline points="28,48 43,63 68,35" fill="none" stroke={C.teal} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="60" strokeDashoffset="0" style={{ animation: "strokeIn .5s ease .3s both" }} />}
          </svg>
        </div>
        <div style={{ fontFamily: F.serif, fontWeight: 700, fontSize: px(21), color: C.textPrimary, marginBottom: px(6), textAlign: "center" }}>Payment Confirmed</div>
        <div style={{ fontFamily: F.sans, fontSize: px(12), color: C.textMuted, textAlign: "center", marginBottom: px(26) }}>Your consultation is booked. An agent will contact you shortly.</div>
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: px(10) }}>
          {[
            [I.wa(C.teal, 20), "rgba(76,201,160,.09)", "Invoice on WhatsApp", "Sent to +91 98765 43210"],
            [I.person(C.clay, 20), "rgba(200,75,12,.09)", "Agent Assigned", "Ramesh K. will call within 2 hours"],
          ].map(([ic, bg, t, s], i) => (
            <div key={i} style={{ background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(12), padding: "13px 14px", display: "flex", alignItems: "center", gap: px(12) }}>
              <div style={{ width: px(38), height: px(38), borderRadius: px(10), background: bg, display: "flex", alignItems: "center", justifyContent: "center" }}>{ic}</div>
              <div>
                <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: px(13), color: C.textPrimary }}>{t}</div>
                <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted }}>{s}</div>
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => go(11)} style={cta(C.clay, { marginTop: px(22) })}>Open Loan Doctor App {I.arrow()}</button>
      </div>
    </div>
  );
}

// ── S11 HOME ───────────────────────────────────────────────────────────────
function S11({ onNav }) {
  const [pw, setPw] = useState(0);
  useEffect(() => { const t = setTimeout(() => setPw(35), 200); return () => clearTimeout(t); }, []);
  const steps = ["Applied", "Docs", "Review", "Approved"];
  const schemes = [["MUDRA Tarun", "8.5%", "₹10L"], ["CGTMSE", "9.2%", "₹5L"], ["Kisan Credit", "4%", "₹3L"]];
  return (
    <div style={{ height: "100%", background: C.bg, display: "flex", flexDirection: "column" }}>
      <SB />
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: px(72) }}>
        <div style={{ padding: "2px 16px 14px", display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontFamily: F.sans, fontSize: px(10), color: C.textMuted }}>Good morning ☀️</div>
            <div style={{ fontFamily: F.serif, fontWeight: 700, fontSize: px(20), color: C.textPrimary }}>Rahul Kumar</div>
          </div>
          <div style={{ position: "relative", width: px(32), height: px(32), borderRadius: px(9), background: C.card1, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            {I.bell()}
            <div style={{ position: "absolute", top: px(5), right: px(5), width: px(7), height: px(7), borderRadius: "50%", background: C.clay, animation: "notifP 2s ease infinite" }} />
          </div>
        </div>
        {/* Active loan */}
        <div style={{ margin: "0 13px 12px", background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(15), padding: "16px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, right: 0, width: px(100), height: px(70), background: "radial-gradient(circle 80px at right top,rgba(200,75,12,.07),transparent)" }} />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: px(8) }}>
            <span style={{ fontFamily: F.mono, fontSize: px(9), color: C.textMuted }}>ACTIVE APPLICATION</span>
            <span style={{ background: "rgba(245,166,35,.09)", border: "1px solid rgba(245,166,35,.18)", color: C.amber, fontFamily: F.mono, fontSize: px(8), borderRadius: px(4), padding: "3px 7px" }}>IN REVIEW</span>
          </div>
          <div style={{ fontFamily: F.serif, fontWeight: 700, fontSize: px(15), color: C.textPrimary, marginBottom: px(10) }}>MUDRA Tarun Loan</div>
          <div style={{ height: px(3), background: C.card2, borderRadius: px(2), overflow: "hidden", marginBottom: px(6) }}>
            <div style={{ height: "100%", width: `${pw}%`, background: "linear-gradient(90deg,#C84B0C,#F5A623)", transition: "width .8s ease" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontFamily: F.sans, fontSize: px(9), color: C.textMuted }}>Applied</span>
            <span style={{ fontFamily: F.sans, fontSize: px(9), color: C.textMuted }}>{pw}% Complete</span>
          </div>
        </div>
        {/* Progress timeline */}
        <div style={{ margin: "0 13px 14px", background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(12), padding: "14px 16px" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            {steps.map((s, i) => {
              const done = i < 2, curr = i === 2;
              return (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
                  {i < steps.length - 1 && <div style={{ position: "absolute", top: px(9), left: "50%", right: "-50%", height: px(1.5), background: done ? C.clay : curr ? "linear-gradient(90deg,#C84B0C,transparent)" : "rgba(237,240,232,.15)", zIndex: 0 }} />}
                  <div style={{ width: px(18), height: px(18), borderRadius: "50%", background: done ? C.clay : "transparent", border: `2px solid ${done || curr ? C.clay : "rgba(237,240,232,.15)"}`, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1, marginBottom: px(5) }}>
                    {done ? I.check("#fff", 9) : curr ? <div style={{ width: px(6), height: px(6), borderRadius: "50%", background: C.clay, animation: "dotP 1.2s ease infinite" }} /> : null}
                  </div>
                  <span style={{ fontFamily: F.mono, fontSize: px(7.5), color: done || curr ? C.clay : C.textMuted, textAlign: "center" }}>{s}</span>
                </div>
              );
            })}
          </div>
        </div>
        {/* Recent updates */}
        <div style={{ padding: "0 16px 8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: F.sans, fontWeight: 600, fontSize: px(12), color: C.textPrimary }}>Recent Updates</span>
          <span style={{ fontFamily: F.sans, fontSize: px(10), color: C.clay, cursor: "pointer" }}>View all</span>
        </div>
        {[
          [C.clay, "Ramesh K. called", "Confirmed document list sent", "2h ago", false],
          [C.amber, "Bank Statement needed", "Upload in Documentation tab", "4h ago", true],
        ].map(([ic, t, s, time, act], i) => (
          <div key={i} style={{ margin: `0 13px ${px(8)}`, background: C.card1, border: `1px solid ${act ? "rgba(200,75,12,.2)" : C.border}`, borderRadius: px(11), padding: "11px 13px", display: "flex", alignItems: "center", gap: px(10) }}>
            <div style={{ width: px(32), height: px(32), borderRadius: "50%", background: `rgba(${ic === C.clay ? "200,75,12" : "245,166,35"},.09)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              {i === 0 ? I.person(ic, 16) : I.doc(ic, 15)}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: px(12), color: C.textPrimary }}>{t}</div>
              <div style={{ fontFamily: F.sans, fontSize: px(10), color: C.textMuted }}>{s}</div>
            </div>
            <span style={{ fontFamily: F.mono, fontSize: px(9), color: C.textMuted }}>{time}</span>
          </div>
        ))}
        <div style={{ padding: "10px 16px 6px" }}><span style={{ fontFamily: F.sans, fontWeight: 600, fontSize: px(12), color: C.textPrimary }}>Explore Schemes</span></div>
        <div style={{ display: "flex", overflowX: "auto", gap: px(8), padding: "4px 16px 16px" }}>
          {schemes.map(([n, r, a], i) => (
            <button key={i} onClick={() => onNav(12)} style={{ minWidth: px(98), background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(12), padding: "11px 10px", cursor: "pointer", flexShrink: 0, textAlign: "left" }}>
              <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: px(11), color: C.textPrimary, marginBottom: px(3) }}>{n}</div>
              <div style={{ fontFamily: F.mono, fontSize: px(10), color: C.teal }}>{r} p.a.</div>
              <div style={{ fontFamily: F.mono, fontSize: px(10), color: C.clay }}>{a}</div>
            </button>
          ))}
        </div>
      </div>
      {/* FAB */}
      <div style={{ position: "absolute", bottom: px(74), right: px(13), zIndex: 50 }}>
        <div style={{ position: "absolute", inset: "-7px", borderRadius: "50%", background: "rgba(200,75,12,.09)", animation: "fab 2s ease infinite" }} />
        <button onClick={() => onNav(6)} style={{ width: px(48), height: px(48), borderRadius: "50%", background: C.clay, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 5px 22px rgba(200,75,12,.48),0 0 0 5px rgba(200,75,12,.09)", position: "relative", zIndex: 1 }}>
          {I.mic("#fff", 20)}
        </button>
        <div style={{ position: "absolute", right: px(57), top: "50%", transform: "translateY(-50%)", background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(8), padding: "5px 9px", whiteSpace: "nowrap" }}>
          <span style={{ fontFamily: F.sans, fontSize: px(10), color: C.textPrimary }}>Consult AI anytime</span>
        </div>
      </div>
    </div>
  );
}

// ── S12 SCHEMES ────────────────────────────────────────────────────────────
function S12() {
  const [tab, setTab] = useState("central");
  const [sheet, setSheet] = useState(false);
  const central = [
    ["MUDRA Shishu", "Ministry of Finance", "Up to ₹50K", "Low interest", "Micro-enterprise", false],
    ["MUDRA Kishore", "Ministry of Finance", "Up to ₹5L", "8.2% p.a.", "Growing business", false],
    ["MUDRA Tarun", "Ministry of Finance", "Up to ₹10L", "8.5% p.a.", "Active", true],
    ["CGTMSE", "Ministry of MSME", "Up to ₹5L", "9.2% p.a.", "No collateral", false],
    ["PM SVANidhi", "Ministry of Housing", "Up to ₹5L", "7% p.a.", "Small traders", false],
  ];
  const state = [
    ["TNSCB Loan", "TN Slum Clearance Board", "Up to ₹3L", "6.5% p.a.", "Urban housing", false],
    ["NABARD Rural", "National Bank for Agriculture", "Up to ₹2L", "4% p.a.", "Rural development", false],
    ["MSME Tamil Nadu", "TN Industries Dept", "Up to ₹10L", "8% p.a.", "MSME support", false],
    ["Kalaignar Startup", "TN Startup Mission", "Up to ₹5L", "0% p.a.", "Tech startups", false],
  ];
  const schemes = tab === "central" ? central : state;
  return (
    <div style={{ height: "100%", background: C.bg, display: "flex", flexDirection: "column", position: "relative" }}>
      <SB />
      <div style={{ padding: "0 16px 12px", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ fontFamily: F.serif, fontWeight: 700, fontSize: px(22), color: C.textPrimary, marginBottom: px(10) }}>Schemes</div>
        <div style={{ height: px(40), background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(12), display: "flex", alignItems: "center", padding: "0 12px", gap: px(8), marginBottom: px(10) }}>
          {I.search()}<span style={{ fontFamily: F.sans, fontSize: px(12), color: C.textMuted }}>Search schemes…</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: px(8) }}>
          <button onClick={() => setSheet(true)} style={{ display: "flex", alignItems: "center", gap: px(5), background: "rgba(200,75,12,.065)", border: "1px solid rgba(200,75,12,.18)", borderRadius: px(20), padding: "5px 10px", cursor: "pointer" }}>
            {I.pin()}<span style={{ fontFamily: F.sans, fontWeight: 500, fontSize: px(11), color: C.clay }}>Tamil Nadu, Chennai</span>{I.chevron(C.clay, 11)}
          </button>
          <button style={{ display: "flex", alignItems: "center", gap: px(5), background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(8), padding: "5px 10px", cursor: "pointer" }}>
            {I.filter()}<span style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted }}>Filter</span>
          </button>
        </div>
      </div>
      <div style={{ padding: "10px 16px 8px" }}>
        <div style={{ background: C.card1, borderRadius: px(10), padding: "3px", display: "flex" }}>
          {["central", "state"].map((t, i) => {
            const a = tab === t; return (
              <button key={t} onClick={() => setTab(t)} style={{ flex: 1, height: px(34), borderRadius: px(8), background: a ? C.clay : "transparent", border: "none", cursor: "pointer", fontFamily: F.sans, fontWeight: a ? 600 : 400, fontSize: px(12), color: a ? "#fff" : C.textMuted, transition: "all .2s" }}>
                {i === 0 ? "Central" : "State"}
              </button>
            );
          })}
        </div>
        <div style={{ fontFamily: F.sans, fontSize: px(10), color: C.textMuted, marginTop: px(6) }}>
          {tab === "central" ? "Applicable across all of India" : "State Schemes — Tamil Nadu"}
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "4px 16px 80px", display: "flex", flexDirection: "column", gap: px(10) }}>
        {schemes.map(([n, m, ...rest], i) => {
          const [c1, c2, c3, active] = rest; return (
            <div key={i} style={{ background: C.card1, border: `1px solid ${active ? "rgba(200,75,12,.3)" : C.border}`, borderRadius: px(13), padding: "13px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: px(10), marginBottom: px(7) }}>
                <div style={{ width: px(30), height: px(30), borderRadius: px(8), background: "rgba(200,75,12,.09)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{I.doc(C.clay, 15)}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: px(13), color: C.textPrimary }}>{n}</div>
                  <div style={{ fontFamily: F.sans, fontSize: px(10), color: C.textMuted }}>{m}</div>
                </div>
                <span style={chip(C.teal)}>Eligible</span>
              </div>
              <div style={{ display: "flex", gap: px(6), flexWrap: "wrap" }}>
                {[c1, c2, c3].map((cc, j) => <span key={j} style={chip(j === 0 ? C.clay : j === 1 ? C.teal : C.textMuted)}>{cc}</span>)}
              </div>
            </div>
          );
        })}
      </div>
      {sheet && (
        <div style={{ position: "absolute", inset: 0, zIndex: 200 }} onClick={() => setSheet(false)}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.5)" }} />
          <div onClick={e => e.stopPropagation()} style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: C.card1, borderRadius: "24px 24px 0 0", padding: "14px 20px 32px", animation: "fadeUp .3s cubic-bezier(.16,1,.3,1)" }}>
            <div style={{ width: px(36), height: px(4), borderRadius: px(2), background: C.border, margin: "0 auto 16px" }} />
            <div style={{ fontFamily: F.serif, fontWeight: 700, fontSize: px(18), color: C.textPrimary, marginBottom: px(16) }}>Select Location</div>
            {["State", "City"].map((l, i) => (
              <div key={i} style={{ marginBottom: px(12) }}>
                <div style={{ fontFamily: F.mono, fontSize: px(9), color: C.textMuted, marginBottom: px(6) }}>{l.toUpperCase()}</div>
                <div style={{ height: px(44), background: C.card2, border: `1px solid ${C.border}`, borderRadius: px(10), display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 13px" }}>
                  <span style={{ fontFamily: F.sans, fontSize: px(13), color: C.textPrimary }}>{i === 0 ? "Tamil Nadu" : "Chennai"}</span>
                  {I.chevron()}
                </div>
              </div>
            ))}
            <button style={{ width: "100%", height: px(42), borderRadius: px(10), background: "transparent", border: `1.5px solid ${C.teal}`, color: C.teal, fontFamily: F.sans, fontWeight: 600, fontSize: px(13), cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: px(6), marginBottom: px(10) }}>
              {I.gps()} Use Current Location
            </button>
            <button onClick={() => setSheet(false)} style={cta(C.clay)}>Confirm Location</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── S13 DOCS ───────────────────────────────────────────────────────────────
function S13() {
  const [up, setUp] = useState({ 0: true, 1: true, 2: false, 3: false, 4: false });
  const [sheet, setSheet] = useState(null);
  const [pw, setPw] = useState(0);
  useEffect(() => { const t = setTimeout(() => setPw(40), 200); return () => clearTimeout(t); }, []);
  const docs = [
    { n: "Aadhaar Card", file: "aadhaar.pdf · 482 KB", req: true },
    { n: "PAN Card", file: "pan.jpg · 218 KB", req: true },
    { n: "Bank Statement", sub: "Last 6 months", note: "All 6 months must be from same bank account", req: true },
    { n: "Business Proof", sub: "GST / Udyam / Registration", req: true },
    { n: "ITR / Form 16", sub: "Optional", req: false },
  ];
  const done = [0, 1, 2, 3].every(i => up[i]);
  return (
    <div style={{ height: "100%", background: C.bg, display: "flex", flexDirection: "column", position: "relative" }}>
      <SB />
      <div style={{ padding: "0 13px 12px", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontFamily: F.serif, fontWeight: 700, fontSize: px(20), color: C.textPrimary }}>Documentation</div>
            <span style={{ fontFamily: F.mono, fontSize: px(9), color: C.clay }}>MUDRA TARUN</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: px(8) }}>
            <div style={{ width: px(80), height: px(3), background: C.card2, borderRadius: px(2), overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${pw}%`, background: `linear-gradient(90deg,${C.clay},${C.amber})`, transition: "width .8s ease" }} />
            </div>
            <span style={{ fontFamily: F.mono, fontSize: px(9), color: C.textMuted }}>2/5</span>
          </div>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "12px 13px 80px" }}>
        <div style={{ fontFamily: F.mono, fontSize: px(9), color: C.textMuted, letterSpacing: "1.5px", marginBottom: px(10) }}>REQUIRED DOCUMENTS</div>
        <div style={{ display: "flex", flexDirection: "column", gap: px(9) }}>
          {docs.map((d, i) => {
            const isUp = up[i];
            if (!d.req) return (
              <div key={i}>
                <div style={{ fontFamily: F.mono, fontSize: px(9), color: C.textMuted, letterSpacing: "1.5px", margin: "6px 0 8px" }}>OPTIONAL — Speeds Up Approval</div>
                <div style={{ background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(12), padding: "11px 13px", display: "flex", alignItems: "center", gap: px(10) }}>
                  <div style={{ width: px(30), height: px(30), borderRadius: px(8), background: C.card2, display: "flex", alignItems: "center", justifyContent: "center" }}>{I.doc(C.textMuted, 14)}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: px(12), color: C.textPrimary }}>{d.n}</div>
                    <div style={{ fontFamily: F.sans, fontSize: px(10), color: C.textMuted }}>{d.sub}</div>
                  </div>
                  <button onClick={() => setSheet(i)} style={{ background: "transparent", border: `1px solid ${C.border}`, borderRadius: px(6), padding: "4px 10px", color: C.textMuted, fontFamily: F.sans, fontWeight: 600, fontSize: px(9), cursor: "pointer" }}>Add</button>
                </div>
              </div>
            );
            return (
              <div key={i} style={{ background: C.card1, border: `1.5px solid ${isUp ? "rgba(76,201,160,.22)" : "rgba(200,75,12,.18)"}`, borderRadius: px(12), padding: "11px 13px", transition: "border-color .3s" }}>
                <div style={{ display: "flex", alignItems: "center", gap: px(10) }}>
                  <div style={{ width: px(30), height: px(30), borderRadius: px(8), background: isUp ? "rgba(76,201,160,.09)" : "rgba(200,75,12,.07)", display: "flex", alignItems: "center", justifyContent: "center", transition: "background .3s" }}>{I.doc(isUp ? C.teal : C.clay, 14)}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: px(12), color: C.textPrimary }}>{d.n}</div>
                    {d.file && <div style={{ fontFamily: F.mono, fontSize: px(9), color: C.textMuted }}>{d.file}</div>}
                    {d.sub && <div style={{ fontFamily: F.sans, fontSize: px(10), color: C.textMuted }}>{d.sub}</div>}
                  </div>
                  {isUp ? <span style={{ fontFamily: F.mono, fontSize: px(8), color: C.teal }}>✓ DONE</span>
                    : <button onClick={() => setSheet(i)} style={{ background: "transparent", border: `1px solid ${C.clay}`, borderRadius: px(6), padding: "4px 10px", color: C.clay, fontFamily: F.sans, fontWeight: 600, fontSize: px(9), cursor: "pointer" }}>Upload</button>}
                </div>
                {!isUp && d.note && <div style={{ display: "flex", alignItems: "flex-start", gap: px(5), marginTop: px(8), padding: "6px 8px", background: "rgba(200,75,12,.04)", borderRadius: px(6) }}>
                  {I.info()}<span style={{ fontFamily: F.sans, fontSize: px(10), color: C.textMuted }}>{d.note}</span>
                </div>}
              </div>
            );
          })}
        </div>
        <div style={{ background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(10), padding: "10px 12px", marginTop: px(14), display: "flex", alignItems: "flex-start", gap: px(6) }}>
          {I.lock(C.textMuted, 13)}<span style={{ fontFamily: F.sans, fontSize: px(10), color: C.textMuted }}>All documents are end-to-end encrypted and shared only with lenders</span>
        </div>
        <button disabled={!done} style={cta(done ? C.clay : "rgba(237,240,232,.12)", { marginTop: px(14), opacity: done ? 1 : .5, transition: "all .3s", cursor: done ? "pointer" : "not-allowed" })}>
          {I.upload(done ? "#fff" : C.textMuted, 14)} Submit Documents
        </button>
      </div>
      {sheet !== null && (
        <div style={{ position: "absolute", inset: 0, zIndex: 200 }} onClick={() => setSheet(null)}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.5)" }} />
          <div onClick={e => e.stopPropagation()} style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: C.card1, borderRadius: "20px 20px 0 0", padding: "14px 20px 36px", animation: "fadeUp .25s cubic-bezier(.16,1,.3,1)" }}>
            <div style={{ width: px(36), height: px(4), borderRadius: px(2), background: C.border, margin: "0 auto 14px" }} />
            <div style={{ fontFamily: F.serif, fontWeight: 700, fontSize: px(16), color: C.textPrimary, marginBottom: px(14) }}>Upload Document</div>
            {[["📷", "Camera", "Take a photo"], ["📁", "Browse Files", "Select from storage"]].map(([em, l, s], j) => (
              <button key={j} onClick={() => { setUp(u => ({ ...u, [sheet]: true })); setSheet(null); }} style={{ width: "100%", background: C.card2, border: `1px solid ${C.border}`, borderRadius: px(12), padding: "13px", display: "flex", alignItems: "center", gap: px(12), cursor: "pointer", marginBottom: px(10) }}>
                <span style={{ fontSize: px(22) }}>{em}</span>
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: px(13), color: C.textPrimary }}>{l}</div>
                  <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted }}>{s}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── S14 CHAT ───────────────────────────────────────────────────────────────
function S14() {
  const msgs = [
    { t: "sys", text: "✓ Payment confirmed. Case registered as LD-2024-038. Welcome!", time: "10:00" },
    { t: "agent", text: "Please upload Bank Statement (6 months) and Business Proof in Documentation tab.", time: "10:05" },
    { t: "user", text: "Documents uploaded ✓", time: "10:12" },
    { t: "sys", text: "Received! Reviewing documents. Disbursal expected 5–7 working days.", time: "10:14" },
  ];
  return (
    <div style={{ height: "100%", background: C.bg, display: "flex", flexDirection: "column" }}>
      <SB />
      <div style={{ padding: "0 13px 10px", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: px(10) }}>
          <div style={{ position: "relative" }}>
            <div style={{ width: px(36), height: px(36), borderRadius: "50%", background: C.card2, border: "1px solid rgba(200,75,12,.22)", display: "flex", alignItems: "center", justifyContent: "center" }}>{I.person(C.clay, 18)}</div>
            <div style={{ position: "absolute", bottom: px(1), right: px(1), width: px(7), height: px(7), borderRadius: "50%", background: C.teal, border: `1.5px solid ${C.bg}` }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: px(13), color: C.textPrimary }}>Ramesh K.</div>
            <div style={{ fontFamily: F.sans, fontSize: px(10), color: C.textMuted }}>Loan Advisor · MUDRA Tarun</div>
          </div>
          <div style={{ display: "flex", gap: px(10) }}>{I.call()}{I.video()}</div>
        </div>
        <div style={{ background: "rgba(200,75,12,.055)", border: "1px solid rgba(200,75,12,.14)", borderRadius: px(7), padding: "5px 10px", marginTop: px(8), display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontFamily: F.sans, fontSize: px(10), color: C.textMuted }}>Case Reference</span>
          <span style={{ fontFamily: F.mono, fontSize: px(10), color: C.clay }}>LD-2024-038</span>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "12px 13px", display: "flex", flexDirection: "column", gap: px(10) }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ display: "flex", flexDirection: m.t === "user" ? "row-reverse" : "row", animation: `msgIn .2s ease ${i * .1}s both` }}>
            {m.t === "sys"
              ? <div style={{ width: "100%", background: "rgba(76,201,160,.07)", border: "1px solid rgba(76,201,160,.18)", borderRadius: px(10), padding: "10px 12px" }}>
                <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.teal }}>{m.text}</div>
                <div style={{ fontFamily: F.mono, fontSize: px(9), color: C.textMuted, marginTop: px(3) }}>{m.time}</div>
              </div>
              : <div style={{ maxWidth: "78%", background: m.t === "agent" ? C.card2 : "rgba(200,75,12,.10)", borderRadius: m.t === "agent" ? "3px 12px 12px 12px" : "12px 12px 3px 12px", padding: "9px 12px" }}>
                <div style={{ fontFamily: F.sans, fontSize: px(12), color: C.textPrimary, lineHeight: 1.45 }}>{m.text}</div>
                <div style={{ fontFamily: F.mono, fontSize: px(9), color: C.textMuted, marginTop: px(3) }}>{m.time}</div>
              </div>
            }
          </div>
        ))}
      </div>
      <div style={{ padding: "8px 13px 20px", display: "flex", gap: px(8), alignItems: "center" }}>
        <div style={{ flex: 1, height: px(40), background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(20), display: "flex", alignItems: "center", padding: "0 14px" }}>
          <span style={{ fontFamily: F.sans, fontSize: px(12), color: C.textMuted }}>Type a message…</span>
        </div>
        <button style={{ width: px(34), height: px(34), borderRadius: "50%", background: C.clay, display: "flex", alignItems: "center", justifyContent: "center" }}>{I.mic("#fff", 14)}</button>
      </div>
    </div>
  );
}

// ── S15 PROFILE ────────────────────────────────────────────────────────────
function S15() {
  const [notif, setNotif] = useState(true);
  const groups = [
    { l: "ACCOUNT", items: [["Language Preference", "हिंदी", null, true], ["Notifications", null, notif, false, () => setNotif(n => !n)], ["Linked Mobile", "+91 98765 43210", null, true]] },
    { l: "SUPPORT", items: [["Contact Agent", null, null, true], ["Help & FAQ", null, null, true], ["Report an Issue", null, null, true]] },
    { l: "LEGAL", items: [["Privacy Policy", null, null, true], ["Terms of Service", null, null, true]] },
  ];
  return (
    <div style={{ height: "100%", background: C.bg, display: "flex", flexDirection: "column" }}>
      <SB />
      <div style={{ flex: 1, overflowY: "auto", padding: "4px 16px 80px" }}>
        <div style={{ fontFamily: F.serif, fontWeight: 700, fontSize: px(22), color: C.textPrimary, marginBottom: px(14) }}>Profile</div>
        <div style={{ background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(16), padding: "18px", display: "flex", alignItems: "center", gap: px(12), marginBottom: px(14) }}>
          <div style={{ width: px(48), height: px(48), borderRadius: "50%", background: C.card2, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${C.border}` }}>
            <span style={{ fontFamily: F.serif, fontWeight: 700, fontSize: px(18), color: C.clay }}>RK</span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: F.serif, fontWeight: 700, fontSize: px(16), color: C.textPrimary }}>Rahul Kumar</div>
            <div style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted }}>+91 98765 43210</div>
          </div>
          <div style={{ border: `1px solid ${C.border}`, borderRadius: px(20), padding: "4px 12px", display: "flex", alignItems: "center", gap: px(4), cursor: "pointer" }}>
            {I.edit()}<span style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted }}>Edit</span>
          </div>
        </div>
        <div style={{ background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(12), padding: "12px 14px", marginBottom: px(18) }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: px(6) }}>
            <span style={{ fontFamily: F.sans, fontWeight: 600, fontSize: px(12), color: C.textPrimary }}>MUDRA Tarun Loan</span>
            <span style={{ background: "rgba(245,166,35,.09)", border: "1px solid rgba(245,166,35,.18)", color: C.amber, fontFamily: F.mono, fontSize: px(8), borderRadius: px(4), padding: "2px 6px" }}>IN REVIEW</span>
          </div>
          <div style={{ height: px(3), background: C.card2, borderRadius: px(2), overflow: "hidden" }}>
            <div style={{ height: "100%", width: "35%", background: `linear-gradient(90deg,${C.clay},${C.amber})` }} />
          </div>
        </div>
        {groups.map((g, gi) => (
          <div key={gi} style={{ marginBottom: px(16) }}>
            <div style={{ fontFamily: F.mono, fontSize: px(9), color: C.textMuted, letterSpacing: "1.5px", marginBottom: px(8) }}>{g.l}</div>
            <div style={{ background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(12), overflow: "hidden" }}>
              {g.items.map(([l, r, tog, chev, cb], ii) => (
                <div key={ii} onClick={cb} style={{ padding: "13px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: ii < g.items.length - 1 ? `1px solid ${C.border}` : "none", cursor: cb ? "pointer" : "default" }}>
                  <span style={{ fontFamily: F.sans, fontSize: px(13), color: C.textPrimary }}>{l}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: px(6) }}>
                    {r && <span style={{ fontFamily: F.sans, fontSize: px(11), color: C.textMuted }}>{r}</span>}
                    {tog !== null && tog !== undefined && <div style={{ width: px(38), height: px(22), borderRadius: px(11), background: tog ? C.clay : C.card2, border: `1px solid ${tog ? C.clay : C.border}`, position: "relative", cursor: "pointer", transition: "all .2s" }}>
                      <div style={{ position: "absolute", top: px(2), left: tog ? px(18) : px(2), width: px(18), height: px(18), borderRadius: "50%", background: "#fff", transition: "left .2s" }} />
                    </div>}
                    {chev && I.chevron(C.textMuted, 13)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <button style={{ width: "100%", height: px(44), borderRadius: px(12), background: "transparent", border: "1px solid rgba(237,240,232,.12)", color: "rgba(237,240,232,.5)", fontFamily: F.sans, fontWeight: 600, fontSize: px(13), cursor: "pointer" }}>Log Out</button>
      </div>
    </div>
  );
}

// ── APP ROOT ───────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState(1);
  const [hist, setHist] = useState([]);
  const go = (n) => { setHist(h => [...h, screen]); setScreen(n); };
  const back = () => { if (hist.length) { setScreen(hist[hist.length - 1]); setHist(h => h.slice(0, -1)); } };
  const nav = (id) => { if (id === 6) { go(6); return; } setScreen(id); setHist([]); };
  const main = [11, 12, 13, 14, 15];
  const renderScreen = () => {
    switch (screen) {
      case 1: return <S01 go={go} />;
      case 2: return <S02 go={go} />;
      case 3: return <S03 go={go} />;
      case 4: return <S04 go={go} />;
      case 5: return <S05 go={go} />;
      case 6: return <S06 go={go} back={back} />;
      case 7: return <S07 go={go} back={back} />;
      case 8: return <S08 go={go} back={back} />;
      case 9: return <S09 go={go} back={back} />;
      case 10: return <S10 go={(n) => { setScreen(n); setHist([]); }} />;
      case 11: return <S11 onNav={nav} />;
      case 12: return <S12 />;
      case 13: return <S13 />;
      case 14: return <S14 />;
      case 15: return <S15 />;
      default: return null;
    }
  };
  return (
    <>
      <style>{CSS}</style>
      <div style={{ background: "#0a0a0a", width: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: px(16), overflow: "hidden" }}>
        <div style={{ width: px(375), height: px(812), background: C.bg, borderRadius: px(46), overflow: "hidden", boxShadow: "0 24px 80px rgba(0,0,0,.7),0 0 0 1px rgba(255,255,255,.07)", position: "relative", flexShrink: 0 }}>
          {/* Dynamic island */}
          <div style={{ position: "absolute", top: px(12), left: "50%", transform: "translateX(-50%)", width: px(116), height: px(32), background: "#000", borderRadius: px(20), zIndex: 999, pointerEvents: "none" }} />
          <div key={screen} style={{ height: "100%", position: "relative", overflow: "hidden" }}>
            {renderScreen()}
            {main.includes(screen) && <BNav active={screen} onNav={nav} />}
          </div>
        </div>
      </div>
    </>
  );
}
