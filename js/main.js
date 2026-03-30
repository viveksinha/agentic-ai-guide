// ============================================================
//  AGENTIC AI GUIDE — Main JS
// ============================================================

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
