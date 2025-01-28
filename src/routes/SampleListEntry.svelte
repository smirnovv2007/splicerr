<script lang="ts">
    import { globalAudio } from "$lib/shared/audio.svelte"
    import PackPreview from "$lib/components/pack-preview.svelte"
    import TagBadge from "$lib/components/tag-badge.svelte"
    import Waveform from "$lib/components/waveform.svelte"
    import type { SampleAsset } from "$lib/splice/types"
    import CircleX from "lucide-svelte/icons/circle-x"
    import Pause from "lucide-svelte/icons/pause"
    import Play from "lucide-svelte/icons/play"
    import { tick } from "svelte"
    import Button from "$lib/components/ui/button/button.svelte"
    import * as Tooltip from "$lib/components/ui/tooltip/index.js"
    import Settings2 from "lucide-svelte/icons/settings-2"
    import DiscAlbum from "lucide-svelte/icons/disc-album"
    import AudioLines from "lucide-svelte/icons/audio-lines"
    import Repeat from "lucide-svelte/icons/repeat"
    import { dataStore, fetchAssets } from "$lib/shared/store.svelte"
    import { loading } from "$lib/shared/loading.svelte"
    import { cn } from "$lib/utils"

    let {
        class: className,
        selected,
        playing,
        asset,
    }: {
        class?: string
        selected: boolean
        playing: boolean
        asset: SampleAsset
    } = $props()

    const pack = $derived(asset.parents.items[0])
    const name = $derived(asset.name.split("/").slice(-1))

    const assetIcons: { [index: string]: any } = {
        oneshot: AudioLines,
        loop: Repeat,
        preset: Settings2,
        pack: DiscAlbum,
    }

    const formatKey = (key: string) => {
        const upper = key.toUpperCase()
        return upper + (key != upper ? " min" : "")
    }

    const millisToMinutesAndSeconds = (millis: number) => {
        var minutes = Math.floor(millis / 60000)
        var seconds = Math.floor((millis % 60000) / 1000)
        return minutes + ":" + (seconds < 10 ? "0" : "") + seconds
    }
</script>

<div
    class={cn(
        "flex gap-4 items-center justify-between p-1 rounded-lg",
        selected && "bg-muted",
        className
    )}
>
    <PackPreview src={pack.files[0].url} name={pack.name} />
    <Button
        variant="ghost"
        class="group size-12 min-w-12 rounded p-0 [&_svg]:size-6"
        onclick={() =>
            playing ? globalAudio.ref.pause() : globalAudio.playAsset(asset)}
    >
        {#if playing}
            <Pause />
        {:else}
            <Play class="group-hover:block hidden" />
            {#if asset.asset_category_slug in assetIcons}
                {@const Icon = assetIcons[asset.asset_category_slug]}
                <Icon class="group-hover:hidden" />
            {:else}
                <CircleX class="group-hover:hidden" />
            {/if}
        {/if}
    </Button>
    <div class="min-w-32 w-96 flex-[3_1_auto] overflow-clip">
        <div
            class={cn(
                "relative after:content-[''] after:absolute after:inset-y-0 after:right-0 after:w-4 after:bg-gradient-to-r after:from-transparent after:pointer-events-none",
                selected ? " after:to-muted" : "after:to-background"
            )}
        >
            <Tooltip.Provider>
                <Tooltip.Root>
                    <Tooltip.Trigger class="overflow-clip cursor-default">
                        {name}
                    </Tooltip.Trigger>
                    <Tooltip.Content>
                        {name}
                    </Tooltip.Content>
                </Tooltip.Root>
            </Tooltip.Provider>
            <div class="flex gap-0.5 text-xs overflow-clip text-nowrap">
                {#each asset.tags as tag}
                    {@const active = dataStore.tags.includes(tag.uuid)}
                    {@const tag_summary_tag = dataStore.tag_summary.find(
                        (t: any) => t.tag.uuid == tag.uuid
                    )}
                    <TagBadge
                        label={tag.label}
                        variant="ghost"
                        class="px-1 py-0.5 h-auto"
                        count={tag_summary_tag?.count ?? 0}
                        onclick={() => {
                            if (!active) {
                                dataStore.tags.push(tag.uuid)
                                // updateTagSummary()
                                fetchAssets()
                            }
                        }}
                    />
                {/each}
            </div>
        </div>
    </div>
    <Waveform
        src={asset.files[1].url}
        progress={selected ? globalAudio.progress() : 0}
        onclick={(event) => {
            const rect = event.currentTarget.getBoundingClientRect()
            const clickPosition = (event.clientX - rect.left) / rect.width
            const startTime = clickPosition * (asset.duration / 1000)
            globalAudio.playAsset(asset, startTime)
        }}
        onload={(waveformLoading: boolean) => {
            tick().then(() => {
                loading.waveforms += waveformLoading ? 1 : -1
            })
        }}
        class="min-w-32 w-[150px] h-12 flex-grow md:block hidden"
    />
    <div class="text-muted-foreground min-w-14 w-14 flex-grow">
        {millisToMinutesAndSeconds(asset.duration)}
    </div>
    <div class="text-muted-foreground min-w-14 w-14 flex-grow">
        {(asset.key && formatKey(asset.key)) ?? "--"}
    </div>
    <div class="text-muted-foreground min-w-14 w-14 flex-grow">
        {asset.bpm ?? "--"}
    </div>
</div>
