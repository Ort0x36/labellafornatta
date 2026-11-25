"""Gera og-image.png (1200x630), a imagem de prévia do link no WhatsApp. Uso: python3 assets-src/make_og.py
Regras (mesma lógica da Looping e da Pet Boss): nome da marca legível na miniatura, frase que diz o que é o negócio,
ilustração cheia (formas preenchidas, não só traço) e contraste forte."""
import pathlib
from playwright.sync_api import sync_playwright
ROOT = pathlib.Path(__file__).resolve().parent.parent
MARCA = (ROOT / "assets-src" / "marca.js").as_uri()
FONTS = (ROOT / "fonts").as_uri()
ART = """
<svg viewBox="0 0 400 520" class="art">
 <defs>
  <linearGradient id="cr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#D99A55"/><stop offset="1" stop-color="#B8723C"/></linearGradient>
  <linearGradient id="cr2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#E4A963"/><stop offset="1" stop-color="#BF7A40"/></linearGradient>
 </defs>
 <g fill="none" stroke="#C9A27F" stroke-width="2.4" stroke-linecap="round" opacity=".55" id="wheatL"></g>
 <!-- baguete ao fundo -->
 <g transform="rotate(-14 110 300)">
  <rect x="84" y="138" width="54" height="290" rx="27" fill="url(#cr)"/>
  <rect x="84" y="138" width="54" height="290" rx="27" fill="none" stroke="#8E4F31" stroke-width="3"/>
  <g stroke="#F3D6A8" stroke-width="7" stroke-linecap="round"><path d="M100 178l22-14M100 222l22-14M100 266l22-14M100 310l22-14"/></g>
 </g>
 <!-- vapor -->
 <g fill="none" stroke="#C98B62" stroke-width="7" stroke-linecap="round" opacity=".8">
  <path d="M250 300c-14-18 14-30 0-50s10-30 0-44"/><path d="M286 300c-14-18 14-30 0-50s10-30 0-44" opacity=".7"/>
 </g>
 <!-- pão italiano -->
 <ellipse cx="140" cy="446" rx="104" ry="10" fill="#3B201A" opacity=".18"/>
 <path d="M42 420c0-46 44-74 98-74s98 28 98 74c0 14-10 22-24 22H66c-14 0-24-8-24-22z" fill="url(#cr2)" stroke="#8E4F31" stroke-width="3"/>
 <g stroke="#F3D6A8" stroke-width="8" stroke-linecap="round" fill="none"><path d="M86 380c8 10 10 22 6 36M134 366c9 13 11 28 6 46M184 376c8 10 10 22 6 36"/></g>
 <path d="M70 392c10-20 34-32 58-34" stroke="#F0C48A" stroke-width="5" stroke-linecap="round" fill="none" opacity=".7"/>
 <!-- xícara -->
 <ellipse cx="270" cy="440" rx="80" ry="13" fill="#3B201A" opacity=".18"/>
 <ellipse cx="270" cy="432" rx="74" ry="14" fill="#FFFDF9" stroke="#8E4F31" stroke-width="3"/>
 <path d="M326 352h12a26 26 0 0 1 0 52h-16" fill="none" stroke="#8E4F31" stroke-width="12" stroke-linecap="round"/>
 <path d="M326 352h12a26 26 0 0 1 0 52h-16" fill="none" stroke="#FFFDF9" stroke-width="6" stroke-linecap="round"/>
 <path d="M216 332h108v26c0 40-24 70-54 70s-54-30-54-70z" fill="#FFFDF9" stroke="#8E4F31" stroke-width="3"/>
 <ellipse cx="270" cy="332" rx="54" ry="11" fill="#FFFDF9" stroke="#8E4F31" stroke-width="3"/>
 <ellipse cx="270" cy="333" rx="45" ry="7.5" fill="#5A2F22"/>
 <path d="M240 372c6 16 16 28 30 34" stroke="#EADCCB" stroke-width="5" stroke-linecap="round" fill="none"/>
 <!-- balcão -->
 <rect x="0" y="442" width="400" height="78" fill="#532E25"/>
 <rect x="0" y="442" width="400" height="9" fill="#9C5B3B"/>
 <!-- croissant na frente -->
 <g transform="translate(200 484) scale(.86)">
  <ellipse cx="0" cy="22" rx="92" ry="9" fill="#000" opacity=".25"/>
  <ellipse cx="-74" cy="6" rx="22" ry="15" transform="rotate(-28 -74 6)" fill="#C98544" stroke="#8E4F31" stroke-width="3"/>
  <ellipse cx="74" cy="6" rx="22" ry="15" transform="rotate(28 74 6)" fill="#C98544" stroke="#8E4F31" stroke-width="3"/>
  <ellipse cx="-44" cy="-4" rx="32" ry="25" transform="rotate(-16 -44 -4)" fill="#D6914C" stroke="#8E4F31" stroke-width="3"/>
  <ellipse cx="44" cy="-4" rx="32" ry="25" transform="rotate(16 44 -4)" fill="#D6914C" stroke="#8E4F31" stroke-width="3"/>
  <ellipse cx="0" cy="-10" rx="36" ry="31" fill="#E2A25B" stroke="#8E4F31" stroke-width="3"/>
  <path d="M-14 -30c10-6 22-4 28 2" stroke="#F3CF96" stroke-width="5" stroke-linecap="round" fill="none"/>
 </g>
</svg>"""
HTML = """<!DOCTYPE html><html><head><meta charset="utf-8">
<script src="MARCA"></script>
<style>
@font-face{font-family:Jost;font-weight:400 600;src:url(FONTS/jost.woff2)}
@font-face{font-family:"DM Serif Display";src:url(FONTS/dm-serif-display.woff2)}
@font-face{font-family:"DM Serif Display";font-style:italic;src:url(FONTS/dm-serif-display-italic.woff2)}
@font-face{font-family:Sacramento;src:url(FONTS/sacramento.woff2)}
*{margin:0;padding:0;box-sizing:border-box}
body{width:1200px;height:630px;overflow:hidden;background:#3B201A;color:#F6EBDD;font-family:Jost,sans-serif;position:relative}
.col{position:absolute;left:68px;top:50px;bottom:56px;width:640px;display:flex;flex-direction:column}
.lk{display:flex;align-items:center;gap:18px}
.lk svg{width:92px;height:92px;border-radius:50%;box-shadow:0 0 0 2px #8E5A43}
.lk b{display:block;font:400 64px/0.95 Sacramento;color:#F6EBDD;white-space:nowrap}
.lk small{display:block;font:500 15px Jost;letter-spacing:.34em;color:#D6A283;margin-top:8px}
h1{margin-top:auto;font:400 70px/1.02 'DM Serif Display',serif;letter-spacing:-.012em;white-space:nowrap}
h1 em{color:#D6A283}
p{margin:18px 0 auto;font:500 27px/1.38 Jost;color:#D8C3B2;max-width:600px}
.chips{display:flex;gap:12px}
.chip{display:inline-flex;align-items:center;gap:10px;height:56px;padding:0 26px;border-radius:99px;font:600 22px Jost}
.c1{border:2px solid #D6A283;color:#F0D5BF}.c2{background:#D6A283;color:#2B1A15}
.arch{position:absolute;right:62px;top:52px;width:400px;height:526px;border-radius:200px 200px 28px 28px;background:#F0E3D0;overflow:hidden}
.arch:before{content:"";position:absolute;inset:12px;border-radius:190px 190px 18px 18px;border:2px solid #C98B62;opacity:.6;z-index:2}
.art{position:absolute;left:0;bottom:0;width:400px;height:520px}
</style></head><body>
<div class="col">
<div class="lk" id="lk"></div>
<h1>Padaria e restaurante<br><em>em Mauá.</em></h1>
<p>Café da manhã, buffet, sopas e caldos.<br>Aberto das 6h30 às 21h30.</p>
<div class="chips"><span class="chip c1">Parque São Vicente</span><span class="chip c2">Peça pelo WhatsApp ou iFood</span></div>
</div>
<div class="arch">ART</div>
<script>
document.getElementById('lk').innerHTML=LBF.badge('',{bg:'#532E25'})+'<div><b>La Bella Fornatta</b><small>PADARIA &amp; RESTAURANTE</small></div>';
var w=document.getElementById('wheatL');if(w){w.innerHTML='<g transform="translate(300 60) scale(1.3)">'+LBF.wheat('#C9A27F',1.6)+'</g><g transform="translate(330 120) scale(1)">'+LBF.wheat('#C9A27F',1.6)+'</g>'}
</script></body></html>""".replace("MARCA", MARCA).replace("FONTS", FONTS).replace("ART", ART)
out = ROOT / "assets-src" / "og-image.html"; out.write_text(HTML, encoding="utf-8")
with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page(viewport={"width": 1200, "height": 630})
    pg.goto(out.as_uri()); pg.wait_for_load_state("networkidle"); pg.evaluate("document.fonts.ready"); pg.wait_for_timeout(500)
    pg.screenshot(path=str(ROOT / "og-image.png")); b.close()
print("ok", (ROOT / "og-image.png").stat().st_size)
