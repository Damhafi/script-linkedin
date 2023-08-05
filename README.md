<h1 align="center">Hi 👋, I'm Script Linkedln</h1>
<h3 align="center">Script Feito em JavaScript</h3>

<h3 align="left">Connect with me:</h3>
<p align="left">
</p>

<h3 align="left">Languages and Tools:</h3>
<p align="left"> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> </p>

```javascript
const cards = document.querySelectorAll('.discover-entity-type-card');

cards.forEach((card) => {
  const nome = card.querySelector('.discover-person-card__name');
  const cargo = card.querySelector('.discover-person-card__occupation');
  const botaoConectar = card.querySelector('.artdeco-button--2');

  if (cargo.textContent.toLowerCase().includes('outsystems') && !botaoConectar.classList.contains('artdeco-button--muted')) {
    setTimeout(() => {
        console.log('Adicionando:', nome.textContent.trim(), '-', cargo.textContent.trim());
      botaoConectar.click();
    }, 2000);
  }
});```
```
