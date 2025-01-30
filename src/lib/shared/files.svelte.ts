import type { SampleAsset } from "$lib/splice/types"
import { join } from "@tauri-apps/api/path"
import { exists, writeFile } from "@tauri-apps/plugin-fs"
import { getDescrambledSampleURL } from "./store.svelte"
import { config, isSamplesDirValid } from "$lib/shared/config.svelte"
import { encode } from "node-wav"

const sanitizePath = (path: string) => path.replace(/[^a-zA-Z0-9_\-\.\/]/g, "_")

const sampleAssetPath = (sampleAsset: SampleAsset) =>
    sanitizePath(`${sampleAsset.parents.items[0].name}/${sampleAsset.name}`)

export async function saveSample(sampleAsset: SampleAsset) {
    if (!config.samples_dir) {
        console.error("❌ Samples Directory not set")
        return false
    }

    if (!isSamplesDirValid()) {
        console.error("❌ Samples Directory invalid")
        return false
    }

    const relativePath = sampleAssetPath(sampleAsset)
    const absolutePath = await join(config.samples_dir, relativePath)

    if (await exists(absolutePath)) {
        console.log("🗃️ Sample already exists at", absolutePath)
        return true
    }

    const blobURL = await getDescrambledSampleURL(sampleAsset)

    const response = await fetch(blobURL)

    const blob = await response.blob()

    const buffer = await blob.arrayBuffer()

    const samples = await new AudioContext().decodeAudioData(buffer)
    const channels: ArrayBuffer[] = []

    for (let i = 0; i < samples.numberOfChannels; i++) {
        const channel = samples.getChannelData(i)

        // const start = 1200
        // const end = (sampleAsset.duration / 1000) * samples.sampleRate + start

        // channels.push(channel.subarray(start, end).buffer as ArrayBuffer)

        channels.push(channel.buffer as ArrayBuffer)
    }

    console.log("❓ Buffer", buffer)
    console.log("❓ Channels", channels)
    console.log("❓ Samples", samples)

    const wavData = encode(channels, {
        bitDepth: 16,
        sampleRate: samples.sampleRate,
    })

    console.log("🏆 Sample converted! Saving at", absolutePath)

    // await writeFile(absolutePath, new Uint8Array(wavData))
}
