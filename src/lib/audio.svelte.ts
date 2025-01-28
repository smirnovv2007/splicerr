export const globalAudio = $state({
    ref: null! as HTMLAudioElement,
    paused: true,
    currentTime: 0,
    duration: 0,
    progress() {
        return this.currentTime / this.duration
    },
    toggle() {
        this.paused = !this.paused
    }
})
