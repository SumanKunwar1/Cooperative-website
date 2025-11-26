"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, Calendar, Plus, Edit, Trash2, Loader2 } from "lucide-react"
import { teamAPI, type TeamMember } from "../../lib/teamApi"

const AdminTeams: React.FC = () => {
  const [workingCommittee, setWorkingCommittee] = useState<TeamMember[]>([])
  const [executiveTeam, setExecutiveTeam] = useState<TeamMember[]>([])
  const [auditCommittee, setAuditCommittee] = useState<TeamMember[]>([])
  const [accountingCommittee, setAccountingCommittee] = useState<TeamMember[]>([])
  const [creditCommittee, setCreditCommittee] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    bio: "",
    email: "",
    phone: "",
    joinDate: "",
    committeeType: "working",
    committeeRole: "",
    image: ""
  })

  useEffect(() => {
    fetchTeamMembers()
  }, [])

  const fetchTeamMembers = async () => {
    try {
      setLoading(true)
      const members = await teamAPI.getAdminTeamMembers()
      
      setWorkingCommittee(members.filter(member => member.committeeType === 'working'))
      setExecutiveTeam(members.filter(member => member.committeeType === 'executive'))
      setAuditCommittee(members.filter(member => member.committeeType === 'audit'))
      setAccountingCommittee(members.filter(member => member.committeeType === 'accounting'))
      setCreditCommittee(members.filter(member => member.committeeType === 'credit'))
      
    } catch (error) {
      console.error("Error fetching team members:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
        setFormData(prev => ({
          ...prev,
          image: reader.result as string
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      position: "",
      bio: "",
      email: "",
      phone: "",
      joinDate: "",
      committeeType: "working",
      committeeRole: "",
      image: ""
    })
    setImageFile(null)
    setImagePreview("")
    setEditingMember(null)
    setSaving(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    
    try {
      const memberData = {
        name: formData.name,
        position: formData.position,
        bio: formData.bio,
        email: formData.email,
        phone: formData.phone,
        joinDate: formData.joinDate,
        committeeType: formData.committeeType,
        committeeRole: formData.committeeRole,
        image: formData.image
      }

      if (editingMember) {
        await teamAPI.updateTeamMember(editingMember._id!, memberData, imageFile || undefined)
      } else {
        await teamAPI.createTeamMember(memberData, imageFile || undefined)
      }
      setShowModal(false)
      resetForm()
      await fetchTeamMembers()
    } catch (error) {
      console.error("Error saving team member:", error)
      alert("Error saving team member. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member)
    setFormData({
      name: member.name,
      position: member.position,
      bio: member.bio,
      email: member.email || "",
      phone: member.phone || "",
      joinDate: member.joinDate || "",
      committeeType: member.committeeType,
      committeeRole: member.committeeRole || "",
      image: member.image || ""
    })
    setImagePreview(member.image || "")
    setShowModal(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this team member?")) {
      try {
        await teamAPI.deleteTeamMember(id)
        await fetchTeamMembers()
      } catch (error) {
        console.error("Error deleting team member:", error)
        alert("Error deleting team member. Please try again.")
      }
    }
  }

  const getCommitteeTitle = (type: string) => {
    const titles: { [key: string]: string } = {
      working: "Working Committee",
      executive: "Executive Team",
      audit: "Audit Committee",
      accounting: "Accounting Supervision Committee",
      credit: "Credit Sub-Committee"
    }
    return titles[type] || type
  }

  const TeamMemberCard = ({ member, index }: { member: TeamMember; index: number }) => (
    <motion.div
      key={member._id || member.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={member.image || "/placeholder.svg?height=256&width=300&query=professional headshot"}
          alt={member.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => handleEdit(member)}
            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(member._id!)}
            className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
        <p className="text-blue-600 font-semibold mb-2 text-sm uppercase tracking-wide">{member.position}</p>
        {member.committeeRole && (
          <p className="text-green-600 font-medium mb-2 text-xs">{member.committeeRole}</p>
        )}
        <p className="text-gray-500 text-xs mb-2 capitalize">{getCommitteeTitle(member.committeeType)}</p>

        <div className="space-y-1 mb-3">
          {member.email && (
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Mail className="w-3 h-3" />
              <span>{member.email}</span>
            </div>
          )}
          {member.phone && (
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Phone className="w-3 h-3" />
              <span>{member.phone}</span>
            </div>
          )}
          {member.joinDate && (
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Calendar className="w-3 h-3" />
              <span>Joined {member.joinDate}</span>
            </div>
          )}
        </div>

        <p className="text-gray-600 text-xs leading-relaxed line-clamp-3">{member.bio}</p>
      </div>
    </motion.div>
  )

  const CommitteeSection = ({ 
    title, 
    members, 
    committeeType 
  }: { 
    title: string; 
    members: TeamMember[]; 
    committeeType: string 
  }) => (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
        <button
          onClick={() => {
            resetForm()
            setFormData(prev => ({ ...prev, committeeType }))
            setShowModal(true)
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Member
        </button>
      </div>

      {members.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No members in this committee yet.</p>
          <button
            onClick={() => {
              resetForm()
              setFormData(prev => ({ ...prev, committeeType }))
              setShowModal(true)
            }}
            className="text-blue-600 hover:underline mt-2"
          >
            Add the first member
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {members.map((member, index) => (
            <TeamMemberCard key={member._id || member.id} member={member} index={index} />
          ))}
        </div>
      )}
    </div>
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading team members...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Team Management</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Manage all committee members across different teams and positions
          </p>
        </motion.div>

        {/* Working Committee Section */}
        <CommitteeSection
          title="Working Committee"
          members={workingCommittee}
          committeeType="working"
        />

        {/* Executive Team Section */}
        <CommitteeSection
          title="Executive Team"
          members={executiveTeam}
          committeeType="executive"
        />

        {/* Audit Committee Section */}
        <CommitteeSection
          title="Audit Committee"
          members={auditCommittee}
          committeeType="audit"
        />

        {/* Accounting Supervision Committee Section */}
        <CommitteeSection
          title="Accounting Supervision Committee"
          members={accountingCommittee}
          committeeType="accounting"
        />

        {/* Credit Sub-Committee Section */}
        <CommitteeSection
          title="Credit Sub-Committee"
          members={creditCommittee}
          committeeType="credit"
        />

        {/* Add/Edit Member Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {editingMember ? "Edit Team Member" : "Add New Team Member"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter full name"
                        disabled={saving}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Position *
                      </label>
                      <input
                        type="text"
                        name="position"
                        value={formData.position}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., Chairman, General Manager"
                        disabled={saving}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Committee Type *
                      </label>
                      <select
                        name="committeeType"
                        value={formData.committeeType}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled={saving}
                      >
                        <option value="working">Working Committee</option>
                        <option value="executive">Executive Team</option>
                        <option value="audit">Audit Committee</option>
                        <option value="accounting">Accounting Supervision Committee</option>
                        <option value="credit">Credit Sub-Committee</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Committee Role
                      </label>
                      <input
                        type="text"
                        name="committeeRole"
                        value={formData.committeeRole}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., Convener, Member"
                        disabled={saving}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="email@example.com"
                        disabled={saving}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="+1 (555) 123-4567"
                        disabled={saving}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Join Date
                    </label>
                    <input
                      type="text"
                      name="joinDate"
                      value={formData.joinDate}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 2081 Bhadra 30"
                      disabled={saving}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bio *
                    </label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter member's bio and responsibilities..."
                      disabled={saving}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Profile Image
                    </label>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900"
                          disabled={saving}
                        />
                      </div>
                      {imagePreview && (
                        <div className="w-20 h-20 rounded-lg overflow-hidden border border-gray-300">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Recommended size: 300x320 pixels
                    </p>
                  </div>

                  <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={() => {
                        setShowModal(false)
                        resetForm()
                      }}
                      className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
                      disabled={saving}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={saving}
                    >
                      {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                      {editingMember ? "Update Member" : "Add Member"}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminTeams