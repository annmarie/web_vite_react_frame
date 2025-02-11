export const initialState = {
  size: 3,
  tiles: setTiles(3, false),
  isSolved: false,
}

export const reducer = (state, action) => {
  switch (action.type) {
    case "MOVE_TILE": {
      const { moveTile } = action.payload;
      const { tiles, size } = state;
      const emptyTile = findEmptyTile(tiles, size);

      if (moveIsValid(emptyTile, moveTile, size)) {
        const newTiles = makeMove(tiles, emptyTile, moveTile);
        const isSolved = puzzleIsSolved(newTiles, size);
        return { ...state, tiles: newTiles, isSolved };
      }
      return state;
    }
    case "RESET_PUZZLE":
      return initialState

    default:
      return state || initialState;
  }
}

// Helper functions
function setTiles(size, ordered) {
  const tiles = Array.from({ length: size * size }, (_, i) => i);
  if (!ordered) {
    for (let i = tiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }
  }
  return Array.from({ length: size }, (_, r) =>
    tiles.slice(r * size, r * size + size)
  );
}

function findEmptyTile(tiles, size) {
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (tiles[r][c] === 0) return { row: r, col: c };
    }
  }
}

function moveIsValid(emptyTile, moveTile) {
  const { row: er, col: ec } = emptyTile;
  const { row: mr, col: mc } = moveTile;
  return (
    (Math.abs(er - mr) === 1 && ec === mc) ||
    (Math.abs(ec - mc) === 1 && er === mr)
  );
}

function makeMove(tiles, emptyTile, moveTile) {
  const newTiles = tiles.map((row) => [...row]);
  const { row: er, col: ec } = emptyTile;
  const { row: mr, col: mc } = moveTile;

  newTiles[er][ec] = tiles[mr][mc];
  newTiles[mr][mc] = 0;

  return newTiles;
}

function puzzleIsSolved(tiles, size) {
  const orderedTiles = setTiles(size, true).flat();
  const currentTiles = tiles.flat();
  return JSON.stringify(orderedTiles) === JSON.stringify(currentTiles);
}

export default { reducer, initialState }
