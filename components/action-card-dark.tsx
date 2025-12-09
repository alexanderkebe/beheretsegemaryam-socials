"use client"

import type { ReactNode } from "react"

interface ActionCardProps {
  icon: ReactNode
  title: string
  subtitle?: string
  primaryLabel: string
  secondaryLabel: string
  primaryGlow: string
  secondaryGlow?: string
  onPrimary: () => void
  onSecondary: () => void
}

export default function ActionCardDark({
  icon,
  title,
  subtitle,
  primaryLabel,
  secondaryLabel,
  primaryGlow,
  secondaryGlow,
  onPrimary,
  onSecondary,
}: ActionCardProps) {
  return (
    <div className="group relative rounded-2xl overflow-hidden">
      {/* Glass background with backdrop blur */}
      <div className="absolute inset-0 bg-white/5 dark:bg-white/5 backdrop-blur-xl border border-white/10 dark:border-white/10 rounded-2xl" />

      {/* Primary glow on hover */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl rounded-2xl ${primaryGlow}`}
      />

      {/* Card content */}
      <div className="relative z-10 p-4 sm:p-5">
        {/* Icon and text */}
        <div className="flex items-start gap-3 mb-4">
          <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center">{icon}</div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-100 dark:text-gray-100 text-sm sm:text-base truncate">{title}</h3>
            {subtitle && <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-400 truncate">{subtitle}</p>}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          {/* Primary button */}
          <button
            onClick={onPrimary}
            className={`flex-1 relative group/btn py-2 px-3 rounded-lg bg-white/10 dark:bg-white/10 hover:bg-white/15 dark:hover:bg-white/15 backdrop-blur-sm border border-white/20 dark:border-white/20 transition-all duration-200 text-xs sm:text-sm font-medium text-gray-100 dark:text-gray-100 overflow-hidden`}
          >
            {/* Button glow effect */}
            <div
              className={`absolute inset-0 opacity-0 group-hover/btn:opacity-100 blur-lg transition-opacity duration-200 ${primaryGlow} rounded-lg`}
              style={{ zIndex: -1 }}
            />
            <span className="relative">{primaryLabel}</span>
          </button>

          {/* Secondary button */}
          <button
            onClick={onSecondary}
            className={`flex-1 relative group/btn py-2 px-3 rounded-lg bg-white/5 dark:bg-white/5 hover:bg-white/10 dark:hover:bg-white/10 backdrop-blur-sm border border-white/10 dark:border-white/10 transition-all duration-200 text-xs sm:text-sm font-medium text-gray-300 dark:text-gray-300 overflow-hidden`}
          >
            {/* Secondary glow */}
            {secondaryGlow && (
              <div
                className={`absolute inset-0 opacity-0 group-hover/btn:opacity-75 blur-lg transition-opacity duration-200 ${secondaryGlow} rounded-lg`}
                style={{ zIndex: -1 }}
              />
            )}
            <span className="relative">{secondaryLabel}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

