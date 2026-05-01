const screens = document.querySelectorAll('.screen');
const navButtons = document.querySelectorAll('[data-screen]');
const quickAddJobButton = document.getElementById('quickAddJob');
const jobForm = document.getElementById('jobForm');
const jobList = document.getElementById('jobList');
const jobCustomerSelect = document.getElementById('jobCustomerSelect');
const customerForm = document.getElementById('customerForm');
const customerList = document.getElementById('customerList');
const invoiceCard = document.getElementById('invoiceCard');

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

function formatStatus(value) {
  return value
    .replace('_', ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function formatDate(value) {
  if (!value) {
    return 'No date set';
  }

  return new Date(`${value}T00:00:00`).toLocaleDateString('en-US');
}

function createInvoiceNumber() {
  const nextNumber = getJobs().length + 1;
  return `CLC-${String(nextNumber).padStart(5, '0')}`;
}

function getInvoiceNumber(job) {
  return job.invoiceNumber || `CLC-${job.id.slice(0, 5).toUpperCase()}`;
}

function updateJob(jobId, updates) {
  const jobs = getJobs().map((job) => {
    if (job.id !== jobId) {
      return job;
    }

    return {
      ...job,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
  });

  saveJobs(jobs);
  renderJobs();
}

function deleteJob(jobId) {
  const jobs = getJobs().filter((job) => job.id !== jobId);
  saveJobs(jobs);
  renderJobs();
}

function renderInvoice(jobId) {
  const job = getJobs().find((savedJob) => savedJob.id === jobId);
  const customer = job
    ? getCustomers().find((savedCustomer) => savedCustomer.id === job.customerId)
    : null;

  if (!job) {
    invoiceCard.innerHTML = `
      <p class="eyebrow">Invoice Preview</p>
      <h2>Select a saved job</h2>
      <p>Use the View Invoice button on a job card to load invoice details here.</p>
    `;
    return;
  }

  invoiceCard.innerHTML = `
    <p class="eyebrow">Invoice Preview</p>
    <h2>${job.customerName}</h2>
    <p>${job.serviceType}</p>
    <div class="invoice-row"><span>Invoice #</span><strong>${getInvoiceNumber(job)}</strong></div>
    <div class="invoice-row"><span>Date</span><strong>${formatDate(job.jobDate)}</strong></div>
    <div class="invoice-row"><span>Amount</span><strong>${formatCurrency(job.jobAmount)}</strong></div>
    <div class="invoice-row"><span>Job Status</span><strong>${formatStatus(job.jobStatus || 'scheduled')}</strong></div>
    <div class="invoice-row"><span>Payment</span><strong>${formatStatus(job.paymentStatus || 'unpaid')}</strong></div>
    <div class="invoice-row"><span>Phone</span><strong>${customer?.phone || 'Not saved'}</strong></div>
    <div class="invoice-row"><span>Address</span><strong>${customer?.address || 'Not saved'}</strong></div>
    <button class="secondary-button" type="button" onclick="window.print()">Print Invoice</button>
  `;
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
        <article class="job-card job-card-stacked">
          <div class="job-card-top">
            <div>
              <h3>${job.customerName}</h3>
              <p>${job.serviceType} · ${formatDate(job.jobDate)} · ${formatCurrency(job.jobAmount)}</p>
              <p>${getInvoiceNumber(job)} · ${formatStatus(job.jobStatus || 'scheduled')} · ${formatStatus(job.paymentStatus || 'unpaid')}</p>
            </div>
            <span class="status-badge">${formatStatus(job.paymentStatus || 'unpaid')}</span>
          </div>
          <div class="job-actions">
            <button type="button" data-action="view-invoice" data-job-id="${job.id}">View Invoice</button>
            <button type="button" data-action="mark-completed" data-job-id="${job.id}">Mark Completed</button>
            <button type="button" data-action="mark-paid" data-job-id="${job.id}">Mark Paid</button>
            <button class="danger-button" type="button" data-action="delete-job" data-job-id="${job.id}">Delete Job</button>
          </div>
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

jobList.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-action]');

  if (!button) {
    return;
  }

  if (button.dataset.action === 'view-invoice') {
    renderInvoice(button.dataset.jobId);
    setActiveScreen('invoice');
  }

  if (button.dataset.action === 'mark-completed') {
    updateJob(button.dataset.jobId, { jobStatus: 'completed' });
  }

  if (button.dataset.action === 'mark-paid') {
    updateJob(button.dataset.jobId, { paymentStatus: 'paid' });
  }

  if (button.dataset.action === 'delete-job') {
    deleteJob(button.dataset.jobId);
  }
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
    invoiceNumber: createInvoiceNumber(),
    customerId: selectedCustomer.id,
    customerName: selectedCustomer.name,
    serviceType: document.getElementById('serviceType').value,
    jobDate: document.getElementById('jobDate').value,
    jobAmount: document.getElementById('jobAmount').value,
    jobStatus: document.getElementById('jobStatus').value,
    paymentStatus: document.getElementById('paymentStatus').value,
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
renderInvoice();
