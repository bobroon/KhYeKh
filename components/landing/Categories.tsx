"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

const categories = [
  { name: "Смартфони", image: "/assets/1.jpg", href: "/catalog" },
  { name: "Ноутбуки", image: "/assets/2.jpg", href: "/catalog" },
  { name: "Аксесуари", image: "/assets/3.jpg", href: "/catalog" },
]

export default function Categories() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <motion.section
      ref={sectionRef}
      className="w-full py-24 bg-zinc-100"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-heading1-bold text-zinc-900 mb-4">Досліджуйте нашу техніку</h2>
          <div className="w-24 h-1 bg-sky-500 mx-auto mb-6" />
          <p className="text-body-semibold text-zinc-600 max-w-2xl mx-auto">
            Відкрийте для себе наш ретельно відібраний асортимент сучасних пристроїв та аксесуарів
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative group"
            >
              <Link href={category.href} className="block">
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-zinc-900 bg-opacity-40 transition-opacity duration-300 group-hover:bg-opacity-60" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                    <h3 className="text-heading3-bold text-white text-center mb-4 transform transition-transform duration-300 group-hover:translate-y-[-10px]">
                      {category.name}
                    </h3>
                    <motion.span
                      className="text-small-semibold uppercase tracking-wider text-white border border-sky-400 bg-sky-500/20 px-4 py-2 rounded"
                      initial={{ opacity: 0, y: 20 }}
                      animate={hoveredIndex === index ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      Купити зараз
                    </motion.span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <Link
            href="/catalog"
            className="inline-block text-base-semibold text-zinc-900 hover:text-sky-600 transition-colors duration-300 relative group"
          >
            <span className="relative z-10">Переглянути всі продукти</span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-sky-500 transform origin-left transition-all duration-300 group-hover:scale-x-100 scale-x-0"></span>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  )
}
