"use client"

import { useState } from "react"
import ActionCard from "@/components/action-card"
import Toast from "@/components/toast"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/lib/language-context"
import { Phone, Mail } from "lucide-react"
import { translations } from "@/lib/translations"

export default function ContactPage() {
  const { language } = useLanguage()
  const t = translations[language]

  const [toast, setToast] = useState<{ message: string; type: "success" | "info" } | null>(null)

  const showToast = (message: string, type: "success" | "info" = "success") => {
    setToast({ message, type })
    // Toast component handles its own timing, so we don't need to clear it here
  }

  const handlePhoneCall = () => {
    window.location.href = "tel:+251971829292"
    showToast("Initiating call...", "info")
  }

  const handlePhoneSMS = () => {
    const phoneNumber = "+251971829292"
    // Remove any spaces or special characters except +
    const cleanNumber = phoneNumber.replace(/[^\d+]/g, "")
    
    // Try opening SMS app - use the most compatible format
    // Some devices need sms://, others need sms:, and some need the number without +
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
    window.location.href = "mailto:contact@feedthehungry.com"
    showToast("Opening email...", "info")
  }

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("contact@feedthehungry.com")
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

  const handleCopyBankInfo = (account: string, holder: string) => {
    navigator.clipboard.writeText(account)
    showToast(`✓ ${holder}`, "success")
  }

  const handleShowBankDetails = (bankName: string, holder: string, account: string) => {
    showToast(`${bankName}: ${holder}`, "info")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-4 sm:p-8">
      {/* Language/Dark Mode Switcher */}
      <LanguageSwitcher />

      <div className="max-w-2xl mx-auto mb-8 sm:mb-12">
        <div className="relative rounded-2xl overflow-hidden mb-8">
          {/* Glass background */}
          <div className="absolute inset-0 bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10" />

          {/* Header content */}
          <div className="relative z-10 text-center py-8 sm:py-10 px-4">
            {/* Good Shepherd Icon */}
            <div className="flex justify-center mb-4">
              <img 
                src="/images/good sheperd.png" 
                alt="Good Shepherd" 
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-contain drop-shadow-2xl"
              />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-2 animate-slide-in-right">
              {t.joinCause}
            </h1>
            <p className="text-lg sm:text-xl font-semibold text-gray-600 dark:text-gray-400">{t.feedTheHungry}</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto space-y-6 sm:space-y-8">
        {/* Contact Section */}
        <section className="space-y-3 sm:space-y-4">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 px-4">{t.contact}</h2>

          <ActionCard
            icon={<Phone className="w-6 h-6 text-green-500" />}
            title={t.phone}
            subtitle="+251 971 829 292"
            primaryLabel={t.call}
            secondaryLabel={t.text}
            primaryGlow="bg-gradient-to-r from-green-400 to-emerald-500"
            secondaryGlow="bg-gradient-to-r from-green-300 to-emerald-400"
            onPrimary={handlePhoneCall}
            onSecondary={handlePhoneSMS}
          />

          <ActionCard
            icon={<Mail className="w-6 h-6 text-blue-500" />}
            title={t.email}
            subtitle="contact@feedthehungry.com"
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
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 px-4">{t.followUs}</h2>

          <ActionCard
            icon={<img src="/images/telegram-20-284-29.png" alt={t.telegram} className="w-6 h-6" />}
            title={t.telegram}
            subtitle="Feed the Hungry"
            primaryLabel={t.openProfile}
            secondaryLabel={t.copyName}
            primaryGlow="bg-gradient-to-r from-cyan-400 to-blue-500"
            secondaryGlow="bg-gradient-to-r from-cyan-300 to-cyan-500"
            onPrimary={() => handleSocialLink("https://t.me/feedthehungry")}
            onSecondary={() => handleCopyText("feedthehungry", t.telegramCopied)}
          />

          <ActionCard
            icon={<img src="/images/tik-tok-20-281-29.png" alt={t.tiktok} className="w-6 h-6" />}
            title={t.tiktok}
            subtitle="Feed the Hungry"
            primaryLabel={t.openProfile}
            secondaryLabel={t.copyName}
            primaryGlow="bg-gradient-to-r from-gray-800 to-white dark:from-gray-200 dark:to-white"
            secondaryGlow="bg-gradient-to-r from-gray-600 to-gray-300"
            onPrimary={() => handleSocialLink("https://www.tiktok.com/@feedthehungry")}
            onSecondary={() => handleCopyText("feedthehungry", t.tiktokCopied)}
          />

          <ActionCard
            icon={<img src="/images/instagram-20-284-29.png" alt={t.instagram} className="w-6 h-6" />}
            title={t.instagram}
            subtitle="Feed the Hungry"
            primaryLabel={t.openProfile}
            secondaryLabel={t.copyName}
            primaryGlow="bg-gradient-to-r from-pink-400 via-purple-500 to-orange-400"
            secondaryGlow="bg-gradient-to-r from-pink-300 to-orange-300"
            onPrimary={() => handleSocialLink("https://www.instagram.com/feedthehungry")}
            onSecondary={() => handleCopyText("feedthehungry", t.instagramCopied)}
          />

          <ActionCard
            icon={<img src="/images/youtube.png" alt={t.youtube} className="w-6 h-6" />}
            title={t.youtube}
            subtitle="Feed the Hungry"
            primaryLabel={t.openProfile}
            secondaryLabel={t.copyName}
            primaryGlow="bg-gradient-to-r from-red-400 to-red-600"
            secondaryGlow="bg-gradient-to-r from-red-300 to-red-500"
            onPrimary={() => handleSocialLink("https://www.youtube.com/@feedthehungry")}
            onSecondary={() => handleCopyText("feedthehungry", t.youtubeCopied)}
          />

          <ActionCard
            icon={<img src="/images/facebook.png" alt={t.facebook} className="w-6 h-6" />}
            title={t.facebook}
            subtitle="Feed the Hungry"
            primaryLabel={t.openProfile}
            secondaryLabel={t.copyName}
            primaryGlow="bg-gradient-to-r from-blue-600 to-blue-700"
            secondaryGlow="bg-gradient-to-r from-blue-500 to-blue-600"
            onPrimary={() => handleSocialLink("https://www.facebook.com/feedthehungry")}
            onSecondary={() => handleCopyText("feedthehungry", t.facebookCopied)}
          />

          <ActionCard
            icon={<img src="/images/linkedin-20-281-29.png" alt={t.linkedin} className="w-6 h-6" />}
            title={t.linkedin}
            subtitle="Feed the Hungry"
            primaryLabel={t.openProfile}
            secondaryLabel={t.copyName}
            primaryGlow="bg-gradient-to-r from-blue-500 to-blue-700"
            secondaryGlow="bg-gradient-to-r from-blue-400 to-blue-600"
            onPrimary={() => handleSocialLink("https://www.linkedin.com/company/feedthehungry")}
            onSecondary={() => handleCopyText("feedthehungry", t.linkedinCopied)}
          />
        </section>

        {/* Banking Section */}
        <section className="space-y-3 sm:space-y-4">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 px-4">{t.supportUs}</h2>

          <ActionCard
            icon={<img src="/images/cbe.png" alt={t.cbe} className="w-6 h-6" />}
            title={t.cbe}
            subtitle="1000734002399"
            primaryLabel={t.copyAccount}
            secondaryLabel={t.viewDetails}
            primaryGlow="bg-gradient-to-r from-purple-400 to-purple-600"
            secondaryGlow="bg-gradient-to-r from-purple-300 to-purple-500"
            onPrimary={() => handleCopyBankInfo("1000734002399", "CBE")}
            onSecondary={() => handleShowBankDetails(t.cbe, "Kebede and Edlawit and Alazar", "1000734002399")}
          />

          <ActionCard
            icon={<img src="/images/bank-20of-20abysiniya.png" alt={t.bankOfAbyssinia} className="w-6 h-6" />}
            title={t.bankOfAbyssinia}
            subtitle="245940483"
            primaryLabel={t.copyAccount}
            secondaryLabel={t.viewDetails}
            primaryGlow="bg-gradient-to-r from-yellow-300 to-yellow-500"
            secondaryGlow="bg-gradient-to-r from-yellow-200 to-yellow-400"
            onPrimary={() => handleCopyBankInfo("245940483", "Abyssinia")}
            onSecondary={() =>
              handleShowBankDetails(
                t.bankOfAbyssinia,
                "Kebede Haile and Alazar Kebede and Edelawit Asheber",
                "245940483",
              )
            }
          />

          <ActionCard
            icon={<img src="/images/awash-international-bank.png" alt={t.awash} className="w-6 h-6" />}
            title={t.awash}
            subtitle="013200104439400"
            primaryLabel={t.copyAccount}
            secondaryLabel={t.viewDetails}
            primaryGlow="bg-gradient-to-r from-orange-400 to-orange-600"
            secondaryGlow="bg-gradient-to-r from-orange-300 to-amber-500"
            onPrimary={() => handleCopyBankInfo("013200104439400", "Awash")}
            onSecondary={() =>
              handleShowBankDetails(t.awash, "Edelawit Asheber and Alazar Kebede and Kebede Haile", "013200104439400")
            }
          />

          <ActionCard
            icon={<img src="/images/telebir.png" alt={t.telebirr} className="w-6 h-6" />}
            title={t.telebirr}
            subtitle="0971829292"
            primaryLabel={t.copyAccount}
            secondaryLabel={t.viewDetails}
            primaryGlow="bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500"
            secondaryGlow="bg-gradient-to-r from-green-300 to-emerald-400"
            onPrimary={() => handleCopyBankInfo("0971829292", "Telebirr")}
            onSecondary={() => handleShowBankDetails(t.telebirr, "0971829292", "0971829292")}
          />
        </section>
      </div>

      {/* Toast Notification */}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          duration={5000}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  )
}
