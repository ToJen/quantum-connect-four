<script>
  import { playing } from "../store/index.js";

  function play() {
    playing.set(true);
  }
</script>

<style>
  #menu-control {
    width: 100px;
    height: 100px;
    /* background-color: red; */

    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    margin: auto;
  }
  .menu-button {
    background-color: #ff3e00;
    color: rgba(255, 255, 255, 0.7);
    /* padding: 10rem; */
    height: 25rem;
    font-size: xx-large;
    width: 45rem;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    margin-left: -10%;
  }
</style>

<div id="menu-control">
  <button on:click={play} class="menu-button" width="1000">Play</button>
  <!-- <button on:click={handleClick} class="menu-button">About</button> -->
</div>
