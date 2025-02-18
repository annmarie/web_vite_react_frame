
export function hasWinningMove(board) {
  let count = 0;

  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (board[row][col] === 1) {
        count++;
        if (count > 1) {
          return false;
        }
      }
    }
  }
  return count === 1;
}

export function hasMovesLeft(board) {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (board[row][col] === 1 && canJump(board, row, col)) {
        return true;
      }
    }
  }
  return false;
}

export function canJump(board, row, col) {
  const directions = [
    [-2, 0], // Up
    [2, 0],  // Down
    [0, -2], // Left
    [0, 2],  // Right
  ];

  for (const [x, y] of directions) {
    const midRow = row + x / 2;
    const midCol = col + y / 2;
    const newRow = row + x;
    const newCol = col + y;
    if (
      newRow >= 0 && newRow < board.length &&
      newCol >= 0 && newCol < board[0].length
    ) {
      if (
        board[midRow]?.[midCol] === 1 &&
        board[newRow]?.[newCol] === 0
      ) {
        return true;
      }
    }
  }
  return false;
}

export function jumpPeg(board, startRow, startCol, endRow, endCol) {
  const newBoard = board.map((row) => [...row]);
  newBoard[startRow][startCol] = 0;
  newBoard[endRow][endCol] = 1;
  newBoard[(startRow + endRow) / 2][(startCol + endCol) / 2] = 0;
  return newBoard;
}

export function validateJump(board, startRow, startCol, endRow, endCol) {
  const rowDiff = Math.abs(startRow - endRow);
  const colDiff = Math.abs(startCol - endCol);
  if ((rowDiff === 2 && colDiff === 0) || (rowDiff === 0 && colDiff === 2)) {
    const midRow = (startRow + endRow) / 2;
    const midCol = (startCol + endCol) / 2;
    return board[midRow][midCol] === 1;
  }
  return false;
};

export function initializeBoard() {
  return [
    [null, null, 1, 1, 1, null, null],
    [null, null, 1, 1, 1, null, null],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 0, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [null, null, 1, 1, 1, null, null],
    [null, null, 1, 1, 1, null, null],
  ];
}
