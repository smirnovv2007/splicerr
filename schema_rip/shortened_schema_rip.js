fragment deviceSummaries on AssetPage {
  device_summary {
    device {
      uuid
      name
    }
    count
  }
}
    `,D=c`
    fragment assetPageItems on AssetPage {
  items {
    ... on IAsset {
      asset_type_slug
      asset_prices {
        amount
        currency
      }
      uuid
      name
      tags {
        uuid
        label
      }
      files {
        uuid
        name
        hash
        path
        asset_file_type_slug
        url
      }
    }
    ... on IAssetChild {
      parents(filter: {asset_type_slug: pack}) {
        items {
          ... on PackAsset {
            permalink_slug
            permalink_base_url
            uuid
            name
            files {
              uuid
              path
              asset_file_type_slug
              url
            }
          }
        }
      }
    }
    ... on SampleAsset {
      bpm
      chord_type
      key
      duration
      uuid
      name
      asset_category_slug
    }
    ... on PresetAsset {
      uuid
      name
      asset_devices {
        uuid
        device {
          name
          uuid
          minimum_device_version
        }
      }
    }
    ... on PackAsset {
      uuid
      name
      provider {
        name
        permalink_slug
      }
      provider_uuid
      uuid
      permalink_slug
      permalink_base_url
      main_genre
    }
  }
}
    `,it=c`
    fragment assetTagSummaries on AssetPage {
  tag_summary {
    count
    tag {
      uuid
      label
      taxonomy {
        uuid
        name
      }
    }
  }
}
    `,V=c`
    fragment assetDetails on AssetPage {
  ...assetPageItems
  ...assetTagSummaries
  pagination_metadata {
    currentPage
    totalPages
  }
  response_metadata {
    records
  }
}
    ${D}
${it}`,$=c`
    fragment subscriptionFragment on PlanSubscription {
  uuid
  state
  expires_at
  resume_at
  credits
  plan {
    uuid
    display_name
    billing_frequency
    trial_length_days
    group {
      name
    }
    price {
      usd
    }
    monthly_credits
    code
    plan_details {
      description
      thumbnail_url
    }
  }
}
    `,ot=c`
    query CollectionAssetTotals($collectionUuid: GUID) {
  samples: assetsSearch(
    filter: {legacy: true, published: true, asset_type_slug: sample}
    children: {parent_asset_uuid: $collectionUuid}
    legacy: {parent_asset_type: collection, use: true}
  ) {
    response_metadata {
      records
    }
  }
  presets: assetsSearch(
    filter: {legacy: true, published: true, asset_type_slug: preset}
    children: {parent_asset_uuid: $collectionUuid}
    legacy: {parent_asset_type: collection, use: true}
  ) {
    response_metadata {
      records
    }
  }
}
    `,ut=c`
    query CollectionByPermalink($permalink: String!) {
  collection: legacyCollectionByPermalink(permalink: $permalink) {
    uuid
    name
    description
    owned
    is_subscribed
    public
    permalink_slug
    subscriber_count
    subscribers_subset {
      username
      avatar_url
    }
    creator {
      username
    }
    files {
      uuid
      asset_file_type_slug
      url
      path
    }
  }
}
    `,ct=c`
    query PacksSearch($page: Int, $order: SortOrder = DESC, $limit: Int = 50, $sort: AssetSortType = relevance, $random_seed: String, $tags: [ID!], $query: String, $ac_uuid: String) {
  assetsSearch(
    filter: {legacy: true, published: true, asset_type_slug: pack, tag_ids: $tags, query: $query, ac_uuid: $ac_uuid}
    pagination: {page: $page, limit: $limit}
    sort: {sort: $sort, order: $order, random_seed: $random_seed}
  ) {
    ...assetDetails
  }
}
    ${V}`,lt=c`
    query PresetsSearch($parent_asset_uuid: GUID, $query: String, $tags: [ID], $device_uuids: [GUID], $page: Int = 1, $limit: Int = 50, $order: SortOrder = DESC, $sort: AssetSortType = popularity, $random_seed: String, $ac_uuid: String, $parent_asset_type: AssetTypeSlug) {
  assetsSearch(
    filter: {legacy: true, published: true, asset_type_slug: preset, query: $query, tag_ids: $tags, device_uuids: $device_uuids, ac_uuid: $ac_uuid}
    children: {parent_asset_uuid: $parent_asset_uuid}
    pagination: {page: $page, limit: $limit}
    sort: {sort: $sort, order: $order, random_seed: $random_seed}
    legacy: {parent_asset_type: $parent_asset_type}
  ) {
    ...assetDetails
    ...deviceSummaries
  }
}
    ${V}
