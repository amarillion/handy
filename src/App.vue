<script setup lang="ts">
</script>

<template>
	 <nav>
		<ul>
			<li><RouterLink to="/">Home</RouterLink></li>
			<li><RouterLink to="/qr">Go to QR Code generator</RouterLink></li>
		</ul>
	</nav>
	<main>
		<RouterView />
	</main>
</template>

<style scoped>
nav {
	text-align: left;
}
</style>
