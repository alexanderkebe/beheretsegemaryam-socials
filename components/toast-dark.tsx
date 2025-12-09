"use client"

import { useEffect, useState } from "react"
import { Check, Info, X } from "lucide-react"

interface ToastProps {
  message: string
  type?: "success" | "info"
  duration?: number
  onClose?: () => void
}

export default function ToastDark({ message, type = "success", duration = 5000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true)
      setTimeout(() => {
        setIsVisible(false)
        onClose?.()
      }, 300) // Animation duration
    }, duration)
    return () => clearTimeout(timer)
  }, [duration, onClose])

  const handleClose = () => {
    setIsExiting(true)
    setTimeout(() => {
      setIsVisible(false)
      onClose?.()
    }, 300)
  }

  if (!isVisible) return null

  return (
    <div className={`fixed top-4 sm:top-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm sm:max-w-md px-4 sm:px-0 transition-all duration-300 ${
      isExiting ? "opacity-0 translate-y-[-20px]" : "opacity-100 translate-y-0"
    }`}>
      <div className={`flex items-center gap-3 sm:gap-4 bg-slate-800 dark:bg-slate-800 rounded-2xl sm:rounded-full px-4 sm:px-8 py-3 sm:py-4 shadow-2xl border border-slate-700 dark:border-slate-700 backdrop-blur-sm ${
        type === "success" 
          ? "bg-gradient-to-r from-green-900/30 to-emerald-900/30 dark:from-green-900/20 dark:to-emerald-900/20 border-green-700 dark:border-green-800" 
          : "bg-gradient-to-r from-blue-900/30 to-cyan-900/30 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-700 dark:border-blue-800"
      }`}>
        <div className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${
          type === "success" 
            ? "bg-green-900/40 dark:bg-green-900/30" 
            : "bg-blue-900/40 dark:bg-blue-900/30"
        }`}>
          {type === "success" ? (
            <Check className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 dark:text-green-400" />
          ) : (
            <Info className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 dark:text-blue-400" />
          )}
        </div>
        <span className="flex-1 text-sm sm:text-base font-medium text-gray-100 dark:text-gray-100 pr-2">
          {message}
        </span>
        <button
          onClick={handleClose}
          className="flex-shrink-0 p-1 rounded-full hover:bg-slate-700 dark:hover:bg-slate-600 transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4 text-gray-400 dark:text-gray-300" />
        </button>
      </div>
    </div>
  )
}

