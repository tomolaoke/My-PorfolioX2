"use client"

import { parse } from 'html-parse-string'
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface TypingAnimationProps {
  words: string[]
  typingSpeed?: number
  deletingSpeed?: number
  delayBetweenWords?: number
}

interface ParsedNode {
  type: string
  content?: string
  name?: string
  attributes?: {
    class?: string
  }
  children?: ParsedNode[]
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
    const timeout = setTimeout(() => {
      try {
        const currentWord = words[currentWordIndex]

        if (isDeleting) {
          setCurrentText(currentWord.substring(0, currentText.length - 1))
        } else {
          setCurrentText(currentWord.substring(0, currentText.length + 1))
        }

        if (!isDeleting && currentText === currentWord) {
          setTimeout(() => setIsDeleting(true), delayBetweenWords)
        } else if (isDeleting && currentText === "") {
          setIsDeleting(false)
          setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length)
        }
      } catch (error) {
        console.error('Error in typing animation:', error)
      }
    }, isDeleting ? deletingSpeed : typingSpeed)

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, delayBetweenWords])

  const renderHTML = (html: string) => {
    try {
      const parsed = parse(html) as ParsedNode[]
      return parsed.map((node, index) => {
        if (node.type === 'text') return node.content
        if (node.type === 'tag' && node.name === 'span') {
          const className = node.attributes?.class || ''
          const content = node.children?.[0]?.content || ''
          return (
            <span 
              key={`${index}-${content}`} 
              className={className}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )
        }
        return null
      })
    } catch (error) {
      console.error('Error parsing HTML:', error)
      return html
    }
  }

  return (
    <motion.span 
      className="inline-block font-bold" 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
    >
      {renderHTML(currentText)}
      <motion.span
        className="inline-block w-[2px] h-[1em] bg-primary ml-1 align-middle"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8 }}
      />
    </motion.span>
  )
}