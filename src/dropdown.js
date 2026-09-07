// Keep the select as the value source while rendering an accessible custom popup.
export function enhanceDropdowns() {
  for (const select of document.querySelectorAll('select')) {
    if (!select._dropdown) {
      const root = document.createElement('div');
      root.className = 'dropdown';
      select.before(root);
      root.append(select);
      select.hidden = true;
      const trigger = document.createElement('button');
      trigger.type = 'button';
      trigger.className = 'dropdown-trigger';
      trigger.setAttribute('role', 'combobox');
      trigger.setAttribute('aria-haspopup', 'listbox');
      trigger.setAttribute('aria-expanded', 'false');
      trigger.setAttribute('aria-label', select.getAttribute('aria-label'));
      trigger.setAttribute('aria-controls', `${select.id}-options`);
      const list = document.createElement('div');
      list.id = `${select.id}-options`;
      list.className = 'dropdown-options';
      list.setAttribute('role', 'listbox');
      list.setAttribute('aria-label', select.getAttribute('aria-label'));
      list.hidden = true;
      root.append(trigger, list);
      let active = 0;
      let prefix = '';
      let typedAt = 0;
      const options = () => [...list.children];
      const highlight = index => {
        active = Math.max(0, Math.min(options().length - 1, index));
        options().forEach((option, i) => option.classList.toggle('highlighted', i === active));
        trigger.setAttribute('aria-activedescendant', options()[active]?.id || '');
        options()[active]?.scrollIntoView({ block: 'nearest' });
      };
      const close = () => {
        list.hidden = true;
        trigger.setAttribute('aria-expanded', 'false');
        trigger.removeAttribute('aria-activedescendant');
      };
      const open = () => {
        document.dispatchEvent(new Event('dropdown-close'));
        list.hidden = false;
        trigger.setAttribute('aria-expanded', 'true');
        highlight(select.selectedIndex);
      };
      const choose = index => {
        select.selectedIndex = index;
        close();
        select.dispatchEvent(new Event('change', { bubbles: true }));
        trigger.focus();
      };
      trigger.addEventListener('click', () => list.hidden ? open() : close());
      trigger.addEventListener('keydown', event => {
        const key = event.key;
        if (key === 'Escape' && !list.hidden) {
          event.preventDefault(); event.stopPropagation(); close(); return;
        }
        if (key === 'Tab') { close(); return; }
        if (['ArrowDown', 'ArrowUp', 'Home', 'End', 'Enter', ' '].includes(key)) {
          event.preventDefault(); event.stopPropagation();
          if (list.hidden) { open(); return; }
          if (key === 'Enter' || key === ' ') choose(active);
          else highlight(key === 'Home' ? 0 : key === 'End' ? options().length - 1 : active + (key === 'ArrowDown' ? 1 : -1));
        } else if (key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
          event.stopPropagation();
          if (list.hidden) open();
          prefix = Date.now() - typedAt > 700 ? key : prefix + key;
          typedAt = Date.now();
          const index = [...select.options].findIndex(option => option.text.toLowerCase().startsWith(prefix.toLowerCase()));
          if (index >= 0) highlight(index);
        }
      });
      list.addEventListener('pointerdown', event => event.preventDefault());
      list.addEventListener('click', event => {
        const option = event.target.closest('[role="option"]');
        if (option) choose(Number(option.dataset.index));
      });
      document.addEventListener('pointerdown', event => { if (!root.contains(event.target)) close(); });
      document.addEventListener('dropdown-close', close);
      root.addEventListener('focusout', event => { if (!root.contains(event.relatedTarget)) close(); });
      select._dropdown = { root, trigger, list };
    }
    const { root, trigger, list } = select._dropdown;
    root.hidden = select.dataset.unavailable === 'true';
    trigger.textContent = select.selectedOptions[0]?.text || '';
    list.replaceChildren(...[...select.options].map((option, index) => {
      const item = document.createElement('div');
      item.id = `${select.id}-option-${index}`;
      item.setAttribute('role', 'option');
      item.setAttribute('aria-selected', option.selected);
      item.dataset.index = index;
      item.textContent = option.text;
      return item;
    }));
    trigger.setAttribute('aria-expanded', 'false');
    list.hidden = true;
  }
}
