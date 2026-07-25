const balanceValue = document.getElementById('balanceValue');
const toggleButton = document.getElementById('toggleBalance');
const loginForm = document.querySelector('[data-login-form]');
const accountForm = document.querySelector('[data-account-form]');
const transferForm = document.querySelector('[data-transfer-form]');
const supportForm = document.querySelector('[data-support-form]');
const statusBox = document.querySelector('[data-status]');

let hidden = false;

// Initialize default customers if none exist
function initializeDefaultCustomers() {
  if (!localStorage.getItem('customers')) {
    const defaultCustomers = [
      {
        email: 'alex@example.com',
        password: 'password',
        fullName: 'Alex Morgan',
        address: '123 Main St',
        accountType: 'Checking account',
        balance: 200000,
        transactions: []
      }
    ];
    localStorage.setItem('customers', JSON.stringify(defaultCustomers));
  }
}

initializeDefaultCustomers();

// Update dashboard with logged-in customer data
function updateDashboard() {
  const loggedInCustomer = JSON.parse(localStorage.getItem('loggedInCustomer') || 'null');
  
  if (loggedInCustomer) {
    const firstName = loggedInCustomer.fullName.split(' ')[0];
    const balanceFormatted = '$' + loggedInCustomer.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const accountTypeDisplay = loggedInCustomer.accountType.replace(' account', '');
    
    const nameEl = document.querySelector('[data-customer-name]');
    if (nameEl) nameEl.textContent = firstName;
    
    const fullNameEl = document.querySelector('[data-customer-fullname]');
    if (fullNameEl) fullNameEl.textContent = loggedInCustomer.fullName;
    
    const balanceEl = document.querySelector('[data-customer-balance]');
    if (balanceEl) balanceEl.textContent = balanceFormatted;
    
    const metricBalanceEl = document.querySelector('[data-metric-balance]');
    if (metricBalanceEl) metricBalanceEl.textContent = balanceFormatted;
    
    const accountTypeEl = document.querySelector('[data-customer-accounttype]');
    if (accountTypeEl) accountTypeEl.textContent = accountTypeDisplay;
  }
}

updateDashboard();

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
  const email = loginForm.querySelector('input[type="email"]').value.trim();
  const password = loginForm.querySelector('input[type="password"]').value;
  
  const customers = JSON.parse(localStorage.getItem('customers') || '[]');
  const customer = customers.find(c => c.email === email && c.password === password);
  
  const formStatusBox = loginForm.nextElementSibling || document.querySelector('[data-status]');
  
  if (customer) {
    localStorage.setItem('loggedInCustomer', JSON.stringify(customer));
    window.location.href = 'dashboard.html';
  } else {
    if (formStatusBox) {
      formStatusBox.innerHTML = '<p style="color: #d32f2f; font-weight: 500;">Invalid email or password.</p>';
    }
  }
});

accountForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const inputs = accountForm.querySelectorAll('input, select');
  const fullName = inputs[0].value.trim();
  const email = inputs[1].value.trim();
  const password = inputs[2].value;
  const confirmPassword = inputs[3].value;
  const address = inputs[4].value.trim();
  const accountType = inputs[5].value;
  
  const formStatusBox = accountForm.nextElementSibling || document.querySelector('[data-status]');
  
  // Validate passwords match
  if (password !== confirmPassword) {
    if (formStatusBox) {
      formStatusBox.innerHTML = '<p style="color: #d32f2f; font-weight: 500;">Passwords do not match.</p>';
    }
    return;
  }
  
  // Check if email already exists
  const customers = JSON.parse(localStorage.getItem('customers') || '[]');
  if (customers.some(c => c.email === email)) {
    if (formStatusBox) {
      formStatusBox.innerHTML = '<p style="color: #d32f2f; font-weight: 500;">Email already registered.</p>';
    }
    return;
  }
  
  // Create new customer
  const newCustomer = {
    email,
    password,
    fullName,
    address,
    accountType,
    balance: 0,
    transactions: []
  };
  
  customers.push(newCustomer);
  localStorage.setItem('customers', JSON.stringify(customers));
  localStorage.setItem('loggedInCustomer', JSON.stringify(newCustomer));
  
  if (formStatusBox) {
    formStatusBox.innerHTML = '<p class="success-text">Account created successfully. Redirecting to your dashboard…</p>';
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
