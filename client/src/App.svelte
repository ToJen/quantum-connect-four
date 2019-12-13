<script>
  import Frame from "./components/Frame.svelte";

  const BACKEND_URL = "<@BACKEND_URL@>";
  export const sayHello = fetch(`${BACKEND_URL}/api`).then(r => r.text());
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }
</style>

<main>
  {#await sayHello}
    <p>Crunching...</p>
  {:then hello}
    <h1>{hello}</h1>
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
  <Frame />
</main>
