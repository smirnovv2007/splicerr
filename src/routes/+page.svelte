<script lang="ts">
    import { querySplice, SamplesSearch } from "$lib/splice/api"
    import Waveform from "$lib/components/waveform.svelte"
    import SearchInput from "$lib/components/search-input.svelte"
    import { ScrollArea } from "$lib/components/ui/scroll-area"
    import { onMount, tick } from "svelte"
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
    import ChevronDown from "lucide-svelte/icons/chevron-down"
    import { cn } from "$lib/utils"
    import AssetCategorySelect from "$lib/components/asset-category-select.svelte"
    import BpmSelect from "$lib/components/bpm-select.svelte"

    const DEFAULT_SORT = "popularity"
    const PER_PAGE = 50

    const newSeed = () =>
        Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString()

    let query = $state("")
    let sort = $state(DEFAULT_SORT)
    let random_seed = $state<string | null>(newSeed())
    let order = $state<"ASC" | "DESC">("DESC")
    let page = $state(1)
    let tags = $state<any[]>([])
    let asset_category_slug = $state<string | null>(null)
    let bpm = $state<string | null>(null)
    let min_bpm = $state<number | null>(null)
    let max_bpm = $state<number | null>(null)

    let assets = $state<any[]>([])
    let response_metadata = $state<any>()
    let tag_summary = $state<any>()

    $effect(() => {
        if (sort in ["random", "popularity", "relevance", "recency"]) {
            order = "DESC"
        }
    })

    let loadingAssets = $state(false)
    let waveformsLoading = $state(0)

    let expandTags = $state(false)

    let viewportRef = $state<HTMLElement>(null!)
    let tagsContainerRef = $state<HTMLElement>(null!)
    let tagsDrawerRef = $state<HTMLElement>(null!)

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

    const queryIdentity = $derived({
        query,
        sort,
        order,
        random_seed,
        tags,
        asset_category_slug,
        bpm: bpm?.toString(),
        min_bpm,
        max_bpm,
    })
    let currentQueryIdentity: string = ""

    const fetchAssets = () => {
        const identityBeforeFetch = JSON.stringify(queryIdentity)
        console.log("Fetching assets", identityBeforeFetch)
        if (identityBeforeFetch != currentQueryIdentity) {
            viewportRef.scrollTo({ top: 0, behavior: "smooth" })
        }
        loadingAssets = true
        querySplice(SamplesSearch, {
            ...queryIdentity,
            page,
            limit: PER_PAGE,
        }).then((resp) => {
            const identityAfterFetch = JSON.stringify(queryIdentity)
            if (identityBeforeFetch == identityAfterFetch) {
                if (identityBeforeFetch == currentQueryIdentity) {
                    assets.push(...resp.assetsSearch.items)
                    console.log("Loaded more assets")
                } else {
                    assets = resp.assetsSearch.items
                    currentQueryIdentity = identityAfterFetch
                    page = 1
                    console.log("Loaded new assets")
                }
                response_metadata = resp.assetsSearch.response_metadata

                tagsDrawerRef.style.height =
                    tagsContainerRef.offsetHeight + "px"
                tag_summary = resp.assetsSearch.tag_summary

                loadingAssets = false
            } else {
                console.log("Query changed, ignoring response")
            }
        })
    }

    const updateSort = (newSort: string) => {
        if (sort == newSort) {
            if (order == "DESC") {
                order = "ASC"
            } else {
                sort = DEFAULT_SORT
            }
        } else {
            sort = newSort
            order = "DESC"
        }
        fetchAssets()
    }

    const updateTagSummary = () =>
        tag_summary.sort(
            (a: any, b: any) =>
                Number(tags.includes(b.tag.uuid)) -
                Number(tags.includes(a.tag.uuid))
        )

    const millisToMinutesAndSeconds = (millis: number) => {
        var minutes = Math.floor(millis / 60000)
        var seconds = Math.floor((millis % 60000) / 1000)
        return minutes + ":" + (seconds < 10 ? "0" : "") + seconds
    }

    onMount(() => {
        viewportRef.addEventListener("scroll", () => {
            if (
                !loadingAssets &&
                viewportRef.scrollTop + viewportRef.clientHeight >=
                    viewportRef.scrollHeight - viewportRef.clientHeight
            ) {
                page += 1
                console.log("End of list reached, loading more assets")
                fetchAssets()
            }
        })

        fetchAssets()
    })
</script>

