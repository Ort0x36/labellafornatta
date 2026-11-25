// La Bella Fornatta: desenhos da marca (fonte única). Usado por build_index.js e make_og.py.
// O selo é uma releitura própria do logo atual: círculo cacau, chef em traço cobre,
// nome em letra cursiva de traço único (Sacramento) e "PADARIA & RESTAURANTE" espaçado.
var LBF = (function () {
  var C = {
    cacau: "#532E25",   // marrom do logo atual (medido no avatar do Instagram)
    cacauD: "#3B201A",  // seções escuras
    cobre: "#D6A283",   // traço do chef e subtítulo (rosé cobre do logo)
    cobreD: "#8E4F31",  // cobre para texto sobre fundo claro (contraste AA: 5,9 no fundo, 5,0 na bandeja)
    creme: "#F6EBDD",   // letra do logo
    farinha: "#FBF6EE", // fundo do site
    massa: "#F0E3D0",   // bandejas e cartões
    trigo: "#D9B072"    // detalhes de trigo
  };

  // Chef de traço único segurando uma cloche. viewBox 0 0 100 112.
  function chef(stroke, sw) {
    sw = sw || 2.6;
    return '<g fill="none" stroke="' + stroke + '" stroke-width="' + sw + '" stroke-linecap="round" stroke-linejoin="round">' +
      // chapéu
      '<path d="M39 31c-7.5.5-11-9.5-3.5-13.5C35 9.5 45.5 6 50.5 12c4.5-6 15-3 14.5 5.5 7.5 4 4 14-3.5 13.5"/>' +
      '<path d="M39 31v6.5h22V31"/><path d="M45 23.5c1 2.5 1 5 0 7.5M56 23.5c-1 2.5-1 5 0 7.5" stroke-width="' + (sw * 0.7) + '"/>' +
      // rosto
      '<path d="M40 38.5c-.5 9 3.5 16.5 10 16.5s10.5-7.5 10-16.5"/>' +
      '<path d="M45 48c1.8 1.6 3.4 1.6 5 0 1.6 1.6 3.2 1.6 5 0" stroke-width="' + (sw * 0.8) + '"/>' +
      '<path d="M45.5 43.5h1.2M53.3 43.5h1.2" stroke-width="' + (sw * 1.1) + '"/>' +
      // lenço e ombros
      '<path d="M44.5 55.5 50 61l5.5-5.5"/>' +
      '<path d="M44.5 55.5c-9 1.5-15 7-16.5 16M55.5 55.5c9 1.5 15 7 16.5 16"/>' +
      // braços até a bandeja
      '<path d="M28 71.5c-2 5-2.5 9-1 13.5M72 71.5c2 5 2.5 9 1 13.5"/>' +
      // cloche e bandeja
      '<path d="M31 84.5c0-11 8.5-18 19-18s19 7 19 18"/><path d="M50 66.5v-3"/><circle cx="50" cy="62" r="1.6"/>' +
      '<path d="M22 85h56"/>' +
      // dólmã abaixo da bandeja
      '<path d="M35 85.5c-.5 5 0 9 1 13M65 85.5c.5 5 0 9-1 13"/>' +
      '<path d="M36.5 98.5h27" stroke-width="' + (sw * 0.8) + '"/>' +
      '</g>';
  }
  function chefSvg(attrs, stroke, sw) {
    return '<svg ' + (attrs || "") + ' viewBox="18 4 64 104">' + chef(stroke || C.cobre, sw) + '</svg>';
  }

  // Selo circular completo. Precisa das fontes Sacramento e Jost carregadas na página.
  function seal(attrs, o) {
    o = o || {};
    var bg = o.bg || C.cacau, ink = o.ink || C.creme, line = o.line || C.cobre;
    return '<svg ' + (attrs || "") + ' viewBox="0 0 400 400" role="img" aria-label="La Bella Fornatta, Padaria e Restaurante">' +
      '<circle cx="200" cy="200" r="200" fill="' + bg + '"/>' +
      (o.ring ? '<circle cx="200" cy="200" r="186" fill="none" stroke="' + line + '" stroke-width="1.2" opacity=".55"/>' : '') +
      '<g transform="translate(152.5 88) scale(.95)">' + chef(line, 2.3) + '</g>' +
      '<text x="200" y="258" text-anchor="middle" font-family="Sacramento, cursive" font-size="60" textLength="318" lengthAdjust="spacingAndGlyphs" fill="' + ink + '">La Bella Fornatta</text>' +
      '<text x="200" y="293" text-anchor="middle" font-family="Jost, sans-serif" font-weight="500" font-size="13.5" letter-spacing="4.2" fill="' + line + '">PADARIA &amp; RESTAURANTE</text>' +
      '</svg>';
  }

  // Ícone (favicon / avatar pequeno): círculo cacau só com o chef.
  function badge(attrs, o) {
    o = o || {};
    return '<svg ' + (attrs || "") + ' viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="' + (o.bg || C.cacau) + '"/>' +
      '<g transform="translate(16.5 15) scale(.67)">' + chef(o.line || C.cobre, 4.2) + '</g></svg>';
  }

  // Espiga de trigo (ornamento, inspirado no papel de parede do salão).
  function wheat(stroke, sw) {
    var g = '<g fill="none" stroke="' + stroke + '" stroke-width="' + (sw || 1.6) + '" stroke-linecap="round"><path d="M30 118C30 80 31 46 34 10"/>';
    for (var i = 0; i < 7; i++) {
      var y = 22 + i * 12, x = 30 + (118 - y) * 0.03 + 1.2;
      g += '<path d="M' + x + ' ' + y + 'c-8-1-12-6-13-13 7 0 12 4 13 13z"/>';
      g += '<path d="M' + (x + .6) + ' ' + (y - 2) + 'c8-1 12-6 13-13-7 0-12 4-13 13z"/>';
    }
    return g + '<path d="M34 10c1-4 2-6 3-8"/></g>';
  }

  // Ilustrações de traço (mesma linguagem do chef). Todas em viewBox 0 0 120 120.
  var ILL = {
    pao: '<path d="M14 74c0-19 21-32 46-32s46 13 46 32c0 8-6 12-14 12H28c-8 0-14-4-14-12z"/><path d="M36 54c4 5 5 11 3 18M58 49c4 6 5 13 3 22M80 53c4 5 5 11 3 18"/>',
    croissant: '<path d="M14 76c2-14 13-24 24-26 4-14 14-20 22-20s18 6 22 20c11 2 22 12 24 26-9 4-19 2-26-4-6 6-13 8-20 8s-14-2-20-8c-7 6-17 8-26 4z"/><path d="M38 50c4 8 5 16 4 24M82 50c-4 8-5 16-4 24M60 30v38"/>',
    xicara: '<path d="M26 58h56v10c0 15-12.5 26-28 26S26 83 26 68z"/><path d="M82 62h6a9 9 0 0 1 0 18h-9"/><path d="M18 100h72"/>' +
      '<path class="vapor" d="M44 48c-5-6 5-10 0-17"/><path class="vapor v2" d="M56 48c-5-6 5-10 0-17"/><path class="vapor v3" d="M68 48c-5-6 5-10 0-17"/>',
    bolo: '<path d="M18 92V60l74-22v54z"/><path d="M18 60l74-22 10 6v48H92"/><path d="M18 74c8 4 16-4 24 0s16-4 24 0 16-4 26 0"/><path d="M92 38c2-8 8-10 12-6"/><circle cx="104" cy="30" r="4"/>',
    sopa: '<path d="M16 62h88c0 20-18 34-44 34S16 82 16 62z"/><path d="M44 96v6h32v-6"/><path d="M78 40 98 20"/>' +
      '<path class="vapor" d="M40 54c-5-6 5-10 0-17"/><path class="vapor v2" d="M58 54c-5-6 5-10 0-17"/>',
    buffet: '<path d="M14 74h92"/><path d="M22 74c0-17 17-28 38-28s38 11 38 28"/><path d="M60 46v-5"/><circle cx="60" cy="38" r="3"/><path d="M26 74v14h68V74"/><path d="M34 96h52"/>',
    beirute: '<path d="M16 66c0-10 20-16 44-16s44 6 44 16z"/><path d="M16 66h88"/><path d="M18 72c8 3 16-3 24 0s16-3 24 0 16-3 24 0 10-2 14 0"/><path d="M16 80h88c0 6-6 8-12 8H28c-6 0-12-2-12-8z"/>',
    garfo: '<path d="M40 16v30c0 6 4 9 8 9v49M48 16v26M56 16v30c0 6-4 9-8 9"/><path d="M80 104V16c-8 6-12 18-12 34 0 6 4 9 12 9"/>'
  };
  function ill(k, attrs, stroke, sw) {
    return '<svg ' + (attrs || "") + ' viewBox="0 0 120 120" aria-hidden="true"><g fill="none" stroke="' + (stroke || "currentColor") + '" stroke-width="' + (sw || 2.4) + '" stroke-linecap="round" stroke-linejoin="round">' + ILL[k] + '</g></svg>';
  }

  return { C: C, chef: chef, chefSvg: chefSvg, seal: seal, badge: badge, wheat: wheat, ill: ill, ILL: ILL };
})();
if (typeof module !== "undefined") module.exports = LBF;
