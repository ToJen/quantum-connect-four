<script>
  import { playing } from "../store/index.js";

  function handleClick() {
      playing.set(true)
  }
</script>

<style>

</style>

<div>
  <button on:click={handleClick}>Play</button>
</div>
