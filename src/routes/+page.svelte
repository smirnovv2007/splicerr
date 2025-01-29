<script lang="ts">
    import SampleListEntry from "./sample-list-entry.svelte"
    import SearchInput from "$lib/components/search-input.svelte"
    import { ScrollArea } from "$lib/components/ui/scroll-area"
    import { onMount, tick } from "svelte"
    import SortSelect from "$lib/components/sort-select.svelte"
    import Search from "lucide-svelte/icons/search"
    import Smile from "lucide-svelte/icons/smile"
    import Shuffle from "lucide-svelte/icons/shuffle"
    import Button from "$lib/components/ui/button/button.svelte"
    import ProgressLoading from "$lib/components/progress-loading.svelte"
    import Separator from "$lib/components/ui/separator/separator.svelte"
    import SortHeader from "$lib/components/sort-header.svelte"
    import ChevronDown from "lucide-svelte/icons/chevron-down"
    import { cn } from "$lib/utils"
    import AssetCategorySelect from "$lib/components/asset-category-select.svelte"
    import BpmSelect from "$lib/components/bpm-select.svelte"
    import AudioPlayer from "$lib/components/audio-player.svelte"
    import TagBadge from "$lib/components/tag-badge.svelte"
    import { globalAudio } from "$lib/shared/audio.svelte"
    import type { AssetSortType } from "$lib/splice/types"
    import { loading } from "$lib/shared/loading.svelte"
    import {
        dataStore,
        storeCallbacks,
        queryStore,
        fetchAssets,
        DEFAULT_SORT,
        randomSeed,
    } from "$lib/shared/store.svelte"
    import { getCurrentWebview } from "@tauri-apps/api/webview"

    getCurrentWebview()
        .setZoom(0.8)

    // TODO: Taxonomy comboboxes (maybe just pass all tags to each)
    const instrumentTags = $derived(() =>
        dataStore.tag_summary.filter(
            (entry) => entry.tag.taxonomy.name == "Instrument"
        )
    )

    const genreTags = $derived(() =>
        dataStore.tag_summary.filter(
            (entry) => entry.tag.taxonomy.name == "Genre"
        )
    )

    $effect(() => {
        if (
            queryStore.sort in ["random", "popularity", "relevance", "recency"]
        ) {
            queryStore.order = "DESC"
        }
    })

    storeCallbacks.onbeforedataupdate = () => {
        viewportRef.scrollTo({ top: 0, behavior: "smooth" })
    }

    storeCallbacks.onbeforetagsupdate = () => {
        tagsDrawerRef.style.height = `${tagsContainerRef.offsetHeight}px`
    }

    let expandTags = $state(false)

    let viewportRef = $state<HTMLElement>(null!)
    let tagsContainerRef = $state<HTMLElement>(null!)
    let tagsDrawerRef = $state<HTMLElement>(null!)
    let searchInputRef = $state<HTMLInputElement>(null!)

    const updateSort = (newSort: AssetSortType) => {
        if (queryStore.sort == newSort) {
            if (queryStore.order == "DESC") {
                queryStore.order = "ASC"
            } else {
                queryStore.sort = DEFAULT_SORT
            }
        } else {
            queryStore.sort = newSort
            queryStore.order = "DESC"
        }
        fetchAssets()
    }

    const updateTagSummary = () =>
        dataStore.tag_summary.sort(
            (a: any, b: any) =>
                Number(dataStore.tags.includes(b.tag.uuid)) -
                Number(dataStore.tags.includes(a.tag.uuid))
        )

    onMount(() => {
        viewportRef.addEventListener("scroll", () => {
            if (
                !loading.assets &&
                viewportRef.scrollTop + viewportRef.clientHeight >=
                    viewportRef.scrollHeight - viewportRef.clientHeight
            ) {
                queryStore.page += 1
                console.log("End of list reached, loading more assets")
                fetchAssets()
            }
        })

        searchInputRef.focus()

        fetchAssets()
    })
</script>

