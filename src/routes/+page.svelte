<script lang="ts">
	import { goto } from '$app/navigation';
	import Nav from '$lib/components/Nav.svelte';

	let { data } = $props();
</script>

<div class="w-full flex justify-baseline flex-col h-screen items-center relative">
	<Nav onclick={() => goto('/upload')} authenticated={data.authenticated} label="Upload" />
	{#if data.post}
		<div class="w-full flex justify-baseline flex-col h-screen items-center gap-10 pt-10">
			<p class="text-white text-shadow-lg text-shadow-sky-100 text-3xl md:text-4xl">
				⋆｡˚ ☁︎ ˚｡ Today's Heart ⋆｡˚ ☁︎ ˚｡
			</p>
			<img class="animate-cloud-float max-w-5/6 h-auto max-h-[60vh]" src={data.post.image} alt="" />

			<div class="flex absolute bottom-4 left-2">
				<!-- <p class="text-red-400 md:text-6xl text-shadow-lg text-shadow-red-800 text-3xl flex-1/2">
			Posted By: {data.post.postedBy}
			</p> -->
				<p class="text-yellow-400 md:text-6xl text-shadow-lg text-shadow-amber-800 text-3xl">
					{data.post.createdAt?.toDateString()}
				</p>
			</div>
		</div>
	{:else}
		<p class="text-6xl">No post yet</p>
	{/if}
</div>
