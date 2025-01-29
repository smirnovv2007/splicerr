import { appConfigDir } from "@tauri-apps/api/path"

const appConfigDirPath = await appConfigDir()

export const sanitizePath = (path: string) =>
    path.replace(/[^a-zA-Z0-9_\-\.\/]/g, "_")

