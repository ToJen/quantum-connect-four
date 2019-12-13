<script>
  const P1_MARKER = "RED";
  const P2_MARKER = "BLUE";
  const UNOCCUPIED_SLOT = "O";
  let board = [
    [...Array(4)].map((_, i) => UNOCCUPIED_SLOT + " ->R1" + i),
    [...Array(4)].map((_, i) => UNOCCUPIED_SLOT + " ->R2" + i),
    [...Array(4)].map((_, i) => UNOCCUPIED_SLOT + " ->R3" + i),
    [...Array(4)].map((_, i) => UNOCCUPIED_SLOT + " ->R4" + i)
  ];
  console.log(board);
</script>

<style>

</style>

<div class="four column padding-all-1 flex flex-center">
  <div class="row">
    <table>
      <tbody>
        {#each board as column, index}
          <tr>
            {#each column as row, index}
              <td>{row}</td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
