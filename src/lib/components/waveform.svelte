<script lang="ts">
    import { uid } from "$lib/shared/uid"
    import { cn } from "$lib/utils"
    import { fetch } from "@tauri-apps/plugin-http"
    import pako from "pako"
    import { inview } from "svelte-inview"
    import type { MouseEventHandler } from "svelte/elements"

    const WAVEFORM_LENGTH = 800

    const key = `progress-gradient-${uid()}`

    let {
        src,
        progress = 0,
        class: className,
        onclick,
        onload,
    }: {
        src: string
        progress?: number
        class?: string
        onclick: MouseEventHandler<HTMLButtonElement>
        onload: CallableFunction
    } = $props()

    let waveform: number[] = $state(new Array(WAVEFORM_LENGTH).fill(0))

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

    // Function to generate the SVG path for the waveform
    function generateWaveformPath(data: number[]) {
        const pathData = []
        const width = 1000 // Total width of the SVG
        const height = 200 // Total height of the SVG
        const midHeight = height / 2
        const step = width / data.length // Horizontal step size for each data point

        // Top half of the waveform
        pathData.push(`M 0 ${midHeight}`)
        data.forEach((value, index) => {
            const x = index * step
            const y = midHeight - value * midHeight // Flip vertically
            pathData.push(`L ${x} ${y}`)
        })

        // Bottom half (mirrored) of the waveform
        for (let i = data.length - 1; i >= 0; i--) {
            const x = i * step
            const y = midHeight + data[i] * midHeight
            pathData.push(`L ${x} ${y}`)
        }

        pathData.push("Z") // Close the path
        return pathData.join(" ")
    }
</script>

<button
    use:inview
    oninview_change={({ detail }) => (isInView = detail.inView)}
    class={cn(className)}
    {onclick}
    aria-label="Waveform"
>
    <svg class="size-full" viewBox={`0 0 1000 200`} preserveAspectRatio="none">
        <defs>
            <linearGradient id={key} x1="0" y1="0" x2="1" y2="0">
                <stop
                    offset={`${progress * 100}%`}
                    stop-color="hsl(var(--primary))"
                />
                <stop
                    offset={`${progress * 100}%`}
                    stop-color="hsl(var(--muted-foreground))"
                />
            </linearGradient>
        </defs>
        <path d={generateWaveformPath(waveform)} fill={`url(#${key})`} />
    </svg>
</button>
