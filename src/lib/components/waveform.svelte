<script lang="ts">
    import { cn } from "$lib/utils"
    import { fetch } from "@tauri-apps/plugin-http"
    import pako from "pako"
    import { inview } from "svelte-inview"

    const WAVEFORM_LENGTH = 800
    const TARGET_LENGTH = 100
    const GAP = 0.0
    const OVERLAP = 0.1

    let {
        src,
        width = 150,
        height = 40,
        progress = 0,
        class: className,
        onload,
    }: { src: string; width?: number; height?: number; progress?: number, class?: string, onload: CallableFunction } = $props()

    const averageToLength = (
        array: number[],
        targetLength: number
    ): number[] => {
        if (array.length === 0) return new Array(targetLength).fill(0)
        const newArray = new Array(targetLength)
        const segmentLength = array.length / targetLength

        for (let i = 0; i < targetLength; i++) {
            const start = Math.floor(i * segmentLength)
            const end = Math.floor((i + 1) * segmentLength)
            const segment = array.slice(start, end)
            newArray[i] = segment.reduce((a, b) => a + b, 0) / segment.length
        }

        return newArray
    }

    let waveform: number[] = $state(new Array(WAVEFORM_LENGTH).fill(0))

    const reducedWaveform = $derived(averageToLength(waveform, TARGET_LENGTH))
    const rectWidth = $derived(width / (1 + GAP) / reducedWaveform.length)

    let progressIndex = $derived(Math.floor(reducedWaveform.length * progress))

    let isInView = $state(false)

    $effect(() => {
        if (src) {
            onload(true)
            fetch(src).then((resp) => {
                onload(false)
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

<div
    use:inview
    oninview_change={({ detail }) => (isInView = detail.inView)}
    class={cn(className)}
>
    <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" class="size-full">
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
                    i < progressIndex ? "fill-primary" : "fill-muted-foreground",
                    isInView && "transition-[height y] duration-1000"
                )}
            />
        {/each}
    </svg>
</div>
