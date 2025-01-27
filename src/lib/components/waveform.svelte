<script lang="ts">
    import { cn } from "$lib/utils"
    import { fetch } from "@tauri-apps/plugin-http"
    import pako from "pako"
    import { inview } from "svelte-inview"

    const WAVEFORM_LENGTH = 800
    const GAP = 0.0
    const OVERLAP = 0.1

    const {
        src,
        width = 150,
        height = 40,
    }: { src: URL; width?: number; height?: number } = $props()

    const everyNth = (arr: any[], nth: number) =>
        arr.filter((_, i) => i % nth === nth - 1)

    let waveform: number[] = $state(new Array(WAVEFORM_LENGTH).fill(0))

    const reducedWaveform = $derived(everyNth(waveform, 6))
    const rectWidth = $derived(width / (1 + GAP) / reducedWaveform.length)

    let isInView = $state(false)

    $effect(() => {
        if (src) {
            fetch(src).then((resp) => {
                if (resp.headers.get("content-encoding") == "gzip") {
                    resp.arrayBuffer().then((buff) => {
                        const inflated = pako.inflate(new Uint8Array(buff), {
                            to: "string",
                        })
                        waveform = JSON.parse(inflated)
                    })
                } else {
                    resp.json().then((json) => {
                        waveform = json
                    })
                }
            })
        } else {
            waveform = new Array(WAVEFORM_LENGTH).fill(0)
        }
    })
</script>

<div use:inview oninview_change={({ detail }) => (isInView = detail.inView)}>
    <svg {width} {height}>
        {#each reducedWaveform as value, i}
            {@const rectHeight = value * height}
            <rect
                x={rectWidth * i * (1 + GAP)}
                y={(height - rectHeight) / 2}
                rx={rectWidth / 2}
                ry={rectWidth / 2}
                width={rectWidth * (1 + OVERLAP)}
                height={rectHeight}
                class={cn(
                    "fill-muted-foreground",
                    isInView && "transition-[height y] duration-1000"
                )}
            />
        {/each}
    </svg>
</div>
