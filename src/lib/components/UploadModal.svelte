<script lang="ts">
	type Props = {
		love?: File | null;
		inputRef?: HTMLInputElement | null;
		uploading: boolean;
		isModalOpen: boolean;
	};

	let {
		inputRef = $bindable(),
		love = $bindable(),
		uploading = $bindable(),
		isModalOpen = $bindable()
	}: Props = $props();

	let image = $state<HTMLImageElement | null>();
	let showImage = $state(false);

	function handleFileChange() {
		const file = inputRef?.files?.[0];

		if (file) {
			showImage = true;

			const reader = new FileReader();
			reader.addEventListener('load', function () {
				image?.setAttribute('src', reader.result as string);
			});
			reader.readAsDataURL(file);

			return;
		}
		showImage = false;
	}

	function close() {
		showImage = false;
		isModalOpen = false;
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="fixed inset-0 bg-[#00000076] z-10 not-only: {isModalOpen ? '' : 'hidden'}"
	onclick={close}
></div>
<div
	class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 rounded-lg z-20 min-w-[600px] flex flex-col items-center gap-4 {isModalOpen
		? ''
		: 'hidden'}"
>
	<img
		alt="Preview"
		class="block max-w-full max-h-52 my-4 rounded {showImage ? '' : 'hidden'}"
		bind:this={image}
	/>
	<button
		class="w-[400px] h-[400px] bg-amber-400 {!showImage ? '' : 'hidden'}"
		onclick={() => inputRef?.click()}
	>
		Click me to upload
	</button>
	<form
		class="w-full flex justify-center items-center"
		method="POST"
		action="?/uploadSingle"
		enctype="multipart/form-data"
	>
		<input
			class="mb-4"
			type="file"
			name="image"
			accept="image/*"
			required
			hidden
			bind:this={inputRef}
			bind:value={love}
			onchange={handleFileChange}
		/>
		<div class="flex justify-end gap-4">
			<button
				onclick={close}
				type="button"
				class="cursor-pointer text-3xl p-4 text-red-400 text-shadow-red-800
                    text-shadow-lg border-8 border-red-400 drop-shadow-2xl drop-shadow-red-800"
			>
				Cancel
			</button>

			<button
				class="cursor-pointer text-3xl p-4 text-green-400 text-shadow-green-800 text-shadow-lg
                    border-8 border-green-400 drop-shadow-2xl drop-shadow-green-800"
				type="submit"
				disabled={uploading}
			>
				Spread my love.
			</button>
		</div>
	</form>
</div>
