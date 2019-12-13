<script>
  import { Board, Player, BLUE_MARKER, RED_MARKER } from "../store/game.js";
  const PLAYER1 = new Player("P1", BLUE_MARKER);
  const PLAYER2 = new Player("P2", RED_MARKER);
  let gameBoard = new Board(PLAYER1, { rows: 6, cols: 7 });
  let activeBoard = gameBoard.getBoard();

  console.log(activeBoard);
  const BACKEND_URL = "<@BACKEND_URL@>";

  const switchActivePlayer = () => {
    if (gameBoard.activePlayer.name === PLAYER1.name) {
      gameBoard.setActivePlayer(PLAYER2);
    } else {
      gameBoard.setActivePlayer(PLAYER1);
    }
  };
  const handlePlayerMove = async ({ rowIndex, colIndex }) => {
    console.log({ rowIndex, colIndex });
    gameBoard.occupySlot({ rowIndex, colIndex });
    switchActivePlayer();
    activeBoard = [...gameBoard.getBoard()];
    console.log(activeBoard);
    if (gameBoard.isFull()) {
      console.log("board is full, collapsing...")
      quantumGate = await computeCollapse();
      applyQuantumGate(quantumGate);
    }
  };

  const computeCollapse = async () => {
    const payload = { super_positions: activeBoard.superPositions.length };

    fetch(`${BACKEND_URL}/collapse`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
      .then(async response => {
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          return await data.res;
        }
      })
      .catch(error => {
        console.log("Request failed", error);
        return Promise.reject(error);
      });
  };

  // collapses the superimposed cells
  const applyQuantumGate = gate => {};

  //   console.log(activeBoard);
</script>

<style>

</style>

<div class="four column padding-all-1 flex flex-center">
  <div class="row">
    <table>
      <tbody>
        {#each activeBoard as rows, rowIndex}
          <tr>
            {#each rows as column, colIndex}
              <td on:click={() => handlePlayerMove({ colIndex, rowIndex })}>
                {column}
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
