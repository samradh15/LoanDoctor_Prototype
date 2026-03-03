(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // test_render.mjs
  var import_react2 = __toESM(__require("react"), 1);
  var import_server = __require("react-dom/server");

  // app/src/App.jsx
  var import_react = __toESM(__require("react"), 1);
  var import_jsx_runtime = __require("react/jsx-runtime");
  var px = (n) => `${n}px`;
  var C = {
    bg: "#111510",
    card1: "#1C2118",
    card2: "#242B20",
    clay: "#C84B0C",
    teal: "#4CC9A0",
    amber: "#F5A623",
    textPrimary: "#EDF0E8",
    textMuted: "#7A8072",
    border: "rgba(237,240,232,0.07)"
  };
  var F = {
    serif: "'Fraunces', serif",
    sans: "'Plus Jakarta Sans', sans-serif",
    mono: "'Syne Mono', monospace"
  };
  var CSS = `
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
  var chip = (col, extra = {}) => {
    const rgb = col === C.clay ? "200,75,12" : col === C.teal ? "76,201,160" : col === C.amber ? "245,166,35" : "237,240,232";
    return { background: `rgba(${rgb},.09)`, border: `1px solid rgba(${rgb},.2)`, color: col, borderRadius: px(5), padding: "3px 8px", fontSize: px(10), fontFamily: F.mono, display: "inline-block", ...extra };
  };
  var cta = (bg = C.clay, extra = {}) => ({
    width: "100%",
    height: px(50),
    borderRadius: px(13),
    background: bg,
    color: "#fff",
    fontSize: px(14),
    fontWeight: 600,
    fontFamily: F.sans,
    boxShadow: bg === C.clay ? "0 4px 20px rgba(200,75,12,.35)" : "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: px(8),
    ...extra
  });
  var ghostCta = (extra = {}) => ({
    width: "100%",
    height: px(50),
    borderRadius: px(13),
    background: "transparent",
    color: C.textPrimary,
    border: `1px solid rgba(237,240,232,.15)`,
    fontSize: px(14),
    fontWeight: 600,
    fontFamily: F.sans,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: px(8),
    ...extra
  });
  var I = {
    cross: (c = C.clay, s = 20) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { width: s, height: s, viewBox: "0 0 24 24", fill: "none", stroke: c, strokeWidth: "1.5", strokeLinecap: "round", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 5v14M5 12h14" }) }),
    plus: (c = "#fff", s = 18) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { width: s, height: s, viewBox: "0 0 24 24", fill: "none", stroke: c, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: "12", y1: "5", x2: "12", y2: "19" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: "5", y1: "12", x2: "19", y2: "12" })
    ] }),
    mic: (c = "#fff", s = 20) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { width: s, height: s, viewBox: "0 0 24 24", fill: "none", stroke: c, strokeWidth: "1.5", strokeLinecap: "round", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "9", y: "2", width: "6", height: "11", rx: "3" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M5 10a7 7 0 0014 0M12 19v3M8 22h8" })
    ] }),
    home: (c, s = 18) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { width: s, height: s, viewBox: "0 0 24 24", fill: "none", stroke: c, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M9 21V12h6v9" })
    ] }),
    list: (c, s = 18) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { width: s, height: s, viewBox: "0 0 24 24", fill: "none", stroke: c, strokeWidth: "1.5", strokeLinecap: "round", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3 6h18M3 12h18M3 18h18" }) }),
    folder: (c, s = 18) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { width: s, height: s, viewBox: "0 0 24 24", fill: "none", stroke: c, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" }) }),
    chat: (c, s = 18) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { width: s, height: s, viewBox: "0 0 24 24", fill: "none", stroke: c, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" }) }),
    person: (c, s = 18) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { width: s, height: s, viewBox: "0 0 24 24", fill: "none", stroke: c, strokeWidth: "1.5", strokeLinecap: "round", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "12", cy: "8", r: "4" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M4 20c0-4 3.6-7 8-7s8 3 8 7" })
    ] }),
    bell: (c = C.textMuted, s = 18) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { width: s, height: s, viewBox: "0 0 24 24", fill: "none", stroke: c, strokeWidth: "1.5", strokeLinecap: "round", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" }) }),
    check: (c = C.teal, s = 13) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { width: s, height: s, viewBox: "0 0 24 24", fill: "none", stroke: c, strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "20 6 9 17 4 12" }) }),
    arrow: (c = "#fff", s = 15) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { width: s, height: s, viewBox: "0 0 24 24", fill: "none", stroke: c, strokeWidth: "2", strokeLinecap: "round", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M5 12h14M12 5l7 7-7 7" }) }),
    back: (c = C.textPrimary, s = 17) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { width: s, height: s, viewBox: "0 0 24 24", fill: "none", stroke: c, strokeWidth: "1.5", strokeLinecap: "round", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M19 12H5M12 5l-7 7 7 7" }) }),
    doc: (c = C.teal, s = 16) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { width: s, height: s, viewBox: "0 0 24 24", fill: "none", stroke: c, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "14 2 14 8 20 8" })
    ] }),
    lock: (c = "#fff", s = 14) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { width: s, height: s, viewBox: "0 0 24 24", fill: "none", stroke: c, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "3", y: "11", width: "18", height: "11", rx: "2" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M7 11V7a5 5 0 0110 0v4" })
    ] }),
    pin: (c = C.clay, s = 13) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { width: s, height: s, viewBox: "0 0 24 24", fill: "none", stroke: c, strokeWidth: "1.5", strokeLinecap: "round", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 2a7 7 0 017 7c0 5-7 13-7 13S5 14 5 9a7 7 0 017-7z" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "12", cy: "9", r: "2.5" })
    ] }),
    filter: (c = C.textMuted, s = 15) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { width: s, height: s, viewBox: "0 0 24 24", fill: "none", stroke: c, strokeWidth: "1.5", strokeLinecap: "round", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", { points: "22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" }) }),
    upload: (c = C.clay, s = 15) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { width: s, height: s, viewBox: "0 0 24 24", fill: "none", stroke: c, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "17 8 12 3 7 8" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: "12", y1: "3", x2: "12", y2: "15" })
    ] }),
    call: (c = C.teal, s = 16) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { width: s, height: s, viewBox: "0 0 24 24", fill: "none", stroke: c, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.13 1.16 2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" }) }),
    video: (c = C.textMuted, s = 16) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { width: s, height: s, viewBox: "0 0 24 24", fill: "none", stroke: c, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", { points: "23 7 16 12 23 17 23 7" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "1", y: "5", width: "15", height: "14", rx: "2" })
    ] }),
    warn: (c = C.amber, s = 15) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { width: s, height: s, viewBox: "0 0 24 24", fill: "none", stroke: c, strokeWidth: "1.5", strokeLinecap: "round", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: "12", y1: "9", x2: "12", y2: "13" })
    ] }),
    info: (c = C.textMuted, s = 13) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { width: s, height: s, viewBox: "0 0 24 24", fill: "none", stroke: c, strokeWidth: "1.5", strokeLinecap: "round", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "12", cy: "12", r: "10" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: "12", y1: "16", x2: "12", y2: "12" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: "12", y1: "8", x2: "12.01", y2: "8" })
    ] }),
    play: (c = "#fff", s = 16) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { width: s, height: s, viewBox: "0 0 24 24", fill: c, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", { points: "5 3 19 12 5 21" }) }),
    chevron: (c = C.textMuted, s = 13) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { width: s, height: s, viewBox: "0 0 24 24", fill: "none", stroke: c, strokeWidth: "2", strokeLinecap: "round", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "6 9 12 15 18 9" }) }),
    gps: (c = C.teal, s = 14) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { width: s, height: s, viewBox: "0 0 24 24", fill: "none", stroke: c, strokeWidth: "1.5", strokeLinecap: "round", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "12", cy: "12", r: "10" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "12", cy: "12", r: "3" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: "12", y1: "2", x2: "12", y2: "6" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: "12", y1: "18", x2: "12", y2: "22" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: "2", y1: "12", x2: "6", y2: "12" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: "18", y1: "12", x2: "22", y2: "12" })
    ] }),
    search: (c = C.textMuted, s = 15) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { width: s, height: s, viewBox: "0 0 24 24", fill: "none", stroke: c, strokeWidth: "1.5", strokeLinecap: "round", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "11", cy: "11", r: "8" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: "21", y1: "21", x2: "16.65", y2: "16.65" })
    ] }),
    edit: (c = C.textMuted, s = 13) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { width: s, height: s, viewBox: "0 0 24 24", fill: "none", stroke: c, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" })
    ] }),
    wa: (c = C.teal, s = 20) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { width: s, height: s, viewBox: "0 0 24 24", fill: "none", stroke: c, strokeWidth: "1.5", strokeLinecap: "round", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" }) }),
    star: (c = C.amber, s = 14) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { width: s, height: s, viewBox: "0 0 24 24", fill: c, stroke: c, strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", { points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" }) })
  };
  function SB() {
    const [t, setT] = (0, import_react.useState)((/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    (0, import_react.useEffect)(() => {
      const i = setInterval(() => setT((/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })), 15e3);
      return () => clearInterval(i);
    }, []);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { height: px(46), display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 22px 0 26px", flexShrink: 0 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontFamily: F.mono, fontSize: px(12), color: "rgba(237,240,232,.45)", fontWeight: 600 }, children: t }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: px(5) }, children: [
        [3, 5, 7, 9].map((h, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: px(3), height: px(h), background: "rgba(237,240,232,.4)", borderRadius: px(1.5) } }, i)),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "flex", gap: px(1.5), marginLeft: px(4) }, children: [1, 1, 1].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: px(4), height: px(6), background: "rgba(237,240,232,.4)", borderRadius: px(1) } }, i)) })
      ] })
    ] });
  }
  function BNav({ active, onNav, hasPurchase }) {
    const tabs = hasPurchase ? [{ id: "main_home", l: "Home", ic: I.home }, { id: "schemes", l: "Schemes", ic: I.list }, { id: "myapp", l: "My App", ic: I.folder }, { id: "chat", l: "Chat", ic: I.chat }, { id: "profile", l: "Profile", ic: I.person }] : [{ id: "main_home", l: "Home", ic: I.home }, { id: "schemes", l: "Schemes", ic: I.list }, { id: "chat", l: "Chat", ic: I.chat }, { id: "profile", l: "Profile", ic: I.person }];
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { position: "absolute", bottom: 0, left: 0, right: 0, height: px(62), background: "rgba(17,21,16,.96)", backdropFilter: "blur(18px)", borderTop: `1px solid ${C.border}`, display: "flex", alignItems: "center", zIndex: 100 }, children: tabs.map((t) => {
      const a = active === t.id;
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { onClick: () => onNav(t.id), style: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: px(3), background: "none", padding: "5px 0" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: px(34), height: px(26), borderRadius: px(9), background: a ? "rgba(200,75,12,.11)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "all .2s" }, children: t.ic(a ? C.clay : C.textMuted) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontFamily: F.mono, fontSize: px(8), color: a ? C.clay : C.textMuted }, children: t.l })
      ] }, t.id);
    }) });
  }
  function S01({ go }) {
    (0, import_react.useEffect)(() => {
      const t = setTimeout(() => go("s02"), 2500);
      return () => clearTimeout(t);
    }, []);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "sc", style: { height: "100%", background: C.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SB, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { position: "absolute", top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: px(12) }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { position: "relative" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { position: "absolute", inset: "-38px", background: "radial-gradient(circle 180px at center,rgba(200,75,12,.07),transparent)", borderRadius: "50%" } }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: px(72), height: px(72), borderRadius: px(20), background: "#1E2419", border: "1px solid rgba(200,75,12,.22)", display: "flex", alignItems: "center", justifyContent: "center" }, children: I.cross(C.clay, 32) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { textAlign: "center" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.serif, fontWeight: 700, fontSize: px(27), color: C.textPrimary, letterSpacing: "-0.4px" }, children: "Loan Doctor" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.mono, fontSize: px(10), color: "rgba(237,240,232,.32)", letterSpacing: "2.5px", marginTop: px(5) }, children: "YOUR LOAN. OUR PRESCRIPTION." })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { position: "absolute", bottom: px(56), display: "flex", gap: px(6), alignItems: "center" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: px(16), height: px(5), borderRadius: px(3), background: C.clay } }),
        [1, 2, 3].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: px(5), height: px(5), borderRadius: "50%", background: "rgba(237,240,232,.16)" } }, i))
      ] })
    ] });
  }
  function S02({ go }) {
    const vals = [
      { bg: "rgba(200,75,12,.11)", ic: C.clay, title: "AI Voice Matching", sub: "Just speak \u2014 AI finds your best scheme instantly" },
      { bg: "rgba(76,201,160,.09)", ic: C.teal, title: "200+ Verified Schemes", sub: "Government & private, all RBI verified" },
      { bg: "rgba(245,166,35,.09)", ic: C.amber, title: "6 Indian Languages", sub: "Hindi, Tamil, Telugu, Marathi, Punjabi & more" }
    ];
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "sc", style: { height: "100%", background: C.bg, display: "flex", flexDirection: "column", overflow: "hidden" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SB, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { height: px(195), background: C.card1, flexShrink: 0, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", backgroundImage: "linear-gradient(135deg,rgba(200,75,12,.055),transparent 55%)" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { position: "absolute", top: px(12), left: px(12), background: C.card2, border: `1px solid ${C.border}`, borderRadius: px(6), padding: "4px 8px" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontFamily: F.mono, fontSize: px(9), color: C.textMuted }, children: "TRUSTED BY 50,000+ USERS" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { position: "relative", width: px(140), height: px(140), display: "flex", alignItems: "center", justifyContent: "center" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { position: "absolute", inset: 0, border: "1.5px dashed rgba(200,75,12,.25)", borderRadius: "50%" } }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { position: "absolute", inset: px(20), border: "1.5px dashed rgba(76,201,160,.25)", borderRadius: "50%" } }),
          I.cross(C.clay, 30)
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { flex: 1, padding: "18px 16px 20px", overflow: "auto", display: "flex", flexDirection: "column" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.mono, fontSize: px(9), color: C.clay, letterSpacing: "2px", marginBottom: px(5) }, children: "WHY CHOOSE US" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { fontFamily: F.serif, fontWeight: 700, fontSize: px(19), color: C.textPrimary, marginBottom: px(16), lineHeight: 1.2 }, children: [
          "India's Smartest",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
          "Loan Advisory"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "flex", flexDirection: "column", gap: px(9) }, children: vals.map((v, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { background: "rgba(237,240,232,.025)", border: `1px solid ${C.border}`, borderRadius: px(10), padding: "10px 12px", display: "flex", alignItems: "flex-start", gap: px(10) }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: px(28), height: px(28), borderRadius: px(8), background: v.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }, children: I.cross(v.ic, 14) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.sans, fontWeight: 600, fontSize: px(12), color: C.textPrimary }, children: v.title }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.sans, fontSize: px(10), color: C.textMuted, marginTop: px(2) }, children: v.sub })
          ] })
        ] }, i)) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { flex: 1 } }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { onClick: () => go("s03"), style: cta(C.clay, { marginTop: px(18) }), children: [
          "Get Started ",
          I.arrow()
        ] })
      ] })
    ] });
  }
  function S03({ go }) {
    const [sel, setSel] = (0, import_react.useState)(0);
    const langs = [
      { flag: "\u{1F1EE}\u{1F1F3}", name: "\u0939\u093F\u0902\u0926\u0940", nat: "Hindi" },
      { flag: "\u{1F1EC}\u{1F1E7}", name: "English", nat: "English" },
      { flag: "\u{1F1EE}\u{1F1F3}", name: "Tamil", nat: "\u0BA4\u0BAE\u0BBF\u0BB4\u0BCD" },
      { flag: "\u{1F1EE}\u{1F1F3}", name: "Telugu", nat: "\u0C24\u0C46\u0C32\u0C41\u0C17\u0C41" },
      { flag: "\u{1F1EE}\u{1F1F3}", name: "Marathi", nat: "\u092E\u0930\u093E\u0920\u0940" },
      { flag: "\u{1F1EE}\u{1F1F3}", name: "Punjabi", nat: "\u0A2A\u0A70\u0A1C\u0A3E\u0A2C\u0A40" }
    ];
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "sc", style: { height: "100%", background: C.bg, display: "flex", flexDirection: "column" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SB, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { padding: "0 16px 24px", flex: 1, overflow: "auto", display: "flex", flexDirection: "column" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: px(8), marginBottom: px(6) }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { flex: 1, height: px(1), background: C.border } }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontFamily: F.mono, fontSize: px(9), color: C.textMuted }, children: "Step 1 of 2" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.serif, fontWeight: 700, fontSize: px(22), color: C.textPrimary, marginBottom: px(4) }, children: "Select Language" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.sans, fontSize: px(11), color: C.textMuted, marginBottom: px(18) }, children: "Choose your preferred consultation language" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: px(8) }, children: langs.map((l, i) => {
          const a = sel === i;
          return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { onClick: () => setSel(i), style: { background: a ? "rgba(200,75,12,.065)" : C.card1, border: `1.5px solid ${a ? C.clay : C.border}`, borderRadius: px(12), padding: "13px 11px", display: "flex", alignItems: "center", gap: px(8), position: "relative", textAlign: "left", transition: "all .18s" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: px(26), height: px(26), borderRadius: "50%", background: C.card2, display: "flex", alignItems: "center", justifyContent: "center", fontSize: px(14) }, children: l.flag }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.sans, fontWeight: 600, fontSize: px(13), color: C.textPrimary }, children: l.name }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.sans, fontSize: px(10), color: C.textMuted }, children: l.nat })
            ] }),
            a && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { position: "absolute", right: px(9), top: px(9), width: px(16), height: px(16), borderRadius: "50%", background: C.clay, display: "flex", alignItems: "center", justifyContent: "center", animation: "popIn .2s cubic-bezier(.16,1,.3,1)" }, children: I.check("#fff", 9) })
          ] }, i);
        }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { flex: 1 } }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { onClick: () => go("s04"), style: cta(C.clay, { marginTop: px(20) }), children: [
          "Continue in ",
          langs[sel].name,
          " ",
          I.arrow()
        ] })
      ] })
    ] });
  }
  function S04({ go }) {
    const [cnt, setCnt] = (0, import_react.useState)(28);
    (0, import_react.useEffect)(() => {
      const i = setInterval(() => setCnt((c) => c > 0 ? c - 1 : 0), 1e3);
      return () => clearInterval(i);
    }, []);
    const otp = ["9", "4", "2", ""];
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "sc", style: { height: "100%", background: C.bg, display: "flex", flexDirection: "column" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SB, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { padding: "8px 16px 10px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: px(8) }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: px(32), height: px(32), borderRadius: px(10), background: "#1E2419", border: "1px solid rgba(200,75,12,.22)", display: "flex", alignItems: "center", justifyContent: "center" }, children: I.cross(C.clay, 16) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontFamily: F.serif, fontWeight: 700, fontSize: px(16), color: C.textPrimary }, children: "Loan Doctor" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { padding: "22px 16px", flex: 1, display: "flex", flexDirection: "column" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.serif, fontWeight: 700, fontSize: px(21), color: C.textPrimary, marginBottom: px(4) }, children: "Welcome back" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.sans, fontSize: px(11), color: C.textMuted, marginBottom: px(22) }, children: "Enter OTP sent to your mobile number" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { marginBottom: px(18) }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.mono, fontSize: px(9), color: C.textMuted, marginBottom: px(6) }, children: "MOBILE NUMBER" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { height: px(48), background: C.card2, border: `1px solid ${C.border}`, borderRadius: px(10), display: "flex", alignItems: "center", padding: "0 14px", gap: px(8) }, children: [
            I.person(C.textMuted, 16),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontFamily: F.sans, fontSize: px(14), color: C.textPrimary }, children: "+91 98765 43210" })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { marginBottom: px(12) }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.mono, fontSize: px(9), color: C.textMuted, marginBottom: px(8) }, children: "ENTER OTP" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "flex", gap: px(10) }, children: otp.map((v, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { flex: 1, height: px(50), background: C.card2, borderRadius: px(10), border: `1.5px solid ${v ? C.teal : C.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F.mono, fontWeight: 700, fontSize: px(20), color: C.teal, boxShadow: v ? "0 0 12px rgba(76,201,160,.15)" : "none", transition: "all .2s" }, children: v }, i)) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { fontFamily: F.sans, fontSize: px(11), color: C.textMuted, marginBottom: px(26) }, children: [
          "OTP sent\u2026 Resend in ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { color: cnt > 0 ? C.textMuted : C.clay, cursor: cnt === 0 ? "pointer" : "default" }, children: cnt > 0 ? `${cnt}s` : "Resend" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { flex: 1 } }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { onClick: () => go("s06"), style: cta(C.clay), children: [
          "Verify & Continue ",
          I.arrow()
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { textAlign: "center", marginTop: px(16), fontFamily: F.sans, fontSize: px(12), color: C.textMuted }, children: [
          "New user? ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { color: C.teal, cursor: "pointer" }, children: "Create account" })
        ] })
      ] })
    ] });
  }
  function HomeNew({ go }) {
    const achievements = [["\u20B947Cr+", "Disbursed"], ["50K+", "Users"], ["200+", "Schemes"], ["98%", "Success"]];
    const offers = [
      { title: "MUDRA Tarun", sub: "Up to \u20B910L \xB7 8.5% p.a.", badge: "\u{1F525} Ends in 2 days", bColor: C.clay, p: "badgeP" },
      { title: "PM SVANidhi", sub: "Up to \u20B95L \xB7 7.0% p.a.", badge: "\u26A1 Limited slots", bColor: C.teal, p: "badgeP" }
    ];
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "sc", style: { height: "100%", background: C.bg, display: "flex", flexDirection: "column" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SB, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { padding: "8px 16px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${C.border}` }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.sans, fontSize: px(10), color: C.textMuted }, children: "Welcome to" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.serif, fontWeight: 700, fontSize: px(20), color: C.textPrimary }, children: "Loan Doctor" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: px(34), height: px(34), borderRadius: px(10), background: C.card1, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center" }, children: I.cross(C.clay, 18) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { flex: 1, overflowY: "auto", paddingBottom: px(40) }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { margin: "16px", background: "linear-gradient(145deg, #1C2118, #181c14)", border: "1px solid rgba(200,75,12,.2)", borderRadius: px(16), padding: "20px 16px", position: "relative", overflow: "hidden" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { position: "absolute", top: 0, right: 0, width: px(150), height: px(150), background: "radial-gradient(circle at top right, rgba(200,75,12,.15), transparent 70%)", pointerEvents: "none" } }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: px(6), alignItems: "center", marginBottom: px(12) }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: px(6), height: px(6), borderRadius: "50%", background: C.teal, animation: "blink 1.2s infinite" } }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontFamily: F.mono, fontSize: px(10), color: C.teal, letterSpacing: "1px" }, children: "AI ADVISOR READY" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { fontFamily: F.serif, fontWeight: 700, fontSize: px(24), color: C.textPrimary, lineHeight: 1.2, marginBottom: px(8) }, children: [
            "Find Your Perfect",
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
            "Loan in 60 Seconds"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.sans, fontSize: px(12), color: C.textMuted, marginBottom: px(20), lineHeight: 1.4 }, children: "Just speak to our AI. We'll match you with the best government and private schemes instantly." }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { onClick: () => go("s06"), style: cta(C.clay, { marginBottom: px(10) }), children: [
            I.mic("#fff", 18),
            " Check Eligibility with AI"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => go("s09"), style: ghostCta(), children: "Talk to a Specialist instead" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "flex", padding: "0 16px", gap: px(8), marginBottom: px(24) }, children: achievements.map(([v, l], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { flex: 1, background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(10), padding: "10px 4px", display: "flex", flexDirection: "column", alignItems: "center" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.sans, fontWeight: 700, fontSize: px(13), color: C.textPrimary }, children: v }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.sans, fontSize: px(9), color: C.textMuted, marginTop: px(2) }, children: l })
        ] }, i)) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { padding: "0 16px", marginBottom: px(12), display: "flex", justifyContent: "space-between", alignItems: "center" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.sans, fontWeight: 700, fontSize: px(15), color: C.textPrimary }, children: "Live Offers" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "flex", overflowX: "auto", padding: "0 16px 24px", gap: px(12) }, children: offers.map((o, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { onClick: () => go("schemes_browse"), style: { width: px(200), flexShrink: 0, background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(14), padding: "14px", position: "relative", cursor: "pointer" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { position: "absolute", top: px(-10), minWidth: px(100), left: px(14), background: `rgba(${o.bColor === C.clay ? "200,75,12" : "76,201,160"},.15)`, border: `1px solid ${o.bColor}`, color: o.bColor, fontFamily: F.mono, fontSize: px(9), padding: "4px 8px", borderRadius: px(6), animation: `${o.p} 2s infinite` }, children: o.badge }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { marginTop: px(8), fontFamily: F.serif, fontWeight: 700, fontSize: px(16), color: C.textPrimary, marginBottom: px(4) }, children: o.title }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.sans, fontSize: px(11), color: C.textMuted }, children: o.sub })
        ] }, i)) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { padding: "0 16px", marginBottom: px(12) }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.sans, fontWeight: 700, fontSize: px(15), color: C.textPrimary }, children: "\u{1F4F9} Video Library" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "flex", overflowX: "auto", padding: "0 16px 24px", gap: px(12) }, children: [
          { t: "How MUDRA Loan Works", d: "2:45", c: ["#1a0a05", "#1C1206"] },
          { t: "Business Loan Guide 2024", d: "5:12", c: ["#0a1a15", "#061c12"] },
          { t: "Zero Collateral Schemes", d: "3:30", c: ["#1a1505", "#1c1606"] }
        ].map((v, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { width: px(140), flexShrink: 0, cursor: "pointer" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { height: px(85), background: `linear-gradient(135deg, ${v.c[0]}, ${v.c[1]})`, borderRadius: px(12), border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", marginBottom: px(8) }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: px(28), height: px(28), borderRadius: "50%", background: "rgba(255,255,255,.9)", display: "flex", alignItems: "center", justifyContent: "center" }, children: I.play("#111510", 12) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { position: "absolute", bottom: px(6), right: px(6), background: "rgba(0,0,0,.6)", fontFamily: F.mono, fontSize: px(8), color: "#fff", padding: "2px 5px", borderRadius: px(4) }, children: v.d })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.sans, fontSize: px(11), color: C.textPrimary, lineHeight: 1.3 }, children: v.t })
        ] }, i)) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { padding: "0 16px", marginBottom: px(12) }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.sans, fontWeight: 700, fontSize: px(15), color: C.textPrimary }, children: "\u{1F4AC} Success Stories" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { padding: "0 16px 24px", display: "flex", flexDirection: "column", gap: px(10) }, children: [
          { n: "Priya Sharma", l: "Mumbai", s: "\u20B98L MUDRA Tarun" },
          { n: "Ramkumar", l: "Chennai", s: "\u20B93L PM SVANidhi" },
          { n: "Sunita Devi", l: "Delhi", s: "\u20B95L CGTMSE" }
        ].map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(12), padding: "12px 14px" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: px(6) }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: px(8) }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: px(28), height: px(28), borderRadius: px(8), background: C.card2, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F.sans, fontWeight: 700, fontSize: px(11), color: C.textPrimary }, children: r.n.charAt(0) }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.sans, fontWeight: 600, fontSize: px(12), color: C.textPrimary }, children: r.n }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.sans, fontSize: px(10), color: C.textMuted }, children: r.l })
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "flex" }, children: [1, 2, 3, 4, 5].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: I.star(C.amber, 11) }, s)) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { fontFamily: F.sans, fontSize: px(11), color: C.textPrimary }, children: [
            "Successfully got ",
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { color: C.teal, fontWeight: 600 }, children: r.s }),
            " in just 7 days!"
          ] })
        ] }, i)) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { margin: "0 16px", padding: "16px", background: C.card2, borderRadius: px(14), border: `1px solid ${C.border}`, textAlign: "center" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.serif, fontWeight: 700, fontSize: px(18), color: C.textPrimary, marginBottom: px(6) }, children: "Confused?" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.sans, fontSize: px(11), color: C.textMuted, marginBottom: px(16) }, children: "Let our AI or Experts guide you to the right loan." }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { onClick: () => go("s06"), style: { ...cta(C.clay), marginBottom: px(10) }, children: [
            I.mic("#fff", 16),
            " Use AI Advisor"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => go("s09"), style: ghostCta(), children: "Request Expert Callback" })
        ] })
      ] })
    ] });
  }
  function S06({ go }) {
    const bars = [11, 21, 28, 20, 30, 17, 24, 13];
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "sc", style: { height: "100%", background: "#0E1210", display: "flex", flexDirection: "column", alignItems: "center", position: "relative", overflow: "hidden" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { position: "absolute", top: "38%", left: "50%", transform: "translate(-50%,-50%)", width: px(280), height: px(280), background: "radial-gradient(circle 140px at center,rgba(76,201,160,.08),transparent)", borderRadius: "50%", pointerEvents: "none" } }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SB, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { textAlign: "center", marginTop: px(6) }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.mono, fontSize: px(9), color: C.teal, letterSpacing: "1.5px" }, children: "AI ADVISOR ACTIVE" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.serif, fontWeight: 600, fontSize: px(20), color: C.textPrimary, marginTop: px(4) }, children: "\u0928\u092E\u0938\u094D\u0924\u0947, Rahul!" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { position: "relative", display: "flex", alignItems: "center", justifyContent: "center", marginTop: px(30), width: px(138), height: px(138) }, children: [
        ["rA", "rB", "rC"].map((a, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { position: "absolute", width: px(138 - i * 24), height: px(138 - i * 24), borderRadius: "50%", border: `1px solid rgba(76,201,160,${[0.06, 0.12, 0.18][2 - i]})`, animation: `${a} 2.4s ease-in-out ${[0.8, 0.4, 0][i]}s infinite` } }, i)),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: px(68), height: px(68), borderRadius: "50%", background: "#1C2A23", border: `1.5px solid ${C.teal}`, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }, children: I.cross(C.teal, 28) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { margin: "22px 20px 0", background: C.card1, border: `1px solid ${C.border}`, borderRadius: "12px 12px 12px 3px", padding: "12px 14px", position: "relative", zIndex: 2 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.mono, fontSize: px(8), color: C.teal, marginBottom: px(5) }, children: "LOAN DOCTOR AI" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.sans, fontSize: px(12), color: C.textPrimary, lineHeight: 1.5 }, children: "\u0928\u092E\u0938\u094D\u0924\u0947 Rahul! \u0906\u092A \u0915\u093F\u0938 \u0924\u0930\u0939 \u0915\u093E loan \u0932\u0947\u0928\u093E \u091A\u093E\u0939\u0924\u0947 \u0939\u0948\u0902? Amount \u0914\u0930 purpose \u092C\u0924\u093E\u0907\u090F\u0964" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "flex", gap: px(3), alignItems: "center", marginTop: px(20), height: px(32) }, children: bars.map((h, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: px(3), height: px(h), background: C.teal, borderRadius: px(2), transformOrigin: "bottom", animation: `sBar .9s ease-in-out ${i * 0.08}s infinite` } }, i)) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.mono, fontSize: px(8), color: C.textMuted, marginTop: px(5) }, children: "AI SPEAKING\u2026" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { flex: 1 } }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => go("s07"), style: { width: px(52), height: px(52), borderRadius: "50%", background: C.clay, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 5px 22px rgba(200,75,12,.4)", marginBottom: px(8), zIndex: 2 }, children: I.mic("#fff", 22) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.mono, fontSize: px(8), color: C.textMuted, marginBottom: px(20), zIndex: 2 }, children: "Tap to respond" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { padding: "0 16px 24px", width: "100%", zIndex: 2 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => go("s09"), style: { ...ghostCta(), height: px(44) }, children: "Prefer to talk to a person?" }) })
    ] });
  }
  function S07({ go, back, setSchemeData, isOverlay, onCloseModal }) {
    const [step, setStep] = (0, import_react.useState)(0);
    const [q, setQ] = (0, import_react.useState)("");
    const msgs = [
      { t: "ai", text: "\u0928\u092E\u0938\u094D\u0924\u0947! \u0906\u092A\u0915\u093E \u0938\u094D\u0935\u093E\u0917\u0924 \u0939\u0948\u0964 \u092E\u0948\u0902 \u0906\u092A\u0915\u0947 \u0932\u093F\u090F best loan scheme \u0922\u0942\u0902\u0922\u0942\u0902\u0917\u093E\u0964 \u0906\u092A \u0915\u093F\u0938 purpose \u0915\u0947 \u0932\u093F\u090F loan \u0932\u0947\u0928\u093E \u091A\u093E\u0939\u0924\u0947 \u0939\u0948\u0902?" },
      { t: "user", text: "Business expand \u0915\u0930\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u2014 \u0915\u092A\u0921\u093C\u0947 \u0915\u0940 \u0926\u0941\u0915\u093E\u0928 \u0939\u0948\u0964" },
      { t: "ai", text: "\u0915\u093F\u0924\u0928\u0947 \u0938\u093E\u0932 \u092A\u0941\u0930\u093E\u0928\u093E business \u0939\u0948 \u0914\u0930 monthly turnover \u0915\u093F\u0924\u0928\u093E \u0939\u0948?" },
      { t: "user", text: "3 \u0938\u093E\u0932 \u092A\u0941\u0930\u093E\u0928\u093E \u0939\u0948, monthly \u20B940,000 \u0915\u092E\u093E\u0924\u093E \u0939\u0942\u0901\u0964" },
      { t: "ai", text: "Documents available \u0939\u0948\u0902? Aadhaar, PAN, 6 months bank statement?" },
      { t: "user", text: "\u0939\u093E\u0901, \u0938\u092C available \u0939\u0948\u0902\u0964" },
      { t: "ai", text: "Perfect! \u0906\u092A\u0915\u093E profile analyse \u0939\u094B \u0930\u0939\u093E \u0939\u0948\u2026" },
      { t: "result" },
      { t: "ai", text: "Is there anything else you'd like to ask?", cond: true }
    ];
    (0, import_react.useEffect)(() => {
      if (step < msgs.length - 2) {
        const t = setTimeout(() => setStep((s) => s + 1), 850);
        return () => clearTimeout(t);
      } else if (step === msgs.length - 2) {
        const t = setTimeout(() => setStep((s) => s + 1), 1800);
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
    };
    const results = [
      { best: true, match: "94%", title: "MUDRA Tarun Loan", sub: "Pradhan Mantri Mudra Yojana", chips: [["Up to \u20B910L", C.clay], ["8.5% p.a.", C.teal], ["5\u20137 Days", C.textMuted]] },
      { best: false, match: "87%", title: "CGTMSE Scheme", sub: "Ministry of MSME", chips: [["Up to \u20B95L", C.clay], ["9.2% p.a.", C.teal], ["7\u201310 Days", C.textMuted]] },
      { best: false, match: "81%", title: "PM SVANidhi", sub: "PM Street Vendor Scheme", chips: [["Up to \u20B95L", C.clay], ["7% p.a.", C.teal], ["3\u20135 Days", C.textMuted]] }
    ];
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "sc", style: { height: "100%", background: C.bg, display: "flex", flexDirection: "column", position: isOverlay ? "absolute" : "relative", inset: 0, zIndex: 1e3 }, children: [
      isOverlay ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { height: px(46) } }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SB, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { padding: "0 16px 10px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${C.border}` }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: px(10) }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: isOverlay ? onCloseModal : back, style: { background: "none", padding: px(2) }, children: isOverlay ? I.cross(C.textMuted, 20) : I.back(C.textMuted, 18) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: px(30), height: px(30), borderRadius: "50%", background: "#1C2A23", border: `1.5px solid ${C.teal}`, display: "flex", alignItems: "center", justifyContent: "center" }, children: I.cross(C.teal, 14) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.sans, fontWeight: 600, fontSize: px(13), color: C.textPrimary }, children: "Loan Doctor AI" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: px(4) }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: px(5), height: px(5), borderRadius: "50%", background: C.teal, animation: "blink 1.2s ease infinite" } }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontFamily: F.sans, fontSize: px(10), color: C.teal }, children: "Live" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => handleNav("s09"), style: { border: `1px solid ${C.clay}`, background: "transparent", color: C.clay, borderRadius: px(6), padding: "4px 8px", fontFamily: F.sans, fontWeight: 600, fontSize: px(10) }, children: "Specialist" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { flex: 1, overflowY: "auto", padding: "16px 16px 80px", display: "flex", flexDirection: "column", gap: px(12) }, children: [
        msgs.slice(0, step + 1).map((m, i) => {
          if (m.cond && step < msgs.length) return null;
          return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "flex", flexDirection: m.t === "user" ? "row-reverse" : "column", animation: "msgIn .22s ease both" }, children: m.t === "result" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { margin: "16px 0", width: "100%" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "flex", alignItems: "center", gap: px(6), marginBottom: px(10), alignSelf: "center", justifyContent: "center" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: px(4), padding: "4px 10px", background: "rgba(76,201,160,.12)", borderRadius: px(20), alignItems: "center" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: px(6), height: px(6), borderRadius: "50%", background: C.teal, animation: "blink 1.2s ease infinite" } }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontFamily: F.mono, fontSize: px(9), color: C.teal, letterSpacing: "1px", fontWeight: 700 }, children: "AI MATCHED 3 SCHEMES FOR YOU" })
            ] }) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "flex", flexDirection: "column", gap: px(8), marginBottom: px(16) }, children: results.map((r, k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { onClick: () => handleSelectScheme(r), style: { width: "100%", textAlign: "left", background: r.best ? "rgba(200,75,12,.035)" : C.card1, border: `1px solid ${r.best ? C.clay : C.border}`, borderRadius: px(14), padding: "12px", position: "relative" }, children: [
              r.best && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { position: "absolute", top: 0, right: px(12), background: C.clay, color: "#fff", fontFamily: F.mono, fontSize: px(7), padding: "3px 7px", borderRadius: "0 0 5px 5px", fontWeight: 700 }, children: "BEST MATCH" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", alignItems: "flex-start", gap: px(10), marginBottom: px(8) }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: px(30), height: px(30), borderRadius: px(8), background: "rgba(200,75,12,.11)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }, children: I.doc(C.clay, 15) }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { flex: 1 }, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.sans, fontWeight: 600, fontSize: px(13), color: C.textPrimary }, children: r.title }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontFamily: F.mono, fontSize: px(10), color: C.teal, background: "rgba(76,201,160,.1)", padding: "2px 6px", borderRadius: px(4) }, children: r.match })
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.sans, fontSize: px(10), color: C.textMuted, marginTop: px(1) }, children: r.sub })
                ] })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "flex", gap: px(6), flexWrap: "wrap", borderTop: `1px solid ${C.border}`, paddingTop: px(8) }, children: r.chips.map(([l, c], j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: chip(c), children: l }, j)) })
            ] }, k)) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { onClick: () => handleNav("schemes_browse"), style: { ...cta(C.clay), height: px(48), marginBottom: px(16) }, children: [
              "Explore All Schemes ",
              I.arrow()
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { textAlign: "center" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => handleNav("s09"), style: { fontFamily: F.sans, fontSize: px(12), color: C.textMuted, background: "none", borderBottom: `1px solid ${C.textMuted}`, paddingBottom: px(2) }, children: "Not satisfied? Talk to a specialist \u2192" }) })
          ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { maxWidth: "78%", background: m.t === "ai" ? C.card2 : "rgba(200,75,12,.10)", borderRadius: m.t === "ai" ? "3px 12px 12px 12px" : "12px 12px 3px 12px", border: m.t !== "ai" ? `1px solid rgba(200,75,12,.25)` : "none", padding: "10px 14px" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.sans, fontSize: px(13), color: C.textPrimary, lineHeight: 1.45 }, children: m.text }) }) }, i);
        }),
        step < msgs.length - 2 && msgs[step + 1]?.t === "ai" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "flex", gap: px(4), padding: "8px 12px", background: C.card2, borderRadius: "3px 12px 12px 12px", alignSelf: "flex-start", alignItems: "center" }, children: [1, 2, 3].map((j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: px(5), height: px(5), borderRadius: "50%", background: C.textMuted, animation: `blink 1s ease ${j * 0.2}s infinite` } }, j)) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { position: "absolute", bottom: px(20), left: 0, right: 0, padding: "0 16px", display: "flex", gap: px(8), alignItems: "center" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { flex: 1, height: px(48), background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(24), display: "flex", alignItems: "center", padding: "0 16px", boxShadow: "0 -10px 30px rgba(17,21,16,1)" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { type: "text", placeholder: "Type or tap mic to speak\u2026", value: q, onChange: (e) => setQ(e.target.value), onKeyDown: (e) => {
          if (e.key === "Enter") {
            setQ("");
            setStep(msgs.length);
          }
        }, style: { width: "100%", background: "transparent", border: "none", color: C.textPrimary, fontFamily: F.sans, fontSize: px(13), outline: "none" } }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: { width: px(46), height: px(46), borderRadius: "50%", background: C.clay, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 5px 15px rgba(200,75,12,.3)" }, children: I.mic("#fff", 20) })
      ] })
    ] });
  }
  function SpecialistConfirm({ go, back, data, setSelectedSlot }) {
    const [slot, setSlot] = (0, import_react.useState)(0);
    const dates = ["Today", "Tomorrow", "Wed 5", "Thu 6", "Fri 7"];
    const times = ["10:00 AM", "11:30 AM", "1:00 PM", "2:30 PM", "4:00 PM", "5:30 PM"];
    const handleConfirm = () => {
      setSelectedSlot({ date: dates[0], time: times[slot], scheme: data?.t || "General Inquiry" });
      go("specialist_booked");
    };
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "sc", style: { height: "100%", background: C.bg, display: "flex", flexDirection: "column" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SB, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { padding: "0 16px 14px", display: "flex", alignItems: "center", gap: px(10), borderBottom: `1px solid ${C.border}` }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: back, style: { width: px(26), height: px(26), borderRadius: "50%", background: C.card1, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center" }, children: I.back(C.textMuted, 13) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { flex: 1, overflowY: "auto", padding: "16px 16px 40px", display: "flex", flexDirection: "column" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { position: "relative", background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(16), padding: "16px", marginBottom: px(24), overflow: "hidden" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { position: "absolute", top: 0, right: 0, width: px(100), height: px(100), background: "radial-gradient(circle at top right, rgba(76,201,160,.15), transparent 70%)", pointerEvents: "none" } }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", alignItems: "flex-start", gap: px(12) }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { width: px(48), height: px(48), borderRadius: "50%", background: C.card2, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }, children: [
              I.person(C.clay, 22),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { position: "absolute", bottom: 0, right: 0, width: px(12), height: px(12), background: C.teal, borderRadius: "50%", border: `2px solid ${C.card1}` } })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.serif, fontWeight: 700, fontSize: px(18), color: C.textPrimary }, children: "Ramesh K." }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.sans, fontSize: px(11), color: C.textMuted, marginBottom: px(8) }, children: "Senior Loan Advisor" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: px(6) }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "flex" }, children: [1, 2, 3, 4, 5].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: I.star(C.amber, 10) }, s)) }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontFamily: F.mono, fontSize: px(10), color: C.textPrimary }, children: "4.9" }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontFamily: F.sans, fontSize: px(9), color: C.textMuted }, children: "\xB7 847 done" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { marginTop: px(14), background: "rgba(237,240,232,.05)", padding: "8px 12px", borderRadius: px(8), display: "flex", alignItems: "center", gap: px(8) }, children: [
            I.info(C.textMuted, 14),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontFamily: F.sans, fontSize: px(11), color: C.textPrimary }, children: "Free 20-min consultation \xB7 No commitment" })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.sans, fontWeight: 700, fontSize: px(16), color: C.textPrimary, marginBottom: px(12) }, children: "Select a time slot" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "flex", overflowX: "auto", gap: px(8), marginBottom: px(20), paddingBottom: px(4) }, children: dates.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: { flexShrink: 0, background: i === 0 ? C.clay : C.card1, border: `1px solid ${i === 0 ? C.clay : C.border}`, color: i === 0 ? "#fff" : C.textMuted, borderRadius: px(20), padding: "8px 16px", fontFamily: F.sans, fontWeight: 600, fontSize: px(12) }, children: d }, i)) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: px(10), marginBottom: px(30) }, children: times.map((t, i) => {
          const act = slot === i;
          return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { onClick: () => setSlot(i), style: { background: C.card1, border: `1.5px solid ${act ? C.clay : C.border}`, borderRadius: px(12), height: px(46), display: "flex", alignItems: "center", justifyContent: "center", position: "relative", transition: "all .15s" }, children: [
            act && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { position: "absolute", top: px(-6), right: px(-6), width: px(18), height: px(18), borderRadius: "50%", background: C.clay, display: "flex", alignItems: "center", justifyContent: "center" }, children: I.check("#fff", 10) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontFamily: F.mono, fontSize: px(13), color: act ? C.clay : C.textPrimary, fontWeight: act ? 700 : 400 }, children: t })
          ] }, i);
        }) }),
        data?.t && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { marginBottom: px(20), display: "inline-flex", alignItems: "center", gap: px(6), background: "rgba(200,75,12,.1)", padding: "6px 12px", borderRadius: px(20), border: `1px solid rgba(200,75,12,.3)` }, children: [
          I.doc(C.clay, 14),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: { fontFamily: F.sans, fontSize: px(11), color: C.textPrimary }, children: [
            "Ref: ",
            data.t
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { flex: 1 } }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: handleConfirm, style: { ...cta(C.clay), marginBottom: px(12) }, children: "Confirm Consultation" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { textAlign: "center" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => go("schemes_browse"), style: { background: "none", fontFamily: F.sans, fontSize: px(12), color: C.textMuted, borderBottom: `1px solid ${C.textMuted}`, paddingBottom: px(2) }, children: "Skip \u2014 Explore All Schemes" }) })
      ] })
    ] });
  }
  function SpecialistBooked({ go, selectedSlot }) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "sc", style: { height: "100%", background: "#08100D", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SB, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { position: "absolute", top: "40%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { position: "relative", width: px(100), height: px(100), display: "flex", alignItems: "center", justifyContent: "center", marginBottom: px(24) }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { position: "absolute", inset: "-30px", background: "radial-gradient(circle 80px at center,rgba(76,201,160,.15),transparent)", borderRadius: "50%", animation: "dotP 2s infinite" } }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: px(70), height: px(70), borderRadius: "50%", background: C.teal, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }, children: I.check("#111510", 36) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.serif, fontWeight: 700, fontSize: px(26), color: C.textPrimary, marginBottom: px(10) }, children: "Consultation Confirmed!" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { fontFamily: F.sans, fontSize: px(13), color: C.textMuted, textAlign: "center", padding: "0 30px", lineHeight: 1.4, marginBottom: px(30) }, children: [
          "Ramesh K. will meet you on ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: { color: C.textPrimary, fontWeight: 700 }, children: [
            selectedSlot?.date,
            " at ",
            selectedSlot?.time
          ] }),
          "."
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { width: px(310), display: "flex", flexDirection: "column", gap: px(10) }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(12), padding: "14px 16px", display: "flex", alignItems: "center", gap: px(12) }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: px(34), height: px(34), borderRadius: px(10), background: "rgba(76,201,160,.12)", display: "flex", alignItems: "center", justifyContent: "center" }, children: I.wa(C.teal, 18) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontFamily: F.sans, fontWeight: 600, fontSize: px(13), color: C.textPrimary }, children: "Google Meet link sent to WhatsApp" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(12), padding: "14px 16px", display: "flex", alignItems: "center", gap: px(12) }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: px(34), height: px(34), borderRadius: px(10), background: C.card2, display: "flex", alignItems: "center", justifyContent: "center", fontSize: px(16) }, children: "\u{1F4C5}" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { fontFamily: F.sans, fontWeight: 600, fontSize: px(13), color: C.textPrimary }, children: [
                selectedSlot?.date,
                " \xB7 ",
                selectedSlot?.time
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.sans, fontSize: px(11), color: C.textMuted }, children: "20 minutes" })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(12), padding: "14px 16px", display: "flex", alignItems: "center", gap: px(12) }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: px(34), height: px(34), borderRadius: px(10), background: "rgba(200,75,12,.12)", display: "flex", alignItems: "center", justifyContent: "center" }, children: I.doc(C.clay, 18) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { overflow: "hidden" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.mono, fontSize: px(10), color: C.textMuted, marginBottom: px(2) }, children: "REF: LD-CONSULT-2024-12" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.sans, fontWeight: 600, fontSize: px(13), color: C.textPrimary, whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }, children: selectedSlot?.scheme })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { position: "absolute", bottom: px(40), width: "100%", padding: "0 24px", textAlign: "center" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => go("schemes_browse"), style: { ...cta(C.clay), marginBottom: px(16) }, children: "Explore All Schemes" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => go("home_new"), style: { background: "none", fontFamily: F.sans, fontWeight: 600, fontSize: px(13), color: C.textMuted }, children: "Go to Home" })
      ] })
    ] });
  }
  function S09({ go, back }) {
    const [slot, setSlot] = (0, import_react.useState)(0);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "sc", style: { height: "100%", background: C.bg, display: "flex", flexDirection: "column" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SB, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { padding: "0 16px 10px", display: "flex", alignItems: "center", gap: px(10), borderBottom: `1px solid ${C.border}` }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: back, style: { width: px(26), height: px(26), borderRadius: "50%", background: C.card1, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center" }, children: I.back(C.textMuted, 13) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.serif, fontWeight: 700, fontSize: px(16), color: C.textPrimary }, children: "Request Call" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.sans, fontSize: px(10), color: C.textMuted }, children: "Free Expert Consultation" })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { flex: 1, overflowY: "auto", padding: "16px" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { background: "rgba(76,201,160,.06)", border: `1px solid rgba(76,201,160,.2)`, borderRadius: px(12), padding: "14px", display: "flex", alignItems: "center", gap: px(12), marginBottom: px(20) }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: px(40), height: px(40), borderRadius: px(10), background: C.teal, display: "flex", alignItems: "center", justifyContent: "center" }, children: I.call("#111510", 20) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.sans, fontWeight: 600, fontSize: px(13), color: C.textPrimary }, children: "Need help choosing?" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.sans, fontSize: px(11), color: C.textMuted, marginTop: px(2) }, children: "Our certified loan experts will guide you. 100% Free." })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: px(16), marginBottom: px(24) }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.mono, fontSize: px(9), color: C.textMuted, marginBottom: px(6) }, children: "YOUR NAME" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { type: "text", defaultValue: "Rahul Kumar", style: { width: "100%", height: px(48), background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(10), padding: "0 14px", color: C.textPrimary, fontSize: px(14), outline: "none" } })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.mono, fontSize: px(9), color: C.textMuted, marginBottom: px(6) }, children: "MOBILE NUMBER" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { type: "text", defaultValue: "+91 98765 43210", style: { width: "100%", height: px(48), background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(10), padding: "0 14px", color: C.textPrimary, fontSize: px(14), outline: "none" } })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.mono, fontSize: px(9), color: C.textMuted, marginBottom: px(6) }, children: "LOAN PURPOSE" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { position: "relative" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", { style: { width: "100%", height: px(48), background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(10), padding: "0 34px 0 14px", color: C.textPrimary, fontSize: px(14), appearance: "none", outline: "none" }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Start a New Business" }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Expand Existing Business" }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Agriculture / Farming" }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Equipment Purchase" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { position: "absolute", right: px(14), top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }, children: I.chevron(C.textMuted, 14) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.mono, fontSize: px(9), color: C.textMuted, marginBottom: px(10), letterSpacing: "1px" }, children: "PREFERRED TIME" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: px(8), marginBottom: px(24) }, children: ["Morning", "Afternoon", "Evening"].map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { onClick: () => setSlot(i), style: { background: C.card1, border: `1.5px solid ${slot === i ? C.clay : C.border}`, borderRadius: px(10), padding: "12px 6px", display: "flex", flexDirection: "column", alignItems: "center", gap: px(6), transition: "all .15s" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontSize: px(18) }, children: ["\u{1F305}", "\u2600\uFE0F", "\u{1F306}"][i] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontFamily: F.sans, fontSize: px(11), color: slot === i ? C.clay : C.textMuted, fontWeight: slot === i ? 600 : 400 }, children: l })
        ] }, i)) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => go("s10"), style: cta(C.clay, { marginBottom: px(16) }), children: "Request Callback" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", alignItems: "center", justifyContent: "center", gap: px(6) }, children: [
          I.info(C.textMuted, 14),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontFamily: F.mono, fontSize: px(9), color: C.textMuted }, children: "100% Free \xB7 No Spam \xB7 Cancel Anytime" })
        ] })
      ] })
    ] });
  }
  function S10({ go }) {
    (0, import_react.useEffect)(() => {
      const t = setTimeout(() => go("home_new"), 3500);
      return () => clearTimeout(t);
    }, []);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "sc", style: { height: "100%", background: "#0B100D", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SB, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { position: "absolute", top: "45%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", alignItems: "center" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { position: "relative", width: px(100), height: px(100), display: "flex", alignItems: "center", justifyContent: "center", marginBottom: px(24) }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { position: "absolute", inset: "-30px", background: "radial-gradient(circle 80px at center,rgba(76,201,160,.15),transparent)", borderRadius: "50%", animation: "dotP 2s infinite" } }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: px(70), height: px(70), borderRadius: "50%", background: C.teal, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }, children: I.call("#111510", 30) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.serif, fontWeight: 700, fontSize: px(26), color: C.textPrimary, marginBottom: px(6) }, children: "Callback Booked!" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.sans, fontSize: px(12), color: C.textMuted, textAlign: "center", padding: "0 30px" }, children: "Our expert will call you at your preferred time." }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { marginTop: px(30), width: px(300), background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(14), padding: "16px" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: px(12), borderBottom: `1px solid ${C.border}`, paddingBottom: px(12), marginBottom: px(12) }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: px(40), height: px(40), borderRadius: "50%", background: C.card2, display: "flex", alignItems: "center", justifyContent: "center", color: C.textPrimary, fontSize: px(14), fontWeight: 700 }, children: "RK" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.mono, fontSize: px(9), color: C.textMuted, marginBottom: px(2) }, children: "YOUR EXPERT" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.sans, fontWeight: 600, fontSize: px(14), color: C.textPrimary }, children: "Ramesh K." })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.mono, fontSize: px(9), color: C.textMuted, marginBottom: px(2) }, children: "TIME SLOT" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.sans, fontWeight: 600, fontSize: px(13), color: C.textPrimary }, children: "Morning (9-12 AM)" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { textAlign: "right" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.mono, fontSize: px(9), color: C.textMuted, marginBottom: px(2) }, children: "REFERENCE" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.sans, fontWeight: 600, fontSize: px(13), color: C.teal }, children: "LD-CALL-041" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { position: "absolute", bottom: px(40), textAlign: "center", width: "100%" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", alignItems: "center", justifyContent: "center", gap: px(6), marginBottom: px(20) }, children: [
          I.wa(C.teal, 16),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontFamily: F.sans, fontSize: px(11), color: C.teal, fontWeight: 500 }, children: "Confirmation sent to WhatsApp" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => go("home_new"), style: { ...ghostCta(), width: px(300), margin: "0 auto" }, children: "Explore App While You Wait" })
      ] })
    ] });
  }
  function SchemesBrowser({ go, back, setSchemeData, inMainApp }) {
    const [tab, setTab] = (0, import_react.useState)("C");
    const cCats = ["Business Loans", "Small Traders", "Agriculture", "Women Schemes"];
    const sCats = ["Business Loans", "Startups", "Agriculture"];
    const cData = {
      "Business Loans": [
        { t: "MUDRA Tarun", s: "PM Mudra Yojana", chips: [["Up to \u20B910L", C.clay], ["8.5% p.a.", C.teal]], badge: "\u{1F525} Popular" },
        { t: "MUDRA Kishore", s: "PM Mudra Yojana", chips: [["Up to \u20B95L", C.clay], ["8.2% p.a.", C.teal]] },
        { t: "CGTMSE", s: "Ministry of MSME", chips: [["Up to \u20B95L", C.clay], ["9.2% p.a.", C.teal]], badge: "No Collateral" }
      ],
      "Small Traders": [
        { t: "PM SVANidhi", s: "Ministry of Housing", chips: [["Up to \u20B95L", C.clay], ["7% p.a.", C.teal]], badge: "\u26A1 Fast" },
        { t: "MUDRA Shishu", s: "PM Mudra Yojana", chips: [["Up to \u20B950K", C.clay], ["Low Interest", C.teal]] }
      ],
      "Agriculture": [
        { t: "Kisan Credit Card", s: "NABARD", chips: [["Up to \u20B93L", C.clay], ["4% p.a.", C.teal]], badge: "\u26A1 Fast" }
      ],
      "Women Schemes": [
        { t: "Mahila Udyam", s: "SIDBI", chips: [["Up to \u20B910L", C.clay], ["7.5% p.a.", C.teal]], badge: "Women Only" }
      ]
    };
    const sData = {
      "Business Loans": [
        { t: "TNSCB Loan", s: "TN Slum Clearance", chips: [["Up to \u20B93L", C.clay], ["6.5% p.a.", C.teal]] },
        { t: "MSME TN", s: "TN Industries Dept", chips: [["Up to \u20B910L", C.clay], ["8% p.a.", C.teal]], badge: "State Special" }
      ],
      "Startups": [
        { t: "Kalaignar Startup", s: "TN Startup Mission", chips: [["Up to \u20B95L", C.clay], ["0% p.a.", C.teal]], badge: "0% Interest" }
      ],
      "Agriculture": [
        { t: "NABARD Rural TN", s: "National Bank", chips: [["Up to \u20B92L", C.clay], ["4% p.a.", C.teal]] }
      ]
    };
    const cats = tab === "C" ? cCats : sCats;
    const data = tab === "C" ? cData : sData;
    const handleSelect = (sc) => {
      setSchemeData(sc);
      go("scheme_detail");
    };
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "sc", style: { height: "100%", background: C.bg, display: "flex", flexDirection: "column", position: "relative" }, children: [
      !inMainApp && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SB, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { padding: `${inMainApp ? px(16) : 0} 16px 12px`, borderBottom: `1px solid ${C.border}` }, children: [
        !inMainApp && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: px(10), marginBottom: px(16) }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: back, style: { width: px(26), height: px(26), borderRadius: "50%", background: C.card1, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center" }, children: I.back(C.textMuted, 13) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.serif, fontWeight: 700, fontSize: px(16), color: C.textPrimary }, children: "Browse Schemes" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: px(8) }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { flex: 1, position: "relative" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { position: "absolute", left: px(12), top: "50%", transform: "translateY(-50%)" }, children: I.search() }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { type: "text", placeholder: "Search schemes, amounts...", style: { width: "100%", height: px(40), background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(10), padding: "0 14px 0 36px", color: C.textPrimary, fontSize: px(13), outline: "none" } })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: { width: px(40), height: px(40), background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(10), display: "flex", alignItems: "center", justifyContent: "center" }, children: I.filter() })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: px(12) }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { style: { display: "flex", alignItems: "center", gap: px(4), background: "rgba(76,201,160,.12)", border: `1px solid ${C.teal}`, borderRadius: px(6), padding: "4px 8px" }, children: [
          I.gps(C.teal, 12),
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontFamily: F.sans, fontSize: px(10), fontWeight: 600, color: C.teal }, children: "TN, India" }),
          " ",
          I.chevron(C.teal, 12)
        ] }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { padding: "14px 16px 0" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { width: "100%", height: px(44), background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(12), position: "relative", display: "flex", alignItems: "center", padding: "0 4px" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { position: "absolute", width: "calc(50% - 4px)", height: px(36), background: C.card2, border: `1px solid ${C.border}`, borderRadius: px(10), left: tab === "C" ? px(4) : "calc(50%)", transition: "left .2s cubic-bezier(.16,1,.3,1)" } }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => setTab("C"), style: { flex: 1, height: "100%", zIndex: 1, fontFamily: F.sans, fontWeight: 600, fontSize: px(12), color: tab === "C" ? C.textPrimary : C.textMuted, background: "transparent" }, children: "Central" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => setTab("S"), style: { flex: 1, height: "100%", zIndex: 1, fontFamily: F.sans, fontWeight: 600, fontSize: px(12), color: tab === "S" ? C.textPrimary : C.textMuted, background: "transparent" }, children: "State \u2014 TN" })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { flex: 1, overflowY: "auto", paddingBottom: px(inMainApp ? 80 : 20) }, children: cats.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { marginTop: px(24) }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { padding: "0 16px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: px(12) }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.sans, fontWeight: 700, fontSize: px(16), color: C.textPrimary }, children: c }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: { background: "transparent", color: C.clay, fontFamily: F.sans, fontSize: px(12), fontWeight: 600 }, children: "See all" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "flex", overflowX: "auto", padding: "0 16px", gap: px(12) }, children: data[c]?.map((sc, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { onClick: () => handleSelect(sc), style: { width: px(180), flexShrink: 0, textAlign: "left", background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(14), padding: "14px", position: "relative" }, children: [
          sc.badge && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { position: "absolute", top: px(-10), minWidth: px(80), left: px(14), background: `rgba(${sc.badge.includes("\u{1F525}") ? "200,75,12" : "76,201,160"},.15)`, border: `1px solid ${sc.badge.includes("\u{1F525}") ? C.clay : C.teal}`, color: sc.badge.includes("\u{1F525}") ? C.clay : C.teal, fontFamily: F.mono, fontSize: px(9), padding: "4px 8px", borderRadius: px(6) }, children: sc.badge }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: px(36), height: px(36), borderRadius: px(10), background: "rgba(200,75,12,.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: px(10), marginTop: sc.badge ? px(8) : 0 }, children: I.cross(C.clay, 18) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.serif, fontWeight: 700, fontSize: px(15), color: C.textPrimary, marginBottom: px(4) }, children: sc.t }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.sans, fontSize: px(11), color: C.textMuted, marginBottom: px(14) }, children: sc.s }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "flex", flexWrap: "wrap", gap: px(6) }, children: sc.chips.map(([l, col], k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: chip(col), children: l }, k)) })
        ] }, j)) })
      ] }, i)) }),
      !inMainApp && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { onClick: () => go("s09"), style: { position: "absolute", bottom: px(20), right: px(20), width: px(52), height: px(52), borderRadius: "50%", background: C.clay, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 15px rgba(200,75,12,.4)", animation: "fabP 2s infinite", zIndex: 10 }, children: [
        I.person("#fff", 20),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontFamily: F.sans, fontSize: px(8), color: "#fff", fontWeight: 700, marginTop: px(1) }, children: "Consult" })
      ] })
    ] });
  }
  function SchemeDetail({ go, back, data, showSpec }) {
    if (!data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {});
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "sc", style: { height: "100%", background: C.bg, display: "flex", flexDirection: "column", zIndex: 100 }, children: [
      showSpec && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SB, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { padding: `${showSpec ? 0 : px(16)} 16px 14px`, display: "flex", alignItems: "center", gap: px(10), borderBottom: `1px solid ${C.border}` }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: back, style: { width: px(26), height: px(26), borderRadius: "50%", background: C.card1, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center" }, children: I.back(C.textMuted, 13) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.serif, fontWeight: 700, fontSize: px(16), color: C.textPrimary }, children: "Scheme Details" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { flex: 1, overflowY: "auto", padding: "16px", paddingBottom: "100px" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { height: px(180), background: "linear-gradient(135deg, #1C2A23, #111510)", borderRadius: px(16), border: `1px solid ${C.teal}`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", marginBottom: px(20) }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at center, rgba(76,201,160,.1) 1px, transparent 1px)", backgroundSize: "16px 16px" } }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: px(46), height: px(46), borderRadius: "50%", background: "rgba(255,255,255,.9)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1, boxShadow: "0 4px 12px rgba(0,0,0,.3)" }, children: I.play("#111510", 22) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, rgba(0,0,0,.8), transparent)", padding: "20px 14px 12px", display: "flex", alignItems: "center", gap: px(8) }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: px(6), height: px(6), borderRadius: "50%", background: C.teal, animation: "blink 1.2s infinite" } }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: { fontFamily: F.sans, fontWeight: 600, fontSize: px(12), color: "#fff" }, children: [
              "How ",
              data.t,
              " Works"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: px(12), marginBottom: px(20) }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: px(50), height: px(50), borderRadius: px(12), background: "rgba(200,75,12,.1)", display: "flex", alignItems: "center", justifyContent: "center" }, children: I.cross(C.clay, 26) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.serif, fontWeight: 700, fontSize: px(22), color: C.textPrimary, marginBottom: px(2) }, children: data.t }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.sans, fontSize: px(12), color: C.textMuted }, children: data.s })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: px(10), marginBottom: px(24) }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(12), padding: "12px" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.mono, fontSize: px(9), color: C.textMuted, marginBottom: px(4) }, children: "MAX AMOUNT" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.sans, fontWeight: 700, fontSize: px(15), color: C.clay }, children: data.chips[0][0] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(12), padding: "12px" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.mono, fontSize: px(9), color: C.textMuted, marginBottom: px(4) }, children: "INTEREST" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.sans, fontWeight: 700, fontSize: px(15), color: C.teal }, children: data.chips[1][0] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(12), padding: "12px" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.mono, fontSize: px(9), color: C.textMuted, marginBottom: px(4) }, children: "TENURE" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.sans, fontWeight: 700, fontSize: px(15), color: C.teal }, children: "Up to 5 Years" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(12), padding: "12px" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.mono, fontSize: px(9), color: C.textMuted, marginBottom: px(4) }, children: "COLLATERAL" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.sans, fontWeight: 700, fontSize: px(15), color: data.badge?.includes("No") ? C.teal : C.amber }, children: data.badge?.includes("No") ? "None Required" : "Required" })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(16), padding: "16px", marginBottom: px(16) }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: px(8), alignItems: "center", marginBottom: px(16) }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: px(24), height: px(24), borderRadius: "50%", background: "rgba(76,201,160,.15)", display: "flex", alignItems: "center", justifyContent: "center" }, children: I.check(C.teal, 12) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontFamily: F.sans, fontWeight: 700, fontSize: px(14), color: C.textPrimary }, children: "Eligibility Checklist" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "flex", flexDirection: "column", gap: px(12) }, children: ["Indian Citizen above 18 years", "Existing business > 2 years vintage", "No defaults in any bank/NBFC", "Udyam Registration Certificate"].map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: px(10), alignItems: "flex-start" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: px(14), height: px(14), borderRadius: "50%", border: `1.5px solid ${C.teal}`, display: "flex", alignItems: "center", justifyContent: "center", marginTop: px(2) } }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontFamily: F.sans, fontSize: px(12), color: C.textMuted, lineHeight: 1.4 }, children: t })
          ] }, i)) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(16), padding: "16px", marginBottom: px(24) }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: px(8), alignItems: "center", marginBottom: px(16) }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: px(24), height: px(24), borderRadius: "50%", background: "rgba(200,75,12,.15)", display: "flex", alignItems: "center", justifyContent: "center" }, children: I.doc(C.clay, 12) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontFamily: F.sans, fontWeight: 700, fontSize: px(14), color: C.textPrimary }, children: "Documents Required" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "flex", flexDirection: "column", gap: px(12) }, children: ["Aadhaar Card", "PAN Card", "6 Months Bank Statement", "Business Address Proof", "ITR (optional but recommended)"].map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: px(10), alignItems: "center" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: px(6), height: px(6), borderRadius: "50%", background: C.clay } }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontFamily: F.sans, fontSize: px(12), color: C.textMuted }, children: t })
          ] }, i)) })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { position: "absolute", bottom: 0, left: 0, right: 0, background: `linear-gradient(to top, ${C.bg} 80%, transparent)`, padding: "40px 16px 20px", pointerEvents: "none" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { pointerEvents: "auto", display: "flex", flexDirection: "column", paddingBottom: !showSpec ? px(80) : 0 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => go("payment"), style: { ...cta(C.clay), marginBottom: px(10) }, children: showSpec ? `Continue & Buy \u2014 Apply for ${data.t}` : `Apply for ${data.t}` }),
        showSpec && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => go("specialist_confirm"), style: ghostCta(), children: "Consult a Specialist First" })
      ] }) })
    ] });
  }
  function Payment({ go, back }) {
    const [plan, setPlan] = (0, import_react.useState)(0);
    const [method, setMethod] = (0, import_react.useState)(0);
    const [loading, setLoading] = (0, import_react.useState)(false);
    const methods = [["\u{1F4F1}", "GPay/UPI"], ["\u{1F4B3}", "Card"], ["\u{1F3E6}", "Net Banking"]];
    const handlePay = () => {
      setLoading(true);
      setTimeout(() => go("pay_success"), 1800);
    };
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "sc", style: { height: "100%", background: C.bg, display: "flex", flexDirection: "column" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SB, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { padding: "0 16px 14px", display: "flex", alignItems: "center", gap: px(10), borderBottom: `1px solid ${C.border}` }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: back, style: { width: px(26), height: px(26), borderRadius: "50%", background: C.card1, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center" }, children: I.back(C.textMuted, 13) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.serif, fontWeight: 700, fontSize: px(16), color: C.textPrimary }, children: "Choose Your Plan" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.sans, fontSize: px(10), color: C.textMuted }, children: "Secure your application process" })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { flex: 1, overflowY: "auto", padding: "16px" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { onClick: () => setPlan(0), style: { width: "100%", textAlign: "left", background: C.card1, border: `1.5px solid ${plan === 0 ? C.clay : C.border}`, borderRadius: px(16), padding: "16px", marginBottom: px(12), position: "relative", transition: "all .2s" }, children: [
          plan === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { position: "absolute", top: px(16), right: px(16), width: px(22), height: px(22), borderRadius: "50%", background: C.clay, display: "flex", alignItems: "center", justifyContent: "center", animation: "popIn .2s cubic-bezier(.16,1,.3,1)" }, children: I.check("#fff", 12) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { position: "absolute", top: px(16), right: px(16), width: px(22), height: px(22), borderRadius: "50%", border: `2px solid ${C.border}` } }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.mono, fontSize: px(10), color: C.textMuted, marginBottom: px(6) }, children: "TOKEN AMOUNT" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { fontFamily: F.serif, fontWeight: 900, fontSize: px(32), color: C.textPrimary, display: "flex", alignItems: "flex-start", marginBottom: px(12) }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sup", { style: { fontSize: px(16), marginTop: px(8), color: C.textMuted, marginRight: px(2) }, children: "\u20B9" }),
            "999"
          ] }),
          [["Agent assigned in 2 hrs", "Pay the rest after approval"], ["App submission", "Basic doc collection"]].map(([t, s], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", alignItems: "flex-start", gap: px(10), marginBottom: i === 0 ? px(10) : 0 }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: px(16), height: px(16), borderRadius: "50%", background: "rgba(76,201,160,.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: px(2) }, children: I.check(C.teal, 10) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.sans, fontWeight: 600, fontSize: px(12), color: C.textPrimary, marginBottom: px(2) }, children: t }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.sans, fontSize: px(10), color: C.textMuted }, children: s })
            ] })
          ] }, i))
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { onClick: () => setPlan(1), style: { width: "100%", textAlign: "left", background: C.card1, border: `1.5px solid ${plan === 1 ? C.clay : C.border}`, borderRadius: px(16), padding: "16px", marginBottom: px(20), position: "relative", transition: "all .2s" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { position: "absolute", top: 0, left: px(16), background: C.teal, padding: "4px 8px", borderRadius: "0 0 6px 6px", fontFamily: F.mono, fontSize: px(9), color: "#111510", fontWeight: 700 }, children: "\u2605 RECOMMENDED" }),
          plan === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { position: "absolute", top: px(16), right: px(16), width: px(22), height: px(22), borderRadius: "50%", background: C.clay, display: "flex", alignItems: "center", justifyContent: "center", animation: "popIn .2s cubic-bezier(.16,1,.3,1)" }, children: I.check("#fff", 12) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { position: "absolute", top: px(16), right: px(16), width: px(22), height: px(22), borderRadius: "50%", border: `2px solid ${C.border}` } }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.mono, fontSize: px(10), color: C.textMuted, marginBottom: px(6), marginTop: px(14) }, children: "FULL SERVICE" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { fontFamily: F.serif, fontWeight: 900, fontSize: px(32), color: C.textPrimary, display: "flex", alignItems: "flex-start", marginBottom: px(12) }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sup", { style: { fontSize: px(16), marginTop: px(8), color: C.textMuted, marginRight: px(2) }, children: "\u20B9" }),
            "10,000"
          ] }),
          [["Priority handling", "1hr response & senior agent"], ["End-to-end processing", "6mo follow-up support"]].map(([t, s], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", alignItems: "flex-start", gap: px(10), marginBottom: i === 0 ? px(10) : 0 }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: px(16), height: px(16), borderRadius: "50%", background: "rgba(76,201,160,.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: px(2) }, children: I.check(C.teal, 10) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.sans, fontWeight: 600, fontSize: px(12), color: C.textPrimary, marginBottom: px(2) }, children: t }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.sans, fontSize: px(10), color: C.textMuted }, children: s })
            ] })
          ] }, i))
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.mono, fontSize: px(10), color: C.textMuted, marginBottom: px(10), letterSpacing: "1px" }, children: "PAYMENT METHOD" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: px(10), marginBottom: px(24) }, children: methods.map(([em, l], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { onClick: () => setMethod(i), style: { background: C.card1, border: `1.5px solid ${method === i ? C.clay : C.border}`, borderRadius: px(12), padding: "14px 6px", display: "flex", flexDirection: "column", alignItems: "center", gap: px(6), transition: "all .15s" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontSize: px(22) }, children: em }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontFamily: F.sans, fontSize: px(11), color: method === i ? C.clay : C.textMuted, fontWeight: method === i ? 600 : 400 }, children: l })
        ] }, i)) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: handlePay, style: cta(C.clay, { marginBottom: px(12) }), children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: px(20), height: px(20), border: "2.5px solid rgba(255,255,255,.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin .7s linear infinite" } }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
          I.lock(),
          " Pay \u20B9",
          plan === 0 ? "999" : "10,000",
          " Securely"
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", alignItems: "center", justifyContent: "center", gap: px(6) }, children: [
          I.lock(C.textMuted, 13),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontFamily: F.mono, fontSize: px(10), color: C.textMuted }, children: "256-bit SSL \xB7 Razorpay Secured" })
        ] })
      ] })
    ] });
  }
  function PaySuccess({ go }) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "sc", style: { height: "100%", background: "#0B100D", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SB, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { position: "absolute", top: "45%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { position: "relative", width: px(110), height: px(110), display: "flex", alignItems: "center", justifyContent: "center", marginBottom: px(24) }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { position: "absolute", inset: "-20px", background: "radial-gradient(circle 90px at center, rgba(76,201,160,.15), transparent)", borderRadius: "50%", animation: "dotP 2.5s infinite" } }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { width: "86", height: "86", viewBox: "0 0 86 86", fill: "none", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "43", cy: "43", r: "41.5", stroke: C.teal, strokeWidth: "3" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M26 44.5L37.5 56L60 30", stroke: C.teal, strokeWidth: "4", strokeLinecap: "round", strokeLinejoin: "round", style: { strokeDasharray: 200, animation: "strokeIn .8s ease-out forwards .2s" } })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.serif, fontWeight: 700, fontSize: px(28), color: C.textPrimary, marginBottom: px(30) }, children: "Payment Successful!" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { width: px(310), display: "flex", flexDirection: "column", gap: px(10) }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(12), padding: "14px 16px", display: "flex", alignItems: "center", gap: px(12) }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: px(34), height: px(34), borderRadius: px(10), background: "rgba(76,201,160,.12)", display: "flex", alignItems: "center", justifyContent: "center" }, children: I.wa(C.teal, 18) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontFamily: F.sans, fontWeight: 600, fontSize: px(13), color: C.textPrimary }, children: "Invoice sent to WhatsApp" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(12), padding: "14px 16px", display: "flex", alignItems: "center", gap: px(12) }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: px(34), height: px(34), borderRadius: px(10), background: "rgba(200,75,12,.12)", display: "flex", alignItems: "center", justifyContent: "center" }, children: I.person(C.clay, 18) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.sans, fontWeight: 600, fontSize: px(13), color: C.textPrimary }, children: "Ramesh K." }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.sans, fontSize: px(11), color: C.textMuted }, children: "Your Dedicated Agent" })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(12), padding: "14px 16px", display: "flex", alignItems: "center", gap: px(12) }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: px(34), height: px(34), borderRadius: px(10), background: "rgba(76,201,160,.12)", display: "flex", alignItems: "center", justifyContent: "center" }, children: I.doc(C.teal, 18) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.sans, fontWeight: 600, fontSize: px(13), color: C.textPrimary }, children: "Case Reference" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.mono, fontSize: px(12), color: C.teal }, children: "LD-2024-038" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { position: "absolute", bottom: px(40), width: "100%", padding: "0 24px" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => go("main_home"), style: cta(C.clay), children: "Open My Application" }) })
    ] });
  }
  function S11({ hasPurchase }) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "sc", style: { height: "100%", background: C.bg, display: "flex", flexDirection: "column" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SB, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { padding: "0 16px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${C.border}` }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: px(10) }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: px(36), height: px(36), borderRadius: "50%", background: C.card1, border: `1px solid ${C.clay}`, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontFamily: F.serif, fontWeight: 700, fontSize: px(14), color: C.textPrimary }, children: "RK" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.sans, fontSize: px(11), color: C.textMuted }, children: "Welcome back," }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.serif, fontWeight: 700, fontSize: px(16), color: C.textPrimary }, children: "Ramesh Kumar" })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: px(8) }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: { width: px(38), height: px(38), borderRadius: px(12), background: C.card1, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center" }, children: I.search(C.textPrimary, 18) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { width: px(38), height: px(38), borderRadius: px(12), background: C.card1, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }, children: [
            I.bell(C.textPrimary, 18),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { position: "absolute", top: px(8), right: px(9), width: px(7), height: px(7), borderRadius: "50%", background: C.clay, border: `2px solid ${C.card1}`, animation: "dotP 2s infinite" } })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { flex: 1, overflowY: "auto", padding: "16px 16px 100px" }, children: [
        hasPurchase && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { background: C.card1, border: `1px solid ${C.clay}`, borderRadius: px(16), padding: "18px", marginBottom: px(20), position: "relative", overflow: "hidden" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { position: "absolute", top: 0, right: 0, width: px(150), height: px(150), background: "radial-gradient(circle at top right, rgba(200,75,12,.15), transparent 70%)", pointerEvents: "none" } }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: px(8) }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.mono, fontSize: px(10), color: C.textMuted, marginBottom: px(4) }, children: "ACTIVE APPLICATION" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.serif, fontWeight: 700, fontSize: px(18), color: C.textPrimary }, children: "MUDRA Tarun Loan" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { background: "rgba(245,166,35,.1)", border: `1px solid ${C.amber}`, color: C.amber, fontFamily: F.mono, fontSize: px(9), padding: "4px 8px", borderRadius: px(6), fontWeight: 700 }, children: "IN REVIEW" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { marginTop: px(16), marginBottom: px(16) }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", justifyContent: "space-between", fontFamily: F.sans, fontSize: px(11), color: C.textPrimary, marginBottom: px(6) }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Progress: 35%" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { color: C.textMuted }, children: "Step 2 of 4" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { height: px(6), background: C.card2, borderRadius: px(3), overflow: "hidden" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: "35%", height: "100%", background: `linear-gradient(90deg, ${C.clay}, ${C.amber})`, borderRadius: px(3) } }) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative", paddingTop: px(8) }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { position: "absolute", top: px(14), left: px(10), right: px(10), height: px(2), background: C.card2, zIndex: 0 } }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { position: "absolute", top: px(14), left: px(10), width: "35%", height: px(2), background: C.clay, zIndex: 0 } }),
            [
              { l: "Applied", s: 2, c: C.clay },
              { l: "Docs", s: 1, c: C.amber },
              { l: "Review", s: 0, c: C.border },
              { l: "Approved", s: 0, c: C.border }
            ].map((st, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: px(6), zIndex: 1, width: px(40) }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: px(14), height: px(14), borderRadius: "50%", background: st.s === 2 ? C.clay : st.s === 1 ? C.card1 : C.bg, border: `2px solid ${st.c}`, display: "flex", alignItems: "center", justifyContent: "center", animation: st.s === 1 ? "dotP 1.5s infinite" : "none" }, children: st.s === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: px(6), height: px(6), borderRadius: "50%", background: C.amber } }) }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontFamily: F.sans, fontSize: px(9), color: st.s > 0 ? C.textPrimary : C.textMuted, textAlign: "center" }, children: st.l })
            ] }, i))
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: px(12), marginBottom: px(24) }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { style: { background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(12), padding: "12px 14px", display: "flex", alignItems: "center", gap: px(10) }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: px(32), height: px(32), borderRadius: px(10), background: "rgba(76,201,160,.12)", display: "flex", alignItems: "center", justifyContent: "center" }, children: I.plus(C.teal, 16) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontFamily: F.sans, fontWeight: 600, fontSize: px(13), color: C.textPrimary }, children: "Upload Docs" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { style: { background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(12), padding: "12px 14px", display: "flex", alignItems: "center", gap: px(10) }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: px(32), height: px(32), borderRadius: px(10), background: "rgba(200,75,12,.12)", display: "flex", alignItems: "center", justifyContent: "center" }, children: I.person(C.clay, 16) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontFamily: F.sans, fontWeight: 600, fontSize: px(13), color: C.textPrimary }, children: "Chat Agent" })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { background: "linear-gradient(90deg, #1C2A23, #2A170C)", border: `1px solid ${C.border}`, borderRadius: px(12), padding: "16px", marginBottom: px(30), display: "flex", justifyContent: "space-between" }, children: [["\u20B947Cr+", "Disbursed"], ["50K+", "Customers"], ["98%", "Success"]].map(([v, l], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { textAlign: "center" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.mono, fontWeight: 700, fontSize: px(15), color: "#fff", marginBottom: px(2) }, children: v }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.sans, fontSize: px(10), color: "rgba(255,255,255,.7)" }, children: l })
        ] }, i)) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: px(12) }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: px(8) }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontSize: px(18) }, children: "\u{1F4F9}" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontFamily: F.serif, fontWeight: 700, fontSize: px(16), color: C.textPrimary }, children: "Video Library" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: { background: "none", color: C.clay, fontFamily: F.sans, fontSize: px(12), fontWeight: 600 }, children: "View all \u2192" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "flex", overflowX: "auto", gap: px(12), paddingBottom: px(8), marginBottom: px(24) }, children: [
          { t: "How MUDRA Loan Works", d: "3:45", c: "linear-gradient(135deg, rgb(162, 53, 2) 0%, rgb(40, 14, 2) 100%)" },
          { t: "Business Loan Guide 2024", d: "5:20", c: "linear-gradient(135deg, rgb(30, 114, 88) 0%, rgb(11, 40, 31) 100%)" },
          { t: "Zero Collateral Schemes", d: "2:15", c: "linear-gradient(135deg, rgb(151, 99, 13) 0%, rgb(38, 25, 3) 100%)" }
        ].map((v, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { width: px(140), flexShrink: 0 }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { width: "100%", height: px(80), background: v.c, borderRadius: px(12), position: "relative", marginBottom: px(8), display: "flex", alignItems: "center", justifyContent: "center" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: px(30), height: px(30), borderRadius: "50%", background: "rgba(255,255,255,.2)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center" }, children: I.play("#fff", 14) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { position: "absolute", bottom: px(6), right: px(6), background: "rgba(0,0,0,.6)", color: "#fff", fontFamily: F.mono, fontSize: px(9), padding: "2px 6px", borderRadius: px(4) }, children: v.d })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.sans, fontWeight: 600, fontSize: px(12), color: C.textPrimary, lineHeight: 1.3 }, children: v.t })
        ] }, i)) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: px(8), marginBottom: px(12) }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontSize: px(18) }, children: "\u{1F4AC}" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontFamily: F.serif, fontWeight: 700, fontSize: px(16), color: C.textPrimary }, children: "Success Stories" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "flex", flexDirection: "column", gap: px(12), marginBottom: px(30) }, children: [
          { n: "Priya Sharma", l: "Mumbai", s: "\u20B98L MUDRA Tarun", q: "Got loan in 6 days. The documentation help was incredible." },
          { n: "Ramkumar", l: "Chennai", s: "\u20B93L PM SVANidhi", q: "As a street vendor, I never thought I'd get a proper bank loan." },
          { n: "Sunita Devi", l: "Delhi", s: "\u20B95L CGTMSE", q: "My tailoring shop expanded thanks to Loan Doctor's guidance." }
        ].map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(14), padding: "14px" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: px(8) }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: px(8) }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: px(30), height: px(30), borderRadius: "50%", background: C.card2, display: "flex", alignItems: "center", justifyContent: "center", color: C.textPrimary, fontFamily: F.serif, fontWeight: 700, fontSize: px(13) }, children: s.n.charAt(0) }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.sans, fontWeight: 600, fontSize: px(13), color: C.textPrimary }, children: s.n }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { fontFamily: F.sans, fontSize: px(10), color: C.textMuted }, children: [
                  s.l,
                  " \xB7 ",
                  s.s
                ] })
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "flex" }, children: [1, 2, 3, 4, 5].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: I.star(C.amber, 10) }, x)) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { fontFamily: F.sans, fontSize: px(12), color: C.textMuted, fontStyle: "italic", lineHeight: 1.4 }, children: [
            '"',
            s.q,
            '"'
          ] })
        ] }, i)) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: px(8), marginBottom: px(12) }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontSize: px(18) }, children: "\u{1F525}" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontFamily: F.serif, fontWeight: 700, fontSize: px(16), color: C.textPrimary }, children: "Live Scheme Offers" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "flex", overflowX: "auto", gap: px(12), paddingBottom: px(8), marginBottom: px(30) }, children: [
          { t: "MUDRA Tarun", b: "\u{1F525} Ends in 2 days", bc: C.clay },
          { t: "PM SVANidhi", b: "\u26A1 Limited slots", bc: C.amber }
        ].map((o, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { width: px(200), flexShrink: 0, background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(14), padding: "14px", position: "relative" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { position: "absolute", top: px(-10), left: px(14), background: C.bg, border: `1px solid ${o.bc}`, color: o.bc, fontFamily: F.mono, fontSize: px(9), padding: "4px 8px", borderRadius: px(6), animation: "pulse 2s infinite" }, children: o.b }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { marginTop: px(10), fontFamily: F.serif, fontWeight: 700, fontSize: px(16), color: C.textPrimary, marginBottom: px(4) }, children: o.t }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.sans, fontSize: px(11), color: C.textMuted, marginBottom: px(12) }, children: "Low documentation, fast approval." }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: { ...ghostCta(), padding: "6px 14px", height: "auto", fontSize: px(12) }, children: "Check Eligibility \u2192" })
        ] }, i)) })
      ] })
    ] });
  }
  function S13({ setActiveD, setSheet }) {
    const [anim, setAnim] = (0, import_react.useState)(0);
    (0, import_react.useEffect)(() => {
      setTimeout(() => setAnim(35), 300);
    }, []);
    const dList = [
      { id: "adhar", n: "Aadhaar Card", s: true },
      { id: "pan", n: "PAN Card", s: true },
      { id: "bank", n: "Bank Statement", s: false, w: "6 months continuous statements required." },
      { id: "business", n: "Business Proof", s: false }
    ];
    const up = dList.filter((d) => d.s).length;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "sc", style: { height: "100%", background: C.bg, display: "flex", flexDirection: "column" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SB, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { padding: "0 16px 14px", display: "flex", alignItems: "center", borderBottom: `1px solid ${C.border}` }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.serif, fontWeight: 700, fontSize: px(18), color: C.textPrimary }, children: "Application Dashboard" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { flex: 1, overflowY: "auto", padding: "16px 16px 100px" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(16), padding: "18px", marginBottom: px(24) }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: px(8) }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.mono, fontSize: px(10), color: C.textMuted, marginBottom: px(4) }, children: "MY APPLICATION" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.serif, fontWeight: 700, fontSize: px(20), color: C.textPrimary, marginBottom: px(8) }, children: "MUDRA Tarun Loan" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { display: "inline-block", background: "rgba(237,240,232,.08)", borderRadius: px(6), padding: "4px 8px", fontFamily: F.mono, fontSize: px(10), color: C.textPrimary, border: `1px solid ${C.border}` }, children: "Case: LD-2024-038" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { background: "rgba(245,166,35,.1)", border: `1px solid ${C.amber}`, color: C.amber, fontFamily: F.mono, fontSize: px(9), padding: "4px 8px", borderRadius: px(6), fontWeight: 700 }, children: "IN REVIEW" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { marginTop: px(20) }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", justifyContent: "space-between", fontFamily: F.sans, fontSize: px(12), color: C.textPrimary, marginBottom: px(8) }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontWeight: 600 }, children: "Step 2 of 4 \u2014 Document Verification" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: { color: C.amber, fontWeight: 700 }, children: [
                anim,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { height: px(8), background: C.card2, borderRadius: px(4), overflow: "hidden" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: `${anim}%`, height: "100%", background: `linear-gradient(90deg, ${C.clay}, ${C.amber})`, borderRadius: px(4), transition: "width 1s cubic-bezier(.16,1,.3,1)" } }) })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.serif, fontWeight: 700, fontSize: px(18), color: C.textPrimary, marginBottom: px(16) }, children: "Application Journey" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(16), padding: "20px 16px", marginBottom: px(24) }, children: [
          { t: "Application Submitted", d: "Mar 1, 2024 \xB7 10:32 AM", s: "done" },
          { t: "Payment Received \u20B9999", d: "Mar 1, 2024 \xB7 10:35 AM", s: "done" },
          {
            t: "Document Verification",
            d: `In progress \u2014 ${up} of 4 documents uploaded`,
            s: "curr",
            sub: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { marginTop: px(10), background: C.bg, border: `1px solid ${C.border}`, borderRadius: px(10), padding: "12px" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "flex", flexWrap: "wrap", gap: px(6), marginBottom: px(10) }, children: dList.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: px(4), background: d.s ? "rgba(76,201,160,.1)" : C.card2, border: `1px solid ${d.s ? C.teal : C.border}`, padding: "4px 8px", borderRadius: px(6) }, children: [
                d.s ? I.check(C.teal, 10) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { color: C.clay, fontSize: px(10) }, children: "\u2717" }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontFamily: F.sans, fontSize: px(10), color: d.s ? C.teal : C.textMuted }, children: d.id.toUpperCase() })
              ] }, i)) }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => {
                setActiveD("bank");
                setSheet(true);
              }, style: { background: "transparent", border: `1px solid ${C.clay}`, color: C.clay, padding: "6px 12px", borderRadius: px(6), fontFamily: F.sans, fontSize: px(11), fontWeight: 600 }, children: "Upload Missing Docs \u2192" })
            ] })
          },
          { t: "Loan Disbursement", d: "Expected: 5\u20137 working days after approval", s: "wait" }
        ].map((s, i, arr) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: px(16), position: "relative", paddingBottom: i === arr.length - 1 ? 0 : px(24) }, children: [
          i !== arr.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { position: "absolute", top: px(24), left: px(11), bottom: 0, width: px(2), background: s.s === "done" ? C.teal : C.border } }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { width: px(24), height: px(24), borderRadius: "50%", background: s.s === "done" ? C.teal : s.s === "curr" ? "rgba(245,166,35,.2)" : C.card2, border: s.s === "curr" ? `2px solid ${C.amber}` : `1px solid ${s.s === "done" ? C.teal : C.border}`, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1, flexShrink: 0 }, children: [
            s.s === "done" && I.check("#111510", 12),
            s.s === "curr" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: px(8), height: px(8), borderRadius: "50%", background: C.amber, animation: "blink 1.5s infinite" } })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { paddingTop: px(2), flex: 1 }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.sans, fontWeight: 600, fontSize: px(14), color: s.s === "wait" ? C.textMuted : C.textPrimary, marginBottom: px(4) }, children: s.t }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.sans, fontSize: px(11), color: C.textMuted }, children: s.d }),
            s.sub && s.sub
          ] })
        ] }, i)) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: px(16) }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.serif, fontWeight: 700, fontSize: px(18), color: C.textPrimary }, children: "Document Checklist" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { fontFamily: F.mono, fontSize: px(11), color: C.amber, fontWeight: 700 }, children: [
            up,
            " of ",
            dList.length,
            " Uploaded"
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "flex", flexDirection: "column", gap: px(12), marginBottom: px(24) }, children: dList.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { background: C.card1, border: `1.5px solid ${d.s ? C.teal : C.border}`, borderRadius: px(14), padding: "16px", transition: "border .3s" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: px(12) }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: px(40), height: px(40), borderRadius: px(10), background: d.s ? "rgba(76,201,160,.1)" : C.card2, display: "flex", alignItems: "center", justifyContent: "center" }, children: I.doc(d.s ? C.teal : C.textMuted, 20) }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.sans, fontWeight: 600, fontSize: px(14), color: C.textPrimary, marginBottom: px(2) }, children: d.n }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.sans, fontSize: px(11), color: d.s ? C.teal : C.textMuted }, children: d.s ? "Verified" : "Pending Action" })
              ] })
            ] }),
            d.s ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: px(28), height: px(28), borderRadius: "50%", background: C.teal, display: "flex", alignItems: "center", justifyContent: "center", animation: "popIn .3s" }, children: I.check("#111510", 14) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => {
              setActiveD(d.id);
              setSheet(true);
            }, style: { background: "rgba(200,75,12,.1)", color: C.clay, border: `1px solid ${C.clay}`, borderRadius: px(8), padding: "8px 14px", fontFamily: F.sans, fontWeight: 600, fontSize: px(12) }, children: "Upload" })
          ] }),
          d.w && !d.s && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: px(8), marginTop: px(14), padding: "10px 12px", background: "rgba(245,166,35,.08)", borderRadius: px(10), border: `1px solid rgba(245,166,35,.2)` }, children: [
            I.info(C.amber, 14),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontFamily: F.sans, fontSize: px(11), color: C.textPrimary, lineHeight: 1.4 }, children: d.w })
          ] })
        ] }, d.id)) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: px(10), justifyContent: "center", marginBottom: px(24) }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: px(24), height: px(24), borderRadius: "50%", background: "rgba(237,240,232,.1)", display: "flex", alignItems: "center", justifyContent: "center" }, children: I.check(C.textMuted, 10) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontFamily: F.sans, fontSize: px(11), color: C.textMuted }, children: "All documents are 256-bit encrypted" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: { ...cta(up === dList.length ? C.clay : C.card2), opacity: up === dList.length ? 1 : 0.5, marginBottom: px(30) }, children: "Submit All Documents" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.serif, fontWeight: 700, fontSize: px(18), color: C.textPrimary, marginBottom: px(16) }, children: "Recent Updates" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: px(12) }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { background: C.card1, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.clay}`, borderRadius: px(12), padding: "16px" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: px(6) }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontFamily: F.sans, fontWeight: 600, fontSize: px(13), color: C.textPrimary }, children: "Action required: Upload Bank Statement" }) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.sans, fontSize: px(11), color: C.textMuted }, children: "Today" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { background: C.card1, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.teal}`, borderRadius: px(12), padding: "16px" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: px(6) }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontFamily: F.sans, fontWeight: 600, fontSize: px(13), color: C.textPrimary }, children: "Documents received" }) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.sans, fontSize: px(11), color: C.textMuted }, children: "Mar 2 \xB7 9:41 AM" })
          ] })
        ] })
      ] })
    ] });
  }
  function S14() {
    const msgs = [
      { t: "sys", date: "Today, 10:14 AM", text: "Case LD-2024-038 registered. Ramesh K. assigned as your agent." },
      { t: "agent", time: "10:15", text: "Namaste Rahul ji! Please upload your Bank Statement in the documentation tab so we can proceed.", name: "Ramesh K." },
      { t: "user", time: "10:22", text: "Done, 6 months statement uploaded \u{1F44D}" },
      { t: "sys", text: "Documents received. Under review. ETA: 3\u20135 working days." }
    ];
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "sc", style: { height: "100%", background: C.bg, display: "flex", flexDirection: "column" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SB, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { padding: "8px 16px 12px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: px(12) }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { position: "relative" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: px(38), height: px(38), borderRadius: "50%", background: C.card1, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: px(14), color: C.textPrimary }, children: "RK" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { position: "absolute", bottom: px(1), right: px(1), width: px(9), height: px(9), borderRadius: "50%", background: C.teal, border: `1.5px solid ${C.bg}` } })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.sans, fontWeight: 700, fontSize: px(15), color: C.textPrimary }, children: "Ramesh K." }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.sans, fontSize: px(11), color: C.textMuted }, children: "Loan Agent" })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: px(16) }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: { background: "none" }, children: I.call(C.textPrimary, 18) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: { background: "none" }, children: I.video(C.textPrimary, 18) })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { background: "rgba(200,75,12,.05)", borderBottom: `1px solid rgba(200,75,12,.1)`, padding: "8px", textAlign: "center" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontFamily: F.mono, fontSize: px(10), color: C.clay }, children: "CASE REFERENCE: LD-2024-038" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { flex: 1, overflowY: "auto", padding: "16px 16px 80px", display: "flex", flexDirection: "column", gap: px(14) }, children: msgs.map((m, i) => {
        if (m.t === "sys") {
          return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { width: "100%", textAlign: "center", margin: "8px 0", animation: `msgIn .22s ease both ${i * 0.1}s` }, children: [
            m.date && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.mono, fontSize: px(9), color: C.textMuted, marginBottom: px(10) }, children: m.date }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "inline-block", background: "rgba(76,201,160,.12)", color: C.teal, padding: "6px 12px", borderRadius: px(12), fontFamily: F.sans, fontSize: px(10), maxWidth: "85%" }, children: m.text })
          ] }, i);
        }
        const isUsr = m.t === "user";
        return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", flexDirection: "column", alignItems: isUsr ? "flex-end" : "flex-start", animation: `msgIn .22s ease both ${i * 0.1}s` }, children: [
          !isUsr && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.sans, fontSize: px(10), color: C.textMuted, marginBottom: px(4), marginLeft: px(4) }, children: m.name }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { maxWidth: "78%", background: isUsr ? "rgba(200,75,12,.12)" : C.card1, border: `1px solid ${isUsr ? "rgba(200,75,12,.2)" : C.border}`, borderRadius: isUsr ? "12px 12px 3px 12px" : "3px 12px 12px 12px", padding: "10px 12px" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.sans, fontSize: px(13), color: C.textPrimary, lineHeight: 1.4 }, children: m.text }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.mono, fontSize: px(9), color: C.textMuted, marginTop: px(4), textAlign: isUsr ? "right" : "left" }, children: m.time })
          ] })
        ] }, i);
      }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { position: "absolute", bottom: px(62), left: 0, right: 0, padding: "10px 16px", background: C.bg, borderTop: `1px solid ${C.border}` }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: px(8), alignItems: "center" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: px(36), height: px(36), borderRadius: "50%", background: C.card1, display: "flex", alignItems: "center", justifyContent: "center" }, children: I.cross(C.textPrimary, 16) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { flex: 1, height: px(40), background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(20), display: "flex", alignItems: "center", padding: "0 14px" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontFamily: F.sans, fontSize: px(12), color: C.textMuted }, children: "Type a message\u2026" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: { width: px(36), height: px(36), borderRadius: "50%", background: C.clay, display: "flex", alignItems: "center", justifyContent: "center" }, children: I.mic("#fff", 16) })
      ] }) })
    ] });
  }
  function S15() {
    const [notif, setNotif] = (0, import_react.useState)(true);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "sc", style: { height: "100%", background: C.bg, display: "flex", flexDirection: "column" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SB, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { flex: 1, overflowY: "auto", padding: "8px 16px 90px" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: px(16), marginBottom: px(24) }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: px(70), height: px(70), borderRadius: px(20), background: C.card1, border: `2px solid ${C.clay}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F.serif, fontWeight: 700, fontSize: px(26), color: C.textPrimary }, children: "RK" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { flex: 1 }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.serif, fontWeight: 700, fontSize: px(20), color: C.textPrimary, marginBottom: px(2) }, children: "Rahul Kumar" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.sans, fontSize: px(13), color: C.textMuted, marginBottom: px(8) }, children: "+91 98765 43210" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: { background: "rgba(237,240,232,.08)", borderRadius: px(6), padding: "4px 10px", fontFamily: F.sans, fontWeight: 600, fontSize: px(10), color: C.textPrimary }, children: "Edit Profile" })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { background: "linear-gradient(135deg, rgba(200,75,12,.1), transparent)", border: `1px solid rgba(200,75,12,.2)`, borderRadius: px(16), padding: "16px", marginBottom: px(24) }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: px(8) }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontFamily: F.mono, fontSize: px(9), color: C.clay }, children: "ACTIVE APP" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontFamily: F.mono, fontSize: px(9), color: C.amber }, children: "IN REVIEW" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.serif, fontWeight: 700, fontSize: px(16), color: C.textPrimary, marginBottom: px(10) }, children: "MUDRA Tarun Loan" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { height: px(4), background: "rgba(0,0,0,.3)", borderRadius: px(2), overflow: "hidden" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: "35%", height: "100%", background: C.clay } }) })
        ] }),
        [
          {
            t: "ACCOUNT",
            items: [
              ["Language", "English (India)", null, true],
              ["Push Notifications", null, notif, false, () => setNotif(!notif)],
              ["Update Mobile Number", null, null, true]
            ]
          },
          {
            t: "SUPPORT",
            items: [
              ["Contact Dedicated Agent", null, null, true],
              ["Help & FAQ", null, null, true],
              ["Report an Issue", null, null, true]
            ]
          },
          {
            t: "LEGAL",
            items: [
              ["Privacy Policy", null, null, true],
              ["Terms of Service", null, null, true]
            ]
          }
        ].map((g, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { marginBottom: px(24) }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.mono, fontSize: px(9), color: C.textMuted, marginBottom: px(10), paddingLeft: px(4), letterSpacing: "1px" }, children: g.t }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { background: C.card1, border: `1px solid ${C.border}`, borderRadius: px(12), overflow: "hidden" }, children: g.items.map(([l, r, tog, chev, cb], ii) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { onClick: cb, style: { padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: ii < g.items.length - 1 ? `1px solid ${C.border}` : "none", cursor: cb ? "pointer" : "default" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontFamily: F.sans, fontWeight: 500, fontSize: px(13), color: C.textPrimary }, children: l }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: px(8) }, children: [
              r && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontFamily: F.sans, fontSize: px(11), color: C.textMuted }, children: r }),
              tog !== null && tog !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: px(38), height: px(22), borderRadius: px(11), background: tog ? C.clay : C.card2, border: `1px solid ${tog ? C.clay : C.border}`, position: "relative", cursor: "pointer", transition: "all .2s" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { position: "absolute", top: px(2), left: tog ? px(18) : px(2), width: px(16), height: px(16), borderRadius: "50%", background: "#fff", transition: "all .2s cubic-bezier(.16,1,.3,1)" } }) }),
              chev && I.chevron(C.textMuted, 14)
            ] })
          ] }, ii)) })
        ] }, i)),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: { ...ghostCta(), border: "none", color: "rgba(245,166,35,.8)" }, children: "Log Out" })
      ] })
    ] });
  }
  function App() {
    const [scr, setScr] = (0, import_react.useState)("s01");
    const [hist, setHist] = (0, import_react.useState)([]);
    const [hasPurchase, setHasPurchase] = (0, import_react.useState)(false);
    const [navTab, setNavTab] = (0, import_react.useState)("home");
    const [schemeData, setSchemeData] = (0, import_react.useState)(null);
    const [cameraOpen, setCameraOpen] = (0, import_react.useState)(false);
    const [, setActiveD] = (0, import_react.useState)(null);
    const [aiModalOpen, setAiModalOpen] = (0, import_react.useState)(false);
    const [selectedSlot, setSelectedSlot] = (0, import_react.useState)(null);
    const go = (s) => {
      if (s === "s07" && hasPurchase && navTab !== "chat") {
        setAiModalOpen(true);
        return;
      }
      setHist((h) => [...h, scr]);
      setScr(s);
    };
    const back = () => {
      if (hist.length > 0) {
        const p = hist[hist.length - 1];
        setHist((h) => h.slice(0, -1));
        setScr(p);
      }
    };
    const isMainApp = ["main_home", "myapp", "chat", "profile", "schemes"].includes(scr);
    const renderScr = () => {
      switch (scr) {
        case "s01":
          return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(S01, { go });
        case "s02":
          return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(S02, { go });
        case "s03":
          return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(S03, { go });
        case "s04":
          return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(S04, { go });
        case "home_new":
          return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeNew, { go });
        case "schemes_browse":
          return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SchemesBrowser, { go, back, setSchemeData, inMainApp: false });
        case "scheme_detail":
          return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SchemeDetail, { go, back, data: schemeData, showSpec: !hasPurchase });
        case "s06":
          return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(S06, { go, back });
        case "s07":
          return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(S07, { go, back, setSchemeData, isOverlay: false });
        case "specialist_confirm":
          return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpecialistConfirm, { go, back, data: schemeData, setSelectedSlot });
        case "specialist_booked":
          return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpecialistBooked, { go, selectedSlot });
        case "s09":
          return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(S09, { go, back });
        case "s10":
          return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(S10, { go });
        case "payment":
          return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Payment, { go, back });
        case "pay_success":
          return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaySuccess, { go: (s) => {
            setHasPurchase(true);
            setNavTab("home");
            setScr(s);
            setHist([]);
          } });
        case "main_home":
          return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(S11, { go, hasPurchase });
        case "myapp":
          return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(S13, { setActiveD, setSheet: setCameraOpen });
        case "chat":
          return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(S14, {});
        case "profile":
          return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(S15, {});
        case "schemes":
          return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SchemesBrowser, { go, back, setSchemeData, inMainApp: true });
        default:
          return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(S01, { go });
      }
    };
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { width: "100vw", height: "100vh", background: "#000", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F.sans }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: CSS }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { width: px(375), height: px(812), background: C.bg, borderRadius: px(46), overflow: "hidden", boxShadow: "0 24px 80px rgba(0,0,0,.7),0 0 0 1px rgba(255,255,255,.07)", position: "relative", flexShrink: 0 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { position: "absolute", top: px(12), left: "50%", transform: "translateX(-50%)", width: px(116), height: px(32), background: "#000", borderRadius: px(20), zIndex: 999, pointerEvents: "none" } }),
        renderScr(),
        isMainApp && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BNav, { active: navTab, onNav: (t) => {
          setNavTab(t);
          setScr(t === "home" ? "main_home" : t);
        }, hasPurchase }),
        isMainApp && navTab !== "chat" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { position: "absolute", bottom: px(74), right: px(20), display: "flex", alignItems: "center", gap: px(10), zIndex: 99 }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { background: C.card1, color: C.textPrimary, padding: "6px 12px", borderRadius: px(16), border: `1px solid ${C.border}`, fontFamily: F.sans, fontSize: px(12), fontWeight: 600, boxShadow: "0 4px 15px rgba(0,0,0,.5)" }, children: "Ask AI" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => setAiModalOpen(true), style: { width: px(52), height: px(52), borderRadius: "50%", background: C.clay, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 15px rgba(200,75,12,.4)", animation: "fabP 2s infinite" }, children: I.mic("#fff", 20) })
        ] }),
        cameraOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { position: "absolute", inset: 0, zIndex: 9999, display: "flex", flexDirection: "column" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { onClick: () => setCameraOpen(false), style: { flex: 1, background: "rgba(0,0,0,.6)", backdropFilter: "blur(4px)" } }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { position: "absolute", bottom: 0, left: 0, right: 0, background: C.card1, borderRadius: "24px 24px 0 0", padding: "20px 16px 30px", zIndex: 11, animation: "slideUp .4s cubic-bezier(.16,1,.3,1)" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: px(40), height: px(4), background: C.card2, borderRadius: px(2), margin: "0 auto 20px" } }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.sans, fontWeight: 700, fontSize: px(16), color: C.textPrimary, marginBottom: px(20), textAlign: "center" }, children: "Upload Document" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { onClick: () => setCameraOpen(false), style: { width: "100%", height: px(56), background: C.card2, borderRadius: px(14), display: "flex", alignItems: "center", gap: px(14), padding: "0 20px", marginBottom: px(12) }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: px(36), height: px(36), borderRadius: "50%", background: "rgba(237,240,232,.08)", display: "flex", alignItems: "center", justifyContent: "center" }, children: I.wa(C.textPrimary, 16) }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { textAlign: "left" }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.sans, fontWeight: 600, fontSize: px(14), color: C.textPrimary }, children: "Take Photo" }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.sans, fontSize: px(11), color: C.textMuted }, children: "Use your camera to scan" })
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { onClick: () => setCameraOpen(false), style: { width: "100%", height: px(56), background: C.card2, borderRadius: px(14), display: "flex", alignItems: "center", gap: px(14), padding: "0 20px" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: px(36), height: px(36), borderRadius: "50%", background: "rgba(237,240,232,.08)", display: "flex", alignItems: "center", justifyContent: "center" }, children: I.doc(C.textPrimary, 16) }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { textAlign: "left" }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.sans, fontWeight: 600, fontSize: px(14), color: C.textPrimary }, children: "Upload File" }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: F.sans, fontSize: px(11), color: C.textMuted }, children: "Choose from files or gallery" })
              ] })
            ] })
          ] })
        ] }),
        aiModalOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { position: "absolute", inset: 0, zIndex: 9998, animation: "slideUp .3s ease" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(S07, { go, back, setSchemeData, isOverlay: true, onCloseModal: () => setAiModalOpen(false) }) })
      ] })
    ] });
  }

  // test_render.mjs
  try {
    const html = (0, import_server.renderToString)(import_react2.default.createElement(App, null));
    console.log("Render successful!");
  } catch (e) {
    console.error("Render failed:");
    console.error(e);
  }
})();
