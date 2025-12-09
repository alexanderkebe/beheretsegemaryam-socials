"use client"

import { useLanguage } from "@/lib/language-context"
import { Globe } from "lucide-react"
import { useEffect, useState } from "react"

export function LanguageSwitcherDark() {
  const { language, setLanguage } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="fixed bottom-6 right-6">
      {/* Language toggle */}
      <button
        onClick={() => setLanguage(language === "en" ? "am" : "en")}
        className="p-3 rounded-full bg-white/5 dark:bg-white/5 backdrop-blur-xl border border-white/10 dark:border-white/10 hover:bg-white/10 dark:hover:bg-white/10 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
        aria-label="Toggle language"
      >
        <Globe className="w-5 h-5 text-blue-400 dark:text-blue-400" />
        <span className="text-sm font-semibold text-slate-300 dark:text-slate-300">
          {language === "en" ? "EN" : "ም"}
        </span>
      </button>
    </div>
  )
}

