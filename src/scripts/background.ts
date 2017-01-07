chrome.browserAction.onClicked.addListener(function(tab: any) {
  chrome.tabs.query({active: true}, function(tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      {"action": "toggleSidebar"}
     )
  })
})
