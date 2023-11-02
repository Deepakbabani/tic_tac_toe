// check all positions which are on top of the current positions
export const checkUp = (rowPos, grids, index, currentPlayer, gridLength) => {
  console.log(rowPos, index);
  if (rowPos <= 0 && grids[index].playerId === currentPlayer) {
    return true;
  }
  if (grids[index].playerId !== currentPlayer) {
    return false;
  }
  return checkUp(
    rowPos - 1,
    grids,
    index - gridLength,
    currentPlayer,
    gridLength
  );
};

// check all positions which are down to the current positions
export const checkDown = (rowPos, grids, index, currentPlayer, gridLength) => {
  if (rowPos === gridLength - 1 && grids[index].playerId === currentPlayer) {
    return true;
  }
  if (grids[index].playerId !== currentPlayer) {
    return false;
  }
  return checkDown(
    rowPos + 1,
    grids,
    index + gridLength,
    currentPlayer,
    gridLength
  );
};

// check all the left positions
export const checkLeft = (colPos, grids, index, currentPlayer) => {
  if (colPos <= 0 && grids[index].playerId === currentPlayer) {
    return true;
  }
  if (grids[index].playerId !== currentPlayer) {
    return false;
  }
  return checkLeft(colPos - 1, grids, index - 1, currentPlayer);
};

// check all the right positions
export const checkRight = (colPos, grids, index, currentPlayer, gridLength) => {
  if (colPos === gridLength - 1 && grids[index].playerId === currentPlayer) {
    return true;
  }
  if (grids[index].playerId !== currentPlayer) {
    return false;
  }
  return checkRight(colPos + 1, grids, index + 1, currentPlayer, gridLength);
};

// Check digonals
export const checkDigonals = (
  rowPos,
  colPos,
  grids,
  index,
  currentPlayer,
  gridLength
) => {
  const upperLeft = checkUpperLeft(
    rowPos,
    colPos,
    grids,
    index,
    currentPlayer,
    gridLength
  );
  const downRight = checkDownRight(
    rowPos,
    colPos,
    grids,
    index,
    currentPlayer,
    gridLength
  );
  const upperRight = checkUpperRight(
    rowPos,
    colPos,
    grids,
    index,
    currentPlayer,
    gridLength
  );
  const downLeft = checkDownLeft(
    rowPos,
    colPos,
    grids,
    index,
    currentPlayer,
    gridLength
  );

  return (upperLeft && downRight) || (upperRight && downLeft);
};

// upper left digonal
const checkUpperLeft = (
  rowPos,
  colPos,
  grids,
  index,
  currentPlayer,
  gridLength
) => {
  if (
    rowPos < 0 ||
    colPos < 0 ||
    rowPos > gridLength - 1 ||
    colPos > gridLength - 1
  ) {
    return false;
  }
  if (rowPos <= 0 && colPos <= 0 && grids[index].playerId === currentPlayer) {
    return true;
  }
  if (grids[index].playerId !== currentPlayer) {
    return false;
  }
  return checkUpperLeft(
    rowPos - 1,
    colPos - 1,
    grids,
    index - (gridLength + 1),
    currentPlayer,
    gridLength
  );
};

// upper Right digonal
const checkUpperRight = (
  rowPos,
  colPos,
  grids,
  index,
  currentPlayer,
  gridLength
) => {
  if (
    rowPos < 0 ||
    colPos < 0 ||
    rowPos > gridLength - 1 ||
    colPos > gridLength - 1
  ) {
    return false;
  }

  if (
    rowPos <= 0 &&
    colPos >= gridLength - 1 &&
    grids[index].playerId === currentPlayer
  ) {
    return true;
  }
  if (grids[index].playerId !== currentPlayer) {
    return false;
  }
  return checkUpperRight(
    rowPos - 1,
    colPos + 1,
    grids,
    index - (gridLength - 1),
    currentPlayer,
    gridLength
  );
};

// Down Right digonal
const checkDownRight = (
  rowPos,
  colPos,
  grids,
  index,
  currentPlayer,
  gridLength
) => {
  if (
    rowPos < 0 ||
    colPos < 0 ||
    rowPos > gridLength - 1 ||
    colPos > gridLength - 1
  ) {
    return false;
  }
  if (
    rowPos >= gridLength - 1 &&
    colPos >= gridLength - 1 &&
    grids[index].playerId === currentPlayer
  ) {
    return true;
  }
  if (grids[index].playerId !== currentPlayer) {
    return false;
  }
  return checkDownRight(
    rowPos + 1,
    colPos + 1,
    grids,
    index + (gridLength + 1),
    currentPlayer,
    gridLength
  );
};
// Down Left digonal
const checkDownLeft = (
  rowPos,
  colPos,
  grids,
  index,
  currentPlayer,
  gridLength
) => {
  if (
    rowPos < 0 ||
    colPos < 0 ||
    rowPos > gridLength - 1 ||
    colPos > gridLength - 1
  ) {
    return false;
  }
  if (
    rowPos >= gridLength - 1 &&
    colPos <= 0 &&
    grids[index].playerId === currentPlayer
  ) {
    return true;
  }
  if (grids[index].playerId !== currentPlayer) {
    return false;
  }
  return checkDownLeft(
    rowPos + 1,
    colPos - 1,
    grids,
    index + (gridLength - 1),
    currentPlayer,
    gridLength
  );
};
