import { Button } from '@/components/ui/button'
import { useState, useRef, useCallback } from 'react'

interface SpeechButtonProps {
  text: string
  className?: string
}

function SpeechButton({ text, className = '' }: SpeechButtonProps) {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  const speak = useCallback(() => {
    if (!('speechSynthesis' in window)) {
      alert('Your browser does not support speech synthesis.')
      return
    }

    // If already speaking, stop
    if (isSpeaking) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
      return
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'zh-CN'
    utterance.rate = 0.8 // Slightly slower for learning
    utterance.pitch = 1
    utterance.volume = 1

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    utteranceRef.current = utterance
    window.speechSynthesis.speak(utterance)
  }, [text, isSpeaking])

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={speak}
      className={`ml-2 ${className}`}
      title="Play pronunciation"
    >
      {isSpeaking ? '🔊 Stop' : '🔊 Play'}
    </Button>
  )
}

export default SpeechButton
