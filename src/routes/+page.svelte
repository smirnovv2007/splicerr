<script lang="ts">
    import { CategoryList, querySplice, SamplesSearch } from "$lib/splice/api"
    import Waveform from "$lib/components/waveform.svelte"
    import { fetch } from "@tauri-apps/plugin-http"
    import pako from "pako"
    import Badge from "$lib/components/ui/badge/badge.svelte"

    let name = $state("")

    let genres = $state<any>()
    let assets = $state<any>()

    $inspect(assets)

    async function greet(event: Event) {
        event.preventDefault()

        genres = await querySplice(CategoryList)
        assets = await querySplice(SamplesSearch, { query: name })
    }

    function millisToMinutesAndSeconds(millis: number) {
        var minutes = Math.floor(millis / 60000)
        var seconds = Math.floor((millis % 60000) / 1000)
        return minutes + ":" + (seconds < 10 ? "0" : "") + seconds
    }

    async function getWaveform(asset: any) {
        const url = asset.files.find(
            (file: any) => (file as any).asset_file_type_slug == "waveform"
        )?.url
        if (!url) return []
        const response = await fetch(url)
        if (response.headers.get("content-encoding") == "gzip") {
            const buffer = await response.arrayBuffer()
            const inflated = pako.inflate(new Uint8Array(buffer), {
                to: "string",
            })
            return JSON.parse(inflated) as [number]
        }
        const json = await response.json().catch((e) => {
            console.error(e)
            console.log(url)
        })
        return json as [number]
    }
</script>

<main class="container">
    <div class="flex gap-4">
        <form class="row" onsubmit={greet}>
            <input
                id="greet-input"
                placeholder="Enter a name..."
                bind:value={name}
            />
            <button type="submit">Greet</button>
        </form>
        <div class="text-muted-foreground">
            {#if assets}
                {assets.assetsSearch.response_metadata.records} Samples found
            {/if}
        </div>
    </div>
    <div class="flex gap-2 text-muted-foreground py-4">
        {#if genres}
            {#each genres.categories.categories as category}
                <span>{category.name}</span>
            {/each}
        {/if}
    </div>
    <div class="flex flex-col gap-4">
        {#if assets}
            {#each assets.assetsSearch.items as asset}
                <div class="flex gap-4 items-center">
                    <div class="w-64">
                        <div class="text-ellipsis overflow-clip">
                            {(asset.name as String).split("/").slice(-1)}
                        </div>
                        <div class="flex gap-0.5 flex-wrap text-[0.75rem]">
                            {#each asset.tags as tag}
                                <Badge variant="text">{tag.label}</Badge>
                            {/each}
                        </div>
                    </div>
                    {#await getWaveform(asset)}
                        <Waveform waveform={[0]} />
                    {:then waveform}
                        <Waveform {waveform} />
                    {/await}
                    <div class="text-muted-foreground">
                        {millisToMinutesAndSeconds(asset.duration)}
                    </div>
                    <div class="text-muted-foreground">
                        {asset.key}
                    </div>
                    <div class="text-muted-foreground">
                        {asset.bpm}
                    </div>
                </div>
            {/each}
        {/if}
    </div>
</main>
