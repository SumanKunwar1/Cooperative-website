"use client"

import type React from "react"
import { useState } from "react"
import Services from "./Services"
import AccountOpeningForm from "../components/form/AccountOpeningForm"
import LoanApplicationForm from "../components/form/LoanApplicationForm"

const ServicesWithForms: React.FC = () => {
  const [currentView, setCurrentView] = useState<"services" | "account-form" | "loan-form">("services")
  const [selectedScheme, setSelectedScheme] = useState<string>("")
  const [selectedLoanType, setSelectedLoanType] = useState<string>("")

  const handleOpenAccount = (scheme?: string) => {
    setSelectedScheme(scheme || "")
    setCurrentView("account-form")
  }

  const handleApplyLoan = (loanType?: string) => {
    setSelectedLoanType(loanType || "")
    setCurrentView("loan-form")
  }

  const handleBackToServices = () => {
    setCurrentView("services")
    setSelectedScheme("")
    setSelectedLoanType("")
  }

  if (currentView === "account-form") {
    return <AccountOpeningForm onBack={handleBackToServices} selectedScheme={selectedScheme} />
  }

  if (currentView === "loan-form") {
    return <LoanApplicationForm onBack={handleBackToServices} selectedLoanType={selectedLoanType} />
  }

  return <Services onOpenAccount={handleOpenAccount} onApplyLoan={handleApplyLoan} />
}

export default ServicesWithForms
