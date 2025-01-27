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

    let lastSubmittedValue: string
    let lastSuggestionValue = $state("")

    let inputRef = $state<HTMLInputElement>(null!)

    let open = $state(false)
    let selectIndex = $state(-1)

    let suggestions = $state<any[]>([])

    let timer: number
    const debounce = (action: CallableFunction, time: number = 200) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            action()
        }, time)
    }

    const submit = () => {
        lastSubmittedValue = value
        onsubmit()
    }
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
                    if (value !== lastSubmittedValue) {
                        submit()
                    }
                    return
                } else if (e.key === "Escape") {
                    open = false
                    return
                }
                if (e.key === "ArrowDown") {
                    selectIndex = Math.min(
                        selectIndex + 1,
                        suggestions.length - 1
                    )
                } else if (e.key === "ArrowUp") {
                    if (selectIndex == -1) {
                        open = false
                    }
                    selectIndex = Math.max(selectIndex - 1, -1)
                }
                if (e.key == "ArrowUp" || e.key == "ArrowDown") {
                    if (selectIndex >= 0 && selectIndex < suggestions.length) {
                        value = suggestions[selectIndex].autocompleteTerm
                        if (value !== lastSubmittedValue) {
                            debounce(submit)
                        }
                        open = true
                    }
                    if (suggestions.length > 0) {
                        e.preventDefault()
                    }
                }
            }}
            oninput={() => {
                selectIndex = -1
                if (value !== lastSubmittedValue) {
                    debounce(submit)
                }
                querySplice(SoundsSearchAutocomplete, { term: value }).then(
                    (res) => {
                        suggestions = res.soundsSearchSuggestions.results
                        lastSuggestionValue = value.trim().toLowerCase()
                        inputRef.selectionStart = inputRef.selectionEnd =
                            value.length
                    }
                )
            }}
            class="placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-base outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
        />
    </div>
    <div class="relative w-full">
        <div class="absolute top-1 z-10">
            <Card
                class={cn(
                    "flex-col rounded-lg p-1 min-w-48",
                    open && suggestions.length > 0 ? "flex" : "hidden"
                )}
            >
                {#each suggestions as suggestion, index}
                    <Button
                        class={cn(
                            "w-full text-left justify-normal font-normal text-base duration-250",
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
                            submit()
                        }}
                    >
                        <span>
                            <span>{lastSuggestionValue}</span><span
                                class="text-muted-foreground"
                                >{(
                                    suggestion.autocompleteTerm as string
                                ).substring(lastSuggestionValue.length)}</span
                            >
                        </span>
                    </Button>
                {/each}
            </Card>
        </div>
    </div>
</div>
