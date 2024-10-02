<script setup lang="ts">

import { ref, computed } from 'vue';

function toBytes(inputValue: string, _encoding: string) {
	const encoding = _encoding.toUpperCase();
	if (encoding === 'UTF-8') {
		const encoder = new TextEncoder();
		const byteArray = encoder.encode(inputValue);

		const result: number[] = [ ...byteArray ];
		return result;
	}
	else if (encoding.startsWith('UTF-16')) {
		const result: number[] = [];
		const str = inputValue;
		if (str) {
			for (let i = 0; i < str.length; ++i) {
				const charCode = str.charCodeAt(i);
				let low = charCode & 0xFF;
				let high = (charCode & 0xFF00) >> 8;

				if (encoding.endsWith('LE')) {
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

const encoding = ref<string>('UTF-8');
const inputString = ref<string>('💩');

const codePoints = computed(() => {
	return [ ...inputString.value || '' ];
});

function hexBytes(bytes: number[]) {
	return bytes.map(b => b.toString(16).toUpperCase().padStart(2, '0'));
}

function binaryBytes(bytes: number[]) {
	return bytes.map(b => b.toString(2).padStart(8, '0'));
}

function numBytes(codePoint: string) {
	return toBytes(codePoint, encoding.value || '').length;
}

const codePoint = (input: string) => {
	return 'U+' + input.codePointAt(0)?.toString(16).toUpperCase();
};

const bytes = computed(() => {
	return toBytes(inputString.value || '', encoding.value || '');
});

</script>
<template>
	<h1>Encoding Explainer</h1>
	<div>
		<label for="select-encoding">Select encoding: </label>
		<select
			id="select-encoding"
			v-model="encoding"
		>
			<option>UTF-8</option>
			<option>UTF-16le</option>
			<option>UTF-16be</option>
		</select>
	</div>
	<input
		id="inputString"
		v-model="inputString"
	>
	<div class="spacer"></div>
	<table>
		<tbody>
			<tr>
				<td
					v-for="i of codePoints"
					:key="i"
					:colspan="numBytes(i)"
				>
					{{ i }}
				</td>
			</tr>
			<tr>
				<td
					v-for="i of codePoints"
					:key="i"
					:colspan="numBytes(i)"
				>
					{{ codePoint(i) }}
				</td>
			</tr>
			<tr>
				<td
					v-for="i of hexBytes(bytes || [])"
					:key="i"
				>
					{{ i }}
				</td>
			</tr><tr>
				<td
					v-for="i of binaryBytes(bytes || [])"
					:key="i"
				>
					{{ i }}
				</td>
			</tr>
		</tbody>
	</table>
</template>
<style lang="css">
td {
	border: 1px solid darkgray;
	padding: 0.3rem;
}
table {
	border-spacing: 0;
}
.spacer {
	margin: 2rem;
}
</style>
