import icon from '../icons/icon-128.png';
import disabledIcon from '../icons/disabled-128.png';

// Browser Action

browser.tabs.onUpdated.addListener((tabId, _, tab) => {
  console.log('tab updated', tabId, tab);
  const isRedditUrl =
    tab.url &&
    tab.url.includes('reddit.com/r/') &&
    tab.url.includes('/comments/');

  console.log('isRedditUrl', isRedditUrl);

  isRedditUrl ? browser.action.enable(tabId) : browser.action.disable(tabId);
  browser.action.setIcon({
    path: {
      128: isRedditUrl ? icon : disabledIcon,
    },
    tabId: tabId,
  });
});

browser.action.onClicked.addListener((tab) => {
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

// Context Menu

browser.contextMenus.create({
  id: 'reddit-stream-link',
  title: 'Open in Reddit Stream',
  contexts: ['link'],
  targetUrlPatterns: ['*://www.reddit.com/r/*/comments/*'],
});

browser.contextMenus.create({
  id: 'reddit-stream',
  title: 'Open in Reddit Stream',
  contexts: ['page'],
  documentUrlPatterns: ['*://www.reddit.com/r/*/comments/*'],
});

browser.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'reddit-stream') {
    if (tab?.url) {
      const split = tab.url.split('/');
      const id = split[split.indexOf('comments') + 1];
      browser.tabs.create({
        url: 'http://reddit-stream.com/comments/' + id,
        index: tab.index + 1,
        openerTabId: tab.id,
        active: true,
      });
    }
  }
  if (info.menuItemId === 'reddit-stream-link' && info.linkUrl) {
    const split = info.linkUrl.split('/');
    const id = split[split.indexOf('comments') + 1];
    browser.tabs.create({
      url: 'http://reddit-stream.com/comments/' + id,
      index: tab?.index ? tab.index + 1 : undefined,
      openerTabId: tab?.id,
      active: true,
    });
  }
});
