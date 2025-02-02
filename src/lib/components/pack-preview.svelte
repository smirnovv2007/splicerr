<script lang="ts">
    import * as HoverCard from "$lib/components/ui/hover-card/index.js"
    import type { PackAsset } from "$lib/splice/types"
    import { openUrl } from "@tauri-apps/plugin-opener"
    const {
        pack,
        side = "right",
        size = 12,
        class: className,
    }: {
        pack: PackAsset | undefined
        side?: "right" | "top" | "bottom" | "left"
        size?: number
        class?: string
    } = $props()

    const name = $derived(pack?.name.split("/").slice(-1)[0])
    const imgSrc = $derived(pack?.files[0].url)
</script>

{#if pack}
    <HoverCard.Root>
        <HoverCard.Trigger class="flex-shrink-0">
            <img
                src={imgSrc}
                alt={name}
                class={`size-${size} rounded`}
                draggable="false"
            />
        </HoverCard.Trigger>
        <HoverCard.Content {side} class="flex flex-col justify-center gap-2">
            <img src={imgSrc} alt={name} class="w-full rounded" />
            <p>{name}</p>
        </HoverCard.Content>
    </HoverCard.Root>
{:else}
    <div class={`size-${size} rounded flex-shrink-0 bg-muted`}></div>
{/if}
