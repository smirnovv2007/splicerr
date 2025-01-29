<script lang="ts">
    import { loading } from "$lib/shared/loading.svelte"
    import { uid } from "$lib/shared/uid"
    import { cn } from "$lib/utils"
    import { fetch } from "@tauri-apps/plugin-http"
    import pako from "pako"

    const key = `progress-gradient-${uid()}`

    let dragging = false
    let ref = null! as HTMLButtonElement
    const onmousemove = (event: MouseEvent) => {
        if (dragging) {
            const rect = ref.getBoundingClientRect()
            progress = (event.clientX - rect.left) / rect.width
        }
    }

    let {
        src,
        progress = 0,
        class: className,
        onseek,
    }: {
        src: string
        progress?: number
        class?: string
        onseek: (progress: number) => void
    } = $props()

    let waveform = $state<number[] | null>(null)

    let loadedSrc = $state("")

    let isLoading = $state(false)

    const loaded = $derived(loadedSrc == src)

    $effect(() => {
        if (!isLoading && !loaded && !loading.fetchError) {
            fetchWaveform()
        }
    })

    function fetchWaveform() {
        isLoading = true
        loading.waveformsCount += 1
        const loadingSrc = src
        fetch(src)
            .then((resp) => {
                if (loadingSrc == src) {
                    if (resp.headers.get("content-encoding") == "gzip") {
                        resp.arrayBuffer().then((buff) => {
                            const inflated = pako.inflate(
                                new Uint8Array(buff),
                                {
                                    to: "string",
                                }
                            )
                            waveform = JSON.parse(inflated)
                        })
                    } else {
                        resp.json().then((json) => {
                            waveform = json
                        })
                    }
                    loadedSrc = src
                    loading.waveformsCount -= 1
                    isLoading = false
                } else {
                    console.info("🕜 Ignored stale waveform")
                    loading.waveformsCount -= 1
                    isLoading = false
                }
            })
            .catch((error: Error) => {
                console.error("⚠️ Failed loading waveform", error)
                loading.waveformsCount -= 1
            })
    }

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
    class={cn(className)}
    onclick={(event) => {
        const rect = ref.getBoundingClientRect()
        progress = (event.clientX - rect.left) / rect.width
        onseek(progress)
    }}
    bind:this={ref}
    onmousedown={() => {
        dragging = true
        document.addEventListener("mousemove", onmousemove)
        document.addEventListener(
            "mouseup",
            (event) => {
                dragging = false
                document.removeEventListener("mousemove", onmousemove)
                const rect = ref.getBoundingClientRect()
                progress = (event.clientX - rect.left) / rect.width
                onseek(progress)
            },
            {
                once: true,
            }
        )
    }}
    onmousemove={(e) => {
        if (dragging) {
            const rect = ref.getBoundingClientRect()
            progress = (e.clientX - rect.left) / rect.width
            onseek(progress)
        }
    }}
    aria-label="Waveform"
>
    {#if loaded && waveform}
        <svg
            class="size-full animate-waveform-reveal"
            viewBox={`0 0 1000 200`}
            preserveAspectRatio="none"
        >
            <defs>
                <linearGradient id={key} x1="0" y1="0" x2="1" y2="0">
                    <stop
                        offset={`${progress * 100 || 0}%`}
                        stop-color="hsl(var(--primary))"
                    />
                    <stop
                        offset={`${progress * 100 || 0}%`}
                        stop-color="hsl(var(--muted-foreground))"
                    />
                </linearGradient>
            </defs>
            <path d={generateWaveformPath(waveform)} fill={`url(#${key})`} />
        </svg>
    {/if}
</button>
