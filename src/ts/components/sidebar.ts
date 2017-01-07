'use strict'

export class Sidebar {
  static animeSidebarId = 'animeListSidebar';
  static animeListOpen = false;

  static toggleSidebar() {
    if (Sidebar.getSidebarElement() === null) {
      Sidebar.createSidebar();
    }
    Sidebar.animeListOpen ? Sidebar.closeSidebar() : Sidebar.openSidebar();
    Sidebar.animeListOpen = !Sidebar.animeListOpen;
  }
  
  static closeSidebar() {
    let el = Sidebar.getSidebarElement();
    el.classList.add('hidden');
  }

  static openSidebar() {
    let el = Sidebar.getSidebarElement();
    el.classList.remove('hidden');
  }

  static getSidebarElement() {
    return document.getElementById(Sidebar.animeSidebarId);
  }

  static createSidebar() {
    let sidebar = document.createElement('div');
    sidebar.id = Sidebar.animeSidebarId;
    sidebar.className = "anime-list-sidebar";
    sidebar.innerHTML = "\
      <h1>Hello</h1>\
      World!\
    ";
    sidebar.style.cssText = "\
      position:fixed;\
      top:0px;\
      left:0px;\
      width:30%;\
      height:100%;\
      background:white;\
      box-shadow:inset 0 0 1em black;\
      z-index:999999;\
    ";
    document.body.appendChild(sidebar);
  }
}
