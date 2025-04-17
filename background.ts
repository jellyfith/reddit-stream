browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.url && tab.url.includes("reddit.com/r/") && tab.url.includes("/comments/")) {
        // Enable the browser action for this tab
        browser.action.enable(tabId);
    } else {
        // Disable the browser action for this tab
        browser.action.disable(tabId);
    }
});
  
browser.action.onClicked.addListener((tab) => {
    if (tab.url && tab.id) {
        const modifiedUrl = tab.url.replace("reddit.com", "reddit-stream.com");
        browser.tabs.update(tab.id, { url: modifiedUrl });
    }
  });