"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import ActionCard from "@/components/action-card"
import Toast from "@/components/toast"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/lib/language-context"
import { Phone, Mail } from "lucide-react"
import { translations } from "@/lib/translations"

export default function Page() {
  const router = useRouter()
  const { language } = useLanguage()
  const t = translations[language]

  useEffect(() => {
    router.push("/splash")
  }, [router])

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

  const handleCopyBankInfo = (account: string, holder: string) => {
    navigator.clipboard.writeText(account)
    showToast(`✓ ${holder}`, "success")
  }

  const handleShowBankDetails = (bankName: string, holder: string, account: string) => {
    showToast(`${bankName}: ${holder}`, "info")
  }

  return (
    <>
      <LanguageSwitcher />
      <ActionCard icon={<Phone />} title={t.callTitle} description={t.callDescription} onClick={handlePhoneCall} />
      <ActionCard icon={<Mail />} title={t.emailTitle} description={t.emailDescription} onClick={handleEmailWrite} />
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          duration={5000}
          onClose={() => setToast(null)}
        />
      )}
    </>
  )
}
