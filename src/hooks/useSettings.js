import { useEffect, useState } from 'react'

const STORAGE_KEY = 'neon-ops-settings'

export const SETTINGS_DEFAULTS = {
  parallax: true,
  militaryTime: true,
  scanlines: true,
  ambientDrift: true,
  showSeconds: true,
}

function readSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...SETTINGS_DEFAULTS }
    const parsed = JSON.parse(raw)
    return { ...SETTINGS_DEFAULTS, ...parsed }
  } catch {
    return { ...SETTINGS_DEFAULTS }
  }
}

export function useSettings() {
  const [settings, setSettings] = useState(readSettings)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  }, [settings])

  const set = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const reset = () => setSettings({ ...SETTINGS_DEFAULTS })

  return { settings, set, reset }
}
