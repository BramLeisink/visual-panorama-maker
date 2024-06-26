<script lang="ts">
	export let id: string | null = null;
	export let animate = false;
	export let restart = false;
	export let interactieve = false;
	export let iframe: string = '';
	export let backgroundImage: string = '';
	export let backgroundOpacity: Number = 1;
</script>

<section
	data-auto-animate-id={id}
	data-auto-animate={animate || null}
	data-auto-animate-restart={restart || null}
	data-background-iframe={iframe}
	data-background-interactive={interactieve}
	data-background-image={backgroundImage}
	data-background-opacity={backgroundOpacity}
>
	<slot />
</section>
