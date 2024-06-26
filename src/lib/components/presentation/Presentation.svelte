<script lang="ts">
	import MultipleScenes from '../homepage/features/MultipleScenes.svelte';
	import Slide from './Slide.svelte';
</script>

<Slide>Horizontal Slide</Slide>

<Slide>
	<Slide>Vertical Slide 1</Slide>
	<Slide>Vertical Slide 2</Slide>
</Slide>

<Slide>
	<h1>Test</h1>
	<p>wow</p>
</Slide>

<Slide animate>
	<ul>
		<li>React</li>
		<li>Solid</li>
		<li>Svelte</li>
		<li>Vue</li>
	</ul>
</Slide>

<Slide animate>
	<ul>
		<li>Svelte</li>
		<li>React</li>
		<li>Solid</li>
		<li>Vue</li>
	</ul>
</Slide>
