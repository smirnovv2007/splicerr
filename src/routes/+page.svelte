<script lang="ts">
    import { invoke } from "@tauri-apps/api/core"
    import { fetch } from "@tauri-apps/plugin-http"

    let name = $state("")
    let greetMsg = $state("")

    let data = $state()

    async function greet(event: Event) {
        event.preventDefault()
        // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
        greetMsg = await invoke("greet", { name })

        const response = await fetch(
            "https://surfaces-graphql.splice.com/graphql",
            {
                credentials: "include",
                headers: {
                    "User-Agent":
                        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:134.0) Gecko/20100101 Firefox/134.0",
                    Accept: "*/*",
                    "Accept-Language": "en-GB,en;q=0.5",
                    "content-type": "application/json",
                    "Alt-Used": "surfaces-graphql.splice.com",
                    "Sec-Fetch-Dest": "empty",
                    "Sec-Fetch-Mode": "cors",
                    "Sec-Fetch-Site": "same-site",
                    "Sec-GPC": "1",
                    Priority: "u=4",
                },
                referrer: "https://splice.com/",
                body: '{"operationName":"SamplesSearch","variables":{"order":"DESC","sort":"popularity","limit":10,"page":1,"tags":["hip hop"],"key":null,"chord_type":null,"bpm":null,"min_bpm":null,"max_bpm":null,"asset_category_slug":null,"random_seed":null},"query":"query SamplesSearch($parent_asset_uuid: GUID, $query: String, $order: SortOrder = DESC, $sort: AssetSortType = popularity, $random_seed: String, $tags: [ID], $key: String, $chord_type: String, $bpm: String, $min_bpm: Int, $max_bpm: Int, $limit: Int = 50, $asset_category_slug: AssetCategorySlug, $page: Int = 1, $ac_uuid: String, $parent_asset_type: AssetTypeSlug) {\\n  assetsSearch(\\n    filter: {legacy: true, published: true, asset_type_slug: sample, query: $query, tag_ids: $tags, key: $key, chord_type: $chord_type, bpm: $bpm, min_bpm: $min_bpm, max_bpm: $max_bpm, asset_category_slug: $asset_category_slug, ac_uuid: $ac_uuid}\\n    children: {parent_asset_uuid: $parent_asset_uuid}\\n    pagination: {page: $page, limit: $limit}\\n    sort: {sort: $sort, order: $order, random_seed: $random_seed}\\n    legacy: {parent_asset_type: $parent_asset_type}\\n  ) {\\n    ...assetDetails\\n    __typename\\n  }\\n}\\n\\nfragment assetDetails on AssetPage {\\n  ...assetPageItems\\n  ...assetTagSummaries\\n  pagination_metadata {\\n    currentPage\\n    totalPages\\n    __typename\\n  }\\n  response_metadata {\\n    records\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment assetPageItems on AssetPage {\\n  items {\\n    ... on IAsset {\\n      asset_type_slug\\n      asset_prices {\\n        amount\\n        currency\\n        __typename\\n      }\\n      uuid\\n      name\\n      tags {\\n        uuid\\n        label\\n        __typename\\n      }\\n      files {\\n        uuid\\n        name\\n        hash\\n        path\\n        asset_file_type_slug\\n        url\\n        __typename\\n      }\\n      __typename\\n    }\\n    ... on IAssetChild {\\n      parents(filter: {asset_type_slug: pack}) {\\n        items {\\n          ... on PackAsset {\\n            permalink_slug\\n            permalink_base_url\\n            uuid\\n            name\\n            files {\\n              uuid\\n              path\\n              asset_file_type_slug\\n              url\\n              __typename\\n            }\\n            __typename\\n          }\\n          __typename\\n        }\\n        __typename\\n      }\\n      __typename\\n    }\\n    ... on SampleAsset {\\n      bpm\\n      chord_type\\n      key\\n      duration\\n      uuid\\n      name\\n      asset_category_slug\\n      __typename\\n    }\\n    ... on PresetAsset {\\n      uuid\\n      name\\n      asset_devices {\\n        uuid\\n        device {\\n          name\\n          uuid\\n          minimum_device_version\\n          __typename\\n        }\\n        __typename\\n      }\\n      __typename\\n    }\\n    ... on PackAsset {\\n      uuid\\n      name\\n      provider {\\n        name\\n        permalink_slug\\n        __typename\\n      }\\n      provider_uuid\\n      uuid\\n      permalink_slug\\n      permalink_base_url\\n      main_genre\\n      __typename\\n    }\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment assetTagSummaries on AssetPage {\\n  tag_summary {\\n    count\\n    tag {\\n      uuid\\n      label\\n      taxonomy {\\n        uuid\\n        name\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n  __typename\\n}"}',
                method: "POST",
                mode: "cors",
            }
        )

        data = await response.json()
        console.log(data)
    }
</script>

<main class="container">
    <h1>Welcome to Tauri + Svelte</h1>

    <div class="row">
        <a href="https://vitejs.dev" target="_blank">
            <img src="/vite.svg" class="logo vite" alt="Vite Logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
            <img src="/tauri.svg" class="logo tauri" alt="Tauri Logo" />
        </a>
        <a href="https://kit.svelte.dev" target="_blank">
            <img
                src="/svelte.svg"
                class="logo svelte-kit"
                alt="SvelteKit Logo"
            />
        </a>
    </div>
    <p>Click on the Tauri, Vite, and SvelteKit logos to learn more.</p>

    <form class="row" onsubmit={greet}>
        <input
            id="greet-input"
            placeholder="Enter a name..."
            bind:value={name}
        />
        <button type="submit">Greet</button>
    </form>
    <p>{greetMsg}</p>
    <p>{data}</p>
</main>

<style>
    .logo.vite:hover {
        filter: drop-shadow(0 0 2em #747bff);
    }

    .logo.svelte-kit:hover {
        filter: drop-shadow(0 0 2em #ff3e00);
    }

    :root {
        font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
        font-size: 16px;
        line-height: 24px;
        font-weight: 400;

        color: #0f0f0f;
        background-color: #f6f6f6;

        font-synthesis: none;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        -webkit-text-size-adjust: 100%;
    }

    .container {
        margin: 0;
        padding-top: 10vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
    }

    .logo {
        height: 6em;
        padding: 1.5em;
        will-change: filter;
        transition: 0.75s;
    }

    .logo.tauri:hover {
        filter: drop-shadow(0 0 2em #24c8db);
    }

    .row {
        display: flex;
        justify-content: center;
    }

    a {
        font-weight: 500;
        color: #646cff;
        text-decoration: inherit;
    }

    a:hover {
        color: #535bf2;
    }

    h1 {
        text-align: center;
    }

    input,
    button {
        border-radius: 8px;
        border: 1px solid transparent;
        padding: 0.6em 1.2em;
        font-size: 1em;
        font-weight: 500;
        font-family: inherit;
        color: #0f0f0f;
        background-color: #ffffff;
        transition: border-color 0.25s;
        box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
    }

    button {
        cursor: pointer;
    }

    button:hover {
        border-color: #396cd8;
    }
    button:active {
        border-color: #396cd8;
        background-color: #e8e8e8;
    }

    input,
    button {
        outline: none;
    }

    #greet-input {
        margin-right: 5px;
    }

    @media (prefers-color-scheme: dark) {
        :root {
            color: #f6f6f6;
            background-color: #2f2f2f;
        }

        a:hover {
            color: #24c8db;
        }

        input,
        button {
            color: #ffffff;
            background-color: #0f0f0f98;
        }
        button:active {
            background-color: #0f0f0f69;
        }
    }
</style>
