<script lang="ts">
	import { cn } from '$lib/utils';

	export let className: string = '';
	export let props: Record<string, any> = {};
</script>

<pre class={cn('mb-4 mt-6 overflow-x-auto rounded-lg border bg-black py-4', className)} {...props}>
	<slot />
</pre>
