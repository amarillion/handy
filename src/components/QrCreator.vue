<script setup lang="ts">

import { ref, watch } from 'vue';

import QRCode from 'qrcode';

const inputString = ref();
const qrdata = ref();

watch(inputString, newValue => {
	QRCode.toDataURL(newValue, function (err, url) {
		qrdata.value = url;
		if (err) {
			console.log(err);
			// TODO: alert. What kind of errors can occur?
		}
	});
});

// TODO: export as PNG
// TODO: export as SVG
</script>

<template>
	<h1>Create a QR Code</h1>
	<input
		id="inputString"
		v-model="inputString"
	>
	<div>
		<img :src="qrdata" />
	</div>
</template>

<style lang="css">

</style>
