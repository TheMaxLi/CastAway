<script lang="ts">
	let { authenticated, label, onclick } = $props();
</script>

<div class="flex justify-end w-full p-3 md:p-8 md:pr-10">
	{#if authenticated}
		<button
			class="text-2xl md:text-4xl text-sky-100 cursor-pointer rounded-3xl px-4 py-1.5 border-sky-100 border shadow-2xl shadow-sky-700 hover:bg-white/30 hover:text-sky-100/90 transition-colors duration-200 backdrop-blur-md bg-white/20"
			{onclick}
		>
			{label}
		</button>
	{/if}
</div>
