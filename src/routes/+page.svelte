<script lang="ts">
    import { querySplice, SamplesSearch } from "$lib/splice/api"
    import Waveform from "$lib/components/waveform.svelte"
    import Badge from "$lib/components/ui/badge/badge.svelte"
    import SearchInput from "$lib/components/search-input.svelte"
    import { Separator } from "$lib/components/ui/separator"
    import { ScrollArea } from "$lib/components/ui/scroll-area"
    import { onMount } from "svelte"

    let query = $state("")

    let assets = $state<any>()

    let viewportRef = $state<HTMLElement>(null!)

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
        <div class="text-muted-foreground text-xs">
            {assets?.assetsSearch.response_metadata.records || 0} results
        </div>
        <Separator class="mb-4" />
    </div>
    <ScrollArea class="container" bind:viewportRef>
        <div class="flex flex-col gap-4">
            {#if assets}
                {#each assets.assetsSearch.items as asset}
                    <div class="flex gap-4 items-center justify-between">
                        <img
                            src={asset.parents.items[0].files[0].url}
                            alt={asset.name}
                            class="w-12 h-12 rounded-lg"
                        />
                        <div class="min-w-0 flex-grow">
                            <div class="text-ellipsis overflow-clip">
                                {(asset.name as String).split("/").slice(-1)}
                            </div>
                            <div class="flex gap-0.5 flex-wrap text-xs">
                                {#each asset.tags as tag}
                                    <Badge variant="ghost">{tag.label}</Badge>
                                {/each}
                            </div>
                        </div>
                        <Waveform src={asset.files[1].url} />
                        <div class="text-muted-foreground w-12">
                            {millisToMinutesAndSeconds(asset.duration)}
                        </div>
                        <div class="text-muted-foreground w-12">
                            {asset.key || "--"}
                        </div>
                        <div class="text-muted-foreground w-12">
                            {asset.bpm || "--"}
                        </div>
                    </div>
                {/each}
            {/if}
        </div>
    </ScrollArea>
</main>
