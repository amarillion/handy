<script setup lang="ts">

import { ref, computed } from 'vue';

const encoding = ref<string>();
const inputString = ref<string>()

function toBytes(inputValue: string, encoding: string) {
	if (encoding.toUpperCase() === "UTF-8") {
		const encoder = new TextEncoder()
		const byteArray = encoder.encode(inputValue);

		const result: number[] = [ ...byteArray ];
		return result;
	}
	else if (encoding.toUpperCase().startsWith("UTF-16")) {
		const result: number[] = [];
		const str = inputValue;
		if (str) {
			for (let i = 0; i < str.length; ++i) {
				const codePoint = str.charCodeAt(i);
				let low = codePoint & 0xFF;
				let high = (codePoint & 0xFF00) >> 8;

				// TODO: double-check that I didn't accidentally swal le/be
				if (encoding.toLowerCase().endsWith("be")) {
					result.push(low, high);
				}
				else {
					result.push(high, low);
				}
			}
		}
		return result;
	}
	else return [];
}
const bytes = computed(() => {
	return toBytes(inputString.value || '', encoding.value || '');
});

const codePoints = computed(() => {
	return [...inputString.value || ""];
});

function hexBytes(bytes: number[]) {
	return bytes.map(b => b.toString(16).toUpperCase().padStart(2, '0'));
}

function binaryBytes(bytes: number[]) {
	return bytes.map(b => b.toString(2).padStart(8, '0'));
}

function numBytes(codePoint: string) {
	return toBytes(codePoint, encoding.value || '').length
}

function codePoint(input: string) {
	return 'U+' + input.codePointAt(0)?.toString(16).toUpperCase();
}

</script>
<template>
	<h1>Explain encodings</h1>
	<div>
		<label for="select-encoding">Select encoding</label>
		<select id="select-encoding" v-model="encoding">
			<option>UTF-8</option>
			<option>UTF-16le</option>
			<option>UTF-16be</option>
		</select>
	</div>
	<input id="inputString" v-model="inputString">
	<div class="spacer"></div>
	<table>
		<tbody>
			<tr>
				<td v-for="i of codePoints" :colspan="numBytes(i)">{{ i }}</td>
			</tr>
			<tr>
				<td v-for="i of codePoints" :colspan="numBytes(i)">{{ codePoint(i) }}</td>
			</tr>
			<tr>
				<td v-for="i of hexBytes(bytes || [])">{{ i }}</td>
			</tr><tr>
				<td v-for="i of binaryBytes(bytes || [])">{{ i }}</td>
			</tr>
		</tbody>
	</table>
</template>
<style lang="css">
td {
	border: 1px solid darkgray;
}
table {
	border-spacing: 0;
}
.spacer {
	margin: 2rem;
}
</style>