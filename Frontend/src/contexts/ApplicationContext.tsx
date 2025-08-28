"use client"

import type React from "react"
import { createContext, useContext, useState, type ReactNode } from "react"

export interface LoanApplication {
  id: string
  submittedAt: string
  status: "pending" | "approved" | "rejected" | "under-review"
  // Personal Information
  firstName: string
  middleName: string
  lastName: string
  dateOfBirth: string
  gender: string
  maritalStatus: string
  nationality: string
  // Contact Information
  email: string
  primaryPhone: string
  alternatePhone: string
  permanentAddress: string
  temporaryAddress: string
  district: string
  municipality: string
  wardNo: string
  // Identification
  citizenshipNo: string
  passportNo: string
  panNo: string
  // Employment Information
  occupation: string
  employerName: string
  employerAddress: string
  employmentDuration: string
  monthlyIncome: string
  otherIncome: string
  totalIncome: string
  // Loan Information
  loanType: string
  loanAmount: string
  loanPurpose: string
  loanTerm: string
  preferredEMI: string
  // Additional fields...
  [key: string]: any
}

export interface AccountApplication {
  id: string
  submittedAt: string
  status: "pending" | "approved" | "rejected" | "under-review"
  // Personal Information
  firstName: string
  middleName: string
  lastName: string
  dateOfBirth: string
  gender: string
  maritalStatus: string
  nationality: string
  religion: string
  // Contact Information
  email: string
  primaryPhone: string
  alternatePhone: string
  permanentAddress: string
  temporaryAddress: string
  district: string
  municipality: string
  wardNo: string
  // Account Details
  accountType: string
  initialDeposit: string
  depositFrequency: string
  // Additional fields...
  [key: string]: any
}

interface ApplicationContextType {
  loanApplications: LoanApplication[]
  accountApplications: AccountApplication[]
  addLoanApplication: (application: Omit<LoanApplication, "id" | "submittedAt" | "status">) => void
  addAccountApplication: (application: Omit<AccountApplication, "id" | "submittedAt" | "status">) => void
  updateLoanApplicationStatus: (id: string, status: LoanApplication["status"]) => void
  updateAccountApplicationStatus: (id: string, status: AccountApplication["status"]) => void
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined)

export const useApplications = () => {
  const context = useContext(ApplicationContext)
  if (!context) {
    throw new Error("useApplications must be used within an ApplicationProvider")
  }
  return context
}

interface ApplicationProviderProps {
  children: ReactNode
}

export const ApplicationProvider: React.FC<ApplicationProviderProps> = ({ children }) => {
  const [loanApplications, setLoanApplications] = useState<LoanApplication[]>([])
  const [accountApplications, setAccountApplications] = useState<AccountApplication[]>([])

  const addLoanApplication = (application: Omit<LoanApplication, "id" | "submittedAt" | "status">) => {
    const newApplication: LoanApplication = {
        ...application,
        id: Date.now().toString(),
        submittedAt: new Date().toISOString(),
        status: "pending",
        firstName: "",
        middleName: "",
        lastName: "",
        dateOfBirth: "",
        gender: "",
        maritalStatus: "",
        nationality: "",
        email: "",
        primaryPhone: "",
        alternatePhone: "",
        permanentAddress: "",
        temporaryAddress: "",
        district: "",
        municipality: "",
        wardNo: "",
        citizenshipNo: "",
        passportNo: "",
        panNo: "",
        occupation: "",
        employerName: "",
        employerAddress: "",
        employmentDuration: "",
        monthlyIncome: "",
        otherIncome: "",
        totalIncome: "",
        loanType: "",
        loanAmount: "",
        loanPurpose: "",
        loanTerm: "",
        preferredEMI: ""
    }
    setLoanApplications((prev) => [...prev, newApplication])
  }

  const addAccountApplication = (application: Omit<AccountApplication, "id" | "submittedAt" | "status">) => {
    const newApplication: AccountApplication = {
        ...application,
        id: Date.now().toString(),
        submittedAt: new Date().toISOString(),
        status: "pending",
        firstName: "",
        middleName: "",
        lastName: "",
        dateOfBirth: "",
        gender: "",
        maritalStatus: "",
        nationality: "",
        religion: "",
        email: "",
        primaryPhone: "",
        alternatePhone: "",
        permanentAddress: "",
        temporaryAddress: "",
        district: "",
        municipality: "",
        wardNo: "",
        accountType: "",
        initialDeposit: "",
        depositFrequency: ""
    }
    setAccountApplications((prev) => [...prev, newApplication])
  }

  const updateLoanApplicationStatus = (id: string, status: LoanApplication["status"]) => {
    setLoanApplications((prev) => prev.map((app) => (app.id === id ? { ...app, status } : app)))
  }

  const updateAccountApplicationStatus = (id: string, status: AccountApplication["status"]) => {
    setAccountApplications((prev) => prev.map((app) => (app.id === id ? { ...app, status } : app)))
  }

  return (
    <ApplicationContext.Provider
      value={{
        loanApplications,
        accountApplications,
        addLoanApplication,
        addAccountApplication,
        updateLoanApplicationStatus,
        updateAccountApplicationStatus,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  )
}
