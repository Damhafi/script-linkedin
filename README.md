# Script LinkedIn – Convites via DevTools

Scripts em **JavaScript** para enviar convites no LinkedIn filtrando por palavra‑chave, rodando diretamente no **console do DevTools** do navegador.

> ⚠️ Aviso  
> O uso de automações pode violar os termos de uso do LinkedIn.  
> Use por sua conta e risco. Sua conta pode sofrer limitações ou bloqueios.

---

## Arquivos

- `linkedin-automation.js`  
  Nova versão do script. Faz scroll automático, carrega mais resultados e envia convites apenas para cards que contenham a palavra‑chave definida em `CONFIG.keyword`.

- `old-script.js`  
  Versão antiga / legado do script, mantida apenas para referência histórica.

---

## Como usar

1. Acesse o [LinkedIn](https://www.linkedin.com/) e faça login.
2. Vá para uma página de lista de pessoas (por exemplo: resultados de busca, lista de quem curtiu uma publicação, etc.).
3. Abra o DevTools:
   - Chrome/Edge: `F12` ou `Ctrl+Shift+I` (Windows/Linux), `Cmd+Option+I` (macOS) e vá na aba **Console**.
4. Abra o arquivo `linkedin-automation.js` aqui no GitHub, copie **todo o código**.
5. Cole o código no console e aperte `Enter`.

O script vai:

- Fazer scroll na página algumas vezes (`scrollAmount`).
- Clicar em **“Carregar mais”** se esse botão existir.
- Encontrar os cards de pessoas.
- Enviar convite apenas para quem tiver o texto do card contendo a palavra‑chave (`CONFIG.keyword`).

---

## Configuração rápida

Edite o objeto `CONFIG` no início do script antes de colar no console, se quiser:

```js
const CONFIG = {
    keyword: 'outsystems', // palavra‑chave para filtrar o texto do card
    scrollAmount: 5,       // quantos scrolls fazer para carregar mais pessoas
    scrollDelay: 2000,     // tempo de espera entre scrolls (ms)
    clickDelay: 1500       // tempo entre cada convite (ms)
};
```

---

## Licença

Defina aqui a licença que preferir (por exemplo, MIT).
