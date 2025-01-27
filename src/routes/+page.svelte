<script lang="ts">
    import { querySplice, SamplesSearch } from "$lib/splice/api"
    import Waveform from "$lib/components/waveform.svelte"
    import Badge from "$lib/components/ui/badge/badge.svelte"
    import SearchInput from "$lib/components/search-input.svelte"
    import { ScrollArea } from "$lib/components/ui/scroll-area"
    import { onMount } from "svelte"
    import SortSelect from "$lib/components/sort-select.svelte"
    import AudioLines from "lucide-svelte/icons/audio-lines"
    import Repeat from "lucide-svelte/icons/repeat"
    import Settings2 from "lucide-svelte/icons/settings-2"
    import DiscAlbum from "lucide-svelte/icons/disc-album"
    import CircleX from "lucide-svelte/icons/circle-x"
    import Play from "lucide-svelte/icons/play"
    import Shuffle from "lucide-svelte/icons/shuffle"
    import Button from "$lib/components/ui/button/button.svelte"
    import ProgressLoading from "$lib/components/progress-loading.svelte"
    import PackPreview from "$lib/components/pack-preview.svelte"
    import Separator from "$lib/components/ui/separator/separator.svelte"
    import SortHeader from "$lib/components/sort-header.svelte"

    const newSeed = () =>
        Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString()

    let query = $state("")
    let sort = $state("random")
    let random_seed: string | null = newSeed()
    let order = $state<"ASC" | "DESC">("DESC")
    let page = $state(1)

    const queryVariables = $derived({ query, sort, order, random_seed })

    let assets = $state<any[]>([])
    let response_metadata = $state<any>()

    let topVariables: any = null

    $effect(() => {
        if (sort in ["random", "popularity", "relevance", "recency"]) {
            order = "DESC"
        }
    })

    let loading = $state(false)

    let viewportRef = $state<HTMLElement>(null!)

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

    const loadAssets = () => {
        const currentVariables = queryVariables
        if (currentVariables != topVariables) {
            viewportRef.scrollTo({ top: 0, behavior: "smooth" })
        }
        loading = true
        querySplice(SamplesSearch, {
            query,
            sort,
            random_seed,
            page,
        }).then((resp) => {
            if (currentVariables == queryVariables) {
                if (currentVariables == topVariables) {
                    assets.push(...resp.assetsSearch.items)
                    console.log("Loaded more assets")
                } else {
                    assets = resp.assetsSearch.items
                    topVariables = queryVariables
                    page = 1
                    console.log("Loaded new assets")
                }
                response_metadata = resp.assetsSearch.response_metadata
                loading = false
            } else {
                console.log("Query changed, ignoring response")
            }
        })
    }

    const millisToMinutesAndSeconds = (millis: number) => {
        var minutes = Math.floor(millis / 60000)
        var seconds = Math.floor((millis % 60000) / 1000)
        return minutes + ":" + (seconds < 10 ? "0" : "") + seconds
    }

    onMount(() => {
        viewportRef.addEventListener("scroll", () => {
            if (
                !loading &&
                viewportRef.scrollTop + viewportRef.clientHeight >=
                    viewportRef.scrollHeight - viewportRef.clientHeight
            ) {
                page += 1
                console.log("End of list reached, loading more assets")
                loadAssets()
            }
        })
        loadAssets()
    })
</script>

<main class="flex flex-col size-full">
    <div class="container flex flex-col pt-4 gap-4">
        <SearchInput bind:value={query} onsubmit={loadAssets} />
        <div class="flex justify-between items-end gap-2">
            <div class="text-muted-foreground text-xs flex-grow">
                {response_metadata?.records || 0} results
            </div>
            <Button
                variant="outline"
                size="icon"
                onclick={() => {
                    random_seed = newSeed()
                    loadAssets()
                }}
            >
                <Shuffle />
            </Button>
            <SortSelect bind:sort onselect={loadAssets} />
        </div>

        <div class="flex flex-col gap-2">
            <Separator />
            <div class="flex gap-4 items-center justify-between overflow-clip">
                <div class="w-12 min-w-12 text-xs text-muted-foreground">
                    Pack
                </div>
                <div class="w-12 min-w-12 text-xs text-muted-foreground"></div>
                <SortHeader
                    value="name"
                    label="Filename"
                    {sort}
                    {order}
                    class="min-w-32 w-96 flex-[3_1_auto]"
                />
                <SortHeader
                    value="duration"
                    label="Time"
                    {sort}
                    {order}
                    class="min-w-14 w-14"
                />
                <SortHeader
                    value="key"
                    label="Key"
                    {sort}
                    {order}
                    class="min-w-14 w-14"
                />
                <SortHeader
                    value="bpm"
                    label="BPM"
                    {sort}
                    {order}
                    class="min-w-14 w-14"
                />
            </div>
            <ProgressLoading {loading} />
        </div>
    </div>
    <ScrollArea
        class="container before:content-[''] before:absolute before:inset-x-0 before:top-0 before:h-4 before:bg-gradient-to-t before:from-transparent before:to-background before:pointer-events-none"
        bind:viewportRef
    >
        <div class="flex flex-col py-4 gap-4">
            {#if assets}
                {#each assets as asset}
                    {@const pack = asset.parents.items[0]}
                    <div class="flex gap-4 items-center justify-between">
                        <PackPreview src={pack.files[0].url} name={pack.name} />
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
                        <div
                            class="min-w-32 w-96 flex-[3_1_auto] overflow-clip"
                        >
                            <div
                                class="relative after:content-[''] after:absolute after:inset-y-0 after:right-0 after:w-4 after:bg-gradient-to-r after:from-transparent after:to-background after:pointer-events-none"
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
                        <Waveform
                            src={asset.files[1].url}
                            class="min-w-32 h-12 flex-grow md:block hidden"
                        />
                        <div
                            class="text-muted-foreground min-w-14 w-14 flex-grow"
                        >
                            {millisToMinutesAndSeconds(asset.duration)}
                        </div>
                        <div
                            class="text-muted-foreground min-w-14 w-14 flex-grow"
                        >
                            {(asset.key && formatKey(asset.key)) || "--"}
                        </div>
                        <div
                            class="text-muted-foreground min-w-14 w-14 flex-grow"
                        >
                            {asset.bpm || "--"}
                        </div>
                    </div>
                {/each}
            {/if}
        </div>
    </ScrollArea>
</main>
