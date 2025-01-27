<script lang="ts">
    import { querySplice, SamplesSearch } from "$lib/splice/api"
    import Waveform from "$lib/components/waveform.svelte"
    import Badge from "$lib/components/ui/badge/badge.svelte"
    import SearchInput from "$lib/components/search-input.svelte"
    import { Separator } from "$lib/components/ui/separator"
    import { ScrollArea } from "$lib/components/ui/scroll-area"
    import { onMount } from "svelte"
    import SortSelect from "$lib/components/sort-select.svelte"
    import AudioLines from "lucide-svelte/icons/audio-lines"
    import Repeat from "lucide-svelte/icons/repeat"
    import Settings2 from "lucide-svelte/icons/settings-2"
    import DiscAlbum from "lucide-svelte/icons/disc-album"
    import CircleX from "lucide-svelte/icons/circle-x"
    import Play from "lucide-svelte/icons/play"
    import Button from "$lib/components/ui/button/button.svelte"
    import * as HoverCard from "$lib/components/ui/hover-card/index.js"

    let query = $state("")

    let assets = $state<any>()

    let viewportRef = $state<HTMLElement>(null!)

    const assetIcons: { [index: string]: any } = {
        oneshot: AudioLines,
        loop: Repeat,
        preset: Settings2,
        pack: DiscAlbum,
    }

    $inspect(assets)

    function search() {
        const currentQuery = query
        querySplice(SamplesSearch, { query }).then((resp) => {
            if (query == currentQuery) {
                assets = resp
                viewportRef.scrollTop = 0
            }
        })
    }

    function millisToMinutesAndSeconds(millis: number) {
        var minutes = Math.floor(millis / 60000)
        var seconds = Math.floor((millis % 60000) / 1000)
        return minutes + ":" + (seconds < 10 ? "0" : "") + seconds
    }

    onMount(() => {
        search()
    })
</script>

<main class="flex flex-col size-full">
    <div class="container flex flex-col pt-4 gap-4">
        <SearchInput bind:value={query} onsubmit={search} />
        <div class="flex justify-between items-end">
            <div class="text-muted-foreground text-xs">
                {assets?.assetsSearch.response_metadata.records || 0} results
            </div>
            <SortSelect />
        </div>
        <Separator class="mb-4" />
    </div>
    <ScrollArea class="container" bind:viewportRef>
        <div class="flex flex-col gap-4">
            {#if assets}
                {#each assets.assetsSearch.items as asset}
                    <div class="flex gap-4 items-center justify-between">
                        <HoverCard.Root>
                            <HoverCard.Trigger>
                                <img
                                    src={asset.parents.items[0].files[0].url}
                                    alt={asset.name}
                                    class="size-12 rounded min-w-12"
                                />
                            </HoverCard.Trigger>
                            <HoverCard.Content>
                                <img
                                    src={asset.parents.items[0].files[0].url}
                                    alt={asset.name}
                                    class="size-64 rounded"
                                />
                                {asset.parents.items[0].name}
                            </HoverCard.Content>
                        </HoverCard.Root>
                        <Button
                            variant="ghost"
                            class="group size-12 min-w-12 rounded p-0 [&_svg]:size-6"
                        >
                            <Play class="group-hover:block hidden" />
                            {#if asset.asset_category_slug in assetIcons}
                                {@const Icon =
                                    assetIcons[asset.asset_category_slug]}
                                <Icon class="group-hover:hidden" />
                            {:else}
                                <CircleX class="group-hover:hidden" />
                            {/if}
                        </Button>
                        <div class="min-w-0 w-96 flex-grow overflow-clip">
                            <div
                                class="relative after:content-[''] after:absolute after:inset-y-0 after:right-0 after:w-8 after:bg-gradient-to-r after:from-transparent after:to-background after:pointer-events-none"
                            >
                                <div class="overflow-clip">
                                    {(asset.name as String)
                                        .split("/")
                                        .slice(-1)}
                                </div>
                                <div
                                    class="flex gap-0.5 text-xs overflow-clip text-nowrap"
                                >
                                    {#each asset.tags as tag}
                                        <Badge variant="ghost"
                                            >{tag.label}</Badge
                                        >
                                    {/each}
                                </div>
                            </div>
                        </div>
                        <Waveform src={asset.files[1].url} />
                        <div class="text-muted-foreground min-w-12">
                            {millisToMinutesAndSeconds(asset.duration)}
                        </div>
                        <div class="text-muted-foreground min-w-12">
                            {asset.key || "--"}
                        </div>
                        <div class="text-muted-foreground min-w-12">
                            {asset.bpm || "--"}
                        </div>
                    </div>
                {/each}
            {/if}
        </div>
    </ScrollArea>
</main>
