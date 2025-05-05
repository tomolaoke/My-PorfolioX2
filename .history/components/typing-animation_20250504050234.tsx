"use client"

import { parse } from 'html-parse-string'  // Add this import
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface TypingAnimationProps {
  words: string[]
  typingSpeed?: number
  deletingSpeed?: number
  delayBetweenWords?: number
}

export function TypingAnimation({
  words,
  typingSpeed = 150,
  deletingSpeed = 100,
  delayBetweenWords = 1500,
}: TypingAnimationProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        // Current word being processed
        const currentWord = words[currentWordIndex]

        // If deleting
        if (isDeleting) {
          setCurrentText(currentWord.substring(0, currentText.length - 1))
        } else {
          // If typing
          setCurrentText(currentWord.substring(0, currentText.length + 1))
        }

        // Transition to deleting state
        if (!isDeleting && currentText === currentWord) {
          setTimeout(() => setIsDeleting(true), delayBetweenWords)
        }
        // Move to next word
        else if (isDeleting && currentText === "") {
          setIsDeleting(false)
          setCurrentWordIndex((currentWordIndex + 1) % words.length)
        }
      },
      isDeleting ? deletingSpeed : typingSpeed,
    )

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, delayBetweenWords])

  // Function to render HTML content safely
  const renderHTML = (html: string) => {
    const parsed = parse(html)
    return parsed.map((node: any, index: number) => {
      if (node.type === 'text') return node.content
      if (node.type === 'tag' && node.name === 'span') {
        // Check if attributes and class exist before using them
        const className = node.attributes?.class || ''
        const content = node.children?.[0]?.content || ''
        return (
          <span key={index} className={className}>
            {content}
          </span>
        )
      }
      return null
    })
  }

  return (
    <motion.span className="inline-block" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {renderHTML(currentText)}
      <motion.span
        className="inline-block w-[2px] h-[1em] bg-primary ml-1 align-middle"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8 }}
      />
    </motion.span>
  )
}
