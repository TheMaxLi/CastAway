<script lang="ts">
	import { enhance } from '$app/forms';
	import UploadModal from '$lib/components/UploadModal.svelte';

	let { data, form } = $props();

	let uploading = $state(false);
	let inputRef = $state<HTMLInputElement | null>();
	let love = $state<File | null>();
	let isModalOpen = $state(false);
</script>

<div class="w-full flex justify-center h-screen items-center relative">
	<img class="h-[80vh]" src={data.post.image} alt="" />
	<div class="flex justify-between absolute top-0 w-full">
		<p class="text-red-400 text-6xl text-shadow-lg text-shadow-red-800">
			Posted By: {data.post.postedBy}
		</p>
		<p class="text-yellow-400 text-6xl text-shadow-lg text-shadow-amber-800">
			{data.post.createdAt?.toDateString()}
		</p>
	</div>
	<UploadModal bind:inputRef bind:love bind:uploading bind:isModalOpen />
	<button
		class="absolute bottom-8 flex justify-center items-centers cursor-pointer text-6xl p-4 text-green-400 text-shadow-green-800 text-shadow-lg border-8 border-green-400 drop-shadow-2xl drop-shadow-green-800"
		type="button"
		disabled={uploading}
		onclick={() => (isModalOpen = true)}
	>
		Did you find your Love?
	</button>

	{#if form?.error}
		<div class="text-red-500 p-3 bg-[#ffe6e6] border-[#ffcccc] border-4 absolute top-10">
			Error: {form.error}
		</div>
	{/if}
</div>
