const balanceValue = document.getElementById('balanceValue');
const toggleButton = document.getElementById('toggleBalance');
const loginForm = document.querySelector('[data-login-form]');
const accountForm = document.querySelector('[data-account-form]');
const transferForm = document.querySelector('[data-transfer-form]');
const supportForm = document.querySelector('[data-support-form]');
const statusBox = document.querySelector('[data-status]');

let hidden = false;

function updateBalanceDisplay() {
  if (balanceValue && toggleButton) {
    balanceValue.textContent = hidden ? '$••••••••' : '$200,000.00';
    toggleButton.textContent = hidden ? 'Show balance' : 'Hide balance';
  }
}

toggleButton?.addEventListener('click', () => {
  hidden = !hidden;
  updateBalanceDisplay();
});

loginForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  window.location.href = 'dashboard.html';
});

accountForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (statusBox) {
    statusBox.innerHTML = '<p class="success-text">Account created successfully. Redirecting to your dashboard…</p>';
  }
  setTimeout(() => {
    window.location.href = 'dashboard.html';
  }, 900);
});

transferForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (statusBox) {
    statusBox.innerHTML = '<p class="success-text">Transfer submitted successfully.</p>';
  }
});

supportForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (statusBox) {
    statusBox.innerHTML = '<p class="success-text">Support request received. A specialist will contact you shortly.</p>';
  }
});

updateBalanceDisplay();
