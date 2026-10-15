(() => {
  const menuBrowser = document.querySelector('[data-menu-browser]');

  if (!menuBrowser) return;

  const tabs = Array.from(menuBrowser.querySelectorAll('[data-menu-target]'));
  const panels = Array.from(menuBrowser.querySelectorAll('[data-menu-panel]'));
  const validGroups = new Set(tabs.map((tab) => tab.dataset.menuTarget));

  const activateGroup = (groupId, options = {}) => {
    const { updateHash = true, moveFocus = false } = options;

    if (!validGroups.has(groupId)) return;

    tabs.forEach((tab) => {
      const isActive = tab.dataset.menuTarget === groupId;
      tab.classList.toggle('is-active', isActive);
      tab.setAttribute('aria-selected', String(isActive));
      tab.tabIndex = isActive ? 0 : -1;

      if (isActive && moveFocus) tab.focus();
    });

    panels.forEach((panel) => {
      const isActive = panel.id === groupId;
      panel.hidden = !isActive;
      panel.classList.toggle('is-active', isActive);
    });

    if (updateHash) {
      const nextUrl = `${window.location.pathname}${window.location.search}#${groupId}`;
      window.history.replaceState(null, '', nextUrl);
    }
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activateGroup(tab.dataset.menuTarget));

    tab.addEventListener('keydown', (event) => {
      let nextIndex = null;

      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
        nextIndex = (index + 1) % tabs.length;
      } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        nextIndex = (index - 1 + tabs.length) % tabs.length;
      } else if (event.key === 'Home') {
        nextIndex = 0;
      } else if (event.key === 'End') {
        nextIndex = tabs.length - 1;
      }

      if (nextIndex === null) return;

      event.preventDefault();
      activateGroup(tabs[nextIndex].dataset.menuTarget, {
        updateHash: true,
        moveFocus: true
      });
    });
  });

  window.addEventListener('hashchange', () => {
    const groupId = window.location.hash.slice(1);
    if (validGroups.has(groupId)) activateGroup(groupId, { updateHash: false });
  });

  const requestedGroup = window.location.hash.slice(1);
  activateGroup(validGroups.has(requestedGroup) ? requestedGroup : tabs[0].dataset.menuTarget, {
    updateHash: false
  });
})();
