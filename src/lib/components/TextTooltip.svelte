<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';

	export let text: string;
</script>

<Tooltip.Root>
	<Tooltip.Trigger>
		<slot />
	</Tooltip.Trigger>
	<Tooltip.Content>
		<p>{text}</p>
	</Tooltip.Content>
</Tooltip.Root>
