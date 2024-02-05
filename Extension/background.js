chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({cookieType: 'REJECT'}, () => {
        console.log('Default cookie type set to REJECT');
    });
});

let lastDomain = {};
let tabsReadyForInjection = {};

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // If the URL has changed, update the domain and mark the tab as needing script injection.
  if (changeInfo.url) {
    const newUrl = new URL(changeInfo.url);
    const newDomain = newUrl.hostname;
    if (lastDomain[tabId] !== newDomain) {
      lastDomain[tabId] = newDomain; // Update the last domain for this tab.
      tabsReadyForInjection[tabId] = false; // Reset readiness for new domain.
    }
  }

  // Check if the page is fully loaded.
  if (changeInfo.status === 'complete') {
    // Mark as ready for injection only if the domain was previously updated.
    if (tabsReadyForInjection.hasOwnProperty(tabId) && !tabsReadyForInjection[tabId]) {
      tabsReadyForInjection[tabId] = true; // Mark as ready.
      // Inject the content script since the domain has changed and the page is fully loaded.
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ['content.js']
      })
    }
  }
});

// Cleanup when a tab is closed to avoid memory leaks.
chrome.tabs.onRemoved.addListener((tabId) => {
  delete lastDomain[tabId];
  delete tabsReadyForInjection[tabId];
});