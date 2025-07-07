<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<div
	style="background-image: url(/background.JPG); background-size: cover;"
	class="h-screen w-full"
>
	{@render children()}
</div>
