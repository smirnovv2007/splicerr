<script lang="ts">
    import { querySplice, SoundsSearchAutocomplete } from "$lib/splice/api"
    import Search from "lucide-svelte/icons/search"
    import { Card } from "$lib/components/ui/card"
    import { Button } from "$lib/components/ui/button"
    import { cn } from "$lib/utils"

    let {
        value = $bindable(),
        onsubmit,
    }: { value: string; onsubmit: CallableFunction } = $props()

    let inputRef = $state<HTMLInputElement>(null!)

    let open = $state(false)
    let selectIndex = $state(-1)

    let suggestions = $state<any[]>([])
</script>

<div>
    <div
        class="flex items-center border-input border px-3 rounded-md w-full"
        data-command-input-wrapper=""
    >
        <Search class="mr-2 size-4 shrink-0 opacity-50" />
        <input
            bind:value
            bind:this={inputRef}
            placeholder="Search samples..."
            onfocus={() => (open = true)}
            onblur={() => (open = false)}
            onkeydown={(e) => {
                if (e.key === "Enter") {
                    open = false
                    onsubmit()
                    return
                }
                if (e.key === "ArrowDown") {
                    selectIndex = Math.min(
                        selectIndex + 1,
                        suggestions.length - 1
                    )
                } else if (e.key === "ArrowUp") {
                    selectIndex = Math.max(selectIndex - 1, -1)
                }
                if (e.key == "ArrowUp" || e.key == "ArrowDown") {
                    if (selectIndex >= 0 && selectIndex < suggestions.length) {
                        value = suggestions[selectIndex].autocompleteTerm
                    }
                    if (suggestions.length > 0) {
                        e.preventDefault()
                    }
                }
            }}
            oninput={() => {
                selectIndex = -1
                querySplice(SoundsSearchAutocomplete, { term: value }).then(
                    (res) => {
                        suggestions = res.soundsSearchSuggestions.results
                        inputRef.selectionStart = inputRef.selectionEnd =
                            value.length
                    }
                )
            }}
            class="placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-base outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
        />
    </div>
    <div class="relative w-full">
        <Card
            hidden={!(open && suggestions.length > 0)}
            class="rounded-lg absolute w-full top-1 p-1 gap-1"
        >
            {#each suggestions as suggestion, index}
                <Button
                    class={cn(
                        "w-full text-left justify-normal font-normal duration-250",
                        index == selectIndex
                            ? "bg-accent text-accent-foreground"
                            : "hover:bg-transparent hover:text-current"
                    )}
                    onmousemove={() => (selectIndex = index)}
                    size="sm"
                    variant="ghost"
                    onmousedown={() => {
                        value = suggestion.autocompleteTerm
                        open = false
                        onsubmit()
                    }}
                >
                    <span>{suggestion.autocompleteTerm}</span>
                </Button>
            {/each}
        </Card>
    </div>
</div>
