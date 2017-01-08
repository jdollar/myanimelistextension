'use strict'
import * as React from 'react'
import {render} from 'react-dom'
import { Provider } from 'react-redux'
import { configureStore } from './../ts/store'
import Sidebar from './../ts/components/Sidebar'

const store = configureStore();

//creating a container for the sidebar to reside
let sidebarContainer = document.createElement('DIV')
sidebarContainer.setAttribute('id', 'sidebarContainer')
document.body.appendChild(sidebarContainer)

render(
  <Provider store={store}>
    <Sidebar />
  </Provider>,
  document.getElementById('sidebarContainer')
)

//TODO: send messages out to all active tabs. Ensures all open instances stay in sync
chrome.runtime.onMessage.addListener(function(message: any) {
  if (message.action == 'toggleSidebar') {
    alert('test');
  }
})
