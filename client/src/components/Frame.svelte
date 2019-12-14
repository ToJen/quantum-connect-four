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
  let activePlayerName = gameBoard.activePlayer.name;

  console.log(activeBoard);
  const BACKEND_URL = "<@BACKEND_URL@>";

  const switchActivePlayer = () => {
    if (gameBoard.activePlayer.name === PLAYER1.name) {
      gameBoard.setActivePlayer(PLAYER2);
      activePlayerName = PLAYER2.name;
    } else {
      gameBoard.setActivePlayer(PLAYER1);
      activePlayerName = PLAYER1.name;
    }
  };
  const handleSuperPosition = async ({ rowIndex, colIndex }) => {
    superPositionActivated = true;
    if (superPositionActivated) {
      if (!gameBoard.isColAvailable(colIndex)) {
        alert("column already full");
      }
      const plantedRow = gameBoard.occupySlotWithSuperPosition({
        superPositionCount,
        rowIndex,
        colIndex
      });
      superPositionColumns.push({ R: plantedRow, C: colIndex });

      if (superPositionColumns.length === 2) {
        gameBoard.addSuperPosition(superPositionColumns);
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
    await canProceed();
  };
  const canProceed = async () => {
    let winner = gameBoard.hasPlayerWon();
    if (gameBoard.isFull()) {
      if (!winner) {
        console.log("board is full and no one has won, collapsing...");
        quantumGate = await computeCollapse();
        gameBoard.applyQuantumGate(quantumGate);

        winner = gameBoard.hasPlayerWon();
        if (!winner) {
          console.log("it's a tie");
          return false;
        }
      }
    }

    winner = gameBoard.hasPlayerWon();
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
    const payload = { super_positions: gameBoard.superPositions.length };

    const res = await fetch(`${BACKEND_URL}/collapse`, {
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
          return data.res;
        } else return "";
      })
      .catch(error => {
        console.log("Request failed", error);
        return Promise.reject(error);
      });
    return res;
  };

  const collapseForPlayer = async () => {
    let quantumGate = await computeCollapse();
    console.log("applying this gate", quantumGate);
    gameBoard.applyQuantumGate(quantumGate);

    activeBoard = [...gameBoard.getBoard()];
    console.log(activeBoard);

    if (await canProceed()) switchActivePlayer();
  };

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
    width: 4rem;
    height: 4rem;
    border: 1px solid black;
  }
  .empty {
    background: transparent;
  }
  h2 {
    text-align: center;
  }
  .big-btn {
    margin-left: 8rem;
    width: 30rem;
    font-size: 1.5rem;
  }
</style>

<div>
  {#if winnerName}
    <div class="row flex flex-center">
      <h2
        style="margin-left:7rem;color:#51cb51;"
        in:spin={{ duration: 4000 }}
        out:fade>
        {winnerName} Won!
      </h2>
    </div>
  {:else}
    <div class="row flex flex-center">
      <h2
        style="margin-left: 8rem;color:{activePlayerName === 'P2' ? 'red' : 'blue'}">
        {activePlayerName}'s turn
      </h2>
    </div>
    {#if superPositionActivated}
      <div class="row flex flex-center" style="margin-left:7rem;color:#ff3e00">
        <h4>Superposition Active</h4>
      </div>
    {:else}
      <div class="row flex flex-center">
        <button
          on:click={() => (superPositionActivated = true)}
          class="big-btn">
          Activate SuperPosition
        </button>
      </div>
    {/if}
  {/if}

  <div class="column padding-all-1 flex flex-center">
    <div class="row">
      <table width="50vW" height="50vH">
        <tbody>
          {#each activeBoard as rows, rowIndex}
            <tr>
              {#each rows as column, colIndex}
                <td
                  id={'R' + rowIndex + 'C' + colIndex}
                  on:click={() => handlePlayerMove({ colIndex, rowIndex })}>
                  {#if column === RED_MARKER}
                    <div
                      class="circle red"
                      transition:fly={{ y: -600, duration: 2000 }} />
                  {:else if column === BLUE_MARKER}
                    <div
                      class="circle blue"
                      transition:fly={{ y: -600, duration: 2000 }} />
                  {:else if column.includes(RED_MARKER)}
                    <div
                      class="circle superRed"
                      transition:fly={{ y: -600, duration: 2000 }} />
                  {:else if column.includes(BLUE_MARKER)}
                    <div
                      class="circle superBlue"
                      transition:fly={{ y: -600, duration: 2000 }} />
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

  <button
    on:click={collapseForPlayer}
    hidden={superPositionCount <= 0 || winnerName}
    class="big-btn">
    Collapse
  </button>
</div>
