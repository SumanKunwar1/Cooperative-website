"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Plus, Edit2, Trash2, Save, X, Upload, User, Users, Crown, Calendar } from "lucide-react"
import Button from "../../components/ui/Button"
import { teamAPI, type TeamMember, type TeamStatistics } from "../../lib/teamApi"

const AdminTeam: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [statistics, setStatistics] = useState<TeamStatistics>({
    totalMembers: 0,
    executivePositions: 0,
    generalMembers: 0,
  })
  const [loading, setLoading] = useState(true)
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
  const [imageFiles, setImageFiles] = useState<{ [key: string]: File }>({})

  useEffect(() => {
    fetchTeamMembers()
    fetchStatistics()
  }, [])

  const fetchTeamMembers = async () => {
    try {
      setLoading(true)
      const members = await teamAPI.getAdminTeamMembers()
      setTeamMembers(
        members.map((member) => ({
          ...member,
          id: member._id || member.id || "",
        })),
      )
    } catch (error) {
      console.error("Error fetching team members:", error)
      alert("Error fetching team members. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const fetchStatistics = async () => {
    try {
      const stats = await teamAPI.getTeamStatistics()
      setStatistics(stats)
    } catch (error) {
      console.error("Error fetching statistics:", error)
    }
  }

  const handleImageUpload = (file: File, memberId?: string) => {
    if (memberId) {
      setImageFiles((prev) => ({ ...prev, [memberId]: file }))
      // Create preview URL for display
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string
        if (editingMember && editingMember.id === memberId) {
          setEditingMember((prev) => (prev ? { ...prev, image: imageUrl } : null))
        }
      }
      reader.readAsDataURL(file)
    } else {
      setImageFiles((prev) => ({ ...prev, new: file }))
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string
        setNewMember((prev) => ({ ...prev, image: imageUrl }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveMember = async () => {
    if (editingMember) {
      try {
        const imageFile = imageFiles[editingMember.id || ""]
        const updatedMember = await teamAPI.updateTeamMember(
          editingMember._id || editingMember.id || "",
          editingMember,
          imageFile,
        )

        setTeamMembers((prev) =>
          prev.map((member) =>
            (member._id || member.id) === (updatedMember._id || updatedMember.id)
              ? { ...updatedMember, id: updatedMember._id || updatedMember.id }
              : member,
          ),
        )
        setEditingMember(null)
        setImageFiles((prev) => {
          const newFiles = { ...prev }
          delete newFiles[editingMember.id || ""]
          return newFiles
        })
        await fetchStatistics()
        alert("Team member updated successfully!")
      } catch (error) {
        console.error("Error updating team member:", error)
        alert("Error updating team member. Please try again.")
      }
    }
  }

  const handleAddMember = async () => {
    if (newMember.name && newMember.position && newMember.bio) {
      try {
        const imageFile = imageFiles.new
        const createdMember = await teamAPI.createTeamMember(
          {
            name: newMember.name,
            position: newMember.position,
            bio: newMember.bio,
            email: newMember.email || "",
            phone: newMember.phone || "",
            joinDate: newMember.joinDate || "",
            image: "",
          },
          imageFile,
        )

        setTeamMembers((prev) => [...prev, { ...createdMember, id: createdMember._id || createdMember.id }])
        setNewMember({
          name: "",
          position: "",
          image: "",
          bio: "",
          email: "",
          phone: "",
          joinDate: "",
        })
        setImageFiles((prev) => {
          const newFiles = { ...prev }
          delete newFiles.new
          return newFiles
        })
        setIsAddingMember(false)
        await fetchStatistics()
        alert("Team member added successfully!")
      } catch (error) {
        console.error("Error adding team member:", error)
        alert("Error adding team member. Please try again.")
      }
    } else {
      alert("Please fill in all required fields (Name, Position, Bio)")
    }
  }

  const handleDeleteMember = async (id: string, memberId: string) => {
    if (window.confirm("Are you sure you want to delete this team member?")) {
      try {
        await teamAPI.deleteTeamMember(memberId)
        setTeamMembers((prev) => prev.filter((member) => member.id !== id))
        await fetchStatistics()
        alert("Team member deleted successfully!")
      } catch (error) {
        console.error("Error deleting team member:", error)
        alert("Error deleting team member. Please try again.")
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading team members...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Team Management</h1>
            <p className="text-muted-foreground text-lg">Manage Working Committee members and their information</p>
          </div>
          <Button
            onClick={() => setIsAddingMember(true)}
            className="flex items-center gap-2 bg-secondary hover:bg-secondary/90"
          >
            <Plus className="w-5 h-5" />
            Add Member
          </Button>
        </div>

        {/* Add New Member Form */}
        {isAddingMember && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <div className="bg-card rounded-xl shadow-lg border border-border p-8">
              <h2 className="text-2xl font-bold text-card-foreground mb-6">Add New Team Member</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-card-foreground mb-3">Name *</label>
                  <input
                    type="text"
                    value={newMember.name || ""}
                    onChange={(e) => setNewMember((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
                    placeholder="Enter member name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-card-foreground mb-3">Position *</label>
                  <select
                    value={newMember.position || ""}
                    onChange={(e) => setNewMember((prev) => ({ ...prev, position: e.target.value }))}
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
                    required
                  >
                    <option value="">Select position</option>
                    <option value="Chairman">Chairman</option>
                    <option value="Vice Chairman">Vice Chairman</option>
                    <option value="Secretary">Secretary</option>
                    <option value="Treasurer">Treasurer</option>
                    <option value="Member">Member</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-card-foreground mb-3">Email</label>
                  <input
                    type="email"
                    value={newMember.email || ""}
                    onChange={(e) => setNewMember((prev) => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-card-foreground mb-3">Phone</label>
                  <input
                    type="text"
                    value={newMember.phone || ""}
                    onChange={(e) => setNewMember((prev) => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-card-foreground mb-3">Join Date</label>
                  <input
                    type="text"
                    value={newMember.joinDate || ""}
                    onChange={(e) => setNewMember((prev) => ({ ...prev, joinDate: e.target.value }))}
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
                    placeholder="Enter join date"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-card-foreground mb-3">Profile Image</label>
                  <div className="flex items-center gap-4">
                    {newMember.image && (
                      <img
                        src={newMember.image || "/placeholder.svg"}
                        alt="Preview"
                        className="w-24 h-24 rounded-lg object-cover border-2 border-border"
                      />
                    )}
                    <label className="flex items-center gap-2 px-4 py-3 bg-muted hover:bg-muted/80 rounded-lg cursor-pointer transition-colors">
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
                  <label className="block text-sm font-semibold text-card-foreground mb-3">Bio *</label>
                  <textarea
                    value={newMember.bio || ""}
                    onChange={(e) => setNewMember((prev) => ({ ...prev, bio: e.target.value }))}
                    rows={4}
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors resize-none"
                    placeholder="Enter member bio"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end gap-4 mt-8">
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
                  className="px-6 py-3"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button onClick={handleAddMember} className="px-6 py-3 bg-secondary hover:bg-secondary/90">
                  <Save className="w-4 h-4 mr-2" />
                  Add Member
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative group"
            >
              <div className="bg-card rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-border overflow-hidden">
                {editingMember?.id === member.id ? (
                  // Edit Mode
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={editingMember!.image || "/placeholder.svg"}
                        alt={editingMember!.name}
                        className="w-24 h-24 rounded-lg object-cover border-2 border-border"
                      />
                      <label className="flex items-center gap-2 px-3 py-2 bg-muted hover:bg-muted/80 rounded-lg cursor-pointer transition-colors text-sm">
                        <Upload className="w-4 h-4" />
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
                    {editingMember && (
                      <>
                        <input
                          type="text"
                          value={editingMember!.name || ""}
                          onChange={(e) =>
                            setEditingMember((prev) => (prev ? { ...prev, name: e.target.value } : prev))
                          }
                          className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
                        />
                        <select
                          value={editingMember!.position || ""}
                          onChange={(e) =>
                            setEditingMember((prev) => (prev ? { ...prev, position: e.target.value } : prev))
                          }
                          className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
                        >
                          <option value="Chairman">Chairman</option>
                          <option value="Vice Chairman">Vice Chairman</option>
                          <option value="Secretary">Secretary</option>
                          <option value="Treasurer">Treasurer</option>
                          <option value="Member">Member</option>
                        </select>
                        <input
                          type="email"
                          value={editingMember!.email || ""}
                          onChange={(e) =>
                            setEditingMember((prev) => (prev ? { ...prev, email: e.target.value } : prev))
                          }
                          className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
                          placeholder="Email"
                        />
                        <input
                          type="text"
                          value={editingMember!.phone || ""}
                          onChange={(e) =>
                            setEditingMember((prev) => (prev ? { ...prev, phone: e.target.value } : prev))
                          }
                          className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
                          placeholder="Phone"
                        />
                        <textarea
                          value={editingMember!.bio || ""}
                          onChange={(e) => setEditingMember((prev) => (prev ? { ...prev, bio: e.target.value } : prev))}
                          rows={3}
                          className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors resize-none"
                        />
                      </>
                    )}
                    <div className="flex justify-end gap-3 pt-2">
                      <Button variant="outline" size="sm" onClick={() => setEditingMember(null)}>
                        <X className="w-4 h-4" />
                      </Button>
                      <Button size="sm" onClick={handleSaveMember} className="bg-secondary hover:bg-secondary/90">
                        <Save className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <div>
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={member.image || "/placeholder.svg?height=256&width=300&query=professional headshot"}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-card-foreground mb-2 text-balance">{member.name}</h3>
                      <p className="text-secondary font-semibold mb-4 text-sm uppercase tracking-wide">
                        {member.position}
                      </p>

                      <div className="space-y-2 mb-4 text-sm">
                        {member.email && <p className="text-muted-foreground">{member.email}</p>}
                        {member.phone && <p className="text-muted-foreground">{member.phone}</p>}
                        {member.joinDate && <p className="text-muted-foreground">Joined: {member.joinDate}</p>}
                      </div>

                      <p className="text-muted-foreground text-sm leading-relaxed mb-6 text-pretty">{member.bio}</p>

                      <div className="flex justify-center gap-3">
                        <Button variant="outline" size="sm" onClick={() => setEditingMember(member)} className="flex-1">
                          <Edit2 className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteMember(member.id || "", member._id || member.id || "")}
                          className="text-destructive hover:text-destructive hover:border-destructive/30 hover:bg-destructive/5"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-card rounded-xl shadow-lg border border-border p-6 text-center hover:shadow-xl transition-shadow duration-300">
            <User className="w-10 h-10 text-secondary mx-auto mb-4" />
            <div className="text-3xl font-bold text-card-foreground mb-2">{statistics.totalMembers}</div>
            <div className="text-sm text-muted-foreground font-medium">Total Members</div>
          </div>
          <div className="bg-card rounded-xl shadow-lg border border-border p-6 text-center hover:shadow-xl transition-shadow duration-300">
            <Crown className="w-10 h-10 text-secondary mx-auto mb-4" />
            <div className="text-3xl font-bold text-card-foreground mb-2">{statistics.executivePositions}</div>
            <div className="text-sm text-muted-foreground font-medium">Executive Positions</div>
          </div>
          <div className="bg-card rounded-xl shadow-lg border border-border p-6 text-center hover:shadow-xl transition-shadow duration-300">
            <Users className="w-10 h-10 text-secondary mx-auto mb-4" />
            <div className="text-3xl font-bold text-card-foreground mb-2">{statistics.generalMembers}</div>
            <div className="text-sm text-muted-foreground font-medium">General Members</div>
          </div>
          <div className="bg-card rounded-xl shadow-lg border border-border p-6 text-center hover:shadow-xl transition-shadow duration-300">
            <Calendar className="w-10 h-10 text-secondary mx-auto mb-4" />
            <div className="text-3xl font-bold text-card-foreground mb-2">2081-2086</div>
            <div className="text-sm text-muted-foreground font-medium">Current Term</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminTeam
