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
});
