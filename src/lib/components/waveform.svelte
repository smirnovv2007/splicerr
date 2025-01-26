<script lang="ts">
    const { waveform, width = 150, height = 40 }: { waveform: [number], width: number, height: number } = $props()
    const rectWidth = $derived(width / waveform.length)
</script>

<svg {width} {height}>
    {#each waveform as value, i}
        {@const rectHeight = value * height}
        <rect x={rectWidth * i} y={(height - rectHeight) / 2} width={rectWidth} height={rectHeight} fill="white" />
    {/each}
</svg>
