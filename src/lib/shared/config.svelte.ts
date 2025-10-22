import { appConfigDir, isAbsolute } from "@tauri-apps/api/path"
import {
    exists,
    BaseDirectory,
    readTextFile,
    create,
    writeTextFile,
    mkdir,
    stat,
} from "@tauri-apps/plugin-fs"
import { resetMode, setMode } from "mode-watcher"
import { md5 } from 'js-md5';

const CONFIG_FILE_NAME = "config.json"

export type UITheme = "system" | "light" | "dark"

const DEFAULT_CONFIG = {
    samples_dir: null as string | null,
    ui_theme: "system" as UITheme,
    ui_scale: 1,
    cut_mp3_delay: true,
    repeat_audio: true,
    activation_key: null as string | null,
    activated: false
}

let samplesDirValid = $state(false)

let activationKeyValid = $state(false)

let activationFailed = $state(true)

export let settingsDialog = $state({ open: false })

export let licenseDialog = $state({ open: false })

export const isSamplesDirValid = () => samplesDirValid

export const isActivationKeyValid = () => activationKeyValid

export const isActivationFailed = () => activationFailed

export let config = $state<typeof DEFAULT_CONFIG>(
    JSON.parse(JSON.stringify(DEFAULT_CONFIG))
)

export async function validateSamplesDir() {
    async function validate() {
        if (!config.samples_dir) return false
        if (!(await isAbsolute(config.samples_dir))) return false
        if (!(await exists(config.samples_dir))) return false
        if (!(await stat(config.samples_dir)).isDirectory) return false
        return true
    }

    samplesDirValid = await validate()

    console.log(
        samplesDirValid
            ? "✅ Samples Directory valid"
            : "❌ Samples Directory invalid"
    )

    return samplesDirValid
}

export async function validateActivationKey() {
    async function validate() {
        if (!config.activation_key) return false
        
        const now = new Date()
        const dd = String(now.getDate()).padStart(2, "0")
        const mm = String(now.getMonth() + 1).padStart(2, "0")
        const yyyy = String(now.getFullYear())
        const dateStr = `${dd}.${mm}.${yyyy}`

        const expected = md5(dateStr)
        
        return config.activation_key.toLowerCase() === expected.toLowerCase()
    }

    activationKeyValid = await validate()

    console.log(
        activationKeyValid
            ? "✅ Activation key valid"
            : "❌ Activation key invalid"
    )

    return activationKeyValid
}

export async function loadConfig() {
    if (
        !(await exists(CONFIG_FILE_NAME, { baseDir: BaseDirectory.AppConfig }))
    ) {
        console.log("📂 Config not found, keeping default")
    } else {
        const fileContent = await readTextFile("config.json", {
            baseDir: BaseDirectory.AppConfig,
        })
        Object.assign(config, JSON.parse(fileContent))
        config.activation_key = null as string
        console.log("📂 Config loaded")
    }

    await validateSamplesDir()
}

export async function activate() {
    if (
        (await validateActivationKey())
    ) {
        config.activated = true
        await saveConfig()
        licenseDialog.open = false
        settingsDialog.open = true
        return true
    } else {
        activationFailed = false
        return false
    }
}

export async function saveConfig() {
    await validateSamplesDir()

    const appConfig = await appConfigDir()
    if (!(await exists(appConfig))) await mkdir(appConfig)

    if (
        !(await exists(CONFIG_FILE_NAME, { baseDir: BaseDirectory.AppConfig }))
    ) {
        await create(CONFIG_FILE_NAME, { baseDir: BaseDirectory.AppConfig })
    }

    await writeTextFile(CONFIG_FILE_NAME, JSON.stringify(config), {
        baseDir: BaseDirectory.AppConfig,
    })
    console.log("💾 Config saved")
}

export function updateTheme() {
    switch (config.ui_theme) {
        case "system":
            resetMode()
            break
        default:
            setMode(config.ui_theme)
            break
    }
}
