import type { PackAsset, SampleAsset } from "$lib/splice/types"
import { loading } from "$lib/shared/loading.svelte"
import {
    dataStore,
    freeDescrambledSample,
    getDescrambledSampleURL,
} from "$lib/shared/store.svelte"

export const globalAudio = $state({
    ref: null! as HTMLAudioElement,
    currentAsset: null as SampleAsset | PackAsset | null, // TODO: selected asset & audio player asset need to be thought through again
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
    async selectSampleAsset(sampleAsset: SampleAsset, play: boolean = true) {
        if (this.currentAsset?.uuid != sampleAsset.uuid) {
            this.paused = true
            this.currentTime = 0

            if (this.currentAsset) {
                if (
                    !dataStore.sampleAssets.some(
                        (other) => this.currentAsset?.uuid == other.uuid
                    )
                ) {
                    freeDescrambledSample(this.currentAsset.uuid)
                }
            }

            this.currentAsset = sampleAsset
            // this.ref.src = await getDescrambledSampleURL(sampleAsset)
        }
        // if (play) {
        //     this.playSampleAsset(sampleAsset)
        // }
        // TODO: this is kinda borked
    },
    async playSampleAsset(sampleAsset: SampleAsset, from: number = 0) {
        if (loading.samples.has(sampleAsset.uuid)) {
            console.info("🐢 Already loading sample")
            return
        }
        this.ref.src = ""
        this.currentTime = 0
        
        if (this.currentAsset) {
            if (
                !dataStore.sampleAssets.some(
                    (other) => this.currentAsset?.uuid == other.uuid
                )
            ) {
                freeDescrambledSample(this.currentAsset.uuid)
            }
        }

        this.currentAsset = sampleAsset
        this.ref.src = await getDescrambledSampleURL(sampleAsset)
        this.ref.currentTime = from
        this.ref.loop = sampleAsset.asset_category_slug == "loop"
        this.ref.play()
    },
})
