<script setup lang="ts">
</script>

<template>
	 <nav>
		<ul>
			<li><RouterLink to="/">Home</RouterLink></li>
			<li><RouterLink to="/qr">Go to QR Code generator</RouterLink></li>
			<li><RouterLink to="/encoding-explainer">Encoding Explainer</RouterLink></li>
		</ul>
	</nav>
	<main>
		<RouterView />
	</main>
</template>

<style scoped>
:root {
	display: flex;
	place-items: center;
}

nav {
	text-align: left;
}

main {
	max-width: 1280px;
	margin: 0 auto;
	padding: 2rem;
	text-align: center;
}
</style>
