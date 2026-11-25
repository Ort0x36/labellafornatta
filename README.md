# La Bella Fornatta

Landing page de prévia da La Bella Fornatta (padaria e restaurante em Mauá/SP).

Site estático em um único arquivo (`index.html`), publicado pela Vercel (framework "Other", sem build).

- **Regerar o HTML:** `node assets-src/build_index.js` (sobrescreve o `index.html`; edite o gerador)
- **WhatsApp:** `WHATSAPP_NUMBER` no gerador (DDI + DDD + número, só dígitos). Na prévia fica vazio.
- **Cardápio:** array `MENU` (preencha `preco`). **Buffet do dia:** array `BUFFET_HOJE`. **Horário:** array `HOURS`.
- **Domínio:** constante `SITE` no gerador (og:url, og:image, canonical). Confirmar depois de criar o projeto na Vercel.
- **Imagem de prévia do link:** `python3 assets-src/make_og.py`
- A prévia tem `noindex`; remova a linha na publicação oficial.

A pasta `assets-src/` não é publicada (`.vercelignore`).
