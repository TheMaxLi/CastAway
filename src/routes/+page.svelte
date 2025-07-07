<script lang="ts">
	import UploadModal from '$lib/components/UploadModal.svelte';

	let { data, form } = $props();

	let uploading = $state(false);
	let inputRef = $state<HTMLInputElement | null>();
	let love = $state<File | null>();
	let isModalOpen = $state(false);
</script>

<div class="w-full flex justify-center h-screen items-center relative">
	{#if form?.error}
		<div class="text-red-500 p-3 bg-[#ffe6e6] border-[#ffcccc] border-4 absolute top-10">
			Error: {form.error}
		</div>
	{/if}
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
	{/if}
	<UploadModal bind:inputRef bind:love bind:uploading bind:isModalOpen />
	{#if data.authenticated}
		<button
			class="cursor-pointer absolute bottom-8 flex text-green-400 text-shadow-green-800 p-4 text-shadow-lg md:text-6xl text-4xl border-green-400 md:border-8 border-4 drop-shadow drop-shadow-green-800"
			type="button"
			disabled={uploading}
			onclick={() => (isModalOpen = true)}
		>
			Found Love?
		</button>
	{/if}
</div>
