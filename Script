// Wait until the HTML document is fully loaded before running code
document.addEventListener('DOMContentLoaded', () => {
  // Grab references to the HTML elements we want to interact with
  const button = document.getElementById('interactiveBtn');
  const messageText = document.getElementById('messageText');

  // Track state: simple click counter
  let clickCount = 0;

  // Add an event listener to respond when the button is clicked
  button.addEventListener('click', () => {
    clickCount++;
    messageText.textContent = `You clicked the button ${clickCount} time${clickCount === 1 ? '' : 's'}! You're officially a web developer 🎉`;
  });
});
