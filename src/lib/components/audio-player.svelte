<script lang="ts">
    import { cn } from "$lib/utils"
    import Button from "$lib/components/ui/button/button.svelte"
    import { onMount } from "svelte"
    import Play from "lucide-svelte/icons/play"
    import Pause from "lucide-svelte/icons/pause"
    import SkipForward from "lucide-svelte/icons/skip-forward"
    import SkipBack from "lucide-svelte/icons/skip-back"
    import { globalAudio } from "$lib/audio.svelte"
    import type { MouseEventHandler } from "svelte/elements"

    let {
        class: className,
        onnext,
        onprev,
        ...restProps
    }: {
        class?: string
        onnext: MouseEventHandler<HTMLButtonElement> & MouseEventHandler<HTMLAnchorElement>
        onprev: MouseEventHandler<HTMLButtonElement> & MouseEventHandler<HTMLAnchorElement>
    } = $props()

    onMount(() => {
        globalAudio.ref.src =
            "https://s3-us-west-1.amazonaws.com/spliceblob.splice.com/sample_pack_demos/34e367b7-2f86-4d91-bf7a-33127edb78f8/demo.mp3"
    })
</script>

<div class={cn("flex flex-col w-full", className)} {...restProps}>
    <audio
        bind:this={globalAudio.ref}
        bind:paused={globalAudio.paused}
        bind:currentTime={globalAudio.currentTime}
        bind:duration={globalAudio.duration}
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
                class="[&_svg]:size-5"
                variant="ghost"
                size="icon"
                onclick={onprev}><SkipBack /></Button
            >
            <Button
                class="[&_svg]:size-5"
                variant="ghost"
                size="icon"
                onclick={() => globalAudio.toggle()}
            >
                {#if globalAudio.paused}
                    <Play />
                {:else}
                    <Pause />
                {/if}
            </Button>
            <Button
                class="[&_svg]:size-5"
                variant="ghost"
                size="icon"
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
