<script lang="ts">
    import Separator from "$lib/components/ui/separator/separator.svelte"
    import { cn } from "$lib/utils.js"

    let { class: className, loading }: { class?: string; loading: boolean } =
        $props()
</script>

<div class={cn("w-full", className)}>
    <div class="w-full overflow-clip relative">
        <Separator />
        {#if loading}
            <div
                class="absolute top-0 animate-progress-loading w-full h-full bg-primary origin-left-right"
            ></div>
        {/if}
    </div>
</div>
