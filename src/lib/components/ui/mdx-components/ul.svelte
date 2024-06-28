<script lang="ts">
	import { cn } from '$lib/utils';

	export let className: string = '';
	export let props: Record<string, any> = {};
</script>

<ul class={cn('my-6 ml-6 list-disc', className)} {...props}>
	<slot />
</ul>
