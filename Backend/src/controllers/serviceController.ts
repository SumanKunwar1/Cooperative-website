// FILE: backend/controllers/serviceController.ts

import { Request, Response, NextFunction } from "express"
import { SavingScheme, LoanScheme, AdditionalFacility } from "../models/Service"

// ==================== SAVING SCHEMES ====================

// Get all saving schemes
export const getAllSavingSchemes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { active } = req.query
    const filter: any = {}

    if (active !== undefined) {
      filter.isActive = active === "true"
    }

    const savingSchemes = await SavingScheme.find(filter).sort({ order: 1, createdAt: 1 })

    res.status(200).json({
      success: true,
      count: savingSchemes.length,
      data: savingSchemes,
    })
  } catch (error) {
    next(error)
  }
}

// Get single saving scheme by ID
export const getSavingSchemeById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params

    const savingScheme = await SavingScheme.findById(id)

    if (!savingScheme) {
      return res.status(404).json({
        success: false,
        message: "Saving scheme not found",
      })
    }

    res.status(200).json({
      success: true,
      data: savingScheme,
    })
  } catch (error) {
    next(error)
  }
}

// Create new saving scheme
export const createSavingScheme = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const savingScheme = await SavingScheme.create(req.body)

    res.status(201).json({
      success: true,
      message: "Saving scheme created successfully",
      data: savingScheme,
    })
  } catch (error) {
    next(error)
  }
}

// Update saving scheme
export const updateSavingScheme = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params

    const savingScheme = await SavingScheme.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!savingScheme) {
      return res.status(404).json({
        success: false,
        message: "Saving scheme not found",
      })
    }

    res.status(200).json({
      success: true,
      message: "Saving scheme updated successfully",
      data: savingScheme,
    })
  } catch (error) {
    next(error)
  }
}

// Delete saving scheme
export const deleteSavingScheme = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params

    const savingScheme = await SavingScheme.findByIdAndDelete(id)

    if (!savingScheme) {
      return res.status(404).json({
        success: false,
        message: "Saving scheme not found",
      })
    }

    res.status(200).json({
      success: true,
      message: "Saving scheme deleted successfully",
    })
  } catch (error) {
    next(error)
  }
}

// Reorder saving schemes
export const reorderSavingSchemes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { schemes } = req.body // Array of { id, order }

    if (!Array.isArray(schemes)) {
      return res.status(400).json({
        success: false,
        message: "Invalid request format. Expected array of schemes.",
      })
    }

    // Update each scheme's order
    const updatePromises = schemes.map((scheme) =>
      SavingScheme.findByIdAndUpdate(scheme.id, { order: scheme.order }, { new: true }),
    )

    await Promise.all(updatePromises)

    res.status(200).json({
      success: true,
      message: "Saving schemes reordered successfully",
    })
  } catch (error) {
    next(error)
  }
}

// ==================== LOAN SCHEMES ====================

// Get all loan schemes
export const getAllLoanSchemes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { active } = req.query
    const filter: any = {}

    if (active !== undefined) {
      filter.isActive = active === "true"
    }

    const loanSchemes = await LoanScheme.find(filter).sort({ order: 1, createdAt: 1 })

    // Convert Map to object for JSON serialization
    const loanSchemesWithRates = loanSchemes.map((scheme) => {
      const schemeObj: any = scheme.toObject()
      // Convert Map to plain object
      if (schemeObj.rates instanceof Map) {
        schemeObj.rates = Object.fromEntries(schemeObj.rates)
      }
      return schemeObj
    })

    res.status(200).json({
      success: true,
      count: loanSchemesWithRates.length,
      data: loanSchemesWithRates,
    })
  } catch (error) {
    next(error)
  }
}

// Get single loan scheme by ID
export const getLoanSchemeById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params

    const loanScheme = await LoanScheme.findById(id)

    if (!loanScheme) {
      return res.status(404).json({
        success: false,
        message: "Loan scheme not found",
      })
    }

    const loanSchemeObj: any = loanScheme.toObject()
    // Convert Map to plain object
    if (loanSchemeObj.rates instanceof Map) {
      loanSchemeObj.rates = Object.fromEntries(loanSchemeObj.rates)
    }

    res.status(200).json({
      success: true,
      data: loanSchemeObj,
    })
  } catch (error) {
    next(error)
  }
}

// Create new loan scheme
export const createLoanScheme = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const loanScheme = await LoanScheme.create(req.body)

    const loanSchemeObj: any = loanScheme.toObject()
    // Convert Map to plain object
    if (loanSchemeObj.rates instanceof Map) {
      loanSchemeObj.rates = Object.fromEntries(loanSchemeObj.rates)
    }

    res.status(201).json({
      success: true,
      message: "Loan scheme created successfully",
      data: loanSchemeObj,
    })
  } catch (error) {
    next(error)
  }
}

