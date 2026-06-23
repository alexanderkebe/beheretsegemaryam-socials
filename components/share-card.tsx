"use client"

import {
  Share2,
  Copy,
  Download,
  Send,
  MessageCircle,
  Facebook,
  Linkedin,
  Mail,
  MessageSquare,
  Twitter,
  Gift,
  QrCode,
} from "lucide-react"
import type { translations } from "@/lib/translations"

const SHARE_URL = "https://beheretsegemaryam-socials.vercel.app/contact"
const QR_SRC = "/images/contact-qr.png"

type T = (typeof translations)["en"]

interface ShareCardProps {
  t: T
  onToast: (message: string, type?: "success" | "info") => void
}

export default function ShareCard({ t, onToast }: ShareCardProps) {
  const message = t.shareMessage
  const shareText = `${message}\n${SHARE_URL}`
  const encText = encodeURIComponent(shareText)
  const encMsg = encodeURIComponent(message)
  const encUrl = encodeURIComponent(SHARE_URL)

  const openWin = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer")
    onToast(t.openingLink, "info")
  }

  const copyLink = () => {
    navigator.clipboard.writeText(SHARE_URL)
    onToast(t.linkCopied, "success")
  }

  const downloadQr = () => {
    const a = document.createElement("a")
    a.href = QR_SRC
    a.download = "beheretsegemariam-qr.png"
    document.body.appendChild(a)
    a.click()
    a.remove()
    onToast(t.qrDownloaded, "success")
  }

  // Native share sheet — shares the link AND the QR image in a single tap,
  // exposing every share target the device has. Falls back to copying the link.
  const nativeShare = async () => {
    const nav = navigator as Navigator & { canShare?: (data: unknown) => boolean }
    try {
      let files: File[] | undefined
      try {
        const res = await fetch(QR_SRC)
        const blob = await res.blob()
        const file = new File([blob], "beheretsegemariam-qr.png", { type: blob.type || "image/png" })
        if (nav.canShare && nav.canShare({ files: [file] })) files = [file]
      } catch {
        // QR fetch failed — share the link/text only
      }

      if (nav.share) {
        await nav.share({ title: t.joinCause, text: shareText, url: SHARE_URL, ...(files ? { files } : {}) } as ShareData)
        onToast(t.shared, "success")
        return
      }
    } catch {
      // user dismissed the share sheet — nothing to do
      return
    }
    // No Web Share API (desktop browsers): copy the link so they can paste it
    copyLink()
  }

  const targets: { label: string; Icon: typeof Send; color: string; onClick: () => void }[] = [
    {
      label: t.telegram,
      Icon: Send,
      color: "text-sky-500",
      onClick: () => openWin(`https://t.me/share/url?url=${encUrl}&text=${encMsg}`),
    },
    {
      label: t.whatsapp,
      Icon: MessageCircle,
      color: "text-green-500",
      onClick: () => openWin(`https://wa.me/?text=${encText}`),
    },
    {
      label: t.facebook,
      Icon: Facebook,
      color: "text-blue-600",
      onClick: () => openWin(`https://www.facebook.com/sharer/sharer.php?u=${encUrl}`),
    },
    {
      label: t.x,
      Icon: Twitter,
      color: "text-gray-900 dark:text-gray-100",
      onClick: () => openWin(`https://twitter.com/intent/tweet?text=${encText}`),
    },
    {
      label: t.linkedin,
      Icon: Linkedin,
      color: "text-blue-700",
      onClick: () => openWin(`https://www.linkedin.com/sharing/share-offsite/?url=${encUrl}`),
    },
    {
      label: t.email,
      Icon: Mail,
      color: "text-rose-500",
      onClick: () => openWin(`mailto:?subject=${encodeURIComponent(t.joinCause)}&body=${encText}`),
    },
    {
      label: t.sms,
      Icon: MessageSquare,
      color: "text-emerald-500",
      onClick: () => openWin(`sms:?&body=${encText}`),
    },
    { label: t.copyLink, Icon: Copy, color: "text-purple-500", onClick: copyLink },
    { label: t.downloadQr, Icon: Download, color: "text-orange-500", onClick: downloadQr },
  ]

  return (
    <div className="relative rounded-2xl overflow-hidden">
      {/* Festive gradient glass background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-400/30 via-pink-400/20 to-purple-500/30 dark:from-amber-500/20 dark:via-pink-500/10 dark:to-purple-600/20 backdrop-blur-xl border border-white/30 dark:border-white/10" />

      <div className="relative z-10 p-5 sm:p-6">
        {/* Promo header */}
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 to-pink-500 flex items-center justify-center shadow-lg">
            <Gift className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-base sm:text-lg bg-gradient-to-r from-amber-600 via-pink-600 to-purple-600 dark:from-amber-300 dark:via-pink-300 dark:to-purple-300 bg-clip-text text-transparent">
              {t.shareWinTitle}
            </h3>
            <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 mt-0.5">{t.shareWinSubtitle}</p>
          </div>
        </div>

        {/* QR code + scan hint */}
        <div className="flex items-center gap-4 mt-5">
          <img
            src={QR_SRC}
            alt={t.scanToOpen}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-white p-1.5 shadow-md flex-shrink-0"
          />
          <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
            <QrCode className="w-4 h-4" />
            {t.scanToOpen}
          </div>
        </div>

        {/* Primary native-share button */}
        <button
          onClick={nativeShare}
          className="mt-5 w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-pink-500 to-purple-600 text-white font-semibold shadow-lg active:scale-95 transition-transform"
        >
          <Share2 className="w-5 h-5" />
          {t.shareNow}
        </button>

        {/* Explicit share targets */}
        <div className="grid grid-cols-3 gap-2 mt-3">
          {targets.map(({ label, Icon, color, onClick }) => (
            <button
              key={label}
              onClick={onClick}
              className="flex flex-col items-center gap-1 py-2.5 px-1 rounded-xl bg-white/30 hover:bg-white/50 dark:bg-white/5 dark:hover:bg-white/10 border border-white/30 dark:border-white/10 transition-colors active:scale-95"
            >
              <Icon className={`w-5 h-5 ${color}`} />
              <span className="text-[10px] sm:text-xs font-medium text-gray-800 dark:text-gray-200 truncate w-full text-center">
                {label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
