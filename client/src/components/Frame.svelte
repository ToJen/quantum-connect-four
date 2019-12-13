<script>
  import { Board, Player, BLUE_MARKER, RED_MARKER } from "../store/game.js";
  const PLAYER1 = new Player("P1", BLUE_MARKER);
  const PLAYER2 = new Player("P2", RED_MARKER);
  let gameBoard = new Board(PLAYER1, { rows: 6, cols: 7 });
  let activeBoard = gameBoard.getBoard();
  let winnerName;

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
      console.log("board is full, collapsing...");
      quantumGate = await computeCollapse();
      applyQuantumGate(quantumGate);
    }
    const winner = gameBoard.hasPlayerWon();
    if (winner) {
      if (PLAYER1.marker === winner) {
        winnerName = PLAYER1.name;
        console.log("winner", PLAYER1);
      } else {
        winnerName = PLAYER2.name;
        console.log("winner", PLAYER2);
      }
    }
    console.log(winner);
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
  .red {
    background: red;
  }
  .blue {
    background: blue;
  }
  .circle {
    border-radius: 50%;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    width: 2rem;
    height: 2rem;
    border: 1px solid black;
  }
  .empty {
    background: transparent;
  }
</style>

<div>
  <div class="row flex flex-center">
    <h2>
      {#if winnerName}{winnerName} Won!{/if}
    </h2>
  </div>
  <div class="four column padding-all-1 flex flex-center">
    <div class="row">
      <table>
        <tbody>
          {#each activeBoard as rows, rowIndex}
            <tr>
              {#each rows as column, colIndex}
                <td on:click={() => handlePlayerMove({ colIndex, rowIndex })}>
                  {#if column === RED_MARKER}
                    <div class="circle red" />
                  {:else if column === BLUE_MARKER}
                    <div class="circle blue" />
                  {:else}
                    <div class="circle empty" />
                  {/if}
                </td>
              {/each}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>
