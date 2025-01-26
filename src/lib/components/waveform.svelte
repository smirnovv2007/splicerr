<script lang="ts">
    const { waveform }: { waveform: [number] } = $props()
</script>

<svg width={waveform.length * 2} height="20">
    {#each waveform as value, i}
        {@const height = value * 10}
        <rect x={i} y={10 - height / 2} width={2} height={height} fill="white" />
    {/each}
</svg>
