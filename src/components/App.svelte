<script>
	import { get } from 'svelte/store'
	import { username } from '../store/index.js'
	export const sayHello = fetch("BACKEND_URL").then(r => r.text())
</script>

<main>
{#await sayHello}
	<p>Crunching...</p>
{:then hello}
	<h1> {hello}</h1>
	<h2>User: {get(username)}</h2>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}
	
</main>

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

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>