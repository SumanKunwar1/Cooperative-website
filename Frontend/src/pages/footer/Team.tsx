"use client"

import type React from "react"
import { motion } from "framer-motion"
import Card from "../../components/ui/Card"

const Team: React.FC = () => {
  const leadership = [
    {
      name: "Mr. Prakash Shrestha",
      position: "Chairman",
      image: "/professional-cooperative-committee-member-portrait.png",
      bio: "Leading the cooperative with vision and dedication to serve our member community.",
    },
    {
      name: "Mr. Tek Bahadur Tamang",
      position: "Vice Chairman",
      image: "/professional-cooperative-committee-member-portrait.png",
      bio: "Supporting strategic initiatives and ensuring cooperative principles are maintained.",
    },
    {
      name: "Mr. Manab K. C.",
      position: "Secretary",
      image: "/professional-cooperative-committee-member-portrait.png",
      bio: "Managing administrative functions and member communications effectively.",
    },
    {
      name: "Mrs. Gyanu Lamichhane Giri",
      position: "Treasurer",
      image: "/professional-cooperative-committee-member-portrait.png",
      bio: "Overseeing financial operations and ensuring transparent financial management.",
    },
    {
      name: "Mr. Rose Bahadur Shrestha",
      position: "Member",
      image: "/professional-cooperative-committee-member-portrait.png",
      bio: "Contributing to cooperative decisions and member welfare initiatives.",
    },
    {
      name: "Mrs. Laxmi Shrestha",
      position: "Member",
      image: "/professional-cooperative-committee-member-portrait.png",
      bio: "Dedicated to serving member interests and community development.",
    },
    {
      name: "Mr. Saroj Prasad Raya",
      position: "Member",
      image: "/professional-cooperative-committee-member-portrait.png",
      bio: "Committed to cooperative growth and member satisfaction.",
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Working Committee (2081 Bhadra 30 to 2086 Bhadra 29)
          </h3>
          <p className="text-xl text-gray-600">Dedicated professionals serving our cooperative community</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {leadership.map((leader, index) => (
            <motion.div
              key={leader.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="text-center hover:shadow-xl transition-all duration-300">
                <div className="w-32 h-32 mx-auto mb-4 rounded-2xl overflow-hidden">
                  <img
                    src={leader.image || "/placeholder.svg"}
                    alt={leader.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-lg font-semibold mb-1">{leader.name}</h4>
                <p className="text-blue-600 font-medium mb-3 text-sm">{leader.position}</p>
                <p className="text-gray-600 text-xs leading-relaxed">{leader.bio}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Team
