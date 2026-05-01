const screens = document.querySelectorAll('.screen');
const navButtons = document.querySelectorAll('[data-screen]');
const quickAddJobButton = document.getElementById('quickAddJob');
const jobForm = document.getElementById('jobForm');
const jobList = document.getElementById('jobList');

const storageKey = 'countyLineCrewJobs';

function getJobs() {
  const savedJobs = localStorage.getItem(storageKey);
  return savedJobs ? JSON.parse(savedJobs) : [];
}

function saveJobs(jobs) {
  localStorage.setItem(storageKey, JSON.stringify(jobs));
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

navButtons.forEach((button) => {
  button.addEventListener('click', () => {
    setActiveScreen(button.dataset.screen);
  });
});

quickAddJobButton.addEventListener('click', () => {
  setActiveScreen('jobs');
  document.getElementById('customerName').focus();
});

jobForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const jobs = getJobs();
  const newJob = {
    id: crypto.randomUUID(),
    customerName: document.getElementById('customerName').value.trim(),
    serviceType: document.getElementById('serviceType').value,
    jobDate: document.getElementById('jobDate').value,
    jobAmount: document.getElementById('jobAmount').value,
    createdAt: new Date().toISOString(),
  };

  jobs.unshift(newJob);
  saveJobs(jobs);
  jobForm.reset();
  renderJobs();
});

renderJobs();
