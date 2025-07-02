import React, { useState } from 'react';
import './App.css';

/*
/*function Welcome(props){
  return <h2>Welcome, {props.name}!</h2>;
}

function App() {
    return(
    <div>
      <Welcome name ='Andre Thomas'/>
      <Welcome name ='Marimlsa'/>
      <Welcome name ='Quizon'/>
    </div>
  )
}
*/

/*function Counter() {
  const [count, setCount] = useState(0);

  function handleClick(){
    setCount(count+1);
  }

  return(
    <div>
      <p>You clicked {count} times.</p>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}

function App(){
  return(
    <div>
      <Counter/>
    </div>
  );
}
*/

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
    const newRevealed = [...revealedIndexes, index];
    setRevealedIndexes(newRevealed);

    if (tile.type !== playerChoice) {
      setStatus('Wrong tile. You lose!');
      return;
    }

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
      <h1>🐔🍌 Chicken Banana Game!</h1>
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
              <img
                key={index}
                //src = {tile.url} //this will show all the images
                 src= {
                   revealedIndexes.includes(index)
                     ? tile.url
                     : 'https://i.pinimg.com/236x/41/d8/37/41d8375f3237702fed8b274ae68306ab.jpg'
                 }
                alt={revealedIndexes.includes(index) ? tile.type : 'Hidden'}
                className={`square ${clickedIndexes.includes(index) ? 'clicked' : ''}`}
                onClick={() => handleTileClick(index)}
              />
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
