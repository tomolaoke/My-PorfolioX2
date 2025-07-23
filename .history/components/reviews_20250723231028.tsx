"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import Image from "next/image"

const reviews = [
  {
    name: "Uthman Midestic",
    role: "Fullstack Software Engineer",
    image: "/bolu_icon/Ellipse 2664.png",
    content:
      "Learning and Working with Tommy as colleague and on an hackathon project was a great experience. His technical expertise and attention to detail is unique",
  },
  {
    name: "Patience Okorie",
    role: "Project Manager",
    image: "/bolu_icon/Ellipse 2664.png",
    content:
      "Exceptional developer who brings both technical skill and creative thinking to every project. A pleasure to work with.",
  },
  {
    name: "Sodiq",
    role: "Fullstack Software Developer",
    image: "/bolu_icon/Ellipse 2664.png",
    content:
      "Tommy's backend development skills is great but him Google and AI including AI agents in IDE, it's . He consistently delivers high-quality, well-documented code.",
  },
]

export function Reviews() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Client <span className="text-primary">Reviews</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <Image src={review.image || "/placeholder.svg"} alt={review.name} fill className="object-cover" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{review.name}</h3>
                      <p className="text-sm text-muted-foreground">{review.role}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground flex-grow">{review.content}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
