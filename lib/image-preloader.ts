/**
 * Preloads an array of image URLs
 * Returns a promise that resolves when all images are loaded
 */
export function preloadImages(imageUrls: string[]): Promise<void> {
  const promises = imageUrls.map((url) => {
    return new Promise<void>((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve()
      img.onerror = () => resolve() // Resolve even on error to not block the app
      img.src = url
    })
  })

  return Promise.all(promises).then(() => {})
}

/**
 * Get all image URLs used in the application
 */
export function getAllImageUrls(): string[] {
  return [
    "/images/good sheperd.png",
    "/images/telegram-20-284-29.png",
    "/images/tik-tok-20-281-29.png",
    "/images/instagram-20-284-29.png",
    "/images/youtube.png",
    "/images/facebook.png",
    "/images/linkedin-20-281-29.png",
    "/images/cbe.png",
    "/images/bank-20of-20abysiniya.png",
    "/images/awash-international-bank.png",
    "/images/telebir.png",
  ]
}

