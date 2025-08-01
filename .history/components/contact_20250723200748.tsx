"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Github, Linkedin, Twitter, Send } from "lucide-react"
import Link from "next/link"
import { useRef, useState } from "react"
import emailjs from "@emailjs/browser"
import { toast } from "sonner"
import { motion, useInView } from "framer-motion"

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null)
  const isInView = useInView(formRef, { once: false, amount: 0.3 })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formRef.current) return
    
    setIsSubmitting(true)
    
    try {
      const result = await emailjs.sendForm(
        "service_fa53xbd",
        "template_vkmosvq",
        formRef.current,
        "6dqLCUEr6ku1A6DEP"
      )

      console.log(result)
      toast.success("Message sent successfully!")
      formRef.current.reset()
    } catch (error) {
      toast.error("Failed to send message. Please try again.")
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  function SubmitButton() {
    return (
      <Button type="submit" className="w-full group" disabled={isSubmitting}>
        <span className="mr-2">{isSubmitting ? "SENDING..." : "CONNECT WITH ME"}</span>
        <motion.span
          animate={{ x: isSubmitting ? [0, 5, 0] : 0 }}
          transition={{ repeat: isSubmitting ? Number.POSITIVE_INFINITY : 0, duration: 1 }}
        >
          <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </motion.span>
      </Button>
    )
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="contact" className="py-16 md:py-24 bg-muted/30 relative overflow-hidden">
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5" />
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/10 dark:bg-primary/5"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 50 - 25],
              y: [0, Math.random() * 50 - 25],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold inline-block">
            Connect <span className="text-primary">With Me</span>
          </h2>
          <motion.div
            className="h-1 w-20 bg-primary mx-auto mt-4"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          />
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-12 items-center max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div className="space-y-6" variants={containerVariants}>
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold mb-4">
                Let's <span className="text-primary">craft</span> Something unique!
              </h3>
              <p className="text-muted-foreground mb-8">
                I strive to challenge creative boundaries to design captivating, intuitive, and unforgettable
                interactive experiences.
              </p>
            </motion.div>

            <motion.div className="space-y-4" variants={containerVariants}>
              <motion.div variants={itemVariants}>
                <h4 className="text-xl font-bold">Email</h4>
                <p className="text-muted-foreground">tommola.oke@gmail.com</p>
                <p className="text-muted-foreground">tomola.oke@verdac.tech</p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h4 className="text-xl font-bold">Socials</h4>
                <div className="flex items-center space-x-4 mt-2">
                  {[
                    {
                      href: "https://www.linkedin.com/in/tomolaoke",
                      icon: <Linkedin className="w-5 h-5" />,
                      label: "LinkedIn",
                    },
                    { href: "https://www.github.com/tomolaoke", icon: <Github className="w-5 h-5" />, label: "GitHub" },
                    { href: "https://www.twitter.com/eda__xx", icon: <Twitter className="w-5 h-5" />, label: "Twitter" },
                  ].map((social) => (
                    <motion.div key={social.label} whileHover={{ scale: 1.1, y: -3 }} whileTap={{ scale: 0.95 }}>
                      <Link
                        href={social.href}
                        target="_blank"
                        className="p-2 rounded-lg border hover:border-primary hover:text-primary transition-all duration-300"
                        rel="noreferrer"
                      >
                        {social.icon}
                        <span className="sr-only">{social.label}</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-4 p-6 bg-background/80 backdrop-blur-sm rounded-xl shadow-lg border border-border/50"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <Input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className="bg-transparent border-border/50 focus:border-primary transition-colors duration-300"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="bg-transparent border-border/50 focus:border-primary transition-colors duration-300"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <Textarea
                name="message"
                placeholder="How can I help?"
                required
                className="min-h-[120px] bg-transparent border-border/50 focus:border-primary transition-colors duration-300"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <SubmitButton />
            </motion.div>
          </motion.form>
        </motion.div>
      </div>
    </section>
  )
}
