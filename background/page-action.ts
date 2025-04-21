// Page Action
browser.pageAction.onClicked.addListener((tab) => {
  if (tab.url && tab.id) {
    const split = tab.url.split('/');
    const id = split[split.indexOf('comments') + 1];
    browser.tabs.create({
      url: 'http://reddit-stream.com/comments/' + id,
      index: tab.index + 1,
      openerTabId: tab.id,
      active: true,
    });
  }
});
