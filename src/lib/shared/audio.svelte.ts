import type { PackAsset, SampleAsset } from "../splice/types"

export const globalAudio = $state({
    ref: null! as HTMLAudioElement,
    currentAsset: null as SampleAsset | PackAsset | null,
    paused: true,
    currentTime: 0,
    duration: 0,
    progress() {
        return this.currentTime / this.duration
    },
    toggle() {
        this.paused = !this.paused
    },
    playAsset(asset: SampleAsset | PackAsset, from: number = 0) {
        this.currentAsset = asset
        this.ref.src = asset.files[0].url
        this.ref.currentTime = from
        this.ref.play()
    }
})
