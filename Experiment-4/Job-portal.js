// Get form and user profile container
const jobForm = document.getElementById('jobForm');
const userProfile = document.getElementById('userProfile');

// Array to store all jobs
let jobs = [];

// Handle form submission
jobForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get form input values
    const jobTitle = document.getElementById('jobTitle').value.trim();
    const company = document.getElementById('company').value.trim();
    const location = document.getElementById('location').value.trim();
    const salary = document.getElementById('salary').value.trim();
    const skills = document.getElementById('skills').value.trim();

    // Validate that required fields are filled
    if (!jobTitle || !company || !location) {
        alert('Please fill in all required fields!');
        return;
    }

    // Create job object
    const jobData = {
        id: Date.now(), // Unique ID based on timestamp
        jobTitle: jobTitle,
        company: company,
        location: location,
        salary: salary || 'Contact for salary',
        skills: skills || 'No specific skills required'
    };

    // Add job to array
    jobs.push(jobData);

    // Display the job card
    displayJobCard(jobData);

    // Clear the form
    jobForm.reset();

    // Show success message
    showSuccessMessage();
});

// Function to display job card
function displayJobCard(jobData) {
    // Create job card HTML
    const jobCard = document.createElement('div');
    jobCard.className = 'job-card';
    jobCard.id = `job-${jobData.id}`;
    jobCard.innerHTML = `
        <h3>${jobData.jobTitle}</h3>
        <p class="company"><strong>Company:</strong> ${jobData.company}</p>
        <p class="location">📍 ${jobData.location}</p>
        <p class="salary">💰 ${jobData.salary}</p>
        <p class="skills"><strong>Skills:</strong> ${jobData.skills}</p>
        <button class="btn-apply" onclick="deleteJobCard(${jobData.id})">Delete Job</button>
    `;

    // Append job card to user profile container
    userProfile.appendChild(jobCard);

    // Scroll to the newly added job card
    jobCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Function to delete a job card
function deleteJobCard(jobId) {
    // Remove from jobs array
    jobs = jobs.filter(job => job.id !== jobId);

    // Remove from DOM
    const jobElement = document.getElementById(`job-${jobId}`);
    if (jobElement) {
        jobElement.remove();
    }
}

// Function to show success message
function showSuccessMessage() {
    const message = document.createElement('p');
    message.textContent = '✅ Job posted successfully!';
    message.style.color = '#10b981';
    message.style.textAlign = 'center';
    message.style.fontWeight = 'bold';
    message.style.marginBottom = '15px';

    // Insert message at the beginning of user profile
    userProfile.insertBefore(message, userProfile.firstChild);

    // Remove message after 3 seconds
    setTimeout(() => {
        message.remove();
    }, 3000);
}

// Optional: Add keyboard shortcut to submit form (Enter key on form)
jobForm.addEventListener('keypress', function(event) {
    if (event.key === 'Enter' && event.ctrlKey) {
        jobForm.dispatchEvent(new Event('submit'));
    }
});
