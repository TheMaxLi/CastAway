<script lang="ts">
	let { data } = $props();
</script>

<div class="w-full flex justify-center h-screen items-center relative">
	<img class="h-[80vh]" src={data.post.image} alt="" />
	<div class="flex justify-between absolute top-0 w-full">
		<p class="text-red-400 text-7xl text-shadow-lg text-shadow-red-800">
			Posted By: {data.post.postedBy}
		</p>
		<p class="text-yellow-400 text-6xl text-shadow-lg text-shadow-amber-800">
			{data.post.createdAt?.toDateString()}
		</p>
	</div>
</div>
