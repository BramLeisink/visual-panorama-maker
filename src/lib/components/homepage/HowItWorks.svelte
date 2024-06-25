<script lang="ts">
    import * as Card from '$lib/components/ui/card/index';
    import { CirclePlus, FileSliders, ImageUp, PackagePlus } from 'lucide-svelte';

    const features = [
        {
            icon: ImageUp,
            title: 'Upload Panoramic Images',
            description:
                'Upload high-resolution panoramic images from various locations or using specialized equipment.'
        },
        {
            icon: PackagePlus,
            title: 'Create Multiple Scenes',
            description:
                'Build immersive tours with multiple panoramic scenes to explore different viewpoints.'
        },
        {
            icon: CirclePlus,
            title: 'Add Interactive Hotspots',
            description:
                'Place interactive hotspots within panoramas for additional information or links.'
        },
        {
            icon: FileSliders,
            title: 'Export Tours',
            description:
                'Export tours in various formats for seamless integration with Pannellum.'
        }
    ];
</script>

<section id="howItWorks" class="container py-24 text-center sm:py-32">
    <h2 class="text-3xl font-bold md:text-4xl">
        How It{' '}
        <span class="bg-gradient-to-b from-primary/60 to-primary bg-clip-text text-transparent">
            Works{' '}
        </span>
        Step-by-Step Guide
    </h2>
    <p class="mx-auto mb-8 mt-4 text-xl text-muted-foreground md:w-3/4">
        Discover the straightforward steps to creating immersive 360-degree tours with Visual Panorama Maker.
    </p>

    <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {#each features as feature}
            <Card.Root class="bg-muted/50">
                <Card.Header>
                    <Card.Title class="grid place-items-center gap-4">
                        <svelte:component this={feature.icon} class="h-10 w-10 text-primary" />
                        {feature.title}
                    </Card.Title>
                </Card.Header>
                <Card.Content>{feature.description}</Card.Content>
            </Card.Root>
        {/each}
    </div>
</section>