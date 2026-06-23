"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import type { Language } from "./translations"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  isDark: boolean
  setIsDark: (dark: boolean) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("am")
  const [isDark, setIsDarkState] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Load preferences from localStorage on mount
  useEffect(() => {
    const savedLang = localStorage.getItem("language") as Language | null
    const savedDark = localStorage.getItem("isDark")
    
    if (savedLang) setLanguageState(savedLang)
    
    // Load dark mode preference and apply immediately
    if (savedDark !== null) {
      const darkMode = savedDark === "true"
      setIsDarkState(darkMode)
      // Apply immediately using requestAnimationFrame
      requestAnimationFrame(() => {
        if (darkMode) {
          document.documentElement.classList.add("dark")
        } else {
          document.documentElement.classList.remove("dark")
        }
      })
    } else {
      // Ensure dark class is removed if no preference
      requestAnimationFrame(() => {
        document.documentElement.classList.remove("dark")
      })
    }
    
    setMounted(true)
  }, [])

  // Update localStorage and HTML attributes when language changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("language", language)
      document.documentElement.lang = language
    }
  }, [language, mounted])

  // Apply dark mode to DOM immediately when it changes
  useEffect(() => {
    console.log("🎨 Dark mode effect triggered! isDark:", isDark)
    if (typeof window !== "undefined") {
      localStorage.setItem("isDark", isDark.toString())
      console.log("💾 Saved to localStorage:", isDark.toString())
      
      // Apply dark class immediately
      if (isDark) {
        document.documentElement.classList.add("dark")
        console.log("✅ Added 'dark' class to <html>")
      } else {
        document.documentElement.classList.remove("dark")
        console.log("❌ Removed 'dark' class from <html>")
      }
      
      // Verify it was applied
      console.log("🔍 Verification - HTML classes:", document.documentElement.className)
      console.log("🔍 Has dark class?", document.documentElement.classList.contains("dark"))
    }
  }, [isDark])

  const setLanguage = (lang: Language) => setLanguageState(lang)
  const setIsDark = (dark: boolean) => {
    console.log("🔄 setIsDark called with:", dark)
    setIsDarkState(dark)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isDark, setIsDark }}>{children}</LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider")
  }
  return context
}
