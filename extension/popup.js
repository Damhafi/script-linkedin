document.addEventListener("DOMContentLoaded", () => {
  const btnStart = document.getElementById("btnStart");
  const btnStop = document.getElementById("btnStop");
  const statusDiv = document.getElementById("status");

  // Inputs
  const inputs = {
    keyword: document.getElementById("keyword"),
    scrollAmount: document.getElementById("scrollAmount"),
    scrollDelay: document.getElementById("scrollDelay"),
    clickDelay: document.getElementById("clickDelay"),
  };

  // Load settings
  chrome.storage.local.get(
    ["keyword", "scrollAmount", "scrollDelay", "clickDelay"],
    (result) => {
      if (result.keyword) inputs.keyword.value = result.keyword;
      if (result.scrollAmount) inputs.scrollAmount.value = result.scrollAmount;
      if (result.scrollDelay) inputs.scrollDelay.value = result.scrollDelay;
      if (result.clickDelay) inputs.clickDelay.value = result.clickDelay;
    }
  );

  // Save settings on change
  Object.keys(inputs).forEach((key) => {
    inputs[key].addEventListener("change", () => {
      const val = inputs[key].value;
      chrome.storage.local.set({ [key]: val });
    });
  });

  // Start Button
  btnStart.addEventListener("click", async () => {
    const config = {
      keyword: inputs.keyword.value.toLowerCase(),
      scrollAmount: parseInt(inputs.scrollAmount.value, 10),
      scrollDelay: parseInt(inputs.scrollDelay.value, 10),
      clickDelay: parseInt(inputs.clickDelay.value, 10),
    };

    if (!config.keyword) {
      updateStatus("Por favor, defina uma palavra-chave.");
      return;
    }

    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    if (!tab) {
      updateStatus("Erro: Nenhuma aba ativa encontrada.");
      return;
    }

    if (!tab.url.includes("linkedin.com")) {
      updateStatus("Erro: Use este script apenas no LinkedIn.");
      return;
    }

    chrome.tabs.sendMessage(
      tab.id,
      { action: "start", config: config },
      (response) => {
        if (chrome.runtime.lastError) {
          updateStatus(
            "Erro: Recarregue a página do LinkedIn e tente novamente."
          );
        } else {
          updateStatus("Iniciando automação...");
          toggleButtons(true);
        }
      }
    );
  });

  // Stop Button
  btnStop.addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    if (tab) {
      chrome.tabs.sendMessage(tab.id, { action: "stop" });
      updateStatus("Parando...");
      toggleButtons(false);
    }
  });

  // Listen for status updates from content script
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "statusUpdate") {
      updateStatus(request.message);
    }
    if (request.action === "finished") {
      toggleButtons(false);
      updateStatus(request.message);
    }
  });

  function updateStatus(msg) {
    statusDiv.innerText = msg;
    // Auto scroll to bottom of status if it was a log list, but here it's just text
  }

  function toggleButtons(isRunning) {
    btnStart.disabled = isRunning;
    btnStop.disabled = !isRunning;
  }
});
