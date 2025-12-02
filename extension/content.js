let isRunning = false;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "start") {
    if (isRunning) return;
    isRunning = true;
    startAutomation(request.config);
    sendResponse({ status: "started" });
  } else if (request.action === "stop") {
    isRunning = false;
    sendResponse({ status: "stopped" });
  }
});

function sendStatus(msg) {
  chrome.runtime
    .sendMessage({ action: "statusUpdate", message: msg })
    .catch(() => {
      // Popup might be closed, ignore error
    });
}

function sendFinished(msg) {
  chrome.runtime.sendMessage({ action: "finished", message: msg }).catch(() => {
    // Popup might be closed
  });
}

async function startAutomation(config) {
  sendStatus(`Iniciando... Keyword: "${config.keyword}"`);

  const scrollContainer =
    document.querySelector(".artdeco-modal__content") ||
    document.scrollingElement ||
    document.body;

  // Scrolling Phase
  for (let i = 0; i < config.scrollAmount; i++) {
    if (!isRunning) {
      sendFinished("Parado pelo usuário.");
      return;
    }

    sendStatus(`Scroll ${i + 1}/${config.scrollAmount}...`);
    scrollContainer.scrollTop = scrollContainer.scrollHeight;
    window.scrollTo(0, document.body.scrollHeight);

    const btnLoadMore = Array.from(document.querySelectorAll("button")).find(
      (b) => b.innerText.includes("Carregar mais")
    );
    if (btnLoadMore) {
      btnLoadMore.click();
      sendStatus('Botão "Carregar mais" clicado.');
    }

    await new Promise((r) => setTimeout(r, config.scrollDelay));
  }

  if (!isRunning) {
    sendFinished("Parado pelo usuário.");
    return;
  }

  // Processing Phase
  const cards = document.querySelectorAll('div[role="listitem"]');
  let count = 0;
  let processed = 0;

  sendStatus(`Encontrados ${cards.length} cards. Analisando...`);

  // We need to process sequentially to respect delays and stop flag
  for (const card of cards) {
    if (!isRunning) {
      sendFinished(`Parado. Convites enviados: ${count}`);
      return;
    }

    const cardText = card.innerText.toLowerCase();
    const btnConnect = card.querySelector(
      'button[aria-label*="conectar"], button[aria-label*="Connect"]'
    );

    if (!btnConnect) continue;

    const isInvite =
      btnConnect.innerText.includes("Conectar") ||
      btnConnect.innerText.includes("Connect");
    const isPending =
      btnConnect.disabled ||
      btnConnect.innerText.includes("Pendente") ||
      btnConnect.innerText.includes("Pending");

    if (cardText.includes(config.keyword) && isInvite && !isPending) {
      count++;
      const nameEl =
        card.querySelector(".artdeco-entity-lockup__title") ||
        card.querySelector(".entity-result__title-text");
      const name = nameEl ? nameEl.innerText.split("\n")[0].trim() : "Usuario";

      sendStatus(`Convidando [${count}]: ${name}`);

      btnConnect.click();

      // Wait for click delay
      await new Promise((r) => setTimeout(r, config.clickDelay));

      // Handle "Add a note" modal if it appears
      const btnSendNow = document.querySelector(
        'button[aria-label*="Enviar agora"], button[aria-label*="Send now"]'
      );
      if (btnSendNow) {
        btnSendNow.click();
        await new Promise((r) => setTimeout(r, 500)); // Small wait after closing modal
      }
    }
  }

  isRunning = false;
  sendFinished(`Finalizado. Total convites: ${count}`);
}
