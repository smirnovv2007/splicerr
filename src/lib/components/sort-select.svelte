<script lang="ts">
    import * as Select from "$lib/components/ui/select/index"

    let {
        sort = $bindable(),
        onselect,
    }: { sort: string; onselect: CallableFunction } = $props()

    const options = [
        {
            value: "random",
            label: "Random",
        },
        {
            value: "relevance",
            label: "Most relevant",
        },
        {
            value: "popularity",
            label: "Most popular",
        },
        {
            value: "recency",
            label: "Most recent",
        },
    ]

    const hidden = [
        {
            value: "name",
            label: "Filename",
        },
        {
            value: "duration",
            label: "Time",
        },
        {
            value: "key",
            label: "Key",
        },
        {
            value: "bpm",
            label: "BPM",
        },
    ]

    const triggerContent = $derived(
        options.find((option) => option.value === sort)?.label ??
            hidden.find((option) => option.value === sort)?.label ??
            "Sort by..."
    )
</script>

<Select.Root type="single" bind:value={sort} onValueChange={() => onselect()}>
    <Select.Trigger class="w-[180px]">{triggerContent}</Select.Trigger>
    <Select.Content>
        <Select.Group>
            <Select.GroupHeading>Sort by</Select.GroupHeading>
            {#each options as option}
                <Select.Item value={option.value} label={option.label}
                    >{option.label}</Select.Item
                >
            {/each}
        </Select.Group>
    </Select.Content>
</Select.Root>
