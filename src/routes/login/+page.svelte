<script lang="ts">
	let password = $state<HTMLImageElement | null>();
	let loading = $state(false);
</script>

<div class="h-screen">
	<form
		class="w-full flex flex-col justify-center items-center h-full"
		method="POST"
		action="?/savePassword"
	>
		<select name="username" id="username_select" class="bg-amber-50 mb-4 p-2">
			<option value="max_monkey">Max monkey</option>
			<option value="tina_monkey">Tina monkey</option>
		</select>
		<input
			class="mb-4 p-2 bg-amber-50"
			placeholder="password here..."
			type="text"
			name="password"
			required
			bind:value={password}
		/>
		<div class="flex justify-end gap-4">
			<a
				class="cursor-pointer text-3xl p-4 text-red-400 text-shadow-red-800
		text-shadow-lg border-8 border-red-400 drop-shadow-2xl drop-shadow-red-800"
				href="/"
			>
				Lets go back together.
			</a>

			<button
				class="cursor-pointer text-3xl p-4 text-green-400 text-shadow-green-800 text-shadow-lg
	border-8 border-green-400 drop-shadow-2xl drop-shadow-green-800"
				type="submit"
				disabled={loading}
			>
				Let yourself be recognized.
			</button>
		</div>
	</form>
</div>
