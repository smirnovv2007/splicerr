<script lang="ts">
    import { cn } from "$lib/utils.js"
    import ChevronDown from "lucide-svelte/icons/chevron-down"
    import ChevronsUpDown from "lucide-svelte/icons/chevrons-up-down"
    import Button from "$lib/components/ui/button/button.svelte"

    let {
        class: className,
        value,
        label,
        sort,
        order,
    }: {
        class?: string
        value: string
        label: string
        sort: string
        order: "ASC" | "DESC"
    } = $props()

    const active = $derived(value == sort)
</script>

<div class={className}>
    <Button
        variant="ghost"
        size="sm"
        class={cn(
            "gap-0 p-1",
            active ? "text-primary" : "text-muted-foreground"
        )}
    >
        <p>{label}</p>
        {#if active}
            <ChevronDown
                size="18"
                class={cn(
                    "transition-transform ease-in-out fill-primary",
                    order == "DESC" ? "rotate-180" : ""
                )}
            />
        {:else}
            <ChevronsUpDown size="12" />
        {/if}
    </Button>
</div>
