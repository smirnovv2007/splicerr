<script lang="ts">
    import * as Dialog from "$lib/components/ui/dialog"
    import { buttonVariants } from "$lib/components/ui/button/index.js"
    import { cn } from "$lib/utils"
    import Input from "$lib/components/ui/input/input.svelte"
    import Button from "$lib/components/ui/button/button.svelte"
    import Check from "lucide-svelte/icons/check"
    import TriangleAlert from "lucide-svelte/icons/triangle-alert"
    import Label from "$lib/components/ui/label/label.svelte"
    import {
        config,
        isActivationKeyValid,
        saveConfig,
        licenseDialog,
        activate
    } from "$lib/shared/config.svelte"
</script>

<Dialog.Root bind:open={licenseDialog.open}>
    <Dialog.Content>
        <Dialog.Header>
            <Dialog.Title>Activation</Dialog.Title>
        </Dialog.Header>
        <div class="flex flex-col gap-4 py-4">
            <div class="flex flex-col gap-2">
                <Label for="fileInput">Activation key</Label>
                <p class="text-muted-foreground text-sm">
                    Enter your activation key here
                </p>
                <div class="flex gap-2">
                    <Input
                        type="text"
                        class={isActivationKeyValid()
                            ? ""
                            : "border-warn focus-visible:border-warn focus-visible:outline-warn"}
                        bind:value={config.activation_key}
                        oninput={saveConfig}
                    />
                    <Button
                        class="flex-shrink-0 text-accent-foreground"
                        size="icon"
                        variant="outline"
                        onclick={activate}><Check /></Button
                    >
                </div>
                <div
                    class={cn(
                        "flex gap-2 items-center text-warn text-sm",
                        isActivationKeyValid() && "opacity-0"
                    )}
                >
                    <TriangleAlert size="16" />
                    Invalid activation code
                </div>
            </div>
        </div>
    </Dialog.Content>
</Dialog.Root>
