<script>
  import Frame from "./components/Frame.svelte";

  const BACKEND_URL = "<@BACKEND_URL@>";
  export const sayHello = fetch(`${BACKEND_URL}/api`).then(r => r.text());
</script>

<style>

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
