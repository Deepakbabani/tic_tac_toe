import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  checkDigonals,
  checkDown,
  checkLeft,
  checkRight,
  checkUp,
} from "./boardFunctions";

function App() {
  const [gridItems, setGridItems] = useState([]);
  const [players, setPlayers] = useState([
    {
      playerId: "0X",
      player: "X",
    },
    {
      playerId: "0Y",
      player: "Y",
    },
    {
      playerId: "0Z",
      player: "Z",
    },
  ]);
  const [curPlayer, setCurPlayer] = useState("0X");
  const [formData, setFormData] = useState({
    grids: 3,
    players: 2,
  });
  const gridItemObj = {
    gridId: "",
    rowPos: "",
    colPos: "",
    isFilled: false,
    playerId: "",
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({
      ...formData,
      [name]: parseInt(value),
    });
    if (gridItems.length) {
      setGridItems([]);
    }
  };

  const handleSetPlayers = () => {
    if (formData.players < 3) {
      players.pop();
      setPlayers(players);
    } else {
      setPlayers([
        ...players,
        {
          playerId: "0Z",
          player: "Z",
        },
      ]);
    }
  };

  const handleSubmit = () => {
    if (formData.grids - formData.players === 1) {
      let obj = {};
      let tempArr = [];
      for (let row = 0; row < formData.grids; row++) {
        for (let col = 0; col < formData.grids; col++) {
          obj = {
            ...gridItemObj,
            rowPos: row,
            colPos: col,
            gridId: `${row}${col}`,
          };
          tempArr.push(obj);
        }
      }
      setGridItems(tempArr);
      handleSetPlayers();
    } else {
      alert("Invalid players or grids");
    }
  };

  const handleOnGridClick = (item, index) => {
    if (!item.isFilled) {
      let tempArrGrid = [...gridItems];
      let tempObj = tempArrGrid.find(
        (element) => element.gridId === item.gridId
      );
      tempObj = {
        ...tempObj,
        isFilled: true,
        playerId: curPlayer,
      };
      tempArrGrid[index] = tempObj;

      const upperPath = checkUp(
        item.rowPos,
        tempArrGrid,
        index,
        curPlayer,
        formData.grids
      );
      const downPath = checkDown(
        item.rowPos,
        tempArrGrid,
        index,
        curPlayer,
        formData.grids
      );
      const leftPath = checkLeft(item.colPos, tempArrGrid, index, curPlayer);
      const rightPath = checkRight(
        item.colPos,
        tempArrGrid,
        index,
        curPlayer,
        formData.grids
      );
      const digonalPath = checkDigonals(
        item.rowPos,
        item.colPos,
        tempArrGrid,
        index,
        curPlayer,
        formData.grids
      );
      console.log(upperPath, downPath, leftPath, rightPath, digonalPath);
      if ((upperPath && downPath) || (leftPath && rightPath) || digonalPath) {
        alert(`${findPlayer(curPlayer)} won`);
      } else {
        switchPlayer();
      }
      setGridItems(tempArrGrid);
      console.log(tempArrGrid);
    }
  };

  const findPlayer = (itemPlayerId) => {
    if (itemPlayerId) {
      return players.find((ele) => ele.playerId === itemPlayerId).player;
    } else {
      return "";
    }
  };

  const switchPlayer = () => {
    const playerIndex = players.findIndex(
      (element) => element.playerId === curPlayer
    );
    if (playerIndex === 0) {
      setCurPlayer(players[playerIndex + 1].playerId);
    } else if (playerIndex === players.length - 1) {
      setCurPlayer(players[0].playerId);
    } else {
      setCurPlayer(players[players.length - 1].playerId);
    }
  };
  return (
    <>
      <div className="mT50">
        <div class="mb-3">
          <label for="select" class="form-label">
            Number of grids
          </label>
          <select name="grids" onChange={handleChange} class="form-select">
            <option value={3}>3</option>
            <option value={4}>4</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="select" class="form-label">
            Number of players
          </label>
          <select name="players" onChange={handleChange} class="form-select">
            <option value={2}>2</option>
            <option value={3}>3</option>
          </select>
        </div>

        <button onClick={handleSubmit} class="btn btn-primary">
          Submit
        </button>
        {gridItems.length ? (
          <>
            <div
              className="grid-container mT50"
              style={{
                gridTemplateColumns: `repeat(${formData.grids}, 1fr)`,
                gridTemplateRows: `repeat(${formData.grids}, 1fr)`,
              }}
            >
              {gridItems.map((item, index) => {
                return (
                  <div
                    className="grid-item"
                    onClick={() => {
                      handleOnGridClick(item, index);
                    }}
                  >
                    {item.isFilled ? findPlayer(item.playerId) : ""}
                  </div>
                );
              })}
            </div>
            <div class="row mt-5">
              {players.map((item) => {
                return (
                  <div class="col">
                    <button
                      type="button"
                      className={`btn btn-outline-primary ${
                        item.playerId === curPlayer ? "active" : ""
                      }`}
                    >
                      Player {item.player}
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default App;

