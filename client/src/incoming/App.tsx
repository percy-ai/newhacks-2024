// Selecting elements for interaction
const declineButton = document.querySelector('.decline');
const acceptButton = document.querySelector('.accept');

// Event listeners for buttons
declineButton?.addEventListener('click', () => {
  alert('Call Declined');
  // Additional decline logic here
});

acceptButton?.addEventListener('click', () => {
  alert('Call Accepted');
  // Additional accept logic here
});
