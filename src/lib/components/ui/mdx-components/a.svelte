<script lang="ts">
	import { cn } from '$lib/utils';

	export let className: string = '';
	export let href: string;
	export let props: Record<string, any> = {};
</script>

<a class={cn('font-medium underline underline-offset-4', className)} {href} {...props}>
	<slot />
</a>
