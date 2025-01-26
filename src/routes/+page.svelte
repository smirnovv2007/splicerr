<script lang="ts">
    import { invoke } from "@tauri-apps/api/core"
    import { CategoryList, querySplice, SamplesSearch } from "$lib/splice/api"
    import Waveform from "$lib/components/waveform.svelte"
    import { fetch } from "@tauri-apps/plugin-http"
    import pako from "pako"

    let name = $state("")
    let greetMsg = $state("")

    let genres = $state<any>()
    let assets = $state<any>()

    $inspect(genres, assets)

    async function greet(event: Event) {
        event.preventDefault()
        // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
        greetMsg = await invoke("greet", { name })

        genres = await querySplice(CategoryList)
        assets = await querySplice(SamplesSearch, { query: name })
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
    <form class="row" onsubmit={greet}>
        <input
            id="greet-input"
            placeholder="Enter a name..."
            bind:value={name}
        />
        <button type="submit">Greet</button>
    </form>
    <p>{greetMsg}</p>
    <div class="flex gap-2">
        {#if genres}
            {#each genres.categories.categories as category}
                <span>{category.name}</span>
            {/each}
        {/if}
    </div>
    {#if assets}
        {#each assets.assetsSearch.items as asset}
            <div class="flex gap-4">
                <span class="text-ellipsis max-w-32 min-w-0">{asset.name}</span>
                {#await getWaveform(asset) then waveform}
                    <Waveform {waveform} />
                {/await}
            </div>
        {/each}
    {/if}
</main>