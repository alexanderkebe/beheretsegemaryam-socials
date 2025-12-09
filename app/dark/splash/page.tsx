"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"
import { preloadImages, getAllImageUrls } from "@/lib/image-preloader"

export default function DarkSplashPage() {
  const router = useRouter()
  const { language } = useLanguage()
  const t = translations[language]
  const [isVisible, setIsVisible] = useState(true)
  const [imagesLoaded, setImagesLoaded] = useState(false)

  // Apply dark mode class on mount
  useEffect(() => {
    document.documentElement.classList.add("dark")
    return () => {
      document.documentElement.classList.remove("dark")
    }
  }, [])

  // Preload all images before showing splash screen
  useEffect(() => {
    const loadImages = async () => {
      try {
        await preloadImages(getAllImageUrls())
        setImagesLoaded(true)
      } catch (error) {
        // Even if preloading fails, show the splash screen
        setImagesLoaded(true)
      }
    }

    loadImages()
  }, [])

  useEffect(() => {
    // Only start the timer after images are loaded
    if (!imagesLoaded) return

    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => router.push("/dark/contact"), 300)
    }, 3000)

    return () => clearTimeout(timer)
  }, [router, imagesLoaded])

  // Show loading screen while images are loading
  if (!imagesLoaded) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <div className="w-3 h-3 bg-blue-300 rounded-full animate-pulse" />
            <div
              className="w-3 h-3 bg-purple-300 rounded-full animate-pulse"
              style={{ animationDelay: "150ms" }}
            />
            <div
              className="w-3 h-3 bg-pink-300 rounded-full animate-pulse"
              style={{ animationDelay: "300ms" }}
            />
          </div>
          <p className="text-sm text-gray-400 font-sans">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4 transition-opacity duration-300 opacity-100">
      {/* Main content */}
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Glass container - same styling as Contact Page header */}
        <div className="relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-white/5 dark:bg-white/5 backdrop-blur-xl border border-white/10 dark:border-white/10" />

          {/* Content */}
          <div className="relative z-10 py-12 sm:py-16 px-6 sm:px-8 space-y-8">
            {/* Centerpiece Icon - Good Shepherd */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <img 
                  src="/images/good sheperd.png" 
                  alt="Good Shepherd" 
                  className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain drop-shadow-2xl"
                />
              </div>
            </div>

            {/* Title - using Montserrat font, matching Contact Page header */}
            <div className="space-y-2">
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent font-sans">
                {t.joinCause} — #FeedTheHungry
              </h1>
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center gap-3">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-500 dark:via-blue-500 to-transparent" />
              <div className="w-1.5 h-1.5 bg-blue-300 dark:bg-blue-300 rounded-full" />
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-500 dark:via-purple-500 to-transparent" />
            </div>

            {/* Scripture quote - Montserrat font */}
            <blockquote className="space-y-4">
              <p className="text-xl sm:text-2xl text-gray-100 dark:text-gray-100 leading-relaxed font-sans font-light">
                "{t.scripture}"
              </p>
              <footer className="text-base sm:text-lg text-gray-300 dark:text-gray-300 font-sans font-medium">
                {t.bibleReference}
              </footer>
            </blockquote>

            {/* Footer text */}
            <div className="pt-4 border-t border-white/10 dark:border-white/10">
              <p className="text-sm sm:text-base text-gray-400 dark:text-gray-400 font-sans italic">Serve with love.</p>
            </div>
          </div>
        </div>

        {/* Subtle loading indicator - matching Contact Page aesthetic */}
        <div className="mt-8 flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-blue-300 dark:bg-blue-300 rounded-full animate-pulse" />
          <p className="text-sm text-gray-400 dark:text-gray-400 font-sans">{t.redirecting}</p>
          <div
            className="w-2 h-2 bg-purple-300 dark:bg-purple-300 rounded-full animate-pulse"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </div>
    </div>
  )
}

