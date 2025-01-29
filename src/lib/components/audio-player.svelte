<script lang="ts">
    import { cn } from "$lib/utils"
    import Button from "$lib/components/ui/button/button.svelte"
    import Play from "lucide-svelte/icons/play"
    import Pause from "lucide-svelte/icons/pause"
    import SkipForward from "lucide-svelte/icons/skip-forward"
    import SkipBack from "lucide-svelte/icons/skip-back"
    import { globalAudio } from "$lib/shared/audio.svelte"
    import type { MouseEventHandler } from "svelte/elements"
    import LoaderCircle from "lucide-svelte/icons/loader-circle"
    import { loading } from "$lib/shared/loading.svelte"

    let {
        class: className,
        onnext,
        onprev,
        ...restProps
    }: {
        class?: string
        onnext: MouseEventHandler<HTMLButtonElement> &
            MouseEventHandler<HTMLAnchorElement>
        onprev: MouseEventHandler<HTMLButtonElement> &
            MouseEventHandler<HTMLAnchorElement>
    } = $props()
</script>

<div class={cn("flex flex-col w-full px-2", className)} {...restProps}>
    <audio
        bind:this={globalAudio.ref}
        bind:paused={globalAudio.paused}
        bind:currentTime={globalAudio.currentTime}
        bind:duration={globalAudio.duration}
        onloadstart={() => {
            globalAudio.loading = true
        }}
        oncanplaythrough={() => {
            globalAudio.loading = false
        }}
    ></audio>
    <input
        style="--progress: {globalAudio.progress() * 100}%"
        type="range"
        class="audio-player-range"
        min={0}
        max={globalAudio.duration}
        step="any"
        bind:value={globalAudio.currentTime}
        onclick={() => globalAudio.ref.play()}
    />
    <div class="flex items-center justify-between p-1">
        <div class="flex gap-1">
            <Button
                variant="ghost"
                size="icon-lg"
                onclick={onprev}><SkipBack /></Button
            >
            <Button
                variant="ghost"
                size="icon-lg"
                onclick={() => globalAudio.toggle()}
            >
                {#if globalAudio.loading || loading.samplesCount}
                    <LoaderCircle class="animate-spin" />
                {:else if globalAudio.paused}
                    <Play />
                {:else}
                    <Pause />
                {/if}
            </Button>
            <Button
                variant="ghost"
                size="icon-lg"
                onclick={onnext}><SkipForward /></Button
            >
        </div>
        <div>Asset info here</div>
        <div>Volume slider here</div>
    </div>
</div>

<style>
    .audio-player-range {
        -webkit-appearance: none;
        appearance: none;
        background: transparent;
        cursor: pointer;
        width: 100%;
    }

    .audio-player-range:focus {
        outline: none;
    }

    .audio-player-range-track {
        @apply h-1;
        background: linear-gradient(
            to right,
            theme("colors.muted.foreground") 0%,
            theme("colors.muted.foreground") calc(var(--progress, 0%)),
            theme("colors.muted.DEFAULT") calc(var(--progress, 0%)),
            theme("colors.muted.DEFAULT") 100%
        );
    }

    .audio-player-range-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 1rem;
        height: 100%;
        opacity: 0;
    }

    .audio-player-range::-webkit-slider-runnable-track {
        @apply audio-player-range-track;
    }

    .audio-player-range::-webkit-slider-thumb {
        @apply audio-player-range-thumb;
    }

    .audio-player-range:focus::-webkit-slider-thumb {
        @apply audio-player-range-thumb;
    }

    .audio-player-range::-moz-range-track {
        @apply audio-player-range-track;
    }

    .audio-player-range::-moz-range-thumb {
        @apply audio-player-range-thumb;
    }

    .audio-player-range:focus::-moz-range-thumb {
        @apply audio-player-range-thumb;
    }
</style>
