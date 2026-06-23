"use client"

import { useState, useEffect } from "react"
import ActionCardDark from "@/components/action-card-dark"
import ToastDark from "@/components/toast-dark"
import { LanguageSwitcherDark } from "@/components/language-switcher-dark"
import { useLanguage } from "@/lib/language-context"
import { Phone, Mail } from "lucide-react"
import { translations } from "@/lib/translations"

export default function DarkContactPage() {
  const { language } = useLanguage()
  const t = translations[language]

  // Apply dark mode class on mount
  useEffect(() => {
    document.documentElement.classList.add("dark")
    return () => {
      document.documentElement.classList.remove("dark")
    }
  }, [])

  const [toast, setToast] = useState<{ message: string; type: "success" | "info" } | null>(null)

  const showToast = (message: string, type: "success" | "info" = "success") => {
    setToast({ message, type })
    // Toast component handles its own timing
  }

  const handlePhoneCall = () => {
    window.location.href = "tel:+251959172939"
    showToast("Initiating call...", "info")
  }

  const handlePhoneSMS = () => {
    const phoneNumber = "+251959172939"
    // Remove any spaces or special characters except +
    const cleanNumber = phoneNumber.replace(/[^\d+]/g, "")
    
    // Try opening SMS app - use the most compatible format
    try {
      // First try: Standard SMS link (works on most mobile devices)
      const smsLink = `sms:${cleanNumber}`
      window.location.href = smsLink
      
      // Show toast immediately
      showToast("Opening SMS...", "info")
    } catch (error) {
      // Fallback: Try alternative format
      try {
        window.location.href = `sms://${cleanNumber}`
        showToast("Opening SMS...", "info")
      } catch (e) {
        // Last resort: Copy number and show message
        navigator.clipboard.writeText(cleanNumber)
        showToast("Phone number copied! Open your messaging app.", "info")
      }
    }
  }

  const handleEmailWrite = () => {
    window.location.href = "mailto:beheretsegemariam@gmail.com"
    showToast("Opening email...", "info")
  }

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("beheretsegemariam@gmail.com")
    showToast("Email copied!", "success")
  }

  const handleSocialLink = (url: string) => {
    window.open(url, "_blank")
    showToast("Opening link...", "info")
  }

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    showToast(`${label} copied!`, "success")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-4 sm:p-8">
      {/* Language Switcher */}
      <LanguageSwitcherDark />

      <div className="max-w-2xl mx-auto mb-8 sm:mb-12">
        <div className="relative rounded-2xl overflow-hidden mb-8">
          {/* Glass background */}
          <div className="absolute inset-0 bg-white/5 dark:bg-white/5 backdrop-blur-xl border border-white/10 dark:border-white/10" />

          {/* Header content */}
          <div className="relative z-10 text-center py-8 sm:py-10 px-4">
            {/* Profile Picture */}
            <div className="flex justify-center mb-4">
              <img
                src="/images/profile-picture.png"
                alt="Behere Tsege Mariam"
                className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover rounded-full ring-4 ring-white/20 shadow-2xl"
              />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-2 animate-slide-in-right">
              {t.joinCause}
            </h1>
            <p className="text-lg sm:text-xl font-semibold text-gray-400 dark:text-gray-400">{t.feedTheHungry}</p>
          </div>
        </div>

        {/* Quote */}
        <div className="relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-white/5 dark:bg-white/5 backdrop-blur-xl border border-white/10 dark:border-white/10" />
          <blockquote className="relative z-10 px-6 py-6 sm:px-8 sm:py-8 text-center">
            <p className="text-base sm:text-lg leading-relaxed font-semibold text-gray-100 dark:text-gray-100">
              "{t.scripture}"
            </p>
            <footer className="mt-4 text-sm font-medium text-gray-400 dark:text-gray-400">{t.bibleReference}</footer>
          </blockquote>
        </div>
      </div>

      <div className="max-w-2xl mx-auto space-y-6 sm:space-y-8">
        {/* Contact Section */}
        <section className="space-y-3 sm:space-y-4">
          <h2 className="text-lg font-bold text-gray-100 dark:text-gray-100 px-4">{t.contact}</h2>

          <ActionCardDark
            icon={<Phone className="w-6 h-6 text-green-400" />}
            title={t.phone}
            subtitle="+251 959 172 939"
            primaryLabel={t.call}
            secondaryLabel={t.text}
            primaryGlow="bg-gradient-to-r from-green-400 to-emerald-500"
            secondaryGlow="bg-gradient-to-r from-green-300 to-emerald-400"
            onPrimary={handlePhoneCall}
            onSecondary={handlePhoneSMS}
          />

          <ActionCardDark
            icon={<Mail className="w-6 h-6 text-blue-400" />}
            title={t.email}
            subtitle="beheretsegemariam@gmail.com"
            primaryLabel={t.write}
            secondaryLabel={t.copy}
            primaryGlow="bg-gradient-to-r from-blue-400 to-blue-500"
            secondaryGlow="bg-gradient-to-r from-cyan-400 to-blue-400"
            onPrimary={handleEmailWrite}
            onSecondary={handleCopyEmail}
          />
        </section>

        {/* Social Media Section */}
        <section className="space-y-3 sm:space-y-4">
          <h2 className="text-lg font-bold text-gray-100 dark:text-gray-100 px-4">{t.followUs}</h2>

          {/* Telegram Channel */}
          <ActionCardDark
            icon={<img src="/images/telegram-20-284-29.png" alt={t.telegram} className="w-6 h-6" />}
            title={`${t.telegram} ${t.channel}`}
            subtitle="@Behere_tsege_mariam"
            primaryLabel={t.open}
            secondaryLabel={t.copyLink}
            primaryGlow="bg-gradient-to-r from-cyan-400 to-blue-500"
            secondaryGlow="bg-gradient-to-r from-cyan-300 to-cyan-500"
            onPrimary={() => handleSocialLink("https://t.me/Behere_tsege_mariam")}
            onSecondary={() => handleCopyText("https://t.me/Behere_tsege_mariam", t.linkCopied)}
          />

          {/* Telegram Account */}
          <ActionCardDark
            icon={<img src="/images/telegram-20-284-29.png" alt={t.telegram} className="w-6 h-6" />}
            title={`${t.telegram} ${t.account}`}
            subtitle="@Beheretsegemariam"
            primaryLabel={t.open}
            secondaryLabel={t.copyLink}
            primaryGlow="bg-gradient-to-r from-cyan-400 to-blue-500"
            secondaryGlow="bg-gradient-to-r from-cyan-300 to-cyan-500"
            onPrimary={() => handleSocialLink("https://t.me/Beheretsegemariam")}
            onSecondary={() => handleCopyText("https://t.me/Beheretsegemariam", t.linkCopied)}
          />

          {/* Telegram Group */}
          <ActionCardDark
            icon={<img src="/images/telegram-20-284-29.png" alt={t.telegram} className="w-6 h-6" />}
            title={`${t.telegram} ${t.group}`}
            subtitle={t.inviteLink}
            primaryLabel={t.join}
            secondaryLabel={t.copyLink}
            primaryGlow="bg-gradient-to-r from-cyan-400 to-blue-500"
            secondaryGlow="bg-gradient-to-r from-cyan-300 to-cyan-500"
            onPrimary={() => handleSocialLink("https://t.me/+fmrtZ3AUgMAyN2Q0")}
            onSecondary={() => handleCopyText("https://t.me/+fmrtZ3AUgMAyN2Q0", t.linkCopied)}
          />

          {/* TikTok */}
          <ActionCardDark
            icon={<img src="/images/tik-tok-20-281-29.png" alt={t.tiktok} className="w-6 h-6" />}
            title={t.tiktok}
            subtitle="@beheretsegemariam"
            primaryLabel={t.open}
            secondaryLabel={t.copyLink}
            primaryGlow="bg-gradient-to-r from-gray-200 to-white dark:from-gray-200 dark:to-white"
            secondaryGlow="bg-gradient-to-r from-gray-300 to-gray-200"
            onPrimary={() => handleSocialLink("https://www.tiktok.com/@beheretsegemariam")}
            onSecondary={() => handleCopyText("https://www.tiktok.com/@beheretsegemariam", t.linkCopied)}
          />

          {/* Instagram */}
          <ActionCardDark
            icon={<img src="/images/instagram-20-284-29.png" alt={t.instagram} className="w-6 h-6" />}
            title={t.instagram}
            subtitle="@behere_tsege_mariam_official"
            primaryLabel={t.open}
            secondaryLabel={t.copyLink}
            primaryGlow="bg-gradient-to-r from-pink-400 via-purple-500 to-orange-400"
            secondaryGlow="bg-gradient-to-r from-pink-300 to-orange-300"
            onPrimary={() => handleSocialLink("https://www.instagram.com/behere_tsege_mariam_official/?hl=en")}
            onSecondary={() => handleCopyText("https://www.instagram.com/behere_tsege_mariam_official/", t.linkCopied)}
          />

          {/* YouTube */}
          <ActionCardDark
            icon={<img src="/images/youtube.png" alt={t.youtube} className="w-6 h-6" />}
            title={`${t.youtube} ${t.channel}`}
            subtitle="Behere Tsege Mariam"
            primaryLabel={t.open}
            secondaryLabel={t.copyLink}
            primaryGlow="bg-gradient-to-r from-red-400 to-red-600"
            secondaryGlow="bg-gradient-to-r from-red-300 to-red-500"
            onPrimary={() => handleSocialLink("https://www.youtube.com/@%E1%89%A5%E1%88%94%E1%88%A8%E1%8C%BD%E1%8C%8C%E1%88%9B%E1%88%AD%E1%8B%AB%E1%88%9D")}
            onSecondary={() => handleCopyText("https://www.youtube.com/@%E1%89%A5%E1%88%94%E1%88%A8%E1%8C%BD%E1%8C%8C%E1%88%9B%E1%88%AD%E1%8B%AB%E1%88%9D", t.linkCopied)}
          />

          {/* Facebook Page */}
          <ActionCardDark
            icon={<img src="/images/facebook.png" alt={t.facebook} className="w-6 h-6" />}
            title={`${t.facebook} ${t.page}`}
            subtitle="Behere Tsege Mariam"
            primaryLabel={t.open}
            secondaryLabel={t.copyLink}
            primaryGlow="bg-gradient-to-r from-blue-600 to-blue-700"
            secondaryGlow="bg-gradient-to-r from-blue-500 to-blue-600"
            onPrimary={() => handleSocialLink("https://www.facebook.com/share/193s3WT2Fz/")}
            onSecondary={() => handleCopyText("https://www.facebook.com/share/193s3WT2Fz/", t.linkCopied)}
          />

          {/* LinkedIn Profile */}
          <ActionCardDark
            icon={<img src="/images/linkedin-20-281-29.png" alt={t.linkedin} className="w-6 h-6" />}
            title={`${t.linkedin} ${t.profile}`}
            subtitle="Behere Tsege Mariam"
            primaryLabel={t.open}
            secondaryLabel={t.copyLink}
            primaryGlow="bg-gradient-to-r from-blue-500 to-blue-700"
            secondaryGlow="bg-gradient-to-r from-blue-400 to-blue-600"
            onPrimary={() => handleSocialLink("https://www.linkedin.com/in/%E1%89%A5%E1%88%94%E1%88%A8-%E1%8C%BD%E1%8C%8C-%E1%88%9B%E1%88%AD%E1%8B%AB%E1%88%9D-28b418419/?skipRedirect=true")}
            onSecondary={() => handleCopyText("https://www.linkedin.com/in/%E1%89%A5%E1%88%94%E1%88%A8-%E1%8C%BD%E1%8C%8C-%E1%88%9B%E1%88%AD%E1%8B%AB%E1%88%9D-28b418419/", t.linkCopied)}
          />

          {/* LinkedIn Page (Church) */}
          <ActionCardDark
            icon={<img src="/images/linkedin-20-281-29.png" alt={t.linkedin} className="w-6 h-6" />}
            title={`${t.linkedin} ${t.page}`}
            subtitle="Behere Tsege Mariam Church"
            primaryLabel={t.open}
            secondaryLabel={t.copyLink}
            primaryGlow="bg-gradient-to-r from-blue-500 to-blue-700"
            secondaryGlow="bg-gradient-to-r from-blue-400 to-blue-600"
            onPrimary={() => handleSocialLink("https://www.linkedin.com/company/behere-tsege-mariam-church")}
            onSecondary={() => handleCopyText("https://www.linkedin.com/company/behere-tsege-mariam-church", t.linkCopied)}
          />
        </section>
      </div>

      {/* Toast Notification */}
      {toast && (
        <ToastDark 
          message={toast.message} 
          type={toast.type} 
          duration={5000}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  )
}

