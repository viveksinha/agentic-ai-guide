// ============================================================
//  AGENTIC AI GUIDE — Main JS
// ============================================================

// ---- THEME (dark / light) ----
(function () {
  const STORAGE_KEY = 'aa-theme';
  const root = document.documentElement;

  // Resolve the theme to apply on load:
  //   1. User's saved preference wins
  //   2. Otherwise respect OS preference
  function getInitialTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }

  // Apply immediately (before DOMContentLoaded) to avoid flash
  applyTheme(getInitialTheme());

  // Wire up the button once DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('themeToggle');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme');
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });

    // Also respond to OS-level changes (only if user hasn't set a preference)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  });
})();

// Mark active nav link
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });
});

// Tab switching
function showTab(groupId, tabId) {
  document.querySelectorAll(`#${groupId} .tab-panel`).forEach(p => p.classList.remove('active'));
  document.querySelectorAll(`#${groupId} .tab-btn`).forEach(b => b.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
  event.target.classList.add('active');
}

// Copy code button
function copyCode(btn) {
  const pre = btn.closest('.code-block').querySelector('pre');
  const text = pre.innerText;
  navigator.clipboard.writeText(text).then(() => {
    btn.textContent = 'Copied!';
    setTimeout(() => btn.textContent = 'Copy', 2000);
  });
}
