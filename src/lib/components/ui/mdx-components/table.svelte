<script lang="ts">
	import { cn } from '$lib/utils';

	export let className: string = '';
	export let props: Record<string, any> = {};
</script>

<div class="my-6 w-full overflow-y-auto">
	<table class={cn('w-full', className)} {...props}>
		<slot />
	</table>
</div>