<main class="flex flex-col size-full">
    <div class="container flex flex-col pt-4 gap-4">
        <SearchInput bind:value={query} onsubmit={fetchAssets} />

        <div class="flex gap-4 justify-between items-center">
            <div class="flex-grow"></div>
            <BpmSelect
                bind:bpm
                bind:min_bpm
                bind:max_bpm
                onsubmit={fetchAssets}
            />
            <AssetCategorySelect
                bind:asset_category_slug
                onselect={fetchAssets}
            />
        </div>

        <div
            class="transition-[height] ease-in-out overflow-clip"
            bind:this={tagsDrawerRef}
        >
            <div
                class="flex justify-between gap-2"
                bind:this={tagsContainerRef}
            >
                <div
                    class={cn(
                        "min-w-0 relative",
                        !expandTags &&
                            "after:content-[''] after:absolute after:inset-y-0 after:right-0 after:w-4 after:bg-gradient-to-r after:from-transparent after:to-background after:pointer-events-none"
                    )}
                >
                    <div
                        class={cn(
                            "flex text-nowrap gap-1 overflow-clip flex-shrink",
                            expandTags && "flex-wrap"
                        )}
                    >
                        {#each tag_summary as tag}
                            {#if tags.includes(tag.tag.uuid)}
                                <Button
                                    class="px-2 min-w-14 h-6 justify-center shrink-0"
                                    variant="default"
                                    onclick={() => {
                                        tags.splice(
                                            tags.indexOf(tag.tag.uuid),
                                            1
                                        )
                                        // updateTagSummary()
                                        fetchAssets()
                                    }}
                                    >{tag.tag.label}
                                </Button>
                            {:else}
                                <Button
                                    class="px-2 min-w-14 h-6 justify-center text-muted-foreground shrink-0"
                                    variant="outline"
                                    onclick={() => {
                                        tags.push(tag.tag.uuid)
                                        // updateTagSummary()
                                        fetchAssets()
                                    }}
                                    >{tag.tag.label}
                                </Button>
                            {/if}
                        {/each}
                    </div>
                </div>
                <Button
                    variant="outline"
                    size="icon"
                    onclick={() => {
                        expandTags = !expandTags
                        tick().then(() => {
                            tagsDrawerRef.style.height =
                                tagsContainerRef.offsetHeight + "px"
                        })
                    }}
                    class="shrink-0 h-6 px-5 text-muted-foreground"
                >
                    <ChevronDown
                        size="18"
                        class={cn(
                            "transition-transform ease-in-out",
                            expandTags ? "rotate-[-180deg]" : ""
                        )}
                    /></Button
                >
            </div>
        </div>

        <div class="flex justify-between items-end gap-2">
            <div class="text-muted-foreground text-xs flex-grow">
                {(response_metadata?.records as number).toLocaleString() || 0} results
            </div>
            <Button
                variant="outline"
                size="icon"
                onclick={() => {
                    random_seed = newSeed()
                    sort = "random"
                    fetchAssets()
                }}
            >
                <Shuffle />
            </Button>
            <SortSelect bind:sort onselect={fetchAssets} {order} />
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
                    onsort={updateSort}
                    class="min-w-32 w-96 flex-[3_1_auto]"
                />
                <SortHeader
                    value="duration"
                    label="Time"
                    {sort}
                    {order}
                    onsort={updateSort}
                    class="min-w-14 w-14"
                />
                <SortHeader
                    value="key"
                    label="Key"
                    {sort}
                    {order}
                    onsort={updateSort}
                    class="min-w-14 w-14"
                />
                <SortHeader
                    value="bpm"
                    label="BPM"
                    {sort}
                    {order}
                    onsort={updateSort}
                    class="min-w-14 w-14"
                />
            </div>
            <ProgressLoading loading={loadingAssets || waveformsLoading > 0} />
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
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            class="px-1 py-0.5 h-auto text-muted-foreground hover:bg-secondary/80 border-transparent hover:text-accent-foreground"
                                            onclick={() => {
                                                if (!tags.includes(tag.uuid)) {
                                                    tags.push(tag.uuid)
                                                    // updateTagSummary()
                                                    fetchAssets()
                                                }
                                            }}>{tag.label}</Button
                                        >
                                    {/each}
                                </div>
                            </div>
                        </div>
                        <Waveform
                            src={asset.files[1].url}
                            onload={(loading: boolean) => {
                                tick().then(() => {
                                    waveformsLoading += loading ? 1 : -1
                                })
                            }}
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
