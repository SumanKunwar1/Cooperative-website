"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, Calendar } from "lucide-react"
import { teamAPI, type TeamMember } from "../../lib/teamApi"

const Team: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTeamMembers()
  }, [])

  const fetchTeamMembers = async () => {
    try {
      setLoading(true)
      const members = await teamAPI.getPublicTeamMembers()
      // Sort by creation date to show first uploaded first
      const sortedMembers = [...members].sort((a, b) => {
        // Use createdAt field if available, otherwise use id or fallback to array position
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0
        return dateA - dateB // Ascending order (oldest first)
      })
      setTeamMembers(sortedMembers)
    } catch (error) {
      console.error("Error fetching team members:", error)
      // If there's an error, just set the members as-is without sorting
      const members = await teamAPI.getPublicTeamMembers()
      setTeamMembers(members)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading team members...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-foreground mb-6 text-balance">Meet Our Team</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Working Committee (2081 Bhadra 30 to 2086 Bhadra 29) - Dedicated professionals serving our cooperative
            community
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member._id || member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="bg-card rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-border">
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={member.image || "/placeholder.svg?height=320&width=300&query=professional headshot"}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-card-foreground mb-2 text-balance">{member.name}</h3>
                  <p className="text-secondary font-semibold mb-4 text-sm uppercase tracking-wide">{member.position}</p>

                  <div className="space-y-2 mb-4">
                    {member.email && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="w-4 h-4" />
                        <span>{member.email}</span>
                      </div>
                    )}
                    {member.phone && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="w-4 h-4" />
                        <span>{member.phone}</span>
                      </div>
                    )}
                    {member.joinDate && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>Joined {member.joinDate}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed text-pretty">{member.bio}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Executive Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 mt-20"
        >
          <h2 className="text-4xl font-bold text-foreground mb-6 text-balance">Executive Team</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -8 }}
            className="group"
          >
            <div className="bg-card rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-border">
              <div className="relative h-80 overflow-hidden">
                <img
                  src="https://res.cloudinary.com/dcsgax3ld/image/upload/v1757064395/WhatsApp_Image_2025-08-29_at_17.59.03_0133a582_mn8mtr.jpg"
                  alt="Laxman Aryal"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-card-foreground mb-2 text-balance">Mr. Laxman Aryal</h3>
                <p className="text-secondary font-semibold mb-4 text-sm uppercase tracking-wide">General Manager</p>

                <p className="text-muted-foreground text-sm leading-relaxed text-pretty">
                  Oversees daily operations, manages resources efficiently, and ensures smooth implementation of policies and programs to achieve organizational goals.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -8 }}
            className="group"
          >
            <div className="bg-card rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-border">
              <div className="relative h-80 overflow-hidden">
                <img
                  src="https://res.cloudinary.com/dcsgax3ld/image/upload/v1757064396/WhatsApp_Image_2025-09-05_at_14.59.15_1f2c75af_d7ko2b.jpg"
                  alt="Kamala G.C."
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-card-foreground mb-2 text-balance">Ms. Kamala G.C.</h3>
                <p className="text-secondary font-semibold mb-4 text-sm uppercase tracking-wide">Cashier</p>

                <p className="text-muted-foreground text-sm leading-relaxed text-pretty">
                  Handles financial transactions with accuracy and integrity, maintaining transparent records that strengthen trust and accountability.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            whileHover={{ y: -8 }}
            className="group"
          >
            <div className="bg-card rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-border">
              <div className="relative h-80 overflow-hidden">
                <img
                  src="https://res.cloudinary.com/dcsgax3ld/image/upload/v1757064396/WhatsApp_Image_2025-09-05_at_13.30.56_5197a053_e24gmq.jpg"
                  alt="Sushmita Tamang"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-card-foreground mb-2 text-balance">Ms. Sushmita Tamang</h3>
                <p className="text-secondary font-semibold mb-4 text-sm uppercase tracking-wide">Marketing Representative</p>

                <p className="text-muted-foreground text-sm leading-relaxed text-pretty">
                  Promotes the cooperative's services through effective outreach and communication, fostering strong relationships with members and the community.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            whileHover={{ y: -8 }}
            className="group"
          >
            <div className="bg-card rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-border">
              <div className="relative h-80 overflow-hidden">
                <img
                  src="https://res.cloudinary.com/dcsgax3ld/image/upload/v1757064429/WhatsApp_Image_2025-09-04_at_21.10.52_fc654d87_pd9ved.jpg"
                  alt="Rikesh Khadka"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-card-foreground mb-2 text-balance">Mr. Rikesh Khadka</h3>
                <p className="text-secondary font-semibold mb-4 text-sm uppercase tracking-wide">Marketer</p>

                <p className="text-muted-foreground text-sm leading-relaxed text-pretty">
                  Develops and executes marketing strategies to enhance visibility, support growth, and drive member engagement across all platforms.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Audit Committee Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 mt-20"
        >
          <h2 className="text-4xl font-bold text-foreground mb-6 text-balance">Audit Committee</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -8 }}
            className="group"
          >
            <div className="bg-card rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-border">
              <div className="relative h-80 overflow-hidden">
                <img
                  src="https://res.cloudinary.com/dcsgax3ld/image/upload/v1756973395/WhatsApp_Image_2025-09-04_at_09.20.50_a984039a_nws1od.jpg"
                  alt="Purushottam Parajuli"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-card-foreground mb-2 text-balance">Purushottam Parajuli</h3>
                <p className="text-secondary font-semibold mb-4 text-sm uppercase tracking-wide">Convener</p>

                <p className="text-muted-foreground text-sm leading-relaxed text-pretty">
                  Oversees audit activities, ensures financial transparency, and supports the cooperative's accountability.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Accounting supervision comitee Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 mt-20"
        >
          <h2 className="text-4xl font-bold text-foreground mb-6 text-balance">Accounting Supervision Committee</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -8 }}
            className="group"
          >
            <div className="bg-card rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-border">
              <div className="relative h-80 overflow-hidden">
                <img
                  src="https://res.cloudinary.com/dcsgax3ld/image/upload/v1757064865/WhatsApp_Image_2025-09-05_at_15.08.32_10ed0ea3_swwnxb.jpg"
                  alt="Sunita Bhattarai"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-card-foreground mb-2 text-balance">Mrs. Sunita Bhattarai</h3>
                <p className="text-secondary font-semibold mb-4 text-sm uppercase tracking-wide">Member</p>

                <p className="text-muted-foreground text-sm leading-relaxed text-pretty">
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Credit Sub-Committee Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 mt-20"
        >
          <h2 className="text-4xl font-bold text-foreground mb-6 text-balance">Credit Sub-Committee</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -8 }}
            className="group"
          >
            <div className="bg-card rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-border">
              <div className="relative h-80 overflow-hidden">
                <img
                  src="https://res.cloudinary.com/dcsgax3ld/image/upload/v1756973384/WhatsApp_Image_2025-08-29_at_19.46.26_abb82577_c9mjtn.jpg"
                  alt="Krishna Bahadur Tamang"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-card-foreground mb-2 text-balance">Krishna Bahadur Tamang</h3>
                <p className="text-secondary font-semibold mb-4 text-sm uppercase tracking-wide">Member</p>

                <p className="text-muted-foreground text-sm leading-relaxed text-pretty">
                  Assists in loan evaluation, promotes fair lending, and supports members' financial needs.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Team