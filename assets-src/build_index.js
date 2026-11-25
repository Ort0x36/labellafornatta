// Gera ../index.html com os desenhos da marca (assets-src/marca.js) embutidos como SVG estático.
// Uso: node assets-src/build_index.js
const fs = require("fs"), path = require("path");
const ROOT = path.resolve(__dirname, "..");
const LBF = require("./marca.js");
const C = LBF.C;

// Domínio da prévia na Vercel. CONFIRMAR depois de criar o projeto e regerar (og:url, og:image, canonical).
const SITE = "https://labellafornatta.vercel.app/";
// Suba este número sempre que a og-image.png mudar: o WhatsApp guarda a imagem antiga pelo endereço.
const OG_VER = 2;
const IFOOD = "https://www.ifood.com.br/delivery/maua-sp/la-bella-fornatta-parque-sao-vicente/b04e8f4f-8357-41e1-bc24-af1fcfe14ce4";
const INSTAGRAM = "https://www.instagram.com/labellafornatta/";
const MAPS = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Padaria La Bella Fornatta, R. Clarisse de Jesus Lázaro Bedeschi, 231A, Mauá - SP");
const WAZE = "https://www.waze.com/live-map/directions/padaria-la-bella-fornatta-r.-clarisse-de-jesus-lazaro-bedeschi-231-maua?to=place.w.205456923.2054765841.15922081";

const seal = (a) => LBF.seal(a);
const ill = (k, cls) => LBF.ill(k, 'class="' + (cls || "il") + '"');
const wheat = (cls) => '<svg class="' + cls + '" viewBox="0 0 60 120" aria-hidden="true">' + LBF.wheat("currentColor", 1.5) + "</svg>";
const ICON = {
  pin: '<g fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 36s-11-10-11-19a11 11 0 0 1 22 0c0 9-11 19-11 19z"/><circle cx="21" cy="17" r="4"/></g>',
  clock: '<g fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="21" cy="21" r="13"/><path d="M21 13v8l5 4"/></g>',
  phone: '<path d="M12 7h5l2.5 7-3.5 2.5a19 19 0 0 0 9.5 9.5l2.5-3.5 7 2.5v5a3 3 0 0 1-3 3C18.5 33 9 23.5 9 10a3 3 0 0 1 3-3z" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/>',
  star: '<path d="M21 6.5l4.3 8.8 9.7 1.4-7 6.8 1.7 9.6L21 28.6l-8.7 4.5 1.7-9.6-7-6.8 9.7-1.4z" fill="currentColor"/>',
  bag: '<g fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><path d="M9 14h24l-2 21H11z"/><path d="M15 14v-2a6 6 0 0 1 12 0v2" stroke-linecap="round"/></g>',
  moto: '<g fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="29" r="5"/><circle cx="32" cy="29" r="5"/><path d="M16 29h10l4-10h-7M26 19l-3-6h-5M11 24l5-5h7"/></g>',
  chat: '<path d="M9 10h24a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3H18l-7 6v-6H9a3 3 0 0 1-3-3V13a3 3 0 0 1 3-3z" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/>',
  ig: '<g fill="none" stroke="currentColor" stroke-width="2.2"><rect x="8" y="8" width="26" height="26" rx="8"/><circle cx="21" cy="21" r="6"/><circle cx="29" cy="13" r="1" fill="currentColor"/></g>',
  arrow: '<path d="M10 21h21M23 13l8 8-8 8" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>'
};
const ic = (k, cls) => '<svg class="' + (cls || "ic") + '" viewBox="0 0 42 42" aria-hidden="true">' + ICON[k] + "</svg>";
const WA = '<svg class="wa-i" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm5.2 14c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.3 0 .5l-.4.6c-.1.1-.3.3-.1.6.7 1.1 1.5 1.8 2.6 2.4.3.1.5.1.6-.1l.8-1c.2-.2.4-.2.6-.1l1.9.9c.3.1.4.2.5.3.1.3.1.8-.1 1.4z"/></svg>';
const stars = '<span class="stars" aria-hidden="true">' + ic("star", "st").repeat(4) + '<span class="st-p">' + ic("star", "st") + "</span></span>";

// Fachada ilustrada (inspirada na fachada real: vitrine de vidro e placa com arabescos).
const facade = `<svg class="facade" viewBox="0 0 520 360" aria-hidden="true">
 <rect x="0" y="0" width="520" height="360" fill="var(--massa)"/>
 <g fill="none" stroke="var(--line2)" stroke-width="1.2" opacity=".9">${Array.from({ length: 9 }, (_, r) => Array.from({ length: 9 }, (_, c) => `<rect x="${(c * 64) - (r % 2 ? 32 : 0)}" y="${r * 26}" width="64" height="26"/>`).join("")).join("")}</g>
 <rect x="40" y="38" width="440" height="78" rx="6" fill="${C.cacauD}"/>
 <g fill="none" stroke="${C.trigo}" stroke-width="1.6" stroke-linecap="round"><path d="M86 70c-10-10-28-4-24 6 3 7 13 4 10-1M434 70c10-10 28-4 24 6-3 7-13 4-10-1"/><path d="M170 98h180M210 104h100" opacity=".7"/></g>
 <text x="260" y="86" text-anchor="middle" font-family="Jost, sans-serif" font-weight="500" font-size="23" letter-spacing="4" fill="${C.creme}">LA BELLA FORNATTA</text>
 <rect x="40" y="124" width="440" height="236" fill="${C.cacau}"/>
 <g fill="#F7E7CF" opacity=".95"><rect x="56" y="140" width="128" height="200" rx="3"/><rect x="196" y="140" width="128" height="200" rx="3"/><rect x="336" y="140" width="128" height="200" rx="3"/></g>
 <g class="glow"><rect x="56" y="140" width="408" height="200" fill="url(#gl)"/></g>
 <defs><linearGradient id="gl" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>
 <g fill="none" stroke="${C.cacau}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M66 214h108M66 270h108M346 214h108M346 270h108"/>
  <path d="M74 214c0-12 10-18 22-18s22 6 22 18M126 214c0-10 8-15 18-15s18 5 18 15"/>
  <path d="M78 270c2-10 8-14 14-15 2-8 7-11 11-11s9 3 11 11c6 1 12 5 14 15"/><path d="M136 270v-22h28v22M136 256h28"/>
  <path d="M352 214c0-8 10-12 24-12s24 4 24 12M408 214v-20l38 0v20M408 204h38"/>
  <path d="M356 270h40v-14h-40zM404 270c0-14 10-22 24-22s24 8 24 22"/>
  <path d="M226 340V188a34 34 0 0 1 68 0v152"/><circle cx="282" cy="268" r="3" fill="${C.cacau}"/>
 </g>
 <g fill="none" stroke="${C.cobre}" stroke-width="1.4"><path d="M236 196a24 24 0 0 1 48 0"/></g>
</svg>`;

