<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<div
	style="background-image: url(/cloud_background.png); background-size: 100% 100%;"
	class="h-screen w-full"
>
	{@render children()}
</div>
