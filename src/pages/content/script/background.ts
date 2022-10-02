// @ts-ignore
const timer = /.+?\/timer/

const isTimer = (tab: chrome.tabs.Tab): boolean => {
  return tab.url ? timer.test(tab.url) : false
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && isTimer(tab)) {
    chrome.tabs.sendMessage(tabId, {
      message: 'path-change',
    })
  }
})
