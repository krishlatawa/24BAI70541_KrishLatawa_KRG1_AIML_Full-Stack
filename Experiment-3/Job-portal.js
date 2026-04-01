// job-portal.js
// Handles the job details form and dynamically updates the user profile section

// wait for DOM to be ready
window.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('jobForm');
  const profileDiv = document.getElementById('userProfile');

  if (!form || !profileDiv) {
    return; // nothing to do if elements missing
  }

  // helper to render profile based on provided data
  function renderProfile(data, heading = 'Submitted Job Info') {
    profileDiv.innerHTML = `
      <h3>${heading}</h3>
      <p><strong>Title:</strong> ${data.title || '-'} </p>
      <p><strong>Company:</strong> ${data.company || '-'} </p>
      <p><strong>Location:</strong> ${data.location || '-'} </p>
      ${data.salary ? `<p><strong>Salary:</strong> ${data.salary}</p>` : ''}
      ${data.skills ? `<p><strong>Skills:</strong> ${data.skills}</p>` : ''}
    `;
  }

  // clear profile area (optional helper)
  function clearProfile() {
    profileDiv.innerHTML = '';
  }

  // form submission event
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const jobData = {
      title: form.jobTitle.value.trim(),
      company: form.company.value.trim(),
      location: form.location.value.trim(),
      salary: form.salary.value.trim(),
      skills: form.skills.value.trim()
    };

    renderProfile(jobData);

    // reset inputs for next entry
    form.reset();
  });

  // utility to populate form inputs and optionally render profile
  function populateForm(details) {
    form.jobTitle.value = details.title || '';
    form.company.value = details.company || '';
    form.location.value = details.location || '';
    form.salary.value = details.salary || '';
    form.skills.value = details.skills || '';
  }

  // add click listeners to every "Apply Now" button in job cards
  const applyButtons = document.querySelectorAll('.btn-apply');
  applyButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.job-card');
      if (!card) return;

      // extract text from card elements
      const title = card.querySelector('h3')?.textContent || '';
      const company = card.querySelector('.company')?.textContent || '';
      const location = card.querySelector('.location')?.textContent.replace('📍', '').trim() || '';
      const salary = card.querySelector('.salary')?.textContent.replace('💰', '').trim() || '';
      const skills = card.querySelector('.skills')?.textContent.replace('Skills:', '').trim() || '';

      const details = { title, company, location, salary, skills };

      // populate the form and scroll to it so the user can submit or modify
      populateForm(details);
      form.scrollIntoView({ behavior: 'smooth' });

      // also immediately render a profile as a preview
      renderProfile(details, 'Preview – Applying for');
    });
  });
});