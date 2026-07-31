/* Base styles and warmth-filled color palette */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #fdf6ec; /* Warm checkered-kitchen feel */
  color: #4a3e3d;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Header styled like a cozy restaurant chalkboard banner */
header {
  background-color: #e74c3c;
  color: #ffffff;
  text-align: center;
  padding: 1.5rem 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

header h1 {
  font-size: 2.2rem;
  margin-bottom: 0.3rem;
}

/* Layout for main arcade menu and game screen */
main {
  flex: 1;
  display: flex;
  gap: 1.5rem;
  max-width: 1000px;
  width: 90%;
  margin: 2rem auto;
}

/* Side navigation panel for selecting mini-games */
.game-menu {
  flex: 1;
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 12px;
  border: 2px solid #f1c40f;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  height: fit-content;
}

.game-menu h2 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #d35400;
  text-transform: uppercase;
}

.game-menu ul {
  list-style: none;
}

.menu-btn {
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  border: 2px solid #e74c3c;
  background-color: #fff;
  color: #e74c3c;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s ease;
}

.menu-btn.active {
  background-color: #e74c3c;
  color: white;
}

.menu-btn.locked {
  border-color: #ccc;
  color: #888;
  cursor: not-allowed;
  background-color: #f9f9f9;
}

/* Main active game container */
.game-container {
  flex: 2.5;
  background: #ffffff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
}

#game-header {
  text-align: center;
  margin-bottom: 1rem;
}

/* Stats display for Timer & Score */
.stats-board {
  display: flex;
  justify-content: space-around;
  width: 100%;
  background-color: #fff3e0;
  padding: 0.75rem;
  border-radius: 8px;
  font-weight: bold;
  font-size: 1.2rem;
  color: #d35400;
  margin-bottom: 1.5rem;
}

/* The visual cutting board play area */
.play-area {
  width: 100%;
  min-height: 200px;
  background-color: #f5cba7; /* Wooden cutting board color */
  border: 8px solid #dc7633;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  margin-bottom: 1.5rem;
}

#recipe-prompt {
  font-size: 1.2rem;
  font-weight: bold;
}

/* Stacked ingredients container */
.burger-stack {
  display: flex;
  flex-direction: column-reverse; /* Stack ingredients upward */
  align-items: center;
  gap: 4px;
  margin-top: 10px;
}

.ingredient-layer {
  font-size: 1.1rem;
  font-weight: bold;
  background-color: white;
  padding: 0.2rem 1rem;
  border-radius: 15px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* Game Controls & Buttons */
.controls {
  text-align: center;
  width: 100%;
}

#startBtn {
  background-color: #27ae60;
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  font-size: 1.1rem;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.1s, background-color 0.2s;
}

#startBtn:hover {
  background-color: #219150;
  transform: scale(1.03);
}

.ingredient-buttons {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.ingredient-btn {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 0.6rem 1rem;
  font-size: 1rem;
  border-radius: 6px;
  cursor: pointer;
}

.ingredient-btn:hover {
  background-color: #2980b9;
}

.hidden {
  display: none !important;
}

/* Footer styling */
footer {
  text-align: center;
  padding: 1rem;
  background-color: #4a3e3d;
  color: #fff;
  font-size: 0.9rem;
}
