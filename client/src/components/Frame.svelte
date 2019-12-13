<script>
  import { Board, Player, BLUE_MARKER, RED_MARKER } from "../store/game.js";
  const PLAYER1 = new Player("P1", BLUE_MARKER);
  const PLAYER2 = new Player("P2", RED_MARKER);
  let gameBoard = new Board(PLAYER1, { rows: 6, cols: 7 });
  let activeBoard = gameBoard.getBoard();

  const switchActivePlayer = () => {
    if (gameBoard.activePlayer.name === PLAYER1.name) {
      gameBoard.setActivePlayer(PLAYER2);
    } else {
      gameBoard.setActivePlayer(PLAYER1);
    }
  };
  const handlePlayerMove = ({ rowIndex, colIndex }) => {
    console.log({ rowIndex, colIndex });
    gameBoard.occupySlot({ rowIndex, colIndex });
    switchActivePlayer();
    activeBoard = [...gameBoard.getBoard()];
    console.log(activeBoard);
  };

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
