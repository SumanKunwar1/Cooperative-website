const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"

export interface TeamMember {
  _id?: string
  id?: string
  name: string
  position: string
  image: string
  bio: string
  email?: string
  phone?: string
  joinDate?: string
  committeeType: string
  committeeRole?: string
  createdAt?: string
  updatedAt?: string
}

export interface TeamStatistics {
  totalMembers: number
  workingCommittee: number
  executiveTeam: number
  auditCommittee: number
  accountingCommittee: number
  creditCommittee: number
}

class TeamAPI {
  // Get all team members for public view
  async getPublicTeamMembers(): Promise<TeamMember[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/team/public`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error("Error fetching public team members:", error)
      throw error
    }
  }

  // Get team members by committee type
  async getTeamMembersByCommittee(committeeType: string): Promise<TeamMember[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/team/public/committee/${committeeType}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error("Error fetching team members by committee:", error)
      throw error
    }
  }

  // Get all team members for admin
  async getAdminTeamMembers(): Promise<TeamMember[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/team`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error("Error fetching admin team members:", error)
      throw error
    }
  }

  // Get team member by ID
  async getTeamMemberById(id: string): Promise<TeamMember> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/team/${id}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error("Error fetching team member:", error)
      throw error
    }
  }

  // Create new team member
  async createTeamMember(
    memberData: Omit<TeamMember, "_id" | "id" | "createdAt" | "updatedAt">,
    imageFile?: File,
  ): Promise<TeamMember> {
    try {
      const formData = new FormData()
      formData.append("name", memberData.name)
      formData.append("position", memberData.position)
      formData.append("bio", memberData.bio)
      formData.append("committeeType", memberData.committeeType)
      if (memberData.email) formData.append("email", memberData.email)
      if (memberData.phone) formData.append("phone", memberData.phone)
      if (memberData.joinDate) formData.append("joinDate", memberData.joinDate)
      if (memberData.committeeRole) formData.append("committeeRole", memberData.committeeRole)
      if (imageFile) formData.append("image", imageFile)

      const response = await fetch(`${API_BASE_URL}/api/team`, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error("Error creating team member:", error)
      throw error
    }
  }

  // Update team member
  async updateTeamMember(id: string, memberData: Partial<TeamMember>, imageFile?: File): Promise<TeamMember> {
    try {
      const formData = new FormData()
      if (memberData.name) formData.append("name", memberData.name)
      if (memberData.position) formData.append("position", memberData.position)
      if (memberData.bio) formData.append("bio", memberData.bio)
      if (memberData.email) formData.append("email", memberData.email)
      if (memberData.phone) formData.append("phone", memberData.phone)
      if (memberData.joinDate) formData.append("joinDate", memberData.joinDate)
      if (memberData.committeeType) formData.append("committeeType", memberData.committeeType)
      if (memberData.committeeRole) formData.append("committeeRole", memberData.committeeRole)
      if (imageFile) formData.append("image", imageFile)

      const response = await fetch(`${API_BASE_URL}/api/team/${id}`, {
        method: "PUT",
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error("Error updating team member:", error)
      throw error
    }
  }

  // Delete team member
  async deleteTeamMember(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/team/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
    } catch (error) {
      console.error("Error deleting team member:", error)
      throw error
    }
  }

  // Get team statistics
  async getTeamStatistics(): Promise<TeamStatistics> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/team/statistics/team-stats`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error("Error fetching team statistics:", error)
      throw error
    }
  }
}

export const teamAPI = new TeamAPI()