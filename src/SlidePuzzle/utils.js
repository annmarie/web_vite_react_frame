
export function setTiles(size, ordered) {
  const arrayLen = size * size;
  const tiles = Array.from({ length: arrayLen }, (_, index) => {
    const val = index + 1;
    return val === arrayLen ? 0 : val;
  });

  if (!ordered) {
    for (let i = tiles.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [tiles[i], tiles[randomIndex]] = [tiles[randomIndex], tiles[i]];
    }
  }

  return Array.from({ length: size }, (_, row) =>
    tiles.slice(row * size, row * size + size)
  );
}

export function findEmptyTile(tiles) {
  for (let r = 0; r < tiles.length; r++) {
    for (let c = 0; c < tiles[r].length; c++) {
      if (tiles[r][c] === 0) {
        return { row: r, col: c };
      }
    }
  }
}

export function moveIsValid(emptyTile, moveTile) {
  const { row: eRow, col: eCol } = emptyTile;
  const { row: mRow, col: mCol } = moveTile;

  return (
    (Math.abs(eRow - mRow) === 1 && eCol === mCol) ||
    (Math.abs(eCol - mCol) === 1 && eRow === mRow)
  );
}

export function makeMove(tiles, emptyTile, moveTile) {
  const newTiles = tiles.map((row) => [...row]);
  const { row: eRow, col: eCol } = emptyTile;
  const { row: mRow, col: mCol } = moveTile;
  newTiles[eRow][eCol] = tiles[mRow][mCol];
  newTiles[mRow][mCol] = 0;
  return newTiles;
}

export function puzzleIsSolved(tiles, size) {
  const orderedTiles = setTiles(size, true).flat();
  const currentTiles = tiles.flat();
  return orderedTiles.every((value, index) => value === currentTiles[index]);
}
