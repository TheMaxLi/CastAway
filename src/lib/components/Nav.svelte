<script lang="ts">
	let { showBtn, label, onclick } = $props();
</script>

<div class="flex justify-end w-full p-3 md:p-8 md:pr-10 min-h-[70px]">
	{#if showBtn}
		<button
			class="text-2xl md:text-4xl text-sky-100 cursor-pointer rounded-3xl px-4 py-1.5 border-sky-100 border shadow-2xl shadow-sky-700 hover:bg-white/30 hover:text-sky-100/90 transition-colors duration-200 backdrop-blur-md bg-white/20"
			{onclick}
		>
			<p class="pb-0 md:pb-3">
				{label}
			</p>
		</button>
	{/if}
</div>
