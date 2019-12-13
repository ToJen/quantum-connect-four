<script>
  import { get } from "svelte/store";
  import { username } from "../store/index.js";
</script>

<style>

</style>

<main>
  <h2>User: {get(username)}</h2>
</main>
