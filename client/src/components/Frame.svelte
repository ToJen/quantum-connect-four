<script>
  import { Board, Player, BLUE_MARKER, RED_MARKER } from "../store/game.js";
  import { fly, fade } from "svelte/transition";
  import { elasticOut } from "svelte/easing";

  function spin(node, { duration }) {
    return {
      duration,
      css: t => {
        const eased = elasticOut(t);

        return `
					transform: scale(${eased}) rotate(${eased * 1080}deg);
					color: hsl(
						${~~(t * 360)},
						${Math.min(100, 1000 - 1000 * t)}%,
						${Math.min(50, 500 - 500 * t)}%
					);`;
      }
    };
  }

  const PLAYER1 = new Player("P1", BLUE_MARKER);
  const PLAYER2 = new Player("P2", RED_MARKER);
  let gameBoard = new Board(PLAYER1, { rows: 6, cols: 7 });
  let activeBoard = gameBoard.getBoard();
  let winnerName;
  let superPositionActivated = false;
  let superPositionColumns = [];
  let superPositionCount = 0;

  console.log(activeBoard);
  const BACKEND_URL = "<@BACKEND_URL@>";

  const switchActivePlayer = () => {
    if (gameBoard.activePlayer.name === PLAYER1.name) {
      gameBoard.setActivePlayer(PLAYER2);
    } else {
      gameBoard.setActivePlayer(PLAYER1);
    }
  };
  const handleSuperPosition = async ({ rowIndex, colIndex }) => {
    superPositionActivated = true;
    if (superPositionActivated) {
      if (!gameBoard.isColAvailable(colIndex)) {
        alert("column already full");
      }
      superPositionColumns.push(colIndex);
      gameBoard.occupySlotWithSuperPosition({
        superPositionCount,
        rowIndex,
        colIndex
      });
      if (superPositionColumns.length === 2) {
        superPositionActivated = false;
        superPositionColumns = [];
        superPositionCount++;
        switchActivePlayer();
      }
    }
    console.log({
      lth: superPositionColumns.length,
      superPositionActivated,
      superPositionColumns
    });
  };

  const handlePlayerMove = async ({ rowIndex, colIndex }) => {
    if (!gameBoard.isColAvailable(colIndex)) {
      alert("column already full");
      return;
    }

    if (await canProceed()) {
      if (superPositionActivated) {
        console.log("superposition activated...");
        handleSuperPosition({ rowIndex, colIndex });
      } else {
        gameBoard.occupySlot({ rowIndex, colIndex });
        switchActivePlayer();
      }
      activeBoard = [...gameBoard.getBoard()];
      console.log(activeBoard);
    }
  };
  const canProceed = async () => {
    if (gameBoard.isFull()) {
      console.log("board is full, collapsing...");
      quantumGate = await computeCollapse();
      applyQuantumGate(quantumGate);
      return false;
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
      console.log(winner);
      return false;
    }
    return true;
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
  .superRed {
    background: pink;
  }
  .superBlue {
    background: lightblue;
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
    {#if winnerName}
      <h2 in:spin={{ duration: 4000 }} out:fade>{winnerName} Won!</h2>
    {/if}
    {#if superPositionActivated}
      <h2>Superposition Active</h2>
    {:else}
      <button
        on:click={() => (superPositionActivated = true)}
        style="margin-left: 7rem">
        Activate SuperPosition
      </button>
    {/if}
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
                    <div
                      class="circle red"
                      transition:fly={{ y: -300, duration: 1500 }} />
                  {:else if column === BLUE_MARKER}
                    <div
                      class="circle blue"
                      transition:fly={{ y: -300, duration: 1500 }} />
                  {:else if column.includes(RED_MARKER)}
                    <div
                      class="circle superRed"
                      transition:fly={{ y: -300, duration: 1500 }} />
                  {:else if column.includes(BLUE_MARKER)}
                    <div
                      class="circle superBlue"
                      transition:fly={{ y: -300, duration: 1500 }} />
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
