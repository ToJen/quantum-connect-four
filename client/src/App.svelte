<script>
  import { get } from "svelte/store";
  import { playing } from "./store/index.js";
  import Frame from "./components/Frame.svelte";
  import Menu from "./components/Menu.svelte";
  import Audio from "./components/Audio.svelte";

  const BACKEND_URL = "<@BACKEND_URL@>";
  export const sayHello = fetch(`${BACKEND_URL}`).then(r => r.text());
</script>

<style>
  main {
    text-align: center;
    padding: 1rem;
  }
  h1 {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
    /* background-color: lightgray; */
    border-radius: 20px;
    /* max-width: 240px; */
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 3em;
    font-weight: 100;
    text-align: center;
  }
</style>
<main>
<div class="row flex flex-center ">
  {#await sayHello}
    <p>Crunching...</p>
  {:then hello}
    <h1>{hello}</h1>
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
  <!-- <div class="snow"></div> -->
  </div>

  <Audio
    src="https://sveltejs.github.io/assets/music/holst.mp3"
    title=""
    composer=""
    performer=""/>
<div class="row flex flex-center ">
  {#if $playing}
    <Frame />
  {:else}
    <Menu />
  {/if}
</div>
</main>