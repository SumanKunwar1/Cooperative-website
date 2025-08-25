"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Edit2, Trash2, Save, X, Upload, User } from "lucide-react"
import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"

interface TeamMember {
  id: string
  name: string
  position: string
  image: string
  bio: string
  email?: string
  phone?: string
  joinDate?: string
}

const AdminTeam: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: "1",
      name: "Mr. Prakash Shrestha",
      position: "Chairman",
      image: "/professional-cooperative-committee-member-portrait.png",
      bio: "Leading the cooperative with vision and dedication to serve our member community.",
      email: "chairman@constellation.coop",
      phone: "+977-1-4123456",
      joinDate: "2081 Bhadra 30",
    },
    {
      id: "2",
      name: "Mr. Tek Bahadur Tamang",
      position: "Vice Chairman",
      image: "/professional-cooperative-committee-member-portrait.png",
      bio: "Supporting strategic initiatives and ensuring cooperative principles are maintained.",
      email: "vicechairman@constellation.coop",
      phone: "+977-1-4123457",
      joinDate: "2081 Bhadra 30",
    },
    {
      id: "3",
      name: "Mr. Manab K. C.",
      position: "Secretary",
      image: "/professional-cooperative-committee-member-portrait.png",
      bio: "Managing administrative functions and member communications effectively.",
      email: "secretary@constellation.coop",
      phone: "+977-1-4123458",
      joinDate: "2081 Bhadra 30",
    },
    {
      id: "4",
      name: "Mrs. Gyanu Lamichhane Giri",
      position: "Treasurer",
      image: "/professional-cooperative-committee-member-portrait.png",
      bio: "Overseeing financial operations and ensuring transparent financial management.",
      email: "treasurer@constellation.coop",
      phone: "+977-1-4123459",
      joinDate: "2081 Bhadra 30",
    },
    {
      id: "5",
      name: "Mr. Rose Bahadur Shrestha",
      position: "Member",
      image: "/professional-cooperative-committee-member-portrait.png",
      bio: "Contributing to cooperative decisions and member welfare initiatives.",
      email: "member1@constellation.coop",
      phone: "+977-1-4123460",
      joinDate: "2081 Bhadra 30",
    },
    {
      id: "6",
      name: "Mrs. Laxmi Shrestha",
      position: "Member",
      image: "/professional-cooperative-committee-member-portrait.png",
      bio: "Dedicated to serving member interests and community development.",
      email: "member2@constellation.coop",
      phone: "+977-1-4123461",
      joinDate: "2081 Bhadra 30",
    },
    {
      id: "7",
      name: "Mr. Saroj Prasad Raya",
      position: "Member",
      image: "/professional-cooperative-committee-member-portrait.png",
      bio: "Committed to cooperative growth and member satisfaction.",
      email: "member3@constellation.coop",
      phone: "+977-1-4123462",
      joinDate: "2081 Bhadra 30",
    },
  ])

  const [editingMember, setEditingMember] = useState<TeamMember | null>(null)
  const [isAddingMember, setIsAddingMember] = useState(false)
  const [newMember, setNewMember] = useState<Partial<TeamMember>>({
    name: "",
    position: "",
    image: "",
    bio: "",
    email: "",
    phone: "",
    joinDate: "",
  })

  const handleImageUpload = (file: File, memberId?: string) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string
      if (memberId) {
        // Update existing member
        setTeamMembers((prev) =>
          prev.map((member) => (member.id === memberId ? { ...member, image: imageUrl } : member)),
        )
        if (editingMember && editingMember.id === memberId) {
          setEditingMember((prev) => (prev ? { ...prev, image: imageUrl } : null))
        }
      } else {
        // Update new member
        setNewMember((prev) => ({ ...prev, image: imageUrl }))
      }
    }
    reader.readAsDataURL(file)
  }

  const handleSaveMember = () => {
    if (editingMember) {
      setTeamMembers((prev) => prev.map((member) => (member.id === editingMember.id ? editingMember : member)))
      setEditingMember(null)
    }
  }

  const handleAddMember = () => {
    if (newMember.name && newMember.position) {
      const member: TeamMember = {
        id: Date.now().toString(),
        name: newMember.name || "",
        position: newMember.position || "",
        image: newMember.image || "/professional-cooperative-committee-member-portrait.png",
        bio: newMember.bio || "",
        email: newMember.email || "",
        phone: newMember.phone || "",
        joinDate: newMember.joinDate || "",
      }
      setTeamMembers((prev) => [...prev, member])
      setNewMember({
        name: "",
        position: "",
        image: "",
        bio: "",
        email: "",
        phone: "",
        joinDate: "",
      })
      setIsAddingMember(false)
    }
  }

  const handleDeleteMember = (id: string) => {
    if (window.confirm("Are you sure you want to delete this team member?")) {
      setTeamMembers((prev) => prev.filter((member) => member.id !== id))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Team Management</h1>
            <p className="text-gray-600 mt-2">Manage Working Committee members and their information</p>
          </div>
          <Button onClick={() => setIsAddingMember(true)} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Member
          </Button>
        </div>

        {/* Add New Member Form */}
        {isAddingMember && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Add New Team Member</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={newMember.name || ""}
                    onChange={(e) => setNewMember((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter member name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                  <input
                    type="text"
                    value={newMember.position || ""}
                    onChange={(e) => setNewMember((prev) => ({ ...prev, position: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter position"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={newMember.email || ""}
                    onChange={(e) => setNewMember((prev) => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="text"
                    value={newMember.phone || ""}
                    onChange={(e) => setNewMember((prev) => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Join Date</label>
                  <input
                    type="text"
                    value={newMember.joinDate || ""}
                    onChange={(e) => setNewMember((prev) => ({ ...prev, joinDate: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter join date"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image</label>
                  <div className="flex items-center gap-4">
                    {newMember.image && (
                      <img
                        src={newMember.image || "/placeholder.svg"}
                        alt="Preview"
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    )}
                    <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200">
                      <Upload className="w-4 h-4" />
                      Upload Image
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) handleImageUpload(file)
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                  <textarea
                    value={newMember.bio || ""}
                    onChange={(e) => setNewMember((prev) => ({ ...prev, bio: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter member bio"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsAddingMember(false)
                    setNewMember({
                      name: "",
                      position: "",
                      image: "",
                      bio: "",
                      email: "",
                      phone: "",
                      joinDate: "",
                    })
                  }}
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button onClick={handleAddMember}>
                  <Save className="w-4 h-4 mr-2" />
                  Add Member
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative"
            >
              <Card className="p-6 hover:shadow-lg transition-all duration-300">
                {editingMember?.id === member.id ? (
                  // Edit Mode
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={editingMember.image || "/placeholder.svg"}
                        alt={editingMember.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <label className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200 text-sm">
                        <Upload className="w-3 h-3" />
                        Change
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) handleImageUpload(file, member.id)
                          }}
                          className="hidden"
                        />
                      </label>
                    </div>
                    <input
                      type="text"
                      value={editingMember.name}
                      onChange={(e) => setEditingMember((prev) => (prev ? { ...prev, name: e.target.value } : null))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      value={editingMember.position}
                      onChange={(e) =>
                        setEditingMember((prev) => (prev ? { ...prev, position: e.target.value } : null))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="email"
                      value={editingMember.email || ""}
                      onChange={(e) => setEditingMember((prev) => (prev ? { ...prev, email: e.target.value } : null))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Email"
                    />
                    <input
                      type="text"
                      value={editingMember.phone || ""}
                      onChange={(e) => setEditingMember((prev) => (prev ? { ...prev, phone: e.target.value } : null))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Phone"
                    />
                    <textarea
                      value={editingMember.bio}
                      onChange={(e) => setEditingMember((prev) => (prev ? { ...prev, bio: e.target.value } : null))}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => setEditingMember(null)}>
                        <X className="w-3 h-3" />
                      </Button>
                      <Button size="sm" onClick={handleSaveMember}>
                        <Save className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-xl overflow-hidden">
                      <img
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                    <p className="text-blue-600 font-medium mb-2 text-sm">{member.position}</p>
                    {member.email && <p className="text-gray-600 text-xs mb-1">{member.email}</p>}
                    {member.phone && <p className="text-gray-600 text-xs mb-2">{member.phone}</p>}
                    <p className="text-gray-600 text-xs leading-relaxed mb-4">{member.bio}</p>
                    {member.joinDate && <p className="text-gray-500 text-xs mb-4">Joined: {member.joinDate}</p>}
                    <div className="flex justify-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => setEditingMember(member)}>
                        <Edit2 className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteMember(member.id)}
                        className="text-red-600 hover:text-red-700 hover:border-red-300"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Statistics */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="text-center p-6">
            <User className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{teamMembers.length}</div>
            <div className="text-sm text-gray-600">Total Members</div>
          </Card>
          <Card className="text-center p-6">
            <div className="text-2xl font-bold text-gray-900">
              {
                teamMembers.filter(
                  (m) =>
                    m.position === "Chairman" ||
                    m.position === "Vice Chairman" ||
                    m.position === "Secretary" ||
                    m.position === "Treasurer",
                ).length
              }
            </div>
            <div className="text-sm text-gray-600">Executive Positions</div>
          </Card>
          <Card className="text-center p-6">
            <div className="text-2xl font-bold text-gray-900">
              {teamMembers.filter((m) => m.position === "Member").length}
            </div>
            <div className="text-sm text-gray-600">General Members</div>
          </Card>
          <Card className="text-center p-6">
            <div className="text-2xl font-bold text-gray-900">2081-2086</div>
            <div className="text-sm text-gray-600">Current Term</div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default AdminTeam
