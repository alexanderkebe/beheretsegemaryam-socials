"use client"

import { useLanguage } from "@/lib/language-context"
import { Globe, Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

export function LanguageSwitcher() {
  const { language, setLanguage, isDark, setIsDark } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 flex gap-2 z-50">
      {/* Dark mode toggle */}
      <button
        onClick={() => {
          console.log("🔘 Button clicked! Current isDark:", isDark)
          const newValue = !isDark
          console.log("🔘 Setting isDark to:", newValue)
          setIsDark(newValue)
          // Check immediately after state update
          setTimeout(() => {
            console.log("🔍 After toggle - HTML has dark class?", document.documentElement.classList.contains("dark"))
            console.log("🔍 Current isDark state:", isDark)
          }, 100)
        }}
        className="p-2.5 sm:p-3 rounded-full bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 hover:bg-white/20 active:bg-white/20 dark:hover:bg-white/10 dark:active:bg-white/10 transition-all duration-300 shadow-lg hover:shadow-xl active:shadow-xl active:scale-95 min-w-[44px] min-h-[44px] flex items-center justify-center"
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDark ? (
          <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 transition-transform duration-300" />
        ) : (
          <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700 dark:text-slate-300 transition-transform duration-300" />
        )}
      </button>

      {/* Language toggle */}
      <button
        onClick={() => setLanguage(language === "en" ? "am" : "en")}
        className="p-2.5 sm:p-3 rounded-full bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 hover:bg-white/20 active:bg-white/20 dark:hover:bg-white/10 dark:active:bg-white/10 transition-all duration-300 shadow-lg hover:shadow-xl active:shadow-xl active:scale-95 flex items-center gap-1.5 sm:gap-2 min-w-[44px] min-h-[44px]"
        aria-label="Toggle language"
      >
        <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
        <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
          {language === "en" ? "EN" : "ም"}
        </span>
      </button>
    </div>
  )
}
