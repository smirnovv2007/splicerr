import type { SampleAsset } from "$lib/splice/types"
import { join, sep } from "@tauri-apps/api/path"
import { exists, create, mkdir } from "@tauri-apps/plugin-fs"
import { getDescrambledSampleURL } from "./store.svelte"
import { config, isSamplesDirValid } from "$lib/shared/config.svelte"
import { encode } from "node-wav"
import { Buffer } from "buffer"

globalThis.Buffer = Buffer // node-wav needs Buffer which is not defined when using Vite

const sanitizePath = (path: string) => path.replace(/[^a-zA-Z0-9_\-\.\/]/g, "_")

const sampleAssetPath = (sampleAsset: SampleAsset) =>
    sanitizePath(`${sampleAsset.parents.items[0].name}/${sampleAsset.name}`)

async function ensureFileDirectoryExists(filePath: string) {
    const separator = sep()
    const dirs = filePath.split(separator).slice(0, -1) // Remove the filename
    let currentPath = ""

    for (const dir of dirs) {
        currentPath += dir + separator
        if (!(await exists(currentPath))) {
            await mkdir(currentPath)
        }
    }
}

export async function absoluteSamplePath(sampleAsset: SampleAsset) {
    if (!config.samples_dir) {
        throw new Error("❌ Samples Directory not set")
    }

    if (!isSamplesDirValid()) {
        throw new Error("❌ Samples Directory invalid")
    }

    return await join(config.samples_dir, sampleAssetPath(sampleAsset))
}

export async function saveSample(sampleAsset: SampleAsset) {
    const absolutePath = await absoluteSamplePath(sampleAsset)

    if (!absolutePath) {
        throw new Error("❌ Invalid path")
    }

    if (await exists(absolutePath)) {
        console.log("🗃️ Sample already exists at", absolutePath)
        return absolutePath
    }

    const blobURL = await getDescrambledSampleURL(sampleAsset)

    const response = await fetch(blobURL)

    const blob = await response.blob()

    const buffer = await blob.arrayBuffer()

    const samples = await new AudioContext().decodeAudioData(buffer)
    const channels: Float32Array[] = []

    for (let i = 0; i < samples.numberOfChannels; i++) {
        const channel = samples.getChannelData(i)

        const start = 1200
        const end = (sampleAsset.duration / 1000) * samples.sampleRate + start

        channels.push(channel.subarray(start, end))
    }

    console.log("❓ Buffer", buffer)
    console.log("❓ Channels", channels)
    console.log("❓ Samples", samples)

    const wavData = encode(channels as any, {
        bitDepth: 16,
        sampleRate: samples.sampleRate,
    })

    console.log("🏆 Sample converted! Saving at", absolutePath)

    await ensureFileDirectoryExists(absolutePath)

    const file = await create(absolutePath)
    await file.write(new Uint8Array(wavData))
    await file.close()

    console.log("🎉 Success!")

    return absolutePath
}