const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<!-- Prévia: não indexar até a La Bella Fornatta aprovar. Remova esta linha na publicação oficial. -->
<meta name="robots" content="noindex, nofollow">
<title>La Bella Fornatta | Padaria e restaurante em Mauá/SP</title>
<meta name="description" content="Padaria, confeitaria e restaurante no Parque São Vicente, em Mauá/SP. Café da manhã, buffet, sopas e caldos, beirutes e sobremesas, das 6h30 às 21h30. Peça pelo WhatsApp ou pelo iFood.">
<link rel="canonical" href="${SITE}">
<meta property="og:site_name" content="La Bella Fornatta">
<meta property="og:title" content="La Bella Fornatta | Padaria e restaurante em Mauá">
<meta property="og:description" content="Do pão da manhã ao caldo da noite. Das 6h30 às 21h30, no Parque São Vicente. Peça pelo WhatsApp ou pelo iFood.">
<meta property="og:type" content="website">
<meta property="og:locale" content="pt_BR">
<meta property="og:url" content="${SITE}">
<meta property="og:image" content="${SITE}og-image.png?v=${OG_VER}">
<meta property="og:image:secure_url" content="${SITE}og-image.png?v=${OG_VER}">
<meta property="og:image:type" content="image/png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="La Bella Fornatta, padaria e restaurante em Mauá/SP">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="La Bella Fornatta | Padaria e restaurante em Mauá">
<meta name="twitter:description" content="Do pão da manhã ao caldo da noite. Das 6h30 às 21h30, no Parque São Vicente.">
<meta name="twitter:image" content="${SITE}og-image.png?v=${OG_VER}">
<meta name="theme-color" content="${C.cacau}">
<link rel="icon" href="data:image/svg+xml,${encodeURIComponent(LBF.badge('xmlns="http://www.w3.org/2000/svg"'))}">
<link rel="preload" href="fonts/jost.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="fonts/dm-serif-display.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="fonts/dm-serif-display-italic.woff2" as="font" type="font/woff2" crossorigin>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"Bakery","name":"La Bella Fornatta","description":"Padaria e restaurante","servesCuisine":["Padaria","Brasileira"],"priceRange":"R$ 20-40","address":{"@type":"PostalAddress","streetAddress":"R. Clarisse de Jesus Lázaro Bedeschi, 231A","addressLocality":"Mauá","addressRegion":"SP","postalCode":"09371-067","addressCountry":"BR"},"telephone":"+55-11-2375-9892","url":"${SITE}","image":"${SITE}og-image.png?v=${OG_VER}","logo":"${SITE}og-image.png?v=${OG_VER}","hasMap":"${MAPS}","menu":"${SITE}#cardapio","openingHoursSpecification":[{"@type":"OpeningHoursSpecification","dayOfWeek":["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],"opens":"06:30","closes":"21:30"}],"potentialAction":{"@type":"OrderAction","target":"${IFOOD}"},"sameAs":["https://www.instagram.com/labellafornatta","https://linktr.ee/labellafornatta"]}</script>
<script>document.documentElement.classList.add("js")</script>
<style>
@font-face{font-family:Jost;font-style:normal;font-weight:400 600;font-display:swap;src:url(fonts/jost.woff2) format("woff2")}
@font-face{font-family:"DM Serif Display";font-style:normal;font-weight:400;font-display:swap;src:url(fonts/dm-serif-display.woff2) format("woff2")}
@font-face{font-family:"DM Serif Display";font-style:italic;font-weight:400;font-display:swap;src:url(fonts/dm-serif-display-italic.woff2) format("woff2")}
@font-face{font-family:Sacramento;font-style:normal;font-weight:400;font-display:swap;src:url(fonts/sacramento.woff2) format("woff2")}
:root{color-scheme:light;
 --cacau:${C.cacau};--cacauD:${C.cacauD};--cobre:${C.cobre};--trigo:${C.trigo};--creme:${C.creme};
 --bg:${C.farinha};--massa:${C.massa};--card:#FFFDF9;--ink:#2B1A15;--muted:#6B564C;--line:#E6D6C2;--line2:#E2CFB8;--accent:${C.cobreD};--ok:#3F7A4A;--err:#B3261E;
 --shadow:0 1px 2px rgba(59,32,26,.06),0 14px 30px -18px rgba(59,32,26,.3);
 --shadow-h:0 2px 6px rgba(59,32,26,.08),0 28px 46px -22px rgba(59,32,26,.42);
 --ease:cubic-bezier(.22,.61,.36,1);--soft:cubic-bezier(.34,1.3,.5,1);--r:26px}
@media(prefers-color-scheme:dark){:root:not([data-theme="light"]){color-scheme:dark;
 --bg:#1E1310;--massa:#2A1B16;--card:#2E1E19;--ink:#F6EBDD;--muted:#CDB7A6;--line:#46322A;--line2:#3A2822;--accent:#E3B190;--ok:#7CC48A;--err:#FF8A80;
 --shadow:0 1px 2px rgba(0,0,0,.4),0 14px 30px -18px rgba(0,0,0,.7);--shadow-h:0 2px 6px rgba(0,0,0,.4),0 28px 46px -20px rgba(0,0,0,.8)}}
:root[data-theme="dark"]{color-scheme:dark;
 --bg:#1E1310;--massa:#2A1B16;--card:#2E1E19;--ink:#F6EBDD;--muted:#CDB7A6;--line:#46322A;--line2:#3A2822;--accent:#E3B190;--ok:#7CC48A;--err:#FF8A80;
 --shadow:0 1px 2px rgba(0,0,0,.4),0 14px 30px -18px rgba(0,0,0,.7);--shadow-h:0 2px 6px rgba(0,0,0,.4),0 28px 46px -20px rgba(0,0,0,.8)}
*,*::before,*::after{box-sizing:border-box;margin:0}
html{overflow-x:clip;scroll-behavior:smooth;scroll-padding-top:calc(84px + env(safe-area-inset-top,0px));-webkit-text-size-adjust:100%}
body{background:var(--bg);color:var(--ink);font:400 17.5px/1.65 Jost,system-ui,sans-serif;overflow-x:clip;padding-bottom:env(safe-area-inset-bottom,0px)}
h1,h2,h3,.serif{font-family:"DM Serif Display",Georgia,serif;font-weight:400;line-height:1.06;letter-spacing:-.01em;text-wrap:balance}
h1{font-size:clamp(2.6rem,5.6vw,4.6rem)}
h2{font-size:clamp(2rem,3.6vw,3rem);margin-bottom:14px}
h3{font-size:1.4rem;line-height:1.15}
h1 em,h2 em{font-style:italic;color:var(--accent)}
p{text-wrap:pretty}
a{color:inherit}svg{max-width:100%}
:focus-visible{outline:3px solid var(--trigo);outline-offset:3px;border-radius:6px}
.w{width:min(1160px,100% - 40px);margin-inline:auto}
section{padding:clamp(72px,9vw,116px) 0;position:relative}
.lead{color:var(--muted);max-width:56ch;font-size:1.08rem}
.head{margin-bottom:clamp(30px,4vw,48px)}
.head.c{text-align:center}.head.c .lead{margin-inline:auto}
.kick{display:inline-flex;align-items:center;gap:10px;font:600 .8rem Jost,sans-serif;letter-spacing:.24em;text-transform:uppercase;color:var(--accent);margin-bottom:14px}
.kick::before{content:"";width:22px;height:1.5px;background:currentColor;opacity:.7}
.tray{background:var(--massa);border-radius:clamp(28px,4vw,52px);margin-inline:clamp(8px,1.5vw,22px)}
.dark{background:var(--cacauD);color:var(--creme);--muted:#D8C3B2;--line:#5A3B31;--card:#4A2A22;--accent:#E3B190;--ink:var(--creme)}
.ic{width:24px;height:24px;flex:none}
.wa-i{width:20px;height:20px;flex:none}
.script{font-family:Sacramento,cursive;font-weight:400;letter-spacing:0}
.tbd{color:var(--muted);font-style:italic}

/* botões */
.btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:52px;padding:0 26px;border-radius:999px;font:600 1rem/1 Jost,sans-serif;letter-spacing:.01em;text-decoration:none;border:1.5px solid transparent;cursor:pointer;transition:transform .3s var(--ease),box-shadow .3s var(--ease),background-color .25s,color .25s,border-color .25s}
.btn:hover{transform:translateY(-2px);box-shadow:0 12px 24px -12px rgba(59,32,26,.55)}
.btn:active{transform:translateY(0) scale(.98);box-shadow:none;transition-duration:.08s}
.bmain{background:var(--cacau);color:var(--creme)}.bmain:hover{background:#6A3B2F}
.bline{border-color:currentColor;color:var(--ink);background:transparent}.bline:hover{background:var(--massa)}
.bcobre{background:var(--cobre);color:#2B1A15}.bcobre:hover{background:#E2B395}
@media(prefers-color-scheme:dark){:root:not([data-theme="light"]) .bmain{background:var(--cobre);color:#2B1A15}}
:root[data-theme="dark"] .bmain{background:var(--cobre);color:#2B1A15}
.dark .bline{color:var(--creme)}.dark .bline:hover{background:#4A2A22}

/* cabeçalho */
header{position:sticky;top:0;z-index:20;background:var(--bg);padding-top:env(safe-area-inset-top,0px);transition:box-shadow .3s,background-color .3s}
header.sc{box-shadow:0 1px 0 var(--line),0 12px 26px -22px rgba(59,32,26,.6)}
@supports (backdrop-filter:blur(8px)){header.sc{background:color-mix(in srgb,var(--bg) 86%,transparent);backdrop-filter:saturate(1.3) blur(12px)}}
.nav{display:flex;align-items:center;justify-content:space-between;height:76px}
.logo{display:inline-flex;align-items:center;gap:12px;text-decoration:none;color:var(--ink)}
.logo .bd{width:48px;height:48px;flex:none;transition:transform .5s var(--soft)}
.logo:hover .bd{transform:rotate(-6deg)}
.logo .nm{display:flex;flex-direction:column;line-height:1}
.logo .nm b{font:400 2rem/0.9 Sacramento,cursive}
.logo .nm small{font:500 .56rem/1 Jost,sans-serif;letter-spacing:.32em;color:var(--accent);margin-top:4px}
.menu{display:flex;gap:28px;align-items:center}
.menu a{text-decoration:none;font-weight:500}
.menu a:not(.btn){position:relative;padding:6px 0}
.menu a:not(.btn)::after{content:"";position:absolute;left:0;right:0;bottom:0;height:1.5px;border-radius:2px;background:var(--accent);transform:scaleX(0);transform-origin:left;transition:transform .35s var(--ease)}
.menu a:not(.btn):hover::after,.menu a[aria-current="true"]::after{transform:scaleX(1)}
.menu .btn{min-height:44px;padding:0 20px}
.burger{display:none;width:48px;height:48px;border:0;background:var(--massa);border-radius:16px;cursor:pointer;color:var(--ink);padding:0}
.burger span{display:block;width:20px;height:2px;border-radius:2px;background:currentColor;margin:4.5px auto;transition:transform .3s var(--ease),opacity .2s}
.burger[aria-expanded="true"] span:nth-child(1){transform:translateY(6.5px) rotate(45deg)}
.burger[aria-expanded="true"] span:nth-child(2){opacity:0}
.burger[aria-expanded="true"] span:nth-child(3){transform:translateY(-6.5px) rotate(-45deg)}
@media(max-width:920px){
 .burger{display:block}
 .menu{position:absolute;left:8px;right:8px;top:calc(100% + 4px);background:var(--card);flex-direction:column;align-items:stretch;padding:12px 18px 18px;gap:2px;border:1px solid var(--line);border-radius:24px;box-shadow:var(--shadow-h);display:none}
 .menu.open{display:flex;animation:menuIn .28s var(--ease)}
 .menu a:not(.btn){padding:13px 4px;border-bottom:1px solid var(--line)}
 .menu a:not(.btn)::after{display:none}
 .menu .btn{margin-top:12px;min-height:50px}
}
@keyframes menuIn{from{opacity:0;transform:translateY(-8px)}}

/* hero */
.hero{padding:clamp(32px,5vw,60px) 0 clamp(72px,9vw,110px);overflow-x:clip}
.hg{display:grid;grid-template-columns:1.08fr .92fr;gap:clamp(32px,5vw,72px);align-items:center}
.status{display:inline-flex;align-items:center;gap:10px;background:var(--card);border:1px solid var(--line);font-weight:500;font-size:.92rem;padding:7px 16px 7px 13px;border-radius:999px;margin-bottom:24px;box-shadow:var(--shadow)}
.status i{width:9px;height:9px;border-radius:50%;background:var(--muted);flex:none;position:relative}
.status.on i{background:var(--ok)}
.status.on i::after{content:"";position:absolute;inset:-5px;border-radius:50%;border:1.5px solid var(--ok);opacity:0;animation:ping 2.6s var(--ease) infinite}
@keyframes ping{0%{transform:scale(.5);opacity:.8}100%{transform:scale(1.5);opacity:0}}
.hero .lead{font-size:1.16rem;margin:22px 0 32px}
.ctas{display:flex;gap:12px;flex-wrap:wrap}
.facts{display:flex;flex-wrap:wrap;gap:10px 24px;margin-top:30px;font-size:.95rem;font-weight:500;color:var(--muted)}
.facts span{display:inline-flex;align-items:center;gap:8px}
.facts .ic{width:20px;height:20px;color:var(--accent)}
.stars{display:inline-flex;gap:1px;color:#D99A2B}.stars .st{width:17px;height:17px}
.st-p{display:inline-flex;width:10.2px;overflow:hidden}.stars svg{max-width:none;flex:none}
.seq{animation:rise .9s var(--ease) both;animation-delay:var(--sd,0s)}
@keyframes rise{from{opacity:0;transform:translateY(16px)}}
.stage{position:relative;max-width:480px;margin-inline:auto;width:100%}
.vitrine{position:relative;aspect-ratio:4/4.9;border-radius:999px 999px var(--r) var(--r);background:var(--massa);overflow:hidden;isolation:isolate;border:1px solid var(--line)}
.vitrine::before{content:"";position:absolute;inset:14px;border-radius:999px 999px 16px 16px;border:1.2px solid var(--accent);opacity:.35;z-index:2;pointer-events:none}
.shelf{position:absolute;left:12%;right:12%;display:flex;justify-content:space-around;align-items:flex-end;color:var(--cacau);border-bottom:2px solid color-mix(in srgb,var(--accent) 55%,transparent);padding-bottom:2px}
@media(prefers-color-scheme:dark){:root:not([data-theme="light"]) .shelf{color:var(--cobre)}}
:root[data-theme="dark"] .shelf{color:var(--cobre)}
.shelf .il{width:30%;height:auto;animation:rise .9s var(--ease) both;animation-delay:calc(.5s + var(--k) * .12s)}
.s1{top:30%}.s2{top:52%}
.counter{position:absolute;left:0;right:0;bottom:0;height:27%;background:var(--cacau);display:flex;align-items:flex-start;justify-content:center}
.counter .il{width:34%;margin-top:-17%;color:var(--cobre)}
.counter::before{content:"";position:absolute;left:0;right:0;top:0;height:6px;background:color-mix(in srgb,var(--cobre) 70%,var(--cacau))}
.vapor{animation:vapor 4.5s ease-in-out infinite;opacity:.0}
.vapor.v2{animation-delay:1.5s}.vapor.v3{animation-delay:3s}
@keyframes vapor{0%{opacity:0;transform:translateY(6px)}35%{opacity:.85}100%{opacity:0;transform:translateY(-10px)}}
.wh{position:absolute;width:46px;color:var(--accent);opacity:.55;transform-origin:50% 100%;animation:sway 7s ease-in-out infinite alternate}
.wh.a{left:7%;bottom:27%;height:150px}.wh.b{right:7%;bottom:27%;height:120px;animation-delay:-3s;animation-duration:8.5s}
@keyframes sway{from{rotate:-3deg}to{rotate:3deg}}
.seal-f{position:absolute;width:31%;left:-6%;bottom:-5%;z-index:3;filter:drop-shadow(0 16px 22px rgba(59,32,26,.35));animation:rise .9s var(--ease) .9s both}
.chip-f{position:absolute;display:inline-flex;align-items:center;gap:8px;background:var(--card);color:var(--ink);border:1px solid var(--line);box-shadow:var(--shadow);padding:9px 16px;border-radius:999px;font-weight:500;font-size:.9rem;z-index:3;animation:rise .8s var(--ease) both,float 7s ease-in-out infinite alternate;animation-delay:var(--sd),calc(var(--sd) + 1s)}
.chip-f b{font-weight:600}
.chip-f i{width:7px;height:7px;border-radius:50%;background:var(--trigo)}
@keyframes float{to{translate:0 -8px}}
@media(max-width:920px){.hg{grid-template-columns:1fr}.stage{max-width:380px;margin-top:10px}.chip-f{font-size:.82rem}}
@media(max-width:520px){.stage{width:88%}.seal-f{left:-4%;width:30%}.chip-f:nth-of-type(1){right:-6%!important}.chip-f:nth-of-type(2){right:-6%!important;top:63%!important}.chip-f:nth-of-type(3){left:-6%!important}}

/* revelação ao rolar */
html.js [data-rv]{opacity:0;translate:0 20px;transition:opacity .8s var(--ease),translate .8s var(--ease);transition-delay:calc(var(--i,0) * 90ms)}
html.js [data-rv].in{opacity:1;translate:0 0}

/* um dia na fornatta */
.day{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;position:relative}
.arc{grid-column:1/-1;height:70px;position:relative;margin-bottom:6px}
.arc svg{width:100%;height:100%;overflow:visible}
.sunb{position:absolute;left:4%;top:66px;width:16px;height:16px;border-radius:50%;background:var(--trigo);box-shadow:0 0 0 7px color-mix(in srgb,var(--trigo) 22%,transparent);translate:-50% -50%;transition:left 2s var(--ease),top 2s var(--ease)}
.mo{background:var(--card);border:1px solid var(--line);border-radius:var(--r);padding:22px 22px 24px;box-shadow:var(--shadow);position:relative;transition:transform .45s var(--ease),box-shadow .45s var(--ease),border-color .3s}
.mo:hover{transform:translateY(-4px);box-shadow:var(--shadow-h)}
.mo .il{display:block;width:64px;height:64px;color:var(--accent);margin-bottom:10px}
.mo .hr{font:600 .78rem Jost;letter-spacing:.18em;text-transform:uppercase;color:var(--muted)}
.mo h3{margin:6px 0 8px}
.mo p{color:var(--muted);font-size:.98rem}
.mo .now{position:absolute;top:18px;right:18px;font:600 .72rem Jost;letter-spacing:.14em;text-transform:uppercase;background:var(--cacau);color:var(--creme);padding:5px 10px;border-radius:999px;opacity:0;transform:scale(.8);transition:.4s var(--soft)}
.mo.is-now{border-color:color-mix(in srgb,var(--accent) 60%,var(--line))}
.mo.is-now .now{opacity:1;transform:none}
@media(max-width:920px){.day{grid-template-columns:1fr 1fr}.arc{display:none}}
@media(max-width:560px){.day{grid-template-columns:1fr}}

/* cardápio */
.tabs{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:28px;position:relative}
.tab{font:500 .98rem Jost;padding:10px 18px;border-radius:999px;border:1px solid var(--line);background:var(--card);color:var(--ink);cursor:pointer;transition:background-color .25s,color .25s,border-color .25s,transform .3s var(--ease)}
.tab:hover{transform:translateY(-1px);border-color:var(--accent)}
.tab[aria-selected="true"]{background:var(--cacau);color:var(--creme);border-color:var(--cacau)}
@media(prefers-color-scheme:dark){:root:not([data-theme="light"]) .tab[aria-selected="true"]{background:var(--cobre);color:#2B1A15;border-color:var(--cobre)}}
:root[data-theme="dark"] .tab[aria-selected="true"]{background:var(--cobre);color:#2B1A15;border-color:var(--cobre)}
.items{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}
@media(max-width:920px){.items{grid-template-columns:1fr 1fr}}
@media(max-width:560px){.items{grid-template-columns:1fr}}
.it{display:grid;grid-template-columns:86px 1fr;gap:16px;align-items:start;background:var(--card);border:1px solid var(--line);border-radius:22px;padding:18px;box-shadow:var(--shadow);animation:rise .55s var(--ease) both;animation-delay:calc(var(--i) * 70ms)}
.it .ib{width:86px;height:86px;border-radius:18px;background:var(--massa);display:grid;place-items:center;color:var(--accent)}
.it .ib .il{width:60px;height:60px}
.it h3{font-size:1.25rem;margin:2px 0 4px}
.it p{color:var(--muted);font-size:.95rem;line-height:1.5}
.it .pr{margin-top:8px;font-size:.88rem;font-weight:500;color:var(--accent)}
.note{font-size:.86rem;color:var(--muted);margin-top:22px}

/* buffet */
.bf{display:grid;grid-template-columns:1fr 1fr;gap:clamp(32px,5vw,72px);align-items:center}
@media(max-width:920px){.bf{grid-template-columns:1fr}}
.board{background:#2A1712;border:10px solid #6B4433;border-radius:18px;padding:30px 30px 26px;color:#F3E6D6;box-shadow:0 30px 50px -30px rgba(0,0,0,.8);position:relative;transform:rotate(-1deg)}
.board h3{font-family:Sacramento,cursive;font-size:3rem;line-height:1.25;color:var(--creme);text-align:center;margin-bottom:10px}
.board .dt{text-align:center;font:500 .78rem Jost;letter-spacing:.22em;text-transform:uppercase;color:var(--cobre);margin-bottom:18px}
.board ul{list-style:none;padding:0;display:grid;gap:10px}
.board li{display:flex;align-items:baseline;gap:10px;font-size:1.05rem}
.board li::after{content:"";flex:1;order:1;border-bottom:1.5px dotted rgba(243,230,214,.35);translate:0 -4px}
.board li span{order:2;font-size:.85rem;color:var(--cobre)}
.board .ex{margin-top:18px;font-size:.8rem;color:#CDB7A6;text-align:center}
.bf .il-b{display:block;width:120px;color:var(--cobre);margin-bottom:6px}
.bf-pts{list-style:none;padding:0;display:grid;gap:14px;margin:26px 0 30px}
.bf-pts li{display:flex;gap:14px;align-items:flex-start}
.bf-pts .n{flex:none;width:34px;height:34px;border-radius:50%;border:1.5px solid var(--cobre);display:grid;place-items:center;font:500 .95rem "DM Serif Display",serif;color:var(--cobre)}

/* pedidos */
.ways{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-bottom:clamp(36px,5vw,56px)}
@media(max-width:860px){.ways{grid-template-columns:1fr}}
.way{display:flex;flex-direction:column;gap:10px;background:var(--card);border:1px solid var(--line);border-radius:var(--r);padding:24px;box-shadow:var(--shadow);text-decoration:none;transition:transform .45s var(--ease),box-shadow .45s var(--ease)}
.way:hover{transform:translateY(-4px);box-shadow:var(--shadow-h)}
.way .ib{width:52px;height:52px;border-radius:16px;background:var(--massa);display:grid;place-items:center;color:var(--accent)}
.way .ib .ic,.way .ib .wa-i{width:26px;height:26px}
.way p{color:var(--muted);font-size:.97rem}
.way .go{margin-top:auto;display:inline-flex;align-items:center;gap:8px;font-weight:600;color:var(--accent)}
.way .go .ic{width:20px;height:20px;transition:transform .3s var(--ease)}
.way:hover .go .ic{transform:translateX(4px)}
.order{display:grid;grid-template-columns:.85fr 1.15fr;gap:clamp(28px,4vw,56px);background:var(--card);border:1px solid var(--line);border-radius:clamp(26px,3vw,36px);padding:clamp(24px,4vw,48px);box-shadow:var(--shadow)}
@media(max-width:860px){.order{grid-template-columns:1fr}}
form{display:grid;grid-template-columns:1fr 1fr;gap:16px}
form .full{grid-column:1/-1}
@media(max-width:560px){form{grid-template-columns:1fr}}
label{display:block;font-weight:500;font-size:.95rem;margin-bottom:6px}
input,select,textarea{width:100%;font:inherit;font-size:16px;color:var(--ink);background:var(--bg);border:1.5px solid var(--line);border-radius:14px;padding:12px 14px;transition:border-color .2s,box-shadow .2s}
textarea{min-height:110px;resize:vertical}
input:focus,select:focus,textarea:focus{outline:none;border-color:var(--accent);box-shadow:0 0 0 4px color-mix(in srgb,var(--accent) 18%,transparent)}
[aria-invalid="true"]{border-color:var(--err)}
.err{color:var(--err);font-size:.85rem;min-height:1em;display:block;margin-top:4px}
.seg{display:flex;gap:8px;flex-wrap:wrap}
.seg label{margin:0;display:inline-flex;align-items:center;gap:8px;border:1.5px solid var(--line);border-radius:999px;padding:9px 16px;cursor:pointer;font-weight:500;transition:.2s}
.seg input{width:auto;accent-color:var(--cacau)}
.seg label:has(input:checked){border-color:var(--accent);background:var(--massa)}
.wn{font-size:.85rem;color:var(--muted)}
.quick{display:flex;flex-wrap:wrap;gap:8px;margin-top:8px}
.quick button{font:500 .9rem Jost;min-height:42px;border:1px dashed var(--accent);background:transparent;color:var(--accent);border-radius:999px;padding:6px 14px;cursor:pointer;transition:.2s}
.quick button:hover{background:var(--massa)}

/* avaliações */
.rv{display:grid;grid-template-columns:.8fr 1.2fr;gap:clamp(28px,5vw,64px);align-items:center}
@media(max-width:860px){.rv{grid-template-columns:1fr}}
.score{display:flex;align-items:center;gap:22px}
.score .big{font:400 clamp(4.5rem,9vw,6.5rem)/1 "DM Serif Display",serif;color:var(--ink)}
.score .stars .st{width:24px;height:24px}.score .st-p{width:14.4px}
.score small{display:block;color:var(--muted);margin-top:6px}
.tags{display:flex;flex-wrap:wrap;gap:10px;margin:20px 0 26px}
.tags span{background:var(--card);border:1px solid var(--line);border-radius:999px;padding:8px 16px;font-weight:500}
.quotes{display:grid;gap:14px}
.q{background:var(--card);border:1px dashed var(--line2);border-color:var(--line);border-radius:22px;padding:20px 22px}
.q p{font-family:"DM Serif Display",serif;font-size:1.2rem;line-height:1.35}
.q small{display:block;margin-top:10px;color:var(--muted)}

/* visite */
.vs{display:grid;grid-template-columns:1.05fr .95fr;gap:clamp(28px,5vw,64px);align-items:center}
@media(max-width:920px){.vs{grid-template-columns:1fr}}
.facade{width:100%;height:auto;border-radius:var(--r);display:block;box-shadow:var(--shadow-h)}
.facade .glow{animation:glow 6s ease-in-out infinite alternate}
@keyframes glow{from{opacity:.25}to{opacity:.7}}
.info{list-style:none;padding:0;display:grid;gap:18px;margin:24px 0 30px}
.info li{display:flex;gap:14px}
.info .ib{width:46px;height:46px;flex:none;border-radius:14px;background:var(--massa);display:grid;place-items:center;color:var(--accent)}
.info b{display:block;font-weight:600}
.info span{color:var(--muted)}
.info a{color:var(--ink);display:inline-block;padding:6px 0;margin:-6px 0}
.week{display:grid;grid-template-columns:repeat(7,1fr);gap:4px;margin-top:8px;max-width:340px}
.week i{font-style:normal;text-align:center;font-size:.78rem;font-weight:500;padding:5px 0;border-radius:8px;background:var(--massa);color:var(--muted)}
.week i.today{background:var(--cacau);color:var(--creme)}

/* faq */
.faq{max-width:780px;margin-inline:auto;display:grid;gap:12px}
details{background:var(--card);border:1px solid var(--line);border-radius:20px;padding:4px 22px;transition:box-shadow .3s}
details[open]{box-shadow:var(--shadow)}
summary{cursor:pointer;list-style:none;display:flex;justify-content:space-between;align-items:center;gap:16px;padding:16px 0;font-weight:600;font-size:1.05rem}
summary::-webkit-details-marker{display:none}
summary::after{content:"";width:12px;height:12px;flex:none;border-right:2px solid var(--accent);border-bottom:2px solid var(--accent);rotate:45deg;translate:0 -3px;transition:rotate .3s var(--ease),translate .3s var(--ease)}
details[open] summary::after{rotate:225deg;translate:0 3px}
details p{color:var(--muted);padding:0 0 18px}

/* cta final */
.final{text-align:center;padding:clamp(56px,8vw,96px) 24px;border-radius:clamp(28px,4vw,52px);position:relative;overflow:hidden}
.final .seal{width:150px;margin:0 auto 22px;display:block}
.final h2{color:var(--creme)}
.final .lead{margin:0 auto 30px;color:#D8C3B2}
.final .ctas{justify-content:center}
.final .wh{opacity:.25;color:var(--cobre);height:180px;bottom:-10px}
.final .wh.a{left:4%}.final .wh.b{right:4%}

/* rodapé */
footer{background:var(--cacauD);color:var(--creme);padding:60px 0 calc(32px + env(safe-area-inset-bottom,0px));margin-top:clamp(72px,9vw,112px)}
footer a{text-decoration:none;opacity:.9}footer a:hover{text-decoration:underline;opacity:1}
.fg{display:grid;grid-template-columns:1.4fr 1fr 1fr 1fr;gap:32px}
@media(max-width:860px){.fg{grid-template-columns:1fr 1fr}}
@media(max-width:520px){.fg{grid-template-columns:1fr}}
footer .logo{color:var(--creme)}footer .logo .nm small{color:var(--cobre)}
footer p{color:#D8C3B2;font-size:.95rem;margin-top:14px;max-width:34ch}
footer ul{list-style:none;padding:0;display:grid;gap:2px;font-size:.97rem}
footer ul a{display:inline-block;padding:9px 0}footer ul li:not(:has(a)){padding:4px 0}
.copy a{display:inline-block;padding:10px 0}
footer h3{font:600 .8rem Jost;letter-spacing:.2em;text-transform:uppercase;color:var(--cobre);margin-bottom:14px}
.copy{border-top:1px solid #5A3B31;margin-top:44px;padding-top:22px;display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;font-size:.88rem;color:#CDB7A6}
.copy strong{color:var(--creme)}
.reveal-f{opacity:0;translate:0 14px;transition:opacity .9s var(--ease),translate .9s var(--ease)}
.reveal-f.in{opacity:1;translate:0 0}

/* barra fixa no celular */
.mbar{position:fixed;left:12px;right:12px;bottom:calc(12px + env(safe-area-inset-bottom,0px));z-index:30;display:none;gap:8px;padding:8px;background:color-mix(in srgb,var(--card) 92%,transparent);backdrop-filter:blur(12px);border:1px solid var(--line);border-radius:999px;box-shadow:var(--shadow-h);transform:translateY(140%);transition:transform .5s var(--ease)}
.mbar.on{transform:none}
.mbar .btn{flex:1;min-height:48px;padding:0 14px;font-size:.95rem}
@media(max-width:720px){.mbar{display:flex}footer{padding-bottom:calc(96px + env(safe-area-inset-bottom,0px))}}

.toast{position:fixed;left:50%;bottom:calc(90px + env(safe-area-inset-bottom,0px));translate:-50% 20px;background:var(--cacauD);color:var(--creme);padding:12px 20px;border-radius:999px;font-weight:500;box-shadow:var(--shadow-h);opacity:0;pointer-events:none;transition:.35s var(--ease);z-index:40;max-width:calc(100% - 32px);text-align:center}
.toast.on{opacity:1;translate:-50% 0}
.sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.skip{position:absolute;left:12px;top:-60px;background:var(--cacau);color:var(--creme);padding:10px 16px;border-radius:12px;z-index:50}.skip:focus{top:12px}

@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-delay:0s!important;animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;scroll-behavior:auto!important}html.js [data-rv],.reveal-f{opacity:1;translate:none}.vapor{opacity:.6}}
</style>
</head>
<body>
<a class="skip" href="#conteudo">Pular para o conteúdo</a>
<header><div class="w nav">
 <a class="logo" href="#topo">${LBF.badge('class="bd" aria-hidden="true"')}<span class="nm"><b>La Bella Fornatta</b><small>PADARIA &amp; RESTAURANTE</small></span></a>
 <button class="burger" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu"><span></span><span></span><span></span></button>
 <nav class="menu" id="menu" aria-label="Principal">
  <a href="#cardapio">Cardápio</a><a href="#buffet">Buffet</a><a href="#avaliacoes">Avaliações</a><a href="#visite">Visite</a>
  <a class="btn bmain" href="#pedir">Fazer pedido</a>
 </nav>
</div></header>

<main id="conteudo">
<section class="hero" id="topo"><div class="w hg">
 <div>
  <p class="status seq" id="status" style="--sd:.05s"><i></i><span>Das 6h30 às 21h30</span></p>
  <h1 class="seq" style="--sd:.15s">Do pão da manhã <em>ao caldo da noite.</em></h1>
  <p class="lead seq" style="--sd:.3s">Padaria, confeitaria e restaurante no Parque São Vicente, em Mauá. Pão de queijo e café cedo, buffet, sobremesas, beirutes, sopas e caldos, das 6h30 às 21h30.</p>
  <div class="ctas seq" style="--sd:.45s">
   <a class="btn bmain wal" href="#pedir">${WA}Pedir pelo WhatsApp</a>
   <a class="btn bline" href="${IFOOD}" target="_blank" rel="noopener">${ic("moto")}Pedir no iFood</a>
  </div>
  <div class="facts seq" style="--sd:.6s">
   <span>${stars}<b>4,6</b> no Google, 309 avaliações</span>
   <span>${ic("pin")}Parque São Vicente, Mauá</span>
  </div>
 </div>
 <div class="stage" aria-hidden="true">
  <div class="vitrine">
   ${wheat("wh a")}${wheat("wh b")}
   <div class="shelf s1">${["pao", "croissant", "pao"].map((k, i) => LBF.ill(k, 'class="il" style="--k:' + i + '"', "currentColor", 2.6)).join("")}</div>
   <div class="shelf s2">${["bolo", "beirute", "croissant"].map((k, i) => LBF.ill(k, 'class="il" style="--k:' + (i + 3) + '"', "currentColor", 2.6)).join("")}</div>
   <div class="counter">${LBF.ill("xicara", 'class="il"', "currentColor", 2.6)}</div>
  </div>
  ${seal('class="seal-f"')}
  <span class="chip-f" style="top:9%;right:-4%;--sd:1.1s"><i></i><b>Pão de queijo</b></span>
  <span class="chip-f" style="top:40%;right:-8%;--sd:1.3s"><i></i><b>Queijada</b></span>
  <span class="chip-f" style="top:24%;left:-7%;--sd:1.5s"><i></i><b>Cappuccino</b></span>
 </div>
</div></section>

<section id="dia" class="tray"><div class="w">
 <div class="head c" data-rv><span class="kick">Um dia na Fornatta</span><h2>Cada hora tem <em>o seu cheiro.</em></h2><p class="lead">A casa abre cedo com o café e fecha à noite com o caldo quente. Veja o que combina com o seu horário.</p></div>
 <div class="day" id="day">
  <div class="arc" aria-hidden="true"><svg viewBox="0 0 1000 70" preserveAspectRatio="none"><path id="sunpath" d="M40 66C260 -10 740 -10 960 66" fill="none" stroke="var(--accent)" stroke-width="1.2" stroke-dasharray="2 7" opacity=".6" vector-effect="non-scaling-stroke"/></svg><span class="sunb" id="sun"></span></div>
  <article class="mo" data-rv style="--i:0" data-from="390" data-to="660">${ill("xicara")}<span class="now">Agora</span><span class="hr">Manhã · desde 6h30</span><h3>Café e padaria</h3><p>Pão de queijo, queijada, pães e o café para começar o dia.</p></article>
  <article class="mo" data-rv style="--i:1" data-from="660" data-to="900">${ill("buffet")}<span class="now">Agora</span><span class="hr">Almoço</span><h3>Buffet</h3><p>Pratos quentes, saladas e frutas, servidos no salão.</p></article>
  <article class="mo" data-rv style="--i:2" data-from="900" data-to="1080">${ill("bolo")}<span class="now">Agora</span><span class="hr">Tarde</span><h3>Café e doces</h3><p>Cappuccino, mocaccino, tortas e mil-folhas para a pausa da tarde.</p></article>
  <article class="mo" data-rv style="--i:3" data-from="1080" data-to="1290">${ill("sopa")}<span class="now">Agora</span><span class="hr">Noite · até 21h30</span><h3>Sopas e beirutes</h3><p>Sopas, caldos e beirutes para fechar o dia sem pressa.</p></article>
 </div>
</div></section>

<section id="cardapio"><div class="w">
 <div class="head" data-rv><span class="kick">Cardápio</span><h2>O que sai do forno <em>e da cozinha.</em></h2><p class="lead">As mesmas seções que você já conhece do nosso Instagram, agora num lugar só.</p></div>
 <div class="tabs" role="tablist" aria-label="Seções do cardápio" id="tabs" data-rv></div>
 <div class="items" id="items" role="tabpanel" aria-live="polite"></div>
 <p class="note" id="mnote">Prévia: itens tirados do Instagram e das avaliações públicas da casa. Cardápio completo e valores a confirmar com a La Bella Fornatta.</p>
</div></section>

<section id="buffet" class="dark tray"><div class="w bf">
 <div data-rv>
  ${LBF.ill("buffet", 'class="il-b"', "currentColor", 2)}
  <span class="kick">Nosso buffet</span>
  <h2>O almoço que <em>muda todo dia.</em></h2>
  <p class="lead">Pratos quentes, massas, saladas e frutas no salão da Fornatta. O cardápio do dia aparece aqui e no Instagram, para você decidir antes de sair de casa.</p>
  <ol class="bf-pts">
   <li><span class="n">1</span><span>Confira o quadro do dia.</span></li>
   <li><span class="n">2</span><span>Venha almoçar no salão ou peça pelo WhatsApp.</span></li>
   <li><span class="n">3</span><span>Termine com uma sobremesa da vitrine.</span></li>
  </ol>
  <div class="ctas"><a class="btn bcobre" href="#pedir" data-wa="Olá! Qual é o buffet de hoje na La Bella Fornatta?">${WA}Perguntar o buffet de hoje</a><a class="btn bline" href="${INSTAGRAM}" target="_blank" rel="noopener">${ic("ig")}Ver no Instagram</a></div>
 </div>
 <div class="board" data-rv style="--i:1">
  <h3>Hoje no buffet</h3>
  <p class="dt" id="today">Cardápio do dia</p>
  <ul id="board"></ul>
  <p class="ex">Exemplo com pratos que aparecem no Instagram. Na versão final, a Fornatta atualiza este quadro em um minuto.</p>
 </div>
</div></section>

<section id="pedir"><div class="w">
 <div class="head c" data-rv><span class="kick">Peça sem sair de casa</span><h2>Do jeito que <em>for melhor para você.</em></h2></div>
 <div class="ways">
  <a class="way wal" href="#pedir" data-rv style="--i:0"><span class="ib">${WA}</span><h3>WhatsApp</h3><p>Monte o pedido abaixo e ele chega pronto no WhatsApp da casa.</p><span class="go">Montar pedido ${ic("arrow")}</span></a>
  <a class="way" href="${IFOOD}" target="_blank" rel="noopener" data-rv style="--i:1"><span class="ib">${ic("moto")}</span><h3>iFood</h3><p>Estamos no iFood, com entrega na sua casa.</p><span class="go">Abrir no iFood ${ic("arrow")}</span></a>
  <a class="way" href="#visite" data-rv style="--i:2"><span class="ib">${ic("bag")}</span><h3>Balcão</h3><p>Passe na loja, escolha na vitrine e leve para casa.</p><span class="go">Como chegar ${ic("arrow")}</span></a>
 </div>
 <div class="order" data-rv>
  <div>
   <span class="kick">Pedido pelo WhatsApp</span>
   <h2>Escreva, <em>a gente separa.</em></h2>
   <p class="lead">Conte o que você quer e se vai retirar ou receber em casa. O WhatsApp abre com a mensagem pronta, é só enviar.</p>
   <p class="wn" id="wn"></p>
  </div>
  <form id="f" novalidate>
   <div class="full"><label for="nome">Seu nome</label><input id="nome" name="nome" autocomplete="given-name" required><span class="err"></span></div>
   <div class="full"><label for="itens">O que você quer pedir</label><textarea id="itens" name="itens" required placeholder="Ex.: 10 pães de queijo e 2 queijadas"></textarea><span class="err"></span>
    <div class="quick" id="quick" aria-label="Adicionar item rápido"></div></div>
   <fieldset class="full" style="border:0;padding:0"><legend style="font-weight:500;font-size:.95rem;margin-bottom:8px">Como prefere</legend>
    <div class="seg"><label><input type="radio" name="modo" value="Retirar na loja" checked>Retirar na loja</label><label><input type="radio" name="modo" value="Entrega">Entrega</label></div></fieldset>
   <div class="full" id="endw" hidden><label for="end">Endereço para entrega</label><input id="end" name="end" autocomplete="street-address"><span class="err"></span></div>
   <div><label for="hora">Para quando</label><select id="hora" name="hora"></select></div>
   <div><label for="obs">Observações</label><input id="obs" name="obs" placeholder="Opcional"></div>
   <div class="full"><button class="btn bmain" type="submit">${WA}Enviar pedido pelo WhatsApp</button></div>
  </form>
 </div>
</div></section>

<section id="avaliacoes" class="tray"><div class="w rv">
 <div data-rv>
  <span class="kick">Quem vem, volta</span><h2 class="sr">Avaliações dos clientes</h2>
  <div class="score"><span class="big">4,6</span><div>${stars}<small>309 avaliações no Google</small></div></div>
  <p class="lead" style="margin-top:18px">O que mais aparece nas avaliações públicas da casa:</p>
  <div class="tags"><span>Pão de queijo</span><span>Queijada</span><span>Sopas e caldos</span><span>Café</span><span>Atendimento</span></div>
  <a class="btn bline" href="${MAPS}" target="_blank" rel="noopener">Ver avaliações no Google</a>
 </div>
 <div class="quotes" data-rv style="--i:1">
  <div class="q"><p>Espaço para uma avaliação real do Google, escolhida com a Fornatta.</p><small>Nome do cliente · Google</small></div>
  <div class="q"><p>Espaço para uma avaliação real do Google, escolhida com a Fornatta.</p><small>Nome do cliente · Google</small></div>
  <div class="q"><p>Espaço para uma avaliação real do Google, escolhida com a Fornatta.</p><small>Nome do cliente · Google</small></div>
 </div>
</div></section>

<section id="visite"><div class="w vs">
 <div data-rv>${facade}</div>
 <div data-rv style="--i:1">
  <span class="kick">Visite</span>
  <h2>Senta, pede um café <em>e fica à vontade.</em></h2>
  <ul class="info">
   <li><span class="ib">${ic("pin")}</span><div><b>R. Clarisse de Jesus Lázaro Bedeschi, 231A</b><span>Parque São Vicente, Mauá/SP · 09371-067</span></div></li>
   <li><span class="ib">${ic("clock")}</span><div><b>Das 6h30 às 21h30</b><span id="hoje-st">Todos os dias</span><div class="week" id="week" aria-hidden="true"></div></div></li>
   <li><span class="ib">${ic("phone")}</span><div><b><a href="tel:+551123759892">(11) 2375-9892</a></b><span>Telefone comercial</span></div></li>
  </ul>
  <div class="ctas"><a class="btn bmain" href="${MAPS}" target="_blank" rel="noopener">${ic("pin")}Abrir no Google Maps</a><a class="btn bline" href="${WAZE}" target="_blank" rel="noopener">Ir com o Waze</a></div>
 </div>
</div></section>

<section id="duvidas" style="padding-top:0"><div class="w">
 <div class="head c" data-rv><span class="kick">Dúvidas</span><h2>Antes de <em>você vir.</em></h2></div>
 <div class="faq" data-rv>
  <details><summary>Qual é o horário?</summary><p>Das 6h30 às 21h30. Se for vir perto do fechamento, vale chamar no WhatsApp antes.</p></details>
  <details><summary>Vocês entregam?</summary><p>Sim. Você pode pedir pelo iFood ou mandar o pedido pelo WhatsApp e combinar a entrega com a gente.</p></details>
  <details><summary>Como sei o que tem no buffet hoje?</summary><p>O cardápio do dia fica no quadro desta página e no Instagram @labellafornatta. Se preferir, <a href="#pedir" data-wa="Olá! Qual é o buffet de hoje na La Bella Fornatta?">pergunte pelo WhatsApp</a>.</p></details>
  <details><summary>Onde fica?</summary><p>Na R. Clarisse de Jesus Lázaro Bedeschi, 231A, no Parque São Vicente, em Mauá. Os botões de Google Maps e Waze levam você até a porta.</p></details>
 </div>
</div></section>

<div class="w"><div class="final dark" data-rv>
 ${wheat("wh a")}${wheat("wh b")}
 ${seal('class="seal" aria-hidden="true"')}
 <h2>O café está <em>passando.</em></h2>
 <p class="lead">Peça pelo WhatsApp, pelo iFood ou venha tomar o seu aqui no salão.</p>
 <div class="ctas"><a class="btn bcobre wal" href="#pedir">${WA}Pedir pelo WhatsApp</a><a class="btn bline" href="${IFOOD}" target="_blank" rel="noopener">${ic("moto")}Pedir no iFood</a></div>
</div></div>
</main>

<footer><div class="w">
 <div class="fg reveal-f" id="ft">
  <div><a class="logo" href="#topo">${LBF.badge('class="bd" aria-hidden="true"')}<span class="nm"><b>La Bella Fornatta</b><small>PADARIA &amp; RESTAURANTE</small></span></a><p>Padaria, confeitaria e restaurante no Parque São Vicente, em Mauá.</p></div>
  <div><h3>Visite</h3><ul><li>R. Clarisse de Jesus Lázaro Bedeschi, 231A</li><li>Parque São Vicente, Mauá/SP</li><li>Das 6h30 às 21h30</li></ul></div>
  <div><h3>Peça</h3><ul><li><a class="wal" href="#pedir">WhatsApp</a></li><li><a href="${IFOOD}" target="_blank" rel="noopener">iFood</a></li><li><a href="tel:+551123759892">(11) 2375-9892</a></li></ul></div>
  <div><h3>Siga</h3><ul><li><a href="${INSTAGRAM}" target="_blank" rel="noopener">Instagram @labellafornatta</a></li><li><a href="https://linktr.ee/labellafornatta" target="_blank" rel="noopener">Todos os links</a></li></ul></div>
 </div>
 <div class="copy"><p>© 2026 La Bella Fornatta. Página de prévia com conteúdo demonstrativo.</p><p>Site desenvolvido por <a href="https://www.instagram.com/sentiero.ai/" target="_blank" rel="noopener"><strong>Sentiero AI</strong></a></p></div>
</div></footer>

<nav class="mbar" id="mbar" aria-label="Pedido rápido"><a class="btn bmain wal" href="#pedir">${WA}WhatsApp</a><a class="btn bline" href="${IFOOD}" target="_blank" rel="noopener">iFood</a></nav>
<div class="toast" id="toast" role="status" aria-live="polite"></div>

<script>
(function(){"use strict";
// CONFIGURAÇÃO: WhatsApp de pedidos com DDI+DDD, só números. O Linktree usa o atalho mywhats.net/fornattabella1;
// confirmar o número com a Fornatta. Na prévia fica vazio para nenhum teste chegar à loja sem combinar.
var WHATSAPP_NUMBER = "";
// Horário por dia da semana (0 = domingo). Hoje: das 6h30 às 21h30 em todos os dias (Instagram e Google).
var HOURS = [["06:30","21:30"],["06:30","21:30"],["06:30","21:30"],["06:30","21:30"],["06:30","21:30"],["06:30","21:30"],["06:30","21:30"]];
// Cardápio: preencha "preco" quando a Fornatta enviar os valores. Itens vistos no Instagram e nas avaliações públicas.
var MENU = [
 {sec:"Padaria",itens:[
  {n:"Pão de queijo",d:"Quentinho, saindo ao longo do dia. Um dos mais lembrados nas avaliações.",i:"pao",preco:""},
  {n:"Queijada",d:"A queijada da casa, citada por quem já passou por aqui.",i:"bolo",preco:""},
  {n:"Pães da vitrine",d:"Pães e salgados do dia, incluindo o pão multigrãos.",i:"croissant",preco:""}]},
 {sec:"Cafés",itens:[
  {n:"Café",d:"Para começar o dia ou acompanhar o doce.",i:"xicara",preco:""},
  {n:"Cappuccino",d:"Com espuma cremosa, do jeito que aparece nas fotos dos clientes.",i:"xicara",preco:""},
  {n:"Mocaccino",d:"Café, leite e chocolate.",i:"xicara",preco:""}]},
 {sec:"Buffet",itens:[
  {n:"Pratos quentes",d:"Carnes, massas e acompanhamentos que mudam a cada dia.",i:"buffet",preco:""},
  {n:"Saladas e frutas",d:"Frutas frescas e saladas para montar o prato.",i:"garfo",preco:""}]},
 {sec:"Sopas e caldos",itens:[
  {n:"Sopas e caldos",d:"Caldos cremosos e sopas com legumes, servidos quentes.",i:"sopa",preco:""}]},
 {sec:"Beirutes",itens:[
  {n:"Beirutes",d:"No pão sírio, bem recheado. Veja as opções no destaque Beirutes do Instagram.",i:"beirute",preco:""}]},
 {sec:"Sobremesas",itens:[
  {n:"Torta de limão",d:"Com merengue maçaricado e raspas de limão.",i:"bolo",preco:""},
  {n:"Mil-folhas",d:"Massa folhada em camadas com creme.",i:"bolo",preco:""},
  {n:"Doces da vitrine",d:"Tortas e doces que mudam ao longo da semana.",i:"croissant",preco:""}]}
];
// Quadro do buffet: a Fornatta troca esta lista todo dia (exemplo com pratos vistos no Instagram).
var BUFFET_HOJE = [["Estrogonofe com champignon","quente"],["Carne desfiada","quente"],["Macarrão com legumes","massa"],["Nhoque ao sugo","massa"],["Saladas variadas","frio"],["Frutas da estação","frio"]];
var ILL=${JSON.stringify(LBF.ILL)};

var reduce=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
var io=("IntersectionObserver" in window&&!reduce)?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){var t=e.target;t.classList.add("in");io.unobserve(t)}})},{rootMargin:"0px 0px -8% 0px",threshold:.12}):null;
function watch(el){if(io)io.observe(el);else el.classList.add("in")}
document.querySelectorAll("[data-rv],.reveal-f").forEach(watch);
function toast(m){var t=document.getElementById("toast");t.textContent=m;t.classList.add("on");clearTimeout(t._h);t._h=setTimeout(function(){t.classList.remove("on")},2800)}
function svg(k){return '<svg class="il" viewBox="0 0 120 120" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">'+ILL[k]+'</g></svg>'}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}

// Hora em Mauá (America/Sao_Paulo), independente do fuso de quem abre o site
function nowSP(){try{var p={};new Intl.DateTimeFormat("en-US",{timeZone:"America/Sao_Paulo",weekday:"short",hour:"2-digit",minute:"2-digit",hourCycle:"h23"}).formatToParts(new Date()).forEach(function(x){p[x.type]=x.value});return {d:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].indexOf(p.weekday),m:(+p.hour)*60+(+p.minute)}}catch(e){var n=new Date();return {d:n.getDay(),m:n.getHours()*60+n.getMinutes()}}}
function mins(h){var a=h.split(":");return a[0]*60+(+a[1])}
function fmt(h){var a=h.split(":");return (+a[0])+"h"+(a[1]=="00"?"":a[1])}
// Não usar nomes globais do navegador: uma variável "open" sobrescrevia window.open e o pedido não abria o WhatsApp.
var NOW=nowSP(),H=HOURS[NOW.d],isOpen=!!(H&&NOW.m>=mins(H[0])&&NOW.m<mins(H[1]));
(function(){var st=document.getElementById("status"),sp=st.querySelector("span");
 if(isOpen){st.classList.add("on");sp.textContent="Aberto agora · fecha às "+fmt(H[1])}
 else{var nd=NOW.m<mins(H[0])?H:HOURS[(NOW.d+1)%7];sp.textContent="Fechado agora · abre às "+fmt(nd[0])+(NOW.m<mins(H[0])?"":" amanhã")}
 var DN=["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"];document.getElementById("week").innerHTML=DN.map(function(n,i){return '<i class="'+(i==NOW.d?"today":"")+'">'+n+'</i>'}).join("");
 document.getElementById("hoje-st").textContent=(isOpen?"Aberto agora. ":"")+"Todos os dias da semana";
 var D=["domingo","segunda-feira","terça-feira","quarta-feira","quinta-feira","sexta-feira","sábado"];document.getElementById("today").textContent="Exemplo · "+D[NOW.d];
})();

// Um dia na Fornatta: destaca o momento atual
(function(){var cards=document.querySelectorAll(".mo"),cur=-1;cards.forEach(function(c,i){if(NOW.m>=+c.dataset.from&&NOW.m<+c.dataset.to)cur=i});
 if(isOpen&&cur>=0)cards[cur].classList.add("is-now")})();

// Sol no arco: anda conforme a hora do dia em Mauá
(function(){var sun=document.getElementById("sun");if(!sun)return;var t=Math.max(0,Math.min(1,(NOW.m-390)/(1290-390)));
 function pos(t){var u=1-t;return {x:u*u*u*40+3*u*u*t*260+3*u*t*t*740+t*t*t*960,y:u*u*u*66+3*u*u*t*(-10)+3*u*t*t*(-10)+t*t*t*66}}
 function place(t){var p=pos(t);sun.style.left=(p.x/10)+"%";sun.style.top=p.y+"px"}
 if(reduce||!("IntersectionObserver" in window)){place(t);return}
 new IntersectionObserver(function(es,o){if(es[0].isIntersecting){o.disconnect();var t0=null;function step(ts){if(!t0)t0=ts;var k=Math.min(1,(ts-t0)/2200),e=1-Math.pow(1-k,3);place(t*e);if(k<1)requestAnimationFrame(step)}requestAnimationFrame(step)}},{threshold:.4}).observe(sun.parentNode);
 sun.style.transition="none";
})();

// Cardápio em abas
var tabs=document.getElementById("tabs"),items=document.getElementById("items");
tabs.innerHTML=MENU.map(function(s,i){return '<button class="tab" role="tab" id="t'+i+'" aria-selected="'+(i==0)+'" tabindex="'+(i==0?0:-1)+'" data-i="'+i+'">'+s.sec+'</button>'}).join("");
function show(i){tabs.querySelectorAll(".tab").forEach(function(b,j){b.setAttribute("aria-selected",j==i);b.tabIndex=j==i?0:-1});items.setAttribute("aria-labelledby","t"+i);
 items.innerHTML=MENU[i].itens.map(function(it,k){return '<article class="it" style="--i:'+k+'"><div class="ib">'+svg(it.i)+'</div><div><h3>'+esc(it.n)+'</h3><p>'+esc(it.d)+'</p><p class="pr">'+(it.preco?esc(it.preco):'<span class="tbd">Valor a confirmar</span>')+'</p></div></article>'}).join("")}
tabs.onclick=function(e){var b=e.target.closest(".tab");if(b)show(+b.dataset.i)};
tabs.onkeydown=function(e){var k={ArrowRight:1,ArrowLeft:-1}[e.key];if(!k)return;var b=tabs.querySelectorAll(".tab"),c=[].indexOf.call(b,document.activeElement),n=(c+k+b.length)%b.length;b[n].focus();show(n)};
show(0);

// Quadro do buffet
document.getElementById("board").innerHTML=BUFFET_HOJE.map(function(x){return '<li>'+esc(x[0])+'<span>'+esc(x[1])+'</span></li>'}).join("");

// Pedido rápido: atalhos com itens do cardápio
var itens=document.getElementById("itens");
document.getElementById("quick").innerHTML=["Pão de queijo","Queijada","Sopa ou caldo","Beirute","Torta de limão"].map(function(n){return '<button type="button">+ '+n+'</button>'}).join("");
document.getElementById("quick").onclick=function(e){var b=e.target.closest("button");if(!b)return;var n=b.textContent.slice(2),ls=itens.value.trim()?itens.value.trim().split("\\n"):[],hit=false;
 ls=ls.map(function(l){var m=l.match(/^(\\d+)\\s+(.+)$/);if(m&&m[2]==n){hit=true;return (+m[1]+1)+" "+n}return l});if(!hit)ls.push("1 "+n);itens.value=ls.join("\\n");itens.removeAttribute("aria-invalid");itens.parentNode.querySelector(".err").textContent="";itens.focus();toast(n+" entrou no pedido")};

// Menu
var bur=document.querySelector(".burger"),menu=document.getElementById("menu");
function closeMenu(){menu.classList.remove("open");bur.setAttribute("aria-expanded",false);bur.setAttribute("aria-label","Abrir menu")}
bur.onclick=function(){var o=menu.classList.toggle("open");bur.setAttribute("aria-expanded",o);bur.setAttribute("aria-label",o?"Fechar menu":"Abrir menu")};
menu.onclick=function(e){if(e.target.closest("a"))closeMenu()};
document.addEventListener("keydown",function(e){if(e.key=="Escape"&&menu.classList.contains("open")){closeMenu();bur.focus()}});
if("IntersectionObserver" in window){
 var hdr=document.querySelector("header"),mbar=document.getElementById("mbar");
 // A barra fixa aparece depois do topo e some quando o formulário de pedido está na tela (ela cobriria os campos).
 var pastHero=false,atForm=false;function syncBar(){mbar.classList.toggle("on",pastHero&&!atForm)}
 new IntersectionObserver(function(es){pastHero=!es[0].isIntersecting;hdr.classList.toggle("sc",pastHero);syncBar()},{rootMargin:"-80px 0px 0px 0px"}).observe(document.querySelector(".hero .ctas"));
 new IntersectionObserver(function(es){atForm=es[0].isIntersecting;syncBar()}).observe(document.querySelector(".order"));
 var links={};menu.querySelectorAll("a:not(.btn)").forEach(function(a){links[a.getAttribute("href").slice(1)]=a});
 var nio=new IntersectionObserver(function(es){es.forEach(function(e){var a=links[e.target.id];if(a)a.setAttribute("aria-current",e.isIntersecting?"true":"false")})},{rootMargin:"-45% 0px -50% 0px"});
 Object.keys(links).forEach(function(id){var s=document.getElementById(id);if(s)nio.observe(s)});
}

// WhatsApp
function wa(text){return "https://wa.me/"+WHATSAPP_NUMBER+"?text="+encodeURIComponent(text)}
function openWA(text){var u=wa(text),w=window.open(u,"_blank");if(w){try{w.opener=null}catch(_){}}else location.href=u}
// Eventos de conversão: entram no dataLayer se GA4/Tag Manager ou Meta Pixel forem instalados (IDs dependem da Fornatta).
function track(ev,data){try{(window.dataLayer=window.dataLayer||[]).push(Object.assign({event:ev},data||{}));if(window.fbq&&ev=="pedido_enviado")fbq("track","Contact")}catch(_){}}
document.addEventListener("click",function(e){var a=e.target.closest("a");if(!a)return;var h=a.getAttribute("href")||"";
 if(h.indexOf("ifood.com")>-1)track("clique_ifood");else if(h.indexOf("tel:")==0)track("clique_telefone");else if(h.indexOf("google.com/maps")>-1||h.indexOf("waze.com")>-1)track("clique_rota");else if(a.classList.contains("wal"))track("clique_whatsapp");else if(h.indexOf("instagram.com/labellafornatta")>-1)track("clique_instagram")});
(function(){var sel=document.getElementById("hora"),o=['<option>O quanto antes</option>'];if(isOpen){var a=Math.ceil((NOW.m+30)/30)*30,z=mins(H[1])-30;for(var m=a;m<=z;m+=30){var hh=Math.floor(m/60),mm=m%60;o.push("<option>Hoje, "+hh+"h"+(mm?mm:"")+"</option>")}}
 o.push("<option>Amanhã (combinar horário)</option>");sel.innerHTML=o.join("")})();
document.querySelectorAll("[data-wa]").forEach(function(a){a.addEventListener("click",function(e){e.preventDefault();track("clique_whatsapp",{contexto:"buffet"});openWA(a.dataset.wa)})});
document.querySelectorAll(".wal").forEach(function(a){a.addEventListener("click",function(e){e.preventDefault();var f=document.getElementById("f");f.scrollIntoView({behavior:reduce?"auto":"smooth",block:"center"});setTimeout(function(){document.getElementById("nome").focus({preventScroll:true})},reduce?0:600)})});
var wn=[];if(!isOpen)wn.push("A loja está fechada agora e abre às "+fmt((NOW.m<mins(H[0])?H:HOURS[(NOW.d+1)%7])[0])+". Você pode deixar o pedido e combinar o horário pela conversa.");
if(!WHATSAPP_NUMBER)wn.push("Prévia: o número de pedidos ainda não foi configurado, então o WhatsApp vai pedir para você escolher o contato.");
document.getElementById("wn").textContent=wn.join(" ");

// Formulário
var form=document.getElementById("f"),endw=document.getElementById("endw");
form.addEventListener("change",function(e){if(e.target.name=="modo"){var ent=e.target.value=="Entrega";endw.hidden=!ent;form.end.required=ent}});
form.addEventListener("input",function(e){var i=e.target;if(i.required&&i.value.trim()){i.removeAttribute("aria-invalid");var m=i.parentNode.querySelector(".err");if(m)m.textContent=""}});
form.onsubmit=function(e){
 e.preventDefault();var f=this,ok=true;
 f.querySelectorAll("[required]").forEach(function(i){var m=i.parentNode.querySelector(".err"),bad=!i.value.trim();m.textContent=bad?"Preencha este campo.":"";if(bad){ok=false;i.setAttribute("aria-invalid","true")}else i.removeAttribute("aria-invalid")});
 if(!ok){toast("Faltam alguns campos");f.querySelector("[aria-invalid=true]").focus();return}
 var modo=f.querySelector("input[name=modo]:checked").value;
 var msg="Olá, La Bella Fornatta! Quero fazer um pedido.\\n\\nNome: "+f.nome.value.trim()+"\\n\\nPedido:\\n"+f.itens.value.trim()+"\\n\\n"+modo+(modo=="Entrega"?": "+f.end.value.trim():"")+"\\nPara: "+f.hora.value+(f.obs.value.trim()?"\\nObservações: "+f.obs.value.trim():"");
 openWA(msg);track("pedido_enviado",{modo:modo});toast("Abrindo o WhatsApp com o seu pedido");
};
})();
</script>
</body>
</html>
`;
fs.writeFileSync(path.join(ROOT, "index.html"), html);
fs.writeFileSync(path.join(ROOT, "robots.txt"), "User-agent: *\nAllow: /\n\nSitemap: " + SITE + "sitemap.xml\n");
fs.writeFileSync(path.join(ROOT, "sitemap.xml"), '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n <url><loc>' + SITE + '</loc><lastmod>' + new Date().toISOString().slice(0, 10) + '</lastmod></url>\n</urlset>\n');
console.log("index.html", html.length, "bytes");
