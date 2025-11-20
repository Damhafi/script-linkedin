// Script LinkedIn – Convites via DevTools (NOVA VERSÃO)

const CONFIG = {
    keyword: 'outsystems',
    scrollAmount: 5,    // Qtd de scrolls para carregar a lista
    scrollDelay: 2000,  // Tempo de espera entre scrolls (ms)
    clickDelay: 1500    // Intervalo entre cliques (ms)
};

async function startAutomation() {
    const scrollContainer = document.querySelector('.artdeco-modal__content') || document.scrollingElement || document.body;

    for (let i = 0; i < CONFIG.scrollAmount; i++) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
        window.scrollTo(0, document.body.scrollHeight);

        const btnLoadMore = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Carregar mais'));
        if (btnLoadMore) btnLoadMore.click();

        await new Promise(r => setTimeout(r, CONFIG.scrollDelay));
    }

    const cards = document.querySelectorAll('div[role="listitem"]');
    let count = 0;

    cards.forEach((card) => {
        const cardText = card.innerText.toLowerCase();
        const btnConnect = card.querySelector('button[aria-label*="conectar"], button[aria-label*="Connect"]');

        if (!btnConnect) return;

        const isInvite = btnConnect.innerText.includes('Conectar');
        const isPending = btnConnect.disabled || btnConnect.innerText.includes('Pendente');

        if (cardText.includes(CONFIG.keyword) && isInvite && !isPending) {
            count++;
            setTimeout(() => {
                const nameEl = card.querySelector('.artdeco-entity-lockup__title');
                const name = nameEl ? nameEl.innerText.split('\n')[0].trim() : 'Usuario';
                
                console.log(`Invite sent [${count}]: ${name}`);
                btnConnect.click();
            }, count * CONFIG.clickDelay);
        }
    });

    console.log(`Process finished. Total invites: ${count}`);
}

startAutomation();
