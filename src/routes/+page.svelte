<script lang="ts">
	let { data } = $props();
</script>

<div class="w-full flex justify-center h-screen items-center relative">
	{#if data.post}
		<img class="h-[80vh] animate-cloud-float" src={data.post.image} alt="" />

		<div class="flex absolute top-0 w-full">
			<p class="text-red-400 md:text-6xl text-shadow-lg text-shadow-red-800 text-3xl flex-1/2">
				Posted By: {data.post.postedBy}
			</p>
			<p class="text-yellow-400 md:text-6xl text-shadow-lg text-shadow-amber-800 text-3xl">
				{data.post.createdAt?.toDateString()}
			</p>
		</div>
	{:else}
		<p class="text-6xl">No post yet</p>
	{/if}
</div>
