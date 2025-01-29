import { querySplice, SamplesSearch } from "$lib/splice/api"
import type {
    AssetCategorySlug,
    AssetSortType,
    SampleAsset,
    SamplesSearchResponse,
    SortOrder,
    TagSummaryEntry,
} from "$lib/splice/types"
import { loading } from "./loading.svelte"

export const DEFAULT_SORT = "popularity"
export const PER_PAGE = 50

export const randomSeed = () =>
    Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString()

export const dataStore = $state({
    assets: [] as SampleAsset[],
    tags: [] as string[],
    tag_summary: [] as TagSummaryEntry[],
    total_records: 0,
})

export const queryStore = $state({
    query: "",
    sort: DEFAULT_SORT as AssetSortType,
    random_seed: randomSeed(),
    order: "DESC" as SortOrder,
    page: 1,
    asset_category_slug: null as AssetCategorySlug | null,
    bpm: null as string | null,
    min_bpm: null as number | null,
    max_bpm: null as number | null,
})

// The query identity is the part of the query that uniquely identifies the returned data
// It is used to determine if the fetched data should replace the current data, be appended to it, or be ignored
const queryIdentity = $derived({
    query: queryStore.query,
    sort: queryStore.sort,
    order: queryStore.order,
    random_seed: queryStore.random_seed,
    tags: dataStore.tags,
    asset_category_slug: queryStore.asset_category_slug,
    bpm: queryStore.bpm?.toString(),
    min_bpm: queryStore.min_bpm,
    max_bpm: queryStore.max_bpm,
})

export const storeCallbacks = $state({
    onbeforedataupdate: null as CallableFunction | null,
    onbeforetagsupdate: null as CallableFunction | null,
})

let currentQueryIdentity: string = ""

export const fetchAssets = () => {
    const identityBeforeFetch = JSON.stringify(queryIdentity)
    if (identityBeforeFetch != currentQueryIdentity) {
        storeCallbacks.onbeforedataupdate?.()
    }
    loading.assets = true
    querySplice(SamplesSearch, {
        ...queryIdentity,
        page: queryStore.page,
        limit: PER_PAGE,
    }).then((response) => {
        const searchResult = (response as SamplesSearchResponse).data
            .assetsSearch
        const identityAfterFetch = JSON.stringify(queryIdentity)
        if (identityBeforeFetch == identityAfterFetch) {
            if (identityBeforeFetch == currentQueryIdentity) {
                dataStore.assets.push(...searchResult.items)
                console.log("Loaded more assets")
            } else {
                dataStore.assets = searchResult.items
                currentQueryIdentity = identityAfterFetch
                queryStore.page = 1
                console.log("Loaded new assets")
            }
            dataStore.total_records = searchResult.response_metadata.records

            storeCallbacks.onbeforetagsupdate?.()
            dataStore.tag_summary = searchResult.tag_summary

            loading.assets = false
            loading.beforeFirstLoad = false
        } else {
            console.log("Query changed, ignoring response")
        }
    })
}
