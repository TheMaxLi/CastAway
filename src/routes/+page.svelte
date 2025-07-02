<script lang="ts">
	import { enhance } from '$app/forms';

	let uploading = $state(false);
	let imgInputRef = $state<HTMLInputElement | undefined>();
	let love = $state<File>();

	let { data, form } = $props();
</script>

<div class="w-full flex justify-center h-screen items-center relative">
	{#if data.post}
		<img class="h-[80vh]" src={data.post.image} alt="" />
		<div class="flex justify-between absolute top-0 w-full">
			<p class="text-red-400 text-7xl text-shadow-lg text-shadow-red-800">
				Posted By: {data.post.postedBy}
			</p>
			<p class="text-yellow-400 text-6xl text-shadow-lg text-shadow-amber-800">
				{data.post.createdAt?.toDateString()}
			</p>
		</div>
	{/if}
	<div class="flex absolute bottom-8">
		<form
			method="POST"
			action="?/uploadSingle"
			enctype="multipart/form-data"
			use:enhance={() => {
				uploading = true;
				return async ({ result, update }) => {
					uploading = false;
					await update();
				};
			}}
		>
			<input
				type="file"
				name="image"
				accept="image/*"
				required
				hidden
				bind:this={imgInputRef}
				bind:value={love}
			/>
			{#if love}
				<button
					class="text-green-400 text-shadow-green-800 p-4 text-shadow-lg text-7xl border-green-400 border-8 drop-shadow drop-shadow-green-800"
					type="submit">Spread your love.</button
				>
			{:else}
				<button
					onclick={() => imgInputRef?.click()}
					class="text-green-400 text-shadow-green-800 p-4 text-shadow-lg text-7xl border-green-400 border-8 drop-shadow drop-shadow-green-800"
					>Found love?
				</button>
			{/if}
		</form>
	</div>
	{#if form?.error}
		<div class="text-red-500 p-3 bg-[#ffe6e6] border-[#ffcccc] border-4 absolute top-10">
			Error: {form.error}
		</div>
	{/if}
</div>
