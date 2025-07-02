<script lang="ts">
	import { enhance } from '$app/forms';

	let { form } = $props();

	let uploading = $state(false);
</script>

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
	<input type="file" name="image" accept="image/*" required />
	<button type="submit" disabled={uploading}>
		{uploading ? 'Uploading...' : 'Upload Single Image'}
	</button>
</form>

{#if form?.error}
	<div class="text-red-500 p-3 bg-[#ffe6e6] border-[#ffcccc] border-4">
		Error: {form.error}
	</div>
{/if}

{#if form?.result}
	<img src={form.result.image} alt="" />
{/if}