// Update loan scheme
export const updateLoanScheme = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params

    const loanScheme = await LoanScheme.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!loanScheme) {
      return res.status(404).json({
        success: false,
        message: "Loan scheme not found",
      })
    }

    const loanSchemeObj: any = loanScheme.toObject()
    // Convert Map to plain object
    if (loanSchemeObj.rates instanceof Map) {
      loanSchemeObj.rates = Object.fromEntries(loanSchemeObj.rates)
    }

    res.status(200).json({
      success: true,
      message: "Loan scheme updated successfully",
      data: loanSchemeObj,
    })
  } catch (error) {
    next(error)
  }
}

// Delete loan scheme
export const deleteLoanScheme = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params

    const loanScheme = await LoanScheme.findByIdAndDelete(id)

    if (!loanScheme) {
      return res.status(404).json({
        success: false,
        message: "Loan scheme not found",
      })
    }

    res.status(200).json({
      success: true,
      message: "Loan scheme deleted successfully",
    })
  } catch (error) {
    next(error)
  }
}

// Reorder loan schemes
export const reorderLoanSchemes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { schemes } = req.body

    if (!Array.isArray(schemes)) {
      return res.status(400).json({
        success: false,
        message: "Invalid request format. Expected array of schemes.",
      })
    }

    const updatePromises = schemes.map((scheme) =>
      LoanScheme.findByIdAndUpdate(scheme.id, { order: scheme.order }, { new: true }),
    )

    await Promise.all(updatePromises)

    res.status(200).json({
      success: true,
      message: "Loan schemes reordered successfully",
    })
  } catch (error) {
    next(error)
  }
}

// ==================== ADDITIONAL FACILITIES ====================

// Get all additional facilities
export const getAllAdditionalFacilities = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { active } = req.query
    const filter: any = {}

    if (active !== undefined) {
      filter.isActive = active === "true"
    }

    const facilities = await AdditionalFacility.find(filter).sort({ order: 1, createdAt: 1 })

    res.status(200).json({
      success: true,
      count: facilities.length,
      data: facilities,
    })
  } catch (error) {
    next(error)
  }
}

// Get single facility by ID
export const getAdditionalFacilityById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params

    const facility = await AdditionalFacility.findById(id)

    if (!facility) {
      return res.status(404).json({
        success: false,
        message: "Additional facility not found",
      })
    }

    res.status(200).json({
      success: true,
      data: facility,
    })
  } catch (error) {
    next(error)
  }
}

// Create new additional facility
export const createAdditionalFacility = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const facility = await AdditionalFacility.create(req.body)

    res.status(201).json({
      success: true,
      message: "Additional facility created successfully",
      data: facility,
    })
  } catch (error) {
    next(error)
  }
}

// Update additional facility
export const updateAdditionalFacility = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params

    const facility = await AdditionalFacility.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!facility) {
      return res.status(404).json({
        success: false,
        message: "Additional facility not found",
      })
    }

    res.status(200).json({
      success: true,
      message: "Additional facility updated successfully",
      data: facility,
    })
  } catch (error) {
    next(error)
  }
}

// Delete additional facility
export const deleteAdditionalFacility = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params

    const facility = await AdditionalFacility.findByIdAndDelete(id)

    if (!facility) {
      return res.status(404).json({
        success: false,
        message: "Additional facility not found",
      })
    }

    res.status(200).json({
      success: true,
      message: "Additional facility deleted successfully",
    })
  } catch (error) {
    next(error)
  }
}

// Reorder additional facilities
export const reorderAdditionalFacilities = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { facilities } = req.body

    if (!Array.isArray(facilities)) {
      return res.status(400).json({
        success: false,
        message: "Invalid request format. Expected array of facilities.",
      })
    }

    const updatePromises = facilities.map((facility) =>
      AdditionalFacility.findByIdAndUpdate(facility.id, { order: facility.order }, { new: true }),
    )

    await Promise.all(updatePromises)

    res.status(200).json({
      success: true,
      message: "Additional facilities reordered successfully",
    })
  } catch (error) {
    next(error)
  }
}

// ==================== COMBINED SERVICES ====================

// Get all services (savings + loans + facilities)
export const getAllServices = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { active } = req.query
    const filter: any = {}

    if (active !== undefined) {
      filter.isActive = active === "true"
    }

    const [savingSchemes, loanSchemes, facilities] = await Promise.all([
      SavingScheme.find(filter).sort({ order: 1, createdAt: 1 }),
      LoanScheme.find(filter).sort({ order: 1, createdAt: 1 }),
      AdditionalFacility.find(filter).sort({ order: 1, createdAt: 1 }),
    ])

    // Convert loan scheme rates Map to object
    const loanSchemesWithRates = loanSchemes.map((scheme) => {
      const schemeObj: any = scheme.toObject()
      // Convert Map to plain object
      if (schemeObj.rates instanceof Map) {
        schemeObj.rates = Object.fromEntries(schemeObj.rates)
      }
      return schemeObj
    })

    res.status(200).json({
      success: true,
      data: {
        savingSchemes,
        loanSchemes: loanSchemesWithRates,
        additionalFacilities: facilities,
      },
    })
  } catch (error) {
    next(error)
  }
}