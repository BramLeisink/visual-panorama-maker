<script lang="ts">
	import { cn } from '$lib/utils';

	export let className: string = '';
	export let src: string = '';
	export let alt: string;
	export let props: Record<string, any> = {};
</script>

<img class={cn('rounded-md border', className)} {alt} {src} {...props} />
