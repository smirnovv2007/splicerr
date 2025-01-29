import type { PackAsset, SampleAsset } from "$lib/splice/types"
import { loading } from "$lib/shared/loading.svelte"
import { getDescrambledSampleURL } from "$lib/shared/store.svelte"

export const globalAudio = $state({
    ref: null! as HTMLAudioElement,
    currentAsset: null as SampleAsset | PackAsset | null,
    paused: true,
    currentTime: 0,
    duration: 0,
    loading: false,
    progress() {
        return this.currentTime / this.duration
    },
    toggle() {
        this.paused = !this.paused
    },
    async playSampleAsset(sampleAsset: SampleAsset, from: number = 0) {
        if (loading.samples.has(sampleAsset.uuid)) {
            console.info("🐢 Already loading sample")
            return
        }
        this.ref.src = ""
        this.currentTime = 0
        this.currentAsset = sampleAsset
        this.ref.src = await getDescrambledSampleURL(sampleAsset)
        this.ref.currentTime = from
        this.ref.loop = sampleAsset.asset_category_slug == "loop"
        this.ref.play()
    },
})
