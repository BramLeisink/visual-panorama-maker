<script lang="ts">
	import { cn } from '$lib/utils';

	export let className: string = '';
	export let props: Record<string, any> = {};
</script>

<hr class={cn('my-4 md:my-8', className)} {...props} />
