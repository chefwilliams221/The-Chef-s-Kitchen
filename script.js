// Wait for DOM to load fully before initializing game logic
document.addEventListener('DOMContentLoaded', () => {

  // List of possible ingredients for the burger game
  const ingredientsList = ['🥬 Lettuce', '🧀 Cheese', '🥩 Patty', '🍅 Tomato'];

  // Game state variables
  let score = 0;
  let timeLeft = 15;
  let timerInterval = null;
  let targetIngredient = '';
  let gameActive = false;

  // DOM Elements
  const startBtn = document.getElementById('startBtn');
  const ingredientButtons = document.getElementById('ingredient-buttons');
  const recipePrompt = document.getElementById('recipe-prompt');
  const burgerStack = document.getElementById('burger-stack');
  const scoreDisplay = document.getElementById('score');
  const timerDisplay = document.getElementById('timer');
  const actionBtns = document.querySelectorAll('.ingredient-btn');

  // Event listener to start the game
  startBtn.addEventListener('click', startGame);

  // Add click handlers to each ingredient button
  actionBtns.forEach(button => {
    button.addEventListener('click', (e) => {
      if (!gameActive) return;

      const chosenIngredient = e.target.getAttribute('data-ingredient');

      // Check if player clicked the requested ingredient
      if (chosenIngredient === targetIngredient) {
        score += 10;
        scoreDisplay.textContent = score;
        addLayerToBurger(chosenIngredient);
        nextRound(); // Ask for the next random ingredient
      } else {
        recipePrompt.textContent = `❌ Oops! Wrong ingredient! Add ${targetIngredient}!`;
      }
    });
  });

  // Function to initialize and run game timer
  function startGame() {
    score = 0;
    timeLeft = 15;
    gameActive = true;
    scoreDisplay.textContent = score;
    timerDisplay.textContent = timeLeft;
    burgerStack.innerHTML = ''; // Clear previous burger stack

    startBtn.classList.add('hidden');
    ingredientButtons.classList.remove('hidden');

    nextRound();

    // Start countdown timer loop
    timerInterval = setInterval(() => {
      timeLeft--;
      timerDisplay.textContent = timeLeft;

      if (timeLeft <= 0) {
        endGame();
      }
    }, 1000);
  }

  // Picks a random ingredient for the player to press
  function nextRound() {
    const randomIndex = Math.floor(Math.random() * ingredientsList.length);
    targetIngredient = ingredientsList[randomIndex];
    recipePrompt.textContent = `Add: ${targetIngredient}!`;
  }

  // Visual helper: Adds an ingredient layer to the built burger stack
  function addLayerToBurger(ingredientName) {
    const layer = document.createElement('div');
    layer.classList.add('ingredient-layer');
    layer.textContent = ingredientName;
    burgerStack.appendChild(layer);
  }

  // Game Over logic
  function endGame() {
    clearInterval(timerInterval);
    gameActive = false;
    recipePrompt.textContent = `⏰ Time's up! You scored ${score} points!`;
    ingredientButtons.classList.add('hidden');
    startBtn.textContent = 'Play Again!';
    startBtn.classList.remove('hidden');
  }
});
