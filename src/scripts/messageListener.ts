import {Sidebar} from './../ts/components/sidebar'

chrome.runtime.onMessage.addListener(function(message: any) {
  if (message.action == 'toggleSidebar') {
    Sidebar.toggleSidebar();
  }
})
