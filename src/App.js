import React, { useState } from 'react';
import './App.css';

const CHICKEN = 'chicken';
const BANANA = 'banana';

const imageData = [
  { type: BANANA, url: 'https://thumbs.dreamstime.com/b/bunch-bananas-6175887.jpg?w=768' },
  { type: CHICKEN, url: 'https://thumbs.dreamstime.com/z/full-body-brown-chicken-hen-standing-isolated-white-backgroun-background-use-farm-animals-livestock-theme-49741285.jpg?ct=jpeg' },
];

function getRandomTiles(count = 20) {
  const tiles = [];
  for (let i = 0; i < count; i++) {
    const random = Math.floor(Math.random() * imageData.length);
    tiles.push(imageData[random]);
  }
  return tiles;
}

function App() {
  const [tiles, setTiles] = useState(getRandomTiles()); // will make the tiles
  const [playerChoice, setPlayerChoice] = useState(null); // will track the player's choice (chicken or banana)
  const [clickedIndexes, setClickedIndexes] = useState([]); // will track the clicked tiles
  const [revealedIndexes, setRevealedIndexes] = useState([]); // will reveal the clicked tiles
  const [status, setStatus] = useState(''); // will show the game status

  const requiredClicks = tiles.filter(tile => tile.type === playerChoice).length;

  const handlePlayerChoice = (choice) => {
    setPlayerChoice(choice);
    setClickedIndexes([]);
    setRevealedIndexes([]);
    setStatus('');
    setTiles(getRandomTiles());
  };

  const handleTileClick = (index) => {
    if (status || !playerChoice || clickedIndexes.includes(index) || revealedIndexes.includes(index)) return;

    const tile = tiles[index];

    if (tile.type !== playerChoice) {
      // Reveal all tiles when the player loses
      const allIndexes = tiles.map((_, i) => i);
      setRevealedIndexes(allIndexes);
      setStatus('Wrong tile. You lose!');
      return;
    }

    const newRevealed = [...revealedIndexes, index];
    setRevealedIndexes(newRevealed);

    const newClicked = [...clickedIndexes, index];
    setClickedIndexes(newClicked);

    if (newClicked.length === requiredClicks) {
      setStatus('Win! +5');
    }
  };

  const restartGame = () => {
    setPlayerChoice(null);
    setClickedIndexes([]);
    setRevealedIndexes([]);
    setStatus('');
    setTiles(getRandomTiles());
  };

  return (
    <div className="container">
      <h1> Chicken🐔 Banana🍌</h1>
      {!playerChoice ? (
        <div className="choice-buttons">
          <button onClick={() => handlePlayerChoice(CHICKEN)}>I'm Chicken Player</button>
          <button onClick={() => handlePlayerChoice(BANANA)}>I'm Banana Player</button>
        </div>
      ) : (
        <>
          <h3>You are the <strong>{playerChoice.toUpperCase()}</strong> player</h3>
          <div className="grid">
            {tiles.map((tile, index) => (
              <div
                key={index}
                className={`square ${clickedIndexes.includes(index) ? 'clicked' : ''}`}
                onClick={() => handleTileClick(index)}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  userSelect: 'none',
                  width: '80px',
                  height: '80px',
                  border: '1px solid #ccc',
                  margin: '5px',
                  backgroundColor: clickedIndexes.includes(index) ? '#d4ffd4' : '#eee',
                }}
              >
                {revealedIndexes.includes(index) ? (
                  <img
                    src={tile.url}
                    alt={tile.type}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <span>{index + 1}</span>  /* Show tile number starting from 1 */
                )}
              </div>
            ))}
          </div>
          <p>{status}</p>
          <button onClick={restartGame}>Restart Game</button>
        </>
      )}
    </div>
  );
}

export default App;
