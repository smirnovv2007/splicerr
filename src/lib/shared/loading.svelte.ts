export const loading = $state({
    assets: false,
    waveformsCount: 0,
    samples: new Set<string>(),
    samplesCount: 0,
    beforeFirstLoad: true,
    fetchError: null as Error | null,
})