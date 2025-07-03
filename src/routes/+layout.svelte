<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<div style="background-image: url(/background.JPG); background-size: cover;">
	{@render children()}
</div>
