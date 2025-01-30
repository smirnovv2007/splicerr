<script lang="ts">
    import * as HoverCard from "$lib/components/ui/hover-card/index.js"
    const {
        src,
        name,
        class: className,
    }: { src: string; name: string; class?: string } = $props()
</script>

<HoverCard.Root>
    <HoverCard.Trigger class="flex-shrink-0">
        <img {src} alt={name} class="size-12 rounded" draggable="false" />
    </HoverCard.Trigger>
    <HoverCard.Content side="right" class="flex flex-col justify-center gap-2">
        <img {src} alt={name} class="w-full rounded" />
        <p>{name}</p>
    </HoverCard.Content>
</HoverCard.Root>