${nt}`,pt=c`
    query SamplesSearch($parent_asset_uuid: GUID, $query: String, $order: SortOrder = DESC, $sort: AssetSortType = popularity, $random_seed: String, $tags: [ID], $key: String, $chord_type: String, $bpm: String, $min_bpm: Int, $max_bpm: Int, $limit: Int = 50, $asset_category_slug: AssetCategorySlug, $page: Int = 1, $ac_uuid: String, $parent_asset_type: AssetTypeSlug) {
  assetsSearch(
    filter: {legacy: true, published: true, asset_type_slug: sample, query: $query, tag_ids: $tags, key: $key, chord_type: $chord_type, bpm: $bpm, min_bpm: $min_bpm, max_bpm: $max_bpm, asset_category_slug: $asset_category_slug, ac_uuid: $ac_uuid}
    children: {parent_asset_uuid: $parent_asset_uuid}
    pagination: {page: $page, limit: $limit}
    sort: {sort: $sort, order: $order, random_seed: $random_seed}
    legacy: {parent_asset_type: $parent_asset_type}
  ) {
    ...assetDetails
  }
}
    ${V}`;c`
    query Session {
  user {
    id
    email
    name
    username
    avatar_url
    uuid
    extendedAttributes {
      sounds
    }
  }
  intercomUser {
    hash
  }
}
    `;const dt=c`
    query SingleSoundDetail($assetUuid: GUID!, $legacy: AssetLegacyInput) {
  asset: asset(uuid: $assetUuid, legacy: $legacy) {
    __typename
    ... on IAsset {
      uuid
      name
      asset_prices {
        currency
        amount
      }
      asset_status_slug
      asset_type_slug
      files {
        uuid
        name
        url
        asset_file_type_slug
      }
      tags {
        uuid
        label
        taxonomy {
          uuid
          name
        }
      }
      ... on SampleAsset {
        asset_category_slug
        bpm
        key
        has_coso
        has_similar_sounds
        catalog_uuid
        chord_type
      }
      ... on PresetAsset {
        asset_devices {
          device {
            name
          }
        }
        catalog_uuid
      }
    }
    ... on IAssetChild {
      parents(filter: {asset_type_slug: pack}) {
        items {
          __typename
          ... on IAssetParent {
            child_asset_counts {
              type
              count
            }
          }
          ... on PackAsset {
            main_genre
            uuid
            name
            permalink_base_url
            permalink_slug
            provider {
              uuid
              name
              permalink_slug
            }
            files {
              uuid
              asset_file_type_slug
              url
              path
            }
          }
        }
      }
    }
  }
}
    `,ht=c`
    query SoundsSearchAutocomplete($term: String!) {
  soundsSearchSuggestions(searchTerm: $term, limit: 7, context: "marketplace") {
    autocompleteUuid
    results {
      autocompleteTerm
      termType
      length
      offset
    }
  }
}
    `,mt=c`
    query CategoryList($tagCategory: String!) {
  categories: tagCategoryList(permalink_slug: $tagCategory, v2Enabled: true) {
    uuid
    permalink_slug
    name
    categories {
      uuid
      name
      permalink
      description
      altDescription
      altName
      tags {
        uuid
        label
      }
      subcategories {
        uuid
        name
        permalink
        description
        altDescription
        altName
        tags {
          uuid
          label
        }
      }
    }
  }
}
    `,_t=c`
    query TagOverview($tags: [ID]) {
  samples: assetsSearch(
    filter: {legacy: true, published: true, asset_type_slug: sample, tag_ids: $tags}
    pagination: {limit: 9}
    sort: {sort: popularity, order: DESC}
  ) {
    ...assetPageItems
  }
  presets: assetsSearch(
    filter: {legacy: true, published: true, asset_type_slug: preset, tag_ids: $tags}
    pagination: {limit: 9}
    sort: {sort: popularity, order: DESC}
  ) {
    ...assetPageItems
  }
  packs: assetsSearch(
    filter: {legacy: true, published: true, asset_type_slug: pack, tag_ids: $tags}
    pagination: {limit: 6}
    sort: {sort: popularity, order: DESC}
  ) {
    ...assetPageItems
  }
}
    ${D}`;c`
    query HomePage($groupList: [PlanGroupSlug], $billingFrequency: [BillingFrequencySlug], $flagEvaluations: [PricingFlagEvaluation]) {
  plans(
    group: $groupList
    billing_frequency: $billingFrequency
    flag_evaluations: $flagEvaluations
  ) {
    uuid
    display_name
    billing_frequency
    price {
      usd
    }
    ramp_price {
      usd
    }
    ramp_duration
    pricing_model
    monthly_credits
    tier
    code
    group {
      name
    }
    plan_details {
      thumbnail_url
      features_title
      plan_features {
        text
        flags
      }
    }
  }
}
    `;const gt=c`
    query PlansPage($group: PlanGroupSlug, $groupList: [PlanGroupSlug], $billing_frequency: [BillingFrequencySlug], $flagEvaluations: [PricingFlagEvaluation]) {
  plans(
    group: $groupList
    billing_frequency: $billing_frequency
    flag_evaluations: $flagEvaluations
  ) {
    uuid
    display_name
    billing_frequency
    price {
      usd
    }
    ramp_price {
      usd
    }
    ramp_duration
    pricing_model
    tier
    code
    group {
      name
    }
    plan_details {
      thumbnail_url
      features_title
      plan_features {
        text
        flags
      }
    }
    plan_select_table_values {
      key
      value
    }
  }
  planSelectTableHeaders(flag_evaluations: $flagEvaluations) {
    header
    key
    tooltip
  }
  frequentlyAskedQuestions(group: $group, flag_evaluations: $flagEvaluations) {
    content
    title
    analytics {
      link
      text
      payload {
        unit_name
        unit_type
      }
    }
  }
  featuredPlanContent(group: $group) {
    image
    title
    text
  }
  featuredPlanTerms(group: $group) {
    image
    title
    text
    mobileText
  }
}
    `;c`
    query PlansPageServer {
  subscription {
    state
  }
}
    `;const ft=c`
    query PlansStudioOnePage($group: PlanGroupSlug, $groupList: [PlanGroupSlug], $billing_frequency: [BillingFrequencySlug]) {
  plans(group: $groupList, billing_frequency: $billing_frequency) {
    uuid
    display_name
    billing_frequency
    price {
      usd
    }
    ramp_price {
      usd
    }
    ramp_duration
    pricing_model
    tier
    code
    group {
      name
    }
    plan_details {
      plan_features {
        text
      }
      features_title
    }
  }
  frequentlyAskedQuestions(group: $group) {
    content
    title
  }
  subscription {
    state
  }
}
    `,yt=c`
    query AboutPage($group: PlanGroupSlug) {
  featuredPlanContent(group: $group) {
    image
    title
    text
  }
  featuredPlanTerms(group: $group) {
    image
    title
    text
    mobileText
  }
  frequentlyAskedQuestions(group: $group) {
    content
    title
  }
}
    `,Et=c`
    query GearById($pluginId: String!) {
  plugin: wwwPlugin(id: $pluginId) {
    seller_code
    name
    purchase_type
    price
    thumbnail_url
    background_url
    description
    tag_list
    retail_url
    manufacturer {
      canonical_path
      description
      name
      url
      logo_url
    }
    gear_details {
      plugin_description_id
      plugin_seller_code
      name
      full_price
      installment_price
      total_installments
      trial_period_days
      marketing_opt_in
      edition_level
      discount_text
      created_at
      has_upgrade
      included_components {
        type
        leasable_data {
          installment_price
        }
        gear_data {
          canonical_path
          display_name
          thumbnail_url
        }
      }
      included_in {
        type
        leasable_data {
          installment_price
        }
        gear_data {
          canonical_path
          display_name
          thumbnail_url
        }
      }
      gallery {
        type
        order
        ... on GearImage {
          url
          alt_text
        }
        ... on GearVideo {
          description
          duration
          title
          thumbnail_url
          upload_date
          url
          youtube_id
        }
      }
      marketing {
        seo_title
        seo_description
        share_image_path
      }
      specifications {
        specification_text
        specification_images
        system_requirements
        max_activations
      }
      features {
        type
        order
        ... on GearImage {
          url
          alt_text
          title
          description
        }
        ... on GearVideo {
          url
          youtube_id
          description
          thumbnail_url
          duration
          title
        }
      }
      description
      editions {
        plugin_description_id
        installment_price
        label
        canonical_path
      }
      highlights {
        title
        description
        items {
          type
          order
          ... on GearImage {
            url
            title
            description
          }
          ... on GearVideo {
            highlight_thumbnail
            url
            title
            description
            thumbnail_url
            duration
          }
        }
      }
      mini_features {
        title
        items {
          type
          order
          ... on GearImage {
            url
            title
            description
          }
          ... on GearVideo {
            url
            title
            description
            thumbnail_url
            duration
          }
        }
      }
      testimonials {
        type
        order
        url
        title
        description
      }
    }
  }
  ad: wwwPluginsShow {
    alt
    src
    src_2x
    src_mobile
    src_mobile_2x
    product {
      canonical_url
    }
  }
}
    `,It=c`
    query CombinedPlanSubscriberAndTaxes($group: PlanGroupSlug) {
  subscription(group: $group) {
    ...subscriptionFragment
  }
  conversionInfo {
    plan_tax
    plan_total
    has_valid_coupon
    amount_off
    duration
    tax_type
  }
  wwwPluginLeases {
    uuid
    state
    plugin_display_name
    installment_price
    total_installments
    installments_paid
    period_end_at
    leasable_plugin {
      plugin_seller_code
    }
    plugin {
      thumbnail_url
    }
  }
}
    ${$}`;c`
    mutation UncancelSubscription($subscriptionUUID: ID!) {
  uncancelSubscription(subscriptionUUID: $subscriptionUUID) {
    ...subscriptionFragment
  }
}
    ${$}`;c`
    mutation UnpauseSubscription($subscriptionUUID: ID!) {
  unpauseSubscription(subscriptionUUID: $subscriptionUUID) {
    ...subscriptionFragment
  }
}
    ${$}`;c`
    mutation ConvertTrialToSubscription($subscriptionUUID: ID!) {
  convertTrialToSubscription(subscriptionUUID: $subscriptionUUID) {
    ...subscriptionFragment
  }
}
    ${$}`;c`
    query ProfilePlansPage($group: PlanGroupSlug) {
  subscription(group: $group) {
    uuid
    state
    expires_at
    resume_at
    credits
    plan {
      uuid
      display_name
      billing_frequency
      trial_length_days
      group {
        name
      }
      price {
        usd
      }
      monthly_credits
      code
      plan_details {
        description
        thumbnail_url
      }
    }
  }
}
    `;const Tt=c`
    query ChangePage($group: PlanGroupSlug, $groupList: [PlanGroupSlug], $billing_frequency: [BillingFrequencySlug], $flagEvaluations: [PricingFlagEvaluation]) {
  plans(
    group: $groupList
    billing_frequency: $billing_frequency
    flag_evaluations: $flagEvaluations
  ) {
    uuid
    display_name
    billing_frequency
    price {
      usd
    }
    ramp_price {
      usd
    }
    ramp_duration
    pricing_model
    tier
    code
    group {
      name
    }
    plan_details {
      thumbnail_url
      features_title
      plan_features {
        text
        flags
      }
      description
    }
    plan_select_table_values {
      key
      value
    }
  }
  plansPageCopy(group: $group, flag_evaluations: $flagEvaluations) {
    title
    subtitle
    CTA
    higherCTA
    lowerCTA
  }
  frequentlyAskedQuestions(group: $group, flag_evaluations: $flagEvaluations) {
    content
    title
  }
  subscription {
    state
    uuid
    plan_uuid
    plan {
      uuid
      group {
        name
      }
      tier
      billing_frequency
    }
    next {
      uuid
    }
  }
}
    `,Nt=c`
    query SoundsCatalog {
  contentGroups: contentGroupsTransformed {
    type
    title
    description
    entries {
      type
      url
      caption
      main_image_url
      mobile_image_url
      pack {
        uuid
        name
        main_genre
        description
        permalink_slug
        permalink_base_url
        provider {
          uuid
          permalink_slug
          name
        }
        files {
          uuid
          url
          path
          asset_file_type_slug
        }
      }
    }
  }
  recentPacks: wwwSoundsRecentPacks(per_page: 12) {
    uuid
    name
    permalink_base_url
    provider {
      uuid
      name
      permalink_slug
    }
    permalink_slug
    legacy_permalink
    liked
    files {
      uuid
      url
      asset_file_type_slug
      path
    }
  }
  topPacks: legacyPacksChart(searchParams: {perPage: 10}) {
    uuid
    name
    permalink_slug
    current_global_chart_pos
    last_global_chart_pos
    provider {
      uuid
      name
      permalink_slug
    }
    files {
      uuid
      url
      asset_file_type_slug
      path
    }
  }
  topLabels: wwwPremiumProviders(sort: "chart", per_page: 10) {
    uuid
    legacy_uuid
    url
    name
    image_path
    permalink_slug
    current_provider_chart_position
    last_provider_chart_position
    pack_count
  }
}
    `,bt=c`
    query GenreByPermalink($permalink: String!) {
  genre: wwwGenre(permalink: $permalink) {
    description
    seo_description
    name
    permalink
    bpm_high
    bpm_low
    year
    locations
    genres_influenced {
      name
      permalink
    }
    genres_influenced_by {
      name
      permalink
    }
  }
}
    `,xt=c`
    query GenreOverview($tags: [ID]) {
  samples: assetsSearch(
    filter: {legacy: true, published: true, asset_type_slug: sample, tag_ids: $tags}
    pagination: {page: 1, limit: 9}
    sort: {sort: popularity, order: DESC}
  ) {
    ...assetPageItems
  }
  presets: assetsSearch(
    filter: {legacy: true, published: true, asset_type_slug: preset, tag_ids: $tags}
    pagination: {limit: 9}
  ) {
    ...assetPageItems
  }
  packs: assetsSearch(
    filter: {legacy: true, published: true, asset_type_slug: pack, tag_ids: $tags}
    pagination: {page: 1, limit: 6}
    sort: {sort: popularity, order: DESC}
  ) {
    ...assetPageItems
  }
}
    ${D}`,vt=c`
    query PackByPermalink($permalink: String!) {
  pack: packAsset(permalink: $permalink) {
    uuid
    name
    main_genre
    description
    permalink_slug
    permalink_base_url
    provider {
      uuid
      name
      permalink_slug
    }
    files {
      uuid
      asset_file_type_slug
      url
      path
    }
    child_asset_counts {
      type
      count
    }
    companion_packs {
      uuid
      description
      permalink_slug
      files {
        uuid
        asset_file_type_slug
        url
        path
      }
      main_genre
      provider {
        uuid
        name
        permalink_slug
      }
      main_genre
      name
    }
    story {
      uuid
      background_url
      description
      title
      videos {
        background_url
        url
      }
    }
  }
}
    `,kt=c`
    query PackOverview($parent_asset_uuid: GUID!) {
  samples: assetsSearch(
    filter: {legacy: true, published: true, asset_type_slug: sample}
    children: {parent_asset_uuid: $parent_asset_uuid}
    pagination: {page: 1, limit: 9}
    sort: {sort: popularity, order: DESC}
  ) {
    ...assetPageItems
  }
  presets: assetsSearch(
    filter: {legacy: true, published: true, asset_type_slug: preset}
    children: {parent_asset_uuid: $parent_asset_uuid}
    pagination: {page: 1, limit: 9}
    sort: {sort: popularity, order: DESC}
  ) {
    ...assetPageItems
  }
}
    ${D}`,Dt=c`
    query SearchOverview($query: String, $ac_uuid: String) {
  samples: assetsSearch(
    filter: {legacy: true, published: true, asset_type_slug: sample, query: $query, ac_uuid: $ac_uuid}
    sort: {sort: popularity, order: DESC}
    pagination: {limit: 9}
  ) {
    ...assetPageItems
  }
  presets: assetsSearch(
    filter: {legacy: true, published: true, asset_type_slug: preset, query: $query, ac_uuid: $ac_uuid}
    sort: {sort: popularity, order: DESC}
    pagination: {limit: 9}
  ) {
    ...assetPageItems
  }
  packs: assetsSearch(
    filter: {legacy: true, published: true, asset_type_slug: pack, query: $query, ac_uuid: $ac_uuid}
    sort: {sort: popularity, order: DESC}
    pagination: {limit: 6}
  ) {
    ...assetPageItems
  }
}
    ${D}`,St=c`
    query GenericTagPageMetadata($tagId: ID!) {
  tagPageMetadata(tagId: $tagId) {
    label
    productLandingPagePermalink
  }
}
