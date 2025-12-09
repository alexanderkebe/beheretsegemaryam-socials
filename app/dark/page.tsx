"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function DarkPage() {
  const router = useRouter()

  useEffect(() => {
    router.push("/dark/splash")
  }, [router])

  return null
}

