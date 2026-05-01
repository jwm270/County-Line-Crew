const screens = document.querySelectorAll('.screen');
const navButtons = document.querySelectorAll('[data-screen]');
const quickAddJobButton = document.getElementById('quickAddJob');
const jobForm = document.getElementById('jobForm');
const jobList = document.getElementById('jobList');
const jobCustomerSelect = document.getElementById('jobCustomerSelect');
const customerForm = document.getElementById('customerForm');
const customerList = document.getElementById('customerList');

const jobStorageKey = 'countyLineCrewJobs';
const customerStorageKey = 'countyLineCrewCustomers';

function readStorage(key) {
  const savedItems = localStorage.getItem(key);
  return savedItems ? JSON.parse(savedItems) : [];
}

function writeStorage(key, items) {
  localStorage.setItem(key, JSON.stringify(items));
}

function getJobs() {
  return readStorage(jobStorageKey);
}

function saveJobs(jobs) {
  writeStorage(jobStorageKey, jobs);
}

function getCustomers() {
  return readStorage(customerStorageKey);
}

function saveCustomers(customers) {
  writeStorage(customerStorageKey, customers);
}

function setActiveScreen(screenName) {
  screens.forEach((screen) => {
    screen.classList.toggle('active', screen.id === `screen-${screenName}`);
  });

  document.querySelectorAll('.bottom-nav button').forEach((button) => {
    button.classList.toggle('active', button.dataset.screen === screenName);
  });
}

function formatCurrency(value) {
  return Number(value).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
}

function renderCustomerOptions() {
  const customers = getCustomers();

  if (!customers.length) {
    jobCustomerSelect.innerHTML = '<option value="">Add a customer first</option>';
    jobCustomerSelect.disabled = true;
    return;
  }

  jobCustomerSelect.disabled = false;
  jobCustomerSelect.innerHTML = '<option value="">Select customer</option>' + customers
    .map(
      (customer) => `<option value="${customer.id}">${customer.name}</option>`
    )
    .join('');
}

function renderJobs() {
  const jobs = getJobs();

  if (!jobs.length) {
    jobList.innerHTML = `
      <article class="job-card">
        <div>
          <h3>No saved jobs yet</h3>
          <p>Add your first job with the form above.</p>
        </div>
      </article>
    `;
    return;
  }

  jobList.innerHTML = jobs
    .map(
      (job) => `
        <article class="job-card">
          <div>
            <h3>${job.customerName}</h3>
            <p>${job.serviceType} · ${job.jobDate} · ${formatCurrency(job.jobAmount)}</p>
          </div>
          <span class="status-badge">Saved</span>
        </article>
      `
    )
    .join('');
}

function renderCustomers() {
  const customers = getCustomers();

  if (!customers.length) {
    customerList.innerHTML = `
      <article class="job-card">
        <div>
          <h3>No saved customers yet</h3>
          <p>Add your first customer with the form above.</p>
        </div>
      </article>
    `;
    return;
  }

  customerList.innerHTML = customers
    .map(
      (customer) => `
        <article class="job-card">
          <div>
            <h3>${customer.name}</h3>
            <p>${customer.phone || 'No phone'} · ${customer.address || 'No address saved'}</p>
          </div>
          <span class="status-badge">Customer</span>
        </article>
      `
    )
    .join('');
}

navButtons.forEach((button) => {
  button.addEventListener('click', () => {
    setActiveScreen(button.dataset.screen);
  });
});

quickAddJobButton.addEventListener('click', () => {
  setActiveScreen('jobs');
  jobCustomerSelect.focus();
});

jobForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const selectedCustomer = getCustomers().find(
    (customer) => customer.id === jobCustomerSelect.value
  );

  if (!selectedCustomer) {
    alert('Add and select a customer before saving a job.');
    return;
  }

  const jobs = getJobs();
  const newJob = {
    id: crypto.randomUUID(),
    customerId: selectedCustomer.id,
    customerName: selectedCustomer.name,
    serviceType: document.getElementById('serviceType').value,
    jobDate: document.getElementById('jobDate').value,
    jobAmount: document.getElementById('jobAmount').value,
    createdAt: new Date().toISOString(),
  };

  jobs.unshift(newJob);
  saveJobs(jobs);
  jobForm.reset();
  renderJobs();
  renderCustomerOptions();
});

customerForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const customers = getCustomers();
  const newCustomer = {
    id: crypto.randomUUID(),
    name: document.getElementById('newCustomerName').value.trim(),
    phone: document.getElementById('newCustomerPhone').value.trim(),
    email: document.getElementById('newCustomerEmail').value.trim(),
    address: document.getElementById('newCustomerAddress').value.trim(),
    notes: document.getElementById('newCustomerNotes').value.trim(),
    createdAt: new Date().toISOString(),
  };

  customers.unshift(newCustomer);
  saveCustomers(customers);
  customerForm.reset();
  renderCustomers();
  renderCustomerOptions();
});

renderJobs();
renderCustomers();
renderCustomerOptions();
