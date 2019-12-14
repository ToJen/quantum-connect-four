<script>
  import { playing } from "../store/index.js";

  function play() {
    playing.set(true);
  }
</script>

<style>
  .menu-button {
    background-color: #ff3e00;
    color: white;
    /* padding: 10rem; */
    height: 10rem;
    font-size: xx-large;
    width: 45rem;
    margin-top: 2rem;
  }
  .menu-button:hover {
    color: #ff3e00;
    background-color: white;
  }
</style>

<div class="flex flex-center">
  <button on:click={play} class="menu-button" width="1000">Play</button>
  <!-- <button on:click={handleClick} class="menu-button">About</button> -->
</div>
