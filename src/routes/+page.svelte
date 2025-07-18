<script lang="ts">
	import { goto } from '$app/navigation';
	import Nav from '$lib/components/Nav.svelte';

	let { data } = $props();
</script>

<div class="w-full flex justify-baseline flex-col h-screen items-center relative">
	<Nav onclick={() => goto('/upload')} showBtn={data.authenticated} label="Upload" />
	{#if data.post}
		<div class="w-full flex justify-baseline flex-col h-screen items-center gap-10 pt-24 md:pt-0">
			<h1 class="text-white text-shadow-lg text-shadow-sky-100 text-3xl md:text-5xl">
				⋆｡˚ ☁︎ ˚｡ Today's Heart ｡˚ ☁︎ ˚｡⋆
			</h1>

			<div class="animate-cloud-float w-auto max-w-[70vw] h-auto max-h-[60vh] rounded-full">
				<img
					class="w-full h-full rounded-full z-10"
					src="/BubbleSimple.png"
					alt="Bubble overlay"
					style="position: relative;"
				/>
				<div class="absolute inset-0 flex items-center justify-center">
					<img
						class="rounded-full"
						style="width: 99%; height: 99%; object-fit: cover;"
						src={data.post.image}
						alt="{data.post.postedBy} loves you!"
					/>
				</div>
			</div>

			<p class="text-white md:text-6xl text-shadow-lg text-shadow-sky-100 text-3xl flex-1/2">
				Posted By: {data.post.postedBy}
			</p>
			<div class="flex absolute bottom-4 left-2">
				<p class="text-yellow-400 md:text-6xl text-shadow-lg text-shadow-amber-800 text-3xl">
					{data.post.createdAt?.toDateString()}
				</p>
			</div>
		</div>
	{:else}
		<p class="text-6xl">No post yet</p>
	{/if}
</div>