<main class="flex flex-col size-full">
    <div class="flex flex-col p-4 gap-4">
        <div class="flex gap-4 justify-between items-center">
            <SearchInput
                bind:value={queryStore.query}
                onsubmit={fetchAssets}
                class="flex-grow"
                bind:inputRef={searchInputRef}
            />
            <BpmSelect
                bind:bpm={queryStore.bpm}
                bind:min_bpm={queryStore.min_bpm}
                bind:max_bpm={queryStore.max_bpm}
                onsubmit={fetchAssets}
            />
            <AssetCategorySelect
                bind:asset_category_slug={queryStore.asset_category_slug}
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
                        {#each dataStore.tag_summary as tag}
                            {@const active = dataStore.tags.includes(
                                tag.tag.uuid
                            )}
                            <TagBadge
                                label={tag.tag.label}
                                count={tag.count}
                                {active}
                                onclick={() => {
                                    if (active) {
                                        dataStore.tags.splice(
                                            dataStore.tags.indexOf(
                                                tag.tag.uuid
                                            ),
                                            1
                                        )
                                    } else {
                                        dataStore.tags.push(tag.tag.uuid)
                                    }
                                    // updateTagSummary()
                                    fetchAssets()
                                }}
                            />
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
                {dataStore.total_records} results
            </div>
            <Button
                variant="outline"
                size="icon"
                onclick={() => {
                    queryStore.random_seed = randomSeed()
                    queryStore.sort = "random"
                    fetchAssets()
                }}
            >
                <Shuffle />
            </Button>
            <SortSelect
                bind:sort={queryStore.sort}
                onselect={fetchAssets}
                order={queryStore.order}
            />
        </div>

        <div class="flex flex-col gap-2">
            <Separator />
            <div class="flex gap-4 items-center justify-between overflow-clip px-2">
                <div class="w-12 min-w-12 text-xs text-muted-foreground">
                    Pack
                </div>
                <div class="w-12 min-w-12 text-xs text-muted-foreground"></div>
                <SortHeader
                    value="name"
                    label="Filename"
                    sort={queryStore.sort}
                    order={queryStore.order}
                    onsort={updateSort}
                    class="min-w-32 w-96 flex-[3_1_auto]"
                />
                <div class="min-w-32 w-[150px] flex-grow md:block hidden"></div>
                <SortHeader
                    value="duration"
                    label="Time"
                    sort={queryStore.sort}
                    order={queryStore.order}
                    onsort={updateSort}
                    class="min-w-14 w-14 flex-grow"
                />
                <SortHeader
                    value="key"
                    label="Key"
                    sort={queryStore.sort}
                    order={queryStore.order}
                    onsort={updateSort}
                    class="min-w-14 w-14 flex-grow"
                />
                <SortHeader
                    value="bpm"
                    label="BPM"
                    sort={queryStore.sort}
                    order={queryStore.order}
                    onsort={updateSort}
                    class="min-w-14 w-14 flex-grow"
                />
            </div>
            <ProgressLoading
                loading={loading.assets || loading.waveforms > 0}
            />
        </div>
    </div>
    <ScrollArea
        class="px-4 flex-grow before:content-[''] before:absolute before:inset-x-0 before:top-0 before:h-4 before:bg-gradient-to-t before:from-transparent before:to-background before:pointer-events-none after:content-[''] after:absolute after:inset-x-0 after:bottom-0 after:h-4 after:bg-gradient-to-b after:from-transparent after:to-background after:pointer-events-none"
        bind:viewportRef
        onscroll={/* (event) => window.dispatchEvent(event) /* shitty hack, doesn't even work */}
    >
        <div class="flex flex-col py-2 size-full">
            {#if dataStore.assets}
                {#each dataStore.assets as asset}
                    {@const selected =
                        globalAudio.currentAsset?.uuid == asset.uuid}
                    <SampleListEntry
                        {asset}
                        {selected}
                        playing={selected && !globalAudio.paused}
                    />
                {:else}
                    <div
                        class="flex flex-col gap-2 justify-center items-center size-full text-muted-foreground"
                    >
                        {#if loading.beforeFirstLoad}
                            <Smile size="48" />
                            <p class="font-bold text-xl">Hey there!</p>
                            <p class="text-sm">
                                Make some cool music, will ya?
                            </p>
                        {:else}
                            <Search size="48" />
                            <p class="font-bold text-xl">No results</p>
                            <p class="text-sm">Try different keywords</p>
                        {/if}
                    </div>
                {/each}
            {/if}
        </div>
    </ScrollArea>
    <AudioPlayer
        onprev={() => {
            const currentIndex = dataStore.assets.findIndex(
                (asset) => asset.uuid === globalAudio.currentAsset?.uuid
            )
            if (currentIndex !== -1 && currentIndex - 1 >= 0) {
                globalAudio.playAsset(dataStore.assets[currentIndex - 1])
            }
        }}
        onnext={() => {
            const currentIndex = dataStore.assets.findIndex(
                (asset) => asset.uuid === globalAudio.currentAsset?.uuid
            )
            if (
                currentIndex !== -1 &&
                currentIndex + 1 < dataStore.assets.length
            ) {
                globalAudio.playAsset(dataStore.assets[currentIndex + 1])
            }
        }}
    />
</main>
